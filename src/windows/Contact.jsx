import React, { useState, useEffect, useRef } from "react";
import {
  Files,
  Search,
  Bug,
  Settings,
  User,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileCode,
  FileJson,
  File,
  X,
  Menu,
  MoreHorizontal,
} from "lucide-react";
import { WindowControls } from "#components";
import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";

// --- Sub-components for the File Explorer ---

const FileItem = ({ name, type, active, depth = 0 }) => {
  let Icon = File;
  let color = "text-gray-500 dark:text-gray-400";

  if (type === "react") {
    Icon = FileCode;
    color = "text-blue-500 dark:text-[#61dafb]";
  } else if (type === "js") {
    Icon = FileCode;
    color = "text-yellow-600 dark:text-[#f1e05a]";
  } else if (type === "json") {
    Icon = FileJson;
    color = "text-yellow-600 dark:text-[#f1e05a]";
  } else if (type === "image") {
    Icon = File;
    color = "text-purple-600 dark:text-purple-400";
  }

  return (
    // Added !transform-none to prevent the global #contact li hover effect
    <div
      className={`flex items-center gap-1.5 py-[3px] hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors !transform-none !scale-100 ${
        active
          ? "bg-[var(--selection-bg)] text-blue-600"
          : "text-[var(--text-color)] opacity-80"
      }`}
      style={{ paddingLeft: `${depth * 12 + 10}px` }}
    >
      <Icon size={14} className={color} />
      <span className="text-[13px] whitespace-nowrap">{name}</span>
    </div>
  );
};

