import { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

const DarkModeSwitcher = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : null
  );
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function onWindowMatches() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      document.body.setAttribute("data-theme-version", "dark");
    } else {
      document.body.setAttribute("data-theme-version", "light");
    }
  }
  onWindowMatches();

  useEffect(() => {
    if (theme === "dark") {
      document.body.setAttribute("data-theme-version", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.setAttribute("data-theme-version", "light");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <span onClick={handleThemeSwitch} style={{ cursor: "pointer" }}>
        {theme === "dark" ? (
          <BsSun className='fs-3 text-[#FFEC99] duration-200 hover:text-white' />
        ) : (
          <BsMoon className='fs-3 text-slate-500 duration-200 hover:text-slate-600' />
        )}
      </span>
    </div>
  );
};

export default DarkModeSwitcher;
