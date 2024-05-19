import React from "react"
import "tailwindcss/tailwind.css"
import {IoMdRefresh} from "react-icons/io"
import FieldsButton from "./FieldsButton"
import ShowingButton from "./ShowingButton"
import {AnimatePresence, motion} from "framer-motion"
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
export default function Toolbar(
	{onAdd, onDelete, numberToDelete, fields, setFields, showing, of, setShowing, onRefresh, onShowGraph}
) {
	return (
		<div className="min-h-14 border-b-2 border-[#e2e8ef] flex flex-row items-center">
			<div className="flex flex-row items-center px-4 space-x-3 border-r-2 border-[#e2e8ef] h-full">
				<button
					onClick={onRefresh}
					className="w-8 h-8 bg-[#e1e7ef] flex justify-center items-center rounded-lg text-[#718096] hover:text-black hover:bg-[#cdd3db] transition-colors duration-300"
				>
					<IoMdRefresh size={20} />
				</button>
				<FieldsButton setFields={setFields} fields={fields} />
				<ShowingButton setShowing={setShowing} showing={showing} of={of} />
			</div>
			<div className="flex flex-row items-center justify-between px-4 h-full w-full">
				<div className="flex flex-row space-x-3">
					<button
						className="bg-[#4a5568] rounded-md h-8 px-2 text-white font-semibold hover:bg-black transition-colors duration-300"
						onClick={onAdd}
					>
						Add record
					</button>
					<button
						className="bg-[#4a5568] rounded-md h-8 px-2 text-white font-semibold hover:bg-black transition-colors duration-300"
						onClick={onShowGraph}
					>
						Graph
					</button>
					<AnimatePresence>
						{
							numberToDelete > 0 && (
								<motion.button
									{...fadeInOut}
									onClick={onDelete}
									className="bg-[#f35a5a] rounded-md h-8 px-2 text-white font-semibold hover:bg-[#df4646] transition-colors duration-300"
								>
									Delete {numberToDelete} record{numberToDelete > 1 && "s"}
								</motion.button>
							)
						}
					</AnimatePresence>
				</div>
				<button onClick={() => window.api.send("about")} className="bg-[#f5db54] h-8 px-3 rounded-md text-[#683a12] font-semibold text-lg hover:bg-[#e1c740] hover:text-black transition-colors duration-300">
					About
				</button>
			</div>
		</div>
	)
}