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
    allDirections,
    defaultColor,
    defaultOpacity,
    Dimension,
    Direction,
    directionNames,
    elevationLimit,
    predefinedShadowDimension,
    shadowDimensionRegressionCoefficients
} from './config'
import {flattenColorPalette, floatToStr, formatColor, parseColor} from './util'

const getDimension = (
    dir: Direction,
    level: number,
    dimension: Dimension
): number => {
    const predefinedValues = predefinedShadowDimension[dir][dimension]
    if (level < predefinedValues.length && level >= 0) return predefinedValues[level]
    const {intercept, alpha} = shadowDimensionRegressionCoefficients[dir][dimension]
    return intercept + alpha * level
}

const boxShadow = (
    dir: Direction,
    level: number,
    color: string,
) => [
    '0px',
    ...[
        Dimension.yOffset,
        Dimension.blur,
        Dimension.spread,
    ].map(dimension => `${floatToStr(getDimension(dir, level, dimension))}px`),
    color,
].join(' ')

export default ({matchUtilities, config, theme}) => {
    const configName = 'twElevation'
    const varPrefix = '--tw-elevation'

    const color = config(`${configName}.baselineColor`) ?? defaultColor
    const parsed = parseColor(color)
    const opacities = Object.fromEntries(
        allDirections.map(dir => [dir, config(`${configName}.opacity.${directionNames[dir]}`) ?? defaultOpacity[dir]])
    )
    const defaultColors = Object.fromEntries(
        allDirections.map(dir => [
                dir,
                formatColor({
                    ...parsed,
                    alpha: opacities[dir]
                })
            ]
        )
    )
    matchUtilities(
        {
            elevation(value) {
                return {
                    boxShadow: allDirections.map(dir => {
                        const numeric = parseFloat(value)
                        if (isNaN(numeric) || !isFinite(numeric)) return
                        return boxShadow(dir, numeric, `var(${varPrefix}-${directionNames[dir]}, ${defaultColors[dir]})`)
                    }).join(', ')
                }
            },
        },
        {
            values: Object.fromEntries([...Array(elevationLimit).keys()].map(elevation => [elevation, String(elevation)])),
            type: ['number']
        }
    )
    matchUtilities(
        {
            elevation(color) {
                const parsed = parseColor(color)
                return Object.fromEntries(
                    allDirections.map(dir => [
                            `${varPrefix}-${directionNames[dir]}`,
                            formatColor({
                                ...parsed,
                                alpha: opacities[dir]
                            })
                        ]
                    )
                )
            }
        },
        {values: flattenColorPalette(theme('colors')), type: ['color']}
    )
}

