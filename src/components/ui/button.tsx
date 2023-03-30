import React from "react";

interface StdBtnProps {
  text: string;
  onClick: () => void;
  btnType: "submit" | "button" | "reset";
}

const StdBtn = ({ text, onClick, btnType }: StdBtnProps) => {
  return (
    <button
      onClick={() => onClick()}
      type={btnType}
      className="rounded-md border border-[#30373C] bg-[#21262D] p-2 hover:border-[#495157] hover:bg-[#3f454d]"
    >
      {text}
    </button>
  );
};

export default StdBtn;
