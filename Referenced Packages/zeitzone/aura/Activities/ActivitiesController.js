({
    goToObject : function (component, event, helper) {
        var record = component.get("v.activity");        
        
        if( (typeof sforce != 'undefined') && (sforce != null) ) {
            sforce.one.navigateToSObject(record.recordId, "detail");            
        }
        else {
             window.location.href = '/'+record.recordId;  
        }
    }
})