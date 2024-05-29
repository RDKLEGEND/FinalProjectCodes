public with sharing class CartDataClass {
    @AuraEnabled(cacheable=false)
    public static Integer methodName(Integer a){
        Integer cartitem=a;
        return cartitem;
    }
}