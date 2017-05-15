public class extensionAccount {


public Account sampleAccount ;
Public string callBackId;
/*public extensionAccount(ApexPages.StandardController c){
Account sampleAccount=(Account)c.getRecord();
System.debug('Records : '+sampleAccount);

} */

public PageReference saveAndredirect(){
System.debug('Records : '+sampleAccount);
//Update sampleAccount;
//callBackId = sampleAccount.ID;
PageReference pr = new PageReference('/a0E2800000D8Tdm');

pr.setRedirect(true);

return pr;
}
}