import type { ReactNode } from "react";
import IconButton from "./IconButton";
import { CloseIcon } from "../images";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
};

const Modal = ({open, onClose, title, children }: ModalProps) => {
    if(!open) return null;
    return (
        <div className=" fixed inset-0 z-50">
            <div onClick={onClose} className="absolute inset-0 bg-black/55 backdrop-blur-sm"/>
            <div className="absolute inset-0 grid place-items-center p-4">
                <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
                    <div className="h-1 w-full bg-linear-to-r from-orange-500 to-pink-500"/>
                    <div className="flex items-center justify-between px-5 py-4">
                        <div>
                            <p className="text-white font-semibold"> {title} </p>
                            <div className="mt-1 h-0 w-10 rounded-full bg-linear-to-r from-orange-500 to-pink-500 opacity-70"/>
                        </div>
                        <IconButton onClick={onClose}> <CloseIcon/> </IconButton>
                    </div>
                    <div className="px-5 pb-5 text-white/80"> {children} </div>
                </div>
            </div>
        </div>
    )
}
export default Modal;