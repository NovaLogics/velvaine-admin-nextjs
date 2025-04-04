import {
    LayoutDashboard,
    Shapes,
    ShoppingBag,
    Tag,
    UsersRound,
  } from "lucide-react";
  
  export const navLinks = [
    {
      url: "/",
      icon: <LayoutDashboard strokeWidth={1} />,
      label: "Dashboard",
    },
    {
      url: "/collections",
      icon: <Shapes strokeWidth={1}/>,
      label: "Collections",
    },
    {
      url: "/products",
      icon: <Tag strokeWidth={1}/>,
      label: "Products",
    },
    {
      url: "/orders",
      icon: <ShoppingBag strokeWidth={1}/>,
      label: "Orders",
    },
    {
      url: "/customers",
      icon: <UsersRound strokeWidth={1}/>,
      label: "Customers",
    },
  ];
  