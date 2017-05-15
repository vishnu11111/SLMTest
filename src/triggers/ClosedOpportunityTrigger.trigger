trigger ClosedOpportunityTrigger on Opportunity (After Insert,After Update) {
List<Opportunity> opp = Trigger.New;
List<Task> taskList = new List<Task>();

for(Opportunity o : opp){
if(o.StageName == 'Closed Won'){
Task t = new Task(WhatId = o.Id,Subject = 'Follow Up Test Task');
taskList.add(t);
}
}
Insert taskList;
}