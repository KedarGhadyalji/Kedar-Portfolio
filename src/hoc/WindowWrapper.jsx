import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useEffect, useLayoutEffect, useRef } from "react";

gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);
    const dragInstance = useRef(null);

    // Animate window entering
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        { scale: 0.85, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
      );
    }, [isOpen]);

    // Setup Draggable AFTER window is visible
    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      // Destroy old draggable
      if (dragInstance.current) {
        dragInstance.current.kill();
        dragInstance.current = null;
      }

      if (!isOpen) return;

      // Make the entire window draggable
      const [instance] = Draggable.create(el, {
        type: "x,y",
        inertia: true,
        edgeResistance: 0.2,
        onPress: () => focusWindow(windowKey), // focus the window on press
      });

      dragInstance.current = instance;
    }, [isOpen, focusWindow, windowKey]);

    // Hide when closed
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className="absolute top-20 left-20"
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name
  })`;
  return Wrapped;
};

export default WindowWrapper;
