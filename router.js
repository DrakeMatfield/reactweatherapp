// JScript File
var Weather_API = require("./weather_api.js");
var Yahoo_Weather_Parse = require("./ParserWeatherYahooApi.js");
var rendener = require("./render.js");
var url = require("url");
var querystring = require("querystring");
var commonHeaders = {'Content-Type': 'text/html'};

function home(request, response) {
    if (request.url === "/") {
        if(request.method.toLowerCase() === "get")
        {
            console.log("Home Page.");
            response.writeHead(200, commonHeaders);
            rendener.view('header', {}, response);
            //        rendener.view('search', {}, response);
            rendener.view('today', {}, response);
            rendener.view('forecast', {}, response);
            rendener.view('notification', {}, response);
            rendener.view('footer', {}, response);
             console.log("home ending");
            response.end();
        }
//        else
//        {
//                request.on("data", function(postBody){
//                    var query = querystring.parse(postBody.toString());
//                    response.writeHead(303, {'Location': "/" + query.username});
//                    response.end();
//                });  
//          }      
    }
//    else
//    {
//        console.log(request.url + "404");
//        response.writeHead(404, commonHeaders);
//        console.log("else ending");
//        response.end();
//        //  }  
//    }
};

function weather(request, response) {

    var username = request.url.replace("/", "");
    console.log(request.url);
    console.log(username);
    var q = url.parse(request.url, true);
 console.log(q.query.searching_for);
    
//var query = querystring.parse(postBody.toString());
        //            
    //var username = request.url.replace("/", "");
    if (q.query.searching_for) {

        console.log("query passed");
        response.writeHead(200, commonHeaders);
        rendener.view('header', {}, response);

        var weather_api = new Weather_API(username);
        weather_api.on("end", function(profileJSON) {
            var x = Yahoo_Weather_Parse.parse(profileJSON);
console.dir("Weather end:" + Yahoo_Weather_Parse.parse(profileJSON));
            //console.log(profileJSON);
            console.log(profileJSON.query.results.channel.location.city);
            //     var values = {
            //        avartarUrl: profileJSON.gravatar_url,
            //        username: profileJSON.profile_name,
            //        badges: profileJSON.badges.length,
            //        javascriptPoints: profileJSON.points.JavaScript
            //      }

            //      rendener.view('profile', values, response);
                  rendener.view('footer', {}, response); 
            //      console.log(values.username + " has " + values.badges + " badges");
                  console.log("end ending");
                  response.end();
        });

        weather_api.on("error", function(error) {
            console.log("Error" + error);
            //      rendener.view('error', { error_message: error.message }, response);
            //      rendener.view('search', {}, response);
                  rendener.view('footer', {}, response);
                   console.log("error ending");
                  response.end();
        });
    }
    else
    {
        console.log(request.url + "404");
        response.writeHead(404, commonHeaders);
        console.log("else ending");
        response.end();
        //  }  
    }
}

module.exports.home = home;
module.exports.weather = weather;
