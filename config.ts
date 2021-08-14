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
export const enum ShadowDirection {
	umbra,
	penumbra,
	// antumbra, // not used
	ambient,
}

export const shadowDirectionNames = {
	[ShadowDirection.umbra]: 'umbra',
	[ShadowDirection.penumbra]: 'penumbra',
	[ShadowDirection.ambient]: 'ambient',
} as const

export const enum ShadowDimension {
	// xOffset, // always 0
	yOffset,
	blur,
	spread,
}

export const predefinedShadowDimension = {
	[ShadowDirection.umbra]: {
		[ShadowDimension.yOffset]: umbraY,
		[ShadowDimension.blur]: umbraBlur,
		[ShadowDimension.spread]: umbraSpread,
	},
	[ShadowDirection.penumbra]: {
		[ShadowDimension.yOffset]: penumbraY,
		[ShadowDimension.blur]: penumbraBlur,
		[ShadowDimension.spread]: penumbraSpread,
	},
	[ShadowDirection.ambient]: {
		[ShadowDimension.yOffset]: ambientY,
		[ShadowDimension.blur]: ambientBlur,
		[ShadowDimension.spread]: ambientSpread,
	},
} as const

export const shadowDimensionRegressionCoefficients = {
	[ShadowDirection.umbra]: {
		[ShadowDimension.yOffset]: {intercept: 1.0770563, alpha: 0.4298701},
		[ShadowDimension.blur]: {intercept: 0.7292308, alpha: 0.5892308},
		[ShadowDimension.spread]: {intercept: -0.4338462, alpha: -0.2738462},
	},
	[ShadowDirection.penumbra]: {
		[ShadowDimension.yOffset]: {intercept: 0, alpha: 1},
		[ShadowDimension.blur]: {intercept: -1.221997, alpha: 1.601769},
		[ShadowDimension.spread]: {intercept: -0.3230769, alpha: 0.1469231},
	},
	[ShadowDirection.ambient]: {
		[ShadowDimension.yOffset]: {intercept: -0.24, alpha: 0.39},
		[ShadowDimension.blur]: {intercept: 1.251947, alpha: 1.822970},
		[ShadowDimension.spread]: {intercept: -1.0892308, alpha: 0.3807692},
	},
} as const

export interface ITWElevationConfig {
	classPrefix: string
	color: string
	umbraOpacity: number
	penumbraOpacity: number
	ambientOpacity: number
}

// https://github.com/material-components/material-components-web/blob/2fb068fb0f7a1b0e038ede3a2ab27a972e5b2ee4/packages/mdc-elevation/_elevation-theme.scss#L37
export const defaultBaselineColor = '0, 0, 0'
export const defaultOpacity = {
	[ShadowDirection.umbra]: .2,
	[ShadowDirection.penumbra]: .14,
	[ShadowDirection.ambient]: .12,
}
