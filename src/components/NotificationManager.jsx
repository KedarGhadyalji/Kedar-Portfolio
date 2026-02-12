import React from "react";
import useWindowStore from "#store/window";

const NotificationManager = () => {
  const isNotificationOpen = useWindowStore(
    (state) => state.isNotificationOpen,
  );

  if (!isNotificationOpen) return null;

  return (
    <div className="macos-notification">
      <div className="bg-blue-500 p-2 rounded-lg flex-shrink-0">
        <img src="/icons/wifi.svg" className="w-5 invert" alt="wifi icon" />
      </div>
      <div className="flex flex-col">
        <h4 className="text-sm font-bold dark:text-white leading-tight">
          System Connection
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Connected to Kedar_Gmail. Email copied to clipboard!
        </p>
      </div>
    </div>
  );
};

export default NotificationManager;
