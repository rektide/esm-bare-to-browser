/**
  Prefix a path in front of all non-bare imports
*/
export default function( file, api, options){
	options= options|| {}
	var
	  j= api.jscodeshift,
	  root= j( file.source),
	  imports= root.find( j.ImportDeclaration),
	  cwd= options.cwd|| process.env["EB2B_PREFIX_CWD"]||process.cwd(), // didn't see any way for runner to pass in options
	  remove= options.remove|| process.env["EB2B_PREFIX_REMOVE"]|| "/node_modules",
	  replace= options.replace|| process.env["EB2B_PREFIX_REPLACE"]|| "/lib",
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
