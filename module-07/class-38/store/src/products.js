import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadProducts = createAsyncThunk("products/load", async () => {
  const response = await fetch(process.env.REACT_APP_API + "/products");
  const json = await response.json();

  return json.results;
});

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ product, stockAmount }) => {
    const updatedProduct = {
      ...product,
      inStock: product.inStock - stockAmount,
    };
    // PUT to the API at products/{id}
    const response = await fetch(
      `${process.env.REACT_APP_API}/products/${product._id}`,
      {
        method: "PUT",
        contentType: "application/json",
        body: JSON.stringify(updatedProduct),
      }
    );

    return response.json();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.fulfilled, (state, { payload }) => {
        state.products = payload;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        // console.log(`updateProduct.fulfilled`, payload);
        const product = state.products.find(
          (product) => product._id === payload._id
        );
        product.inStock = payload.inStock;
      });
  },
});

export default productsSlice;
