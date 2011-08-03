import psycopg2
import os

featuretype_xml_tpl = """<featureType>
  <id>FeatureTypeInfoImpl-%s-ibp</id>
  <name>%s</name>
  <nativeName>%s</nativeName>
  <namespace>
    <id>NamespaceInfoImpl-ibp</id>
  </namespace>
  <title>%s</title>
  <abstract>%s</abstract>
  <keywords>
  %s
  </keywords>
  <srs>EPSG:4326</srs>
  <nativeBoundingBox>
  %s
  </nativeBoundingBox>
  <latLonBoundingBox>
    %s
    <crs>EPSG:4326</crs>
  </latLonBoundingBox>
  <projectionPolicy>FORCE_DECLARED</projectionPolicy>
  <enabled>true</enabled>
  <metadata>
    <entry key="cachingEnabled">false</entry>
  </metadata>
  <store class="dataStore">
    <id>DataStoreInfoImpl-ibp</id>
  </store>
  <maxFeatures>0</maxFeatures>
  <numDecimals>0</numDecimals>
</featureType>
"""

layer_xml_tpl="""<layer>
  <name>%s</name>
  <id>LayerInfoImpl-%s</id>
  <type>VECTOR</type>
  <defaultStyle>
    <id>%s</id>
  </defaultStyle>
  <styles class="linked-hash-set">
  %s
  </styles>
  <resource class="featureType">
    <id>FeatureTypeInfoImpl-%s-ibp</id>
  </resource>
  <enabled>true</enabled>
  <attribution>
    <logoWidth>0</logoWidth>
    <logoHeight>0</logoHeight>
  </attribution>
</layer>
"""

def get_keywords_xml(tablename):
    
    keywords_xml = ''

    layer_keywords_query = 'select tags from "Meta_Layer" where layer_tablename=\'' + tablename + '\''
    cur.execute(layer_keywords_query)
  
    layer_keywords_results = cur.fetchone()[0]
    if layer_keywords_results:
        layer_keywords = layer_keywords_results.split(",")
    else:
        layer_keywords = ["Miscellaneous"]

    for keyword in layer_keywords:
        keywords_xml = keywords_xml + '<string>' + keyword.strip() + '</string>'
    
    return keywords_xml

def get_bounding_box(tablename):    

    bbox_xml = ''

    layer_bbox_query = 'select min(xMin(__mlocate__topology)), max(xMax(__mlocate__topology)), min(yMin(__mlocate__topology)), max(yMax(__mlocate__topology)) from ' + tablename

    print layer_bbox_query
    cur.execute(layer_bbox_query)

    bbox = cur.fetchone()

    bbox_xml = bbox_xml + '<minx>' + str(bbox[0]) + '</minx>'
    bbox_xml = bbox_xml + '<maxx>' + str(bbox[1]) + '</maxx>'
    bbox_xml = bbox_xml + '<miny>' + str(bbox[2]) + '</miny>'
    bbox_xml = bbox_xml + '<maxy>' + str(bbox[3]) + '</maxy>'

    return bbox_xml

def create_featuretype_xml(tablename):

    layer_info_query = 'select layer_name, layer_description from "Meta_Layer" where layer_tablename=\'' + tablename + '\''
    cur.execute(layer_info_query)

    layer_info = cur.fetchone()
    
    title = layer_info[0].strip("'")

    if layer_info[1]:
        abstract = layer_info[1].strip("'")
    else:
        abstract = title
    
    keywords = get_keywords_xml(tablename)

    bbox = get_bounding_box(tablename)

    featuretype_xml = featuretype_xml_tpl % (tablename, tablename, tablename, title, abstract, keywords, bbox, bbox)
    
    featuretype_xml_file = open("featuretype.xml", "w")
    featuretype_xml_file.write(featuretype_xml)
    featuretype_xml_file.close()

def create_styles_xml(tablename):
    cont_type = ['bigint', 'integer', 'numeric', 'smallint', 'double precision', 'real']

    styles = ''
    colname_datatype_query = "select column_name, data_type from information_schema.columns where table_name = '" + tablename + "'"
    cur.execute(colname_datatype_query)
    resultset = cur.fetchall()
    for row in resultset:
        if not row[0].startswith('__mlocate__') and (row[1].startswith('character') or (cont_type.count(row[1]) == 1)):
            styles = styles + '<style><id>' + tablename + '_' + row[0] + '</id></style>'

    return styles            

def create_layer_xml(tablename):

    layer_info_query = 'select color_by, title_column, layer_type from "Meta_Layer" where layer_tablename=\'' + tablename + '\''
    cur.execute(layer_info_query)

    row = cur.fetchone()

    layer_type =  row[2]
    default_style = ''
    
    if layer_type == 'MULTIPOLYGON':
        color_by = row[0].strip("'");
        default_style = tablename + "_" + color_by
    elif layer_type == 'POINT':
        title_column = row[1].strip("'");
        default_style = tablename + "_" + title_column

    styles = create_styles_xml(tablename)

    layer_xml = layer_xml_tpl % (tablename, tablename, default_style, styles, tablename)        

    layer_xml_file = open("layer.xml", "w")
    layer_xml_file.write(layer_xml)
    layer_xml_file.close()

try:
    conn = psycopg2.connect("dbname='ibp' user='postgres' host='localhost' password='postgres123'")
except:
    print "unable to connect to the database"

cur = conn.cursor()



#tables = ['lyr_104_india_states_census01']

for tablename in tables:
    os.system("mkdir " + tablename)
    create_featuretype_xml(tablename)
    create_layer_xml(tablename)
    os.system("mv layer.xml featuretype.xml " + tablename)
