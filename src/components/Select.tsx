import type { FC } from "react"

interface SelectType {
    extraClass?:string
}

const Select:FC<SelectType> = ({extraClass}) => {
    return (
        <select className={`${extraClass} w-75 rounded-2xl bg-transparent border px-4 py-3.5 text-sm text-white/90 placeholder:text-white/35 outline-none`}>
            <option value="all">All</option>
        </select>
    )
}

export default Select;