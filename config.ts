// https://github.com/material-components/material-components-web/blob/2fb068fb0f7a1b0e038ede3a2ab27a972e5b2ee4/packages/mdc-elevation/_elevation-theme.scss#L42
const umbraY = [0, 2, 3, 3, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 10, 10, 10, 11, 11]
const umbraBlur = [0, 1, 1, 3, 4, 5, 5, 5, 5, 6, 6, 7, 8, 8, 9, 9, 10, 11, 11, 12, 13, 13, 14, 14, 15]
const umbraSpread = [0, -1, -2, -2, -1, -1, -1, -2, -3, -3, -3, -4, -4, -4, -4, -5, -5, -5, -5, -6, -6, -6, -6, -7, -7]

const penumbraY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
const penumbraBlur = [0, 1, 2, 4, 5, 8, 10, 10, 10, 12, 14, 15, 17, 19, 21, 22, 24, 26, 28, 29, 31, 33, 35, 36, 38]
const penumbraSpread = [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3]

const ambientY = [0, 1, 1, 1, 1, 1, 1, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 8, 8, 8, 9, 9]
const ambientBlur = [0, 3, 5, 8, 10, 14, 18, 16, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46]
const ambientSpread = [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 7, 8, 8]

// 25
export const elevationLimit = Math.min(
	umbraY.length,
	umbraBlur.length,
	umbraSpread.length,
	penumbraY.length,
	penumbraBlur.length,
	penumbraSpread.length,
	ambientY.length,
	ambientBlur.length,
	ambientSpread.length,
)

// https://en.wikipedia.org/wiki/Umbra,_penumbra_and_antumbra
// https://www.youtube.com/watch?v=SvSHx3XWRik
export const enum Direction {
	umbra,
	penumbra,
	// antumbra, // not used
	ambient,
}

export const allDirections = [
	Direction.umbra,
	Direction.penumbra,
	// Direction.antumbra,
	Direction.ambient,
] as const

export const directionNames = {
	[Direction.umbra]: 'umbra',
	[Direction.penumbra]: 'penumbra',
	[Direction.ambient]: 'ambient',
} as const

export const enum Dimension {
	// xOffset, // always 0
	yOffset,
	blur,
	spread,
}

export const predefinedShadowDimension = {
	[Direction.umbra]: {
		[Dimension.yOffset]: umbraY,
		[Dimension.blur]: umbraBlur,
		[Dimension.spread]: umbraSpread,
	},
	[Direction.penumbra]: {
		[Dimension.yOffset]: penumbraY,
		[Dimension.blur]: penumbraBlur,
		[Dimension.spread]: penumbraSpread,
	},
	[Direction.ambient]: {
		[Dimension.yOffset]: ambientY,
		[Dimension.blur]: ambientBlur,
		[Dimension.spread]: ambientSpread,
	},
} as const

export const shadowDimensionRegressionCoefficients = {
	[Direction.umbra]: {
		[Dimension.yOffset]: {intercept: 1.0770563, alpha: 0.4298701},
		[Dimension.blur]: {intercept: 0.7292308, alpha: 0.5892308},
		[Dimension.spread]: {intercept: -0.4338462, alpha: -0.2738462},
	},
	[Direction.penumbra]: {
		[Dimension.yOffset]: {intercept: 0, alpha: 1},
		[Dimension.blur]: {intercept: -1.221997, alpha: 1.601769},
		[Dimension.spread]: {intercept: -0.3230769, alpha: 0.1469231},
	},
	[Direction.ambient]: {
		[Dimension.yOffset]: {intercept: -0.24, alpha: 0.39},
		[Dimension.blur]: {intercept: 1.251947, alpha: 1.822970},
		[Dimension.spread]: {intercept: -1.0892308, alpha: 0.3807692},
	},
} as const

// https://github.com/material-components/material-components-web/blob/2fb068fb0f7a1b0e038ede3a2ab27a972e5b2ee4/packages/mdc-elevation/_elevation-theme.scss#L37
export const defaultColor = '#000'

export const defaultOpacity = {
	[Direction.umbra]: .2,
	[Direction.penumbra]: .14,
	[Direction.ambient]: .12,
}
