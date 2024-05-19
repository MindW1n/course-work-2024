try {
	const {app, BrowserWindow, ipcMain, globalShortcut} = require("electron")
	const {writeFile, readFile} = require("fs/promises")
	let aboutWindow
	function init() {
		const window = new BrowserWindow({
			width: 1200,
			height: 800,
			backgroundColor: "white",
			webPreferences: {
				preload: `${app.getAppPath()}/preload.js`,
				autoplayPolicy: "no-user-gesture-required"
			}
		})
		window.loadFile("public/index.html")
		ipcMain.on("save", (event, {path, data}) => writeFile(path, data, "utf-8"))
		ipcMain.on("about", () => {
			if(aboutWindow) return
			aboutWindow= new BrowserWindow({
				width: 500,
				height: 250,
				backgroundColor: "white",
				resizable: false
			})
			aboutWindow.setMenu(null)
			aboutWindow.loadFile("public/about.html")
			aboutWindow.on("close", () => {aboutWindow = undefined})
		})
		ipcMain.on(
			"refresh",
			async (event, {id, path}) => event.sender.send(
				"refresh", {id, path, data: await readFile(path, "utf-8")}
			)
		)
		globalShortcut.register("F11", () => window.setFullScreen(!window.isFullScreen()))
	}
	app.whenReady().then(init)
	require("electron-reload")(__dirname)
}
catch(e) {}