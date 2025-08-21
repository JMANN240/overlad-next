import { MouseEventHandler } from "react";

export default function Button({
    type,
    onClick,
    children,
}: {
    type: "submit" | "reset" | "button" | undefined,
    onClick?: MouseEventHandler,
    children: React.ReactNode,
}) {
    return (
        <button className="outline-offset-1 focus:outline-1 border border-black p-1 bg-white text-black hover:bg-black hover:text-white duration-100" type={type} onClick={onClick}>
            {children}
        </button>
    );
}