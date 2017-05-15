trigger testUser on Opportunity (Before Insert , Before Update) {

List<Id> sourceUsers = new List<Id>();
for(Opportunity o : Trigger.New){
sourceUsers.add(o.CreatedById);
}

Map<Id,User> userToRole = new Map<Id,User>([select id,name,UserRole.name from User where Id In : sourceUsers]);


for(Opportunity o : Trigger.New){

o.Owner_role__c = userToRole.get(o.CreatedById).UserRole.name;


}

}