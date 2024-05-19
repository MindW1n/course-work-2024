import React from "react"
import "tailwindcss/tailwind.css"
import Field from "./Field"
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
const defaultFields = [
	{name: "id", type: "Int"},
	{name: "fullName", type: "String"},
	{name: "qualification", type: "String"},
	{name: "experience", type: "Int"},
	{name: "phone", type: "String"},
	{name: "email", type: "String"},
	{name: "salary", type: "Float"},
	{name: "birthDate", type: "DateTime"}
]
export default function FieldsContextMenu({top, left, setInvoked, setFields, fields}) {
	return (
		<motion.div {...fadeInOut} className="fixed top-0 left-0 w-screen h-screen">
			<div
				onClick={() => setInvoked(false)}
				className="w-full h-full"
			/>
			<div
				className={`absolute bg-[#4a5568] rounded-md p-2 z-0 min-w-56`}
				style={{top: `${top + 40}px`, left: `${left - 12}px`}}
			>
				<div className="text-white flex flex-row space-x-2">
					<input
						checked={fields.length == 8}
						onChange={event => setFields(event.target.checked ? defaultFields.map(f => f.name) : [])}
						type="checkbox"
					/>
					<p>All</p>
				</div>
				{
					defaultFields.map(field => (
						<Field
							{...field}
							checked={fields.find(f => field.name == f) != undefined}
							key={field.name}
							setFields={setFields}
						/>
					))
				}
			</div>
		</motion.div>
	)
}