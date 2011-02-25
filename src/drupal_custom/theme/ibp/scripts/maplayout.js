var flashPopupSize = new Array();
flashPopupSize['layerSelectPane'] = new Object();
flashPopupSize['layerOrderPane'] = new Object();

jQuery(document).ready(function(){
  if(location.pathname.match("/map"+"$") != "/map") {
    return; // If the current page is not map page, no need to the do the foloowing.
  }
  
  calculate();

  jQuery(window).wresize(function(){
    calculate();
  });

  linkIcons();

  makePanelsDraggable();

  makePanelsResizable();

  setSizes();

  changeLayerOptions(DEFAULT_LAYERTREE_OPT);

  /*
  flashPopupSize['layerSelectPane'].width = jQuery("#layerSelectPane").width();
  flashPopupSize['layerSelectPane'].height = jQuery("#layerSelectPane").height();
  */

  flashPopupSize['layerOrderPane'].width = jQuery("#layerOrderPane").width();
  flashPopupSize['layerOrderPane'].height = jQuery("#layerOrderPane").height();
});

var calculate = function () {
	var winWidth = jQuery(window).width();
	var winHeight = jQuery(window).height();

	jQuery("#wrapper").width(winWidth);
	jQuery("#wrapper").height(winHeight);

	jQuery("#mapArea").width(winWidth);
	jQuery("#mapArea").height(winHeight - 100);

  jQuery("#dataOnDemand").css("height",(jQuery("#dataOnDemand").parent().height()-60));
}

function setSizes() {
  jQuery("#fLayerSelector").css("height",(jQuery("#layerSelectPane").height()-60));
  jQuery("#fLayerOrdering").css("height",(jQuery("#layerOrderPane").height()-60));
}

function linkIcons() {
  jQuery(".panelToggler").click(function(){
    control = jQuery(this).attr("id") + "";
    jQuery(this).blur();
    control = control.substring(0,(control.length - 2));
    jQuery("#" + control + "Pane").toggle(400);
    return false;
  });

  jQuery(".flashPanelToggler").click(function(){
    control = jQuery(this).attr("id");
    jQuery(this).blur();
    control = control.substring(0,(control.length - 2));
    toggleFlashPopup(control + "Pane");
    return false;
  });

  jQuery("#layerSelect-3").click(function(){
    minimizeFlashPopup("layerSelectPane", "fLayerSelector");
    jQuery("#layerSelect-3").toggle(400);
    jQuery("#layerSelect-4").toggle(400);
  });

  jQuery("#layerSelect-4").click(function(){
    maximizeFlashPopup("layerSelectPane", flashPopupSize['layerSelectPane'].height, "fLayerSelector");
    jQuery("#layerSelect-3").toggle(400);
    jQuery("#layerSelect-4").toggle(400);
  });

  jQuery("#advanced .tool").hover(
    function(){
      jQuery(".optional").show();
    },
    function(){
      //setTimeout("jQuery(\".optional\").hide()", 2000);
      jQuery(".optional").hide();
    }
  );

  jQuery("#resetTreeViewControl").click(function(){
    resetTreeView();
    RemoveCheckedLayers();
    //window.location = base_path;
  });

  //
  jQuery("#uploadData").click(function(){
    uploadData();
    //window.location = base_path;
  });

   //contribute button
   jQuery("#btn_contribute").click(function(){
       contribute();
  });

  // Multi Layer Search
  jQuery("#btn_search").click(function(){
       multiLayerSearch();
  });

  //download layer
  jQuery("#downloadLayer").click(function(){
       getDownloadFormats();
  });

  jQuery("#symbologylink").click(function(){
      showSymbology();
  });
  jQuery("#lnkmeasurement").click(function(){
      showMeasurementTool();
  });
  jQuery("#login").click(function(){
    jQuery("#userLogin").toggle(400);
  });

  jQuery("#loginCloseButton").click(function(){
    jQuery("#userLogin").hide(400);
  });

  jQuery("#closeMessage").click(function(){
    jQuery("#messages").hide(400);
  });

}

function makePanelsResizable() {
  jQuery(".resizeablePane").resizable({
    alsoResize: jQuery(this).attr("id") + " .displayPane",
    minWidth: 200,
    minHeight: 200
  });
  jQuery("#layerSelectPane").resizable({
    //alsoResize: "#fLayerSelector",
    alsoResize: "#layerTree",
    minWidth: 530,
    minHeight: 260,
    resize: function(event, ui) {
      /*
      flashPopupSize['layerSelectPane'].width = jQuery("#layerSelectPane").width();
      flashPopupSize['layerSelectPane'].height = jQuery("#layerSelectPane").height();
      */
    }
  });

  jQuery("#layerOrderPane").resizable({
    alsoResize: "#fLayerOrdering",
    minWidth: 300,
    minHeight: 200,
    resize: function(event, ui) {
      flashPopupSize['layerOrderPane'].width = jQuery("#layerOrderPane").width();
      flashPopupSize['layerOrderPane'].height = jQuery("#layerOrderPane").height();
    }
  });
}

function makePanelsDraggable() {
  jQuery(".mapPane").draggable({handle: ".dragHandle"});
}

function showAdvancedToolSet(show) {
  if(show == true) {
    jQuery("#advancedToolSet").css("display", "block");
  } else {
    jQuery("#advancedToolSet").css("display", "none");
  }
}

//function setActiveLayerInfo(layer_tablename, layer_name, layericon, bbox) {
function setActiveLayerInfo(obj_layerInfo) {
  var layer_tablename = obj_layerInfo.layer_tablename;
  var layer_name = obj_layerInfo.layer_name;
  var layericon = obj_layerInfo.icon;
  var bbox = obj_layerInfo.extent;
  var is_timebased = parseInt(obj_layerInfo.is_timebased);

  // Layer name link
  jQuery('#activeLayer div a')[1].innerHTML = layer_name;
  jQuery(jQuery('#activeLayer div a')[1]).attr("href", "javascript:getLayerMetadata('" + layer_tablename + "');");

  // Layer info icon
  jQuery("#anc_LayerInfo").attr("href", "javascript:getLayerMetadata('" + layer_tablename + "');");

  // Charts icon
  jQuery("#anc_LayerCharts").attr("href", "javascript:showCharts('" + layer_tablename + "', '" + layer_name + "', 'layer');");

  // layer icon
  if(layericon == "") {
    jQuery(jQuery('#activeLayer img')[0]).attr("src", "");
    jQuery(jQuery('#activeLayer img')[0]).hide();
  } else {
    jQuery(jQuery('#activeLayer img')[0]).attr("src", layericon);
  }

  // ZTE icon
  //jQuery("#anc_LayerExtent").attr("href", "zoomToExtent('" + bbox + "')");
  jQuery(jQuery('#activeLayer div a')[0]).attr("href", "javascript:zoomToExtent('" + bbox + "');");

  // Time Line
  if (is_timebased) {
    jQuery("#timeline").find("a").attr("href", "javascript:showTimeLineDataUI('" + layer_tablename + "', '" + layer_name + "', 'layer');");
    jQuery("#timeline").show();
  } else {
    jQuery("#timeline").hide();
  }
}
function disableTools(disable) {
  var div = jQuery("#divDisableTools");
  if(disable) {
    //div.height(jQuery(window).height());
    div.height(jQuery("#tools").height());
    div.show();
  } else {
    div.hide();
  }
}