import React from "react"
import "tailwindcss/tailwind.css"
import {motion} from "framer-motion"
const fadeInOut = {
	initial: {opacity: 0},
	animate: {
		opacity: 1,
		transition: {
			duration: .2,
			ease: "easeOut"
		}
	},
	exit: { 
		opacity: 0,
		transition: {
			duration: .2,
			ease: "easeOut"
		} 
	}
}
export default function ShowingContextMenu({top, left, setInvoked, showing, setShowing}) {
	return (
		<motion.div {...fadeInOut} className="fixed top-0 left-0 w-screen h-screen">
			<div
				onClick={() => setInvoked(false)}
				className="w-full h-full"
			/>
			<div
				className={`absolute bg-[#4a5568] rounded-md p-2 z-10 min-w-56 flex flex-row text-white space-x-2`}
				style={{top: `${top + 40}px`, left: `${left - 12}px`}}
			>
				<p>Take:</p>
				<input
					type="number"
					className="w-10 text-black px-1"
					defaultValue={showing.take}
					onChange={event => setShowing(p => ({skip: p.skip, take: Number(event.target.value)}))}
				/>
				<p>Skip:</p>
				<input
					type="number"
					className="w-10 text-black px-1"
					defaultValue={showing.skip}
					onChange={event => setShowing(p => ({skip: Number(event.target.value), take: p.take}))}
				/>
			</div>
		</motion.div>
	)
}