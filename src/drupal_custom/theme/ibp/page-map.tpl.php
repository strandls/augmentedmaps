<?php
// $Id: page.tpl.php,v 1.18 2008/01/24 09:42:53 goba Exp $
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">
<head>
    <title>augmented maps</title>
    <link type="text/css" rel="stylesheet" media="all" href="/augmentedmaps/sites/all/themes/ibp/css/jquery-ui-1.8.10.custom.css" />
    <?php print $head ?>
    <?php print $styles ?>
    <?php print $scripts ?>
    <?php flush(); ?>
    <script type="text/javascript" src="/augmentedmaps/sites/all/themes/ibp/scripts/jquery-1.4.4.min.js"></script>
    <script type="text/javascript" src="/augmentedmaps/sites/all/themes/ibp/scripts/jquery.blockUI.js"></script>
    <script type="text/javascript" src="/augmentedmaps/sites/all/themes/ibp/scripts/jquery-ui-1.8.10.custom.min.js"></script>
    <script type="text/javascript" src="/augmentedmaps/sites/all/themes/ibp/scripts/augmentedmaps.js"></script>

</head>
    
<body id="mapPage">

<div id="header">
<!-- Logo -->
  <div id="logo">
    <a href="<?php print check_url($front_page)?>">
      <div class="icon"></div>
    </a>
  </div>
<!-- Logo ends -->

<!-- {{{ login -->
        <?php global $user; ?>
        <div id="login" class="loginRegister">
          <?php if($user->uid): ?>
            Welcome <?php echo l($user->name, "user");?>
            <?php if($is_admin): ?>
              | <a href="<?php print check_url($front_page);?>admin">Administration</a>
            <?php endif; ?>
            | <a href="<?php print check_url($front_page);?>logout">Logout</a>
          <?php else: ?>
             <a href="<?php print check_url($front_page);?>user/register">Register</a> | <a id="login_btn" href="#">Login</a>
          <?php endif; ?>
        </div>
        <!-- login ends }}} -->

<!-- activeLayer -->
<div id="activeLayer" class="toolbar">
<div class="tool first last">
<a href="#" title="Show layer information"></a>
</div>
</div>
<!-- activeLayer end -->

<div id="controls-bar">
<ul>
<li class="controls_label" id="resetTreeViewControl" title="Remove all added layers">Reset</li>
</ul>
</div>

</div>

<div id="shadow"></div>

<div id="right-sidebar">

<div id="layers_drawer_handle" class="vertical-label-right">
    <a class="label-right" href="#">Layers</a>
</div>

<div id="search_drawer_handle" class="vertical-label-right">
    <a class="label-right" href="#">Search</a>
</div>

<div id="tools_drawer_handle" class="vertical-label-right">
    <a class="label-right" href="#">Tools</a>
</div>

<div id="legend_drawer_handle" class="vertical-label-right">
    <a class="label-right" href="#">Legend</a>
</div>

</div>

<!-- {{{ popups -->

<!-- {{{ Layers drawer -->
<div id="layers_drawer" class="drawer"> 
<div class="close_drawer"></div>

    <!-- {{{ accordion -->    

    <div id="layers_accordion">

	<h3 class="accordion_title"><a href="#" style="color:#dddddd;">Layers</a></h3>
	<div id="layers_selector">
            <ul id="layerGroupType">
                <li id="layerOption1"><a href="javascript:changeLayerOptions(1)" title="View thematic organization of maps">By Theme</a></li>
                <li id="layerOption2"><a href="javascript:changeLayerOptions(2)" title="View location-wise organization of maps">By Geography</a></li>
                <li id="layerOption3"><a href="javascript:changeLayerOptions(3)">Participative</a></li>
                <!--<li id="layerOption4"><a href="javascript:changeLayerOptions(4)">Search</a></li>-->
                <li id="layerOption5" style="display:none"><a href="javascript:changeLayerOptions(5)">Validate</a></li>
                <li id="layerOption6" style="display:none"><a href="javascript:changeLayerOptions(6)">Inactive</a></li>
            </ul>
            <div id="layerTree">
                <div id="divThemes"></div>
            </div>
	</div>
	<h3 class="accordion_title"><a id="layers_order" href="#" style="color:#dddddd;">Layer Ordering</a></h3>
        <div id="layers_ordering"></div> 

    </div>

    <!-- accordion ends }}} -->    


</div>
<!-- Layers drawer ends }}} -->

<!-- {{{ Search drawer -->
<div id="search_drawer" class="drawer"> 
<div class="close_drawer"></div>
    <!-- {{{ accordion -->    

    <div id="search_accordion">
            <h3 class="accordion_title"><a href="#" style="color:#dddddd;">Search</a></h3>
            <div>
                <div id="search_form" style="padding:0px;">
                    <form action="<?php print check_url(path_to_theme())?>/search.php" name="search" method="post">
                        <input type="text" size=14 name="search_string" id="search_string" placeholder="Search" />
                        <input type="submit" id="search_btn" value="Search" />
                    </form>  
                </div>

                <div id="search_results"></div>    
            </div>
    </div>

    <!-- accordion ends }}} -->    

</div>
<!-- Tools drawer ends }}} -->

<!-- {{{ Tools drawer -->
<div id="tools_drawer" class="drawer"> 

<div class="close_drawer"></div>
    <!-- {{{ accordion -->    

    <div id="tools_accordion">
            <h3 class="accordion_title"><a id="lnkmeasurement" href="#" style="color:#dddddd;">Measure</a></h3>
            <div id="measurement"></div>
            <h3 class="accordion_title"><a id="a-link-to-map" href="#" style="color:#dddddd;">Link</a></h3>
            <div>
                <div id="link-to-map"></div>
                <button id="link-to-map-refresh">Refresh</button>
            </div>
    </div>

    <!-- accordion ends }}} -->    

</div>
<!-- Tools drawer ends }}} -->

<!-- {{{ Legend -->
<div id="legend_drawer" class="drawer">

<div class="close_drawer"></div>
    <!-- {{{ accordion -->    

    <div id="legend_accordion">
        <h3 class="accordion_title"><a href="#" style="color:#dddddd;">Legend</a></h3>
        <div id="legend" class="displayPane" style="display:block;"></div>
    </div>

    <!-- accordion ends }}} -->    
</div>
<!-- Legend ends }}} -->

<!-- {{{ Layer Data -->
<div id="layerDataPane" class="mapPane">
  <div class="dragHandle">
    <div class="closePane"><a href="#" class="panelToggler" id="layerData-2"><img src="<?php print check_url($front_page)?><?php print check_url(path_to_theme())?>/images/icons/close.png" alt="Close" class="close"/></a></div>
    <h2>Layer Data</h2>
  </div>
  <div id="dataOnDemand" class="displayPane"></div>
</div>
<!-- Layer Data ends }}} -->



<div id="divModalPopup">
</div>
<div id="divMultiLayerSearchPopup">
</div>

<!-- popups end }}} -->

