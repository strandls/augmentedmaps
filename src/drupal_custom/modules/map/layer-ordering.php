
<style>
	#sortable {list-style-type: none; margin: 0; padding: 0; width:100%;}
	#sortable li {background-image:url('sites/all/modules/map/images/dnd.png'); background-repeat:no-repeat;background-position:left; border: 1px solid #999999; width:95%; margin: 3px; border-radius: 7px 7px 7px 7px;background-color:#c6d4c0;padding: 5px 5px 5px 20px;cursor:move;}
        #sortable li:hover {border: 1px solid #111111;background-color:#cfdec9;} 
        #sortable li a {display: block;	padding: 5px 5px 5px 20px; color: #111111; text-decoration: none;}
        #sortable li a:hover {color:#111111;}
	
#zoomextent {
background-image:url('sites/all/modules/map/images/zoomextent.png');
background-repeat:no-repeat;
background-position:0 0;
width:32px;
height:32px;
cursor:pointer;
}

#zoomextent:hover {
background-position:-32px 0;
}

#remove_layer {
background-image:url('sites/all/modules/map/images/close_round.png');
background-repeat:no-repeat;
background-position:0 0;
width:32px;
height:32px;
cursor:pointer;
}

#remove_layer:hover {
background-position:-32px 0;
}
    
</style>

<script language="javascript">
$(function() {
        $( "#sortable" ).sortable({
   update: function(event, ui) {
        var result = $('#sortable').sortable('toArray');

         flash_reorderLayer(result[0]);
        }
        });
        $( "#sortable" ).disableSelection();
});
</script>

<?php 

$db = pg_connect('host=localhost dbname=augmentedmaps user=postgres password=postgres123'); 

$layers = $_POST['layers']; 

$layers_arr = explode(",", $layers);

echo "<ul id='sortable'>";
foreach ($layers_arr as $layer){
    $query = "select layer_name from \"Meta_Layer\" where layer_tablename='".$layer."'";

    $result = pg_query($query); 
    if ($result && pg_num_rows($result) > 0) { 
        $row = pg_fetch_array($result);
        echo "<li id='".$layer."'><table width=100%><tr><td>$row[0]</td><td align=right><div id='zoomextent' onclick='javascript:zoomToLayerExtent(\"".$layer."\")'></div><!--a id='zoomextent' href='javascript:zoomToLayerExtent(\"".$layer."\")'></a--></td><td align=right><div id='remove_layer' onclick='javascript:removeLayer(\"".$layer."\"); document.getElementById(\"".$layer."\").style.display=\"none\";'></div></td></tr></table></li>";
    } 

}
echo "</ul>";

// free memory
pg_free_result($result);

pg_close(); 
?> 

