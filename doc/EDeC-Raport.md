# EEDeC (Ethic Decisions for Consummers)

-----------------------

 1.Descriere Proiect
-------------------------------

E necesar un instrument Web pentru a oferi asistenta consumatorilor privind deciziile de achitie a unor bunuri/servicii intr-un mod etic. Sistemul va putea stoca si folosi reguli simple de forma "daca are loc <conditie> atunci <actiune>" -- in cazul nostru, de pilda "nu voi cumpara/folosi produsul P deoarece include/utilizeaza substanta S" ori "voi alege produsul P in loc de Q pe baza motivului M (e.g., mobilitate scazuta ori pret nejustificat de ridicat)" -- in vederea oferirii de sugestii referitoare la resurse de interes personal sau la nivel de grup. Aplicatia va oferi, de asemenea, statistici privind cele mai (in)dezirabile resurse, utilizatorii cu cele mai multe/putine restrictii, persoanele avand preferinte similare etc. Ca inspiratie, a se studia Buycott.

---------------------
2. Etapele dezvoltarii proiectului
-----------------------
  
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

------------------------------
## 2. Progresul inregistrat
  
  >**Front-end**
  
  >- Pagini create
  >-- HomePage-ul ;

In prima parte a indexului in tagul head am folosit meta taguri pentru a stabili encodingul la html metatag pentru a pune internet explorer in edge mod e folosit pentru compatibilitate pe mai multe browsere, sa rendeze websiteul conform anumitor standarde, si alt meta pentru a oferi functionalitate de responsive la website/aplicatie in asa fel incat pe orice device se va vedea conform regurilor scrie in css mai precis media-querys.De asemenea in head am linkuit toate librariile si fisierele de tip css externe pentru extra flexibilitate, + font-uri integrate din goolge fonts.La un momentdat in headul nostru avem un tag noscript care va executa o urmatoare instructiune de compatibiliatate daca aplicatia noastra e viziualizata in internet explorer 9 in continuare tot in cazul problemelor de compatibilitate si afunctiilor.., in bodyul din primul fisier index(home page) avem un navigation bar care va fi centrat fix cu un logo cu posibilitate de resize in functie de ecran si modularea meniului respectiv de point and click sau touch in cazul device-urilor de tip telefon/tableta etc. La fel avem si cu footerul pe baza width-ului ecranului acesta se va micsora si formata scrisul conform dispozitivului care e utilizat pentru a folosi/vizualiza aplicatia.In mijlocul documentului avem un container fluid si un container normal care acesta fa fi wrapperul pe intreg continutul paginii centrand elementera pentru a fi mai usor de vizualizat si focusat.

 >-- Pagina de logare;
 
Pagina de login consta intr-un wrapper mare in care e dat o clasa externa pentru formatarea lui gen background etc, nu contine un sistem de navigare ci doar un formular asezat in dreapta transparent cu informatii minimale ce date ar trebui introduse in panoul respectiv pentru a realza conectarea , la baza e o validare standard javascript care in caz ca utilizatorul introduce date incorecte sau uita sa introduca parola/username va instiintat cu anumite texte de tip warrning rosu in momentul cand va da submit.

>-- Pagina de inregistrare.

Pagina de register e inca la nivel de schema , nu s-a facut prea mult in acest sens, deoarece concentrarea a fost mai mare pe partea de design a functionalitatii din spate si nu din partea de design urmand ca colaboratorii proiectului sa inceapa sa schiteze foarte bine si partea de design si partea de de view de iteractionare cu clientul/utilizatorul aplicatiei pentru a o face cat mai intuitiva si usor de inteles tot odata cu un aspect placut.

>- Back-end

Pe partea de backend s-au inregistrat progrese doar in ceea ce priveste baza de date, aceasta fiind modelata, facandu-se scripturile de creeare tabele, populare cu ajutorul pachetelor si a blocurilor PL\SQL, creeandu-se trigere si indecsi si adaugandu-se fisiere csv cu inregistrari din tabele.


## 1. Tehnologii utilizate
  
### 1. jQuery

jQuery este o platforma de dezvoltare JavaScript, conceputa pentru a usura si imbunatati procese precum traversarea arborelui DOM in HTML, managementul inter-browser al evenimentelor, animatii si cereri tip AJAX. jQuery a fost gandit sa fie cat mai mic posibil, disponibil in toate versiunile de browsere importante existente, si sa respecte filosofia "Unobtrusive JavaScript".

jQuery se poate folosi pentru a rezolva urmatoarele probleme specifice programarii web:

1. 1.selectii de elemente in arborele DOM folosind propriul motor de selectii open source Sizzle, un proiect nascut din jQuery;
2. 2.parcurgere si modificarea arborelui DOM (incluzand suport pentru selectori CSS 3 si XPath simpli);
3. 3.inregistrarea si modificarea evenimentelor din browserÃÂ
4. 4.manipularea elementelor CSS;
5. 5.efecte si animatii;
6. 6.cereri tip AJAX;
7. 7.extensii ;
8. 8.utilitati - versiunea browser-ului, functia each.


###  2. Bootstrap

Bootstrap este o colectie gratis, open-source de tool-uri folosita pentru a crea website-uri si aplicatii web. Contine template-uri de design HTML si CSS pentru tipografie, formulare, butoane, navigatie si alte componente de interfata, precum si extensii optionale de JavaScript. Framework-ul Bootstrap isi pune ca scop usurarea dezvoltarii web.

Bootstrap se afla pe partea de front end, asta insemnand ca este o interfata intre utilizator si codul de pe partea de server sau back end. Este si un framework de aplicatie web, un software framework care este creat  sa suporte dezvoltarea website-urilor si aplicatiilor web.

Bootstrap ajuta la layout si design usor si totodata responsive pe orice platforma  folosindu-se de clase si functii predeclarate in fisiere externe cum ar fi booststrap.js bostrap.css.  Bootstrapul poate la randul lui sa fie formatat de fiserele css care prin cascading va da overwrite la anumite atribute si functii facand aplicatia web pe placul tau dar fara sa mai fie nevoie sa scri tot codul de la 0 cand te apuci de o noua aplicatie

---------
##Servicii
 
### 1. Github

GitHub este un serviciu de gazduire web pentru proiecte de dezvoltare a software-ului care utilizeaza sistemul de control al versiunilor Git. GitHub ofera planuri tarifare pentru depozite private, si conturi gratuite pentru proiecte open source.

[Github repository](https://github.com/hoenirvili/EDeC)

###2.Google spreadsheet

Pentru o organizare a taskuri-lor am creat un spreadsheet.

[SpreadSheet](https://docs.google.com/spreadsheets/d/1aSD-UlUJ1J87Xt5B11S6B8PxRxyz-A5sQaJck6xez-s/edit#gid=1616345261)

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