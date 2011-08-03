import psycopg2
import random
import math
import os

xml_tpl = """<style>
  <id>%s</id>
  <name>%s</name>
  <filename>%s</filename>
</style>
"""

header_tpl = """<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>Attribute-based polygon</Name>
    <UserStyle>
      <Title><![CDATA[%s]]></Title>
      <FeatureTypeStyle>
"""

point_rule_tpl = """
<Rule>
  <Name><![CDATA[%s]]></Name>
  <Title><![CDATA[%s]]></Title>
  <ogc:Filter>
    <ogc:And>
      <ogc:PropertyIsGreaterThanOrEqualTo>
        <ogc:PropertyName>%s</ogc:PropertyName>
        <ogc:Literal>%s</ogc:Literal>
      </ogc:PropertyIsGreaterThanOrEqualTo>
      <ogc:PropertyIsLessThan>
        <ogc:PropertyName>%s</ogc:PropertyName>
        <ogc:Literal>%s</ogc:Literal>
      </ogc:PropertyIsLessThan>
    </ogc:And>
  </ogc:Filter>

 <PointSymbolizer>
     <Graphic>
       <Mark>
         <WellKnownName>circle</WellKnownName>
         <Fill>
            <CssParameter name="fill">
            #<ogc:Function name="env">
                <ogc:Literal>%s</ogc:Literal>
                <ogc:Literal>%s</ogc:Literal>          
            </ogc:Function>
            </CssParameter>
         </Fill>
        <Stroke>
           <CssParameter name="stroke">
                #<ogc:Function name="env">
                    <ogc:Literal>stroke</ogc:Literal>
                    <ogc:Literal>%s</ogc:Literal>          
                </ogc:Function>
           </CssParameter>
           <CssParameter name="stroke-width">
                <ogc:Function name="env">
                    <ogc:Literal>stroke-width</ogc:Literal>
                    <ogc:Literal>%s</ogc:Literal>          
                </ogc:Function>
           </CssParameter>
    </Stroke>
       </Mark>
       <Size>
          <ogc:Function name="env">
           <ogc:Literal>size</ogc:Literal>
           <ogc:Literal>%s</ogc:Literal>          
           </ogc:Function>
       </Size>
     </Graphic>
   </PointSymbolizer>
</Rule>
"""

polygon_rule_tpl = """
<Rule>
  <Name><![CDATA[%s]]></Name>
  <Title><![CDATA[%s]]></Title>
  <ogc:Filter>
    <ogc:And>
      <ogc:PropertyIsGreaterThanOrEqualTo>
        <ogc:PropertyName>%s</ogc:PropertyName>
        <ogc:Literal>%s</ogc:Literal>
      </ogc:PropertyIsGreaterThanOrEqualTo>
      <ogc:PropertyIsLessThan>
        <ogc:PropertyName>%s</ogc:PropertyName>
        <ogc:Literal>%s</ogc:Literal>
      </ogc:PropertyIsLessThan>
    </ogc:And>
  </ogc:Filter>
  <PolygonSymbolizer>
    <Fill>
      <CssParameter name="fill">
        #<ogc:Function name="env">
           <ogc:Literal>%s</ogc:Literal>
           <ogc:Literal>%s</ogc:Literal>          
         </ogc:Function>
      </CssParameter>
    </Fill>
    <Stroke>
           <CssParameter name="stroke">
                #<ogc:Function name="env">
                    <ogc:Literal>stroke</ogc:Literal>
                    <ogc:Literal>%s</ogc:Literal>          
                </ogc:Function>
           </CssParameter>
           <CssParameter name="stroke-width">
                <ogc:Function name="env">
                    <ogc:Literal>stroke-width</ogc:Literal>
                    <ogc:Literal>%s</ogc:Literal>          
                </ogc:Function>
           </CssParameter>
    </Stroke>
  </PolygonSymbolizer>
</Rule>
"""

