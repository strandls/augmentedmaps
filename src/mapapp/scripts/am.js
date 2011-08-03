
function getHost() {
    //return document.domain;
    return 'wgp.pamba.strandls.com';
}

function getWorkspace() {
    return 'wgp';
}

function getMaxExtent() {
    var ext = "5801108.428222222,-7.081154550627198, 12138100.077777777, 4439106.786632658";
    return new OpenLayers.Bounds.fromString(ext);
}

function getMapExtent() {
    var ext = "6567849.955888889,1574216.547942332,11354588.059333334,3763310.626620795";
    return new OpenLayers.Bounds.fromString(ext);
}

function getRestrictedExtent() {
    var ext = "5801108.428222222,674216.547942332, 12138100.077777777, 4439106.786632658";
    return new OpenLayers.Bounds.fromString(ext);
}

function getWWWBase() {
    var www = 'http://' + getHost() + '/geoserver/www/';
    return www;
}

// get the wms 
function getWMS() {
    var wms = 'http://' + getHost() + '/geoserver/wms';
    return wms;
}

function getWorkspaceWMS() {
    var wms = 'http://' + getHost() + '/geoserver/' + getWorkspace() + '/wms';
    return wms;
}

function getWorkspaceOWS() {
    var wms = 'http://' + getHost() + '/geoserver/' + getWorkspace() + '/ows';
    return wms;
}

// get the wfs 
function getWFS() {
    var wfs = 'http://' + getHost() + '/geoserver/' + getWorkspace() + '/wfs';
    return wfs;
}

//add style for map div
function addStyle(divId, css) {
    document.write("<style>");
    document.write("#" + divId);
    document.write("{" + css + "}");
    document.write("</style>");
}

function getSummaryColumns(layer) {
    var url = 'http://' + getHost() + '/geoserver/ows';
    
    var params = {
        request:'getSummaryColumns',
        service:'amdb',
        version:'1.0.0',
        layer: layer
    };

    var summaryColumns = [];
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        cache: false,
        timeout: 30000,
        data: params,
        dataType: 'text',
        error: function(){
            return true;
        },
        success: function(data, msg){ 
            if (parseFloat(msg)){
                return false;
            } else {
                var cols = eval('(' + data + ')');
                for (var i in cols)
                    summaryColumns.push(cols[i].replace(/'/g, ""));
                return true;
            }
        }
    });

    return summaryColumns;
}

function getColumnTitle(layer, columnName) {
    var url = 'http://' + getHost() + '/geoserver/ows';
    
    var params = {
        request:'getColumnTitle',
        service:'amdb',
        version:'1.0.0',
        layer: layer,
        columnName: columnName
    };

    var columnTitle;
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        cache: false,
        timeout: 30000,
        data: params,
        dataType: 'text',
        error: function(){
            return true;
        },
        success: function(data, msg){ 
            if (parseFloat(msg)){
                return false;
            } else {
                columnTitle = data;
                return true;
            }
        }
    });
    
    return columnTitle;
}

function getThemeNames(theme_type) {

    /*
    var url = 'http://' + getHost() + '/geoserver/ows';
    
    var params = {
        request:'getThemeNames',
        service:'amdb',
        version:'1.0.0',
        theme_type: theme_type
    };

    var themes;
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        cache: false,
        timeout: 30000,
        data: params,
        dataType: 'text',
        error: function(){
            return true;
        },
        success: function(data, msg){ 
            if (parseFloat(msg)){
                return false;
            } else {
                themes = data.split('///');
                return true;
            }
        }
    });

    return themes;
    */

    //currently  no way to filter the theme names by domains ibp/wgp, 
    //hence, commented above code and using  hardcoded theme names below
    var by_themes = 'Biogeography///Abiotic///Demography///Species///Administrative Units///Land Use Land Cover///Conservation';

    var by_geography = 'India///Nilgiri Biosphere Reserve///Western Ghats///BR Hills, Karnataka///Vembanad, Kerala///Bandipur, Karnataka';

    if (theme_type == 1)
	return by_themes.split('///');
    else if (theme_type == 2)
	return by_geography.split('///');
}

function getLayersByTheme(theme) {
    var url = 'http://' + getHost() + '/geoserver/ows';
    
    var params = {
        request:'getLayersByTheme',
        service:'amdb',
        version:'1.0.0',
        theme: theme
    };

    var layers;
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        cache: false,
        timeout: 30000,
        data: params,
        dataType: 'text',
        error: function(){
            return true;
        },
        success: function(data, msg){ 
            if (parseFloat(msg)){
                return false;
            } else {
                layers = data.split('///');
                return true;
            }
        }
    });

    return layers;
}

function getLayerColumns(layer) {
    var url = 'http://' + getHost() + '/geoserver/ows';
    
    var params = {
        request:'getLayerColumns',
        service:'amdb',
        version:'1.0.0',
        layer: layer
    };

    var layerColumns;
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        cache: false,
        timeout: 30000,
        data: params,
        dataType: 'text',
        error: function(){
            return true;
        },
        success: function(data, msg){ 
            if (parseFloat(msg)){
                return false;
            } else {
                layerColumns = data;
                return true;
            }
        }
    });

    return layerColumns;
}

function getLayerAttribution(layer) {
    var url = 'http://' + getHost() + '/geoserver/ows';
    
    var params = {
        request:'getLayerAttribution',
        service:'amdb',
        version:'1.0.0',
        layer: layer
    };

    var layer_attribution;
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        cache: false,
        timeout: 30000,
        data: params,
        dataType: 'text',
        error: function(){
            return true;
        },
        success: function(data, msg){ 
            if (parseFloat(msg)){
                return false;
            } else {
                layer_attribution = data.split('///');
                return true;
            }
        }
    });

    return layer_attribution;
}

function getLayerSummary(layer) {
    var url = 'http://' + getHost() + '/geoserver/ows';
    
    var params = {
        request:'getLayerSummary',
        service:'amdb',
        version:'1.0.0',
        layer: layer
    };

    var layer_summary;
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        cache: false,
        timeout: 30000,
        data: params,
        dataType: 'text',
        error: function(){
            return true;
        },
        success: function(data, msg){ 
            if (parseFloat(msg)){
                return false;
            } else {
                layer_summary = eval( '(' + data + ')' );
                return true;
            }
        }
    });

    return layer_summary;
}

function getLayerDetails(layer) {
    var url = 'http://' + getHost() + '/geoserver/ows';
    
    var params = {
        request:'getLayerDetails',
        service:'amdb',
        version:'1.0.0',
        layer: layer
    };

    var layer_details;
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        cache: false,
        timeout: 30000,
        data: params,
        dataType: 'text',
        error: function(){
            return true;
        },
        success: function(data, msg){ 
            if (parseFloat(msg)){
                return false;
            } else {
                layer_details = data;
                return true;
            }
        }
    });
    return layer_details;
}

function getLayerLinkTables(layer) {
    var url = 'http://' + getHost() + '/geoserver/ows';
    
    var params = {
        request:'getLayerLinkTables',
        service:'amdb',
        version:'1.0.0',
        layer: layer
    };

    var layer_link_tables;
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        cache: false,
        timeout: 30000,
        data: params,
        dataType: 'text',
        error: function(){
            return true;
        },
        success: function(data, msg){ 
            if (parseFloat(msg)){
                return false;
            } else {
                layer_link_tables = eval ( '(' + data + ')');
                return true;
            }
        }
    });
    return layer_link_tables;
}

function getLayersAccessStatus() {
    var url = 'http://' + getHost() + '/geoserver/ows';
    
    var params = {
        request:'getLayersAccessStatus',
        service:'amdb',
        version:'1.0.0'
    };
    
    var layersAccess;
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        cache: false,
        timeout: 30000,
        data: params,
        dataType: 'text',
        error: function(){
            return true;
        },
        success: function(data, msg){ 
            if (parseFloat(msg)){
                return false;
            } else {
                layersAccess = eval( '(' + data + ')' );
                return true;
            }
        }
    });
    return layersAccess;
}

