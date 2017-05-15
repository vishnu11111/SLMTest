trigger newOpportunityCreator on Account (after insert,after update) {
    Map<Id,Account> acc = new Map<Id,Account>([SELECT Id,(SELECT Id from Opportunities) from Account where Id In : Trigger.New]);
    for(Account a : Trigger.New){
    if(acc.get(a.Id).Opportunities.size() == 0){
    Opportunity opp = new Opportunity(name = 'sample opportunity', StageName= 'Prospecting',CloseDate = Date.Today(),AccountId=a.Id);
    insert opp;
    }
    }

}