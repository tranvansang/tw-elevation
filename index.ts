// https://youtu.be/rrT6v5sOwJg?t=3m26s
// https://material.io/archive/guidelines/resources/shadows.html
// https://material.io/design/environment/light-shadows.html
// https://material.io/design/environment/elevation.html

/*
Component elevation values
1. Nav drawer: 16dp
2. App bar: 4dp
3. Card: 1dp to 8dp
4. FAB: 6dp
5. Button: 2dp to 8dp
6. Dialog: 24dp
 */

import {
	defaultBaselineColor,
	defaultOpacity,
	predefinedShadowDimension,
	ShadowDimension,
	shadowDimensionRegressionCoefficients,
	ShadowDirection,
	shadowDirectionNames
} from './config'
import {hexToHSL} from './util'

const configName = 'twElevation'
const baselineColorVarName = '--tw-elevation-baseline-color'

const getShadowDimension = (
	direction: ShadowDirection,
	elevation: number,
	dimension: ShadowDimension
): number => {
	const predefinedValues = predefinedShadowDimension[direction][dimension]
	if (elevation < predefinedValues.length && elevation >= 0) return predefinedValues[elevation]
	const {intercept, alpha} = shadowDimensionRegressionCoefficients[direction][dimension]
	return intercept + alpha * elevation
}

const boxShadow = (
	direction: ShadowDirection,
	elevation: number,
	config: {
		umbraOpacity: number
		penumbraOpacity: number
		ambientOpacity: number
	}
) => [
	'0px',
	`${getShadowDimension(direction, elevation, ShadowDimension.yOffset).toFixed(2)}px`,
	`${getShadowDimension(direction, elevation, ShadowDimension.blur).toFixed(2)}px`,
	`${getShadowDimension(direction, elevation, ShadowDimension.spread).toFixed(2)}px`,
	`hsla(var(${baselineColorVarName})/${config[`${shadowDirectionNames[direction]}Opacity`].toFixed(2)})`
].join(' ')

export default ({matchUtilities, config, addBase}) => {

	const baselineColor = config(`${configName}.baselineColor`) ?? defaultBaselineColor
	const umbraOpacity = config(`${configName}.opacity.umbra`) ?? defaultOpacity[ShadowDirection.umbra]
	const penumbraOpacity = config(`${configName}.opacity.penumbra`) ?? defaultOpacity[ShadowDirection.penumbra]
	const ambientOpacity = config(`${configName}.opacity.ambient`) ?? defaultOpacity[ShadowDirection.ambient]

	addBase({
		':root': {
			[baselineColorVarName]: hexToHSL(baselineColor)
		}
	})
	matchUtilities({
		elevation: value => ({
			boxShadow: [
				ShadowDirection.umbra,
				ShadowDirection.penumbra,
				ShadowDirection.ambient,
			].map(dimension => {
				const numeric = parseFloat(value)
				if (isNaN(numeric) || !isFinite(numeric)) return
				return boxShadow(dimension, numeric, {
					umbraOpacity,
					penumbraOpacity,
					ambientOpacity,
				})
			}).join(', ')
		}),
		['elevation-baseline']: color => {
			const hslColor = hexToHSL(color)
			return {
				[baselineColorVarName]: hslColor
			}
		}
	})
}
