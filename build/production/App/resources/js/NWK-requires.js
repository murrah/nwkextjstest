
/**
 * Node-Webkit detection and requires.
 * Create a global namespace for node-webkit.
 * Detect if node-webkit is running and set isPresent accordingly.
 * If NWK is present, require the nodejs modules you need and save them to the global namespace.
 */

var NWK = {
            // Just a convenient self-documenting property to know
            // whether we are in a node-webkit environment or not
    isPresent : (typeof(process) === 'object' && process.versions['node-webkit']) ? true : false
};



if (NWK.isPresent) {
            // Save the node web-kit process object to the namespace 
            // (for consistency using the NWK namespace in your app)
    NWK.process = process;
            // Tip: There is a lot of useful info in the process object.
            // console.log(process);

            // Use the namespace to hold the required modules
            // These come with node-webkit via NodeJs
    NWK.gui = require('nw.gui');
    NWK.path = require('path');
    NWK.fs = require('fs');

            // This is a sample custom node module for the purposes of this test app.
            // FileSystem explorer. See node_modules/fsexplorer.js
    NWK.fsexplorer = require('fsexplorer');

            // For convenience, save the path to the home folder of this app
            // using the path module.
            // There doesnt seem to be a consistent way to know the actual folder that 
            // the app is launched from. We need a different method depending on whether 
            // the app has been packaged or not. 
            // Hence this "hack":
    if (process.execPath.toLowerCase().search("nw.exe") == -1) {
            // This is what we need in the packaged app which was are assuming
            // is NOT launched from nw.exe
        NWK.homePath = NWK.path.dirname( process.execPath ) + '/';        
    } else {
            // This is what we need in the unpackaged app that we are 
            // assuming IS launched from nw.exe
        NWK.homePath = NWK.path.resolve( "./" ) + '/';        
    }




    //console.log(NWK.fs.realpathSync('.')); // Same as path.resolve()



            // Do we want to use the localHost resources to test or use a live server?
            // Look for useLocalHost as a custom command line argument to nw.exe
            // which is set in the nwLocal.bat file.
            // If present, set the useLocalHost flag. You can then use that in your app
            // to use local host resources or live server resources for http requests.

            // Assume live server
    NWK.useLocalHost = false;
            
            // Get the command line arguments to the nw.exe 
    NWK.args = NWK.gui.App.argv;
    
            // If 'useLocalHost' command line parameter is present set the property to true
    if (NWK.args.indexOf('useLocalHost') != -1) NWK.useLocalHost = true;

            // See also app/Global.js
}


