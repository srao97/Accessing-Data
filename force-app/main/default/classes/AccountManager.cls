public with sharing class AccountManager {
    @AuraEnabled(Cacheable=true)

    public static List<Account> getAccount(Integer numberOfRecords){
        return[select id,Name,Phone from Account Limit:numberOfRecords];
    }
}