point_cat_rule_tpl = """
<Rule>
  <Name><![CDATA[%s]]></Name>
  <Title><![CDATA[%s]]></Title>
  <ogc:Filter>
      <ogc:PropertyIsEqualTo>
        <ogc:PropertyName>%s</ogc:PropertyName>
        <ogc:Literal><![CDATA[%s]]></ogc:Literal>
      </ogc:PropertyIsEqualTo>
  </ogc:Filter>

   <PointSymbolizer>
     <Graphic>
       <Mark>
         <WellKnownName>circle</WellKnownName>
         <Fill>
            <CssParameter name="fill">
            #<ogc:Function name="env">
                <ogc:Literal>%s</ogc:Literal>
                <ogc:Literal>%s</ogc:Literal>          
            </ogc:Function>
            </CssParameter>
         </Fill>

        <Stroke>
           <CssParameter name="stroke">
                #<ogc:Function name="env">
                    <ogc:Literal>stroke</ogc:Literal>
                    <ogc:Literal>%s</ogc:Literal>          
                </ogc:Function>
           </CssParameter>
           <CssParameter name="stroke-width">
                <ogc:Function name="env">
                    <ogc:Literal>stroke-width</ogc:Literal>
                    <ogc:Literal>%s</ogc:Literal>          
                </ogc:Function>
           </CssParameter>
         </Stroke>
       </Mark>
        <Size>
          <ogc:Function name="env">
           <ogc:Literal>size</ogc:Literal>
           <ogc:Literal>%s</ogc:Literal>          
           </ogc:Function>
       </Size>
     </Graphic>
   </PointSymbolizer>
</Rule>
"""

polygon_cat_rule_tpl = """
<Rule>
  <Name><![CDATA[%s]]></Name>
  <Title><![CDATA[%s]]></Title>
  <ogc:Filter>
      <ogc:PropertyIsEqualTo>
        <ogc:PropertyName>%s</ogc:PropertyName>
        <ogc:Literal><![CDATA[%s]]></ogc:Literal>
      </ogc:PropertyIsEqualTo>
  </ogc:Filter>
  <PolygonSymbolizer>
    <Fill>
      <CssParameter name="fill">
        #<ogc:Function name="env">
           <ogc:Literal>%s</ogc:Literal>
           <ogc:Literal>%s</ogc:Literal>          
         </ogc:Function>
      </CssParameter>
    </Fill>
    <Stroke>
          <CssParameter name="stroke">
                #<ogc:Function name="env">
                    <ogc:Literal>stroke</ogc:Literal>
                    <ogc:Literal>%s</ogc:Literal>          
                </ogc:Function>
           </CssParameter>
           <CssParameter name="stroke-width">
                <ogc:Function name="env">
                    <ogc:Literal>stroke-width</ogc:Literal>
                    <ogc:Literal>%s</ogc:Literal>          
                </ogc:Function>
           </CssParameter>
    </Stroke>
  </PolygonSymbolizer>
</Rule>
"""


footer_tpl = """
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
"""


golden_ratio_conjugate = 0.618033988749895

def get_rand_color():
    rnd = random.randint(150, 400)
    r = math.floor(rnd * golden_ratio_conjugate)

    rnd = random.randint(150, 400)
    g = math.floor(rnd * golden_ratio_conjugate)

    rnd = random.randint(150, 400)
    b = math.floor(rnd * golden_ratio_conjugate)

    return '%x%x%x' % (int(r), int(g), int(b))


color_schemes = [['ffff7e', 'f9d155', 'f1a430', 'a75118', '6c0000'],
['f8f6f9', 'cfc4d1', 'a691b4', '886296', '61397f'],
['eee4e5', 'cdaaea', 'bd82f8', '9c55f1', '8129fa']]

def get_bin_size(minimum, maximum, bincount):
    size = (maximum - minimum)/bincount
    return size

def create_style_file_xml(tablename, property_name, sld_filename):    
    xml_filename = tablename + '_' + property_name + '.xml'
    xml_file = open(xml_filename, 'w')
    xml_id = tablename + '_' + property_name
    xml = xml_tpl % (xml_id, xml_id, sld_filename)
    xml_file.write(xml)
    xml_file.close()

