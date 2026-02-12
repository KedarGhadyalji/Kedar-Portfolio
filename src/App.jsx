import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import { Navbar, Welcome, Dock, NotificationManager } from "#components";
import WifiMenu from "./components/WifiMenu";
import React, { useEffect } from "react";
import useWindowStore from "#store/window";
import {
  Contact,
  Finder,
  Image,
  Photos,
  Resume,
  Safari,
  Terminal,
  Text,
} from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  const isDarkMode = useWindowStore((state) => state.isDarkMode);
  const activeMenu = useWindowStore((state) => state.activeMenu);

  useEffect(() => {
    document.body.style.backgroundImage = isDarkMode
      ? "url('/images/wallpaper2.png')"
      : "url('/images/wallpaper1.png')";
  }, [isDarkMode]);

  return (
    <main className={isDarkMode ? "dark" : ""}>
      <Navbar />

      {/* System Overlays */}
      {activeMenu === "wifi" && <WifiMenu />}
      <NotificationManager />

      <Welcome />
      <Dock />
      {/* Windows Layer */}
      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photos />
    </main>
  );
};

export default App;
