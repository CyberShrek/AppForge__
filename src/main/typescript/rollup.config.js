import applyTypescript from "@rollup/plugin-typescript"
import resolveNodeJs from '@rollup/plugin-node-resolve'
import applyTerser from '@rollup/plugin-terser'
import clean from "@rollup-extras/plugin-clean"

export default  {
    input: `src/index.ts`,
    output: [
        {
            dir: "../resources/static/js/build",
            format: "es",
            sourcemap: true,
            manualChunks:{
                wretch: ["wretch"]
            }
        }
    ],
    plugins: [
        clean(),
        resolveNodeJs({
            browser: true,
            dedupe: ['s']
        }),
        applyTypescript(),
        applyTerser()
    ]
}