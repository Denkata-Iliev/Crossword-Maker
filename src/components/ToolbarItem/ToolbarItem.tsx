import "./ToolbarItem.css";

type ToolbarItemProps = {
    onClick: () => void;
};

const ToolbarItem = ({ onClick }: ToolbarItemProps) => {
  return <div className="item" onClick={onClick}></div>;
};

export default ToolbarItem;
