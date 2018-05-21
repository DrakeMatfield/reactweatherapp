// JScript File
//import {Search_container} from './components/Search_container';

var Search_container = React.createClass({

  on_Submit: function(event) {
          this.props.on_Submit("idZipcode");
  },

  on_Enter_Pressed: function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
       {/*  On_Submit(event.target.id); props.on_Submit(event.target.id); */} 
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
    );  }
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
        );  }
});

var Tabs = React.createClass({
    render: function() {    
        return (
            <div className="tab">
                <button id="defaultOpen" className="tablinks tabSpace" onclick="openTab(event, 'Today')">
                    Today</button>
                <button className="tablinks tabSpace" onclick="openTab(event, 'Forecast')">
                    Forecast</button>
                <button className="tablinks tabSpace" onclick="openTab(event, 'Notification')">
                    Notification</button>
          </div>
        );  }
});

var Main = React.createClass({
    render: function() {    
        return (
            <div id="id_main" className="main">
                {/* Today tab */}
                <Today_tab />

                {/* Forecast tab */}
                <Forecast_tab />

                {/* Notification tab */}
                <Notification_tab />
            </div>
     );  }
});

var Today_tab = React.createClass({
    render: function() {    
        return (
            <div id="Today" className="tabcontent">
                <span id="id_results"></span>
            </div>
        );  }
});

var Forecast_tab = React.createClass({
    render: function() {    
        return (
            <div id="Forecast" className="tabcontent forecastStyle">
                <span id="id_forecast_results"></span>
            </div>
        );  }
});

var Notification_tab = React.createClass({
    render: function() {    
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
        );  }
});

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
        );  }
});   



var Application = React.createClass({
  
 
  on_Submit: function(element_id) {
      {/*   */}
      var zipcode = document.getElementById(element_id).value;
      var str = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='#ZIPCODE')&format=json";
      var url = str.replace('#ZIPCODE', zipcode);

      Api_Call(url); 
      
      alert("Need to implement: on_Submit: function (element_id):" + zipcode );
},
  
  
  render: function() {    
    return (
       <div>
            <Header on_Submit={function(element_id) {this.on_Submit(element_id)}.bind(this)} />
            {/*( <div> tag used to keep the fixed Main Navigation from overlapping.) */}
            <Main />
            <Footer />
        </div>
    );}
});  

ReactDOM.render(<Application />, document.getElementById('container'));

