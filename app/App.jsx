import React from "react"
import "tailwindcss/tailwind.css"
import {Toaster} from "react-hot-toast"
import Page from "./Page"
export default function App() {
	return (
		<div className="h-full w-full">
			<Page />
			<Toaster />
		</div>
	)
}