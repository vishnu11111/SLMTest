({
    //This function is used to set the city based on given input
	 getInput : function(cmp, evt) 
    {
      var action = cmp.get("c.getResponse");
	 var attributeValue = cmp.get("v.city");   
     action.setParams({ city : attributeValue});     
     action.setCallback(this, function(a)
     {       
		cmp.set("v.weather", a.getReturnValue())
     });
     $A.enqueueAction(action);                    
   }
})