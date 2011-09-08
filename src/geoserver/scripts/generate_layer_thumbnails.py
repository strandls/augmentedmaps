import psycopg2
import os

def get_bounding_box(tablename):    

    layer_bbox_query = 'select min(xMin(__mlocate__topology)), max(xMax(__mlocate__topology)), min(yMin(__mlocate__topology)), max(yMax(__mlocate__topology)) from ' + tablename

    cur.execute(layer_bbox_query)

    bbox = cur.fetchone()

    bbox_str = ",".join([str(bbox[0]), str(bbox[2]), str(bbox[1]), str(bbox[3])])
    
    return bbox_str

def get_map_thumbnail(tablename, output_file):
    wms = "http://wgp.localhost/geoserver/wms"
    url = wms + "?service=WMS&version=1.1.0&request=GetMap&layers=ibp:" + tablename + "&styles=&bbox=" + get_bounding_box(tablename) + "&width=80&height=80&srs=EPSG:4326&format=image/gif&FORMAT_OPTIONS=antialias:none&transparent=true"
  
    cmd = "wget -O " + output_file + " '" + url + "'"
    os.system(cmd)
    os.system("mv " + output_file + "")

try:
    conn = psycopg2.connect("dbname='ibp' user='postgres' host='localhost' password='postgres123'")
except:
    print "unable to connect to the database"

cur = conn.cursor()
  
tables = ['lyr_222_wg_fire_2009'] 

os.system("mkdir map_thumbnails")
for tablename in tables:
    output_file = tablename + "_thumb.gif"

    get_map_thumbnail(tablename, output_file)

    os.system("mv " + output_file + " map_thumbnails/")

