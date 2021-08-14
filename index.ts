// https://youtu.be/rrT6v5sOwJg?t=3m26s
// https://material.io/archive/guidelines/resources/shadows.html
// https://material.io/design/environment/light-shadows.html
// https://material.io/design/environment/elevation.html

import {
	defaultBaselineColor, defaultOpacity,
	elevationLimit,
	ITWElevationConfig,
	predefinedShadowDimension,
	ShadowDimension,
	shadowDimensionRegressionCoefficients,
	ShadowDirection, shadowDirectionNames
} from './config'

const getShadowDimension = (
	direction: ShadowDirection,
	elevation: number,
	dimension: ShadowDimension
): number => {
	const predefinedValues = predefinedShadowDimension[direction][dimension]
	if (elevation < predefinedValues.length) return predefinedValues[elevation]
	const {intercept, alpha} = shadowDimensionRegressionCoefficients[direction][dimension]
	return intercept + alpha * elevation
}

const boxShadow = (
	direction: ShadowDirection,
	elevation: number,
	{color, ...config}: ITWElevationConfig
) => [
	'0px',
	`${getShadowDimension(direction, elevation, ShadowDimension.yOffset).toFixed(2)}px`,
	`${getShadowDimension(direction, elevation, ShadowDimension.blur).toFixed(2)}px`,
	`${getShadowDimension(direction, elevation, ShadowDimension.spread).toFixed(2)}px`,
	`rgba(${color}, ${config[`${shadowDirectionNames[direction]}Opacity`].toFixed(2)})`
].join(' ')

export default ({
	classPrefix = 'elevation',
	color = defaultBaselineColor,
	umbraOpacity = defaultOpacity[ShadowDirection.umbra],
	penumbraOpacity = defaultOpacity[ShadowDirection.penumbra],
	ambientOpacity = defaultOpacity[ShadowDirection.ambient],
}: Partial<ITWElevationConfig> = {}) => {
	const concretedConfig = {
		classPrefix,
		color,
		umbraOpacity,
		penumbraOpacity,
		ambientOpacity,
	}
	return ({ addUtilities }) => {
		addUtilities(
			Object.fromEntries([...Array(elevationLimit).keys()].map(elevation => [
				`.${concretedConfig.classPrefix}-${elevation}`,
				{boxShadow: [
						ShadowDirection.umbra,
						ShadowDirection.penumbra,
						ShadowDirection.ambient,
				].map(dimension => boxShadow(dimension, elevation, concretedConfig)).join(', ')}
			])),
		)
	}
}
