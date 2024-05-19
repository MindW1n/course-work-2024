import React, {useState, useRef} from "react"
import "tailwindcss/tailwind.css"
import FieldsContextMenu from "./FieldsContextMenu"
import {AnimatePresence} from "framer-motion"
export default function FieldsButton({fields, setFields}) {
	const [hovered, setHovered] = useState(false)
	const [menuInvoked, setMenuInvoked] = useState(false)
	const ref = useRef(null)
	return (
		<>
			<button 
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onClick={() => setMenuInvoked(!menuInvoked)}
				ref={ref}
				className="flex flex-row w-24 rounded-md overflow-hidden h-8 text-sm font-semibold"
			>
				<div className={(!hovered && !menuInvoked ? "bg-[#c8d2dc] " : "bg-[#a3adb8] ") + "w-2/3 h-full flex items-center justify-center transition-colors duration-300"}>
					Fields
				</div>
				<div className={(!hovered && !menuInvoked ? "bg-[#e2e8f0] text-[#718096] " : "bg-[#ced4dc] text-[#5d6c82] ") + "w-1/3 h-full flex items-center justify-center transition-colors duration-300"}>
					{fields.length == 8 ? "All" : fields.length}
				</div>
			</button>
			<AnimatePresence>
				{
					menuInvoked && (
						<FieldsContextMenu
							fields={fields}
							setFields={setFields}
							setInvoked={setMenuInvoked}
							{...(() => !menuInvoked ? {} : {
								left: ref.current.getBoundingClientRect().left,
								top: ref.current.getBoundingClientRect().top
							})()}
						/>
					)
				}
				
			</AnimatePresence>
		</>
	)
}