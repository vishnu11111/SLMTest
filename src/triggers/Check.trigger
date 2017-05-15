trigger Check on Account (before insert) {
for(Account a:Trigger.New){
If(a.phone == null){
a.addError('Phone kya papa likhege');
}
}
}