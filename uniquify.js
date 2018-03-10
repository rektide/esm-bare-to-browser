// used by filter then map to reduce then find name for each declaration
function nameDeclaration( n, exports){
	if( n.type=== "VariableDeclaration"){
	}else if( n.type=== "FunctionDeclaration"){
	}
	if( !n.type|| !n.type.endsWith( "Declaration")){
		return false
	}
}

/**
  A CJS export does not clash with esm export scope. This is a major incompatibility hurdle that we're going to do unhygenic ridiculous schenanigans to crudely hack through.
  Find all exports, then mangle all declarations that are clashes, then re-write any references to 
  This could/should probably, ideally, be written into 5to6-codemod itself.
*/
export default function( file, api, options){
	options= options|| {}
	var
	  j= api.jscodeshift,
	  root= j( file.source),
	  program= root.find( j.Program),
	  foundExports= {}
	// read top level export names
	root
		.find( j.ExportNamedDeclaration)
		.find( j.VariableDeclaration)
		.find( j.ObjectPattern)
		.find( j.Identifier)
		.filter( id=> id.name=== "key")
		.forEach( id=> foundExports[ id.node.name]= id)
	// find top level declarations matching
	var topDeclarations= program
		// find direct children - these will be the top level declarations in the file
		.closestScope()
		// that declare stuff
		.find( j.Declaration)
		// that aren't exports
		.filter( d=> !d.node.type.startsWith("Export"))
		// that are already an export!

	  // read all export values
	  // rename any declarations using an export name
	// rename any references to the export
	var renamed2= root
	return renamed2.toSource()
}
