({
	gotoRecord : function(component, event, helper) {
        var record = component.get("v.record");
        $('.contentall').hide();
        var event = $A.get("e.zeitzone:ShowLocalTime").setParams({
            record: record
        });
        event.fire();
	}
})