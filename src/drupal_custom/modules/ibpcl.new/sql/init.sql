create table ibpcl_biogeographic_regions(
  id int not null auto_increment,
  name varchar(255),
  description text,
  primary key (id)
);

create table ibpcl_states(
  id int not null auto_increment primary key,
  name varchar(255),
  description text
);

create table ibpcl_districts(
  id int not null auto_increment primary key,
  state int,
  name varchar(255),
  description text
);

create table ibpcl_taluks(
  id int not null auto_increment primary key,
  district int,
  name varchar(255),
  description text
);

create table ibpcl_taxa (
  id int not null auto_increment primary key,
  name varchar(255),
  common_name varchar(255)
);

create table ibp_checklist (
  id int not null auto_increment primary key,
  title varchar(255),
  attribution text,
  info text,
  contributed_by int,
  geography_given_name varchar(255),
  biogeographic_region int,
  from_date date,
  to_date date,
  validated varchar(3),
  validated_by int
);

create table ibp_species (
  id int not null auto_increment primary key,
  ibp_id int,
  ibp_table varchar(255)
);

create table checklist_species (
  checklist_id int,
  species_id int,
  name_in_checklist varchar(255)
);

create table checklist_taxa (
  checklist_id int,
  taxa_id int
);

create table ibp_optional_columns (
  id int not null auto_increment primary key,
  checklist_id int,
  column_name varchar(255)
);

create table ibp_optional_values (
  id int not null auto_increment primary key,
  checklist_id int,
  column_id int,
  option_value varchar(255)
);

create table ibp_checklist_states (
  checklist_id int,
  state_id int
);

create table ibp_checklist_districts (
  checklist_id int,
  district_id int
);

create table ibp_checklist_taluks (
  checklist_id int,
  taluk_id int
);

-- Initial Inserts
-- Biogeographic Regions
insert into ibpcl_biogeographic_regions(id, name) values(1, 'Scrub');
insert into ibpcl_biogeographic_regions(id, name) values(2, 'Deciduous Forest');
insert into ibpcl_biogeographic_regions(id, name) values(3, 'Desert');
insert into ibpcl_biogeographic_regions(id, name) values(4, 'Semi Arid');

-- States
insert into ibpcl_states(id, name) values(1, 'Karnataka');
insert into ibpcl_states(id, name) values(2, 'Andhra Pradesh');
insert into ibpcl_states(id, name) values(3, 'Tamil Nadu');
insert into ibpcl_states(id, name) values(4, 'Kerala');

-- Districts
insert into ibpcl_districts(state, name) values(1, 'Bangalore');
insert into ibpcl_districts(state, name) values(1, 'Hassan');
insert into ibpcl_districts(state, name) values(1, 'Mysore');
insert into ibpcl_districts(state, name) values(1, 'Chitradurga');
insert into ibpcl_districts(state, name) values(2, 'Anantpur');
insert into ibpcl_districts(state, name) values(2, 'Chittoor');
insert into ibpcl_districts(state, name) values(2, 'Hyderabad');
insert into ibpcl_districts(state, name) values(3, 'Chennai');
insert into ibpcl_districts(state, name) values(3, 'Nilgiris');
insert into ibpcl_districts(state, name) values(3, 'Coimbatore');
insert into ibpcl_districts(state, name) values(4, 'Kannur');
insert into ibpcl_districts(state, name) values(4, 'Kollam');
insert into ibpcl_districts(state, name) values(4, 'Kochi');

-- Taxa
insert into ibpcl_taxa(id, name, common_name) values(1, 'Aves', 'Birds');
insert into ibpcl_taxa(id, name, common_name) values(2, 'Lepidoptera', 'Butterflies');

