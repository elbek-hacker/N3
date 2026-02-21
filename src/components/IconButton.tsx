import type { FC, MouseEventHandler, ReactNode } from "react";

interface IconButtonType{
    children:ReactNode,
    onClick?:MouseEventHandler<HTMLButtonElement>
}

const IconButton:FC<IconButtonType> = ({ children, onClick}) => {
    return (
        <button 
        type="button"
        onClick={onClick}
        className="grid size-10 place-items-center rounded-2x1 bg- white/5 ring-1 ring-white/10 text-white/80 hover:bg-white/8 transition"
        aria-label="Close"
        > {children} </button>
    )
}

export default IconButton;