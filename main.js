export async function main(){
	// again the jscodeshift bin is pretty unflexible. this is the zero cost hack of it.
	process.argv.push("-t", __dirname + path.sep + "index.js")
	// import() because it will immediately invoke
	// if this were statically imported just requiring main would run
	// downside: no way to do a re-run
	return import( "jscodeshift-async/bin/jscodeshift.sh") // file ending is a lie
}
export default main
