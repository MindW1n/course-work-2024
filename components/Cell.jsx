import React, {useState} from "react"
import toast from "react-hot-toast"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
function formatPhoneNumber(rawNumber) {
    rawNumber = String(rawNumber)
    const countryCode = rawNumber.slice(0, 1)
    const areaCode = rawNumber.slice(1, 4)
    const firstPart = rawNumber.slice(4, 7)
    const secondPart = rawNumber.slice(7, 9)
    const thirdPart = rawNumber.slice(9)
    const formattedNumber = `+${countryCode} (${areaCode}) ${firstPart}-${secondPart}${thirdPart}`
    return formattedNumber
}
export default function Cell(
	{id, defaultValue, type, subKey, onClick, onDoubleClick, doubleClicked, onSubmit, onChange}
) {
	const [value, setValue] = useState(defaultValue)
	if(!doubleClicked) return (
		<div
			onClick={() => {onClick(id, subKey)}}
			onDoubleClick={() => onDoubleClick(id, subKey, value)}
			className={(!value ? "text-[#c8d2dc] " : "") + "px-4 w-56 h-10 flex items-center"}
		>
			<div className="w-full truncate">
				{value || "required"}
			</div>
		</div>
	)
	else if(type != "phone") return (
		<input
			type={type}
			onChange={event => {setValue(event.target.value); onChange(id, subKey, event.target.value)}}
			onKeyDown={event => {
				try {if(event.key == "Enter") onSubmit()}
				catch(e) {
					setValue(defaultValue)
					toast.error(e.message)
				}
			}}
			placeholder={subKey}
			defaultValue={value}
			className="w-56 h-10 z-10 top-56 left-56 px-4"
		/>
	)
	return (
		<PhoneInput
			value={defaultValue}
			country="ru"
			displayInitialValueAsLocalNumber
			onChange={value => {setValue(formatPhoneNumber(value)); onChange(id, subKey, formatPhoneNumber(value))}}
			onKeyDown={event => {
				try {if(event.key == "Enter") onSubmit()}
				catch(e) {
					setValue(defaultValue)
					toast.error(e.message)
				}
			}}
		/>
	)
}