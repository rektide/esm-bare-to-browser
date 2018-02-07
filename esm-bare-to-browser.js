import f2sExports from "5to6-codemod/transforms/exports.js"
import f2sCjs from "5to6-codemod/transforms/cjs.js"
import f2sNamedExportGeneration from "5to6-codemod/transforms/named-export-generation.js"
import f2sNoStrict from "5to6-codemod/transforms/no-strict.js"
import f2sUtil from "5to6-codemod/utils/main.js"
import eb2bResolve from "./resolve.js"
import eb2bPrefix from "./prefix.js"

export function transform( file, api, options){
	file.source= f2sExports( file, api, options)
	file.source= f2sCjs( file, api, options)
	file.source= f2sNamedExportGeneration( file, api, options)
	file.source= f2sNoStrict( file, api, options)
	file.source= eb2bResolve( file, api, options)
	return file.source
}
export default transform