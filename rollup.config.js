import applyTypescript from "@rollup/plugin-typescript"
import resolveNodeJs from '@rollup/plugin-node-resolve'
import applyTerser from '@rollup/plugin-terser'
import clean from "@rollup-extras/plugin-clean"
import commonjs from '@rollup/plugin-commonjs'

export default  {

    input: [`./src/main/typescript/index.ts`, `./src/main/typescript/forge.ts`, `./src/main/typescript/debug.ts`],
    output: [
        {
            dir: "./src/main/resources/static/js/built",
            format: "es",
            sourcemap: true,
            manualChunks:{
                wretch: ["wretch"],
                domtoimage: ["dom-to-image"],
                sweetAlert2: ["sweetalert2"],
                easePick: ["@easepick/amp-plugin", "@easepick/core", "@easepick/lock-plugin", "@easepick/range-plugin"]
            }
        }
    ],
    plugins: [
        clean(),
        commonjs({
            namedExports:{
                "dom-to-image": ["dom-to-image"],
            }
        }),
        resolveNodeJs({
            mainFields: [ "module", "browser", "main" ],
            dedupe: ['s']
        }),
        applyTypescript(),
        applyTerser()
    ],
    onwarn: (warning, handle) => {
        // Ignore node_modules warnings
        if(warning.loc?.file?.includes("node_modules") || warning.ids?.toString()?.includes("node_modules"))
            return

        handle(warning.message)
    }
}