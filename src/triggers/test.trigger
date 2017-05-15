trigger test on Account (Before Update) {
List<Account> accountList = [Select Id , (select name,Id from Opportunities) from Account where Id IN : Trigger.New ];
for(Account a : accountList ){
System.debug('>>>>>'+ a.Opportunities[0].name);
}
}