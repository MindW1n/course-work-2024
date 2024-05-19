import React from "react"
const order = ["id", "fullName", "qualification", "experience", "phone", "email", "salary", "birthDate"]
export default function Field({name, type, setFields, checked}) {
	return (
		<div className="flex flex-row justify-between w-full">
			<div className="text-white flex flex-row space-x-2">
				<input
					checked={checked}
					onChange={event => setFields(p => {
						if(!event.target.checked) return p.filter(i => i != name)
						const newFields = [...p]
						newFields.splice(order.findIndex(i => i == name), 0, name)
						return newFields
					})}
					type="checkbox"
				/>
				<p>{name}</p>
			</div>
			<p className="text-[#a0aec0]">{type}</p>
		</div>
	)
}