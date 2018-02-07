import commonjsToImport from "babel-plugin-5to6-commonjs-to-import"
import noStrict from "babel-plugin-5to6-no-strict"
import moduleResolver from "babel-plugin-module-resolver"

export let options= {
	babelrc: false,
	compact: false,
	highlightCode: false,
	plugins: [
		commonjsToImport,
		noStrict,
		moduleResolver
	]
}
export default options
