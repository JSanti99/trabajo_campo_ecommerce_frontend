import { lazy } from "react";
import { Redirect } from "react-router-dom";

const AppRoutes = [
  {
    path: "/apps/invoice/list",
    component: lazy(() => import("../../views/apps/invoice/list")),
  },
  {
    path: "/apps/invoice/preview/:id",
    component: lazy(() => import("../../views/apps/invoice/preview")),
    meta: {
      navLink: "/apps/invoice/preview",
    },
  },
  {
    path: "/apps/invoice/preview",
    exact: true,
    component: () => <Redirect to="/apps/invoice/preview/4987" />,
  },
  {
    path: "/apps/invoice/edit/:id",
    component: lazy(() => import("../../views/apps/invoice/edit")),
    meta: {
      navLink: "/apps/invoice/edit",
    },
  },
  {
    path: "/apps/invoice/edit",
    exact: true,
    component: () => <Redirect to="/apps/invoice/edit/4987" />,
  },
  {
    path: "/apps/invoice/add",
    component: lazy(() => import("../../views/apps/invoice/add")),
  },
  {
    path: "/apps/invoice/print",
    layout: "BlankLayout",
    component: lazy(() => import("../../views/apps/invoice/print")),
  },
  {
    path: "/apps/ecommerce/shop",
    className: "ecommerce-application",
    component: lazy(() => import("../../views/apps/ecommerce/shop")),
  },
  {
    path: "/apps/ecommerce/wishlist",
    className: "ecommerce-application",
    component: lazy(() => import("../../views/apps/ecommerce/wishlist")),
  },
  {
    path: "/apps/ecommerce/product-detail",
    exact: true,
    className: "ecommerce-application",
    component: () => (
      <Redirect to="/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26" />
    ),
  },
  {
    path: "/apps/ecommerce/product-detail/:product",
    exact: true,
    className: "ecommerce-application",
    component: lazy(() => import("../../views/apps/ecommerce/detail")),
    meta: {
      navLink: "/apps/ecommerce/product-detail",
    },
  },
  {
    path: "/apps/ecommerce/checkout",
    className: "ecommerce-application",
    component: lazy(() => import("../../views/apps/ecommerce/checkout")),
  },
  {
    path: "/apps/user/list",
    component: lazy(() => import("../../views/apps/user/list")),
  },
  {
    path: "/apps/user/edit",
    exact: true,
    component: () => <Redirect to="/apps/user/edit/1" />,
    meta: {
      action: "read",
      resource: "ACL",
    },
  },
  {
    path: "/apps/user/edit/:id",
    component: lazy(() => import("../../views/apps/user/edit")),
    meta: {
      navLink: "/apps/user/edit",
      action: "read",
      resource: "ACL",
    },
  },
  {
    path: "/apps/user/view",
    exact: true,
    component: () => <Redirect to="/apps/user/view/1" />,
  },
  {
    path: "/apps/user/view/:id",
    component: lazy(() => import("../../views/apps/user/view")),
    meta: {
      navLink: "/apps/user/view",
    },
  },
];

export default AppRoutes;
