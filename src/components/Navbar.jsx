import { navIcons, navLinks } from "#constants";
import React from "react";
import dayjs from "dayjs";
import useWindowStore from "#store/window";

const Navbar = () => {
  const {
    openWindow,
    toggleDarkMode,
    isDarkMode,
    toggleMenu,
    toggleSearch,
    toggleSystemReport,
  } = useWindowStore();

  const handleIconClick = (id, img) => {
    if (img.includes("mode")) toggleDarkMode();
    if (img.includes("wifi")) toggleMenu("wifi");
    if (img.includes("search")) toggleSearch();
    if (img.includes("user")) toggleSystemReport();
  };

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Kedar's Portfolio</p>
        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map(({ id, img }) => {
            const isMode = img.includes("mode");
            const isWifi = img.includes("wifi");
            const isSearch = img.includes("search");
            const isUser = img.includes("user"); // Added check for user icon

            return (
              <li
                key={id}
                onClick={() => handleIconClick(id, img)}
                className="cursor-pointer group relative"
              >
                <img src={img} className="icon-hover" alt={`icon-${id}`} />

                <span className="nav-tooltip">
                  {isMode
                    ? isDarkMode
                      ? "Light Mode"
                      : "Dark Mode"
                    : isWifi
                      ? "Wi-Fi Settings"
                      : isSearch
                        ? "Spotlight Search"
                        : isUser
                          ? "Kedar Specs"
                          : `Open ${id}`}
                </span>
              </li>
            );
          })}
        </ul>
        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
