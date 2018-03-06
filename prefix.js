/**
  Prefix a path in front of all non-bare imports
*/
export default function( file, api, options){
	options= options|| {}
	var
	  j= api.jscodeshift,
	  root= j( file.source),
	  imports= root.find( j.ImportDeclaration),
	  cwd= options.cwd|| process.cwd(),
	  remove= options.remove|| "/node_modules",
	  replace= options.replace|| "/lib",
	  replaced= imports.replaceWith( nodePath=> {
		var
		  node= nodePath.node,
		  text= node.source.value
		if( text.startsWith( cwd)){
			text= text.substring( cwd.length)
		}
		if( text.startsWith( remove)){
			text= replace+ text.substring( remove.length)
		}
		if( text!== false){
			node.source.value= text
		}
		return node
	  }),
	  transformedSource= replaced.toSource()
	return transformedSource
}
