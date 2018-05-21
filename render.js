// JScript File
﻿//http://team-tree-profile-js-node-drakematfield.c9users.io:8081/
var fs = require("fs");
const cloud_root = '/home/ubuntu/workspace/';
const root = '';


function mergeValues(values, content) {
for(var key in values){

content = content.replace("{{" + key + "}}", values[key]);
}
return content;
}


function view(templeteName, values, response) {

 var fileContents = fs.readFileSync(root+'views/' + templeteName + '.html', {encoding: "utf8"});
 
    //fileContents = mergeValues(values, fileContents);
    response.write(fileContents);
}

module.exports.view = view;
