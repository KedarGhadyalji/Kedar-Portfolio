import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,
    isDarkMode: false,

    // WIFI & MENU STATE
    isWifiOn: false,
    isWifiConnected: false,
    isNotificationOpen: false,
    activeMenu: null,

    toggleDarkMode: () => {
      set((state) => {
        state.isDarkMode = !state.isDarkMode;
      });
    },

    toggleWifi: () => {
      set((state) => {
        state.isWifiOn = !state.isWifiOn;
        if (!state.isWifiOn) state.isWifiConnected = false;
      });
    },

    setWifiConnected: (status) => {
      set((state) => {
        state.isWifiConnected = status;
        if (status) {
          state.isNotificationOpen = true;
        }
      });

      // Auto-hide notification after 4 seconds
      if (status) {
        setTimeout(() => {
          set((state) => {
            state.isNotificationOpen = false;
          });
        }, 4000);
      }
    },

    toggleMenu: (menuId) => {
      set((state) => {
        state.activeMenu = state.activeMenu === menuId ? null : menuId;
      });
    },

    openWindow: (windowKey, data = null) => {
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
        state.activeMenu = null; // Close menus when opening a window
      });
    },

    closeWindow: (windowKey) => {
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      });
    },

    focusWindow: (windowKey) => {
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.zIndex = state.nextZIndex++;
      });
    },
  })),
);

export default useWindowStore;
