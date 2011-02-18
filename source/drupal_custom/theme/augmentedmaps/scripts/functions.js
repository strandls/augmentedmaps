var DEFAULT_LAYERTREE_OPT = 1;
var SEARCH_OPT = 4;
var VALIDATION_TAB_OPT = 5;

var NO_PARTICIPATION = 0;
var RESTRICTED_PATICIPATION = 1;
var PUBLIC_PARTICIPATION = 2;
var SANDBOX_PARTICIPATION = 3;

var user_id;

function setMainDivSize() {
  var minMainWidth = 600;

  var mainWidth = jQuery(window).width() - 270;
  if(mainWidth < minMainWidth) {
    mainWidth = minMainWidth;
  }

  jQuery("#main").css("width", mainWidth);
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

var resetTreeView = function() {
  //jQuery.cookie('layerOptions', 1);
  //jQuery('#layerOption1').addClass('selected');

  jQuery.cookie('layersChecked', null, {expires: -1});

  jQuery.cookie('themeTree1', null, {expires: -1});

  jQuery.cookie('themeTree2', null, {expires: -1});

  changeLayerOptions(DEFAULT_LAYERTREE_OPT);
  /*
	if(FABridge.FAB_LayerSelector) {
		var f_LayerSelector = FABridge.FAB_LayerSelector.root();
		f_LayerSelector.reset();
	} else {
		alert("Error connecting to the Layer Selector interface.");
	}
  */
}

function showModalPopup(inrHTML, dialogTitle, onCloseCallback, callbackArgs) {
  var lft = tp = ht = wd = 0;
  var mp = jQuery('#map');
  if(mp.length == 0) {
    ht = 400;
    wd = 600;
    lft = 100;
    tp = 100;
  } else {
    ht = mp.height() * 0.8;
    wd = mp.width() * 0.85;
    lft = mp.offset().left + ((mp.width()-wd)/2);
    tp = mp.offset().top + ((mp.height()-ht)/2);
  }

  modalPopup(inrHTML, dialogTitle, ht, wd, lft, tp, onCloseCallback, callbackArgs);
}

function modalPopup(inrHTML, dialogTitle, ht, wd, lft, tp, onCloseCallback, callbackArgs, divID, isModal) {
  if(isModal == null) {
    isModal = true;
  }
  if(divID == null) {
    divID = "divModalPopup";
  }
  var divModalPopup = jQuery("#" + divID);
  divModalPopup.html(inrHTML);
  divModalPopup.dialog({
    modal: isModal,
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
      divModalPopup.empty();
      if(onCloseCallback) {
        onCloseCallback(callbackArgs);
      }
    },
    resize: onModalPopupResize
  });
  onModalPopupResize();
  divModalPopup.linkize();
}

function onModalPopupResize(ht) {
  /*
  var mp = jQuery('#map');
  if(mp.length == 0) {
    ht = 400;
  } else {
    ht = mp.height() * 0.8;
  }
  */
  var divModalPopup = jQuery('#divModalPopup');
  ht = divModalPopup.height();
  jQuery("#detailsPane").height(ht - 23);
  //jQuery("#divPopupPane").height(ht - 67);
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
	var curZ = parseInt(jQuery("#"+divID).css("z-index"));
  if(curZ < 0) {
    return;
  }
	jQuery("#"+divID).css("zIndex", -1);
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

function addLayerOrderingElemAtTop(id, label, p_nid,extent,access) {
	var obj = new Object();
	obj.id = id;
	obj.label = label;
  	obj.p_nid = p_nid;
  	obj.extent = extent;
  	obj.access = (access == 0) ? 'N' : 'Y';


  	//alert(obj.access);
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
    if(jQuery("#li" + id).find("input").length > 0) {
      jQuery("#li" + id).find("input")[0].checked = false;
    }
	} else {
		alert("Error connecting to the Layer Ordering interface.");
	}
}

function clearLayerOrdering() {
	if(FABridge.FAB_LayerOrdering) {
		var fLayerOrdering = FABridge.FAB_LayerOrdering.root();
		fLayerOrdering.clear();
	}/* else {
		alert("Error connecting to the Layer Ordering interface.");
	}*/
}

