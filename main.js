#!/usr/bin/env node
import { sep, dirname} from "path"
import PackageDepends from "package-depends"
import isMain from "is-main"

process.on("unhandledRejection", console.error)
process.on("uncaughtException", console.error)

export async function main(){
	// if no path is specified
	if( process.argv.length<= 2){
		// default to all non-dev packages
		var pkgs= new PackageDepends({ trim: true, modulesDirs: ["browser_modules", "node_modules"]})
		for await( var pkg of pkgs.depends()){
			process.argv.push( pkg)
		}
	}

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

if( isMain(import.meta.url)){
	main()
}
