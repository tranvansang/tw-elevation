# TailwindCSS elevation utilities plugin

- Support Just-In-Time (JIT) mode
- Install: `yarn add -D tw-elevation`
- Config: In `tailwind.config.js`,

```javascript
import twElevation from 'tw-elevation'
import plugin from 'tailwindcss/plugin'

export default {
	mode: 'jit',
	plugins: [
		plugin(twElevation())
	],
}
```
- `twElevation(option)` receives an optional `option` object with the following optional keys:

```typescript
export interface ITWElevationConfig {
	classPrefix: string
	baselineColor: {
		red: number
		green: number
		blue: number
	}
	umbraOpacity: number
	penumbraOpacity: number
	ambientOpacity: number
}
```

- Class name: `.elevation-[0]`, `.elevation-[1]`, ...
- Screenshot:

![tw-elevation screenshot](https://github.com/tranvansang/tw-elevation/blob/master/screenshot.png?raw=true)
