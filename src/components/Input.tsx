import type { FC } from "react";

interface InputType {
  type: "email" | "password" | "text";
  placeholder: string;
  extraClass?: string;
  name: string;
}

const Input: FC<InputType> = ({ type, placeholder, extraClass, name }) => {
  return (
    <input required name={name} type={type} placeholder={placeholder} className={`w-full rounded-[10px] py-3.5 pr-4 pl-11.5 text-[0.92rem] text-[#f0e6d3] outline-none transition-all duration-300 placeholder-[#3a4050] ${extraClass}`}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        fontFamily: "'Jost', sans-serif",
      }}
      onFocus={(e) => {
        e.target.style.borderColor = "rgba(192,57,43,0.6)";
        e.target.style.background = "rgba(192,57,43,0.06)";
        e.target.style.boxShadow = "0 0 0 3px rgba(192,57,43,0.12)";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "rgba(255,255,255,0.08)";
        e.target.style.background = "rgba(255,255,255,0.04)";
        e.target.style.boxShadow = "none";
      }}
    />
  );
};

export default Input;
