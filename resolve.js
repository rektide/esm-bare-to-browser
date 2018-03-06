import _resolve from "resolve/lib/async.js"
import { dirname, normalize, resolve as pathResolve} from "path"
import { promisify} from "util"
import url from "url-polyfill"

var __resolve= promisify( _resolve)

function arrayitize( opt, def){
	var target= opt!== undefined? opt: def
	if( target!== undefined){
		if( typeof( target)=== "string"){
			return target.split( ",")
		}
		return target
	}
	return []
}

export async function resolve( file, api, options){
	options= options|| {}
	if( options.defaultDir=== undefined){
		options.defaultDir= true
	}
	if( options.defaultDir=== "false"|| options.defaultDir=== false){
		delete options.defaultDir
	}
	// find all imports
	var
	  j= api.jscodeshift,
	  root= j( file.source),
	  imports= root.find( j.ImportDeclaration)
	// resolve all imports
	var
	  resolveOptions= {
		basedir: options.resolveBasedir|| dirname( file.path),
		moduleDirectory: arrayitize( options.resolveModuleDirectory, "node_modules"),
		extensions: arrayitize( options.resolveExtensions, [".mjs", ".js"]),
		preserveSymlinks: options.preserveSymlinks!== undefined? options.preserveSymlinks: true,
		packageFilter: function(pkg){
			if( pkg.module){ // prefer "module" over "main"
				pkg.main= pkg.module
			}
			return pkg
		},
	  },
	  resolves= []
	imports.forEach(function( nodePath){
		var val= nodePath.node.source.value
		try{
			new url( val)
			resolves.push( false) // signal to not transform this url
		}catch(ex){
			var resolved= __resolve( val, resolveOptions)
			if( options.defaultDir){
				resolved= resolved.catch( _=> options.defaultDir=== true? val: options.defaultDir.defaultDir+ val)
			}
			resolves.push( resolved)
		}
	})
	// replace imports with resolved values
	var
	  resolved= await Promise.all( resolves),
	  fileDir= dirname( pathResolve( file.path)),
	  cwd= options.cwd|| process.cwd(),
	  replaced= imports.replaceWith( nodePath=> {
		var
		  node= nodePath.node,
		  replacement= resolved.shift()
		if( replacement.startsWith( fileDir)){
			// use relative paths for children of cwd
			replacement= "." + replacement.slice( fileDir.length)
		}
		if( replacement!== false){
			node.source.value= replacement
		}
		return node
	  }),
	  transformedSource= replaced.toSource()
	return transformedSource
}
export default resolve
