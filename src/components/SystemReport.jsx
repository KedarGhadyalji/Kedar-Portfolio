import React, { useState, useEffect } from "react";
import useWindowStore from "#store/window";

const SystemReport = () => {
  const { toggleSystemReport, openWindow } = useWindowStore();
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [hoveredLabel, setHoveredLabel] = useState(
    "Hover segments for details",
  );

  const handleUpdate = () => {
    setStatus("downloading");
  };

  useEffect(() => {
    if (status === "downloading") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStatus("installed"), 800);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <div
      className="fixed inset-0 z-10002 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
      onClick={toggleSystemReport}
    >
      <div
        className="w-full max-w-[520px] bg-[#ececec] dark:bg-[#1e1e1e] rounded-2xl shadow-2xl border border-white/20 overflow-hidden text-black dark:text-white transition-all duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="flex items-center p-4 border-b border-gray-300 dark:border-white/10 relative">
          <div className="flex gap-2">
            <div
              onClick={toggleSystemReport}
              className="size-3 rounded-full bg-[#ff6157] cursor-pointer hover:brightness-90 transition-all"
            />
            <div className="size-3 rounded-full bg-[#ffc030]" />
            <div className="size-3 rounded-full bg-[#2acb42]" />
          </div>
          <p className="absolute left-1/2 -translate-x-1/2 text-[11px] font-bold opacity-50 uppercase tracking-widest">
            About This Kedar
          </p>
          <div className="ml-auto flex items-center gap-1.5 text-[10px] text-green-600 dark:text-green-400 font-bold pr-1">
            <span className="animate-pulse text-xs">⚡</span> 100% Charged
          </div>
        </div>

        <div className="p-3 flex flex-col items-center">
          {/* Hardware Icon */}
          <div className="mb-2 drop-shadow-2xl scale-110">
            <img src="/macbook.png" className="w-24 h-auto" alt="Kedar Pro" />
          </div>

          <h2 className="text-3xl font-extrabold mb-1 tracking-tight">
            Kedar Pro
          </h2>
          <p className="text-[10px] opacity-40 mb-8 font-mono tracking-widest uppercase transition-all">
            {status === "installed"
              ? 'KedarOS 2.1 "The AI-ML Era"'
              : 'KedarOS 2.0 "The Full-Stack Edition"'}
          </p>

          {/* Technical Specs Grid */}
          <div className="w-full max-w-[420px] space-y-3.5 text-[12.5px] border-y border-gray-300 dark:border-white/5 py-4">
            <div className="grid grid-cols-12 gap-4">
              <span className="col-span-4 font-bold text-right opacity-100">
                Model Name:
              </span>
              <span className="col-span-8 opacity-60">
                Kedar Pro (6-foot Form Factor)
              </span>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <span className="col-span-4 font-bold text-right opacity-100">
                Processor:
              </span>
              <span className="col-span-8 opacity-60 leading-tight">
                16-Core Logic Engine (8 Performance, 6 Efficiency, 2 Creativity)
              </span>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <span className="col-span-4 font-bold text-right opacity-100">
                Graphics:
              </span>
              <span className="col-span-8 opacity-60">
                40-Core "Pixel-Perfect" GPU w/ Creative Ray Tracing
              </span>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <span className="col-span-4 font-bold text-right opacity-100">
                Neural Engine:
              </span>
              <span className="col-span-8 opacity-60">
                16-Core Adaptive Learning for Game AI
              </span>
            </div>
          </div>

          {/* Authentic Storage Section */}
          <div className="w-full max-w-[420px] mt-10">
            <div className="flex justify-between items-end mb-3 px-1 h-4">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                Flash Storage: 2 TB Total
              </p>
              <p className="text-[10px] text-blue-500 font-bold italic transition-all duration-300">
                {hoveredLabel}
              </p>
            </div>

            {/* The "Pill" Container */}
            <div className="w-full h-5 bg-gray-300 dark:bg-[#121212] rounded-full overflow-hidden flex shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)] border border-gray-400/30 dark:border-white/5 cursor-help">
              {/* Full Stack - Blue */}
              <div
                className="h-full transition-all duration-700 hover:brightness-110 border-r border-black/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                style={{
                  width: "50%",
                  background: "linear-gradient(to bottom, #3b82f6, #1d4ed8)",
                }}
                onMouseEnter={() =>
                  setHoveredLabel("Full-Stack: Backend, Frontend, Game Dev")
                }
                onMouseLeave={() =>
                  setHoveredLabel("Hover segments for details")
                }
              />

              {/* Design - Green */}
              <div
                className="h-full transition-all duration-700 hover:brightness-110 border-r border-black/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                style={{
                  width: "25%",
                  background: "linear-gradient(to bottom, #22c55e, #15803d)",
                }}
                onMouseEnter={() =>
                  setHoveredLabel("Design: Figma, Blender, Aseprite")
                }
                onMouseLeave={() =>
                  setHoveredLabel("Hover segments for details")
                }
              />

              {/* Cache - Pink */}
              <div
                className="h-full transition-all duration-700 hover:brightness-110 border-r border-black/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                style={{
                  width: status === "installed" ? "6.25%" : "12.5%",
                  background: "linear-gradient(to bottom, #ec4899, #be185d)",
                }}
                onMouseEnter={() =>
                  setHoveredLabel("System Cache: Performance Buffers & Logic")
                }
                onMouseLeave={() =>
                  setHoveredLabel("Hover segments for details")
                }
              />

              {/* AI-ML - Purple */}
              {status === "installed" && (
                <div
                  className="h-full transition-all duration-1000 animate-in slide-in-from-left hover:brightness-110 border-r border-black/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                  style={{
                    width: "6.25%",
                    background: "linear-gradient(to bottom, #a855f7, #7e22ce)",
                  }}
                  onMouseEnter={() =>
                    setHoveredLabel("AI-ML: Neural Networks & Data Models")
                  }
                  onMouseLeave={() =>
                    setHoveredLabel("Hover segments for details")
                  }
                />
              )}

              {/* Hire Me - Empty/Animated Space */}
              <div
                className="h-full bg-gray-200 dark:bg-white/5 transition-all duration-700 relative overflow-hidden"
                style={{ width: "12.5%" }}
                onMouseEnter={() =>
                  setHoveredLabel("Available: Ready for your next project!")
                }
                onMouseLeave={() =>
                  setHoveredLabel("Hover segments for details")
                }
              >
                <div className="absolute inset-0 bg-blue-400/10 animate-pulse" />
              </div>
            </div>

            {/* Legend Labels */}
            <div className="grid grid-cols-4 mt-6 text-[10px] font-bold opacity-60 text-center tracking-tight">
              <div className="flex flex-col items-center gap-1 border-r border-gray-400/20 px-1">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full shadow-sm bg-blue-500" />{" "}
                  Full-Stack
                </div>
                <span className="opacity-40 font-mono">1.0 TB</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-r border-gray-400/20 px-1">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full shadow-sm bg-green-500" />{" "}
                  Design
                </div>
                <span className="opacity-40 font-mono">512 GB</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-r border-gray-400/20 px-1 text-center">
                <div className="flex items-center gap-1.5 justify-center">
                  <span
                    className="size-2 rounded-full shadow-sm"
                    style={{
                      background:
                        status === "installed" ? "#a855f7" : "#ec4899",
                    }}
                  />
                  {status === "installed" ? "AI-ML" : "Cache"}
                </div>
                <span className="opacity-40 font-mono text-center">
                  {status === "installed" ? "140 GB" : "256 GB"}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-1">
                <span className="text-blue-500 font-black animate-bounce text-[9px]">
                  HIRE ME
                </span>
                <span className="opacity-40 font-mono">280 GB</span>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="mt-12 w-full flex flex-col items-center h-10 justify-center">
            {status === "downloading" ? (
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-[10px] opacity-60 font-bold italic">
                  <span>Downloading Kernel Update...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-300 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : status === "installed" ? (
              <div className="text-green-600 dark:text-green-400 text-[11px] font-black flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500 uppercase tracking-widest">
                <span className="size-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                KedarOS 2.1 Live
              </div>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={handleUpdate}
                  className="px-6 py-2 bg-gray-300/50 dark:bg-white/5 hover:bg-gray-400/50 dark:hover:bg-white/10 rounded-lg border border-black/5 dark:border-white/10 text-[11px] font-bold transition-all active:scale-95 shadow-sm"
                >
                  Software Update...
                </button>
                <button
                  onClick={() => openWindow("contact")}
                  className="px-8 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg border border-blue-700 text-[11px] transition-all active:scale-95 font-black shadow-lg shadow-blue-500/30"
                >
                  Hire Kedar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemReport;
