import Subcontractor from "./subcontractor"
export default class Database {
	constructor(path, data) {
		try {
			this.path = path
			this.data = {}
			data.split("\n").forEach(line => {
				const tokens = line.split(";")
				const subcontractor = new Subcontractor(
					Number(tokens[0]), tokens[1], tokens[2], Number(tokens[3]),
					tokens[4], tokens[5], Number(tokens[6]), tokens[7]
				)
				this.data[subcontractor.id] = subcontractor
			})
		}
		catch(e) {throw new Error("The file isn't of the appropriate format!")}
	}
	save() {
		let string = Object.keys(this.data).reduce((string, key) => string + this.data[key].toString(), "") 
		if(string[string.length - 1] == "\n") string = string.substring(0, string.length - 2)
		window.api.send("save", {path: this.path, data: string})
	}
}