({
	passValue : function(component, event, helper) 
    {
		component.set("v.city", component.find("name").get("v.value"));
        var attributeValue = component.find("name").get("v.value");
        if(attributeValue === undefined)
        {
            component.set("v.isValidCity", true);
        }
        else
        {
            component.set("v.isValidCity", false);
        }
	}
})