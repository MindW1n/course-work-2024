import React, {useRef, useState} from "react"
import "tailwindcss/tailwind.css"
import Tab from "./Tab"
import toast from "react-hot-toast"
import {IoMdAdd} from "react-icons/io"
import Database from "../libs/database"
import {motion, AnimatePresence} from "framer-motion"
let maxI = -1
export default function Tabulator({onSelect, onAdd, onDelete, defaultValue}) {
	const [tabs, setTabs] = useState(defaultValue || [])
	const fileInput = useRef(null)
	return (
		<div className="flex flex-row w-full min-h-10 bg-[#edf2f7] border-b-2 border-[#e2e8ef] overflow-x-scroll no-scroll-bar">
			<div className="min-w-10 border-r-2 border-[#e2e8ef]"></div>
			<AnimatePresence>
				{
					tabs.map(tab => (
						<Tab
							{...tab}
							onDelete={id => {
								setTabs(prev => {
									const newTabs = [...prev]
									const tabIndex = newTabs.findIndex(tab => tab.id == id)
									const tab = newTabs[tabIndex]
									newTabs.splice(tabIndex, 1)
									if(tab.selected && newTabs.length) {
										newTabs[newTabs.length - 1].selected = true
										onSelect(newTabs[newTabs.length - 1].id)
									}
									return newTabs
								})
								onDelete(id)
							}}
							onSelect={id => {
								setTabs(prev => {
									const newTabs = [...prev]
									const prevSelectedIndex = newTabs.findIndex(tab => tab.selected)
									if(prevSelectedIndex >= 0) delete newTabs[prevSelectedIndex].selected
									newTabs.find(tab => tab.id == id).selected = true
									return newTabs
								})
								onSelect(id)
							}}
							key={tab.id}
						/>
					))
				}
				<motion.button
					layout
					className="min-w-10 border-r-2 border-[#e2e8ef] font-bold text-[#718096] hover:bg-white transition-colors duration-300 flex justify-center items-center"
					onClick={() => fileInput.current.click()}
				>
					<IoMdAdd size={20} />
				</motion.button>
			</AnimatePresence>
			<input
				onChange={async event => {
					try {
						if(!event.target.files[0]) return
						const database = new Database(
							event.target.files[0].path, await event.target.files[0].text()
						)
						onAdd(++maxI, database)
						setTabs(
							prev => {
								const newTabs = [...prev]
								const prevSelectionIndex = newTabs.findIndex(tab => tab.selected)
								if(prevSelectionIndex >= 0) delete newTabs[prevSelectionIndex].selected
								newTabs.push({title: event.target.files[0].name, id: maxI, selected: true})
								return newTabs
							}
						)
						onSelect(maxI)
					}
					catch(e) {toast.error(e.message)}
				}}
				type="file"
				className="hidden"
				ref={fileInput}
			/>
		</div>
	)
}