function getUrlData(url) {
    var url_data;

    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        cache: false,
        timeout: 30000,
        dataType: 'text',
        error: function(){
            return true;
        },
        success: function(data, msg){
            if (parseFloat(msg)){
                return false;
            } else {
                url_data = data;
                return true;
            }
        }
    });

    return url_data;	
    //$( "#" + lnk_table_div ).dialog({show: "fade", hide: "fade", title:title, width:670,minWidth:670, height: 480, modal:true, zIndex: 3999});
}

function showAjaxLinkPopup(url, title) {

	var url_data = getUrlData(url);

    	var elem = document.getElementById("layers_list_panel_info_dialog");

	elem.innerHTML = url_data;

    	$( "#layers_list_panel_info_dialog" ).dialog({show: "fade", hide: "fade", title:title, width:670,minWidth:670, height: 380, modal:true, zIndex: 3999});
}

function getLinkTableEntries(feature_id, layer_tablename, link_tablename) {
    var url = 'http://' + getHost() + '/ml_orchestrator.php?action=getLinkTableEntries&layerdata_id=' + feature_id + '&layer_tablename=' + layer_tablename + '&link_tablename=' + link_tablename;
    
    var layer_link_table_entries;
    
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        cache: false,
        timeout: 30000,
        dataType: 'text',
        error: function(){
            return true;
        },
        success: function(data, msg){ 
            if (parseFloat(msg)){
                return false;
            } else {
                layer_link_table_entries = eval ( '(' + data + ')');
                return true;
            }
        }
    });

    return layer_link_table_entries;
}

function isAuthorisedUser() {
    var url = 'http://' + getHost() + '/ml_orchestrator.php?action=getUserId';

    var userid = 0;

    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        cache: false,
        timeout: 30000,
        dataType: 'text',
        error: function(){
            return true;
        },
        success: function(data, msg){
            if (parseFloat(msg)){
                return false;
            } else {
                userid = parseInt(data);
                return true;
            }
        }
    });

    return userid > 0;
}

