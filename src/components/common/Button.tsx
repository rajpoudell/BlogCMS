import React from "react";

interface buttonprops{
    clickout?:(e: React.FormEvent) => void;
    name:string;
    className?:string
}
const Button:React.FC<buttonprops> = ({clickout,name,className}) => {
  return (
    <button
    type="submit"
      onClick={clickout}
      className={`${className}  py-2 px-4 rounded dark:hover:bg-slate-300 hover:bg-slate-700 transition btn dark:bg-slate-600 bg-slate-900  dark:text-slate-900 text-white cursor-pointer`}

    >
      {name}
    </button>
  );
};

export default Button;
