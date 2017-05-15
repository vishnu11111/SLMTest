trigger AccountAddressTrigger on Account (Before Insert  , Before Update) {
for(Account a : Trigger.New){
if (a.Match_Billing_Address__c == true && a.BillingPostalCode <> null && a.BillingPostalCode <> ''){
a.ShippingPostalCode = a.BillingPostalCode ;
}
}

}