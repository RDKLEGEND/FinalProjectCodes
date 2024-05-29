public with sharing class OrderCreation {
    @AuraEnabled(cacheable=false)
    public static order1__c methodName(String oname,Integer quants,Decimal amnt,String adrs,String phn,String mail,String pay){
        order1__c ord=new order1__c();
        List<Product1__c> proList=[SELECT Name,Quantity__c FROM Product1__c WHERE Quantity__c>0];
        String plist='';
        for(Product1__c pro:proList){
            plist+=pro.Name+' x '+pro.Quantity__c+'\n';
        }
        ord.Name=oname;
        ord.Quantity__c=quants;
        ord.Total_amount__c=amnt;
        ord.Address__c=adrs;
        ord.Phone_no__c=phn;
        ord.Email__c=mail;
        ord.Productlist__c=plist;
        ord.OrderDate__c=Datetime.now();
        ord.Payment_Status__c=pay;
        upsert ord;
        return ord;
    }
}