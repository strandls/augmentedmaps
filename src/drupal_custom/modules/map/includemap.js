/*
All MapLocator code is Copyright 2010 by the original authors.

This work is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; either version 3 of the License, or any
later version.

This work is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See version 3 of
the GNU General Public License for more details.

You should have received a copy of the GNU General Public License
Version 3 along with this program as the file LICENSE.txt; if not,
please see http://www.gnu.org/licenses/gpl-3.0.html.

*/

/***
*This file contains functionality to include external javascripts(google maps) with some utility code.
*
***/

//XXX:rahul:to fix console is not defined error in browser without firebug
if (!window.console || !console.firebug)
{
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
    "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];


    window.console = {};
    for (var i = 0; i < names.length; ++i)
        window.console[names[i]] = function() {}
}

document.write("<script src='../openlayers/OpenLayers.js'></script>");
var BASE_MAP_SOURCE_sp = BASE_MAP_SOURCE.split(",");
for (var i = 0; i < BASE_MAP_SOURCE_sp.length; i++) {
  switch (BASE_MAP_SOURCE_sp[i])
  {
    case 'GOOGLE':
      var url=(document.location.href);
      var ip_addr_text=url.split("//");
      var ip_addr=ip_addr_text[1].split("/");
	switch (ip_addr[0])
      {
        case 'wgp.khasi.strandls.com':
          document.write("<script src='http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAA1nFeM8TAZxFi_mL6qf7X8BSh9t97vtMV8vIOMdpKn2GfN8-o5hRUWFN2pZkiPlpAQgl308dV5I-Acw'></script>");
          break;
       case 'ibp.khasi.strandls.com':
          document.write("<script src='http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAA1nFeM8TAZxFi_mL6qf7X8BSZqvpoLVONeNf4Ch2Jg2KQWckk5RQyiUhjaMvJu8mri3-O2bGJv7DxDA'></script>");
          break;
       case 'westernghatsportal.org':
          document.write("<script src='http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAA1nFeM8TAZxFi_mL6qf7X8BRgJ5oIIa8tb-azaxQOwB4GmV78mhSDlhaspt5acfUlFvAfAGBRsILiNw'></script>");
          break;
       case 'thewesternghats.in':
          document.write("<script src='http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAA1nFeM8TAZxFi_mL6qf7X8BSfxTrumlgHSvRYsANeHtrGSJFg7RR8hHiTHx34bPEx0AR3oXXv2aY75A'></script>");
          break;
       case 'thewesternghats.org':
          document.write("<script src='http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAA1nFeM8TAZxFi_mL6qf7X8BQMconc0x0wn-1aVQuOb-PYBIKJpBQhwtyLmCQqsrzFKmhsudJ9jMNDgg'></script>");
          break;
       case 'western-ghats.in':
          document.write("<script src='http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAA1nFeM8TAZxFi_mL6qf7X8BTlyX6odf56vLo5ik0vphRuYS3WnRQrH39qpLY6hNGAikfFY7kZsO3roQ'></script>");
          break;
       case 'indiabiodiversity.org':
          document.write("<script src='http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAA1nFeM8TAZxFi_mL6qf7X8BTAhyobnrf0vDUn9-dE4FfDgG9nWxRDCj3OYX4CR8PAXEaYu2Rs8doXVg'></script>");
          break;
      }
      break;
    // add more cases for yahoo and other base layers
    case 'YAHOO':
      document.write("<script src='http://api.maps.yahoo.com/ajaxymap?v=3.0&appid=euzuro-openlayers'></script>");
      break;
    case 'VIRTUALEARTH':
      document.write("<script src='http://dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=6.1'></script>");
      break;
  }
}

