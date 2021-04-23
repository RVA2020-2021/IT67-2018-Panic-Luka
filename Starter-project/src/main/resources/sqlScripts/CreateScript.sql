drop table if exists tip_racuna cascade;
drop table if exists racun cascade;
drop table if exists klijent cascade;
drop table if exists kredit cascade;

drop sequence if exists tip_racuna_seq;
drop sequence if exists racun_seq;
drop sequence if exists klijent_seq;
drop sequence if exists kredit_seq;



create table kredit (
	id integer not null,
	naziv varchar(100),
	oznaka varchar(20),
	opis varchar(500)
);

create table tip_racuna(
	id integer not null,
	naziv varchar(100),
	oznaka varchar(20),
	opis varchar(500)
);

create table klijent (
	id integer not null,
	ime varchar(50),
	prezime varchar(50),
	broj_lk integer not null,
	kredit integer not null
);

create table racun (
	id integer not null,
	naziv varchar(100),
	oznaka varchar(20),
	opis varchar(500),
	tip_racuna integer not null,
	klijent integer not null
);

alter table kredit add constraint pk_kredit primary key(id);
alter table tip_racuna add constraint pk_tip_racuna primary key(id);
alter table klijent add constraint pk_klijent primary key(id);
alter table racun add constraint pk_racun primary key(id);

alter table klijent add constraint fk_klijent_kredit foreign key(kredit) references kredit(id) on delete cascade;
alter table racun add constraint fk_racun_tip_racuna foreign key(tip_racuna) references tip_racuna(id) on delete cascade;
alter table racun add constraint fk_racun_klijent foreign key(klijent) references klijent(id) on delete cascade;

create index idxpk_kredit on kredit(id);
create index idxpk_tip_racuna on tip_racuna(id);
create index idxpk_klijent on klijent(id);
create index idxpk_racun on racun(id);

create index idxfk_klijent_kredit on klijent(kredit);
create index idxfk_racun_tip_racuna on racun(tip_racuna);
create index idxfk_racun_klijent on racun(klijent);


create sequence tip_racuna_seq
increment 1;

create sequence racun_seq
increment 1;

create sequence klijent_seq
increment 1;

create sequence kredit_seq
increment 1;




