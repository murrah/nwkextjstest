
<cfscript>
				/* 
					A dummy server side script that allows CORS (via the header)
					so Ext Ajax can POST to it.
					Just send back a message - ignore the posted data
				*/
    tzObj=createObject("java","java.util.TimeZone");
    tzName = tzObj.getDefault().getDisplayName(true,tzObj.LONG);
    dt = now();
    dtStr = TimeFormat(dt,'H:mm tt');
				// Make some data to return 
 	result = "Hello, it is #dtStr# in #tzName#";

 				// Get a reference to the page response 
	response = getPageContext().getResponse();

				// Set the header
	response.setHeader("Access-Control-Allow-Origin","*");

				// Return the JSON.
				// The cfcontent reset below just ensures that ONLY the JSON is 
				// returned to the client.
</cfscript>
<cfcontent reset="true" /><cfoutput>#SerializeJson(result)#</cfoutput>