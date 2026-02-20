import type { FC, ReactNode } from "react";

interface ButtonType {
    children: ReactNode,
    type:"button" | "submit",
    extraClass?: string
}

const Button:FC<ButtonType> = ({ type, extraClass, children }) => {
  return (
    <button
      type={type}
      className={`${extraClass}btn-login relative w-full py-4 rounded-[10px] border-none text-white text-[0.88rem] tracking-[3px] uppercase font-medium cursor-pointer mt-8 overflow-hidden transition-all duration-200 hover:-translate-y-0.5`}
      style={{
        background:
          "linear-gradient(135deg, #8b0000 0%, #c0392b 50%, #e67e22 100%)",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 12px 40px rgba(192,57,43,0.4)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.boxShadow = "none")
      }
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
