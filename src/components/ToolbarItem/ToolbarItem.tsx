type ToolbarItemProps = {
    onClick: () => void;
    text?: string;
    icon?: React.ReactNode;
};

const ToolbarItem = ({ onClick, text, icon }: ToolbarItemProps) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col p-2 items-center border-2 border-blue-400 bg-blue-100/50 dark:border-blue-500 dark:bg-blue-900/30 cursor-pointer rounded-sm shadow-md hover:bg-blue-200/50 hover:border-blue-500 transition-colors duration-150"
      style={{ minWidth: 50, minHeight: 50 }}
    >
      {icon && <span className="text-center text-sm font-medium text-blue-700 dark:text-blue-300">{icon}</span>}
      {text && <span className="text-center text-sm font-medium text-blue-700 dark:text-blue-300">{text}</span>}
    </div>
  );
};

export default ToolbarItem;
