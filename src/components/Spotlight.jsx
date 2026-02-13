import React, { useState, useMemo } from "react";
import useWindowStore from "#store/window";
import { locations, WINDOW_CONFIG } from "#constants";

const Spotlight = () => {
  const [query, setQuery] = useState("");
  const { setSearchOpen, openWindow } = useWindowStore();

  // Helper to get the correct icon based on item properties
  const getIcon = (item) => {
    if (item.icon) return item.icon; // Use existing icon if defined

    if (item.kind === "app") {
      // Maps app keys to your specific .png files
      const appIcons = {
        finder: "/images/finder.png",
        safari: "/images/safari.png",
        photos: "/images/photos.png",
        terminal: "/images/terminal.png",
        contact: "/images/contact.png",
        resume: "/images/pdf.png",
      };
      return appIcons[item.id] || "/images/finder.png";
    }

    if (item.kind === "folder") return "/images/folder.png";

    if (item.kind === "file") {
      const fileIcons = {
        pdf: "/images/pdf.png",
        txt: "/images/txt.png",
        img: "/images/image.png",
        url: "/images/safari.png",
        fig: "/images/figma.png",
      };
      return fileIcons[item.fileType] || "/images/plain.png";
    }

    return "/images/plain.png";
  };

  const searchableItems = useMemo(() => {
    const items = [];

    // 1. Add Apps (from WINDOW_CONFIG keys)
    Object.keys(WINDOW_CONFIG).forEach((key) => {
      // Skip internal file windows
      if (key === "txtfile" || key === "imgfile") return;
      items.push({
        id: key,
        name: key.charAt(0).toUpperCase() + key.slice(1),
        kind: "app",
      });
    });

    // 2. Crawl Locations (Work, About, etc.)
    const crawl = (obj, parentName = "System") => {
      if (obj.children) {
        obj.children.forEach((child) => {
          items.push({ ...child, parentName });
          if (child.kind === "folder") crawl(child, child.name);
        });
      }
    };
    Object.values(locations).forEach((loc) => crawl(loc, loc.name));
    return items;
  }, []);

  const results = query
    ? searchableItems
        .filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6)
    : [];

  const handleAction = (item) => {
    if (item.kind === "app") {
      openWindow(item.id);
    } else if (item.fileType === "img") {
      openWindow("imgfile", item);
    } else if (item.fileType === "txt") {
      openWindow("txtfile", item);
    } else {
      openWindow("finder", item);
    }
    setSearchOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-10000 flex justify-center pt-[15vh] bg-black/20 backdrop-blur-sm"
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="w-[600px] bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-3xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden text-black dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center p-4 gap-4 border-b border-gray-500/10">
          <img
            src="/icons/search.svg"
            className="w-6 opacity-50 dark:invert"
            alt=""
          />
          <input
            autoFocus
            className="w-full bg-transparent outline-none text-2xl font-light placeholder:text-gray-400"
            placeholder="Spotlight Search"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="max-h-[380px] overflow-y-auto">
          {results.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleAction(item)}
              className="flex items-center justify-between px-5 py-3 hover:bg-blue-600 hover:text-white cursor-pointer group transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={getIcon(item)}
                  className="w-10 h-10 object-contain group-hover:drop-shadow-md"
                  alt=""
                />
                <div>
                  <p className="font-semibold text-sm leading-tight">
                    {item.name}
                  </p>
                  <p className="text-[10px] opacity-60 uppercase mt-0.5 tracking-wider">
                    {item.kind === "app"
                      ? "Application"
                      : item.kind || item.fileType}
                  </p>
                </div>
              </div>
              <span className="text-xs opacity-40 group-hover:opacity-100 italic">
                {item.parentName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Spotlight;
