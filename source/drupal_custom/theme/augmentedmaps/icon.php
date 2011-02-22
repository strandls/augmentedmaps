<?php

error_reporting(E_ALL ^ E_NOTICE);

/**
* Serves out required icon in the required color and border
**/

$step = 50;

$iconDirectoryPath = "images/icons/";
$existingFill = hex2int("00ff00");
$existingDarkBorder = hex2int("474747");
$existingLightBorder = hex2int("B4B4B4");
$fill = hex2int("53E26E");
$lightBorder = hex2int("B4B4B4");
$darkBorder = hex2int("474747");
$themeName = "";
$layerName = "";
$iconName = "proto.png";

if($_GET["theme"] != "") {
	$iconName = $_GET["theme"] . ".png";
}
elseif($_GET["layer"] != "") {
	$iconName = $_GET["layer"] . ".png";
}
elseif($_GET["icon"] != "") {
	$iconName = $_GET["icon"] . ".png";
}

if(! file_exists($iconDirectoryPath . $iconName)) {
	$iconName = "proto.png";
}

if($_GET["fill"] != "") {
	$fill = hex2int($_GET["fill"]);
}

// Compute the dark and light shades
/*$darkBorder['r'] = $fill['r'] - $step;
if($darkBorderBorder['r'] < 0){
	$darkBorder['r'] = 0;
}
$darkBorder['g'] = $fill['g'] - $step;
if($darkBorderBorder['g'] < 0){
	$darkBorder['g'] = 0;
}
$darkBorder['b'] = $fill['b'] - $step;
if($darkBorderBorder['b'] < 0){
	$darkBorder['b'] = 0;
}*/

$lightBorder['r'] = $fill['r'] + $step;
if($lightBorder['r'] > 255){
	$lightBorder['r'] = 255;
}

$lightBorder['g'] = $fill['g'] + $step;
if($lightBorder['g'] > 255){
	$lightBorder['g'] = 255;
}

$lightBorder['b'] = $fill['b'] + $step;
if($lightBorder['b'] > 255){
	$lightBorder['b'] = 255;
}

// For now, all borders are dark
//$lightBorder = "000000";
$darkBorder = "000000";


$image = imageCreateFromPNG($iconDirectoryPath . $iconName);
$phpFillIndex = imageColorClosest($image,$existingFill['r'],$existingFill['g'],$existingFill['b']);
imageColorSet($image,$phpFillIndex,$fill['r'],$fill['g'],$fill['b']);
$phpDarkBorderIndex = imageColorClosest($image,$existingDarkBorder['r'],$existingDarkBorder['g'],$existingDarkBorder['b']);
imageColorSet($image,$phpDarkBorderIndex,$darkBorder['r'],$darkBorder['g'],$darkBorder['b']);
$phpLightBorderIndex = imageColorClosest($image,$existingLightBorder['r'],$existingLightBorder['g'],$existingLightBorder['b']);
imageColorSet($image,$phpLightBorderIndex,$lightBorder['r'],$lightBorder['g'],$lightBorder['b']);

header('Content-type: image/png');
imagePNG($image);
imageDestroy($image);


/**
 * @param    $hex string        6-digit hexadecimal color
 * @return    array            3 elements 'r', 'g', & 'b' = int color values
 * @desc Converts a 6 digit hexadecimal number into an array of
 *       3 integer values ('r'  => red value, 'g'  => green, 'b'  => blue)
 */
function hex2int($hex) {
        return array( 'r' => hexdec(substr($hex, 0, 2)), // 1st pair of digits
                      'g' => hexdec(substr($hex, 2, 2)), // 2nd pair
                      'b' => hexdec(substr($hex, 4, 2))  // 3rd pair
                    );
}

/**
 * @param $input string     6-digit hexadecimal string to be validated
 * @param $default string   default color to be returned if $input isn't valid
 * @return string           the validated 6-digit hexadecimal color
 * @desc returns $input if it is a valid hexadecimal color, 
 *       otherwise returns $default (which defaults to black)
 */
function validHexColor($input = '000000', $default = '000000') {
    // A valid Hexadecimal color is exactly 6 characters long
    // and eigher a digit or letter from a to f
    return (eregi('^[0-9a-f]{6}$', $input)) ? $input : $default ;
}
?>