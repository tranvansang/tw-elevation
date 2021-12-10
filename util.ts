export const floatToStr = (f: number, ndigit = 2) => {
	const str = f.toFixed(ndigit)
	return ndigit
		? str
			.replace(/0*$/g, '')
			.replace(/\.$/, '')
		: str
}

// https://github.com/tailwindlabs/tailwindcss/blob/691ed02f6352da17048dd14f742f7c82919e1455/src/util/flattenColorPalette.js#L1
export const flattenColorPalette = (colors) =>
	Object.assign(
		{},
		...Object.entries(colors ?? {}).flatMap(([color, values]) =>
			typeof values == 'object'
				? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
					[color + (number === 'DEFAULT' ? '' : `-${number}`)]: hex,
				}))
				: [{ [`${color}`]: values }]
		)
	)
