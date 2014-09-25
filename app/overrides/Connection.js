/**
 * Override Ext.data.Connection to enable cors in ExtDirect for node-webkit
 * Not used for AJAX requests.
 * 
 */
Ext.define('App.overrides.Connection', {
    override: 'Ext.data.Connection',

    constructor : function(config) {
        config = config || {};
        
                    // Override to set default parameters so that for node-webkit we can
                    // POST to the live web server. 
                    // ie Do a Cross Domain post via the normal ExtJS requests in ExtDirect.
                    // Your server side remoting must set the "Access-Control-Allow-Origin" header.
                    //  
                    // eg for ColdFusion you must use something like:
                    //      response = getPageContext().getResponse();
                    //      response.setHeader("Access-Control-Allow-Origin","*");
                    // or 
                    //      <cfheader name="Access-Control-Allow-Origin" value="*"> 
                    // 
                    // Note: If you set these properties when running in a browser context (ie not node-webkit)
                    // you can do cross domain posting in that context.
                    // However, I couldnt yet get the ExtDirect to do a cross domain post in browser mode.
                    // I dont normally use ExtDirect so my knowledge is sketchy here.
                    // ExtDirect DOES work for node-webkit environments though, as well as for Ajax requests.
                    
        if (NWK.isPresent) {
            config.cors = true;
            config.useDefaultXhrHeader = false;
        }

        Ext.apply(this, config);

        this.callParent(arguments);
    }
});