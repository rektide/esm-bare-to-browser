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
	  exports= {}
	// read top level declarations
	j
		.find( j.ExportNamedDeclaration)
		.find( j.VariableDeclaration)
		.find( j.ObjectPattern)
		.find( j.Identifier)
		.filter( id=> id.name=== "key")
		.forEach( id=> exports[ id.node.name]= id)
	  // read all export values
	  // rename any declarations using an export name
	// rename any references to the export
	var renamed2= root
	return renamed2.toSource()
}
