public class accountExtension{
public list<Account> accountList{
get;
set;
}
private ApexPages.StandardController con;
public Account a;
public accountExtension (ApexPages.StandardController c){
accountList = [select name from Account];
//this.con = c;
//a = (Account)c.getRecord();

}
public PageReference redirect(){
con.save();
PageReference pr = new PageReference('/apex/testDevelopement');
pr.setRedirect(true);
return pr;
}
}