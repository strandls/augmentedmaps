import psycopg2
import os

# accuracy = "Accurate" or "Approximate"

def get_layer_occurance_records(layer_tablename, species_columnname):

    accuracy = "Accurate"

    q = 'select ' + species_columnname + ', ST_Centroid(__mlocate__topology), GeometryType(__mlocate__topology), (select layer_name from "Meta_Layer" where layer_tablename=\'' + layer_tablename + '\') from ' + layer_tablename
    cur.execute(q)

    resultset = cur.fetchall()
    for row in resultset:
        if row[0] and row[1]:
    	    source = "layer:" + str(row[3]) + ":" + layer_tablename
            print "///".join([row[0], row[1], row[2], accuracy, source])

def get_layer_occurance_records_from_lnktables(lnk_tablename, layer_tablename, linked_column, layer_column, species_columnname):
    accuracy = "Accurate"

    q = 'select ' + species_columnname + ', (select ST_Centroid(__mlocate__topology) from ' + layer_tablename + ' as lyr where lyr.' + layer_column + ' = lnk.'+ linked_column +'), (select GeometryType(__mlocate__topology) from ' + layer_tablename + ' as lyr where lyr.' + layer_column + ' = lnk.'+ linked_column +'), (select __mlocate__id from ' + layer_tablename + ' as lyr where lyr.' + layer_column + ' = lnk.'+ linked_column +'), (select layer_name from "Meta_Layer" where layer_tablename=\'' + layer_tablename + '\')  from ' + lnk_tablename + ' as lnk'
    
    cur.execute(q)

    resultset = cur.fetchall()
    for row in resultset:
        if row[0] and row[1]:
            source = "link_table:" + str(row[4]) + ":" + lnk_tablename + ":" + layer_tablename + ":" +  str(row[3])
            print "///".join([row[0], row[1], row[2], accuracy, source])
        
try:
    conn = psycopg2.connect("dbname='ibp' user='postgres' host='localhost' password='postgres123'")
except:
    print "unable to connect to the database"

cur = conn.cursor()

# format of input file: 
# link_tablename, layer_tablename, linked_column, layer_column, species_columnname
# e.g lnk_25_india_papoints_plants,lyr_85_india_papoints,paname,areaname,speciesname
def ingest_link_tables(filename):
    f = open(filename)

    for line in f:
        if line.startswith("#"):
            continue

        data = line.split(",")
        get_layer_occurance_records_from_lnktables(data[0], data[1], data[2], data[3], data[4])

    f.close()

    
# format of input file 
# layer_tablename, species_columnname
# e.g. lyr_2_wg_endemicsspsatlas,species    
def ingest_layer_tables(filename):
    f = open(filename)

    for line in f:
        if line.startswith("#"):
            continue

        data = line.split(",")
        get_layer_occurance_records(data[0], data[1])

    f.close()



ingest_link_tables("linktables_input.csv")
ingest_layer_tables("layer_input.csv")
