import type { FC, MouseEventHandler, ReactNode } from "react";

interface ButtonType {
  children: ReactNode;
  type: "button" | "submit";
  extraClass?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  showBg?: boolean;
}

const Button: FC<ButtonType> = ({ onClick, type, extraClass, children, showBg }) => {
  return (
    <button
      style={
        showBg
          ? {}
          : {
              ["--darkBlue" as any]: "#071427",
              ["--darkRed" as any]: "#FF2E51",
              ["--darkOrange" as any]: "#FF6A00",
            } as React.CSSProperties
      }
      onClick={onClick}
      type={type}
      className={`${extraClass} group relative mt-2 w-full overflow-hidden rounded-2xl px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_-22px_rgba(0,0,0,0.9)] transition active:scale-[0.99] bg-[linear-gradient(135deg,var(--darkOrange),var(--darkRed))]`}
    >
      <span className="pointer-events-none absolute inset-y-0 left-[-40%] w-2/3 bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.22),transparent)] blur-sm opacity-0 transition duration-500 group-hover:translate-x-[170%] group-hover:opacity-100" />
      {children}
    </button>
  );
};

export default Button;
