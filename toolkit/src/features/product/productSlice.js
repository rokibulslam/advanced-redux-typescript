import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProduct, fetchProducts, postProduct } from "./productAPI";

const myInitialState = {
  products: [],
  isLoading: false,
  deleteSuccess:false,
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
export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id, thunkAPI) => {
    const products = await deleteProduct(id)
    thunkAPI.dispatch(removeFromList(id))
    return products;
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState: myInitialState,
  reducers: {
    togglePostSuccess: (state) => {
      state.postSuccess = false;
    },
    toggleDeleteSuccess: (state) => {
      state.deleteSuccess = false;
    },
    // remove product from product list after delete the product
    removeFromList: (state, action) => {
      state.products=state.products.filter(product=>product._id!==action.payload)
    }
  },
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
      })
      // Delete Product
      .addCase(removeProduct.pending, (state, action) => {
        state.isLoading = true;
        state.deleteSuccess = false;
        state.isError = false;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.deleteSuccess = true;
        state.isLoading = false;
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.products = [];
        state.deleteSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const {togglePostSuccess, toggleDeleteSuccess, removeFromList}=productsSlice.actions
export default productsSlice.reducer;
