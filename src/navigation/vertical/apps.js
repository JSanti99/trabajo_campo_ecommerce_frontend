import {
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
    header: "Apps & Pages",
  },
  {
    id: "email",
    title: "Email",
    icon: <Mail size={20} />,
    navLink: "/apps/email",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <MessageSquare size={20} />,
    navLink: "/apps/chat",
  },
  {
    id: "todo",
    title: "Todo",
    icon: <CheckSquare size={20} />,
    navLink: "/apps/todo",
  },
  {
    id: "calendar",
    title: "Calendar",
    icon: <Calendar size={20} />,
    navLink: "/apps/calendar",
  },
  {
    id: "invoiceApp",
    title: "Invoice",
    icon: <FileText size={20} />,
    action: "manage",
    resource: "TIENDA",
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
        action: "manage",
        resource: "TIENDA",
      },
      {
        id: "invoicePreview",
        title: "Preview",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/preview",
      },
      {
        id: "invoiceEdit",
        title: "Edit",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/edit",
      },
      {
        id: "invoiceAdd",
        title: "Add",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/add",
      },
    ],
  },
  {
    id: "eCommerce",
    title: "Productos",
    icon: <ShoppingCart size={20} />,
    action: "read",
    resource: "ACL",
    children: [
      {
        id: "shop",
        title: "Todos",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/shop",
        action: "read",
        resource: "ACL",
      },
      {
        id: "detail",
        title: "Detalles",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/product-detail",
      },
      {
        id: "wishList",
        title: "Wish List",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/wishlist",
      },
      {
        id: "checkout",
        title: "Checkout",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/checkout",
        action: "read",
        resource: "ACL",
      },
    ],
  },
  {
    id: "users",
    title: "Usuario",
    icon: <User size={20} />,
    children: [
      {
        id: "list",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/user/list",
      },
      {
        id: "view",
        title: "Ver",
        icon: <Circle size={12} />,
        navLink: "/apps/user/view",
        action: "manage",
        resource: "TIENDA",
      },
      {
        id: "edit",
        title: "Editar",
        icon: <Circle size={12} />,
        navLink: "/apps/user/edit",
        action: "read",
        resource: "ACL",
      },
      {
        id: "blogEdit",
        title: "Crear Productos",
        permissions: ["admin", "editor"],
        navLink: "/pages/blog/edit",
        action: "manage",
        resource: "TIENDA",
      },
    ],
  },
];
