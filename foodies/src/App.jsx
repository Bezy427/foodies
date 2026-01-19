import React from 'react'
import Menubar from "./components/Menubar/Menubar.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import ExploreFood from "./pages/Explore/ExploreFood";
import ContactUs from "./pages/Contact/Contact.jsx";
import {ToastContainer} from "react-toastify";
import FoodDetails from "./components/FoodDetails/FoodDetails.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";

const App = () => {
    return (
        <div>
            <Menubar />
            <ToastContainer />
            <Routes>
               <Route path="/" element={<Home />}/>
               <Route path="/explore" element={<ExploreFood />}/>
               <Route path="/contact" element={<ContactUs />}/>
               <Route path="/food/:id" element={<FoodDetails />}/>
               <Route path="/cart" element={<Cart />}/>
               <Route path="/order" element={<PlaceOrder />}/>
               <Route path="/login" element={<Login />}/>
               <Route path="/register" element={<Register />}/>
            </Routes>
        </div>
    )
}
export default App
