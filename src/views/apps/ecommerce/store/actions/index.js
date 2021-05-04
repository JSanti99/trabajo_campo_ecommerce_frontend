import axios from "axios";
import { endpoint } from "../../../../../utility/Utils";

// ** GET Products
export const getProducts = (params) => {
  console.log({ params });
  return (dispatch) => {
    return axios
      .get("http://localhost:1337/productos", { params })
      .then((res) => {
        if (!res) return;
        dispatch({
          type: "GET_PRODUCTS",
          data: res.data,
          params,
        });
      });
  };
};
export const getProductsTienda = ({ id }, params) => {
  console.log({ id });
  return (dispatch) => {
    return axios
      .get(`${endpoint}/tiendas/${id}/products`, { params })
      .then((response) =>
        dispatch({
          type: "GET_TIENDA_PRODUCTS",
          data: response.data,
          params,
        })
      );
  };
};

// ** Add Item to Cart
export const addToCart = (id) => {
  return (dispatch, getState) => {
    return axios.post("/apps/ecommerce/cart", { productId: id }).then((res) => {
      dispatch({ type: "ADD_TO_CART", data: res.data });
      dispatch(getProducts(getState().ecommerce.params));
    });
  };
};

// ** GET Wishlist Items
export const getWishlistItems = () => {
  return (dispatch) => {
    return axios.get("/apps/ecommerce/wishlist").then((res) => {
      dispatch({ type: "GET_WISHLIST", data: res.data });
    });
  };
};

// ** DELETE Wishlist Item
export const deleteWishlistItem = (id) => {
  return (dispatch) => {
    return axios.delete(`/apps/ecommerce/wishlist/${id}`).then((res) => {
      dispatch({ type: "DELETE_WISHLIST_ITEM", data: res.data });
      dispatch(getWishlistItems());
    });
  };
};

// ** GET Cart Items
export const getCartItems = () => {
  return (dispatch) => {
    return axios.get("/apps/ecommerce/cart").then((res) => {
      dispatch({ type: "GET_CART", data: res.data });
    });
  };
};

// ** GET Single Product
export const getProduct = (slug) => {
  return (dispatch) => {
    return axios.get(`/apps/ecommerce/products/${slug}`).then((res) => {
      dispatch({ type: "GET_PRODUCT", data: res.data });
    });
  };
};

// ** Add Item to Wishlist
export const addToWishlist = (id) => {
  return (dispatch) => {
    return axios
      .post("/apps/ecommerce/wishlist", { productId: id })
      .then(() => {
        dispatch({ type: "ADD_TO_WISHLIST" });
      });
  };
};

// ** DELETE Cart Items
export const deleteCartItem = (id) => {
  return (dispatch) => {
    return axios.delete(`/apps/ecommerce/cart/${id}`).then((res) => {
      dispatch({ type: "DELETE_CART_ITEM", data: res.data });
      dispatch(getCartItems());
    });
  };
};
