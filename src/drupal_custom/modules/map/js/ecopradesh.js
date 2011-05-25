//commented after adding support for config.xml and moved to readconfig.php 
 //	var DEFAULT_LAYERTREE_OPT = 1;

var SEARCH_OPT = 4;
var VALIDATION_TAB_OPT = 5;

var NO_PARTICIPATION = 0;
var RESTRICTED_PATICIPATION = 1;
var PUBLIC_PARTICIPATION = 2;
var SANDBOX_PARTICIPATION = 3;

var user_id;

var flashPopupSize = new Array();
flashPopupSize['layerSelectPane'] = new Object();
flashPopupSize['layerOrderPane'] = new Object();

jQuery(document).ready(function(){
  calculate();

  jQuery(window).wresize(function(){
    calculate();
  });

  jQuery(".mapPane").draggable({handle: ".dragHandle"});
  jQuery(".resizeablePane").resizable({
    alsoResize: jQuery(this).attr("id") + " .displayPane",
    minWidth: 200,
    minHeight: 200
  });
  jQuery("#layerSelectPane").resizable({
    alsoResize: "#fLayerSelector",
    minWidth: 530,
    minHeight: 260,
    resize: function(event, ui) {
      flashPopupSize['layerSelectPane'].width = jQuery("#layerSelectPane").width();
      flashPopupSize['layerSelectPane'].height = jQuery("#layerSelectPane").height();
    }
  });
  
  flashPopupSize['layerSelectPane'].width = jQuery("#layerSelectPane").width();
  flashPopupSize['layerSelectPane'].height = jQuery("#layerSelectPane").height();

  jQuery("#layerOrderPane").resizable({
    alsoResize: "#fLayerOrdering",
    minWidth: 300,
    minHeight: 200,
    resize: function(event, ui) {
      flashPopupSize['layerOrderPane'].width = jQuery("#layerOrderPane").width();
      flashPopupSize['layerOrderPane'].height = jQuery("#layerOrderPane").height();
    }
  });

  flashPopupSize['layerOrderPane'].width = jQuery("#layerOrderPane").width();
  flashPopupSize['layerOrderPane'].height = jQuery("#layerOrderPane").height();

  jQuery("#fLayerSelector").css("height",(jQuery("#fLayerSelector").parent().height()-60));
  jQuery("#fLayerOrdering").css("height",(jQuery("#fLayerOrdering").parent().height()-60));

  //jQuery('#dataButton').show();
  jQuery("#ulLayerOrder").sortable();

  /**
  jQuery("#layerData-1").click(function(){
    jQuery("#dataOnDemand").toggle(400);
    if(jQuery("#dataButton").css("display") == 'none') {
      jQuery("#dataAlert")[0].innerHTML = 'Click here to view data';
    }else{
      jQuery("#dataAlert")[0].innerHTML = 'Click here to hide data';
    }

    jQuery("#dataButton").toggle();
    jQuery("#dataButton1").toggle();
  });
  **/

  /**
  jQuery("#layerOrderingControl").click(function(){
    jQuery(document).ready(function(){
      jQuery("#layerOrdering").toggle(400);
    });
  });
  **/
  
  jQuery("#layerSelect-1").click(function(){
    toggleFlashPopup("layerSelectPane");
  });

  jQuery("#layerSelect-2").click(function(){
    hideFlashPopup("layerSelectPane");
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

  jQuery("#layerOrder-1").click(function(){
    toggleFlashPopup("layerOrderPane");
  });

  jQuery("#layerOrder-2").click(function(){
    hideFlashPopup("layerOrderPane");
  });

  /*
  jQuery("#layerOrderingCloseButton").click(function(){
    jQuery("#layerOrdering").toggle(400);
  });
  */

  jQuery("#login").click(function(){
    jQuery("#userLogin").toggle(400);
  });

  jQuery("#loginCloseButton").click(function(){
    jQuery("#userLogin").hide(400);
  });

  jQuery("#closeMessage").click(function(){
    jQuery("#messages").hide(400);
  });

  // open / close movable panes

  jQuery(".mapControl").click(function(){
    control = jQuery(this).attr("id") + "";
    jQuery(this).blur();
    control = control.substring(0,(control.length - 2));
    jQuery("#" + control + "Pane").toggle(400);
    return false;
  });

  if(!jQuery.cookie('layerOptions')) {
    jQuery.cookie('layerOptions', DEFAULT_LAYERTREE_OPT);
    jQuery('#layerOption'+DEFAULT_LAYERTREE_OPT).addClass('selected');
  }

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

  //download layer
  jQuery("#downloadLayer").click(function(){
       getDownloadFormats();
  });
  
  // Open explorMap in a new window
  jQuery("a.exploreMap").click(function(){
	window.open(this.href);  
	return false; 
  });
  
 });

var resetTreeView = function() {
  //jQuery.cookie('layerOptions', 1);
  //jQuery('#layerOption1').addClass('selected');

  jQuery.cookie('layersChecked', null, {expires: -1});

  /*
  jQuery.cookie('themeTree1', null, {expires: -1});

  jQuery.cookie('themeTree2', null, {expires: -1});

  changeLayerOptions(DEFAULT_LAYERTREE_OPT);
  */
	if(FABridge.FAB_LayerSelector) {
		var f_LayerSelector = FABridge.FAB_LayerSelector.root();
		f_LayerSelector.reset();
	} else {
		alert("Error connecting to the Layer Selector interface.");
	}
}

var calculate = function() {
  var minMapAreaHeight = 400;
  var minToolbarWidth = 500;
  var minMainWidth = 600;

  var mapAreaHeight = jQuery(window).height() - 102;
  if(mapAreaHeight < minMapAreaHeight) {
    mapAreaHeight = minMapAreaHeight;
  }

  var toolbarWidth = jQuery(window).width() - 400;
  if(toolbarWidth < minToolbarWidth) {
    toolbarWidth = minToolbarWidth;
  }

  var mainWidth = jQuery(window).width() - 270;
  if(mainWidth < minMainWidth) {
    mainWidth = minMainWidth;
  }

  // Assign them
  jQuery("#map").css("height",mapAreaHeight);
  jQuery("#mapToolbar").css("width", toolbarWidth);
  jQuery("#main").css("width", mainWidth);

  // Only for the home page
  if(jQuery(window).width() > 1000) {
	jQuery("#homeContent").css("width",(jQuery(window).width() - 530));
  }
  else {
	jQuery("#homeContent").css("width", 500);
  }

  // Position various floatable panes
  jQuery("#layerSelectPane").css("right", (toolbarWidth - 435));

  // Set the heights of the display panes
  jQuery(".mapPane .displayPane").each(function(){
    jQuery(this).css("height",(jQuery(this).parent().height()-60));
  });

}
var prevopt ='';
function changeLayerOptions(opt,reload) {
  if ( opt == null) {
    opt = DEFAULT_LAYERTREE_OPT;
  }
  /*
  for(i = 1; i < 5; i++) {
    jQuery('#layerOption'+i).removeClass("selected");
  }
  */
  jQuery("#layerGroupType").find("li").removeClass("selected");

  jQuery('#layerOption'+opt).addClass("selected");

  if (opt == SEARCH_OPT || opt == VALIDATION_TAB_OPT) {
    jQuery.cookie('layerOptions', DEFAULT_LAYERTREE_OPT);
  } else {
    jQuery.cookie('layerOptions', opt);
  }

  if (prevopt == '') {
    prevopt = opt;
  }

  if (opt == SEARCH_OPT) {
    jQuery("#search").css("display",'block');
    search_data(null, prevopt, opt);
    jQuery('#btn_contribute').css("display","none");
    jQuery('#downloadLayer').css("display","none");
  } else if (opt == VALIDATION_TAB_OPT) {
      jQuery("#search").css("display",'none');
      ShowLayersForValidation(prevopt,opt);
      if(user_id) {
        jQuery('#btn_contribute').css("display","block");
      }
      jQuery('#downloadLayer').css("display","none");
  } else if (opt == 1 || opt == 2 || opt == 3 || opt == 6) {
    jQuery("#search").css("display",'none');
    getCategory(prevopt,opt);
    if(user_id) {
      jQuery('#btn_contribute').css("display","block");
    }
    jQuery('#downloadLayer').css("display","block");
  }
  if (prevopt != opt) {
    prevopt = opt;
  }
}

function showModalPopup(inrHTML, dialogTitle, onCloseCallback, callbackArgs) {
  var lft = tp = ht = wd = 0;
  var mp = jQuery('#map');
  ht = mp.height() * 0.8;
  wd = mp.width() * 0.85;
  lft = mp.offset().left + ((mp.width()-wd)/2);
  tp = mp.offset().top + ((mp.height()-ht)/2);
  jQuery("#divModalPopup").html(inrHTML);
  jQuery("#divModalPopup").dialog({
    modal: true,
    overlay: {
      opacity: 0.5,
      background: "black"
    },
    zIndex: 2001,
    minheight: '275px',
    minwidth: '600px',
    height: ht+'px',
    width: wd+'px',
    maxHeight: ht+'px',
    maxWidth: wd+'px',
    position: [lft, tp],
    title: dialogTitle,
    close: function() {
      jQuery("#divModalPopup").empty();
      if(onCloseCallback) {
        onCloseCallback(callbackArgs);
      }
    },
    resize: onModalPopupResize
  });
  onModalPopupResize();
  jQuery("#divModalPopup").linkize();
}

function onModalPopupResize() {
  var ht = jQuery("#divModalPopup").height();
  jQuery("#detailsPane")[0].style.minHeight = (ht - 23) + 'px';
  jQuery("#divPopupPane")[0].style.minHeight = (ht - 67) + 'px';
}

function showAjaxLinkPopup(url, title, callbackOnClose, callbackArgs) {

  blockUI();
  lnk = url;
  jQuery.ajax({
    url: lnk,
    type: 'GET',
    //dataType: 'xml',
    //data: var_data,
    //timeout: 1000,
    error: function(request,err) {
      //console.log(err);
      jQuery.unblockUI();
      alert('Error loading document');
    },
    success: function(resp){
      if(jQuery("#divModalInfo").length > 0) {
        jQuery("#divModalInfo").remove();
      }
      jQuery("body").append("<div id='divModalInfo'></div>");
      jQuery("#divModalInfo").html(resp);
      var lft = tp = ht = wd = 0;
      var mp = jQuery('#map');
      ht = mp.height() * 0.6;
      wd = mp.width() * 0.7;
      lft = mp.offset().left + ((mp.width()-wd)/2);
      tp = mp.offset().top + ((mp.height()-ht)/2);
      jQuery("#divModalInfo").dialog({
        modal: true,
        overlay: {
          opacity: 0.5,
          background: "black"
        },
        height: ht+'px',
        width: wd+'px',
        maxHeight: ht+'px',
        maxWidth: wd+'px',
        position: [lft, tp],
        title: title,
        close: function() {
          jQuery("#divModalInfo").remove();
          if(callbackOnClose) {
            callbackOnClose(callbackArgs);
          }
        }
      });
      //jQuery("#divModalInfo").siblings().find(".ui-dialog-title").html(title);
      jQuery("#divModalInfo").linkize();
      jQuery.unblockUI();
      //showModalPopup(resp);
    }
  });
}

function reloadParentTab(args) {
  ul_ID = args[0];
  eval((jQuery("#"+ul_ID).find(".active")[0].firstChild.href).substring(11));
}

function toggleFlashPopup(divID) {
  var curZ = parseInt(jQuery("#"+divID).css("z-index"));
	if(curZ < 1000) {
  /*if(jQuery("#"+divID).width() == 0 || jQuery("#"+divID).height() == 0) {*/
		showFlashPopup(divID);
	} else {
		hideFlashPopup(divID);
	}
}

function showFlashPopup(divID, z_delta) {
	if(z_delta == null) {
		z_delta = 2000;
	}
	var curZ = parseInt(jQuery("#"+divID).css("z-index"));
	jQuery("#"+divID).css("z-index", curZ + z_delta);
  /*
  jQuery("#"+divID).width(flashPopupSize[divID].width);
  jQuery("#"+divID).height(flashPopupSize[divID].height);
  */
}

function hideFlashPopup(divID, z_delta) {
	if(z_delta == null) {
		z_delta = 2000;
	}
	var curZ = parseInt(jQuery("#"+divID).css("z-index"));
  if(curZ < 1000) {
    return;
  }
	jQuery("#"+divID).css("z-index", curZ - z_delta);
  /*
  jQuery("#"+divID).width(0);
  jQuery("#"+divID).height(0);
  */
}

function minimizeFlashPopup(divID, alsoResize) {
  jQuery("#" + divID).height(25);
  jQuery("#" + divID).resizable('disable');
  jQuery("#" + alsoResize).height(0);
}

function maximizeFlashPopup(divID, height, alsoResize) {
  jQuery("#" + divID).height(height);
  jQuery("#" + divID).resizable('enable');
  jQuery("#" + alsoResize).parent().height("100%");
  jQuery("#" + alsoResize).height(jQuery("#" + alsoResize).parent().height()-60);
}

function addLayerOrderingElemAtTop(id, label) {
	var obj = new Object();
	obj.id = id;
	obj.label = label;
	if(FABridge.FAB_LayerOrdering) {
		var fLayerOrdering = FABridge.FAB_LayerOrdering.root();
		fLayerOrdering.addItemAt(0, obj);
	} else {
		alert("Error connecting to the Layer Ordering interface.");
	}
}

function removeLayerOrderingElem(id, label) {
	var obj = new Object();
	obj.id = id;
	obj.label = label;
	if(FABridge.FAB_LayerOrdering) {
		var fLayerOrdering = FABridge.FAB_LayerOrdering.root();
		fLayerOrdering.removeItem(obj);
	} else {
		alert("Error connecting to the Layer Ordering interface.");
	}
}

function clearLayerOrdering() {
	if(FABridge.FAB_LayerOrdering) {
		var fLayerOrdering = FABridge.FAB_LayerOrdering.root();
		fLayerOrdering.clear();
	} else {
		alert("Error connecting to the Layer Ordering interface.");
	}
}

function getFlashAppAddScript(src, id, flashvars) {
  var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
  var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
  var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

  var embd = '';
  if (isIE && isWin && !isOpera) {
    // For IE, use object
    embd = '<object id="' + id + '" name="' + id + '"';
    embd += ' width="100%" height="100%"';
    embd += ' codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab"';
    embd += ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">';
    embd += ' <param name="movie" value="' + src + '" />';
    embd += ' <param name="quality" value="high" />';
    embd += ' <param name="bgcolor" value="#869ca7" />';
    embd += ' <param name="allowScriptAccess" value="sameDomain" />';
    if(flashvars != null) {
      embd += ' <param name="FlashVars" value="'+flashvars+'" />';
    }
    embd += ' <param name="wmode" value="transparent" />';
    embd += '</object>';
  } else {
    // For other browsers, user embed
    embd = '<embed id="' + id + '" name="' + id + '"';
    embd += ' width="100%" height="100%"';
    embd += ' src="' + src + '"';
    embd += ' quality="high" bgcolor="#869ca7"';
    embd += ' align="middle"';
    embd += ' play="true"';
    if(flashvars != null) {
      embd += ' FlashVars="'+flashvars+'"';
    }
    embd += ' loop="false"';
    embd += ' quality="high"';
    embd += ' allowScriptAccess="sameDomain"';
    embd += ' type="application/x-shockwave-flash"';
    embd += ' pluginspage="http://www.adobe.com/go/getflashplayer"';
    embd += ' wmode="transparent"';
    embd += ' >';
    embd += '</embed>';
  }

  document.write(embd);
}