rm -rf index.d.ts index.js config.js config.d.ts util.js util.d.ts cjs \
&& mkdir cjs \
&& echo '{"type": "commonjs"}' > cjs/package.json \
&& tsc --target esnext --module commonjs --downlevelIteration --declaration --esModuleInterop --outDir cjs --lib esnext index.ts --skipLibCheck \
&& tsc --target esnext --module esnext --downlevelIteration --declaration --esModuleInterop --outDir . --lib esnext index.ts --skipLibCheck
