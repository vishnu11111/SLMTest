({
    getTimeWeatherOfRecord : function(component){
        console.log(' ========= GetTimeWeatherOfRecord=========== ');
        
        var toggleText = component.find("spinner");
    	$A.util.removeClass(toggleText,'toggle');
        
        var selectCmp = component.find("tempSelection");
        var selectedTempUnit = true;
        if(selectCmp !=null && selectCmp != 'undefined')
            selectedTempUnit = selectCmp.get("v.value");
        
        var recordId = component.get("v.recordId");
        var fieldName = component.get("v.activeField");
        var action = component.get("c.getLocalTimeOfRecord"); 
        var isFirstTime = component.get("v.isFirstTime");
        console.log('==>'+fieldName + ' ' +recordId);
        action.setParams({"recordId" : recordId, "fieldName":fieldName,"isChanged":selectedTempUnit,"isFirstTime":isFirstTime});
        var time = component.find('Time');
        console.log(component.get("v.selectedTempValue"));
        
        action.setCallback(this, function(response) { 
            var state = response.getState();
            
            if (component.isValid() && state === "SUCCESS") {
                var resultObj = response.getReturnValue();     
                console.log(resultObj);
                component.set("v.isFirstTime",false);
                
                //Time related logic
                if(resultObj.timeErrorMessage != null){
                    $A.util.addClass(time,"slds-hide");
                    component.set("v.timeErrorMsg",resultObj.timeErrorMessage); 
                }                     
                else{
                    $A.util.removeClass(time,"slds-hide");
                    component.set("v.timeErrorMsg",null);
                    component.set("v.address", resultObj.address); 
                    var updateAction = component.get("c.updateGeoLocation"); 
                    updateAction.setParams({"record" :JSON.stringify(resultObj.record)});
                    $A.enqueueAction(updateAction);
                    var cDate = new Date(resultObj.localTime);
                    component.set("v.currentDate",cDate);
                    var setIntervalId = component.get("v.setIntervalId");
                    if(typeof setIntervalId != 'undefined' && setIntervalId != ''){
                        clearInterval(setIntervalId);  
                        component.set("v.setIntervalId","");
                    }
                    this.startTime(resultObj.localTime,component, time);
                }
                
                //Weather related logic
                var weather = resultObj.weather;
                component.set("v.weatherErrorMsg",resultObj.weatherErrorMessage);
                if(resultObj.weatherErrorMessage != null || weather == null || weather.length <= 0){
                    component.set("v.weather",null);
                    if(weather == null || weather.length <= 0)
                        component.set("v.weatherErrorMsg",resultObj.weatherErrorMessage);
                    	//component.set("v.weatherErrorMsg","Something went wrong, please check Weather API.");
                }else{
                    component.set("v.selectedTempValue",resultObj.tempUnit);
                    component.set("v.weather",weather[0]);
                    component.set("v.ComingDaysWeather",weather.splice(1,weather.length-1));
                }
                
                //Logic related to Task
                if( component.get("v.tasks") ==null || component.get("v.tasks").length<1){
                    component.set("v.tasksErrorMsg",resultObj.tasksErrorMessage);
                    component.set("v.tasks", resultObj.tasks);
                    component.set("v.filteredTasks", resultObj.tasks);//for filteration
                    console.log('@# tasks ' +resultObj.tasks);
                }
                //Populate Task status list attributes
                component.set("v.statusList",resultObj.taskStatusList);
                component.set("v.taskStatusErrorMessage",resultObj.taskStatusErrorMessage);
                
                component.set("v.eventsErrorMsg",resultObj.eventsErrorMessage);
                component.set("v.events", resultObj.events);
            }
            $A.util.addClass(toggleText,'toggle');
        });
                
        $A.enqueueAction(action);
    },
    startTime : function(localTime,component, demo) {
        var today = new Date(localTime);
        var hour = today.getHours();
        var minutes = today.getMinutes(); 
        var sec = today.getSeconds();
        var meridiem = "AM";
        if (hour >= 12) {
            hour = hour - 12;
            meridiem = "PM";
        }            
        // 0 AM and 0 PM should read as 12
        if (hour === 0) {
            hour = 12;    
        }  
        var currentTimeVal = hour + ":" + ((minutes<10)?("0"+minutes):minutes)+" "+ meridiem;
        component.set("v.currentTimeVal", currentTimeVal);	// setting initial time by updating attribute
            var timeoutObj = setTimeout( $A.getCallback(
                function(){
                    console.log('----In----');
                    var setIntervalId= setInterval(function() {       
                        console.log('----In- 1 ---');
                        //var today =new Date(localTime);
                        today.setMinutes(today.getMinutes()+1);
                        var hour = today.getHours();
                        var minutes = today.getMinutes();
                        meridiem = "AM"; 
                        if (hour > 12) {
                            hour = hour - 12;
                            meridiem = "PM";
                        }            
                        // 0 AM and 0 PM should read as 12
                        if (hour === 0) {
                            hour = 12;    
                        } 
                        component.set("v.currentDate",today);
                        currentTimeVal = hour + ":" + ((minutes<10)?("0"+minutes):minutes)+" "+ meridiem;
                        component.set("v.currentTimeVal", currentTimeVal);// updating time by updating attribute
                    }, 59500);
                component.set("v.setIntervalId",setIntervalId);
            },60-sec)) ;
    },
    
    setFieldNames : function(component){
        var recordId = component.get("v.recordId");
        var objectPrefix = recordId.substring(0,3);
        //Custom Object with Geolocation field
        if(objectPrefix!="001" && objectPrefix!="003" && objectPrefix!="005" && objectPrefix!="00Q"){
            var fields = [{name:"Geolocation", label:"Geolocation"}];
            component.set("v.fieldNames",fields);
            component.set("v.activeFieldLabel","Geolocation");
        }else{ //Standard Object
            if(objectPrefix=="001"){
                var fields = [ {name:"BillingAddress", label:"Billing Address" }, {name:"ShippingAddress",label:"Shipping Address"}];
            }
            else if(objectPrefix=="003"){
                var fields = [{name:"MailingAddress", label:"Mailing Address" }, {name:"OtherAddress", label:"Other Address" } ];
            }
            else if(objectPrefix=="005" || recordId.substring(0,3)=="00Q"){
                var fields = [{name:"Address", label:"Address" }];
            }
            component.set("v.fieldNames",fields);
            component.set("v.activeField",fields[0].name);
            component.set("v.activeFieldLabel",fields[0].label);
        }
        this.getTimeWeatherOfRecord(component);
    },
    addPills : function(component,pillLabel){
        
        var taskSec = document.getElementById("taskSections");
        var tasksList =component.get("v.tasks");
        var filteredTasks = component.get("v.filteredTasks");
        var filter = component.get("v.taskPills");
        
        console.log(taskSec + '===' + tasksList +'===' + filteredTasks +'===' +filter);
        
        if(filter.length<1){
            filteredTasks = [];
        }else{
            //If pill is already added to list then don't add it, and exit the process
            if(filter.indexOf(pillLabel)>-1){
                return;
            }
            
        }
        filter.push(pillLabel);
        component.set("v.taskPills",filter);
        
        for(var i = 0,size = tasksList.length; i < size;i++){
            if(tasksList[i].status == pillLabel)
                filteredTasks.push(tasksList[i]);            
        }
        component.set("v.filteredTasks",filteredTasks);

        component.find("pillsSections").set("v.value","");
    },
    setupScrolling : function(component){
        //Dealing Scroll event for Task List
        $(component.getElement()).find('#tasksList').unbind("scroll");
        $(component.getElement()).find('#tasksList').on('scroll', function(){
            if ($(this).scrollTop() == $(this).height() - $(this).height()){
                $(component.getElement()).find('#arrowSign use').attr("xlink:href","/resource/zeitzone__SLDS0102/assets/icons/utility-sprite/svg/symbols.svg#chevrondown");
            }else if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                $(component.getElement()).find('#arrowSign use').attr("xlink:href","/resource/zeitzone__SLDS0102/assets/icons/utility-sprite/svg/symbols.svg#chevronup");
            }
        }); 
        
        
        //Dealing Click event of Up/Down arrow for Task List
        //
        $(component.getElement()).find('#arrowSign use').unbind("click");
        $(component.getElement()).find('#arrowSign use').on('click', function(){
            
            var taskListComp = $(component.getElement()).find('#tasksList');
            var arrowSign = $(component.getElement()).find('#arrowSign use');
            
            var scrollValue = taskListComp.scrollTop();
            console.log('-Clicked-',  arrowSign.data());
            
            if(arrowSign.attr("xlink:href").indexOf('symbols.svg#chevronup') >=0 && scrollValue!=0){
        	    taskListComp.animate({scrollTop : 0}, taskListComp.height());
                console.log('-Clicked if-');
            }else if( scrollValue != taskListComp.height()+40 ){
                taskListComp.animate({scrollTop : taskListComp.height()+40}, 0);
                console.log('-Clicked else-');
            }
        });
        
        //Dealing Scroll event for Event List
        $(component.getElement()).find('#eventsList').unbind('scroll');
        $(component.getElement()).find('#eventsList').on('scroll', function(){
            if ($(this).scrollTop() == $(this).height() - $(this).height()){
                $(component.getElement()).find("#eventArrowSign use").attr("xlink:href","/resource/zeitzone__SLDS0102/assets/icons/utility-sprite/svg/symbols.svg#chevrondown");
            }else if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                $(component.getElement()).find("#eventArrowSign use").attr("xlink:href","/resource/zeitzone__SLDS0102/assets/icons/utility-sprite/svg/symbols.svg#chevronup");
            }
        }); 
        
        $(component.getElement()).find('#eventArrowSign use').unbind('click');
        $(component.getElement()).find('#eventArrowSign use').on('click', function(){
            var taskListComp = $(component.getElement()).find('#eventsList');
            var arrowSign = $(component.getElement()).find('#eventArrowSign use');
            
            if(arrowSign.attr("xlink:href").indexOf('symbols.svg#chevronup') >=0 ){
        	    taskListComp.animate({scrollTop : 0}, taskListComp.height());
            }else{
                taskListComp.animate({scrollTop : taskListComp.height()+40}, 0);
            }
        });
    }
    
})