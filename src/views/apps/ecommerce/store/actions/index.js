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
    // return axios.post("/apps/ecommerce/cart", { productId: id }).then((res) => {
    //   dispatch({ type: "ADD_TO_CART", data: res.data });
    //   dispatch(getProducts(getState().ecommerce.params));
    // });
    console.log("add");
    return axios.get("http://localhost:1337/users/me").then((res) => {
      axios
        .put(`http://localhost:1337/carts/${res.data.cart.id}`, {
          products: [...res.data.cart.products, { id }],
        })
        .then((res) => {
          //  dispatch({ type: "DELETE_CART_ITEM", data: res.data });
          dispatch(getCartItems());
        });
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
  return async (dispatch) => {
    return axios
      .get("http://localhost:1337/users/me")
      .then(async (res) => {
        let products = [];

        await Promise.all(
          res.data.cart.products.map(async (product) => {
            console.log(product);

            await axios
              .get(`http://localhost:1337/tiendas/${product.brand}`)
              .then((brand) => {
                console.log({ brand });
                products.push({
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  description: product.description,
                  brand: brand.data.companyName,
                  price: product?.price,
                  image: "http://localhost:1337" + product.image.url,
                  hasFreeShipping: product.hasFreeShipping,
                  rating: product.rating,
                  discountPercentage: 16,
                  qty: 1,
                  shippingDate: "2021-05-16T14:57:16.813Z",
                });
              });
          })
        );

        console.log({ data: products });
        dispatch({ type: "GET_CART", data: { products } });
      })
      .catch((err) => console.log(err));

    // return axios.get("/apps/ecommerce/cart").then((res) => {
    //   console.log(res.data);
    //   dispatch({ type: "GET_CART", data: res.data });
    // });
  };
};

// ** GET Single Product
export const getProduct = (slug) => {
  return (dispatch) => {
    // /apps/ecommerce/products/
    return axios
      .get(`http://localhost:1337/productosBySlug/${slug}`)
      .then((res) => {
        const action = {
          data: {
            product: {
              id: res.data.id,
              name: res.data.name,
              slug: res.data.slug,
              description: res.data.description,
              brand: res.data.brand.companyName,
              price: res.data?.price,
              image: "http://localhost:1337" + res.data.image.url,
              hasFreeShipping: res.data.hasFreeShipping,
              rating: res.data.rating,
            },
          },
        };

        dispatch({ type: "GET_PRODUCT", data: action.data });
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
  return async (dispatch) => {
    // return axios.update(`/apps/ecommerce/cart/${id}`).then((res) => {
    //   dispatch({ type: "DELETE_CART_ITEM", data: res.data });
    //   dispatch(getCartItems());
    // });
    return axios
      .post(`http://localhost:1337/cartDeleteProduct`, {
        id: id,
      })
      .then((res) => {
        console.log(res.data);
        let products = [];

        res.data.products.map((product) => {
          console.log(product);
          products.push({
            id: product.id,
            name: product.name,
            slug: product.slug,
            description: product.description,
            brand: product?.tienda?.companyName,
            price: product?.price,
            image: "http://localhost:1337" + product.image.url,
            hasFreeShipping: product.hasFreeShipping,
            rating: product.rating,
            discountPercentage: 16,
            qty: 2,
            shippingDate: "2021-05-16T14:57:16.813Z",
            name: "Apple Watch Series 5",
          });
        });

        products = products.filter((product) => product.id === id);

        console.log({ data: products });
        //  dispatch({ type: "DELETE_CART_ITEM", data: res.data });
        dispatch(getCartItems());
      });
  };
};
