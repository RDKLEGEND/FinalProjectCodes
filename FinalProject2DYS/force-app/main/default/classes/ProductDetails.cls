public with sharing class ProductDetails {
    @AuraEnabled(cacheable=true)
    public static List<Product1__c> methodName(){
        List<Product1__c> pro=[SELECT Name,price__c,Description__c,prod_id__c,StockAvailable__c FROM Product1__c];
        return pro;
    }
    @AuraEnabled(cacheable=false)
    public static Product1__c increaseQuantity(Integer pId, Integer quant){
        Product1__c ipro = [SELECT Quantity__c FROM Product1__c WHERE prod_id__c =:pId];
        ipro.Quantity__c=ipro.Quantity__c+1;
        update ipro;
        return ipro;
    }
    @AuraEnabled(cacheable=false)
    public static Product1__c decreaseQuantity(Integer pId, Integer quant){
        Product1__c ipro=[SELECT Quantity__c FROM Product1__c WHERE prod_id__c =:pId];
        ipro.Quantity__c=ipro.Quantity__c-1;
        update ipro;
        return ipro;
    }

    // @AuraEnabled(cacheable=true)
    // public static List <Product1__c> proList =new List<Product1__c>();
    // public static void quantityTriggerHelper(List<Product1__c> pro)
    // {
    //     for(Product1__c pr: pro)
    //     {
    //         if(pr.Quantity__c>0)
    //         {
    //             proList.add(pr);
    //         }
    //     }
    // }

    @AuraEnabled(cacheable=true)
    public static Product1__c fetchQuantity(Integer pId){
        Product1__c quant=[SELECT Quantity__c FROM Product1__c WHERE prod_id__c =:pId];
        return quant;
    }
 
    @AuraEnabled(cacheable=true)
    public static Decimal allQuantity(){
        List <Product1__c> allquant=[SELECT Quantity__c FROM Product1__c];
        Decimal quantity = 0;
        for(Product1__c pp : allquant){
            quantity = quantity + pp.Quantity__c;
        }
        return quantity;
    }


    @AuraEnabled(cacheable=true)
    public static List<Product1__c> cartItemsAvailable(){ //Integer count
        //if(count==1)
        List<Product1__c> pro=[SELECT Name,price__c,Quantity__c,Description__c FROM Product1__c WHERE Quantity__c>0];
        return pro;
        //else {
        //    return Null;
        //}
    }

    @AuraEnabled(cacheable=true)
    public static Decimal totalAmount(){
        Decimal total=0;
        List<Product1__c> pro=[SELECT price__c,Quantity__c FROM Product1__c WHERE Quantity__c>0];
        for(Product1__c p: pro)
        {
            total=total+(p.price__c*p.Quantity__c);
        }
        return total;
    }

    @AuraEnabled(cacheable=false)
    public static List<Product1__c> setasdefault(){
        List<Product1__c> pro=[SELECT Quantity__c FROM Product1__c WHERE Quantity__c>0];
        List<Product1__c> pro1=new List<Product1__c>();
        for(Product1__c p:pro)
        {
            p.Quantity__c=0;
            pro1.add(p);
        }
        update pro1;
        return pro1;
    }
    @AuraEnabled(cacheable=false)
    public static List<Product1__c> reduceStock(){
        List<Product1__c> pro=[SELECT Quantity__c,StockAvailable__c FROM Product1__c WHERE Quantity__c>0];
        List<Product1__c> pro1=new List<Product1__c>();
        for(Product1__c p:pro)
        {
            p.StockAvailable__c=p.StockAvailable__c-p.Quantity__c;
            pro1.add(p);
        }
        update pro1;
        return pro1;
    }
    
}