import React, { useState } from 'react';
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import './ExploreFood.css';

const ExploreFood = () => {
    const [category, setCategory] = useState('All');
    const [searchText, setSearchText] = useState('');

    return (
        <>
            <div className="explore-container p-3">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={(event) => event.preventDefault()}>
                            <div className="input-group mb-3">
                                <select
                                    className="form-select mt-2"
                                    style={{ maxWidth: '150px' }}
                                    onChange={event => setCategory(event.target.value)}
                                >
                                    <option value="All">All</option>
                                    <option value="Biryani">Biryani</option>
                                    <option value="Cheese Burger">Burger</option>
                                    <option value="Cake">Cake</option>
                                    <option value="Ice cream">Ice Cream</option>
                                    <option value="Pizza">Pizza</option>
                                    <option value="Rolls">Rolls</option>
                                    <option value="Salad">Salad</option>
                                    <option value="Shawarma">Shawarma</option>
                                </select>

                                <input
                                    type="text"
                                    className="form-control mt-2"
                                    placeholder="Search your favourite food..."
                                    onChange={(event) => setSearchText(event.target.value)}
                                    value={searchText}
                                />

                                <button className="btn btn-primary mt-2" type="submit">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Pass the props here */}
            <FoodDisplay category={category} searchText={searchText} />
        </>
    );
};

export default ExploreFood;
