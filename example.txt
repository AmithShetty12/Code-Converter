IDENTIFICATION DIVISION.
PROGRAM-ID. SUPPLY-CHAIN-SYSTEM.

DATA DIVISION.
WORKING-STORAGE SECTION.
01 PRODUCT-RECORD.
   05 PRODUCT-ID         PIC X(10).
   05 PRODUCT-NAME       PIC X(30).
   05 PRODUCT-QUANTITY   PIC 9(8).
   05 PRODUCT-PRICE      PIC 9(6)V99.

01 WAREHOUSE-RECORD.
   05 WAREHOUSE-ID       PIC X(10).
   05 WAREHOUSE-NAME     PIC X(30).
   05 WAREHOUSE-LOCATION PIC X(50).

01 ORDER-RECORD.
   05 ORDER-ID           PIC X(10).
   05 PRODUCT-ID         PIC X(10).
   05 ORDER-QUANTITY     PIC 9(8).
   05 ORDER-DATE         PIC 9(8).

01 PRODUCT-TABLE.
   05 PRODUCT-ENTRY OCCURS 100 TIMES.
      10 PRODUCT-ID         PIC X(10).
      10 PRODUCT-NAME       PIC X(30).
      10 PRODUCT-QUANTITY   PIC 9(8).
      10 PRODUCT-PRICE      PIC 9(6)V99.

01 WAREHOUSE-TABLE.
   05 WAREHOUSE-ENTRY OCCURS 10 TIMES.
      10 WAREHOUSE-ID       PIC X(10).
      10 WAREHOUSE-NAME     PIC X(30).
      10 WAREHOUSE-LOCATION PIC X(50).

01 ORDER-TABLE.
   05 ORDER-ENTRY OCCURS 1000 TIMES.
      10 ORDER-ID           PIC X(10).
      10 PRODUCT-ID         PIC X(10).
      10 ORDER-QUANTITY     PIC 9(8).
      10 ORDER-DATE         PIC 9(8).

01 TRANSFORMATION-FACTOR PIC 9(2)V99 VALUE 1.10.

01 TOTAL-ORDER-AMOUNT PIC 9(10)V99 VALUE 0.

01 COUNT-ORDERS PIC 9(5) VALUE 0.

01 WS-DATE-STRING    PIC X(10).
01 WS-DATE           PIC 9(8).
01 WS-TIME           PIC 9(6).
01 WS-DAY            PIC 99.
01 WS-MONTH          PIC 99.
01 WS-YEAR           PIC 9999.
01 WS-HOUR           PIC 99.
01 WS-MINUTE         PIC 99.
01 WS-SECOND         PIC 99.

01 WS-ERROR-CODE     PIC 99 VALUE 0.
01 WS-ERROR-MESSAGE  PIC X(100).

01 WS-EXIT-CODE      PIC 99 VALUE 0.

01 WS-FILE-STATUS    PIC X(2).

01 WS-EOF            PIC X VALUE 'N'.

01 WS-INVALID-QUANTITY PIC X VALUE 'N'.
01 WS-INVALID-DATE   PIC X VALUE 'N'.

01 WS-ORDER-DATE     PIC 9(8).
01 WS-ORDER-AMOUNT   PIC 9(10)V99.

01 WS-WAREHOUSE-INDEX PIC 9(5) VALUE 0.
01 WS-PRODUCT-INDEX   PIC 9(5) VALUE 0.
01 WS-ORDER-INDEX     PIC 9(5) VALUE 0.

01 WS-REPORT-LINE PIC X(100).

01 WS-CURRENT-DATE.
   05 WS-CURRENT-YEAR  PIC 9999.
   05 WS-CURRENT-MONTH PIC 99.
   05 WS-CURRENT-DAY   PIC 99.

01 WS-START-DATE.
   05 WS-START-YEAR  PIC 9999.
   05 WS-START-MONTH PIC 99.
   05 WS-START-DAY   PIC 99 VALUE 01.