/* Include Map Fish Javascripts */
if(GOOGLE_EARTH_ENABLED){
  document.write("<link rel='stylesheet' type='text/css' href='../MapFish/client/mfbase/ext/resources/css/ext-all.css' />");
  document.write("<script type='text/javascript' src='../MapFish/client/mfbase/openlayers/lib/Firebug/firebug.js'></script>");
  document.write("<script type='text/javascript' src='../MapFish/client/mfbase/ext/adapter/ext/ext-base.js'></script>");
  document.write("<script type='text/javascript' src='../MapFish/client/mfbase/ext/ext-all-debug.js'></script>");
  document.write("<script type='text/javascript'>var gMfLocation = '../MapFish/client/mfbase/mapfish/';</script>");
  document.write("<script type='text/javascript' src='../MapFish/client/mfbase/mapfish/MapFish.js'></script>");
  <!-- EXT colorField Extent -->
  document.write("<script type='text/javascript' src='../MapFish/client/mfbase/ext-community-extensions/color-field.js' ></script>");
  document.write("<link rel='stylesheet' type='text/css' href='../MapFish/client/mfbase/ext-community-extensions/color-field.css' />");
  /* Get a seperate key as per the host server ip address */
  if((document.location.href).indexOf("http://ibp.saturn.strandls.com") > -1) {
    document.write("<script type='text/javascript' src='http://www.google.com/jsapi?key=ABQIAAAA1nFeM8TAZxFi_mL6qf7X8BSbtcI_iVa-2AmTDvcX2necywsXBRRTG8mFZvj-jcxS4lFSqiyphWJPlA'></script>");
  }else if((document.location.href).indexOf("http://wgp.saturn.strandls.com") > -1) {
    document.write("<script type='text/javascript' src='http://www.google.com/jsapi?key=ABQIAAAA1nFeM8TAZxFi_mL6qf7X8BSBuwmTeQPeaKahCdKH7SiemvKknBQAjbs3zw1SeDKNzpzLvp9Qp0QEUA'></script>");
  }
  //XXX:rahul:commented Earth.js: not required
  //document.write("<script type='text/javascript' src='"+ base_path +"Earth.js'> </script>");
}



/* Commented till we get valid yahoo keys for all IP addresses
// Yahoo maps require app-id
   if((document.location.href).indexOf("http://125.18.107.200") > -1) {
    document.write("<script src='http://api.maps.yahoo.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAYzDU0nTvoeZEPBXhN2sxrBT9BXnw7NOeFZt2pgxEZPwOjG8PqBT4can4cOY6pwuakwf4cpKQQNybXQ'></script>");
   } else if((document.location.href).indexOf("http://192.168.8.115") > -1) {
    document.write("<script src='http://api.maps.yahoo.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAgeIZpiKav4awQeLY0wOEuBTYTM93_E_7UqpDxr5BfB8GGe44CxRdXPyX9a94f6Sm8UuMV9cGi1_qzQ' type='text/javascript'></script>");
   } else if((document.location.href).indexOf("http://172.20.25.207") > -1) {
    document.write("<script src='http://api.maps.yahoo.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAQUKI635zX8tJCYVCPiLGiRSohl-p9KFNptSlT0SLSFK9y3jb4hTxZyyG1wIdrdNDtYH0V440OoEAZA' type='text/javascript'></script>");
   } else if((document.location.href).indexOf("http://172.20.25.54") > -1) {
    document.write("<script src='http://api.maps.yahoo.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAgeIZpiKav4awQeLY0wOEuBSPPVKbi1V_AdUz_F1_2HN9CiZ7fBQSeOGAG0_0BRQAbm4nldpT0WLFSw' type='text/javascript'></script>");
   }else if((document.location.href).indexOf("http://172.20.25.95") > -1) {
    document.write("<script src='http://api.maps.yahoo.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAgeIZpiKav4awQeLY0wOEuBQ_vHF9t0zkDnsDMkkbwef8oBKbUBSWoh6T1IfilfNUZt8vwA2N5zGeZA' type='text/javascript'></script>");
   } else if((document.location.href).indexOf("http://172.20.25.208") > -1) {
    document.write("<script src='http://api.maps.yahoo.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAgeIZpiKav4awQeLY0wOEuBSQiB6bHPv5gTuYMpmP7oU_Z33OrxQWvI55JAnk2wz3tHR0-hNdLqQMzg' type='text/javascript'></script>");
   }else if((document.location.href).indexOf("http://localhost") > -1) {
    document.write("<script src='http://api.maps.yahoo.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAQUKI635zX8tJCYVCPiLGiRT2yXp_ZAY8_ufC3CFXhHIE1NvwkxQTk5f2TB9OdaLZxfoZDgXnD8O16Q' type='text/javascript'></script>");
   }else if((document.location.href).indexOf("http://67.207.130.12") > -1) {
    document.write("<script src='http://api.maps.yahoo.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAgeIZpiKav4awQeLY0wOEuBQBKtteudfHgfoRVk1ruYMsE6ccZRQ10qSrhPS_VzVhjrz2_XvBltlOHA' type='text/javascript'></script>");
   }else if((document.location.href).indexOf("http://www.indiabiodiversity.org/") > -1) {
    document.write("<script src='http://api.maps.yahoo.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAgeIZpiKav4awQeLY0wOEuBR1j5t4AhpI-CmlB9EBh0VUO-vRVhSvXbzTChcXDJbxJS6A3zNND1KO-A' type='text/javascript'></script>");
   }else if((document.location.href).indexOf("http://indiabiodiversity.org/") > -1) {
    document.write("<script src='http://api.maps.yahoo.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAgeIZpiKav4awQeLY0wOEuBTAhyobnrf0vDUn9-dE4FfDgG9nWxQdz5A5Xru73_BTPiRxf54BB_hyQw' type='text/javascript'></script>");
   }

  //VirtualEarth does not require any key or app-id
    document.write("<script charset='UTF-8' type='text/javascript' src='http://dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=6.2&mkt=en-us'></script>")
*/

