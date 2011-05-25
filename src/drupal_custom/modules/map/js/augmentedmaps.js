jQuery(document).ready(function(){
    $("#layers_drawer").show();
    shift_label("#layers_drawer_handle");
    changeLayerOptions(1);    
    
    $(window).resize(function() {
        $("#map").height($(document).height() - $("#header").height());     
    });

    function shift_label(selector) {
        
        var arr = ["#layers_drawer_handle", "#search_drawer_handle", "#tools_drawer_handle", "#legend_drawer_handle"];

        var right =  $(selector).css("right");

        for (var slctr in arr){
            if (arr[slctr] == selector){
                if (right == "0px"){
                    $(selector).css("right", "340px");
                } else {
                    $(selector).css("right", "0px");
                }
            } else {
                $(arr[slctr]).css("right", "0px");
            }
        }

    }    

    $(".close_drawer").click(function(){
            $(".vertical-label-right").css("right", "0px");
            $(".drawer").hide();
            closeMeasurementTool();
    });

   
    $("#layers_drawer_handle").click(function(){
        $("#tools_drawer").hide();
        $("#legend_drawer").hide();
        $("#search_drawer").hide();
        $("#layers_drawer").toggle();
        shift_label("#layers_drawer_handle");

        var $this = $(this),
        firstClick = $this.data('firstClick');

        if (!firstClick) { 
            changeLayerOptions(1);    
            $this.data('firstClick', true);
        }
    });    

    $("#search_drawer_handle").click(function(){
        $("#layers_drawer").hide();
        $("#tools_drawer").hide();
        $("#legend_drawer").hide();
        $("#search_drawer").toggle();
        shift_label("#search_drawer_handle");

    });    


    $("#tools_drawer_handle").click(function(){
        $("#legend_drawer").hide();
        $("#layers_drawer").hide();
        $("#search_drawer").hide();
        $("#tools_drawer").toggle(function(){
        
            if ($("#tools_drawer").is(":hidden")){
                closeMeasurementTool();
            }
        });
        shift_label("#tools_drawer_handle");

        var $this = $(this),
        firstClick = $this.data('firstClick');

        if (!firstClick) { 
            showMeasurementTool();
            $this.data('firstClick', true);
        }

    });    

    $("#legend_drawer_handle").click(function(){
        $("#layers_drawer").hide();
        $("#tools_drawer").hide();
        $("#search_drawer").hide();
        $("#legend_drawer").toggle();
        shift_label("#legend_drawer_handle");

    });    

    $("#search_form").submit(function(){
        $("#search_results").load("/augmentedmaps/sites/all/modules/map/search.php", {
            search_string:$("#search_string").val()
            }); 
        return false;
    });

    $("#layers_order").click(function(){
        var layers = getLayersChecked().join(",");
        $("#layers_ordering").load("/augmentedmaps/sites/all/modules/map/layer-ordering.php", {
            layers: layers
            });
    });

    $( "#layers_accordion" ).accordion({fillSpace: true});

    $( "#search_accordion" ).accordion({fillSpace: true});

    $( "#tools_accordion" ).accordion({fillSpace: true});

    $( "#legend_accordion" ).accordion({fillSpace: true});

    $("#a-link-to-map").click(function(){
        var url = getCurrentMapURL();
        var txtarea = "<textarea name='map url' cols=30>" + url + "</textarea>";
        $("#link-to-map").html(txtarea);
    });

    $("#link-to-map-refresh").click(function(){
        var url = getCurrentMapURL();
        var txtarea = "<textarea name='map url' cols=30>" + url + "</textarea>";
        $("#link-to-map").html(txtarea);
    });

});

function get_search_ids(layer_tablename) {
    var fids = [];
    for(var i = 0; i < $('#search_results input').length; i++) {
        if ( $('#search_results input')[i].value == layer_tablename &&  $('#search_results input')[i].checked == true){
            fids.push($('#search_results input')[i].name);
        }
    }

    return fids.join(",");
}


function setActiveLayerInfo(obj_layerInfo) {
  var layer_tablename = obj_layerInfo.layer_tablename;
  var layer_name = obj_layerInfo.layer_name;

  // Layer name link
  jQuery('#activeLayer div a')[0].innerHTML = layer_name;
  jQuery(jQuery('#activeLayer div a')[0]).attr("href", "javascript:getLayerMetadata('" + layer_tablename + "');");
}
