import { lazy } from "react";

const DashboardRoutes = [
  // Dashboards
  {
    path: "/dashboard/analytics",
    component: lazy(() => import("../../views/dashboard/analytics")),
  },
  {
    path: "/dashboard/ecommerce",
    component: lazy(() => import("../../views/dashboard/ecommerce")),
    exact: true,
    meta: {
      action: "manage",
      resource: "TIENDA",
    },
  },
];

export default DashboardRoutes;
