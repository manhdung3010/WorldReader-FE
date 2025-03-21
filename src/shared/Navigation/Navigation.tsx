import React from "react";
import NavigationItem from "./NavigationItem";
import useNavigationDemo from "@/data/navigation";

function Navigation() {
  const navigationItems = useNavigationDemo();

  return (
    <ul className="nc-Navigation flex items-center">
      {navigationItems?.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
