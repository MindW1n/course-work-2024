import React, {useState} from "react"
import "tailwindcss/tailwind.css"
import {IoMdClose} from "react-icons/io"
import {motion} from "framer-motion"
const fadeInOut = {
  initial: {scale: .4, opacity: 0},
  animate: {
		scale: 1,
		opacity: 1,
		transition: {
			duration: .1,
			ease: "easeOut"
		}
	},
	exit: { 
		scale: .6, 
		opacity: 0,
		transition: {
			duration: .1,
			ease: "easeOut"
		} 
	}
}
export default function Tab({selected, id, onSelect, onDelete, title}) {
	const [hovered, setHovered] = useState(false)
	return (
		<motion.div
			{...fadeInOut}
			layout
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className={(selected ? "bg-white " : "hover:bg-white transition-colors duration-300 ") + "min-w-32 flex flex-row pl-3 font-semibold border-r-2 border-[#e2e8ef] justify-between"}
		>
			<button
				onClick={() => onSelect(id)}
				className={(!selected ? "text-[#758399] " : "") + "h-full flex-grow"}
			>
				{title}
			</button>
			<button
				onClick={() => onDelete(id)}
				className={(selected || hovered ? "opacity-50 " : "opacity-0 ") + "hover:opacity-100 transition-opacity text-[#99a4b3] h-full w-10 flex justify-center items-center"}
			>
				<IoMdClose size={20} />
			</button>
		</motion.div>
	)
}