document.write("<link rel='stylesheet' href='"+base_path +"treeview/jquery.treeview.css' />");

document.write("<script src='" + base_path + "treeview/lib/jquery.cookie.js' ></script>");
document.write("<script src='" + base_path + "treeview/jquery.treeview.js' > </script>");
document.write("<script src='" + base_path + "treeview/jquery.treeview.edit.js'></script>");
document.write("<script src='" + base_path + "treeview/jquery.treeview.async.js'></script>");
document.write("<script src='" + base_path + "treeview/jquery.dataTables.js'></script>");

// functions.js starts here


// post-submit callback
function showResponse(responseText, statusText)  {
}

function submitForm(formid, target) {
  jQuery(target).text("");
  var options = {
    target:        target,   // target element(s) to be updated with server response
    success:       submitFormSuccess  // post-submit callback
  };

  $(formid).ajaxSubmit(options);
}

function submitFormSuccess(responseText, statusText) {
  if(responseText == 'Record saved.') {

    /* Hardcoding for India Birds Layer */
    if(jQuery('#btnAddSpecies').length > 0) {
      jQuery('#btnAddSpecies')[0].disabled = false;
      jQuery('#edit-name')[0].style.outline = "";
      jQuery('#edit-count')[0].style.outline = "";
    }
    jQuery('#btnSubmit')[0].disabled = true;
  }
}

function AllowOnlyNumbers_KeyDownHandler(oTxtBox, e, bSigned, bAllowDecimal){

  if(window.event) { // IE
    keynum = e.keyCode;
  } else if(e.which) { // Netscape/Firefox/Opera
    keynum = e.which;
  }

  switch(keynum) {
    case 45://minus
      if((oTxtBox.value != '') || (!bSigned))
        return false;
      break;
    case 46://period
      if((oTxtBox.value.indexOf('.')!=-1) || (!bAllowDecimal))
        return false;
      break;
    case 8://backspace
      return;
      break;
    default:
      if(keynum<48||keynum>57)
        return false;
      break;
  }
}

function db_validate(elem, type, length, null_allowed) {
  if(null_allowed) {
    if(elem.value == '') {
      return false;
    }
  }
  switch(type) {
    case 'smallint':
      break;
    case 'bigint':
      break;
    case 'character varying':
      if(elem.value.length > length) {
      }
      break;
  }
}

/* Function to convert array-like object to array */
/* 'n' is the number of elements you want to skip. So, if you want to skip the first two elements of the collection, then n = 2, and if you do not want to skip any, then n = 0.*/
function convertToArray(obj, n) {
  if (! obj.length) {
    return [];
  } // length must be set on the object, or it is not iterable
  var a = [];

  try {
    a = Array.prototype.slice.call(obj, n);
  }
  // IE 6 and posssibly other browsers will throw an exception, so catch it and use brute force
  catch(e) {
    Core.batch(obj, function(o, i) {
      if (n <= i) {
        a[i - n] = o;
      }
    });
  }

  return a;
};


/**
 Not sure why serialize.js has been added here.
 **/
//seralize.js starts here

