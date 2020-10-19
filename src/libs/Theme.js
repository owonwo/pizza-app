const Generic = {
	primary: "#68d391",
	colors: {
		primary: "#68d391",
    accent: "#DABAE5",
    background: "#FFFFFF",
    _1: "#333333",
    _2: "#535353",
    _3: "#F3F3F3", // White Smoke
    _4: "#68d391", // Vibrant Green
    _5: "#333333",
    _6: "#F0A6BD",
    _7: "#e26b00", // Orange
    _8: "#DEFFC5",
    shadow: "rgba(0,0,0,.16)",
    coloredShadow: "rgba(234, 138, 138, 0.16)",
	}
}

export const Light = {
	...Generic,
	colors: {
		...Generic.colors,
		_3: "#69d392",
	},
	bgColor: "#fff",
	textColor: "#333",
	whitesmoke: "#fff",
	invertBg: "#bee3f8",
	invertColor: "#fff",
	shadowColor: "#1877ff1c"
}

export const Dark = {
	...Generic,
	colors: {
		...Generic.colors,
		_2: "#fcfcfc",
		primary: "#ed8936",
	},
	bgColor: "#333",
	textColor: "#333",
	whitesmoke: "#68d391",
	invertBg: "#718096",
	invertColor: "#333",
	shadowColor: "#0000001c"
}