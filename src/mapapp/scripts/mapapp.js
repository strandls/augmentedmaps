$(function() {

    $(window).resize(function() {
        $("#main_wrapper").height($(document).height() - 110);     
    });

    $( "#panel_show_bttn" ).click(function() {
            $("#panel_hide_bttn").css('display', 'block');
            $("#panel_show_bttn").css('display', 'none');
            $("#panel").show( "slide", {}, 500);
            return false;
    });

    $( "#panel_hide_bttn" ).click(function() {
            $("#panel").hide( "slide", {}, 500, function() {
                $("#panel_hide_bttn").css('display', 'none');
                $("#panel_show_bttn").css('display', 'block');
            });
            return false;
    });
    
    $("#explore_bttn").click(function() {
	$(".side_panel").hide();
        $("#layers_list_panel").fadeIn(500);
        return false;
    });

    $("#search_bttn").click(function() {
	$(".side_panel").hide();
        $("#search_panel").fadeIn(500);    
        return false;
    });

    $("#share_bttn").click(function() {
        updateSharePanel('share_panel');
	$(".side_panel").hide();
        $("#share_panel").fadeIn(500);    
        return false;
    });

    $("#selected_layers_bttn").click(function() {
        updateSelectedLayersPanel('selected_layers_panel');
	$(".side_panel").hide();
        $("#selected_layers_panel").fadeIn(500);    
        return false;
    });

});

