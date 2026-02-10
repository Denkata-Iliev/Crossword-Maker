import React from "react";
import "./Toolbar.css";

type ToolbarProps = {
  className?: string;
  children: React.ReactNode;
};

const Toolbar = ({ className, children }: ToolbarProps) => {
  return <div className={`toolbar-base ${className ?? ""}`}>{children}</div>;
};

export default Toolbar;
