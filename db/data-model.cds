namespace my.bookshop;


using {
  cuid,
  managed,
  sap,
  Currency
} from '@sap/cds/common';


entity Files : cuid, managed {
  contents  : LargeBinary;
  mediaType : String;
  base64    : LargeString;
}

entity Rows : cuid {
  columns : array of String;
  rows    : array of String;
}

entity Books : managed {
  key ID       : Integer;
      title    : localized String(111)  @mandatory;
      descr    : localized String(1111);
      author   : Association to Authors @mandatory;
      genre    : Association to Genres;
      stock    : Integer;
      price    : Decimal;
      currency : Currency;
      image    : LargeBinary            @Core.MediaType: 'image/png';
}

entity Authors : managed {
  key ID           : Integer;
      name         : String(111) @mandatory;
      dateOfBirth  : Date;
      dateOfDeath  : Date;
      placeOfBirth : String;
      placeOfDeath : String;
      books        : Association to many Books
                       on books.author = $self;
}

entity Genres : sap.common.CodeList {
  key ID       : Integer;
      parent   : Association to Genres;
      children : Composition of many Genres
                   on children.parent = $self;
}

entity MultipleDatas : cuid {
  test : Integer
}