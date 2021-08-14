#!/usr/bin/env Rscript

elevation <- 0:24
sqrtElevation <- sqrt(elevation)
squareElevation <- elevation^2
logElevation <- log(elevation)

# https://github.com/material-components/material-components-web/blob/2fb068fb0f7a1b0e038ede3a2ab27a972e5b2ee4/packages/mdc-elevation/_elevation-theme.scss#L42
umbraY <- c(0, 2, 3, 3, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 10, 10, 10, 11, 11)
umbraBlur <- c(0, 1, 1, 3, 4, 5, 5, 5, 5, 6, 6, 7, 8, 8, 9, 9, 10, 11, 11, 12, 13, 13, 14, 14, 15)
umbraSpread <- c( 0, -1, -2, -2, -1, -1, -1, -2, -3, -3, -3, -4, -4, -4, -4, -5, -5, -5, -5, -6, -6, -6, -6, -7, -7)

penumbraY <- c( 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24)
penumbraBlur <- c( 0, 1, 2, 4, 5, 8, 10, 10, 10, 12, 14, 15, 17, 19, 21, 22, 24, 26, 28, 29, 31, 33, 35, 36, 38)
penumbraSpread <- c( 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3)

ambientY <- c( 0, 1, 1, 1, 1, 1, 1, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 8, 8, 8, 9, 9)
ambientBlur <- c( 0, 3, 5, 8, 10, 14, 18, 16, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46)
ambientSpread <- c( 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 7, 7, 7, 8, 8)

data <- data.frame(
   elevation,
   sqrtElevation,
   squareElevation,
   logElevation,
   umbraY,
   umbraBlur,
   umbraSpread,
   penumbraY,
   penumbraBlur,
   penumbraSpread,
   ambientY,
   ambientBlur,
   ambientSpread
)

regression <- function(name) {
	print(name)
	print(lm(
		as.formula(paste(name, ' ~ elevation')),
		#umbraY ~ elevation + sqrtElevation + squareElevation + logElevation,
		data = data,
		subset = if (name == 'umbraY')
			!elevation %in% 0:3
			else if (name == 'ambientBlur')
				elevation != 6
			else if (name == 'penumbraBlur')
				!elevation %in% c(6, 8)
			else NULL
	)$coefficients)
}
regression('umbraY')
regression('umbraBlur')
regression('umbraSpread')
regression('penumbraY')
regression('penumbraBlur')
regression('penumbraSpread')
regression('ambientY')
regression('ambientBlur')
regression('ambientSpread')

# https://docs.google.com/spreadsheets/d/1XfBSPGbbuTLeaOHxaAgDx9jFLa-OAgZ9ncpS3ClusFk/edit?usp=sharing
# = 1.0770563 +   0.4298701 * A5
# = 0.7292308 +   0.5892308 * A5
# = -0.4338462 +  -0.2738462 * A5
# = 0 +           1 * A5
# = -1.221997 +    1.601769 * A5
# = -0.3230769 +   0.1469231 * A5
# = -0.24 +        0.39 * A5
# = 1.251947 +    1.822970 * A5
# = -1.0892308 +   0.3807692 * A5
