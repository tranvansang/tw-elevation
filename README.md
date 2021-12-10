# TailwindCSS elevation utilities plugin

- Support Just-In-Time (JIT) mode
- Install: `yarn add -D tw-elevation`
- Config: In `tailwind.config.js`,

```javascript
export default {
	mode: 'jit',
	plugins: [
		require('tailwindcss/plugin')
	],
}

- Class names: `.elevation-[0]`, `.elevation-[1]`, ...
- To change baseline color, use class: `.elevation-baseline-[#888]`.
- Screenshot:
```

![tw-elevation screenshot](https://github.com/tranvansang/tw-elevation/blob/master/screenshot.png?raw=true)
![tw-elevation screenshot red](https://github.com/tranvansang/tw-elevation/blob/master/screenshot-red.png?raw=true)
