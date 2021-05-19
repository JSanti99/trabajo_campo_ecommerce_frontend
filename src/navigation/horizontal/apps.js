import {
  Box,
  Mail,
  MessageSquare,
  CheckSquare,
  Calendar,
  FileText,
  Circle,
  ShoppingCart,
  User,
} from "react-feather";

export default [
  {
    id: "eCommerce",
    title: "Productos",
    icon: <ShoppingCart />,
    action: "read",
    resource: "ACL",
    children: [
      {
        id: "shop",
        title: "Todos",
        icon: <Circle />,
        navLink: "/apps/ecommerce/shop",
        action: "read",
        resource: "ACL",
      },
      {
        id: "detail",
        title: "Detalles",
        icon: <Circle />,
        navLink: "/apps/ecommerce/product-detail",
      },
      {
        id: "wishList",
        title: "Wish List",
        icon: <Circle />,
        navLink: "/apps/ecommerce/wishlist",
      },
      {
        id: "checkout",
        title: "Checkout",
        icon: <Circle />,
        navLink: "/apps/ecommerce/checkout",
        action: "read",
        resource: "ACL",
      },
    ],
  },
  {
    id: "users",
    title: "Usuario",
    icon: <User />,
    action: "read",
    resource: "ACL",
    children: [
      {
        id: "list",
        title: "List",
        icon: <Circle />,
        navLink: "/apps/user/list",
      },
      {
        id: "view",
        title: "Ver",
        icon: <Circle />,
        navLink: "/apps/user/view",
        action: "manage",
        resource: "TIENDA",
      },
      {
        id: "edit",
        title: "Editar",
        icon: <Circle />,
        navLink: "/apps/user/edit",
        action: "read",
        resource: "ACL",
      },
      {
        id: "blogEdit",
        title: "Crear Productos",
        icon: <Circle />,
        navLink: "/pages/blog/edit",
        action: "manage",
        resource: "TIENDA",
      },
    ],
  },
  {
    id: "apps",
    title: "Apps",
    icon: <Box />,
    children: [
      {
        id: "email",
        title: "Email",
        icon: <Mail />,
        navLink: "/apps/email",
      },
      {
        id: "chat",
        title: "Chat",
        icon: <MessageSquare />,
        navLink: "/apps/chat",
      },
      {
        id: "todo",
        title: "Todo",
        icon: <CheckSquare />,
        navLink: "/apps/todo",
      },
      {
        id: "calendar",
        title: "Calendar",
        icon: <Calendar />,
        navLink: "/apps/calendar",
      },
      {
        id: "invoiceApp",
        title: "Invoice",
        icon: <FileText />,

        children: [
          {
            id: "invoiceList",
            title: "List",
            icon: <Circle />,
            navLink: "/apps/invoice/list",
            action: "manage",
            resource: "TIENDA",
          },
          {
            id: "invoicePreview",
            title: "Preview",
            icon: <Circle />,
            navLink: "/apps/invoice/preview",
          },
          {
            id: "invoiceEdit",
            title: "Edit",
            icon: <Circle />,
            navLink: "/apps/invoice/edit",
          },
          {
            id: "invoiceAdd",
            title: "Add",
            icon: <Circle />,
            navLink: "/apps/invoice/add",
          },
        ],
      },
    ],
  },
];
