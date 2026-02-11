import { Draggable } from "gsap/Draggable";
import gsap from "gsap";

import { Navbar, Welcome, Dock, Home } from "#components";
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

  useEffect(() => {
    // This updates the body background directly when dark mode changes
    if (isDarkMode) {
      document.body.style.backgroundImage = "url('/images/wallpaper2.png')";
    } else {
      document.body.style.backgroundImage = "url('/images/wallpaper1.png')";
    }
  }, [isDarkMode]);

  return (
    <main className={isDarkMode ? "dark" : ""}>
      <Navbar />
      <Welcome />
      <Dock />
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
