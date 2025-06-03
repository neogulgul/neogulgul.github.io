const styleMap = {
	default: { debug: false, color: "initial", fontWeight: 400, fontSize: "small" },
	debug:   { debug: true,  color: "#f4d042", fontWeight: 800, fontSize: "small" },

	success: { color: "#69af56", fontSize: "large" },
	notice:  { color: "#6265bd", fontSize: "large" },
	error:   { color: "#d96254", fontSize: "large" },

	black:   { color: "black"   },
	red:     { color: "red"     },
	green:   { color: "green"   },
	yellow:  { color: "yellow"  },
	blue:    { color: "blue"    },
	magenta: { color: "magenta" },
	cyan:    { color: "cyan"    },
	white:   { color: "white"   },

	bgBlack:   { backgroundColor: "black"   },
	bgRed:     { backgroundColor: "red"     },
	bgGreen:   { backgroundColor: "green"   },
	bgYellow:  { backgroundColor: "yellow"  },
	bgBlue:    { backgroundColor: "blue"    },
	bgMagenta: { backgroundColor: "magenta" },
	bgCyan:    { backgroundColor: "cyan"    },
	bgWhite:   { backgroundColor: "white"   },

	bold: { fontWeight: "bold" }
}

function makeLogger(settings = styleMap.default)
{
	return new Proxy({}, {
		get(target, prop)
		{
			if (prop in styleMap)
			{
				return makeLogger({ ...settings, ...styleMap[prop] })
			}

			switch (prop)
			{
				case "color":   return color
				case "bgColor": return bgColor
				case "log":     return log
			}
		}
	})

	function color(color)
	{
		return makeLogger({ ...settings, color: color })
	}

	function bgColor(bgColor)
	{
		return makeLogger({ ...settings, backgroundColor: bgColor })
	}

	function log(...args)
	{
		const debug = settings?.debug || false

		if (debug)
		{
			if (!DEBUG) return
			args = [ "[DEBUG]", ...args ]
		}

		const styles = `
			color:            ${settings?.color};
			background-color: ${settings?.backgroundColor};
			font-weight:      ${settings?.fontWeight};
			font-size:        ${settings?.fontSize};
		`

		const stringQueue = []

		args.forEach((arg) => {
			switch (typeof(arg))
			{
				case "string":
				{
					stringQueue.push(`%c${arg}`)
					break
				}
				default:
				{
					printStrings()
					console.log(arg)
					break
				}
			}
		})

		printStrings()

		function printStrings()
		{
			if (!stringQueue.length) return
			console.log(stringQueue.join(" "), ...stringQueue.map(() => { return styles }))
			stringQueue.length = 0
		}
	}
}

window.logger = makeLogger()
