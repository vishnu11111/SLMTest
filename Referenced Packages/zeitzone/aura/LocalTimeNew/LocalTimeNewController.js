({
    changeTempUnit :function(component,event,helper){
        helper.getTimeWeatherOfRecord(component);
    },
    doInit :function(component,event,helper){
        var recordId = component.get("v.recordId");
        if(typeof recordId !='undefined' && recordId !='')
            helper.setFieldNames(component);
    },
    addPills : function(component,event,helper){
        var pill = component.find("pillsSections").get("v.value");
        helper.addPills(component,pill);
    },
    getAddress : function(component, event, helper){
        /*var recordId = component.get("v.recordId");
        var fieldName = component.get("v.activeField");
        var fields = component.get("v.fieldNames");
        if(fields.length>1 && fields.indexOf(fieldName)>-1){
            var active = ((fields.indexOf(fieldName)>0) ? fields[0]:fields[1]);
        */  
        	component.set("v.activeField",component.find("selection").get("v.value"));
        	helper.getTimeWeatherOfRecord(component);
        
        	var fieldLabel = component.find("selection").get("v.value");
        	if(fieldLabel != undefined && fieldLabel.indexOf('Address') > 0 ){
                    fieldLabel = fieldLabel.replace('Address', ' Address')
            }
            component.set("v.activeFieldLabel", fieldLabel);
            
            console.log('##', component.get("v.fieldNames"));
        
    },
    showLocalTimeWeather :function(component, event, helper){
        var record = event.getParam("record");
        component.set("v.recordId",record.Id);
        helper.setFieldNames(component);
        
    },
    showLocalTime : function(component, event, helper){
        console.log('showLocalTime');
        var record = event.getParam("record");
        component.set("v.recordId",record.Id);
        helper.setFieldNames(component);
    },
    goToObject : function (component, event, helper) {
        console.log('inside goToObject method');
        var recordId = component.get("v.recordId");
        var redirectedFrom = component.get("v.redirectedFrom");
        
        if(redirectedFrom == 'Vf')
            history.back();
        else if(recordId != null && recordId !=''){
            var navEvt = $A.get("e.force:navigateToSObject");
            navEvt.setParams({
                "recordId":recordId ,
                "slideDevName": "detail"
            });
            navEvt.fire();
        }
    },
	showSpinner : function (component, event, helper) {
        var toggleText = component.find("spinner");
    	$A.util.removeClass(toggleText,'toggle');
	},

 	hideSpinner : function (component, event, helper) {
        var toggleText = component.find("spinner");
    	$A.util.addClass(toggleText,'toggle');
  	},
    removeFilter : function (component, event, helper) {
        //Remove Pill from TaskList
        //REmove Record from FilteredTasks
        
        var removePill = event.target.getAttribute("data-data");
        if(removePill == null && event.target.parentNode != null)
            removePill = event.target.parentNode.getAttribute("data-data");
        var filteredTasks = component.get("v.filteredTasks");
        var filter = component.get("v.taskPills");
        
        var newFilterTasks = []; 
        for(var i = 0;i < filteredTasks.length;i++){                
            if(filteredTasks[i].status != removePill)
                newFilterTasks.push(filteredTasks[i]);                
        }
        component.set("v.filteredTasks",newFilterTasks);
        
        var newTaskPills = []; 
        for(var i = 0;i < filter.length;i++){                
            if(filter[i] != removePill)
                newTaskPills.push(filter[i]);                
        }
        component.set("v.taskPills", newTaskPills);
        
        if(newTaskPills.length<1){
            component.set("v.filteredTasks",component.get("v.tasks"));
            
        }
        component.find("pillsSections").set("v.value","");
        console.log(newTaskPills);
    }
})