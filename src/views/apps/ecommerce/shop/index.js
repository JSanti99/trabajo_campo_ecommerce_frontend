// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Shop Components
import Sidebar from "./Sidebar";
import Products from "./Products";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getProducts,
  getCartItems,
  addToWishlist,
  deleteCartItem,
  deleteWishlistItem,
} from "../store/actions";

// ** Styles
import "@styles/base/pages/app-ecommerce.scss";
import { _limit, _start } from "../../../../utility/Utils";

const Shop = () => {
  // ** States
  const [activeView, setActiveView] = useState("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ** Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.ecommerce);

  // ** Get products
  useEffect(() => {
    dispatch(
      getProducts({
        _start,
        _limit,
      })
    );
  }, [dispatch]);

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Tienda"
        breadCrumbParent="eCommerce"
        breadCrumbActive="Productos"
      />
      <Products
        store={store}
        dispatch={dispatch}
        addToCart={addToCart}
        activeView={activeView}
        getProducts={getProducts}
        sidebarOpen={sidebarOpen}
        getCartItems={getCartItems}
        setActiveView={setActiveView}
        addToWishlist={addToWishlist}
        setSidebarOpen={setSidebarOpen}
        deleteCartItem={deleteCartItem}
        deleteWishlistItem={deleteWishlistItem}
      />
      <Sidebar
        store={store}
        dispatch={dispatch}
        getProducts={getProducts}
        sidebarOpen={sidebarOpen}
      />
    </Fragment>
  );
};
export default Shop;
