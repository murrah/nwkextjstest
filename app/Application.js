Ext.define('App.Application', {
    name: 'App',

    extend: 'Ext.app.Application',
    
    requires: [
        'Ext.window.MessageBox',
        'Ext.direct.*', 
        'Ext.Ajax',
        'App.Global',
        'App.overrides.Connection',
        'App.DirectAPI'
    ],

    views: [],
    controllers: [],
    stores: [],

    init: function(){

                    // If NWK.gui is defined we are running in the node-webkit environment
                    // See packages/js/NWK-requires.js
        if (NWK.gui) {
            var win = NWK.gui.Window.get();

                    // Open the debugging window if it isnt already open.
            if (!win.isDevToolsOpen()) {
                var devWin = win.showDevTools('',false);
                    // eg Move the debugging window to another monitor
                    // devWin.moveTo(1940,50);
                
                devWin.moveTo(300,250);    // left, top
                devWin.resizeTo(1000,600); // width, height
            }
                    // eg changing the zoom level (equivalent of ctrl+ in browser)
            if (win.zoomLevel == 0) {
                win.zoomLevel = 1;                
            }

                    // eg move the main window
                    // left, top
            win.moveTo(100,50);

                    // eg set the main window title
            var t = "NWK-ExtJS package serving files from ";
            t += (NWK.useLocalHost) ? 'LOCAL host' : 'REMOTE server';

            win.title = t;                

        }        
    }
});
