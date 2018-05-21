 // JScript File
//import {Search_container} from './components/Search_container';

var Search_container = React.createClass({

    on_Submit: function(event) {
        this.props.on_Submit("idZipcode");
    },

    on_Enter_Pressed: function(event) {
        event.preventDefault();
        if (event.keyCode === 13) { { /*  On_Submit(event.target.id); props.on_Submit(event.target.id); */ }
            this.on_Submit("idZipcode");
        }
    },

    render: function() {
        return (
            <div className="search-container">
           <div>
                <a id="idmenu" href="index.html"><i className="fa fa-bars"></i></a>
            </div>
            <div className="search-bar">
                <input id="idZipcode" 
                    type="text" 
                    onKeyUp={this.on_Enter_Pressed}
                    placeholder="Search.." />
            </div>
            <div>
                <button 
                    id="idzipcodeButton" 
                    type="button" 
                    onClick={this.on_Submit}>
                        <i className="fa fa-search fa-fw"></i>
                </button>
            </div>
        </div>
        );
    }
});

var Header = React.createClass({
    render: function() {
        return (
            <div className="fixedHeader">
                {/* search container */}
                <Search_container on_Submit={this.props.on_Submit} />
                {/* tabs */}
                <Tabs />
            </div>
        );
    }
});

var Tabs = React.createClass({

    openTab: function(evt, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    },

    render: function() {
        return (
            <div className="tab">
                <button id="defaultOpen" className="tablinks tabSpace" onClick={function(){this.openTab(event, 'Today')}.bind(this)}>
                    Today</button>
                <button className="tablinks tabSpace" onClick={function(){this.openTab(event, 'Forecast')}.bind(this)} >
                    Forecast</button>
                <button className="tablinks tabSpace" onClick={function(){this.openTab(event, 'Notification')}.bind(this)} >
                    Notification</button>
          </div>
        );
    }
});

var Main = React.createClass({
    render: function() {
        return (
            <div id="id_main" className="main">
                {/* Today tab */}
                <Today_tab weather={this.props.weather}/>

                {/* Forecast tab */}
                <Forecast_tab weather={this.props.weather}/>

                {/* Notification tab */}
                <Notification_tab weather={this.props.weather}/>
            </div>
        );
    }
});

function createMarkup(markup) {
  return {__html: markup};
}

function MyComponent(props) {
  return <div dangerouslySetInnerHTML={createMarkup(props.htmlCode)} />;
}

function Today_tab(props){ 
     if(props.weather)
     {
         return (
            <div id="Today" className="tabcontent">
            <span id="id_results">
              <p className="date_time_display">{props.weather.get_current_weather_timestamp("#MONTH #DATE, #TIME")}</p>
                <p className="dropmargin">High: {props.weather.Forecasted_HIGH} - Low: {props.weather.Forecasted_LOW}</p>
                <p className="temperature">{props.weather.Condition.Temperature}<sup><small><MyComponent htmlCode={props.weather.Units.Temperature_units}/></small></sup></p>
                {/* the picture */}
                <MyComponent htmlCode={props.weather.Card_Pic}/>
                <p className="remMar">Location:</p><hr/><p className="date_time_display">{props.weather.Location.get_Location()}</p>
                <p className="opinion"><strong>Drake's Thoughts!:</strong>{props.weather.Condition.Temperature}</p>";
            </span>
        </div>);
         
     }
        else
        {
            return(
            <div id="Today" className="tabcontent">
                <span id="id_results"></span>
            </div>);
        }
}

function Forecast_tab(props){
         if(props.weather)
     {
    
    return (
        <div id="Forecast" className="tabcontent forecastStyle">
            <span id="id_forecast_results">
                <p>{props.weather.Title}</p>
                <MyComponent htmlCode={props.weather.Description_HTML}/>
                <p><a href={props.weather.Tag[1]} target="_blank"><img src={props.weather.Tag[0]} className="test" /></a></p>
            </span>
        </div>
    );
     }
     else{
         return (
                    <div id="Forecast" className="tabcontent forecastStyle">
            <span id="id_forecast_results">
          </span>
        </div> 
             );
         
     }
}

