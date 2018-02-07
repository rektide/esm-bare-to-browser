import babel from "babel-core"
import options from "./options.js"

export default function( code, filename){
	options.filename= filename
	//options.filenameRelative= filename // unclear whether above covers this sort of thing?
	return babel.transform( code, options).code
}
