"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "./navbar.module.css";
import {
  MdArrowBack,
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";
import {
  MdAnalytics,
  MdAttachMoney,
  MdDashboard,
  MdHelpCenter,
  MdLogout,
  MdPeople,
  MdSettings,
  MdShoppingBag,
  MdSupervisedUserCircle,
  MdWork,
} from "react-icons/md";
import { TiThMenu } from "react-icons/ti";
import MenuLink from "../sidebar/menuLink/menuLink";
import { useEffect, useState } from "react";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "/dashboard/transactions",
        icon: <MdAttachMoney />,
      },
    ],
  },

  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showDividerContent, setShowDividerContent] = useState(false);

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };

  const handleToggleDividerContent = () => {
    setShowDividerContent(!showDividerContent);
  };

  useEffect(() => {
    const handleMenuLinkClick = () => {
      setShowDividerContent(false);
    };

    window.addEventListener("menuLinkClicked", handleMenuLinkClick);

    return () => {
      window.removeEventListener("menuLinkClicked", handleMenuLinkClick);
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.navStart}>
          <div className={styles.divider} onClick={handleToggleDividerContent}>
            <TiThMenu size={30} />
          </div>
          <div className={styles.title}>
            {truncateTitle(pathname.split("/").pop(), 7)}
          </div>
        </div>

        <div className={styles.menu}>
          <div className={styles.search}>
            <MdSearch className={styles.searchIcon} />
            <input
              type="search"
              placeholder="Search"
              className={styles.input}
            />
          </div>
          <div className={styles.icons}>
            <MdOutlineChat size={25} />
            <MdNotifications size={25} />
            <MdPublic size={25} />
          </div>
        </div>
      </div>
      <div
        className={`${styles.dividerContent} ${
          showDividerContent ? styles.showContent : ""
        }`}
      >
        <MdArrowBack
          size={30}
          onClick={handleToggleDividerContent}
          className={styles.backIcon}
        />
        <ul>
          {menuItems.map((cat) => (
            <li key={cat.title}>
              <span className={styles.cat}>{cat.title}</span>
              {cat.list.map((item) => (
                <MenuLink item={item} key={item.title} />
              ))}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
