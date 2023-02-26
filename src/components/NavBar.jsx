import React, { useState } from "react";
import { FiMoon } from "react-icons/fi";
import Darkmode from "./hooks/Darkmode";

export default function NavBar() {
  // Dark mood switcher
  const [colorTheme, setTheme] = Darkmode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const togledak = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };
  return (
    <nav className="flex shadow p-5 w-full h-12 bg-white items-center justify-between dark:bg-slate-700 dark:shadow">
      <p className="pl-8 font-bold dark:text-white sm:text-xs">
        Where in the world?
      </p>
      <button
        onClick={togledak}
        type="button"
        className="flex mr-8 p-1 rounded border shadow align-middle justify-center  dark:bg-slate-700 dark:text-white sm:w-20 sm:p-0 sm:text-xs "
      >
        <span className="pr-1 pt-1">
          <FiMoon />
        </span>
        Dark Mode
      </button>
    </nav>
  );
}
