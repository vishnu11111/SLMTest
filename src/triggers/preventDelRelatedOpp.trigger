trigger preventDelRelatedOpp on Account (Before Delete) {

for(Account a : [select Id from Account where Id IN : Trigger.old AND Id IN (SELECT AccountId from Opportunity)]){
Trigger.oldMap.get(a.Id).addError('Can not delete as it has related opportunity');
}
}