import {createContext, useEffect, useState} from "react";
import {fetchFoodList} from "../service/foodService.js";
import {addToCart, getCartData, removeQtyFromCart} from "../service/cartService.js";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
    const [foodList, setFoodList] = useState([]);
    const [quantity, setQuantity] = useState({});
    const [token, setToken] =  useState("");

    const increaseQty = async (foodId) => {
        setQuantity((prev) => ({...prev, [foodId]: (prev[foodId] || 0) + 1}));
        await addToCart({foodId, token});
    }

    const decreaseQty = async (foodId) => {
        setQuantity((prev) => ({
            ...prev,
            [foodId]: prev[foodId] > 0 ? prev[foodId] -1 : 0,
        }));
        await removeQtyFromCart(foodId);
    }

    const removeFromCart = (foodId) => {
        setQuantity((prevQuantity) => {
            const updateQuantity = {...prevQuantity};
            delete updateQuantity[foodId];
            return updateQuantity;
        });
    };

    const loadCartData = async (token) => {
        const items = await getCartData(token);
        setQuantity(items)
    }

    const contextValue = {
       foodList,
       quantity,
       increaseQty,
       decreaseQty,
       removeFromCart,
       token,
       setToken,
       setQuantity,
       loadCartData,
    };

    useEffect(() => {
        async function loadData() {
            const tokenFromStorage = localStorage.getItem("token");
            const data = await fetchFoodList(tokenFromStorage);
            setFoodList(data);

            if (tokenFromStorage) {
                setToken(tokenFromStorage);
                await loadCartData(tokenFromStorage);
            }
        }
        loadData();
    }, []);

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}