function AugmentedMap(map_div, options) {
     
    var map;
    var popup;
    var clicked_lonlat;
    var popup_enabled = options.popup_enabled;
    var feature_info_panel_div = options.feature_info_panel_div;
    var features_list_panel_enabled = options.features_list_panel_enabled;
    var features_list_panel_div = options.features_list_panel_div;
    var bbox = options.bbox;
    var toolbar_enabled = options.toolbar_enabled;
    var toolbar;
    var highlight_features = [];

    this.map_div = map_div;
    // adds google base layers to OpenLayers.Map
    function addBaseLayers() {
        var gphy = new OpenLayers.Layer.Google(
                "Google Physical",
                {type: google.maps.MapTypeId.TERRAIN, numZoomLevels: 19}            
            );
            
        var gsat = new OpenLayers.Layer.Google(
                "Google Satellite",
                {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 19}
            );

         var ghyb = new OpenLayers.Layer.Google(
                "Google Hybrid",
                {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 19}
            );

        var osm = new OpenLayers.Layer.OSM();

        map.addLayers([gphy, gsat, ghyb, osm]);
    }

    function addLayer(layer) {
        layer.displayInLayerSwitcher = false;
        map.addLayer(layer);
    }

    function removeLayer(layer_tablename) {
	clearHighlight();
        var layer = getLayer(layer_tablename);

        if (layer !== undefined)
            map.removeLayer(layer);
    }

    function getQueryableLayers() {
        var queryableLayers = [];
        var i;

        var layers = getLayers();
        for (i in layers){
            if (layers[i].params.LAYERS !== undefined)
            queryableLayers.push(layers[i].params.LAYERS);
        }

        return queryableLayers;
    }

    function getLayer(layer_tablename) {
        var layers = getLayers();
        for (i in layers){
            if (layers[i].params.LAYERS !== undefined &&
                    layers[i].params.LAYERS === layer_tablename)
                return layers[i];
        }
    }

    function getQueryableLayersAsString() {
        var queryableLayers = getQueryableLayers(); 
        return queryableLayers.join(',');
    }

    function zoomToExtent(bounds) {
        map.zoomToExtent(bounds);
    }

    function addPopup(text) {
	
	function closePopup() {
		clearHighlight();
		popup.hide();	
	}

        if (popup != null) {
            popup.destroy();
            popup = null;
        }
        popup = new OpenLayers.Popup.FramedCloud("info",
                                        clicked_lonlat,
                                        new OpenLayers.Size(250,120),
                                        text,
                                        null,
                                        true,
					closePopup
					);
        popup.setBackgroundColor("#bcd2ee");
        popup.setOpacity(.9);
        popup.maxSize = new OpenLayers.Size(300,380);
        map.addPopup(popup);
    }

    function addFeatureInfoPanel(feature_info_panel_div, text) {
         document.getElementById(feature_info_panel_div).innerHTML = text;
         document.getElementById(feature_info_panel_div).style.display = 'block';
         //XXX:this should not be here
         $(".side_panel").hide();    
         $('#' + feature_info_panel_div).fadeIn(500);    
    }

    function createPopupHTML(response) {
        var featuresList = eval('(' + response.responseText + ')');
        
        var html = '';

        var lyr;
        for (var i in featuresList) {
            highlightFeature(featuresList[i].layer, featuresList[i].featureid);
            var summaryColumns = getSummaryColumns(featuresList[i].layer);

            html = html + '<table class="popup_table">';
            for (var j in summaryColumns) {
                var summaryColumn = summaryColumns[j]; 
                var title = getColumnTitle(featuresList[i].layer, 
                        summaryColumn);
                var value = featuresList[i][summaryColumn];
                html = html + '<tr><td class="first"><span class="popup_item_key">' + title + '</span></td><td><span class="popup_item_value">' + value + "</span></td></tr>";        
            }
            html = html + '</table>';
        }
        return html;
    }
    
    function arrayContains(arr, val) {
        for (var i in arr) {
            if (arr[i] == val)
                return true;
        }

        return false;
    }


    function createLinkTableLinks(layer, feature_id, title) {
        var layer_link_tables = getLayerLinkTables(layer);
        var fid = feature_id.split(".").pop();

        var html = '';
        for (var lnk_table in layer_link_tables) {
            var lnk_table_div =  lnk_table + fid + '_link_table';
            html = html + '<a class="lnk_table_link" href="#" onclick="showLinkTable(\'' + lnk_table_div + '\',' + fid + ',\'' + layer + '\',\'' + lnk_table + '\',\'' + title + ' : ' + layer_link_tables[lnk_table] + '\')">' + layer_link_tables[lnk_table] + '</a>&nbsp;&nbsp;&nbsp;';        
            html = html + '<div id="' + lnk_table_div + '" style="display:none;"></div>';
        }

        return html;
    }

    function createInfoPanelHTML(response) {
        var featuresList = eval('(' + response.responseText + ')');
        
        var html = '';
	
	clearHighlight();
        for (var i in featuresList) {
            highlightFeature(featuresList[i].layer, featuresList[i].featureid);
            var layerColumns = eval("(" + getLayerColumns(featuresList[i].layer) + ")");
            var summaryColumns = getSummaryColumns(featuresList[i].layer);
            
            var titleColumn = summaryColumns[0];
            var titleValue = featuresList[i][titleColumn];
            var feature_id = getLayerTitle(getWorkspace() + ":" + featuresList[i].layer) + ":" + titleValue; 
            var title_div = titleValue.replace(/ /g, "_");
            html = html + '<div class="layer_info_box">';
            html = html + '<span class="feature_title">' + feature_id + '</span>';
            var attribution_div_id = featuresList[i].layer + title_div + '_attribution';
            html = html + '<div class="attribution_link" onclick="toggleAttribution(\'' + attribution_div_id + '\', \'' + featuresList[i].layer + '\');"></div>';
            html = html + '<div class="attribution_box" id="' + attribution_div_id + '" style="display:none;"></div>';
            //html = html + createAttributionBox(attribution_div_id, featuresList[i].layer);
            html = html + '<div id=\'' + featuresList[i].layer + title_div + '_summary_info\'>';
            html = html + '<table class="popup_table">';
            for (var j in summaryColumns) {
                var summaryColumn = summaryColumns[j]; 
                //var title = getColumnTitle(featuresList[i].layer, summaryColumn);
		var title = layerColumns[summaryColumn];
                var value = featuresList[i][summaryColumn];
                html = html + '<tr><td class="first"><span class="popup_item_key">' + title + '</span></td><td><span class="popup_item_value">' + value + "</span></td></tr>";        
            }
            html = html + '</table>';

            html = html + '<div style="float:right;" id=\'' + featuresList[i].layer + title_div + '_more\'>';
            html = html + '<a href="#" onClick="showDiv(\'' + featuresList[i].layer + title_div + '_detailed_info\', \'fade\');hideDiv(\'' + featuresList[i].layer + title_div + '_more\', \'fade\', 1); showDiv(\'' + featuresList[i].layer + title_div + '_less\', \'fade\', 1);">more&darr;</a>';
            html = html + '</div>';
            html = html + '<div style="float:right; display:none;" id=\'' + featuresList[i].layer + title_div + '_less\'>';
            html = html + '<a href="#" onClick="hideDiv(\'' + featuresList[i].layer + title_div + '_detailed_info\');showDiv(\'' + featuresList[i].layer + title_div + '_more\', \'fade\', 1);hideDiv(\'' + featuresList[i].layer + title_div + '_less\', \'fade\', 1);">less&uarr;</a>';
            html = html + '</div>';
            html = html + '</div>';


            html = html + '<div id=\'' + featuresList[i].layer + title_div + '_detailed_info\' style="display:none">';
            html = html + '<table class="popup_table">';


            //html = html + "<b>" + featuresList[i].layer  + "</b>" + "<br>"
            $.each(featuresList[i], function(key, value) {
                    if (key == 'layer' || key == 'featureid' || key.indexOf('__mlocate__') === 0 || arrayContains(summaryColumns, key))
                        return;
                     
                    //var title = getColumnTitle(featuresList[i].layer, key);
                    var title = layerColumns[key];
                    //html = html + title + ":" + value + "<br>";
                    html = html + '<tr><td class="first"><span class="popup_item_key">' + title + '</span></td><td><span class="popup_item_value">' + value + "</span></td></tr>";        
                    });
            html = html + '</table>';
            html = html + '<div style="float:right;">';
            html = html + '<a href="#" onClick="hideDiv(\'' + featuresList[i].layer + title_div + '_detailed_info\');showDiv(\'' + featuresList[i].layer + title_div + '_more\', \'slide\', 1);hideDiv(\'' + featuresList[i].layer + title_div + '_less\', \'fade\', 1);">less&uarr;</a>';
            html = html + '</div>';
            html = html + '</div>';
            
            html = html + createLinkTableLinks(featuresList[i].layer, featuresList[i].featureid, feature_id);

            html = html + '</div>';
        }

        return html;
    }


    function setHTML(response) {

        if (popup_enabled) { 
            var text = createPopupHTML(response);

            if (text !== '')
                addPopup(text);
            else
                clearHighlight();
        }

        if (feature_info_panel_div !== undefined) {
            var html = createInfoPanelHTML(response);

            if (html !== '')
                addFeatureInfoPanel(feature_info_panel_div, html);
            else
                clearHighlight();

        }
    }

    function clearHighlight() {
        
        for (var i in highlight_features) {
            map.removeLayer(highlight_features[i]);
        }

        highlight_features = [];
    }

    function highlightFeature(layer, featureid, index) {
	
	if (index == null)
		index = 5;

        var highlight_feature = new OpenLayers.Layer.WMS('highlight',
            getWMS(), 
            {layers:layer,
            featureid:featureid,
            env:'size:18;stroke:ff0000;stroke-width:'+index,
            format: "image/png",
            styles: '',
            tiled: true,
            tilesOrigin:map.maxExtent.left + ',' + map.maxExtent.bottom, transparent:true},
            {buffer: 0,
            displayOutsideMaxExtent: true,
            isBaseLayer: false,
            opacity:0.3
            });

        map.addLayer(highlight_feature);
        highlight_features.push(highlight_feature);
    }

    function layerClicked(e) {
        clicked_lonlat = map.getLonLatFromPixel(e.xy);
        var queryable_layers = getQueryableLayersAsString();

        var params = {
	    REQUEST: "GetFeatureInfo",
	    EXCEPTIONS: "application/vnd.ogc.se_xml",
	    BBOX: map.getExtent().toBBOX(),
	    SERVICE: "WMS",
	    VERSION: "1.1.1",
	    X: e.xy.x,
	    Y: e.xy.y,
	    INFO_FORMAT: 'text/html',
	    QUERY_LAYERS: queryable_layers,
	    LAYERS: queryable_layers,
	    FEATURE_COUNT: 50,
	    WIDTH: map.size.w,
	    HEIGHT: map.size.h,
	    srs: map.layers[0].projection};
    
        OpenLayers.loadURL(getWMS(), params, this, setHTML, setHTML);
        OpenLayers.Event.stop(e);
    }

    function setFeatureListHTML(response) {
        var text = response.responseText;

        if (features_list_panel_enabled) {
            var oXmlParser = new DOMParser();
            var oXmlDoc = oXmlParser.parseFromString( text, "text/xml" ); 
            var arrFeatures = oXmlDoc.getElementsByTagName("ibp:state"); 
            var featuresList = [];

            for (var i in arrFeatures){
                if (arrFeatures[i].firstChild !== undefined)
                    featuresList.push(arrFeatures[i].firstChild.nodeValue);
            }

            var html = featuresList.join("<br>");
            document.getElementById(features_list_panel_div).innerHTML = html;
        }
    }

    function addFeaturesList() {
        var params = {
            service: "wfs",
            version: "1.1.0",
            request: "getFeature",
            typeName: getQueryableLayersAsString(),
            propertyName: "state"   
            };

        OpenLayers.loadURL(getWMS(), params, this, setFeatureListHTML);

    }

    function activateNavigationControl() {
        // Deactivate all controls in toolbar.
        var len = toolbar.controls.length;
        for(var i = 1; i < len; i++) {
            toolbar.controls[i].deactivate();
        }
        // Activate navigation control
        toolbar.controls[0].activate();
    }

    function onZoom() {
        activateNavigationControl();
	var zoom = map.getZoom();
  	if ( zoom < 4) 
    		map.zoomTo(4);

    }

    function getLayers() {
        var layers = [];
         for (i in map.layers){
               if (map.layers[i].name !== 'highlight' && map.layers[i].params !== undefined)
                   layers.push(map.layers[i]);
         }

         return layers;
    }

    function getLayersName(layer) {
        return map.getLayersName(layer);
    }

    function setBaseLayer(layer) {
        map.setBaseLayer(layer);
    }

    function updateSize() {
        map.updateSize();
    }

    this.addLayer = addLayer;
    this.removeLayer = removeLayer;
    this.addFeaturesList = addFeaturesList;
    this.getQueryableLayers = getQueryableLayers;
    this.getLayer = getLayer;
    this.zoomToExtent = zoomToExtent;
    this.getLayers = getLayers;
    this.clearHighlight = clearHighlight;
    this.getLayersName = getLayersName;
    this.setBaseLayer = setBaseLayer;
    this.updateSize = updateSize;

    map = new OpenLayers.Map(this.map_div, {
            controls: [
		    new OpenLayers.Control.Navigation(),
		    new OpenLayers.Control.PanZoomBar({zoomWorldIcon:true}),
		    new OpenLayers.Control.ScaleLine(),
		    new OpenLayers.Control.MousePosition(),
		    new OpenLayers.Control.KeyboardDefaults(),
		],
             maxResolution: 156543.0339, // set the max resolution
             units: "m", // set the resolution units
             mapExtent: getMapExtent(),
             maxExtent: getMaxExtent(),
             restrictedExtent: getRestrictedExtent() // restrict the extent of the map to India
            }
        );

    addBaseLayers();
    
    if (toolbar_enabled) {
          // Multiple objects can share listeners with the same scope
      var zoomListeners = {
        //"activate": onZoomActivate,
        //"deactivate": onZoomDeactivate
      };

      // create zoomBox control object
      var zb = new OpenLayers.Control.ZoomBox({
        eventListeners: zoomListeners,
        title:"Click and draw a box to zoom into an area"
      });

      // create mouseDefaults(navigation icon) object
      var md = new OpenLayers.Control.MouseDefaults({
        title:'Click on a feature to show information or click and drag to pan'
      });

      // create toolbar panel object
      toolbar = new OpenLayers.Control.Panel({
        defaultControl: md
      });

      // add mouseDefaults and zoomBox controls to the toolbar panel
      toolbar.addControls([
        md,
        zb
      ]);
        
      // add the toolbar panel to map.
      map.addControl(toolbar);

        /*
        var toolbar = 
            new OpenLayers.Control.NavToolbar();
        map.addControl(toolbar);
        */
    }

    if (bbox !== undefined){
        var bb = new OpenLayers.Bounds.fromString(bbox);
        map.zoomToExtent(bb);
    } else {

        // Google.v3 uses EPSG:900913 as projection, so we have to
        // transform our coordinates
        map.setCenter(new OpenLayers.LonLat(77.22, 22.77).transform(
            new OpenLayers.Projection("EPSG:4326"),
            map.getProjectionObject()
            ), 5);
    }

    this.layers = map.layers;
    this.baseLayer = map.baseLayer;


    map.events.register('click', map, layerClicked);
    map.events.register('moveend', map, onZoom);


}
AugmentedMap.prototype = new OpenLayers.Map();

