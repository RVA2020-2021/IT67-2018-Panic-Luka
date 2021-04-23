--kredit

insert into "kredit"("id", "naziv" ,"oznaka", "opis")
values (nextval ('kredit_seq'), 'Stambeni kredit', 'SK', 'Kredit za stan');
insert into "kredit"("id", "naziv" ,"oznaka", "opis")
values (nextval ('kredit_seq'), 'Kes kredit', 'KK', 'Novcana pozajmica');
insert into "kredit"("id", "naziv" ,"oznaka", "opis")
values (nextval ('kredit_seq'), 'Kes kredit za penzionere', 'KKP', 'Novcana pozajmica za penzionere');
insert into "kredit"("id", "naziv" ,"oznaka", "opis")
values (nextval ('kredit_seq'), 'Kes kredit dobrodoslice', 'KKD', 'Novcana pozajmica');
insert into "kredit"("id", "naziv" ,"oznaka", "opis")
values (nextval ('kredit_seq'), 'Online kes kredit', 'OKK', 'Novcana pozajmica');

insert into "kredit"("id", "naziv", "oznaka", "opis")
values(-100, 'bilo koji kredit', 'Had', 'nameski hacak');
--tip_racuna

insert into "tip_racuna"("id", "naziv", "oznaka", "opis")
values (nextval ('tip_racuna_seq'), 'Tekuci racun', 'TR', 'Racun pojedinca');
insert into "tip_racuna"("id", "naziv", "oznaka", "opis")
values (nextval ('tip_racuna_seq'), 'Ziro racun', 'ZR', 'Ziro racun za studente');
insert into "tip_racuna"("id", "naziv", "oznaka", "opis")
values (nextval ('tip_racuna_seq'), 'Stedni racun', 'SR', 'Racun za stednju');
insert into "tip_racuna"("id", "naziv", "oznaka", "opis")
values (nextval ('tip_racuna_seq'), 'Devizni racun', 'DR', 'Racun za rad sa devizama');
insert into "tip_racuna"("id", "naziv", "oznaka", "opis")
values (nextval ('tip_racuna_seq'), 'Namenski racun', 'NR', 'Namenski racun za privredne subjekte');

insert into "tip_racuna"("id", "naziv", "oznaka", "opis")
values(-100, 'bilo koji racun', 'Had', 'nameski hacak');

--klijent 

insert into "klijent"("id", "ime" ,"prezime", "broj_lk", "kredit")
values (nextval ('klijent_seq'), 'Mirko', 'Mirkovic', '123456789', 1);
insert into "klijent"("id", "ime" ,"prezime", "broj_lk", "kredit")
values (nextval ('klijent_seq'), 'Marko', 'Markovic', '122456789', 2);
insert into "klijent"("id", "ime" ,"prezime", "broj_lk", "kredit")
values (nextval ('klijent_seq'), 'Ana', 'Jelic', '113456789', 3);
insert into "klijent"("id", "ime" ,"prezime", "broj_lk", "kredit")
values (nextval ('klijent_seq'), 'Sonja', 'Lazic', '123446789', 4);
insert into "klijent"("id", "ime" ,"prezime", "broj_lk", "kredit")
values (nextval ('klijent_seq'), 'Stefan', 'Simic', '123456689', 5);

insert into "klijent"("id", "ime", "prezime", "broj_lk", "kredit")
values(-100, 'Luka', 'Jankovic', '123456688', 4);

--racun

insert into "racun"("id", "naziv", "oznaka", "opis", "tip_racuna", "klijent")
values (nextval ('racun_seq'), 'Platni', 'P', 'Platni racun', 2, 3);
insert into "racun"("id", "naziv", "oznaka", "opis", "tip_racuna", "klijent")
values (nextval ('racun_seq'), 'Devizni', 'D', 'Devizni racun', 3, 4);
insert into "racun"("id", "naziv", "oznaka", "opis", "tip_racuna", "klijent")
values (nextval ('racun_seq'), 'Namenski', 'N', 'Namenski racun', 3, 2);
insert into "racun"("id", "naziv", "oznaka", "opis", "tip_racuna", "klijent")
values (nextval ('racun_seq'), 'Nenamenski', 'N', 'Nenamenski racun', 4, 4);
insert into "racun"("id", "naziv", "oznaka", "opis", "tip_racuna", "klijent")
values (nextval ('racun_seq'), 'Studentski', 'S', 'Studentski racun', 5, 3);

insert into "racun"("id", "naziv", "oznaka", "opis", "tip_racuna", "klijent")
values(-100, 'bilo koji racun', 'Had', 'nameski hacak',3, 3);



