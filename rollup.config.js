import applyTypescript from "@rollup/plugin-typescript"
import resolveNodeJs from '@rollup/plugin-node-resolve'
import applyTerser from '@rollup/plugin-terser'
import clean from "@rollup-extras/plugin-clean"

export default  {
    input: `./src/main/typescript/index.ts`,
    output: [
        {
            dir: "./src/main/resources/static/js/build",
            format: "es",
            sourcemap: true,
            manualChunks:{
                wretch: ["wretch"],
                sweetalert2: ["sweetalert2"]
            }
        }
    ],
    plugins: [
        clean(),
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