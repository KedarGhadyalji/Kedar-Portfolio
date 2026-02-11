import { navIcons, navLinks } from "#constants";
import React from "react";
import dayjs from "dayjs";
import useWindowStore from "#store/window";

const Navbar = () => {
  const { openWindow, toggleDarkMode, isDarkMode } = useWindowStore();

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
            const isToggle = img.includes("mode");

            return (
              <li
                key={id}
                onClick={isToggle ? toggleDarkMode : undefined}
                className="cursor-pointer group relative"
              >
                <img src={img} className="icon-hover" alt={`icon-${id}`} />

                {isToggle && (
                  <span className="nav-tooltip">
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                  </span>
                )}
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