function hasLayer(map, layer) {
    var layers = map.getQueryableLayers();
    
    var f = layers.indexOf(layer) !== -1;
    return f;
}

function getLatLonBBoxString(boundingBoxElement) {
    var minx = boundingBoxElement.getAttribute("minx");
    var miny = boundingBoxElement.getAttribute("miny");
    var maxx = boundingBoxElement.getAttribute("maxx");
    var maxy = boundingBoxElement.getAttribute("maxy");

    var bboxArr = [];
    bboxArr.push(minx);
    bboxArr.push(miny);
    bboxArr.push(maxx);
    bboxArr.push(maxy);

    return bboxArr.join(',');
}

function getBBoxString(boundingBoxElement) {
    var bbox_lower_corner = boundingBoxElement.childNodes[0].childNodes[0].nodeValue;
    var bbox_upper_corner = boundingBoxElement.childNodes[1].childNodes[0].nodeValue;

    var bbox = bbox_lower_corner.replace(" ", ",") +
                "," +
                bbox_upper_corner.replace(" ", ",");

    return bbox;
}

function getLayerKeywords(keywordsElement) {
    var keywords = [];

    if (keywordsElement === undefined)
        return keywords;

    var childNodes = keywordsElement.childNodes;

    for (var i=0; i<childNodes.length; i++) {
        if (childNodes[i].childNodes[0] !== undefined)
            keywords.push(childNodes[i].childNodes[0].nodeValue);
    }

    return keywords;
}

function getLayerInfo_WFS(featureTypeElement) {
    var name;
    var title;
    var bbox;
    var abstrct;
    var keywords = [];

    var childNodes = featureTypeElement.childNodes;

    for (var i=0; i<childNodes.length; i++) {
        if (childNodes[i].nodeName === "Name")
            name = childNodes[i].childNodes[0].nodeValue;
        else if (childNodes[i].nodeName === "Title")
            title = childNodes[i].childNodes[0].nodeValue;
        else if (childNodes[i].nodeName === "Abstract") {
            var abstrct_node = childNodes[i].childNodes[0];
            abstrct = (abstrct_node !== undefined)?abstrct_node.nodeValue:'';
        }
        else if (childNodes[i].nodeName === "ows:WGS84BoundingBox")
            bbox = getBBoxString(childNodes[i]);
        else if (childNodes[i].nodeName === "ows:Keywords")
            keywords = getLayerKeywords(childNodes[i]); 
    }
    
    return {name: name, title: title, bbox: bbox, abstrct: abstrct, keywords: keywords};

}

function getLegendURL(legendURLElement) {

    var childNodes = legendURLElement.childNodes;

    for (var i=0; i<childNodes.length; i++) {
        if (childNodes[i].nodeName === "OnlineResource") {
            var url = childNodes[i].getAttribute("xlink:href");
            return url;
        }
    }

     
}

function getStyleInfo(styleElement) {
    var name;
    var title;
    var abstrct;
    var legendURL;

    var childNodes = styleElement.childNodes;

    for (var i=0; i<childNodes.length; i++) {
        if (childNodes[i].nodeName === "Name")
            name = childNodes[i].childNodes[0].nodeValue;
        else if (childNodes[i].nodeName === "Title") {
            var title_node = childNodes[i].childNodes[0];
            title = (title_node !== undefined)?title_node.nodeValue:'Default';
        } else if (childNodes[i].nodeName === "Abstract") {
            var abstrct_node = childNodes[i].childNodes[0];
            abstrct = (abstrct_node !== undefined)?abstrct_node.nodeValue:'';
        } else if (childNodes[i].nodeName === "LegendURL") {
            legendURL = getLegendURL(childNodes[i]); 
        }

        

    }

    return {name: name, title: title, abstrct: abstrct, legendURL: legendURL};
}

function getLayerInfo_WMS(layerElement) {
    var name;
    var title;
    var bbox;
    var abstrct;
    var keywords = [];
    var styles = [];

    var childNodes = layerElement.childNodes;

    for (var i=0; i<childNodes.length; i++) {
        if (childNodes[i].nodeName === "Name"){
	    if (childNodes[i].childNodes[0] === undefined)
		return;
            name = childNodes[i].childNodes[0].nodeValue;
        }else if (childNodes[i].nodeName === "Title"){
	    if (childNodes[i].childNodes[0] === undefined)
		return;
            title = childNodes[i].childNodes[0].nodeValue;
        }else if (childNodes[i].nodeName === "Abstract") {
            var abstrct_node = childNodes[i].childNodes[0];
            abstrct = (abstrct_node !== undefined)?abstrct_node.nodeValue:'';
        }
        else if (childNodes[i].nodeName === "LatLonBoundingBox")
            bbox = getLatLonBBoxString(childNodes[i]);
        else if (childNodes[i].nodeName === "KeywordList")
            keywords = getLayerKeywords(childNodes[i]); 
        else if (childNodes[i].nodeName === "Style") {
            styles.push(getStyleInfo(childNodes[i]));
        }
    }
    
    return {name: name, title: title, bbox: bbox, abstrct: abstrct, keywords: keywords, styles: styles};

}


function parseWMSCapabilities(responseText) {
    var layers = [];
    var layersArray= responseText.getElementsByTagName("Layer");
   
    for (var i=0; i<layersArray.length; i++) {
	var layer_info = getLayerInfo_WMS(layersArray[i]);
	if (layer_info !== undefined)
        	layers.push(layer_info);
    }

    return layers;
}