function showCharts(layer_tablename, title, infotype, row_id, divid) {
  var flashVars = "";
  flashVars += 'basePath='+base_path;
  flashVars += '&dataFile=ml_data.php';
  flashVars += '&layer_name=' + title;
  flashVars += '&layer_tablename=' + layer_tablename;
  if(infotype == "row") {
    flashVars += '&infotype=row';
    flashVars += '&row_id=' + row_id;
  } else {
    flashVars += '&infotype=layer';
  }

  var src = base_path + "ml_charts/ml_charts.swf";

  var embd = getFlashAppAddScript(src, "fLayerCharts", flashVars);

  if(divid == null) {
    showModalPopup(embd);
  } else {
    jQuery("#"+divid).html(embd);
  }
}


function changeDivWidth(val) {    
  if(val == 0) {// change width to original values    
    jQuery('#divMultiLayerSearchPopup').parent().parent().width(500);
    jQuery('#divMultiLayerSearchPopup').parent().width(500);
    jQuery('#divMultiLayerSearchPopup').width(468);
  } else { //change width to higher values  
  jQuery('#divMultiLayerSearchPopup').parent().parent().width(800);
  jQuery('#divMultiLayerSearchPopup').parent().width(800);
  jQuery('#divMultiLayerSearchPopup').width(768);  
  }
}
//called from flash, depending upon the tab - the variable is set for feature popup to show or not.
/*function setFeatureClick(val) {
  if(val == 0)
    isMultiLayerSearchON = false;
  else
    isMultiLayerSearchON = true;
}*/
function getLayersChecked() {
  return layersChecked;
}
function mls_addFeatureid(val, ltname) {

  if(FABridge.FAB_MultiLayerSearch) {
      var f_MultiLayerSearch = FABridge.FAB_MultiLayerSearch.root();
      f_MultiLayerSearch.addFeatureid(val, ltname);
    } else {
      alert("Error connecting to the Multi Layer Search interface");
    }
}
function mls_getSearchIds(layer_tablename) {
  var searchids = "";
  if(FABridge.FAB_MultiLayerSearch) {
    var f_MultiLayerSearch = FABridge.FAB_MultiLayerSearch.root();
    searchids = f_MultiLayerSearch.getSearchIds(layer_tablename);
  } else {
    alert("Error connecting to the Multi Layer Search interface");
  }
  return searchids;
}

function chkFlashVersion() {
  // Major version of Flash required
  var requiredMajorVersion = 10;
  // Minor version of Flash required
  var requiredMinorVersion = 0;
  // Minor version of Flash required
  var requiredRevision = 0;

  // Version check based upon the values defined in globals
  var hasRequestedVersion = DetectFlashVer(requiredMajorVersion, requiredMinorVersion, requiredRevision);

  if(!hasRequestedVersion) {
    var msg = 'The current flash player plugin version is ' + GetSwfVer() + '. For the site to work correctly, please <a href="http://get.adobe.com/flashplayer/" target="blank">click here</a> upgrade to the latest version.';
    modalPopup(msg, "Flash update", 120, 260, 500, 300);
  }
}

