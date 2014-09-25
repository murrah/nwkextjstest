
Ext.define('App.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],
    
    xtype: 'app-main',

    layout: {
        type: 'border'
    },

    items: [{
        region: 'west',
        xtype: 'panel',
        title: 'west',
        width: 150
    },{
        region: 'center',
        xtype: 'tabpanel',
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype   : 'button',
                    text    : 'About node-webkit',
                    handler : function(btn,e) {
                        var nwkVersion = 'This version of the app isnt using node-webkit';
                        if (NWK.process) {
                            nwkVersion = 'node-webkit version='+NWK.process.versions['node-webkit'];
                        }
                        Ext.Msg.alert('About node-webkit',nwkVersion);
                    }
                }       

                ,{
                    xtype   : 'button',
                    text    : 'Launch a file',
                    handler : function(btn,e) {
                        if (NWK.gui) {                         
                                            // Launch by extention. eg .txt .doc .xls etc
                                            // ie the OS configured application for the relevant extention.
                                            // Note that openItem('Test1.txt') will work if the file
                                            // is in the app root folder. 
                                            // BUT openItem('mydocs/Test1.txt') or openItem('./mydocs/Test1.txt')
                                            // WONT WORK because NWK cant correctly resolve the path.
                                            // Hence the use of the convenience property NWK.homePath
                                            // which is set in resources/js/NWK-requires.js
                            NWK.gui.Shell.openItem(NWK.homePath+'mydocs/Test1.txt');
                        } else {
                            Ext.Msg.alert('Problem','Sorry, you cant do that in a browser')
                        }
                    }
                }  

                ,{
                    xtype   : 'button',
                    text    : 'Browse docs folder',
                    handler : function(btn,e) {
                        if (NWK.fsexplorer) {
                            var startPath = NWK.homePath+"mydocs";
                            NWK.fsexplorer.readdir(startPath,function(err, path, details){
                                if (err) {
                                    Ext.Msg.alert('Error',err.message);
                                } else {
                                    var msg = '';
                                    Ext.Array.forEach(details,function(file){
                                        msg += Ext.String.format('<br>{0}: {1}, Size:{2}',(file.isDir ? 'Dir' :'File'), file.name, file.size  ); 
                                    })
                                    Ext.Msg.alert('Files in '+startPath,msg);
                                }
                            });
                        } else {
                            Ext.Msg.alert('Problem','NWK.fsexplorer isnt found.')
                        }
                    }
                }   

                ,{
                    xtype   : 'button',
                    text    : 'RPC request using ExtDirect',
                    handler : function(btn,e) {
                        if (typeof(RPC) === 'object') {
                                        // Ask the server for it's time using ExtDirect.
                                        // This works for both browser and nwk versions.
                                        // However, the nwk version needs the override in
                                        // app/overrides/Connection.js
                            RPC.Util.getdate('dddd, d/m/YYYY',function(res) {
                                Ext.Msg.alert('Message','The server time is '+res+'<br>&nbsp;');
                            }, console);                            
                        } else {
                            Ext.Msg.alert('Problem','Sorry, remoting isnt available.')
                        }

                    }
                }

                ,{
                    xtype   : 'button',
                    text    : 'Ajax request using Ext Ajax',
                    handler : function(btn,e) {

                                    // Server side script. Start with relative path which will work
                                    // for the browser version only if the script is on the same server
                                    // as the app. ie the normal way of doing things in browser version, 
                                    // use the local host or server host as appropriate.
                        var url = "postto.cfm";

                                    // However, for NWK we need to fully qualify the URL
                                    // so we are using a http/s: protocol instead of the local file: protocol
                        //if (NWK.isPresent) url = App.Global.getServerURL() + url;
                                    
                                    // BUT, for this test app, we will fully qualify the browser version as well
                                    // so you can test the browser version of the app without needing to 
                                    // make an appropriate server side script.
                        url = App.Global.getServerURL() + url;

                        var dataToSend = Ext.JSON.encode({
                            test : 'test data'
                        });

                        Ext.Ajax.request({
                            url: url,
                            method: 'POST',
                            params: {
                                data: dataToSend
                            }
                            ,callback : function (options, success, response) {
                                Ext.Msg.alert('Ext Ajax','Request to<br>'+url+ ' returned:<br>'+response.responseText+'<br>&nbsp;');
                            }
                 
                        });
                    }
                }


            ]
        }],        
        items:[

            {
                title: 'Center Tab 1',
                html:'Hello node-webkit demo app.'
            }
        ]
    }]
});
    