function parseWFSCapabilities(responseText) {
    var layers = [];
    var featureTypes = responseText.getElementsByTagName("FeatureType");
   
    for (var i=0; i<featureTypes.length; i++) {
        layers.push(getLayerInfo_WFS(featureTypes[i]));
        
        /*

        var name = responseText.getElementsByTagName("Name")[i].childNodes[0].nodeValue;
        var title = responseText.getElementsByTagName("Title")[i].childNodes[0].nodeValue;
        
        var abstrct_node = responseText.getElementsByTagName("Abstract")[i].childNodes[0];
        var abstrct = (abstrct_node)?abstrct_node.nodeValue:'';

        var bbox = getBBoxString(responseText.getElementsByTagName("ows:WGS84BoundingBox")[i]);
        var keywords = getLayerKeywords(responseText.getElementsByTagName("ows:Keywords")[i]);

        layers.push({
            name: name,
            title: title,
            abstrct: abstrct,
            bbox: bbox
        });
        */
    }

    /*
    var layers = [];
    var data = new OpenLayers.Format.WFSCapabilities().read(responseText);
    
    var featureTypeList = data.featureTypeList;
    var featureTypes = featureTypeList.featureTypes;

    for (var i in featureTypes) {
        layers.push({
            name: 'ibp:' + featureTypes[i].name,
            title: featureTypes[i].title,
            abstrct: featureTypes[i]['abstract']
                });
    }
    */

    return layers;
}

function isEven(value) {
    return (value%2 == 0);
}

function createLinkTableHTML(fid, layer, lnk_table) {
    var entries = getLinkTableEntries(fid, layer, lnk_table);
    var col_names = entries["col_names"];
    var data = entries["data"];

    var html = '<table class="link_table">';

    html = html + '<tr class="header">';
    for (var col_name in col_names) {
        html = html + '<th>' + col_names[col_name] + '</th>';
    }
    html = html + '</tr>';

    for (var i in data) {
        if (isEven(i))
            html = html + '<tr class="even">';
        else
            html = html + '<tr class="odd">';

        for (var col_name in col_names) {
            html = html + '<td>' + data[i][col_name] + '</td>';
            
        }
        html = html + '</tr>';
    }
    html =  html + '</table>';

    return html;
}


function showLinkTable(lnk_table_div, fid, layer, lnk_table, title) {
    var elem = document.getElementById(lnk_table_div);

    if (elem !== undefined && elem.innerHTML === '')
        elem.innerHTML = createLinkTableHTML(fid, layer, lnk_table);

    $( "#" + lnk_table_div ).dialog({show: "fade", hide: "fade", title:title, width:670,minWidth:670, height: 480, modal:true, zIndex: 3999});
}


function getMapThumbnail(layer_tablename) {
    var html = '<div class="map_thumbnail">';
    html = html + '<img src="' + getWMS() + '?service=WMS&version=1.1.0&request=GetMap&layers=' + layer_tablename + '&styles=&bbox=' + getLayerBoundingBoxString(layer_tablename) + '&width=80&height=80&srs=EPSG:4326&format=image/gif&FORMAT_OPTIONS=antialias:none&transparent=true"/>'; 
    html = html + '</div>';

    return html;
}

function processLayerSummary(layer_summary) {
    var html = '<table class="summary_table">';
    

    if (layer_summary['description'] !== '')
        html = html + '<tr><td class="key">Description</td><td class="value">' + layer_summary['layer_description'] + '</td></tr>';

    if (layer_summary['pdf_link'] !== '')
        html = html + '<tr><td class="key">PDF</td><td class="value">' + layer_summary['pdf_link'] + '</td></tr>';

    if (layer_summary['url'] !== '')
        html = html + '<tr><td class="key">URL</td><td class="value">' + layer_summary['url'] + '</td></tr>';

    if (layer_summary['comments'] !== '')
        html = html + '<tr><td class="key">Comments</td><td class="value">' + layer_summary['comments'] + '</td></tr>';

    if (layer_summary['created_by'] !== '')
        html = html + '<tr><td class="key">Created by</td><td class="value">' + layer_summary['created_by'] + '</td></tr>';

    if (layer_summary['created_date'] !== '')
        html = html + '<tr><td class="key">Created date</td><td class="value">' + layer_summary['created_date'] + '</td></tr>';

    if (layer_summary['modified_by'] !== '')
        html = html + '<tr><td class="key">Modified by</td><td class="value">' + layer_summary['modified_by'] + '</td></tr>';

    if (layer_summary['modified_date'] !== '')
        html = html + '<tr><td class="key">Modified date</td><td class="value">' + layer_summary['modified_date'] + '</td></tr>';

    html = html + '</table>';

    return html;
}

function toggleLayerDetails(layer_details_div, layer) {
    
    var layer_tablename = layer.replace(getWorkspace()+':', '');
    var layer_details = getLayerDetails(layer_tablename);
    var layer_summary = getLayerSummary(layer_tablename);
    var layer_summary_table = processLayerSummary(layer_summary);

    document.getElementById(layer_details_div).innerHTML = layer_summary_table + layer_details;

    //$( "#" + layer_details_div ).toggle('fade', 500);
    $( "#" + layer_details_div ).dialog({show: "fade",	hide: "fade", title:layer_summary['layer_name'], width:670,minWidth:670, maxWidth:670,  height: 480, modal:true, zIndex: 3999});

}

function createDownloadBox(divId, layer, isAuthorisedUser) {
    var html = '';
    html = html + '<a style="float:right;" href="#" onclick="hideDownloadBox(\'' + divId + '\')">close</a>';

    if (!isAuthorisedUser) {
    	html = html + '<p><span class="info_msg">You have to login to download this layer</span></p>';
	return html;
    }

    html = html + '<ul class="download_formats_list">';
    //http://localhost:8080/geoserver/ibp/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ibp:lyr_118_india_foresttypes&outputFormat=json
    
    var wfs_url = getWorkspaceOWS() + '?service=WFS&version=1.0.0&request=GetFeature&typeName=' + layer; 
    var kml_url = getWorkspaceWMS() + '/kml?layers=' + layer; 

    html = html + '<li><a href="' + wfs_url+ '" >GML</a></li>';
    html = html + '<!--li><a href="' + kml_url + '" >KML</a></li-->';
    html = html + '<li><a href="' + wfs_url + '&outputFormat=SHAPE-ZIP" >Shape</a></li>';
    html = html + '<li><a href="' + wfs_url + '&outputFormat=csv" >Text</a></li>';
    html = html + '</ul>';
    
    return html;

}

function toggleDownloadBox(divId , layer, isAuthorisedUser) {

    var download_box_div = document.getElementById(divId);

    if (download_box_div !== undefined && download_box_div.innerHTML === '') {
        download_box_div.innerHTML = createDownloadBox(divId, layer, isAuthorisedUser);
    }
    
    $("#" + divId).toggle('fade', 500);

}

function hideDownloadBox(divId) {
    $('#' + divId).hide('fade', 500);
}


function toggleAttribution(divId , layer) {

    var attribution_div = document.getElementById(divId);

    if (attribution_div !== undefined && attribution_div.innerHTML === '') {
        var layer_tablename = layer.replace(getWorkspace()+':', '');
        attribution_div.innerHTML = createAttributionBox(divId, layer_tablename);
    }
    
    $("#" + divId).toggle('fade', 500);
}

function hideAttribution(divId) {
    $('#' + divId).hide('fade', 500);
}

function createKeywordLayersMap(layers) {
    var keywordLayersMap = {};

    for (var i in layers){
        for (var j in layers[i].keywords){
            if (keywordLayersMap[layers[i].keywords[j]] === undefined) {
                keywordLayersMap[layers[i].keywords[j]] = [layers[i].name];
            } else {
                keywordLayersMap[layers[i].keywords[j]].push(layers[i].name);
            }
        }
    }

    return keywordLayersMap;
}

function getAllKeywords(keywordLayersMap) {
    var allKeywords = [];

    for (var key in keywordLayersMap)
        allKeywords.push(key);

    return allKeywords;
}

//XXX
function updateLayersListPanel() {

    var val = document.getElementById('allKeywordsList').value; 
    updateLayersList(val);
}

