Ext.define('App.DirectAPI', {
	requires: ['Ext.direct.*', 'Ext.Ajax']
}, function() {

/* NOTES:
For this to work in a Node-webkit context:
1.  If you use relative paths in your urls, xmlHttpRequest 
	(used by ExtJS to do Ajax calls (including remote)) will supply the
	protocol. For browser environments the protocol will be http or https 
	but for NWK it will be file://
	So, the Ajax call will therefore try to locate the resource on the 
	local file system, not the web server.
	For that reason we need to fully qualify the url when using NWK and ExtJS.
	Hence the use of the NWK.webRoot variable when setting the URL below
	(see resources/js/NWK-requires.js)

2.  Api.cfm returned data must be prefixed with an Ext.ns(); so the global 
	namespace for the ExtDirect is created. eg we are expecting Ext.ns('RPC') 
	in this example, which is what our Api.cfm defines.

3.  In this test app: remoting wont work for the browser version unless 
	you have implemented remoting
	on the server that you are running the app on. 
*/
 	var hostUrl = App.Global.getServerURL();
 	var url = hostUrl + "servicebus/API.cfm";

    var Loader = Ext.Loader,
        wasLoading = Loader.isLoading;

    				//Load the API config from the server
    Loader.loadScriptFile(
    				// The url of the Api.cfm
    	url,
    				// onLoad listener 
    	Ext.emptyFn, 
    				// onError listener
    	function(errMsg, synchronous, scope){
    		console.log(errMsg); 
    		//throw errMsg
    	}, 
    				// Scope
    	null, 
    				// Synchronous. We must have the Api config before we continue.
    	true  
    );

    Loader.isLoading = wasLoading;

					// For node-webkit all http requests MUST use the http protocol (ie not file://)
					// so we are fully qualifying the Router's url. 
					// eg instead of just 'servicebus/Router.cfm' it needs to be something like:
					// 'http://mywebserver/myapp/servicebus/Router.cfm'
					// See comment above.
	if (NWK.isPresent) {
					// Get the url of the remote service
		var directUrl = RPC.REMOTING_API.url.toLowerCase();

					// Set the fully qualified url to the service		
		if (directUrl.indexOf(hostUrl.toLowerCase()) == -1) 
			RPC.REMOTING_API.url = hostUrl + directUrl;
	}

					// If we have a valid RPC config,
					// pass the remoting config to the ExtDirect manager
					// whether or not in the browser or NWK environment
	if (typeof(RPC) === 'object') Ext.direct.Manager.addProvider(RPC.REMOTING_API);
});
