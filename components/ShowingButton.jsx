import React, {useState, useRef} from "react"
import ShowingContextMenu from "./ShowingContextMenu"
import { AnimatePresence } from "framer-motion"
export default function ShowingButton({setShowing, showing, of}) {
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
				className="flex flex-row w-44 rounded-md overflow-hidden h-8 text-sm font-semibold"
			>
				<div className={(!hovered && !menuInvoked ? "bg-[#c8d2dc] " : "bg-[#a3adb8] ") + "w-1/2 h-full flex items-center justify-center transition-colors duration-300"}>
					Showing
				</div>
				<div className={(!hovered && !menuInvoked ? "bg-[#e2e8f0] text-[#718096] " : "bg-[#ced4dc] text-[#5d6c82] ") + "w-1/2 h-full flex items-center justify-center transition-colors duration-300"}>
					{showing.take <= of ? showing.take : of} of {of}
				</div>
			</button>
			<AnimatePresence>
				{
					menuInvoked && (
						<ShowingContextMenu
							setInvoked={setMenuInvoked}
							showing={showing}
							setShowing={setShowing}
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