const FolderItem = ({ name, children, open = false, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <div>
      <div
        className="flex items-center gap-1 py-[3px] text-[var(--text-color)] font-bold hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer select-none transition-colors"
        style={{ paddingLeft: `${depth * 12 + 4}px` }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        {isOpen ? (
          <FolderOpen size={14} className="text-blue-400 dark:text-[#90a4ae]" />
        ) : (
          <Folder size={14} className="text-blue-400 dark:text-[#90a4ae]" />
        )}
        <span className="text-[13px] ml-1 whitespace-nowrap">{name}</span>
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

// --- Main Contact Component ---

const Contact = () => {
  const [history, setHistory] = useState([
    "Kedar's Portfolio [Version 06.01.2006]",
    `(c) ${new Date().getFullYear()} Kedar Ghadyalji. All rights reserved.`,
    "",
    "Want to hire me? (yes/no)",
  ]);

  const [inputVal, setInputVal] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const cmd = inputVal.trim().toLowerCase();
      let response = "";

      if (cmd === "yes" || cmd === "y") {
        response = "Email: kedarghadyalji@gmail.com (Copied!)";
        navigator.clipboard.writeText("kedarghadyalji@gmail.com");
      } else if (cmd === "no" || cmd === "n") {
        response = "No worries!";
      } else if (cmd === "clear") {
        setHistory([]);
        setInputVal("");
        return;
      } else {
        response = `bash: ${inputVal}: command not found`;
      }

      setHistory([...history, `➜  ~ ${inputVal}`, response]);
      setInputVal("");
    }
  };

  return (
    // ID "contact" automatically handles bg, color, and border from your CSS
    <div
      id="contact"
      className="!flex !flex-col h-full w-full !max-w-none !static !border-0 font-sans select-none"
    >
      {/* ID "window-header" handles the header styling automatically */}
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* --- 1. ACTIVITY BAR --- */}
        {/* Using var(--header-bg) to match the theme */}
        <div className="w-10 md:w-12 bg-[var(--header-bg)] flex flex-col items-center py-3 gap-4 shrink-0 z-10 border-r border-[var(--border-color)]">
          <Files
            size={22}
            strokeWidth={1.5}
            className="text-[var(--text-color)] opacity-100 border-l-2 border-blue-500 dark:border-white pl-2 w-full box-content"
          />
          <Search
            size={22}
            strokeWidth={1.5}
            className="text-gray-400 hover:text-[var(--text-color)] transition-colors cursor-pointer"
          />
          <Bug
            size={22}
            strokeWidth={1.5}
            className="text-gray-400 hover:text-[var(--text-color)] transition-colors cursor-pointer"
          />

          <div className="mt-auto flex flex-col gap-4 mb-2">
            <User
              size={22}
              strokeWidth={1.5}
              className="text-gray-400 hover:text-[var(--text-color)] transition-colors cursor-pointer"
            />
            <Settings
              size={22}
              strokeWidth={1.5}
              className="text-gray-400 hover:text-[var(--text-color)] transition-colors cursor-pointer"
            />
          </div>
        </div>

        {/* --- 2. SIDEBAR (Explorer) --- */}
        <div className="hidden md:flex w-52 bg-[var(--header-bg)] flex-col border-r border-[var(--border-color)] overflow-hidden">
          <div className="h-9 px-4 flex items-center justify-between text-[11px] tracking-wider text-gray-500 font-normal uppercase">
            <span>Explorer</span>
            <MoreHorizontal size={14} />
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="flex items-center px-1 py-1 font-bold text-[var(--text-color)] cursor-pointer">
              <ChevronDown size={14} />
              <span className="text-[11px] ml-1 uppercase">
                Kedar-Portfolio
              </span>
            </div>

            {/* Overriding global ul styling from #contact to prevent grid layout */}
            <div className="flex flex-col !gap-0 !block">
              <FolderItem name="src" open={true} depth={1}>
                <FolderItem name="components" depth={2}>
                  <FileItem name="Navbar.jsx" type="react" depth={3} />
                </FolderItem>
                <FolderItem name="windows" open={true} depth={2}>
                  <FileItem
                    name="Contact.jsx"
                    type="react"
                    active={true}
                    depth={3}
                  />
                  <FileItem name="Resume.jsx" type="react" depth={3} />
                </FolderItem>
                <FileItem name="App.jsx" type="react" depth={2} />
              </FolderItem>
              <FileItem name="package.json" type="json" depth={1} />
            </div>
          </div>
        </div>

        {/* --- 3. MAIN EDITOR AREA --- */}
        <div className="flex-1 flex flex-col min-w-0 bg-[var(--window-bg)]">
          {/* Editor Tabs */}
          <div className="flex bg-[var(--header-bg)] h-9 items-center overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 px-3 h-full bg-[var(--window-bg)] text-[var(--text-color)] border-t border-blue-500 dark:border-[#007acc] min-w-fit">
              <FileCode
                size={14}
                className="text-blue-500 dark:text-[#61dafb]"
              />
              <span className="text-[13px]">Contact.jsx</span>
              <X
                size={14}
                className="ml-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-[#333] hover:text-[var(--text-color)] rounded-md p-0.5 cursor-pointer"
              />
            </div>
          </div>

          {/* Breadcrumbs */}
          <div className="hidden sm:flex items-center px-4 py-1 text-[11px] text-gray-500 bg-[var(--window-bg)]">
            <span>src</span>
            <ChevronRight size={12} className="mx-1" />
            <span>windows</span>
            <ChevronRight size={12} className="mx-1" />
            <span className="text-[var(--text-color)]">Contact.jsx</span>
          </div>

          {/* CODE CONTENT */}
          <div className="flex-1 overflow-y-auto p-2 sm:p-4 font-mono text-xs sm:text-sm custom-scrollbar text-left">
            <div className="leading-6">
              <span className="text-purple-600 dark:text-[#c586c0]">
                import
              </span>{" "}
              <span className="text-blue-600 dark:text-[#9cdcfe]">
                {"{ Me }"}
              </span>{" "}
              <span className="text-purple-600 dark:text-[#c586c0]">from</span>{" "}
              <span className="text-red-700 dark:text-[#ce9178]">
                './Universe'
              </span>
              ;
            </div>

            <div className="mt-4 leading-6">
              <span className="text-blue-600 dark:text-[#569cd6]">const</span>{" "}
              <span className="text-yellow-600 dark:text-[#dcdcaa]">
                contactInfo
              </span>{" "}
              <span className="text-[var(--text-color)]">=</span>{" "}
              <span className="text-yellow-500 dark:text-[#ffd700]">{`{`}</span>
            </div>

            <div className="pl-4 sm:pl-6">
              <p className="whitespace-nowrap">
                <span className="text-blue-500 dark:text-[#9cdcfe]">email</span>
                :{" "}
                <span className="text-red-700 dark:text-[#ce9178]">
                  "kedarghadyalji@gmail.com"
                </span>
                ,
              </p>

              <p className="mt-4 text-blue-500 dark:text-[#9cdcfe]">
                socials:{" "}
                <span className="text-purple-600 dark:text-[#da70d6]">{`{`}</span>
              </p>

              {/* Mapped Socials */}
              {/* Added !w-auto !rounded-none to override #contact ul li styles */}
              <div className="pl-2 sm:pl-4 !flex-col !gap-0 !block">
                {socials.map(({ id, link, text }) => (
                  <div
                    key={id}
                    className="group hover:bg-black/5 dark:hover:bg-[#2a2d2e] -ml-2 pl-2 rounded cursor-pointer flex items-center py-0.5 !w-auto !transform-none !hover:scale-100"
                  >
                    <span className="text-blue-500 dark:text-[#9cdcfe] ml-1 sm:ml-2">
                      {text}
                    </span>
                    <span className="text-gray-600 dark:text-[#d4d4d4] mr-2">
                      :
                    </span>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-700 dark:text-[#ce9178] hover:underline decoration-dotted ml-1 flex items-center gap-1"
                    >
                      "/{text.toLowerCase()}/kedar"
                    </a>
                    <span className="text-gray-400 dark:text-[#cccccc] ml-1">
                      ,
                    </span>
                  </div>
                ))}
              </div>
              <p>
                <span className="text-purple-600 dark:text-[#da70d6]">{`}`}</span>
              </p>
            </div>
            <div className="mt-1">
              <span className="text-yellow-500 dark:text-[#ffd700]">{`}`}</span>
              ;
            </div>

            <div className="mt-6 text-green-600 dark:text-[#6a9955] italic hidden sm:block">
              {'// Terminal is interactive! Try typing "yes" below.'}
            </div>
            <div className="text-purple-600 dark:text-[#c586c0] mt-1">
              export default{" "}
              <span className="text-yellow-600 dark:text-[#dcdcaa]">
                contactInfo
              </span>
              ;
            </div>
          </div>

          {/* --- 4. TERMINAL --- */}
          {/* Using var(--window-bg) and var(--border-color) */}
          <div className="h-36 bg-[var(--window-bg)] border-t border-[var(--border-color)] flex flex-col font-mono text-xs md:text-sm transition-colors">
            <div className="flex items-center justify-between px-4 py-1 bg-[var(--window-bg)] uppercase tracking-wider text-[10px] border-b border-[var(--border-color)]">
              <div className="flex gap-4 font-semibold text-gray-500">
                <span className="cursor-pointer text-[var(--text-color)] border-b border-[var(--text-color)] pb-1">
                  Terminal
                </span>
                <span className="cursor-pointer hover:text-[var(--text-color)] pb-1 hidden sm:block">
                  Output
                </span>
                <span className="cursor-pointer hover:text-[var(--text-color)] pb-1 hidden sm:block">
                  Debug
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-gray-500 border border-[var(--border-color)] rounded px-1.5 py-0.5 text-[9px]">
                  <Menu size={10} />
                  <span>bash</span>
                </div>
              </div>
            </div>

            <div
              className="flex-1 p-3 overflow-y-auto font-mono text-xs sm:text-sm"
              onClick={() => document.getElementById("terminal-input").focus()}
            >
              {history.map((line, i) => (
                <div
                  key={i}
                  className="mb-1 text-[var(--text-color)] whitespace-pre-wrap"
                >
                  {line}
                </div>
              ))}

              <div
                className="flex items-center text-[var(--text-color)]"
                ref={bottomRef}
              >
                <span className="text-green-600 dark:text-[#00ff00] mr-2">
                  ➜
                </span>
                <span className="text-blue-500 dark:text-[#00BFFF] mr-2">
                  ~
                </span>
                <input
                  id="terminal-input"
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none outline-none flex-1 text-[var(--text-color)] focus:ring-0 w-full"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;