function updateLayersListByTheme(theme) {
    var layers = document.layers;

    document.getElementById('layers_as_list_panel_title').innerHTML = theme;
    for (var i in layers) {
        var layer = layers[i].name;
        document.getElementById(layer).style.display = 'none';
    }
    
    var layers_by_theme = getLayersByTheme(theme);
    for (var i in layers_by_theme) {
       var layer = getWorkspace() + ":" + layers_by_theme[i];
       var lyr_element = document.getElementById(layer);

       if (lyr_element !== undefined && lyr_element !== null)
            lyr_element.style.display = 'block';
    }
}

function updateLayersList(tag) {
    var layers = document.layers;

    document.getElementById('layers_as_list_panel_title').innerHTML = tag;

    if (tag === 'all') {
        for (var i in layers) {
            var layer = layers[i].name;
            document.getElementById(layer).style.display = 'block';
        }

        return;
    }

    var keywordLayersMap = document.keywordLayersMap;
   
    for (var i in layers) {
        var layer = layers[i].name;
        document.getElementById(layer).style.display = 'none';

    }

    var keyword_layers =  keywordLayersMap[tag];
    for (var i in keyword_layers) {
       var layer = keyword_layers[i];
       document.getElementById(layer).style.display = 'block';
    }
}

function showDiv(divId, effect, duration) {

    var effct = (effect === undefined)?'fade':effect;
    var _duration = (duration === undefined)?500:duration;
    $('#'+divId).show(effct, {direction:'up'}, _duration);
}

function hideDiv(divId, effect, duration) {

    var effct = (effect === undefined)?'fade':effect;
    var _duration = (duration === undefined)?500:duration;
    $('#'+divId).hide(effct, _duration);
}

function toggleDiv(divId, effect) {

    var effct = (effect === undefined)?'slide':effect;
    $('#'+divId).toggle(effct, {direction:'up'}, 500);
}

function createLayerExplorerLinks(layers) {
    document.layers = layers;

    var html = '';
    html = html + '<div id="layer_explorer_sidebar">';
    html = html + '<ul class="layer_explorer_sidebar_items">';

    html = html + '<li><a href="#" onClick="updateLayersList(\'all\')">All layers</a></li>';
    html = html + '<li><div class="collapsible_box"><a class="collapsible_box_title" href="#" onClick="toggleDiv(\'layers_by_theme\', \'fade\'); hideDiv(\'layers_by_geography\', \'fade\', 1);">By theme</a>';
    html = html + '<div id="layers_by_theme">';
    html = html + '<ul class="layer_explorer_sidebar_subitems">';
    var themes = getThemeNames(1);
    for (var i in themes) {
        html = html + '<li><a id="tag_link" href="#" onClick="updateLayersListByTheme(\'' + themes[i] + '\')">' + themes[i] + '</a></li>';

    }
    html = html + '</ul>';
    html = html + '</div></div></li>';
    html = html + '<li><div class="collapsible_box"><a  class="collapsible_box_title" href="#" onClick="toggleDiv(\'layers_by_geography\', \'fade\'); hideDiv(\'layers_by_theme\', \'fade\', 1);">By geography</a>';
    html = html + '<div id="layers_by_geography" style="display:none;">';
    html = html + '<ul class="layer_explorer_sidebar_subitems">';
    var geography = getThemeNames(2);
    for (var i in geography) {
        html = html + '<li><a id="tag_link" href="#" onClick="updateLayersListByTheme(\'' + geography[i] + '\')">' + geography[i] + '</a></li>';

    }

    html = html + '</ul>';
    html = html + '</div></div></li>';

    html = html + '</ul>';
    html = html + '</div>';

    return html;
}

function createAllKeywordsLinks(layers) {
    var keywordLayersMap = createKeywordLayersMap(layers);
    document.keywordLayersMap = keywordLayersMap;
    document.layers = layers;
    var allKeywords = getAllKeywords(keywordLayersMap);

    html = '';
    html = html + '<div id="layer_explorer_sidebar">';
    html = html + '<ul class="layer_explorer_sidebar_items">';

    html = html + '<li><a href="#" onClick="updateLayersList(\'all\')">All layers</a></li>';
    html = html + '<li><a href="#" onClick="toggleDiv(\'layer_themes\')">By theme</a>';
    html = html + '<div id="layer_themes">';
    html = html + '<ul class="layer_explorer_sidebar_subitems">';
    for (var i in allKeywords) {
        html = html + '<li><a id="tag_link" href="#" onClick="updateLayersList(\'' + allKeywords[i] + '\')">' + allKeywords[i] + '</a></li>';

    }
    html = html + '</ul>';
    html = html + '</div></li>';
    html = html + '<li><a href="#" onClick="">By geography</a></li>';
    html = html + '</div>';

    return html;
}

//XXX
function createAllKeywordsCombobox(layers) {
    var keywordLayersMap = createKeywordLayersMap(layers);
    document.keywordLayersMap = keywordLayersMap;
    document.layers = layers;
    var allKeywords = getAllKeywords(keywordLayersMap);

    var html = '';
   
    html = html + '<div class="layer_explorer_topbar">';
    html = html + '<select id="allKeywordsList" onChange="updateLayersListPanel();">';
    for (var i in allKeywords) {
        html = html + '<option value="' + allKeywords[i] + '">' + allKeywords[i] + '</option>';
    }
    html = html + '</select>';
    html = html + '</div>';

    return html;
}

function generateHTMLForLayersAsList(layers, hasMap) {

    var layers_access = getLayersAccessStatus();
    var isAuthorised = isAuthorisedUser();
    
    var html = '';
    
    //var allKeywordsCombobox = createAllKeywordsCombobox(layers);
    //var allKeywordsLinks = createAllKeywordsLinks(layers);
    var layerExplorerLinks = createLayerExplorerLinks(layers);

    //html = html + allKeywordsCombobox;
    //html = html + allKeywordsLinks;
    html = html + layerExplorerLinks;

    html = html + '<div class="info_box">Showing <span id="layers_as_list_panel_title">all</span> layers</div>';

    html = html + '<div id="layers_as_list_panel">';
    html = html + '<ul>';
    for (var i in layers) {
        html = html + '<li id="' + layers[i].name + '" class="layer_in_list_panel">';
        html = html + '<span class="feature_title">' + layers[i].title + '</span>';
        var attribution_div_id = 'layer_attribution_' + i;
        html = html + '<div class="attribution_link" onclick="toggleAttribution(\'' + attribution_div_id + '\', \'' + layers[i].name + '\');"></div>';
        html = html + '<div class="attribution_box" id="' + attribution_div_id + '" style="display:none;"></div>';
        html = html + getMapThumbnail(layers[i].name);
        html = html + '<div id="abstrct"><p>' + layers[i]['abstrct'] + '</p></div>';
        html = html + '<div style="clear:both;">';
        html = html + '<ul class="layer_options">';
        html = html + '<li class="layer_details_link" onclick="toggleLayerDetails(\'layer_details_' + i + '\',\'' + layers[i].name + '\');">details</li>';
        html = html + '<div id="layer_details_' + i + '" style="display:none;" class="layer_details_box"></div>';

        if (layers[i].name !== undefined && layers_access[layers[i].name.replace(getWorkspace()+":", "")]) {
            var layer_download_div = 'layer_download_box_' + i;
            html = html + '<li id=\'' + layer_download_div + '_link\' class="layer_download_link" onclick="toggleDownloadBox(\'' + layer_download_div + '\',\'' + layers[i].name + '\',' + isAuthorised + ');">download</li>';
            html = html + '<div class="layer_download_box" id="' + layer_download_div + '" style="display:none;"></div>';
        }
        html = html + '</ul>';

        html = html + '<ul class="layer_options" style="text-align:right;">';
        //if map component is present add links to add/remove layers
        if (hasMap) { 
            html = html + '<li id=\'' + layers[i].name + '_zoom_to_extent\' class="first zoom_to_extent" onclick="zoomToLayerExtent(\'' + layers[i].name + '\');">zoom to extent</li>';
            html = html + 
                "<li class='add_to_map' id='" +
                layers[i].name +
                "_a_add' href='#' onclick=\"addLayer('" +
                layers[i].name + "', '" +
                layers[i].title +
                "');\">add to map</li>";

            html = html +
                "<li class='remove_from_map' id='" +
                layers[i].name +
                "_a_remove' href='#' onclick=\"removeLayer('" +
                layers[i].name +
                "');\">remove from map</li>";


        }
        html = html + '</ul>';
        html = html + '</div>';
        html = html + '</li>';
    }

    html = html + '</ul>';
    html = html + '</div>';
    html = html + '<div id="layers_list_panel_info_dialog" style="display:none;"></div>';
    
    return html;
}

