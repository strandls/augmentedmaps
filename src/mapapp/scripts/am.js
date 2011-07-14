
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
    var www = 'http://localhost:8080/geoserver/www/';
    return www;
}

// get the wms 
function getWMS() {
    var wms = "http://localhost:8080/geoserver/wms";
    return wms;
}

function getIBPWMS() {
    var wms = "http://localhost:8080/geoserver/ibp/wms";
    return wms;
}

// get the wfs 
function getWFS() {
    var wfs = "http://localhost:8080/geoserver/ibp/wfs";
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
    var url = 'http://localhost:8080/geoserver/ows';
    
    var params = {
        request:'getSummaryColumns',
        service:'amdb',
        version:'1.0.0',
        layer: layer
    };

    var summaryColumns;
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
                summaryColumns = data.split(',');
                return true;
            }
        }
    });

    return summaryColumns;
}

function getColumnTitle(layer, columnName) {
    var url = 'http://localhost:8080/geoserver/ows';
    
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

    this.map_div = map_div;
    // adds google base layers to OpenLayers.Map
    function addBaseLayers() {
        var gphy = new OpenLayers.Layer.Google(
                "Google Physical",
                {type: google.maps.MapTypeId.TERRAIN, numZoomLevels: 12}            
            );
            
        var gsat = new OpenLayers.Layer.Google(
                "Google Satellite",
                {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 12}
            );

        var osm = new OpenLayers.Layer.OSM();

        map.addLayers([gphy, gsat, osm]);
    }

    function addLayer(layer) {
        layer.displayInLayerSwitcher = false;
        map.addLayer(layer);
    }

    function removeLayer(layer_tablename) {
        var layer = getLayer(layer_tablename);

        if (layer !== undefined)
            map.removeLayer(layer);
    }

    function getQueryableLayers() {
        var queryableLayers = [];
        var i;
        for (i in map.layers){
            if (map.layers[i].params !== undefined &&
                    map.layers[i].params.LAYERS !== undefined)
            queryableLayers.push(map.layers[i].params.LAYERS);
        }

        return queryableLayers;
    }

    function getLayer(layer_tablename) {
        for (i in map.layers){
            if (map.layers[i].params !== undefined &&
                    map.layers[i].params.LAYERS !== undefined &&
                    map.layers[i].params.LAYERS === layer_tablename)
                return map.layers[i];
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
        if (popup != null) {
            popup.destroy();
            popup = null;
        }
        popup = new OpenLayers.Popup.FramedCloud("info",
                                        clicked_lonlat,
                                        new OpenLayers.Size(250,120),
                                        text,
                                        null,
                                        true);
        popup.setBackgroundColor("#bcd2ee");
        popup.setOpacity(.9);
        popup.maxSize = new OpenLayers.Size(640,380);
        map.addPopup(popup);
    }

    function addFeatureInfoPanel(feature_info_panel_div, text) {
         document.getElementById(feature_info_panel_div).innerHTML = text;
    }

    function createPopupHTML(response) {
        var featuresList = eval('(' + response.responseText + ')');
        
        var html = '';

        var lyr;

        for (var i in featuresList) {
            var summaryColumns = getSummaryColumns(featuresList[i].layer);
            //if (lyr !== featuresList[i].layer) {
            //    lyr = featuresList[i].layer;
            //    html = html + "<h3>" + lyr  + "</h3>";
            //}

            html = html + '<table class="popup_table">';
            for (var j in summaryColumns) {
                var summaryColumn = summaryColumns[j].replace(/'/g, ""); 
                var title = getColumnTitle(featuresList[i].layer, 
                        summaryColumn);
                var value = featuresList[i][summaryColumn];
                html = html + '<tr><td class="first"><span class="popup_item_key">' + title + '</span></td><td><span class="popup_item_value">' + value + "</span></td></tr>";        
            }
            html = html + '</table>';
        }
        return html;
    }

    function createInfoPanelHTML(response) {
        var featuresList = eval('(' + response.responseText + ')');
        
        var html = '';

        for (var i in featuresList) {
            var summaryColumns = getSummaryColumns(featuresList[i].layer);

            html = html + "<b>" + featuresList[i].layer  + "</b>" + "<br>"
            $.each(featuresList[i], function(key, value) {
                    if (key == 'layer' || key == 'id')
                        return;
                        
                    var title = getColumnTitle(featuresList[i].layer, key);
                    html = html + title + ":" + value + "<br>";
                    });
            

        }
        return html;
    }


    function setHTML(response) {

        if (popup_enabled) 
            addPopup(createPopupHTML(response));
        

        if (feature_info_panel_div !== undefined)
            addFeatureInfoPanel(feature_info_panel_div,
                    createInfoPanelHTML(response));
    }

    function layerClicked(e) {
        clicked_lonlat = map.getLonLatFromPixel(e.xy);

        var params = {
	    REQUEST: "GetFeatureInfo",
	    EXCEPTIONS: "application/vnd.ogc.se_xml",
	    BBOX: map.getExtent().toBBOX(),
	    SERVICE: "WMS",
	    VERSION: "1.1.1",
	    X: e.xy.x,
	    Y: e.xy.y,
	    INFO_FORMAT: 'text/html',
	    QUERY_LAYERS: getQueryableLayersAsString(),
	    LAYERS: getQueryableLayersAsString(),
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
    }

    this.addLayer = addLayer;
    this.removeLayer = removeLayer;
    this.addFeaturesList = addFeaturesList;
    this.getQueryableLayers = getQueryableLayers;
    this.getLayer = getLayer;
    this.zoomToExtent = zoomToExtent;

    map = new OpenLayers.Map(this.map_div, {
            controls: [
		    new OpenLayers.Control.Navigation(),
		    new OpenLayers.Control.PanZoomBar({zoomWorldIcon:true}),
		    new OpenLayers.Control.LayerSwitcher(),
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
    var attr = boundingBoxElement.attributes;
    var bboxArr = [];
    for (var i in attr)
        bboxArr.push(attr[i].value);

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
        if (childNodes[i].nodeName === "Name")
            name = childNodes[i].childNodes[0].nodeValue;
        else if (childNodes[i].nodeName === "Title")
            title = childNodes[i].childNodes[0].nodeValue;
        else if (childNodes[i].nodeName === "Abstract") {
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
        layers.push(getLayerInfo_WMS(layersArray[i]));
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

function getMapThumbnail(layer_tablename) {
    var html = '<div class="map_thumbnail">';
    html = html + '<img src="' + getWMS() + '?service=WMS&version=1.1.0&request=GetMap&layers=' + layer_tablename + '&styles=&bbox=68.106,6.76,97.415,37.074&width=80&height=80&srs=EPSG:4326&format=image/png&transparent=true"/>'; 
    html = html + '</div>';

    return html;
}

function showLayerDetails() {

    $( "#layer_details_dialog" ).dialog({
            height: 400,
            width: 640,
            modal: true
    });
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

function updateLayersList(tag) {
    var layers = document.layers;

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

function toggleDiv(divId, effect) {

    var effct = (effect === undefined)?'slide':effect;
    $('#'+divId).toggle(effct, {direction:'up'}, 500);
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
    var html = '';
    
    //var allKeywordsCombobox = createAllKeywordsCombobox(layers);
    var allKeywordsLinks = createAllKeywordsLinks(layers);

    //html = html + allKeywordsCombobox;
    html = html + allKeywordsLinks;

    html = html + '<div id="layers_as_list_panel">';
    html = html + '<ul>';
    for (var i in layers) {
        html = html + '<li id="' + layers[i].name + '" class="layer_in_list_panel">';
        html = html + '<h3>' + layers[i].title + '</h3>';
        html = html + getMapThumbnail(layers[i].name);
        html = html + '<div id="abstrct"><p>' + layers[i]['abstrct'] + '</p></div>';
        html = html + '<div style="clear:both;">';
        html = html + '<ul class="layer_options">';
        html = html + '<li class="first"><a href="#" onclick="showLayerDetails();">details</a></li>';

        //if map component is present add links to add/remove layers
        if (hasMap) { 
            html = html + '<li>';
            html = html + 
                "<a id='" +
                layers[i].name +
                "_a_add' href='#' onclick=\"addLayer('" +
                layers[i].name + "', '" +
                layers[i].title +
                "');\">add to map</a>";

            html = html +
                "<a id='" +
                layers[i].name +
                "_a_remove' href='#' onclick=\"removeLayer('" +
                layers[i].name +
                "');\">remove from map</a>";

            html = html + '</li>';

        }
        html = html + '</ul>';
        html = html + '</div>';
        html = html + '</li>';
    }

    html = html + '</ul>';
    html = html + '</div>';
    
    return html;
}

function showLayersExplorer(layers_explorer_div, map) {

    function initializeView(layers) {
        for (var i in layers) {
            if (hasLayer(map, layers[i].name)) {
                setElementVisible(layers[i].name + '_a_add', false);
                setElementVisible(layers[i].name + '_a_remove', true);
            } else {
                setElementVisible(layers[i].name + '_a_add', true);
                setElementVisible(layers[i].name + '_a_remove', false);
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

    var xmlhttp = OpenLayers.loadURL(getIBPWMS(), params, null);
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
}

function removeLayer(layer) {
    var map = window.map;
    map.removeLayer(layer);

    setElementVisible(layer + '_a_add', true);
    setElementVisible(layer + '_a_remove', false);
}

//create a div; add map to the div  
function showMap(map_div, mapOptions, layersOptions) {

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
    html = html + '<div id="' + layer.replace(":", "_") + '_legend">';

    html = html + getLegendGraphic(layer, style); 
    html = html + '</div>';
    html = html + '</div>';

    return html;
}

function toggleLayer(layer, title) {
    var layer_id = layer.replace(":", "_");
    if (document.getElementById(layer_id + '_checkbox').checked === true) {
        addLayer(layer, title);
        document.getElementById(layer_id + '_layer_properties').style.display = 'block';
    } else {
        removeLayer(layer);
        document.getElementById(layer_id + '_layer_properties').style.display = 'none';
    }
}

function setLayerOpacity(layer_id, value) {
    document.getElementById(layer_id.replace(":", "_") + "_slider_value").innerHTML= value + '%';
    var map = window.map;

    var layer = map.getLayer(layer_id);
    layer.setOpacity(value/100);
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
    var layers = map.layers;
    var html = '';

    for (var i in layers) {
        if (!layers[i].isBaseLayer) {
            html = html + '<div class="selected_layer_pane">';
            var layer_id = layers[i].params.LAYERS.replace(":", "_");
            html = html + '<input id="' + layer_id + '_checkbox' + '" type="checkbox" checked="yes" onclick="toggleLayer(\'' + layers[i].params.LAYERS + '\', \'' + layers[i].name + '\')"><span class="selected_layer_title">' + layers[i].name + '</span><br>';
            html = html + '<div id="' + layer_id + '_layer_properties" class="selected_layer_properties">';
            html = html + '<ul>';
            html = html + '<li class="first" id="zoom_to_extent"><span class="zoom_to_extent_link"><a href="#" onclick="zoomToLayerExtent(\'' + layers[i].params.LAYERS + '\');">Zoom to extent</a></span></li>';
            html = html + '<li>Opacity <input id="' + layer_id + '_slider" type="range" min="0" max="100" value="' + map.getLayer(layers[i].params.LAYERS).opacity*100 + '" step="10" onchange="setLayerOpacity(\'' + layers[i].params.LAYERS + '\', this.value)"/>';
            html = html + '<span id="' + layer_id + '_slider_value" class="selected_layer_opacity_value">' +  map.getLayer(layers[i].params.LAYERS).opacity*100 + '%</span></li>';
            html = html + '</ul>';
           
            html = html + createLayerStylesPanel(layers[i].params.LAYERS);
            html = html + createLegendPanel(layers[i].params.LAYERS, '');
            html = html + '</div>';

            html = html + '</div>';
        }
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
   
    var layers = map.layers;
    
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
