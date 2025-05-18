// src/components/DarkModeToggle.jsx
import { useEffect, useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import { MdOutlineLightbulb } from "react-icons/md";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(() => !isDark)}
      className="px-2 flex gap-1 py-2 bg-slate-300 dark:bg-slate-700 text-black dark:text-white rounded"
    >
      {isDark ? (
        <MdOutlineLightbulb className="h-6 w-6" />
      ) : (
        <FaLightbulb className="h-6 w-6" />
      )}{" "}
      Mode
    </button>
  );
};

export default DarkModeToggle;
