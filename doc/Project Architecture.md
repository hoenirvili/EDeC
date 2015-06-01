Edec
===================
Etical decisions for consumers.

----------


Descrierea proiectului
-------------

Edec isi propune sa ofere userilor o metoda simpla de a gasi produse care indeplinesc toate conditiile necesare

> **Cum functioneaza:**

> - Edec dispune de o baza de date in care produsele contin informatii legate de substantele folosite, locul de provenienta, si ideologiile companiilor producatoare.
> - Userii isi fac cont, si pot sa seteze ce substante trebuie sa aiba un produs, in ce localitati trebuie sa fi fost produs , sau ce ideologii trebuie sa aiba compania care le produce. Pot sa seteze si ce nu trebuie sa aiba produsul sau orasele din care nu trebuie sa provina produsele . 
> - Dupa ce au fost setate preferintele userul va vizualiza doar produsele care corespund. 

-----------------------------------------------------
Entitati Componente
-------------------

In principiul Edec este compus din produse, si caracteristicile care le definesc, dar si din preferintele userilor, care sunt folosite pentru a crea statistici referitoare la trendurile anumitor caracteristici.


> **Useri:**

>- admin
>- user standard
>-- avatar
>-- nume
>-- email
>-- caracteristici

>**Produse:**

>- produs
>--nume produs
>--imagine
>--caracteristici
>- statistici caracterisi
>-- cele mai dezirabile
>-- cele mai indezirabile

Pagini
--------------
Url		    | Titlu
------------| ---
http://edec.ddns.net/                | Homepage
http://edec.ddns.net/access          | Login & Register
http://edec.ddns.net/dashboard       | User Profile
http://edec.ddns.net/product/?id=352 | Product page
http://edec.ddns.net/search          | Product list / Search
http://edec.ddns.net/stats     | Statistici
http://edec.ddns.net/controlpannel/users     | Admin users list
http://edec.ddns.net/controlpannel/add_user	| Admin add user
http://edec.ddns.net/controlpannel/edit_user?user_id=3	| Admin edit user
http://edec.ddns.net/controlpannel/products  | Admin products list
http://edec.ddns.net/controlpannel/add_product | Admin add product
http://edec.ddns.net/controlpannel/edit_product?product_id=2 | Admin edit product
http://edec.ddns.net/controlpannel/characteristics | Admin characteristics list
http://edec.ddns.net/controlpannel/add_characteristic | Admin add characteristic 
http://edec.ddns.net/controlpannel/edit_characteristic?characteristic_id=4 | Admin edit characteristic 
http://edec.ddns.net/error/index		| Not found page


-------
Etape implementare
------------------------

1. Schite/Design/Arhitectura
2. Modelare baza de date
3. Creare pagini frontend
4. Design backend
5. Design clase php
6. Design proceduri oracle
7. Design & implementare arhitectura MVC, links rewrite
8. Implementare proceduri oracle
9. Implementare clase php
10. Implementarea view-urilor pe baza html&css&javascript
11. Adaugare functionalitati ajax (optional)
12. Testing
13. Deployment

----------------------
Cuprins
-----------------------

[TOC]


##Componenta echipa

> **Componenti echipei in ordine alfabetica:**
> 
>- Calara Ionut Lucian
>- Dorneanu Anca
>- Salvatore Giulliti
>- Tutuianu Corneliu