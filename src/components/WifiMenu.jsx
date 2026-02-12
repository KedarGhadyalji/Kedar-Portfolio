import React, { useState } from "react";
import useWindowStore from "#store/window";

const WifiMenu = () => {
  const { isWifiOn, toggleWifi, isWifiConnected, setWifiConnected } =
    useWindowStore();
  const [isConnecting, setIsConnecting] = useState(false);
  const myEmail = "kedarghadyalji@gmail.com";

  const handleConnect = () => {
    if (isWifiConnected || isConnecting || !isWifiOn) return;

    setIsConnecting(true);

    setTimeout(() => {
      navigator.clipboard.writeText(myEmail);
      setWifiConnected(true);
      setIsConnecting(false);
    }, 1500);
  };

  return (
    <div className="absolute top-12 right-40 w-64 bg-white/70 dark:bg-black/70 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 p-3 select-none z-[9999] text-black dark:text-white">
      <div className="flex justify-between items-center px-2 py-1">
        <span className="font-bold text-sm">Wi-Fi</span>
        <div
          onClick={toggleWifi}
          className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${isWifiOn ? "bg-blue-500" : "bg-gray-400"}`}
        >
          <div
            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${isWifiOn ? "left-5" : "left-0.5"}`}
          />
        </div>
      </div>

      <div className="mt-2 border-t border-gray-400/20 pt-2">
        <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 px-2 uppercase mb-1">
          {isWifiOn ? "Preferred Network" : "Wi-Fi is Disabled"}
        </p>

        {isWifiOn ? (
          <div
            onClick={handleConnect}
            className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-blue-500 group cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <img
                src="/icons/wifi.svg"
                className={`w-4 dark:invert group-hover:invert-0 ${isConnecting ? "animate-pulse" : ""}`}
                alt="wifi"
              />
              <span className="text-sm font-medium group-hover:text-white">
                {isWifiConnected
                  ? "Connected"
                  : isConnecting
                    ? "Connecting..."
                    : "Kedar_Gmail"}
              </span>
            </div>
            {isWifiConnected && (
              <span className="text-blue-500 group-hover:text-white text-xs">
                ●
              </span>
            )}
          </div>
        ) : (
          <p className="text-xs text-gray-400 px-2 py-2 italic">
            Turn on Wi-Fi to see networks
          </p>
        )}
      </div>
    </div>
  );
};

export default WifiMenu;
