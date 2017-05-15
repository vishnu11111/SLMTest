({
	getTime : function(cmp,city,time,zon){
        var z=zon;
        var finaltime;
		var timeLabel = cmp.find("timeLabel");
		var localtime=time;
		var NA="San Francisco Vancouver Seattle Los Angeles Houston New York Boston Washington DC Denver";
		var EU="London Dublin Berlin Athens Madrid Paris Rome";
		var AU="Melbourne Sydney Perth";

	    if(NA.indexOf(city)!=-1)
	    {
            finaltime= this.worldClock(parseInt(localtime), "NAmerica");
	    }else if (EU.indexOf(city)!=-1){
	    	finaltime= this.worldClock(parseInt(localtime), "Europe");
	    } else if (AU.indexOf(city)!=-1){
	    	finaltime= this.worldClock(parseInt(localtime), "Australia");
        } else{
            finaltime= this.worldClock(parseInt(localtime), "null");
        }
          
        timeLabel.set("v.value", finaltime+" "+z);
	},
	
	worldClock : function  (zone, region){
			var dst = 0
			var time = new Date()
			var gmtMS = time.getTime() + (time.getTimezoneOffset() * 60000)
			var gmtTime = new Date(gmtMS)
			var day = gmtTime.getDate()
			var month = gmtTime.getMonth()
			var year = gmtTime.getYear()
			if(year < 1000){
			year += 1900
			}
			var monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", 
							"September", "October", "November", "December")
			var monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
			if (year%4 == 0){
			monthDays = new Array("31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
			}
			if(year%100 == 0 && year%400 != 0){
			monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
			}

			var hr = gmtTime.getHours() + zone
			var min = gmtTime.getMinutes()
			var sec = gmtTime.getSeconds()

			if (hr >= 24){
			hr = hr-24
			day -= -1
			}
			if (hr < 0){
			hr -= -24
			day -= 1
			}
			if (hr < 10){
			hr = " " + hr
			}
			if (min < 10){
			min = "0" + min
			}
			if (sec < 10){
			sec = "0" + sec
			}
			if (day <= 0){
			if (month == 0){
				month = 11
				year -= 1
				}
				else{
				month = month -1
				}
			day = monthDays[month]
			}
			if(day > monthDays[month]){
				day = 1
				if(month == 11){
				month = 0
				year -= -1
				}
				else{
				month -= -1
				}
			}
			if (region == "NAmerica"){
				var startDST = new Date()
				var endDST = new Date()
				startDST.setMonth(3)
				startDST.setHours(2)
				startDST.setDate(1)
				var dayDST = startDST.getDay()
				if (dayDST != 0){
					startDST.setDate(8-dayDST)
					}
					else{
					startDST.setDate(1)
					}
				endDST.setMonth(9)
				endDST.setHours(1)
				endDST.setDate(31)
				dayDST = endDST.getDay()
				endDST.setDate(31-dayDST)
				var currentTime = new Date()
				currentTime.setMonth(month)
				currentTime.setYear(year)
				currentTime.setDate(day)
				currentTime.setHours(hr)
				if(currentTime >= startDST && currentTime < endDST){
					dst = 1
					}
			}
			if (region == "Europe"){
				var startDST = new Date()
				var endDST = new Date()
				startDST.setMonth(2)
				startDST.setHours(1)
				startDST.setDate(31)
				var dayDST = startDST.getDay()
				startDST.setDate(31-dayDST)
				endDST.setMonth(9)
				endDST.setHours(0)
				endDST.setDate(31)
				dayDST = endDST.getDay()
				endDST.setDate(31-dayDST)
				var currentTime = new Date()
				currentTime.setMonth(month)
				currentTime.setYear(year)
				currentTime.setDate(day)
				currentTime.setHours(hr)
				if(currentTime >= startDST && currentTime < endDST){
					dst = 1
					}
			}
			
			if (region == "Australia"){
				var startDST = new Date()
				var endDST = new Date()
				startDST.setMonth(9)
				startDST.setHours(2)
				startDST.setDate(31)
				var dayDST = startDST.getDay()
				startDST.setDate(31-dayDST)
				endDST.setMonth(2)
				endDST.setHours(2)
				endDST.setDate(31)
				dayDST = endDST.getDay()
				endDST.setDate(31-dayDST)
				var currentTime = new Date()
				currentTime.setMonth(month)
				currentTime.setYear(year)
				currentTime.setDate(day)
				currentTime.setHours(hr)
				if(currentTime >= startDST || currentTime < endDST){
					dst = 1
					}
			}
				
			if (dst == 1){
				hr -= -1
				if (hr >= 24){
				hr = hr-24
				day -= -1
				}
				if (hr < 10){
				hr = " " + hr
				}
				if(day > monthDays[month]){
				day = 1
				if(month == 11){
				month = 0
				year -= -1
				}
				else{
				month -= -1
				}
				}
             
            var hrr = ((parseInt(hr) + 11) % 12) + 1;
            var ampm=parseInt(hr) > 11 ? 'PM' : 'AM'; 
                if(parseInt(hr)<1){
                   hrr=0; 
                }
			return monthArray[month] + " " + day + ", " + year + " " + hrr + ":" + min + ":" + sec +" "+ampm
			}
			else{

            var hr1 = ((parseInt(hr) + 11) % 12) + 1; 
            var ampm1=parseInt(hr) > 11 ? 'PM' : 'AM';
                if(parseInt(hr)<1){
                   hr1=0; 
                }
			return monthArray[month] + " " + day + ", " + year + " " + hr1 + ":" + min + ":" + sec+" "+ampm1
			}
	}
})