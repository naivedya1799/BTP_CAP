using my.bookshop as my from '../db/data-model';

service CatalogService {
    /** For displaying lists of Books */
    entity Rows          as projection on my.Rows;
    entity Products      as projection on my.Products;
    entity Suppliers     as projection on my.Suppliers;

    @readonly
    entity ListOfBooks   as
        projection on Books
        excluding {
            descr
        };

    /** For display in details pages */
    @readonly
    entity Books         as
        projection on my.Books {
            *,
            author.name as author
        }
        excluding {
            createdBy,
            modifiedBy
        };

    @requires: 'authenticated-user'
    action   submitOrder(book : Books:ID, quantity : Integer) returns {
        stock : Integer
    };

    event OrderedBook : {
        book     : Books:ID;
        quantity : Integer;
        buyer    : String
    };

    function getVCAPdata()                                    returns array of String;
}

service Attachments {
    entity Files         as projection on my.Files;
    entity MultipleDatas as projection on my.MultipleDatas

}