function getFlashAppAddScript(src, id, flashvars) {
  var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
  var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
  var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
  var isChromeOrSafari = (navigator.userAgent.indexOf("AppleWebKit") != -1) ? true : false;

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
    if(isChromeOrSafari) { // For some reason this needs to be done for Chrome.
      embd += '/>';
    } else {
      embd += ' >';
      embd += '</embed>';
    }
  }

  //document.write(embd);
  return embd;
}
//called from flash, depending upon the tab - the variable is set for feature popup to show or not.
function setFeatureClick(val,search_type) {
  if (search_type!=null) {
  	  switch(search_type){
  	  		case 0:
  	  			 isMultiLayerSearchON = false;
  	  			break;
  	  		case 1:
  	  			isMultiLayerSearchON = true;
  	  			break;
  	  		case 2:
  	  			// for bbox search we don't require to set this flag
				isMultiLayerSearchON = false;
  	  			mls_DrawBBOX();

  	  	} // switch

  }
}
function AdjustWidthForSearch(val) {
  if(val == 0) {// change width to original values
    jQuery('#divMultiLayerSearchPopup').parent().parent().width(800);
  	jQuery('#divMultiLayerSearchPopup').parent().width(800);
  	jQuery('#divMultiLayerSearchPopup').width(768);
  } else { //Minimize for search
  	jQuery('#divMultiLayerSearchPopup').parent().parent().width(190);
    jQuery('#divMultiLayerSearchPopup').parent().width(190);
    jQuery('#divMultiLayerSearchPopup').width(175);
  }
}


 function addSearchSWF(){
	var flashVars = "";
  	flashVars += 'bridgeName=FAB_MultiLayerSearch';
  	flashVars += '&basePath='+base_path;
  	flashVars += '&dataFile=MultiLayerSearch.php';
  	flashVars += '&layersChecked=' + layersChecked;
  	flashVars += '&bbox=' + getBBOX();
	var src = base_path + "MultiLayerSearch/MultiLayerSearch.swf";
	var embd = getFlashAppAddScript(src, "fmultiLayerSearch", flashVars);
	//jQuery("#divMultiLayerSearchPopup").css("z-index","0");
	jQuery("#divMultiLayerSearchPopup").html(embd);
	//window.fmultiLayerSearch = document.forms[0].fmultiLayerSearch;
	//var d = document.getElementById('divMultiLayerSearchPopup');
	//d.style.zIndex=200;
	//jQuery("#divMultiLayerSearchPopup").css("display","none");
}
function multiLayerSearch() {
  addSearchSWF();
  jQuery("#divMultiLayerSearchPopup").css("display","block");
  var old_opt = CurrentTabOption;
  CurrentTabOption = SEARCH_OPT;
  disableTools(true);

  jQuery('#divMultiLayerSearchPopup').dialog({
    modal: false,
    width:525,
    height: 530,
    maxWidth: 800,
    maxHeight: 530,
    //minWidth: 525,
    //minHeight: 530,
    zIndex: 2004,
    position:[3,100],
    overlay: {
      opacity: 0.5,
      background: "black"
    },
    close: function() {
      CurrentTabOption = old_opt;
      isMultiLayerSearchON = false;
      var tmpStr = "";
      removeBBOX();
      disableTools(false);
      mls_RemoveFromMap();
      if(FABridge.FAB_MultiLayerSearch) {
        var f_MultiLayerSearch = FABridge.FAB_MultiLayerSearch.root();
        tmpStr = f_MultiLayerSearch.getchkdSrchLayersList(); // tmpStr stores a string as : layer_tablename#fid1,fid2;layer_tablename#fid1,fid2;..
        var oldLayersChecked = "";
        if(jQuery.cookie("layersChecked"))
          oldLayersChecked = jQuery.cookie("layersChecked").split(":");
        var temp1 = tmpStr.split(";");
        for (var i = 0; i < temp1.length; i++) {
          var temp2 = temp1[i].split("#");
          if("" != temp2[0]){
            if(jQuery.inArray(temp2[0], oldLayersChecked) == -1) {
              getData_Category(temp2[0], false, temp2[1]);
            } else {
              getData_Category(temp2[0], true);
            }
          }
        }
      } else {
        alert("Error connecting to the Multi Layer Search interface");
      }
    }
  });
}

/*
 * Function to check the browser compatibility.
 */
 
function chkBrowserCompatibility(){

    //Detects the browser
    var BrowserDetect = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
            this.version = this.searchVersion(navigator.userAgent)
            || this.searchVersion(navigator.appVersion)
            || "an unknown version";
            this.OS = this.searchString(this.dataOS) || "an unknown OS";
        },
        searchString: function (data) {
            for (var i=0;i<data.length;i++)	{
                var dataString = data[i].string;
                var dataProp = data[i].prop;
                this.versionSearchString = data[i].versionSearch || data[i].identity;
                if (dataString) {
                    if (dataString.indexOf(data[i].subString) != -1)
                        return data[i].identity;
                }
                else if (dataProp)
                    return data[i].identity;
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1) return;
            return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
        },
        dataBrowser: [
        {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        },
        {
            string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        },
        {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        },
        {
            prop: window.opera,
            identity: "Opera"
        },
        {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
        },
        {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
        },
        {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        },
        {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
        },
        {		// for newer Netscapes (6+)
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Internet Explorer",
            versionSearch: "MSIE"
        },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        },
        { 		// for older Netscapes (4-)
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }
        ],
        dataOS : [
        {
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        },
        {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        },
        {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iPhone/iPod"
        },
        {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        }
        ]

    };
    BrowserDetect.init();


    if (!(((BrowserDetect.browser=="Firefox")&&(BrowserDetect.version>="3"))||((BrowserDetect.browser=="Internet Explorer")&&(BrowserDetect.version>="7"))))
    {
        alert(BrowserDetect.browser + " " + BrowserDetect.version + " is currently not supported. Please use " + "IE 7+ or Firefox 3.0+");
        window.location = "browser_download.php"
    }

}