function serialize( mixed_value ) {
  // http://kevin.vanzonneveld.net
  // +   original by: Arpad Ray (mailto:arpad@php.net)
  // %          note: Aiming for PHP-compatibility, we have to translate objects to arrays
  // *     example 1: serialize(['Kevin', 'van', 'Zonneveld']);
  // *     returns 1: 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
  // *     example 2: serialize({firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'});
  // *     returns 2: 'a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}'

  var _getType = function( inp ) {
    var type = typeof inp, match;
    if (type == 'object' && !inp) {
      return 'null';
    }
    if (type == "object") {
      if (!inp.constructor) {
        return 'object';
      }
      var cons = inp.constructor.toString();
      if (match = cons.match(/(\w+)\(/)) {
        cons = match[1].toLowerCase();
      }
      var types = ["boolean", "number", "string", "array"];
      for (key in types) {
        if (cons == types[key]) {
          type = types[key];
          break;
        }
      }
    }
    return type;
  };
  var type = _getType(mixed_value);

  var val;
  switch (type) {
    case "undefined":
      val = "N";
      break;
    case "boolean":
      val = "b:" + (mixed_value ? "1" : "0");
      break;
    case "number":
      val = (Math.round(mixed_value) == mixed_value ? "i" : "d") + ":" + mixed_value;
      break;
    case "string":
      val = "s:" + mixed_value.length + ":\"" + mixed_value + "\"";
      break;
    case "array":
    case "object":
      val = "a";
      var count = 0;
      var vals = "";
      var okey;
      for (key in mixed_value) {
        okey = (key.match(/^[0-9]+$/) ? parseInt(key) : key);
        vals += serialize(okey) +
        serialize(mixed_value[key]);
        count++;
      }
      val += ":" + count + ":{" + vals + "}";
      break;
  }
  if (type != "object" && type != "array") val += ";";
  return val;
}

function unserialize(data){
  // http://kevin.vanzonneveld.net
  // +     original by: Arpad Ray (mailto:arpad@php.net)
  // +     improved by: Pedro Tainha (http://www.pedrotainha.com)
  // +     bugfixed by: dptr1988
  // +      revised by: d3x
  // +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // %            note: Aiming for PHP-compatibility, we have to translate objects to arrays
  // *       example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}');
  // *       returns 1: ['Kevin', 'van', 'Zonneveld']
  // *       example 2: unserialize('a:3:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";s:7:"surName";s:9:"Zonneveld";}');
  // *       returns 2: {firstName: 'Kevin', midName: 'van', surName: 'Zonneveld'}



  var error = function (type, msg, filename, line){
    throw new window[type](msg, filename, line);
  };
  var read_until = function (data, offset, stopchr){
    var buf = [];
    var chr = data.slice(offset, offset + 1);
    var i = 2;
    while(chr != stopchr){
      if((i+offset) > data.length){
        error('Error', 'Invalid');
      }
      buf.push(chr);
      chr = data.slice(offset + (i - 1),offset + i);
      i += 1;
    }
    return [buf.length, buf.join('')];
  };
  var read_chrs = function (data, offset, length){
    buf = [];
    for(var i = 0;i < length;i++){
      var chr = data.slice(offset + (i - 1),offset + i);
      buf.push(chr);
    }
    return [buf.length, buf.join('')];
  };
  var _unserialize = function (data, offset){
    if(!offset) offset = 0;
    var buf = [];
    var dtype = (data.slice(offset, offset + 1)).toLowerCase();

    var dataoffset = offset + 2;
    var typeconvert = new Function('x', 'return x');
    var chrs = 0;
    var datalength = 0;

    switch(dtype){
      case "i":
        typeconvert = new Function('x', 'return parseInt(x)');
        var readData = read_until(data, dataoffset, ';');
        var chrs = readData[0];
        var readdata = readData[1];
        dataoffset += chrs + 1;
        break;
      case "b":
        typeconvert = new Function('x', 'return (parseInt(x) == 1)');
        var readData = read_until(data, dataoffset, ';');
        var chrs = readData[0];
        var readdata = readData[1];
        dataoffset += chrs + 1;
        break;
      case "d":
        typeconvert = new Function('x', 'return parseFloat(x)');
        var readData = read_until(data, dataoffset, ';');
        var chrs = readData[0];
        var readdata = readData[1];
        dataoffset += chrs + 1;
        break;
      case "n":
        readdata = null;
        break;
      case "s":
        var ccount = read_until(data, dataoffset, ':');
        var chrs = ccount[0];
        var stringlength = ccount[1];
        dataoffset += chrs + 2;

        var readData = read_chrs(data, dataoffset+1, parseInt(stringlength));
        var chrs = readData[0];
        var readdata = readData[1];
        dataoffset += chrs + 2;
        if(chrs != parseInt(stringlength) && chrs != readdata.length){
          error('SyntaxError', 'String length mismatch');
        }
        break;
      case "a":
        var readdata = {};

        var keyandchrs = read_until(data, dataoffset, ':');
        var chrs = keyandchrs[0];
        var keys = keyandchrs[1];
        dataoffset += chrs + 2;

        for(var i = 0;i < parseInt(keys);i++){
          var kprops = _unserialize(data, dataoffset);
          var kchrs = kprops[1];
          var key = kprops[2];
          dataoffset += kchrs;

          var vprops = _unserialize(data, dataoffset);
          var vchrs = vprops[1];
          var value = vprops[2];
          dataoffset += vchrs;

          readdata[key] = value;
        }

        dataoffset += 1;
        break;
      default:
        error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);
        break;
    }
    return [dtype, dataoffset - offset, typeconvert(readdata)];
  };
  return _unserialize(data, 0)[2];
}
