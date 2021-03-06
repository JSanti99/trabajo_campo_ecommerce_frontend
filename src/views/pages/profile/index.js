import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import UILoader from "@components/ui-loader";
import ProfilePoll from "./ProfilePolls";
import ProfileAbout from "./ProfileAbout";
import ProfilePosts from "./ProfilePosts";
import ProfileHeader from "./ProfileHeader";
import { Row, Col, Button } from "reactstrap";
import ProfileTwitterFeeds from "./ProfileTwitterFeeds";
import ProfileLatestPhotos from "./ProfileLatestPhotos";
import ProfileSuggestedPages from "./ProfileSuggestedPages";
import ProfileFriendsSuggestions from "./ProfileFriendsSuggestions";
import Breadcrumbs from "@components/breadcrumbs";
import Products from "../../apps/ecommerce/shop/Products";
import Sidebar from "../../apps/ecommerce/shop/Sidebar";

import "@styles/react/pages/page-profile.scss";
// ** Styles
import "@styles/base/pages/app-ecommerce.scss";

import { endpoint, _limit, _start } from "../../../utility/Utils";

import {
  addToCart,
  getProductsTienda,
  getCartItems,
  addToWishlist,
  deleteCartItem,
  deleteWishlistItem,
} from "../../apps/ecommerce/store/actions";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const [data, setData] = useState(null);
  const [activeView, setActiveView] = useState("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const store = useSelector((state) => state.ecommerce);

  useEffect(() => {
    axios
      .get(`${endpoint}/users/me`)
      .then((response) => setData(response.data));
  }, []);

  useEffect(() => {
    if (data && data.brand) {
      dispatch(
        getProductsTienda(
          { id: data.brand.id },
          {
            _start,
            _limit,
            "_where[0][brand.id]": data.brand.id,
          }
        )
      );
    }
  }, [data, dispatch]);

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Profile"
        breadCrumbParent="Pages"
        breadCrumbActive="Profile"
      />
      {data !== null ? (
        <div id="user-profile">
          <Row>
            <Col sm="12">
              <ProfileHeader data={data} />
            </Col>
          </Row>
        </div>
      ) : null}
      {data && data.brand ? (
        <Fragment>
          <Products
            store={store}
            dispatch={dispatch}
            addToCart={addToCart}
            activeView={activeView}
            id={data.brand.id}
            getProducts={getProductsTienda}
            sidebarOpen={sidebarOpen}
            getCartItems={getCartItems}
            setActiveView={setActiveView}
            addToWishlist={addToWishlist}
            setSidebarOpen={setSidebarOpen}
            deleteCartItem={deleteCartItem}
            deleteWishlistItem={deleteWishlistItem}
          />
          <Sidebar
            id={data.brand.id}
            store={store}
            dispatch={dispatch}
            getProducts={getProductsTienda}
            sidebarOpen={sidebarOpen}
          />
        </Fragment>
      ) : (
        <Button
          onClick={(e) => {
            console.log(data);
            axios
              .post("http://localhost:1337/tiendas", {
                user: data.id,
                companyName: "test name",
              })
              .then((res) => {
                // window.location.reload();
              });
          }}
        >
          Crea tu Tienda!
        </Button>
      )}
    </Fragment>
  );
};

export default Profile;
