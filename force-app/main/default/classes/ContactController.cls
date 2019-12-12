public without sharing class ContactController {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getRelatedContacts(Id accountId){
        return [select Id,Name, Phone, Email from Contact where AccountId=:accountId];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getRelatedContactsByFilter(Id accountId,String key){
        String query='select Id,Name, Phone, Email from Contact where AccountId=:accountId and Name like \'%'+key+'%\'';
        return Database.query(query);
    }
}