<!-- {{{ other popups -->
<!-- {{{ User login -->
<?php if(! $user->uid): ?>
  <div id="userLogin">
    <div id="loginClose"><a href="#" id="loginCloseButton"><img src="<?php print check_url($front_page)?><?php print check_url(path_to_theme())?>/images/icons/close.png" alt="Close"/></a></div>
    <?php if($user_login): ?>
      <?php print $user_login;?>
    <?php endif; ?>
  </div>
<?php endif; ?>
<!-- User login ends }}} -->

<!-- {{{ Messages -->
<?php if($show_messages && $messages): ?>
  <div id="messages">
    <div id="closeMessagesButton"><a href="#" id="closeMessage"><img src="<?php print check_url($front_page)?><?php print check_url(path_to_theme())?>/images/icons/close.png" alt="Close"/></a></div>
    <?php print $messages;?>
  </div>
<?php endif; ?>
<!-- Messages ends }}} -->

<!-- {{{ divChloropleth -->
<div id="chloroplethPane" class="mapPane">
  <div class="dragHandle">
    <div class="closePane"><a href="#" class="panelToggler" id="chloropleth-2"><img src="<?php print check_url($front_page)?><?php print check_url(path_to_theme())?>/images/icons/close.png" alt="Close" class="close"/></a></div>
    <h2>Chloropleth Analysis</h2>
  </div>
  <div style="padding-top:20px font-color:#A75030">
    <div id="myChoroplethDiv"></div>
    <div id="myChoroplethLegendDiv"></div>
  </div>
</div>
<!-- divChloropleth ends }}} -->

<div id="symbology"></div>
<div id="colorpicker301" class="colorpicker301"></div>
<!-- {{{ map3dContainer -->
<div id="map3dContainer" >
  <!--
  <div class="dragHandle">
    <div class="closePane"><a href="#" class="panelToggler" id="closeGE"><img src="<?php print check_url($front_page)?><?php print check_url(path_to_theme())?>/images/icons/close.png" alt="Close" class="close"/></a></div>
  </div>
  -->
</div>
<!-- map3dContainer ends }}} -->

<!-- {{{ divMapUrl -->
<div id="divMapUrl" >
  <div class="closePane" style="float:right"><a href="#" class="panelToggler" id="closemapurl"><img src="<?php print check_url($front_page)?><?php print check_url(path_to_theme())?>/images/icons/close.png" alt="Close" class="close"/></a></div>
  <div style="padding-top:10px">
    <label for='txtMapUrl' color="#A75030" style="font-size:10pt"> <b><font color="#A75030">URL:</font> </b> </label>
    <input id="txtMapUrl" type="text" color ="#A75030" style="font-size:10pt;width:540px">
  </div>
</div>
<!-- divMapUrl ends }}} -->

<!-- other popups ends }}} -->

<div style="display:none">
<?php if($map_area): ?>
<?php print $map_area;?>
<?php endif; ?>
</div>

<!-- {{{ mapArea -->

<!-- {{{ Left panel -->
<div id="layers_reordering" style="position:absoloute; top:0px; width:30%;"></div>    

<!-- Left panel ends}}} -->

<!-- map -->
<div id="map" style="position: absolute; top:80px; height:100%; width:100%;">
</div>
<!-- map ends -->

<!-- {{{ Basemap -->
<div class="baseMap">
  <SELECT id='ddlBaseLayer' onChange='SetBaseLayer(options[selectedIndex].value)'></SELECT>
</div>
<!-- Basemep ends }}} -->

<!-- mapArea ends }}}-->

<?php print $closure;?>

</body>
</html>

<!--
vim: syntax=xml foldmethod=marker
-->
