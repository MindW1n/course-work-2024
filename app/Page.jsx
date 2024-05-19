import React, {useEffect, useState} from "react"
import "tailwindcss/tailwind.css"
import Tabulator from "../components/Tabulator"
import Toolbar from "../components/Toolbar"
import Table from "../components/Table"
import Subcontractor from "../libs/subcontractor"
import Database from "../libs/database"
import GraphModal from "../components/GraphModal"
export default function Page() {
	const [data, setData] = useState({})
	const [selectedDatabaseId, setSelectedDatabaseId] = useState()
	const [selectedIds, setSelectedIds] = useState([])
	const [showing, setShowing] = useState({take: 20, skip: 0})
	const [isGraphModalShown, setIsGraphModalShown] = useState(false)
	const [fields, setFields] = useState(
		["id", "fullName", "qualification", "experience", "phone", "email", "salary", "birthDate"]
	)
	useEffect(() => {
		const div = document.getElementById("table")
		if(!div) return
		div.scrollTo({top: div.scrollHeight, behavior: "smooth"})
	}, [showing])
	useEffect(() => {
		window.api.on("refresh", (event, {id, path, data}) => setData(p => ({...p, [id]: new Database(path, data)})))
	}, [])
	return (
		<div className="h-full w-full flex flex-col">
			<Tabulator
				onSelect={id => setSelectedDatabaseId(id)}
				onAdd={(id, database) => {
					setData(prev => ({...prev, [id]: database}))
					setSelectedDatabaseId(id)
				}}
				onDelete={id => setData(prev => {
					const newData = {...prev}
					delete newData[id]
					return newData
				})}
			/>
			<Toolbar
				onAdd={() => {
					if(!data[selectedDatabaseId]) return
					setData(p => {
						const newData = {...p}
						const id = Object.values(data[selectedDatabaseId].data).reduce((max, s) => Math.max(max, s.id), 0) + 1
						newData[selectedDatabaseId].data[id] = new Subcontractor(id)
						setShowing({skip: 0, take: Object.keys(data[selectedDatabaseId].data).length})
						return newData
					})
				}}
				onDelete={() => {
					setData(p => {
						const newData = {...p}
						for(const id of selectedIds) delete newData[selectedDatabaseId].data[id]
						newData[selectedDatabaseId].save()
						return newData
					})
					setSelectedIds([])
				}}
				numberToDelete={selectedIds.length}
				fields={fields}
				setFields={setFields}
				showing={showing}
				of={data[selectedDatabaseId] ? Object.keys(data[selectedDatabaseId].data).length : 0}
				setShowing={setShowing}
				onRefresh={
					() => window.api.send("refresh", {id: selectedDatabaseId, path: data[selectedDatabaseId].path})
				}
				onShowGraph={() => setIsGraphModalShown(true)}
			/>
			<Table
				id={selectedDatabaseId}
				database={data[selectedDatabaseId]}
				setData={setData}
				setSelectedIds={setSelectedIds}
				selectedIds={selectedIds}
				showing={showing}
				fields={fields}
			/>
			{
				selectedDatabaseId >= 0 && (
					<GraphModal
						isShown={isGraphModalShown}
						setIsShown={setIsGraphModalShown}
						database={data[selectedDatabaseId]}
					/>
				)
			}
		</div>
	)
}