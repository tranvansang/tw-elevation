# TailwindCSS elevation utilities plugin

- Support Just-In-Time (JIT) mode
- Install: `yarn add -D tw-elevation`
- Config: In `tailwind.config.js`,

```javascript
export default {
	mode: 'jit',
	plugins: [
		require('tw-elevation')
	],
}
```

- Class names: `.elevation-0`, `.elevation-1`, up to `.elevation-24`.
- JIT class names: `.elevation-[0]`, `.elevation-[1]`, ... Arbitrary values are supported.
- To change baseline color, use class: `.elevation-[#888]`.
- All themed colors are support: `.elevation-red-500`.
- For color with opacity, for example: `.elevation-red-500/50`, the opacity will be ignored.
- Screenshot:

![tw-elevation screenshot](https://github.com/tranvansang/tw-elevation/blob/master/screenshot.png?raw=true)
