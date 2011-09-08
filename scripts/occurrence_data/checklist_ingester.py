import psycopg2
import os

def get_states(nid):
    states = []

    q = 'select field_states_value from content_field_states where nid=' + str(nid)
    cur.execute(q)

    resultset = cur.fetchall()
    for row in resultset:
        if not row[0]:
            continue

        state_query = 'select state, ST_Centroid(__mlocate__topology), GeometryType(__mlocate__topology) from lyr_116_india_states where __mlocate__id=' + row[0]
        cur.execute(state_query)
        state = cur.fetchone()
        states.append(state)
        
    return states

def get_districts(nid):
    districts = []

    q = 'select field_districts_value from content_field_districts where nid=' + str(nid)
    cur.execute(q)

    resultset = cur.fetchall()
    for row in resultset:
        if not row[0]:
            continue

        district_query = 'select district, ST_Centroid(__mlocate__topology), GeometryType(__mlocate__topology) from lyr_105_india_districts where __mlocate__id=' + row[0]
        cur.execute(district_query)
        district = cur.fetchone()
        districts.append(district)
        
    return districts

def get_taluks(nid):
    taluks = []

    q = 'select field_taluks_value from content_field_taluks where nid=' + str(nid)
    cur.execute(q)

    resultset = cur.fetchall()
    for row in resultset:
        if not row[0]:
            continue

        taluk_query = 'select tahsil, ST_Centroid(__mlocate__topology), GeometryType(__mlocate__topology) from lyr_115_india_tahsils where __mlocate__id=' + row[0]
        cur.execute(taluk_query)
        taluk = cur.fetchone()
        taluks.append(taluk)

    return taluks

def get_protected_area(nid):
    
    if not nid:
        return None

    pa_query = 'select areaname, ST_Centroid(__mlocate__topology), GeometryType(__mlocate__topology) from lyr_85_india_papoints where __mlocate__id=' + nid
    cur.execute(pa_query)
    pa = cur.fetchone()
    
    return pa

def get_tiger_reserve(nid):
    
    if not nid:
        return None

    reserve_query = 'select name, ST_Centroid(__mlocate__topology), GeometryType(__mlocate__topology) from lyr_171_india_tigerreserves where __mlocate__id=' + nid
    cur.execute(reserve_query)
    reserve = cur.fetchone()
    
    return reserve

def get_node_title(nid):

    if not nid:
        return None

    title_query = 'select title from node where nid=' + str(nid)
    cur.execute(title_query)
    title = cur.fetchone()

    return title[0]

    
def get_scientific_name_index(header):

    def index_of(lst, values):
        idx = -1;
        
        for value in values:
            if idx != -1:
                continue

            try:
                idx = lst.index(value)    
            except:
                pass
               
        return idx

    data = [item.strip() for item in header.split("\t")]
    if (len(data) > 1): #assume checklist is tab separated
        return index_of(data, ['scientific_name', 'Scientific Name', 'scientific_names'])                    
    else:                     
        data = [item.strip() for item in header.split(",")]
        if (len(data) > 1): #assume checklist is comma separated
            return index_of(data, ['scientific_name', 'Scientific Name', 'scientific_names'])                    
        else:
            return

def get_scientific_name(line, index):
    data = [item.strip() for item in line.split("\t")]
    if (len(data) > 1): #assume checklist is tab separated
        return data[index]                    
    else:                     
        data = [item.strip() for item in line.split(",")]
        if (len(data) > 1): #assume checklist is comma separated
            return data[index]                   
        else:
            return ''

# return the finest polygons i.e. return polygons in order starting from 
# tiger_reserve, protected_area, taluks, districts, states
def get_finest_geometry(tiger_reserve, protected_area, taluks, districts, states):                   
   
    geometry = []

    if tiger_reserve:
        location = []
        location.append(tiger_reserve[1])
        location.append(tiger_reserve[2])
        geometry.append(location)
        return geometry

    if protected_area:
        location = []
        location.append(protected_area[1])
        location.append(protected_area[2])
        geometry.append(location)
        return geometry

    for taluk in taluks:
        location = []
        location.append(taluk[1])
        location.append(taluk[2])
        geometry.append(location)

    if geometry:
        return geometry
        
    for district in districts:
        location = []
        location.append(district[1])
        location.append(district[2])
        geometry.append(location)

    if geometry:
        return geometry

    for state in states:
        location = []
        location.append(state[1])
        location.append(state[2])
        geometry.append(location)
    
    return geometry

def create_occurance_record(data):
    nid = data[0]
    place = data[1]
    protected_area = get_protected_area(data[2])
    tiger_reserve = get_tiger_reserve(data[3])
    raw_checklist = data[4]
    lines = raw_checklist.split("\r")
    scientific_name_idx = get_scientific_name_index(lines[0])

    #print ",".join([state[0] for state in states])
    states = get_states(nid)
    districts = get_districts(nid)
    taluks = get_taluks(nid)

    geometry = get_finest_geometry(tiger_reserve, protected_area, taluks, districts, states)

    tiger_reserve_name = tiger_reserve[0] if tiger_reserve else ''
    protected_area_name = protected_area[0] if protected_area else ''
    taluks_name = ",".join([taluk[0] for taluk in taluks])
    districts_name = ",".join([district[0] for district in districts])
    states_name = ",".join([state[0] for state in states])
    
    source = "checklist:"+ get_node_title(nid) +":" + str(nid)
    accuracy = "Approximate"

    for line in lines[1:]:
        for g in geometry:
            #print nid, place, tiger_reserve_name, protected_area_name, taluks_name, districts_name, states_name, get_scientific_name(line, scientific_name_idx), g[1]
            print "///".join([get_scientific_name(line, scientific_name_idx), g[0], g[1], accuracy, source])

try:
    conn = psycopg2.connect("dbname='ibp' user='postgres' host='localhost' password='postgres123'")
except:
    print "unable to connect to the database"

cur = conn.cursor()

q = 'select nid, field_place_value, field_checklist_pname_value, field_checklist_reserves_value, field_rawchecklist_value from content_type_checklist'

cur.execute(q)

resultset = cur.fetchall()
for row in resultset:
    create_occurance_record(row)
    
