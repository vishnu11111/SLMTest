({
	click : function(cmp, event, helper){
		var menu = event.getSource();
        var data=menu.get("v.value");
        if(data=="none"){
            cmp.find("timeLabel").set("v.value", "Please select a valid city");
            return;
        }
        var citytimezon=data.split(':');       
		var city=citytimezon[0];
		var time=citytimezon[1];
        var zon=citytimezon[2];
		helper.getTime(cmp,city,time,zon);		
	}
})