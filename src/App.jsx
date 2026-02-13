import { Draggable } from "gsap/Draggable";
import gsap from "gsap";
import {
  Navbar,
  Welcome,
  Dock,
  NotificationManager,
  Spotlight,
  SystemReport,
} from "#components";
import WifiMenu from "./components/WifiMenu";
import React from "react";
import useWindowStore from "#store/window";
import { useSystemLogic } from "./hooks/useSystemLogic";
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
  const isSearchOpen = useWindowStore((state) => state.isSearchOpen);
  const isSystemReportOpen = useWindowStore(
    (state) => state.isSystemReportOpen,
  );
  // Run all background system logic (Wallpaper, Shortcuts, etc.)
  useSystemLogic();

  return (
    <main className={isDarkMode ? "dark" : ""}>
      <Navbar />
      {/* System Layers */}
      {activeMenu === "wifi" && <WifiMenu />}
      {isSearchOpen && <Spotlight />}
      {isSystemReportOpen && <SystemReport />}
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
