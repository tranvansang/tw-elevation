// https://youtu.be/rrT6v5sOwJg?t=3m26s
// https://material.io/archive/guidelines/resources/shadows.html
// https://material.io/design/environment/light-shadows.html
// https://material.io/design/environment/elevation.html

import {
	defaultBaselineColor,
	defaultOpacity,
	ITWElevationConfig,
	predefinedShadowDimension,
	ShadowDimension,
	shadowDimensionRegressionCoefficients,
	ShadowDirection,
	shadowDirectionNames
} from './config'

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
	{baselineColor: {red, green, blue}, ...config}: ITWElevationConfig
) => [
	'0px',
	`${getShadowDimension(direction, elevation, ShadowDimension.yOffset).toFixed(2)}px`,
	`${getShadowDimension(direction, elevation, ShadowDimension.blur).toFixed(2)}px`,
	`${getShadowDimension(direction, elevation, ShadowDimension.spread).toFixed(2)}px`,
	`rgba(${[
		red,
		green,
		blue,
		config[`${shadowDirectionNames[direction]}Opacity`]
	].map(x => x.toFixed(2)).join(', ')})`
].join(' ')

export default ({
									classPrefix = 'elevation',
									baselineColor = defaultBaselineColor,
									umbraOpacity = defaultOpacity[ShadowDirection.umbra],
									penumbraOpacity = defaultOpacity[ShadowDirection.penumbra],
									ambientOpacity = defaultOpacity[ShadowDirection.ambient],
								}: Partial<ITWElevationConfig> = {}) => {
	const concretedConfig = {
		classPrefix,
		baselineColor,
		umbraOpacity,
		penumbraOpacity,
		ambientOpacity,
	}
	return ({matchUtilities}) => {
		matchUtilities(
			{
				[classPrefix]: value => ({
					boxShadow: [
						ShadowDirection.umbra,
						ShadowDirection.penumbra,
						ShadowDirection.ambient,
					].map(dimension => {
						const numeric = parseFloat(value)
						if (isNaN(numeric) || !isFinite(numeric)) return
						return boxShadow(dimension, numeric, concretedConfig)
					}).join(', ')
				})
			},
		)
	}
}
