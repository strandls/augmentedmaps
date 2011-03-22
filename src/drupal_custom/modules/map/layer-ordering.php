
<style>
	#sortable {list-style-type: none; margin: 0; padding: 0; width:100%;}
	#sortable li {background-image:url('sites/all/themes/augmentedmaps/images/dnd.jpg'); background-repeat:no-repeat;background-position:left; border: 1px solid #111111; width:95%; margin: 3px;}
        #sortable li a {display: block;	padding: 5px 5px 5px 20px; color: #111111; text-decoration: none;}
        #sortable li a:hover {color:#111111;}


    
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
    if ($result) { 
        $row = pg_fetch_array($result);
        echo "<li id='".$layer."'><a href='#'>".$row[0]."</a></li>";
    } 

}
echo "</ul>";

// free memory
pg_free_result($result);

pg_close(); 
?> 

