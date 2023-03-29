import {configureStore } from "@reduxjs/toolkit"
import cartSlice from "../features/cart/cartSlice";
import filterSlice from "../features/filter/filterSlice";
import productSlice from "../features/product/productSlice";


const store = configureStore({
    reducer: {
        cart: cartSlice,
        filter: filterSlice,
        products: productSlice
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat()
});


export default store;