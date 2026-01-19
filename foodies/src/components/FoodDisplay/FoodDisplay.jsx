import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import FoodItem from "../FoodItem/FoodItem.jsx";

const FoodDisplay = ({ category, searchText }) => {
    const { foodList } = useContext(StoreContext);

    // Prevent null/undefined values
    const safeCategory = category ?? "All";
    const safeSearch = searchText ? searchText.toLowerCase() : "";

    const filteredFoods = foodList.filter((food) => {
        const foodName = food?.name ? food.name.toLowerCase() : "";
        const foodCategory = food?.category ?? "";

        const matchesCategory =
            safeCategory === "All" || foodCategory === safeCategory;

        const matchesSearch = foodName.includes(safeSearch);

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="container">
            <div className="row">
                {filteredFoods.length > 0 ? (
                    filteredFoods.map((food, index) => (
                        <FoodItem
                            key={food.id || index}
                            index={index}
                            name={food.name}
                            description={food.description}
                            id={food.id}
                            imageUrl={food.imageUrl}
                            category={food.category}
                            price={food.price}
                        />
                    ))
                ) : (
                    <div className="text-center mt-4 mb-5">
                        <h4>No food found.</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoodDisplay;
