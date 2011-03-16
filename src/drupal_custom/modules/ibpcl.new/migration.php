
<?php
 $sql = "Select nid from {node} where type = 'ibpcl'";
 $result = db_query($sql);
 while($row = db_fetch_object($result))  {
    $row = db_fetch_object($result);
    $nid = $row->nid;
    $node = node_load($nid);
    
/*
    print_r($node->tables); //resource tables?????
    print "Biogeography   ".$node->biogeography."\n";
    print "From date    ".$node->from_date."\n";
    print "To date     ".$node->to_date."\n";
    print "Published date   ".$node->publication."\n";
    print "Last Updated      ".$node->last_updated."\n"; 
*/

    // Create checklist       
    //add node properties
    $newNode = (object) NULL;
    $newNode->type = 'checklist';
    $newNode->title = $node->title;
    $newNode->uid = $node->uid ;
    $newNode->created = $node->created;
    $newNode->changed = $node->changed;
    $newNode->status = $node->status;
    $newNode->comment = $node->comment;
    $newNode->promote = $node->promote;
    $newNode->moderate = $node->moderate;
    $newNode->sticky = $node->sticky;

    // add CCK field data
    $newNode->field_taxa[0]['value'] = $node->taxa;
    $newNode->field_place[0]['value'] = $node->place_name;
    $newNode->field_allindia[0]['value'] = $node->all_india;

    $newNode->field_states = getIdArray($node->states, 'states');
    $newNode->field_districts = getIdArray($node->districts, 'districts');
    $newNode->field_taluks = getIdArray($node->taluks, 'taluks');

    $newNode->field_attribution[0]['value'] = $node->attribution;
    $newNode->field_source[0]['value'] = $node->link;       //Source
    $newNode->field_cclicense[0]['value'] = $node->license;

    $newNode->field_numentities[0]['value'] = $node->numchecklist;
    $newNode->field_clinfo[0]['value'] = $node->information;
    $newNode->field_references[0]['value'] = $node->references;
    $newNode->field_rawchecklist[0]['value'] = $node->raw_checklist;

    //Populate Processed Checklist here
    $newNode->field_processedchecklist[0] = array(
	'format' => 2,
	'value' => content_display_checklist(get_processed_checklist($node->raw_checklist)),
    );

    //Need to handle Resource tables 
    //Need to handle biogeography
    //Handle dates
    
    //Auto populate Taxonomy terms 
  $tags = $node->taxa;
  $tags .= getTags($newNode->field_states, getStatesMap());
  $tags .= getTags($newNode->field_districts, getDistrictsMap());
  //$tags .= getTags($form_state['values']['field_biogeography'], _get_biogeographic_regions());
  $newNode->taxonomy = array('tags' => array(5 => $tags));

    // save node
    node_save($newNode);
    print 'node created';
}

?>

