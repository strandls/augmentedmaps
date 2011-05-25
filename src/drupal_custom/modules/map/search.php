<?php 

function excerpt($text, $phrase, $radius = 25, $ending = "...") {
    $phraseLen = strlen($phrase);
    if ($radius < $phraseLen) {
        $radius = $phraseLen;
    }

    $pos = strpos(strtolower($text), strtolower($phrase));

    $startPos = 0;
    if ($pos > $radius) {
        $startPos = $pos - $radius;
    }

    $textLen = strlen($text);

    $endPos = $pos + $phraseLen + $radius;
    if ($endPos >= $textLen) {
        $endPos = $textLen;
    }

    $excerpt = substr($text, $startPos, $endPos - $startPos);
    if ($startPos != 0) {
        $excerpt = substr_replace($excerpt, $ending, 0, $phraseLen);
    }

    if ($endPos != $textLen) {
        $excerpt = substr_replace($excerpt, $ending, -$phraseLen);
    }

    return $excerpt;
}

$db = pg_connect('host=localhost dbname=augmentedmaps user=postgres password=postgres123'); 

$search_string = pg_escape_string($_POST['search_string']); 

$query = "select x.layer_tablename, x.layer_name, y.fid, x.tags, y.text from \"Meta_Layer\" as x, (SELECT DISTINCT(fid),lid,text FROM search_data where text like  '%". $search_string ."%' GROUP BY lid,fid,text) as y where x.layer_id = y.lid";
$result = pg_query($query); 
if (!$result) { 
    $errormessage = pg_last_error(); 
    echo "Error with query: " . $errormessage; 
    exit(); 
} 

$formatted_srch_string = "<font style='background-color:yellow; font-size:0.9em; font-weight:bold'>" . $search_string . "</font>";
echo "<form>";
// iterate over result set
// print each row
while ($row = pg_fetch_array($result)) {
    echo "<p id='search_snippet' style='color:black;'>";
    echo "<input type='checkbox' name=".$row[2]." value='".$row[0]."'onClick='CurrentTabOption = 4;getData_Category(this.value, this.checked, this.name, this)'><font style='color:blue; font-size:0.9em; font-weight:bold'>" . $row[1] . "</font><br />";
    $snippet = excerpt($row[4], $search_string);
    $snippet = str_replace($search_string, $formatted_srch_string, $snippet);
    $tags = "<div id='search_tags' style='color:#555555; font-size:0.7em;'> tags: ".$row[3]."</div>";
    $snippet = "<font style='font-size:0.9em; '>".$snippet."</font>";
    $snippet = $snippet.$tags;
    echo $snippet;
    echo "</p>";
}       

echo "</form>";

// free memory
pg_free_result($result);

pg_close(); 
?> 
