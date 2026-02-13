import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useWindowStore = create(
  immer((set) => ({
    // --- STATE ---
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,
    isDarkMode: false,

    // System States
    isWifiOn: false,
    isWifiConnected: false,
    isNotificationOpen: false,
    isSearchOpen: false,
    isSystemReportOpen: false, // Added
    activeMenu: null,

    // --- ACTIONS ---

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
        if (status) state.isNotificationOpen = true;
      });

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
        if (state.activeMenu) {
          state.isSearchOpen = false;
          state.isSystemReportOpen = false; // Close report if menu opens
        }
      });
    },

    toggleSearch: () => {
      set((state) => {
        state.isSearchOpen = !state.isSearchOpen;
        if (state.isSearchOpen) {
          state.activeMenu = null;
          state.isSystemReportOpen = false; // Close report if search opens
        }
      });
    },

    toggleSystemReport: () => {
      set((state) => {
        state.isSystemReportOpen = !state.isSystemReportOpen;
        if (state.isSystemReportOpen) {
          state.activeMenu = null;
          state.isSearchOpen = false; // Close search if report opens
        }
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

        state.activeMenu = null;
        state.isSearchOpen = false;
        state.isSystemReportOpen = false; // Close report when opening a window
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
