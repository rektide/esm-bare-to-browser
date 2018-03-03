import { sep, dirname} from "path"

process.on("unhandledRejection", console.error)
process.on("uncaughtException", console.error)

export async function main(){
	var
	  stripped= import.meta.url.slice( 7),
	  transformPath= dirname( stripped)+ sep+ "esm-bare-to-browser.js"
	// the jscodeshift bin is unflexible. this is the low cost hack of it.
	process.argv.push("-t", transformPath, "--no-babel")
	// import() because it will immediately invoke
	// if this were statically imported just requiring main would run
	// downside: no way to do a re-run
	return import( "jscodeshift-async/bin/jscodeshift.sh") // file ending is a lie
}
export default main
