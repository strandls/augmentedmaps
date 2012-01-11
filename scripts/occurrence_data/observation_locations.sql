create view observation_locations as select obs.id, 'observation:'||obs.id as source, obs.species_name, ST_GeomFromText(obs.location) from dblink('dbname=biodiv', 'select distinct o.id, o.location, r.name from observation as o, recommendation as r, recommendation_vote as v where r.id = v.recommendation_id and v.observation_id = o.id') as obs(id bigint, location varchar(255), species_name varchar(255));
comment on observation_locations.species_name is 'Species name';
comment on observation_locations.source is 'Source';
