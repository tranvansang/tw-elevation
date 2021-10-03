// https://github.com/saadeghi/daisyui/blob/69030663f84be517651260be4c55fd331b32c6f1/src/colors/hex2hsl.js
export const hexToHSL = (H: string) => {
	// Convert hex to RGB first
	let r = 0, g = 0, b = 0
	if (H.length === 4) {
		r = parseInt(`0x${H[1]}${H[1]}`)
		g = parseInt(`0x${H[2]}${H[2]}`)
		b = parseInt(`0x${H[3]}${H[3]}`)
	} else if (H.length === 7) {
		r = parseInt(`0x${H[1]}${H[2]}`)
		g = parseInt(`0x${H[3]}${H[4]}`)
		b = parseInt(`0x${H[5]}${H[6]}`)
	}

	// Then to HSL
	r /= 255
	g /= 255
	b /= 255
	const cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin

	let h = delta === 0
		? 0
		: cmax === r
			? ((g - b) / delta) % 6
			: cmax === g
				? (b - r) / delta + 2
				: (r - g) / delta + 4

	h = Math.round(h * 60)

	if (h < 0) h += 360

	let l = (cmax + cmin) / 2
	let s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
	s = +(s * 100).toFixed(1)
	l = +(l * 100).toFixed(1)

	return `${h} ${s}% ${l}%`
}
