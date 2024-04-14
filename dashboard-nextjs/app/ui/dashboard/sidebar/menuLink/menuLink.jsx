"use client";

import Link from "next/link";
import styles from "./menuLink.module.css";
import { usePathname, useRouter } from "next/navigation";

const MenuLink = ({ item }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    // Redirect to the specified path
    router.push(item.path);

    // Close the menu after redirecting
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("menuLinkClicked"));
    }
  };

  return (
    <Link
      href={item.path}
      onClick={handleClick}
      className={`${styles.container} ${
        pathname === item.path && styles.active
      }`}
    >
      {item.icon}
      {item.title}
    </Link>
  );
};

export default MenuLink;
