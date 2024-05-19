import React, {useState} from "react"
import "tailwindcss/tailwind.css"
import Cell from "./Cell"
import {AnimatePresence, motion} from "framer-motion"
const lookupTable = {
	id: "number",
	fullName: "string",
	qualification: "string",
	experience: "number",
	phone: "phone",
	email: "string",
	salary: "number",
	birthDate: "string"
}
const fadeInOut = {
	initial: {opacity: 0},
	animate: { 
		opacity: 1,
		transition: {
			duration: .3,
			delay: .4,
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
const slideIn = {
	initial: {opacity: 0, x: -20},
	animate: { 
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.3,
			delay: .5,
			ease: "easeOut"
		}
	}
}
export default function Table(
	{id, database, fields, showing: {take, skip}, setSelectedIds, selectedIds, setData, table}
) {
	const [focusedCell, setFocusedCell] = useState(null)
	const [editedCell, setEditedCell] = useState(null)
	const saveEditedCell = () => {
		if(editedCell) setData(p => {
			const newData = {...p}
			newData[id].data[editedCell.id][editedCell.key] = editedCell.value
			if(Object.values(newData[id].data[editedCell.id]).findIndex(v => v == undefined) == -1) newData[id].save()
			return newData
		})
	}
	return (
		<AnimatePresence>
			{
				!database ? (
					<motion.div
						initial={{opacity: 0}}
						animate={{opacity: 1, transition: {duration: .3, delay: .3, ease: "easeOut"}}}
						className="w-full h-full flex flex-col justify-center items-center text-[#b4bec8] font-extrabold space-y-5 bg-[#f7fcff] relative overflow-hidden"
					>
						<div>
							{"Nothing to show".split(" ").map((ch, i) => (
								<motion.span
									initial={{opacity: 0}}
									animate={{opacity: 1}}
									transition={{duration: 0.25, delay: .3 + i / 6}}
									key={i}
									className="text-7xl"
								>
									{ch}{" "}
								</motion.span>
							))}
						</div>
						<div>
							{"You need to open a database to see something".split(" ").map((ch, i) => (
								<motion.span
									initial={{opacity: 0}}
									animate={{opacity: 1}}
									transition={{duration: 0.25, delay: 1 + i / 10}}
									key={i}
									className="text-3xl"
								>
									{ch}{" "}
								</motion.span>
							))}
						</div>
						<video autoPlay loop muted className="absolute opacity-5">
							<source src="./background.mp4" type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					</motion.div>
				) : (
					<motion.div exit={fadeInOut.exit} className="flex-grow overflow-auto no-scroll-bar" id="table">
						<AnimatePresence>
							<motion.table {...fadeInOut} key={id}>
								<thead className="h-10">
									<tr>
										<th className="border-[#edf2f7] border-2">
											<input
												type="checkbox"
												className="w-5 h-5"
												onChange={event => setSelectedIds(
													() => event.target.checked ? Object.keys(database.data) : []
												)}
												checked={Object.keys(database.data).length == selectedIds.length}
											/>
										</th>
										<AnimatePresence>
											{fields.map(f => (
												<motion.th key={f} layout {...fadeInOut} className="border-[#edf2f7] border-2 min-w-56">{f}</motion.th>
											))}
										</AnimatePresence>
									</tr>
								</thead>
								<tbody>
									<AnimatePresence>
										{
											Object.values(database.data).slice(skip, skip + take)
												.map(subcontractor => (
													<motion.tr layout {...fadeInOut} key={id + " " + subcontractor.id}>
														<td className="border-[#edf2f7] border-2">
															<div className="w-10 h-10 flex justify-center items-center">
																<input
																	onChange={event => setSelectedIds(p => {
																		const newIds = event.target.checked
																			? [...p, subcontractor.id]
																			: p.filter(id => id != subcontractor.id)
																		return newIds
																	})}
																	type="checkbox"
																	className="w-5 h-5"
																	checked={selectedIds.find(id => id == subcontractor.id) != undefined}
																/>
															</div>
														</td>
														<AnimatePresence>
															{
																fields.map(key => {
																	if(typeof key == "function") return
																	return (
																		<motion.td
																			{...{...slideIn, exit: fadeInOut.exit}}
																			layout
																			key={subcontractor.id + key}
																			className={
																				((subcontractor.id == focusedCell?.id && key == focusedCell?.key)
																					? "border-[#0063ff] border-4 "
																					: "border-[#edf2f7] border-2 ") +
																				"h-10"
																			}
																		>
																			<Cell
																				defaultValue={subcontractor[key]}
																				type={lookupTable[key]}
																				onClick={(id, key) => {
																					setFocusedCell({id, key})
																					saveEditedCell()
																					setEditedCell(null)
																				}}
																				onDoubleClick={
																					(id, key, value) => {
																						saveEditedCell()
																						setEditedCell({id, key, value})
																					}
																				}
																				doubleClicked={
																					subcontractor.id == editedCell?.id &&
																					key == editedCell?.key
																				}
																				onSubmit={() => {
																					if(
																						editedCell.key == "id" &&
																						Object.keys(database.data).find(i => i != editedCell.id && editedCell.value == i)
																					) {
																						setEditedCell(null)
																						throw new Error("Primary key constraint violation")
																					}
																					saveEditedCell()
																					setEditedCell(null)
																				}}
																				onChange={(id, key, value) => {
																					setEditedCell({id, key, value})
																				}}
																				subKey={key}
																				id={subcontractor.id}
																			/>
																		</motion.td>
																	)
																})
															}
														</AnimatePresence>
													</motion.tr>
												)
											)
										}
									</AnimatePresence>
								</tbody>
							</motion.table>
						</AnimatePresence>
					</motion.div>
				)
			}
		</AnimatePresence>
	)
}