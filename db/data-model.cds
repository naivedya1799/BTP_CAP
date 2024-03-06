namespace my.bookshop;

using {
  cuid,
  managed
} from '@sap/cds/common';

entity Books {
  key ID    : Integer;
      title : String;
      stock : Integer;
}

entity Files : cuid, managed {
  contents  : LargeBinary;
  mediaType : String;
  base64    : LargeString;
}
