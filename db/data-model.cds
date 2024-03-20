namespace my.bookshop;


using {
  cuid,
  managed,
  sap,
  Currency
} from '@sap/cds/common';
using {NorthWind as external} from '../srv/external/NorthWind';
using {API_BUSINESS_PARTNER as bupa} from '../srv/external/API_BUSINESS_PARTNER';

entity Suppliers as
  projection on bupa.A_BusinessPartner {
    key BusinessPartner          as ID,
        BusinessPartnerFullName  as fullName,
        BusinessPartnerIsBlocked as isBlocked,
  }

entity Products  as
  projection on external.Products {
    key ID,
        Name,
        Description,
        ReleaseDate,
        DiscontinuedDate,
        Rating,
        Price
  };

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
