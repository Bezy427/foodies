import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.jsx";

// ⭐ Reusable StarRating block
const StarRating = ({ initialRating = 0, onRate }) => {
    const [rating, setRating] = useState(initialRating);
    const [hover, setHover] = useState(0);

    return (
        <div>
            {[1, 2, 3, 4, 5].map((value) => (
                <i
                    key={value}
                    className={`bi ${
                        (hover || rating) >= value
                            ? "bi-star-fill text-warning"
                            : "bi-star text-secondary"
                    }`}
                    style={{ cursor: "pointer", fontSize: "18px", marginRight: "2px" }}
                    onClick={() => {
                        setRating(value);
                        if (onRate) onRate(value);
                    }}
                    onMouseEnter={() => setHover(value)}
                    onMouseLeave={() => setHover(0)}
                ></i>
            ))}
        </div>
    );
};

const FoodItem = ({ name, description, id, imageUrl, price }) => {
    const { increaseQty, decreaseQty, quantity } = useContext(StoreContext);

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
            <div className="card" style={{ maxWidth: "320px" }}>
                <Link to={`/food/${id}`}>
                    <img
                        src={imageUrl || "/fallback.png"}
                        className="card-img-top"
                        alt={name}
                        height={300}
                    />
                </Link>

                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>

                    <div className="d-flex justify-content-between align-items-center">
                        <span className="h5 mb-0">&#36;{price}</span>

                        {/* ⭐ Clickable Rating */}
                        <div className="d-flex align-items-center">
                            <StarRating
                                initialRating={4}
                                onRate={(value) =>
                                    console.log(`Food ID ${id} rated:`, value)
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="card-footer d-flex justify-content-between bg-light">
                    <Link className="btn btn-primary btn-sm" to={`/food/${id}`}>
                        View Food
                    </Link>

                    {quantity[id] > 0 ? (
                        <div className="d-flex align-items-center gap-2">
                            <button className="btn btn-danger btn-sm" onClick={() => decreaseQty(id)}>
                                <i className="bi bi-dash-circle"></i>
                            </button>

                            <span className="fw-bold">{quantity[id]}</span>

                            <button className="btn btn-success btn-sm" onClick={() => increaseQty(id)}>
                                <i className="bi bi-plus-circle"></i>
                            </button>
                        </div>
                    ) : (
                        <button className="btn btn-primary btn-sm" onClick={() => increaseQty(id)}>
                            <i className="bi bi-plus-circle"></i>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FoodItem;
