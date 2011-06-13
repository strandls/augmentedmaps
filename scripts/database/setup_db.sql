-- Script to setup the augmented maps database 

\c template1;
CREATE DATABASE template_postgis WITH template = template1;

UPDATE pg_database SET datistemplate = TRUE WHERE dataname = 'template_postgis';
\c template_postgis;

CREATE LANGUAGE plpgsql;
-- \i /usr/share/postgresql/8.4/contrib/postgis-1.5/postgis.sql
\i :POSTGIS_SQL
-- \i /usr/share/postgresql/8.4/contrib/postgis-1.5/spatial_ref_sys.sql
\i :SPATIAL_REF_SYS_SQL

GRANT ALL ON geometry_columns TO PUBLIC;
GRANT ALL ON spatial_ref_sys TO PUBLIC;

VACUUM FREEZE;

CREATE DATABASE augmentedmaps WITH template = template_postgis ENCODING = 'UTF8';

\c augmentedmaps
--\i /home/rahul/r/augmentedmaps/scripts/database/augmentedmaps_with_layers.sql
\i :AUGMENTEDMAPS_WITH_LAYERS_SQL
\q
