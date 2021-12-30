// https://github.com/material-components/material-components-web/blob/2fb068fb0f7a1b0e038ede3a2ab27a972e5b2ee4/packages/mdc-elevation/_elevation-theme.scss#L42
const hardcodedElevation = [
	[[0, 0, 0], [0, 0, 0], [0, 0, 0]],
	[[2, 1, -1], [1, 1, 0], [1, 3, 0]],
	[[3, 1, -2], [2, 2, 0], [1, 5, 0]],
	[[3, 3, -2], [3, 4, 0], [1, 8, 0]],
	[[2, 4, -1], [4, 5, 0], [1, 10, 0]],
	[[3, 5, -1], [5, 8, 0], [1, 14, 0]],
	[[3, 5, -1], [6, 10, 0], [1, 18, 0]],
	[[4, 5, -2], [7, 10, 1], [2, 16, 1]],
	[[5, 5, -3], [8, 10, 1], [3, 14, 2]],
	[[5, 6, -3], [9, 12, 1], [3, 16, 2]],
	[[6, 6, -3], [10, 14, 1], [4, 18, 3]],
	[[6, 7, -4], [11, 15, 1], [4, 20, 3]],
	[[7, 8, -4], [12, 17, 2], [5, 22, 4]],
	[[7, 8, -4], [13, 19, 2], [5, 24, 4]],
	[[7, 9, -4], [14, 21, 2], [5, 26, 4]],
	[[8, 9, -5], [15, 22, 2], [6, 28, 5]],
	[[8, 10, -5], [16, 24, 2], [6, 30, 5]],
	[[8, 11, -5], [17, 26, 2], [6, 32, 5]],
	[[9, 11, -5], [18, 28, 2], [7, 34, 6]],
	[[9, 12, -6], [19, 29, 2], [7, 36, 6]],
	[[10, 13, -6], [20, 31, 3], [8, 38, 7]],
	[[10, 13, -6], [21, 33, 3], [8, 40, 7]],
	[[10, 14, -6], [22, 35, 3], [8, 42, 7]],
	[[11, 14, -7], [23, 36, 3], [9, 44, 8]],
	[[11, 15, -7], [24, 38, 3], [9, 46, 8]],
]

const directionIndices = {
	[Direction.umbra]: 0,
	[Direction.penumbra]: 1,
	[Direction.ambient]: 2,
}
const dimensionIndices = {
	[Dimension.yOffset]: 0,
	[Dimension.blur]: 1,
	[Dimension.spread]: 2,
}

// 25
export const elevationLimit = hardcodedElevation.length

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
export const getDimension = (
	dir: Direction,
	level: number,
	dimension: Dimension
): number => {
	if (
		level < hardcodedElevation.length && level >= 0
	) return hardcodedElevation[level][directionIndices[dir]][dimensionIndices[dimension]]
	const {intercept, alpha} = shadowDimensionRegressionCoefficients[dir][dimension]
	return intercept + alpha * level
}