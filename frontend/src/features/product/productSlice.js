import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, postProduct } from "./productAPI";

const myInitialState = {
  products: [],
  isLoading: false,
  postSuccess: false,
  isError: false,
  error: "",
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const products = fetchProducts();
    return products;
  }
);
export const addProduct = createAsyncThunk(
  "products/addProducts",
  async (data) => {
    const products = postProduct(data);
    return products;
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState: myInitialState,
  extraReducers: (builder) => {
    builder
      // Get Products
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        console.log(action);
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.products = [];
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      // Add Product
      .addCase(addProduct.pending, (state, action) => {
        state.isLoading = true;
        state.postSuccess = false;
        state.isError = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.postSuccess = true;
        state.isLoading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.products = [];
        state.postSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
