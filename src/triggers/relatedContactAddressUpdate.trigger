trigger relatedContactAddressUpdate on Account (Before Update) {
Map<Id,Account> accountRelatedContacts = new Map<Id,Account>([select id,(select id,MailingAddress from Contacts) from Account where Id in :Trigger.newMap.keyset()]);
List<Contact> toBeUpdatedContacts = new List<Contact>();
for(Account a : accountRelatedContacts .values()){
if(a.billingstreet <> null && a.billingcity <> null){
for(Contact c : a.contacts){
//c.OtherAddress = a.BillingAddress;
c.mailingstreet = a.billingstreet;
c.mailingcity = a.billingcity;
toBeUpdatedContacts.add(c);
}
}
}
Update toBeUpdatedContacts ;
}