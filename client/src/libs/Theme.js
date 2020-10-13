const Generic = {
	primary: "#EA8A8A",
	colors: {
		primary: "#EA8A8A",
    accent: "#DABAE5",
    background: "#FFFFFF",
    surface: "white",
    notification: "#f50057",
    text: "#334D6E",
    white: "#FFFFFF",
    _1: "#333333",
    _2: "#535353",
    _3: "#F3F3F3", // whitesmoke
    _4: "#F15887",
    _5: "#6B6B6B",
    _6: "#F0A6BD",
    _7: "#CDEBFF",
    _8: "#DEFFC5",
    shadow: "rgba(0,0,0,.16)",
    coloredShadow: "rgba(234, 138, 138, 0.16)",
	}
}

export const Light = {
	...Generic,
	bgColor: "#fff",
	textColor: "#333",
	whitesmoke: "#FCFCFC",
	invertBg: "#bee3f8",
	invertColor: "#fff",
	shadowColor: "#1877ff1c"
}

export const Dark = {
	...Generic,
	bgColor: "#333",
	textColor: "#fff",
	whitesmoke: "#252525",
	invertBg: "#718096",
	invertColor: "#333",
	shadowColor: "#0000001c"
}