01 WS-END-DATE.
   05 WS-END-YEAR  PIC 9999.
   05 WS-END-MONTH PIC 99.
   05 WS-END-DAY   PIC 99.

01 WS-REPORT-DATE PIC X(10).
01 WS-REPORT-TIME PIC X(8).

01 WS-REPORT-FILE-NAME PIC X(50).

01 WS-ORDER-TOTAL PIC 9(10)V99 VALUE 0.

01 WS-QUANTITY-STRING PIC X(8).

01 WS-ORDER-QUANTITY  PIC 9(8).
01 WS-QUANTITY-DISPLAY PIC X(8).

01 WS-TEMP-PRODUCT-ID  PIC X(10).
01 WS-TEMP-WAREHOUSE-ID PIC X(10).

01 WS-WAREHOUSE-FOUND PIC X VALUE 'N'.
01 WS-PRODUCT-FOUND   PIC X VALUE 'N'.

01 WS-INVALID-AMOUNT  PIC X VALUE 'N'.

01 WS-WAREHOUSE-INDEX2 PIC 9(5) VALUE 0.

01 WS-PRODUCT-INDEX2   PIC 9(5) VALUE 0.

01 WS-ORDER-INDEX2     PIC 9(5) VALUE 0.

01 WS-PRODUCT-QUANTITY  PIC 9(8).

01 WS-PRODUCT-PRICE     PIC 9(6)V99.

01 WS-ACC-QUANTITY      PIC 9(8) VALUE 0.

01 WS-ACC-PRICE         PIC 9(6)V99 VALUE 0.

01 WS-ACC-TOTAL         PIC 9(10)V99 VALUE 0.

01 WS-WAREHOUSE-INDEX3 PIC 9(5) VALUE 0.

01 WS-PRODUCT-INDEX3   PIC 9(5) VALUE 0.

01 WS-ORDER-INDEX3     PIC 9(5) VALUE 0.

01 WS-ORDER-AMOUNT3    PIC 9(10)V99 VALUE 0.

01 WS-ORDER-QUANTITY3  PIC 9(8).

01 WS-START-DT-STRING  PIC X(10).

01 WS-END-DT-STRING    PIC X(10).

01 WS-REPORT-LINE-COUNT PIC 9(5) VALUE 0.

01 WS-SPACE             PIC X VALUE SPACE.

01 WS-SPACE-2           PIC X(2) VALUE '  '.

01 WS-SPACE-4           PIC X(4) VALUE '    '.

01 WS-SPACE-6           PIC X(6) VALUE '      '.

01 WS-SPACE-8           PIC X(8) VALUE '        '.

01 WS-SPACE-10          PIC X(10) VALUE '          '.

01 WS-SPACE-12          PIC X(12) VALUE '            '.

01 WS-SPACE-14          PIC X(14) VALUE '              '.

01 WS-SPACE-16          PIC X(16) VALUE '                '.

01 WS-SPACE-18          PIC X(18) VALUE '                  '.

01 WS-SPACE-20          PIC X(20) VALUE '                    '.

01 WS-SPACE-30          PIC X(30) VALUE '                              '.

01 WS-SPACE-40          PIC X(40) VALUE '                                        '.

01 WS-SPACE-50          PIC X(50) VALUE '                                                  '.

01 WS-SPACE-100         PIC X(100) VALUE '                                                                                                    '.

01 WS-SPACE-200         PIC X(200) VALUE '                                                                                                                                    '.

01 WS-SPACE-300         PIC X(300) VALUE '                                                                                                                                              '.

01 WS-SPACE-400         PIC X(400) VALUE '                                                                                                                                                        '.

01 WS-SPACE-500         PIC X(500) VALUE '                                                                                                                                                                  '.

01 WS-SPACE-600         PIC X(600) VALUE '                                                                                                                                                                            '.

01 WS-SPACE-700         PIC X(700) VALUE '                                                                                                                                                                                      '.

