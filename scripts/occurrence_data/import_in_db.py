import psycopg2
import os

try:
    conn = psycopg2.connect("dbname='ibp' user='postgres' host='localhost' password='postgres123'")
except:
    print "unable to connect to the database"

cur = conn.cursor()

def import_occurrence(filename):
    f = open(filename)
    cnt = 1
    for line in f:

        print "inserting ", cnt 
        line = line.replace("'","")
        d = [item.strip() for item in line.split("///")]
       
        values = "'" + d[0] + "','" + d[1] + "','" + d[2] + "','" + d[3] + "','" + d[4] + "'" 
        insert_query = 'INSERT INTO occurrence (species_name, geom, geom_type, accuracy, source) values (' + values + ')'
        cur.execute(insert_query)        
        cnt = cnt + 1


import_occurrence('all_points.txt')        
conn.commit() 
