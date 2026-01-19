import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets.js";
import { StoreContext } from "../../context/StoreContext.jsx";
import { calculateCartTotals } from "../../util/cartUtils.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
    const { foodList, quantity, setQuantity, token } = useContext(StoreContext);
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        country: "",
        state: "",
        city: "",
        zip: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((d) => ({ ...d, [name]: value }));
    };

    // build cartItems (items with qty > 0)
    const cartItems = foodList.filter((food) => quantity[food.id] > 0);

    const { subtotal, shipping, tax, total } = calculateCartTotals(cartItems, quantity);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (cartItems.length === 0) {
            toast.error("Cart is empty");
            return;
        }

        const orderItems = cartItems.map((item) => ({
            foodId: item.id,
            quantity: quantity[item.id],
            price: item.price,
            category: item.category,
            imageUrl: item.imageUrl,
            description: item.description,
            name: item.name
        }));

        const orderData = {
            userAddress: `${data.firstName} ${data.lastName}, ${data.email}, ${data.address}, ${data.state}, ${data.city}`,
            phoneNumber: data.phoneNumber,
            email: data.email,
            orderedItems: orderItems,
            amount: Number(total.toFixed(2)), // send numeric
            orderStatus: "Preparing"
        };

        try {
            // Create order on server, server should return paymentApprovalUrl and orderId
            const response = await axios.post(
                "http://localhost:8080/api/orders/create",
                orderData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Expect backend to return something like:
            // { paymentApprovalUrl: "...", orderId: "<id>", amount: 23.0 }
            if (response.status === 200 || response.status === 201) {
                const resp = response.data;
                if (resp.paymentApprovalUrl) {
                    // Redirect user to PayPal approval page (server-created PayPal payment)
                    window.location.href = resp.paymentApprovalUrl;
                } else {
                    toast.error("Payment URL not returned by server.");
                }
            } else {
                toast.error("Unable to place order. Please try again!");
            }
        } catch (error) {
            console.error("PlaceOrder - create order error:", error);
            // If backend returned 403/401, token might be invalid/expired
            if (error.response && [401, 403].includes(error.response.status)) {
                toast.error("Authentication required. Please login again.");
                // optional: clear token & redirect to login
            } else {
                toast.error("Unable to place order. Please try again!");
            }
        }
    };

    // This is invoked after PayPal redirects back to your frontend /success route.
    // The frontend then should call your backend's /orders/verify endpoint with PayPal query params.
    // Example flow: PayPal returns to /success?paymentId=...&PayerID=...
    // Your front-end success route should extract params and call backend /api/orders/verify with them.
    // Here we provide a helper that your success page can call.
    const verifyPayment = async (paypalPaymentId, paypalPayerId, orderIdFromServer) => {
        try {
            const body = {
                paypal_payment_id: paypalPaymentId,
                paypal_payer_id: paypalPayerId,
                orderId: orderIdFromServer
            };

            const response = await axios.post(
                "http://localhost:8080/api/orders/verify",
                body,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                toast.success("Payment successful!");
                await clearCart();
                navigate("/myorders");
            } else {
                toast.error("Payment verification failed.");
                navigate("/");
            }
        } catch (error) {
            console.error("verifyPayment error:", error);
            toast.error("Payment verification failed. Please contact support.");
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:8080/api/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error("deleteOrder error:", error);
            toast.error("Something went wrong deleting order.");
        }
    };

    const clearCart = async () => {
        try {
            await axios.delete("http://localhost:8080/api/cart/clear", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setQuantity({});
        } catch (error) {
            console.error("clearCart error:", error);
            toast.error("Error while clearing the cart!");
        }
    };

    return (
        <div className="container mt-4 mb-5">
            <main>
                <div className="py-5 text-center">
                    <img className="d-block mx-auto" src={assets.logo} alt="" width="98" height="98" />
                </div>
                <div className="row g-5">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Your cart</span>
                            <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
                        </h4>

                        <ul className="list-group mb-3">
                            {cartItems.map((item) => (
                                <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                                    <div>
                                        <h6 className="my-0">{item.name}</h6>
                                        <small className="text-body-secondary">Qty: {quantity[item.id]}</small>
                                    </div>
                                    <span className="text-body-secondary">&#36;{(item.price * quantity[item.id]).toFixed(2)}</span>
                                </li>
                            ))}

                            <li className="list-group-item d-flex justify-content-between">
                                <div>
                                    <span>Shipping</span>
                                </div>
                                <span className="text-body-secondary">
                  &#36;{subtotal === 0 ? "0.00" : shipping.toFixed(2)}
                </span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between">
                                <div>
                                    <span>Tax (10%)</span>
                                </div>
                                <span className="text-body-secondary">&#36;{tax.toFixed(2)}</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (USD)</span>
                                <strong>{total.toFixed(2)}</strong>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Billing address</h4>
                        <form className="needs-validation" onSubmit={onSubmitHandler}>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="firstName" className="form-label">
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        placeholder="John"
                                        required
                                        name="firstName"
                                        value={data.firstName}
                                        onChange={onChangeHandler}
                                    />
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="lastName" className="form-label">
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        placeholder="Doe"
                                        required
                                        name="lastName"
                                        value={data.lastName}
                                        onChange={onChangeHandler}
                                    />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text">@</span>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="email"
                                            required
                                            name="email"
                                            value={data.email}
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="phonenumber" className="form-label">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phonenumber"
                                        placeholder="0782105684"
                                        required
                                        name="phoneNumber"
                                        value={data.phoneNumber}
                                        onChange={onChangeHandler}
                                    />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        placeholder="3800 Tsono Rd"
                                        required
                                        name="address"
                                        value={data.address}
                                        onChange={onChangeHandler}
                                    />
                                </div>

                                <div className="col-md-5">
                                    <label htmlFor="country" className="form-label">
                                        Country
                                    </label>
                                    <select className="form-select" id="country" required name="country" value={data.country} onChange={onChangeHandler}>
                                        <option value="">Choose...</option>
                                        <option>Zimbabwe</option>
                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="city" className="form-label">
                                        City
                                    </label>
                                    <select className="form-select" id="city" required name="city" value={data.city} onChange={onChangeHandler}>
                                        <option value="">Choose...</option>
                                        <option>Harare</option>
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="zip" className="form-label">
                                        Zip
                                    </label>
                                    <input type="text" className="form-control" id="zip" required name="zip" value={data.zip} onChange={onChangeHandler} />
                                </div>

                                <hr className="my-4" />

                                <button className="w-100 btn btn-primary btn-lg" type="submit" disabled={cartItems.length === 0}>
                                    Continue to checkout
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PlaceOrder;