function Notification_tab(props){
   
   if(props.weather){
    return (
        <div id="Notification" className="tabcontent">
            <label className="switch">
                <input id="id_notifer" type="checkbox" onchange="On_Notify('id_notifer');" />
                <span id="id_notifer_span" className="slider round"></span><span id="id_notifer_label">Notification</span>
            </label>
            <p>
            Sorry, the notificaton system hasn't yet been implemented.</p>
            <span id="id_Notification_results"></span>
        </div>
    );
   }
   else
   {
       return(
  <div id="Notification" className="tabcontent">
            <label className="switch">
                <input id="id_notifer" type="checkbox" onchange="On_Notify('id_notifer');" />
                <span id="id_notifer_span" className="slider round"></span><span id="id_notifer_label">Notification</span>
            </label>
            <p>
            Sorry, the notificaton system hasn't yet been implemented.</p>
            <span id="id_Notification_results"></span>
        </div>);
       
   }
}

var Footer = React.createClass({
    render: function() {
        return (
            <div className="footer">
                {/* footer */}
                <small>
                    <p>
                        &copy; 2018</p>
                    <p>
                        Follow me on <a href="https://www.facebook.com/drake.matfield" target="_blank">Facebook </a>
                        and <a href="https://www.instagram.com/drakematfield/" target="_blank">Instagram</a></p>
                </small>
            </div>
        );
    }
});


var Application = React.createClass({

  getInitialState: function() {
    return {
         weather: null,
    };
  },

            api_call: function(url) { { /*   */ }
                var xmlhttp = new XMLHttpRequest();

                xmlhttp.callbackFunction = this.callbackFunction;
                xmlhttp.callbackFunctionOnError = this.callbackFunctionOnError;

                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var readableData = JSON.parse(this.responseText);
                        this.callbackFunction(this.responseText);
                    }
                    if (this.readyState == 4 && this.status >= 400) {
                        var code = this.status;
                        this.abort(); // this line might not be needed.
                        //Status Code Error
                        this.callbackFunctionOnError(new Error("There was an error getting the weather for you. ( status code: " + code + ")"));
                    }
                };
                xmlhttp.open("GET", url, true);
                xmlhttp.send();

                alert("Need to implement: Api_Call: function (element_id):" + url);
            },


            callbackFunction: function(data) {
                var readableData = JSON.parse(data);
                 alert(readableData.query.count);
                if (readableData.query.count > 0) {
                    console.dir(readableData);
                    //Display_Results(['idZipcode', 'id_results', 'id_forecast_results'], ParseWeatherYahoo(readableData));
                
                
                var zz = ParseWeatherYahoo(readableData);   
                this.setState({weather:zz});
                    
                    
                }
                else
                {
                     alert("Need to implement: no found");
                   // document.getElementById('id_results').innerHTML = "<h2>Search Found Nothing!</h2>";
                }
            },

            callbackFunctionOnError: function(data) {
                console.log(data);
                alert("Need to implement: Display_Results: function (element_id):" + data);
            },

            on_Submit: function(element_id) { { /*   */ }
                var zipcode = document.getElementById(element_id).value;
                var str = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='#ZIPCODE')&format=json";
                var url = str.replace('#ZIPCODE', zipcode);

                this.api_call(url);
            },

            render: function() {
                    return (
                            <div>
            <Header on_Submit={function(element_id) {this.on_Submit(element_id)}.bind(this)} />
            {/*( <div> tag used to keep the fixed Main Navigation from overlapping.) */}
            <Main weather={this.state.weather} />
            <Footer />
        </div>
    );}
});  

ReactDOM.render(<Application />, document.getElementById('container'));
﻿
﻿
﻿
﻿
﻿
﻿
﻿ 