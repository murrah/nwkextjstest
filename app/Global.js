
// For testing. Are we running on localHost?
var onLocalHost = (window.location.host.substring(0,4) == '127.' || window.location.host.substring(0,9) == 'localhost');

Ext.define('App.Global',{
	singleton : true,
	
	config : {
		 onLocalHost 	: onLocalHost
		,webHost 		: window.location.protocol + '//' + window.location.host
		 // Set these to suit your server:
		,webRoot 		: (onLocalHost) ? '/sites/nwktest/' : '/nwktest/'
		,serverURL 		: '' // Set in constructor below.              
	}, // config

	constructor: function(config) {
		this.initConfig(config);		

								// Adjustments for node-webkit
		if (NWK.isPresent) {
								// Adjust the webroot etc based on whether 
								// we are using localhost to get server resources, or use the live server.
								// NWK uses the file system protocol so window.location.protocol
								// returns file:// rather than http:// and onlocalhost is irrelevant

								// Reset these since they wont be accurate when set above
								// for a browser
								
								// Do we want to access the localHost server or the live server?
								// See resources/js/NWK-requires.js for details
			this.setOnLocalHost(NWK.useLocalHost);

								// Set the web root 
								// Set these to suit your server:
			var webRoot = (NWK.useLocalHost) ? '/sites/nwktest/' : '/nwktest/';
			this.setWebRoot(webRoot);

								// Set the correct web host
								// Set these to suit your server:
			var host = (NWK.useLocalHost) ? 'http://127.0.0.1:8501' : 'http://murrah.com.au';
			this.setWebHost(host);
		}

								// Set the url of the server (localhost or live http or live https)
		this.setServerURL( this.getWebHost() + this.getWebRoot() );
								
								// Now, when we need a url in our app (browser or NWK version),
								// we can use App.Global.getServerURL() 

		return this;
	} // constructor

});