def create_style_files(tablename, property_title, property_name, property_min, property_max, bincount, layer_type):
    color_scheme = color_schemes[random.randint(0, len(color_schemes)-1)]
    sld_filename = tablename + '_' + property_name + '.sld'

    create_style_file_xml(tablename, property_name, sld_filename)

    sld_file = open(sld_filename, 'w')
    size = get_bin_size(property_min, property_max, bincount)
    mi = property_min
    mx = property_min + size
    
    sld_file.write(header_tpl % (property_title))

    for i in range(1, bincount+1):
        rule_name = str(mi) + ' to ' + str(mx)
        colr_code = 'c' + str(i)
        colr_hex = color_scheme[i-1]

        if layer_type == 'MULTIPOLYGON':
            rule = polygon_rule_tpl % (rule_name, rule_name, property_name, str(mi), property_name, str(mx), colr_code, colr_hex, 'aaaaaa', 1)
            sld_file.write(rule)
        elif layer_type == 'POINT':
            rule = point_rule_tpl % (rule_name, rule_name, property_name, str(mi), property_name, str(mx), colr_code, colr_hex, 'e5e5e5', 2, 12)
            sld_file.write(rule)

        mi = mx
        mx = (property_min + size) * (i+1)
    
    sld_file.write(footer_tpl)
    sld_file.close()

def create_categorical_style_files(tablename, property_title, property_name, layer_type):
    cat_values_query = "select distinct(" + property_name + ") from " + tablename
    cur.execute(cat_values_query)
    resultset = cur.fetchall()

    sld_filename = tablename + '_' + property_name + '.sld'
    create_style_file_xml(tablename, property_name, sld_filename)

    sld_file = open(sld_filename, 'w')
    sld_file.write(header_tpl % (property_title))
    
    i = 1

    for row in resultset:
        colr_code = 'c' + str(i)
        colr_hex = get_rand_color()
        
        if layer_type == 'MULTIPOLYGON':
            cat_rule = polygon_cat_rule_tpl % (row[0], row[0], property_name, row[0], colr_code, colr_hex, 'aaaaaa', 1)
            sld_file.write(cat_rule)
        elif layer_type == 'POINT':
            cat_rule = point_cat_rule_tpl % (row[0], row[0], property_name, row[0], colr_code, 'fd7569', 'e5e5e5', 2, 12)
            sld_file.write(cat_rule)
        
        i = i + 1
        

    sld_file.write(footer_tpl)
    sld_file.close()

def get_column_name(tablename, property_name):

    col_description_query = "select col_description((select oid from pg_class where relname = '" + tablename + "'), (select ordinal_position from information_schema.columns where table_name='" + tablename + "' and column_name='" + property_name + "'))"
    cur.execute(col_description_query)
    column_name = cur.fetchone()[0];

    return column_name


try:
    conn = psycopg2.connect("dbname='ibp' user='postgres' host='localhost' password='postgres123'")
except:
    print "unable to connect to the database"

cur = conn.cursor()


#POINT
tables = ['lyr_185_wg_cepf_grants']

cont_type = ['bigint', 'integer', 'numeric', 'smallint', 'double precision', 'real']     

for tablename in tables:
    meta_layer_query = 'select color_by, layer_type from "Meta_Layer" where layer_tablename=\'' + tablename + '\''
    cur.execute(meta_layer_query)
    layer_type = cur.fetchone()[1].strip("'");

    colname_datatype_query = "select column_name, data_type from information_schema.columns where table_name = '" + tablename + "'"
    cur.execute(colname_datatype_query)
    resultset = cur.fetchall()
    for row in resultset:
        if not row[0].startswith('__mlocate__') and row[1].startswith('character'):
            column_name = get_column_name(tablename, row[0])
            create_categorical_style_files(tablename, column_name, row[0], layer_type)

        elif not row[0].startswith('__mlocate__') and cont_type.count(row[1]) == 1:
            column_name = get_column_name(tablename, row[0])
            min_max_query = 'SELECT  min(' + row[0] + '), max(' + row[0] + ') FROM ' + tablename
            cur.execute(min_max_query)
            min_max_resultset = cur.fetchall()
            for minimum, maximum in min_max_resultset:
                if minimum != None and maximum != None:
                    create_style_files(tablename, column_name, row[0], minimum, maximum, 5, layer_type)

os.system("mkdir styles")
os.system("mv *.xml *.sld styles")