function getLicenseImage(license) {
    var html = '';
    var lic = license.replace('(', '').replace(')', '');
    html = html + '<div class="license"><a title="Creative Commons License" href="http://creativecommons.org/licenses/'+license['license']+'/3.0/" target="_blank"><img src="http://i.creativecommons.org/l/'+lic+'/3.0/80x15.png"></img></a></div>'
      
    
    return html; 
}

function createAttributionBox(divId, layer) {
    var data = getLayerAttribution(layer);
    var license = data[0];
    var attribution = data[1];

    var html = '';

    html = html + '<a style="float:right;" href="#" onclick="hideAttribution(\'' + divId + '\')">close</a>';
    html = html + '<span style="font-weight:bold;">Attribution</span><br>';
    html = html + '<p>' + attribution + '</p>';

    if (license !== ''){
        html = html + getLicenseImage(license);
    }
    
    return html;
}


function showLayersExplorer(layers_explorer_div, map) {

    function initializeView(layers) {
        for (var i in layers) {
            if (hasLayer(map, layers[i].name)) {
                setElementVisible(layers[i].name + '_a_add', false);
                setElementVisible(layers[i].name + '_a_remove', true);
                setElementVisible(layers[i].name + '_zoom_to_extent', true);
            } else {
                setElementVisible(layers[i].name + '_a_add', true);
                setElementVisible(layers[i].name + '_a_remove', false);
                setElementVisible(layers[i].name + '_zoom_to_extent', false);
            }
        }
    }

    var params = {
        //service: "wfs",
        service: "wms",
        //version: "1.1.0",
        version: "1.1.1",
        request: "getCapabilities"
        };

    window.map = map;


    var xmlhttp = OpenLayers.loadURL(getWorkspaceWMS(), params, null);
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4) {
            var doc = OpenLayers.parseXMLString(xmlhttp.responseText);
            //var layers = parseWFSCapabilities(xmlhttp.responseXML);
            var layers = parseWMSCapabilities(doc);
            window.layers =layers;
            var html = generateHTMLForLayersAsList(layers, map !== undefined);
            document.getElementById(layers_explorer_div).innerHTML = html;
            initializeView(layers);
        }
    }
}

function getFullMapOptions(options) {
    var fullOptions = {

            tiled: options.tiled || false,
            popup_enabled: options.popup_enabled || false,
            toolbar_enabled: options.toolbar_enabled || false,
            bbox: options.bbox,
            feature_info_panel_div: options.feature_info_panel_div,
            features_list_panel_enabled: options.features_list_panel_enabled || false,
            features_list_panel_div: options.features_list_panel_div || 'features_list_panel_div' + (new Date).getTime(),
            features_list_panel_div_css: options.features_list_panel_div_css || 'border:1px solid #999999; width:250px; height:450px; margin-left:auto; margin-right:auto;overflow:auto;margin-top:10px;position:relative; top:-700px; left:500px;',

    };

    return fullOptions;
}

function getWMSLayer(map, layers, styles, title, opacity) {
    var layer = new OpenLayers.Layer.WMS( title,
            getWMS(), 
            {layers:layers,
            format: "image/png",
            styles: styles,
            tiled: true,
            tilesOrigin:map.maxExtent.left + ',' + map.maxExtent.bottom, transparent:true},
            {buffer: 0,
            displayOutsideMaxExtent: true,
            isBaseLayer: false,
            opacity:opacity
            });

    return layer;
}

function getLayers(map, layersOptions) {
    var layersArray = [];

    for (layerNum in layersOptions) {
        var title = layersOptions[layerNum].title;
        var layers = layersOptions[layerNum].layers;
        var styles = layersOptions[layerNum].styles || '';
        var opacity = layersOptions[layerNum].opacity || 0.7;
       
        var layer = getWMSLayer(map, layers, styles, title, opacity);
        layersArray.push(layer);
    }

    return layersArray;
}

// set html element visible or invisible
// id: html element id
// visible: boolean
function setElementVisible(id, visible) {
    var elem = document.getElementById(id);
    elem.style.display = visible ?'inline':'none';
}

function addLayer(layer, title) {
    var map = window.map;
    var wmslayer =  getWMSLayer(map, layer, '', title, 0.7);
    map.addLayer(wmslayer);
    
    setElementVisible(layer + '_a_add', false);
    setElementVisible(layer + '_a_remove', true);
    setElementVisible(layer + '_zoom_to_extent', true);
}

function removeLayer(layer) {
    var map = window.map;
    map.removeLayer(layer);

    setElementVisible(layer + '_a_add', true);
    setElementVisible(layer + '_a_remove', false);
    setElementVisible(layer + '_zoom_to_extent', false);
}

function resetMap() {
    var map = window.map;

    var layers = map.getQueryableLayers();
    for (var i in layers)
        removeLayer(layers[i]);
    
}

function setBaseLayer(layer) {
  var map = window.map;
  var obj = map.getLayersByName(layer);
  map.setBaseLayer(obj[0]);
  map.updateSize();
}

function createBaseLayerSwitcher() {
    var base_layers = ['Google Physical', 'Google Satellite', 'Google Hybrid', 'OpenStreetMap'];

    var html = '<div style="position:absolute;right:20px;top:100px;z-index:2000;">';
    html = html + '<select id="ddlBaseLayer" onchange="setBaseLayer(options[selectedIndex].value)">';
    
    for (var i in base_layers) {
        html = html + '<option value="' + base_layers[i] + '">' + base_layers[i] + '</option>';
    }

    html = html + '</select>';
    html = html + '</div>';
    
    return html;
}

//create a div; add map to the div  
function showMap(map_div, mapOptions, layersOptions) {

    var base_layers_switcher = createBaseLayerSwitcher();
    $('#' + map_div).before(base_layers_switcher);

    var fullOptions = getFullMapOptions(mapOptions);

    var map = new AugmentedMap(map_div, fullOptions);
    var layers = getLayers(map, layersOptions);
    map.addLayers(layers);


    if (fullOptions.features_list_panel_enabled) {
        window.addStyle(fullOptions.features_list_panel_div,
                fullOptions.features_list_panel_div_css);
        document.write("<div id='" + 
                fullOptions.features_list_panel_div + "'></div>");
        
        map.addFeaturesList();
    }

    return map;
}

// to add search box
function addSearchBox(search_box_div) {
    var html = '<div>';
    html = html + '<input type="text" name="search" size="35"/>';
    html = html + '<input type="submit" value="Search" />';
    html = html + '</div>';
    
    document.getElementById(search_box_div).innerHTML = html;
}

function addSearchResultsPanel(search_results_panel_div) {
    var html = '';

    document.getElementById(search_results_panel_div).innerHTML = html;
}

function setLayerStyle(layer, style) {
    var map = window.map;
    var lyr = map.getLayer(layer);
    
    if(lyr == null)
        return;
                  
    lyr.mergeNewParams({
        styles: style
    });

    document.getElementById(layer.replace(":", "_") + '_legend').innerHTML = getLegendGraphic(layer, style);
}

function createLayerStylesPanel(layer) {
    var styles = getLayerStyles(layer);

    var html = 'Style map by <select onchange="setLayerStyle(\'' + layer + '\', value)">';

    for (var key in styles) {
        html = html + '<option value="' + key + '">' + styles[key] + '</option>';
    }

    html = html + '</select>';

    return html;
}

