import React from "react";
import ToolbarItem from "../ToolbarItem/ToolbarItem";
import ThemeSwitcherIcon from "./ThemeSwitcher";

type ToolbarProps = {
  className?: string;
  children: React.ReactNode;
};

const Toolbar = ({ className, children }: ToolbarProps) => {
  const [dark, setDark] = React.useState(false);
  const baseClasses = "p-4 z-50 fixed top-0 backdrop-blur-md rounded-none border-t-0 border-r-0 bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700/50 shadow-lg text-slate-800 dark:text-slate-200 text-sm font-medium";
  let themeSwitcher = null;

  let variantClasses = "";
  if (className === "top-toolbar") {
    variantClasses = "w-full h-12 left-0 border-b border-l-0";
  } else if (className === "right-toolbar") {
    variantClasses = "w-25 h-full right-0 border-l border-b-0 flex flex-col items-center justify-start";
    themeSwitcher = (
      <ToolbarItem
        icon={<ThemeSwitcherIcon dark={dark} />}
        onClick={() => {
          document.documentElement.classList.toggle('dark');
          setDark(document.documentElement.classList.contains('dark'));
        }}
      />
    );
  }
  
  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      {themeSwitcher && (
        <div className="mt-3 mb-12 w-full flex justify-center">
          {themeSwitcher}
        </div>
      )}
      <div className="flex flex-col items-center text-center">
        {children}
      </div>
    </div>
  );
};

export default Toolbar;
