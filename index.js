#!/usr/bin/env node
var path= require( "path")
var esm= require( "@std/esm")( module)

module.exports= esm( "./esm-bare-to-browser.js").default
module.exports.esmBareToBrowser= module.exports
module.exports.main= esm( "./main.js").default

if( require.main=== module){
	process.argv.push("-t", __dirname + path.sep + "index.js")
	module.exports.main()
}