function getLegendGraphic(layer, style) {
    var html = '<img src="' + getWMS() + '?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&transparent=true&LAYER=' + layer + '&style=' + style + '"/>'; 
    return html;
}

function createLegendPanel(layer, style) {
    var html = '<div class="collapsible_box">';
    html = html + '<a class="collapsible_box_title" href="#" class="legend_title" onclick="toggleDiv(\'' + layer.replace(":", "_") + '_legend\')">Legend</a>';
    html = html + '<div id="' + layer.replace(":", "_") + '_legend" style="display:none;">';

    html = html + getLegendGraphic(layer, style); 
    html = html + '</div>';
    html = html + '</div>';

    return html;
}

function toggleLayer(layer, title) {
    if (title == 'highlight')
        return;
    var layer_id = layer.replace(":", "_");
    if (document.getElementById(layer_id + '_checkbox').checked === true) {
        addLayer(layer, title);
        document.getElementById(layer_id + '_layer_properties').style.display = 'block';
    } else {
        removeLayer(layer);
        document.getElementById(layer_id + '_layer_properties').style.display = 'none';
    }
}

function closeLayerPane(layer, selected_layer_div, selected_layers_div) {
    removeLayer(layer);
    $("#" + selected_layer_div).hide('fade', 500);

    var map = window.map;
    var layers = map.getQueryableLayers();
   
    if (layers.length == 0){
	var html = '<p><span class="info_msg">No layers selected</span></p>';
    	document.getElementById(selected_layers_div).innerHTML = html;
    }

}

function setLayerOpacity(layer_id, value) {
    document.getElementById(layer_id.replace(":", "_") + "_slider_value").innerHTML= value + '%';
    var map = window.map;

    var layer = map.getLayer(layer_id);
    layer.setOpacity(value/100);
}

function getLayerTitle(layer) {
    var layers = window.layers;

    for (var i in layers) {
        if (layers[i].name === layer) {
            return layers[i].title;
        }
    }
}

function getLayerBoundingBoxString(layer) {
    var layers = window.layers;

    for (var i in layers) {
        if (layers[i].name === layer) {
            return layers[i].bbox;
        }
    }
}

function getLayerBoundingBox(layer) {
    var layers = window.layers;

    for (var i in layers) {
        if (layers[i].name === layer) {
            return new OpenLayers.Bounds.fromString(layers[i].bbox);
        }
    }
}

function zoomToLayerExtent(layer_tablename) {
    var map = window.map;
    var bbox = getLayerBoundingBox(layer_tablename);
  
    bbox.transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
    map.zoomToExtent(bbox);
}

function updateSharePanel(share_panel_div) {
    var html = '<div class="collapsible_box">';

    html = html + '<a class="collapsible_box_title" href="#" onclick="toggleDiv(\'embeddable_code\', \'fade\')"><span class="bold_bttn">Embed map</span></a> <span class="info_tip">Copy and paste the embed code below to any web page</span>';
    html = html + '<div id="embeddable_code">';
    html = html + '<textarea rows="7" cols="70" style="width:90%;max-width:90%;">';
    html = html + generateEmbeddableMapCode(window.map);
    html = html + '</textarea>';
    html = html + '</div>';
    html = html + '</div>';

    document.getElementById(share_panel_div).innerHTML = html;
}

function getLayerStyles(layer) {

    var styles = {};

    var layers = window.layers;

    for (var i in layers) {
        if (layers[i].name === layer) {
            var s = layers[i].styles;
            for (var j in s) {
                styles[s[j].name] = s[j].title;
            }
        }
    }

    return styles;
}

function updateSelectedLayersPanel(selected_layers_div) {
    var map = window.map;
    var layers = map.getLayers();
    var html = '';

    for (var i in layers) {
        if (!layers[i].isBaseLayer) {
            var selected_layer_div_id = 'selected_layer_' + i;
            html = html + '<div class="selected_layer_pane" id="' + selected_layer_div_id + '">';
            var layer_id = layers[i].params.LAYERS.replace(":", "_");
            html = html + '<input id="' + layer_id + '_checkbox' + '" type="checkbox" checked="yes" onclick="toggleLayer(\'' + layers[i].params.LAYERS + '\', \'' + layers[i].name + '\')"><span class="selected_layer_title">' + layers[i].name + '</span>';
            
            html = html + '<div class="close_button" onclick="closeLayerPane(\'' + layers[i].params.LAYERS + '\',\'' + selected_layer_div_id + '\', \'' + selected_layers_div + '\');"></div>';

            var attribution_div_id = 'selected_layer_attribution_' + i;
            html = html + '<div class="attribution_link" onclick="toggleAttribution(\'' + attribution_div_id + '\', \'' + layers[i].params.LAYERS + '\');"></div>';
            html = html + '<div class="attribution_box" id="' + attribution_div_id + '" style="display:none;"></div>';

            html = html + '<div id="' + layer_id + '_layer_properties" class="selected_layer_properties">';
            html = html + '<ul>';
            html = html + '<li class="first zoom_to_extent" onclick="zoomToLayerExtent(\'' + layers[i].params.LAYERS + '\');">zoom to extent</li>';
            html = html + '<li>opacity <input id="' + layer_id + '_slider" type="range" min="0" max="100" value="' + map.getLayer(layers[i].params.LAYERS).opacity*100 + '" step="10" onchange="setLayerOpacity(\'' + layers[i].params.LAYERS + '\', this.value)"/>';
            html = html + '<span id="' + layer_id + '_slider_value" class="selected_layer_opacity_value">' +  map.getLayer(layers[i].params.LAYERS).opacity*100 + '%</span></li>';
            html = html + '</ul>';
           
            html = html + createLayerStylesPanel(layers[i].params.LAYERS);
            html = html + createLegendPanel(layers[i].params.LAYERS, '');
            html = html + '</div>';

            html = html + '</div>';
        }
    }

    if (map.getQueryableLayers().length == 0){
	html = '<p><span class="info_msg">No layers selected</span></p>';
    }

    document.getElementById(selected_layers_div).innerHTML = html;
}

function getLayerOptionsAsString(layer) {
    var layerOptions = '{title:"' + layer.name + '",' +
                         'layers:"' + layer.params.LAYERS + '",' +
                             'style:""' + ',' +
                             'opacity:' + layer.opacity + '}';
    return layerOptions;
}

function generateEmbeddableMapCode(map) {

    var html = '<div>';
    var map_div = 'map' + new Date().getTime();
    html = html + '<div id="' + map_div + '"></div>';
    html = html + '<style>.olLayerGoogleCopyright {display:none;}</style>';
    html = html + '<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>'; 
    html = html + '<script type="text/javascript" src="' + getWWWBase() + 'OpenLayers-2.10/OpenLayers.js"></script>';
    html = html + '<script type="text/javascript" src="' + getWWWBase() + 'scripts/jquery-1.6.1.min.js"></script>';
    html = html + '<script type="text/javascript" src="' + getWWWBase() + 'scripts/jquery-ui-1.8.13.custom.min.js"></script>'; 
    html = html + '<script type="text/javascript" src="' + getWWWBase() + 'am.js"></script>';
    
    html = html + '<script>';
    html = html + 'var mapOptions = {';
    html = html + 'popup_enabled: true,';
    
    var bbox = map.getExtent().toArray();
    var bbox_str = bbox.join(",")
    html = html + 'bbox:"' + bbox_str + '"';   
    html = html + '};';
   
    var layers = map.getLayers();
    
    html = html + 'var layersOptions = [';
    for (var i in layers) {
        if (!layers[i].isBaseLayer) {
            html = html + getLayerOptionsAsString(layers[i]) + ', '; 
        }
    }
    html = html + '];';

    html = html + 'showMap("' + map_div + '", mapOptions, layersOptions)';
    html = html + '</script>';
    html = html + '</div>';

    return html;

}
