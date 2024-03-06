using my.bookshop as my from '../db/data-model';

service CatalogService {
    @readonly
    entity Books as projection on my.Books;
}

service Attachments {
    entity Files as projection on my.Files
}