01 WS-SPACE-800         PIC X(800) VALUE '                                                                                                                                                                                                '.

01 WS-SPACE-900         PIC X(900) VALUE '                                                                                                                                                                                                          '.

01 WS-SPACE-1000        PIC X(1000) VALUE '                                                                                                                                                                                                                        '.

01 WS-SPACE-2000        PIC X(2000) VALUE '                                                                                                                                                                                                                                                '.

01 WS-SPACE-3000        PIC X(3000) VALUE '                                                                                                                                                                                                                                                                              '.

01 WS-SPACE-4000        PIC X(4000) VALUE '                                                                                                                                                                                                                                                                                        '.

01 WS-SPACE-5000        PIC X(5000) VALUE '                                                                                                                                                                                                                                                                                                  '.

01 WS-SPACE-6000        PIC X(6000) VALUE '                                                                                                                                                                                                                                                                                                            '.

01 WS-SPACE-7000        PIC X(7000) VALUE '                                                                                                                                                                                                                                                                                                                      '.

01 WS-SPACE-8000        PIC X(8000) VALUE '                                                                                                                                                                                                                                                                                                                                '.

01 WS-SPACE-9000        PIC X(9000) VALUE '                                                                                                                                                                                                                                                                                                                                          '.

01 WS-SPACE-10000       PIC X(10000) VALUE '                                                                                                                                                                                                                                                                                                                                                        '.

01 WS-SPACE-15000       PIC X(15000) VALUE '                                                                                                                                                                                                                                                                                                                                                                  '.

01 WS-SPACE-20000       PIC X(20000) VALUE '                                                                                                                                                                                                                                                                                                                                                                            '.

01 WS-SPACE-25000       PIC X(25000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                      '.

01 WS-SPACE-30000       PIC X(30000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                '.

01 WS-SPACE-40000       PIC X(40000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                              '.

01 WS-SPACE-50000       PIC X(50000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                        '.

01 WS-SPACE-60000       PIC X(60000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                  '.

01 WS-SPACE-70000       PIC X(70000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                            '.

01 WS-SPACE-80000       PIC X(80000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                      '.

01 WS-SPACE-90000       PIC X(90000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                '.

01 WS-SPACE-100000      PIC X(100000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                          '.

01 WS-SPACE-150000      PIC X(150000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      '.

01 WS-SPACE-200000      PIC X(200000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                '.

01 WS-SPACE-250000      PIC X(250000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          '.

01 WS-SPACE-300000      PIC X(300000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        '.

01 WS-SPACE-400000      PIC X(400000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  '.

01 WS-SPACE-500000      PIC X(500000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            '.

01 WS-SPACE-600000      PIC X(600000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      '.

01 WS-SPACE-700000      PIC X(700000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                '.

01 WS-SPACE-800000      PIC X(800000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          '.

01 WS-SPACE-900000      PIC X(900000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    '.

01 WS-SPACE-1000000     PIC X(1000000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              '.

01 WS-SPACE-1500000     PIC X(1500000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          '.

01 WS-SPACE-2000000     PIC X(2000000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        '.

01 WS-SPACE-2500000     PIC X(2500000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  '.

01 WS-SPACE-3000000     PIC X(3000000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            '.

01 WS-SPACE-4000000     PIC X(4000000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      '.

01 WS-SPACE-5000000     PIC X(5000000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                '.

01 WS-SPACE-6000000     PIC X(6000000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          '.

01 WS-SPACE-7000000     PIC X(7000000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    '.

01 WS-SPACE-8000000     PIC X(8000000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              '.

01 WS-SPACE-9000000     PIC X(9000000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        '.

01 WS-SPACE-10000000    PIC X(10000000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  '.

01 WS-SPACE-15000000    PIC X(15000000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            '.

01 WS-SPACE-20000000    PIC X(20000000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      '.

01 WS-SPACE-25000000    PIC X(25000000) VALUE '                                                                                                                                                                                                                                                                                                                                                                                                
