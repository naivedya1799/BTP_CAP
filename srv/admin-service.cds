using {my.bookshop as my} from '../db/data-model';

service AdminService @(
    requires: 'admin',
    path    : '/admin'
) {
    entity Books   as projection on my.Books;
    entity Authors as projection on my.Authors;
}
