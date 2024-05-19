import React, {useMemo} from "react"
import "tailwindcss/tailwind.css"
import {RxCross2} from "react-icons/rx"
import {AnimatePresence, motion} from "framer-motion"
import Chart from "react-apexcharts"
const transition = {
	duration: .2,
	ease: "easeOut"
}
const fadeInOut = {
	initial: {opacity: 0},
	animate: {opacity: .7, transition},
	exit: {opacity: 0, transition}
}
const scaleInOut = {
	initial: {scale: .4, opacity: 0},
  animate: {scale: 1, opacity: 1, transition},
	exit: {opacity: 0, scale: .4, transition}
}
export default function GraphModal({isShown, setIsShown, database}) {
	const subs = useMemo(() => {
		const subs = {}
		Object.values(database.data).map(s => {if(!subs.hasOwnProperty(s.experience)) subs[s.experience] = s})
		return Object.values(subs).sort((a, b) => a.experience - b.experience)
	})
	return (
		<AnimatePresence>
			{isShown && (
				<>
					<motion.div {...fadeInOut} className="fixed top-0 left-0 w-screen h-screen opacity-50 bg-black" />
					<div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
						<div onClick={() => setIsShown(false)} className="w-full h-full z-[1]" />
						<motion.div {...scaleInOut} className="max-w-[1000px] max-h-[600px] absolute rounded-3xl bg-neutral-800 shadow-xl p-4 opacity-100 z-[2] overflow-y-auto no-scroll-bar">
							<div className="flex flex-col">
								<div className="flex flex-row justify-between">
									<h3 className="text-2xl font-extrabold text-white ml-5">
										Graph
									</h3>
									<button onClick={() => setIsShown(false)} className="text-neutral-400 rounded-full bg-black hover:text-white transition opacity-75 hover:opacity-100 h-fit">
										<RxCross2 size={30} />
									</button>
								</div>
							</div>
							<div className="p-4">
								<Chart
									options={{
										chart: {id: "basic-line", toolbar: {show: false}},
										colors: ["#fff"],
										stroke: {curve: "smooth", colors: "#77B6EA"},
										xaxis: {
											categories: subs.map(s => s.experience),
											labels: {style: {colors: "#fff"}}
										},
										yaxis: {labels: {style: {colors: "#fff"}}},
										title: {text: "Experience to Salary Relation", align: "left", style: {color: "#fff"}}
									}}
									series={[{
										name: "Salary",
										data: subs.map(s => s.salary)
									}]}
									type="line"
									height={400}
									width={800}
								/>
							</div>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	)
}