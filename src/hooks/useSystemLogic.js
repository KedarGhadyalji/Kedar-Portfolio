import { useEffect } from "react";
import useWindowStore from "#store/window";

export const useSystemLogic = () => {
  const isDarkMode = useWindowStore((state) => state.isDarkMode);
  const toggleSearch = useWindowStore((state) => state.toggleSearch);

  useEffect(() => {
    // 1. Handle Keyboard Shortcuts (Cmd/Ctrl + K)
    const handleKeys = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleSearch();
      }
    };

    // 2. Handle Wallpaper Changes
    document.body.style.backgroundImage = isDarkMode
      ? "url('/images/wallpaper2.png')"
      : "url('/images/wallpaper1.png')";

    window.addEventListener("keydown", handleKeys);

    return () => {
      window.removeEventListener("keydown", handleKeys);
    };
  }, [isDarkMode, toggleSearch]);
};
