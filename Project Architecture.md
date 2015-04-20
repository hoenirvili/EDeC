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

----------------------------------
User flow
-----------------
Procesul incepe cu inregistrarea userului pe pagina de register.

```flow
st=>start: User
op=>operation: Inregistrare
op1=>operation: Login
cond=>condition: Logat cu succes?
op2=>operation: Setare profil
op3=>operation: Vizualizare produse pe baza setarilor
en=>operation: Delogare
st->op->op1->cond->op2->op3->en
cond(yes)->op2
cond(no)->op
```
Pagini
--------------
Url		    | Titlu
------------| ---
home        | Homepage
access      | Login & Register
myprofile   | User Profile
product?id  | Product page
products    | Product list / Search
stats       | Statistici
users       | Admin users list
user_add	| Admin add user
user_edit	| Admin edit user
a_products  | Admin products list
product_add | Admin add product
product_edit| Admin edit product
404			| Not found page


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