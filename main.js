import fs from "pn/fs"
import getStdin from "get-stdin" // temporary

import esmBareToBrowser from "./esm-bare-to-browser.js"

export async function main(){
	var stdin= await getStdin()
	var result= esmBareToBrowser( stdin, "stdin")
	console.log( result)
}
export default main
