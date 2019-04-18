/*  Gopi's Unicode Converters Version 3.2
    Copyright (C) 2011 Gopalakrishnan (Gopi) http://www.higopi.com

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

    Further to the terms mentioned you should leave this copyright notice
    intact, stating me as the original author.
*/
var isIE = document.all ? true : false;
var myimg = new Image();
var sPos = 0;
var isTh = false;
var isNg = false;
var kbmode = "english";
var pkbmode = "english";
var SplKeys = new Array();
var toShowHelp = false;
var webhome = "http://www.higopi.com";




//SplKeys["ZR"] = 0;
SplKeys["BS"] = 8;  //for backspace special key and its keycode
SplKeys["ENR"] = 13;  //for enter special key and its keycode
SplKeys["CR"] = 17;  //for control special key and its keycode
//SplKeys["CPL"] = 20;  //for caps lock special key and its keycode
//SplKeys["DEL"] = 46;  //for delete special key and its keycode
SplKeys["LA"] = 37;  //for left arrow special key and its keycode
SplKeys["UA"] = 38;  //for upper arrow special key and its keycode
SplKeys["RA"] = 39;  //for right arrow special key and its keycode
SplKeys["DA"] = 40;  //for down arrow special key and its keycode
SplKeys["PGUP"] = 33;  //for page up special key and its keycode
SplKeys["PGDN"] = 34;  //for page down special key and its keycode
SplKeys["END"] = 35;  //for end special key and its keycode
SplKeys["HME"] = 36;  //for home special key and its keycode
SplKeys["INS"] = 45;  //for insert special key and its keycode
SplKeys["SHFT"] = 16;  //for shift special key and its keycode
//SplKeys["EQ"] = 187;  //for equal to near backspace special key and its keycode
//SplKeys["MI"] = 189;  //for minus near backspace special key and its keycode
//SplKeys["FR"] = 192;  //for the symbol below tilt left to 1 special key and its keycode
//SplKeys["F1"] = 112;  //for the f1 special key and its keycode
//SplKeys["F2"] = 113;  //for the f2 special key and its keycode
//SplKeys["F3"] = 114;  //for the f3 special key and its keycode
//SplKeys["F4"] = 115;  //for the f4 special key and its keycode
//SplKeys["F5"] = 116;  //for the f5 special key and its keycode
//SplKeys["F6"] = 117;  //for the f6 special key and its keycode
//SplKeys["F7"] = 118;  //for the f7 special key and its keycode
//SplKeys["F8"] = 119;  //for the f8 special key and its keycode
//SplKeys["F9"] = 120;  //for the f9 special key and its keycode
//SplKeys["F10"] = 121;  //for the f10 special key and its keycode
//SplKeys["F11"] = 122;  //for the f11 special key and its keycode
//SplKeys["F12"] = 123;  //for the f12 special key and its keycode
//SplKeys["COM"] = 188;  //for the comma special key and its keycode
//SplKeys["FLS"] = 190;  //for the fullstop special key and its keycode
//SplKeys["FSLSH"] = 191;  //for the front slash special key and its keycode
//SplKeys["COLN"] = 186;  //for the colon special key and its keycode
//SplKeys["APOS"] = 222;  //for the apostophe special key and its keycode
//SplKeys["OPBR"] = 219;  //for the open bracket special key and its keycode
//SplKeys["CLBR"] = 221;  //for the close bracket special key and its keycode
//SplKeys["BSLSH"] = 220;  //for the back slash special key and its keycode
//SplKeys["N0"] = 96;  //for the NUMERIC pad 0 special key and its keycode
//SplKeys["N1"] = 97;  //for the NUMERIC pad 1 special key and its keycode
//SplKeys["N2"] = 98;  //for the NUMERIC pad 2 special key and its keycode
//SplKeys["N3"] = 99;  //for the  NUMERIC pad 3 special key and its keycode
//SplKeys["N4"] = 100;  //for the  NUMERIC pad 4 special key and its keycode
//SplKeys["N5"] = 101;  //for the NUMERIC pad 5  special key and its keycode
//SplKeys["N6"] = 102;  //for the NUMERIC pad 6  special key and its keycode
//SplKeys["N7"] = 103;  //for the NUMERIC pad 7  special key and its keycode
//SplKeys["N8"] = 104;  //for the NUMERIC pad 8  special key and its keycode
//SplKeys["N9"] = 105;  //for the NUMERIC pad 9  special key and its keycode
//SplKeys["NPS"] = 107;  //for the NUMERIC pad plus special key and its keycode
//SplKeys["NMS"] = 109;  //for the NUMERIC pad minus special key and its keycode
//SplKeys["NML"] = 106;  //for the NUMERIC pad multiple special key and its keycode
//SplKeys["NDV"] = 111;  //for the NUMERIC pad divide special key and its keycode
//SplKeys["NFS"] = 110;  //for the NUMERIC pad full stop special key and its keycode

    
var shiftUps = {
    "96": "~",
    "49": "!",
    "50": "@",
    "51": "#",
    "52": "$",
    "53": "%",
    "54": "^",
    "55": "&",
    "56": "*",
    "57": "(",
    "48": ")",
    "45": "_",
    "61": "+",
    "91": "{",
    "93": "}",
    "92": "|",
    "59": ":",
    "39": "\"",
    "44": "<",
    "46": ">",
    "47": "?"
};

function incfont(fontname, fontfile) {
    if (isIE)
        document.write("<STY" + "LE TYPE='text/css'>\n<!--\n@font-face {\n"
                    + "font-family: " + fontname + ";\nsrc:url(" + webhome + "/eot/" + fontfile + ".eot);\n"
                    + "}\n-->\n</ST" + "YLE>")
}

function getStyleObject(objectId) {
    // cross-browser function to get an object's style object given its
    if (document.getElementById && document.getElementById(objectId)) {
        // W3C DOM
        return document.getElementById(objectId).style;
    } else if (document.all && document.all(objectId)) {
        // MSIE 4 DOM
        return document.all(objectId).style;
    } else if (document.layers && document.layers[objectId]) {
        // NN 4 DOM.. note: this won't find nested layers
        return document.layers[objectId];
    } else {
        return false;
    }
} // getStyleObject


function showMap(obj) {
    savepref = eval('document.' + obj.form.name + '.savepref');
    if (savepref != null) {
        savepref.disabled = false;
        savepref.onclick = savePref;
    }

    if (!obj.checked)
    { hideMap(); return; }

    if (document.getElementById('KeyMapDiv') == null) {
        mapdiv = document.createElement('div');
        mapdiv.setAttribute('id', 'KeyMapDiv');
        mapdiv.setAttribute('align', 'left');
        mapdiv.onmousedown = downMap;
        mapdiv.onmouseup = upMap;
        bdy = document.getElementsByTagName('BODY')[0];
        bdy.appendChild(mapdiv);

        mapstyle = getStyleObject('KeyMapDiv');
        mapstyle.width = '140px';
        mapstyle.backgroundColor = '#FFFFFF';
        mapstyle.position = 'absolute';
        mapstyle.cursor = 'move';
    }
    else {
        mapdiv = document.getElementById('KeyMapDiv');
        mapstyle = getStyleObject('KeyMapDiv');
    }
    mapdiv.innerHTML = '<table border="0" cellpadding="0" cellspacing="0" style="border:3px solid #0e88af;background-color:#ffffff;width:100%;"><tr>'
						+ '<td style="background-color:#0e88af;color:#ffffff;" nowrap="nowrap"><b>&nbsp;Keypad Map - '
						+ lang.substring(0, 1).toUpperCase() + lang.substring(1) + '</b></td><td bgcolor="#0e88af" nowrap="nowrap" width="20" align="right">'
						+ '<div align="right" onclick="hideMap()" style="padding:2px;width:20px;text-align:right;background-color:#0e88af;color:#ffffff;cursor:default">'
						+ '<b> &nbsp; X &nbsp; </b></div></td></tr><tr><td colspan="2" align="center"><img name="KeyMap" src=' + myimg.src
						+ ' style="display:block"></td></tr></table>';
    mapstyle.left = '100px';
    if (isIE)
    { mapstyle.pixelTop = document.body.scrollTop + 100; }
    else
    { mapstyle.top = window.pageYOffset + 100 + "px"; }
    mapstyle.display = 'inline';
}

function moveMap(e) {
    mapdiv = document.getElementById('KeyMapDiv');
    mapstyle = getStyleObject('KeyMapDiv');

    if (!e) e = window.event;
    if (dragok) {
        if (isIE) { mapstyle.left = dx + e.clientX - tempX + "px"; mapstyle.top = dy + e.clientY - tempY + "px"; }
        else { mapstyle.left = dx + e.pageX - tempX + "px"; mapstyle.top = dy + e.pageY - tempY + "px"; }
        return false;
    }
}

var dx, dy, tempX, tempY;
var dragok = false;
var n = 500;

function downMap(e) {
    mapdiv = document.getElementById('KeyMapDiv');
    mapstyle = getStyleObject('KeyMapDiv');
    dragok = true;
    mapstyle.zIndex = n++;
    dx = parseInt(mapstyle.left + 0);
    dy = parseInt(mapstyle.top + 0);
    if (!e) e = window.event;
    if (isIE) { tempX = e.clientX; tempY = e.clientY; }
    else { tempX = e.pageX; tempY = e.pageY; }

    document.onmousemove = moveMap;

    return false;
}

function upMap() {
    dragok = false;
    document.onmousemove = null;
}

function hideMap() {
    mapstyle = getStyleObject('KeyMapDiv');
    mapstyle.display = 'none';
    if (document.post != null && document.post.showmap != null) {
        document.post.showmap.checked = false;
        if (document.post.savepref != null) {
            document.post.savepref.disabled = false;
            document.post.savepref.onclick = savePref;
        }
    }
}

function isEnglish(elem) {
    var alphaExp = /[a-zA-Z]+/;
    if (elem.match(alphaExp))
        return true;
    else
        return false;
}

function doGetCaretPosition(ctrl) {
    var CaretPos = 0;   // IE Support
    if (document.selection) {
        ctrl.focus();
        var Sel = document.selection.createRange();
        Sel.moveStart('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }
        // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
        CaretPos = ctrl.selectionStart;
    return (CaretPos);
}
function setCaretPosition(ctrl, pos) {
    if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos, pos);
    }
    else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

String.prototype.splice = function (start, count, stringToInsert) {
    return this.slice(0, start) + stringToInsert + this.slice(start + count);
};

function convertThis(e, numchar) {
    //  var c;
    if (!isIE)
        Key = e.which;
    else
        Key = e.keyCode;

//   Char = String.fromCharCode(Key);

   //var text = document.getElementById("txtTM").value;
   //var gg = e.target.value.substring(e.target.selectionStart - 1, e.target.selectionStart);
    //alert(gg);

    if (isSplKey(Key) || e.ctrlKey)//for suppress special keys 
        return true;

    //if (isIE) {
    //    Char = e.srcElement.value.substring(e.srcElement.selectionStart - 1, e.srcElement.selectionStart);
    //    var hh = doGetCaretPosition(e.srcElement);
    //    e.srcElement.value = e.srcElement.value.splice(hh - 1, 1, '');
    //    setCaretPosition(e.srcElement, hh - 1);
    //}
    //else {
    //    Char = e.target.value.substring(e.target.selectionStart - 1, e.target.selectionStart);
    //    var hh = doGetCaretPosition(e.target);
    //    e.target.value = e.target.value.splice(hh - 1, 1, '');
    //    setCaretPosition(e.target, hh - 1);
    //}
    Char = e.target.value.substring(e.target.selectionStart - 1, e.target.selectionStart);
    var hh = doGetCaretPosition(e.target);
    e.target.value = e.target.value.splice(hh-1, 1, '');
    setCaretPosition(e.target, hh - 1);


    //alert(Char);
    //alert(hh);
    //var ff = e.target.value.substring(0, e.target.selectionStart - 1);
    //var dd = e.target.value.substring(e.target.selectionStart , e.target.value.length);
    ////var jj = e.target.value.length;
    //Char = e.target.value.substring(e.target.selectionStart - 1, e.target.selectionStart);
    //document.getElementById('txtTM').value = ff;

    //Char = e.target.value.charAt(e.target.selectionStart);
    




    //e.target.selectionStart = e.target.selectionStart - 1
    //e.target.selectionEnd = e.target.selectionStart - 1
   // document.getElementById('txtTM').value = "";

   //   Char = e.target.value;
    //var marcpos=getCursorPosition(e.target);
    //alert(marcpos);
    //alert(e.target.value);
    //alert(Key);
    //if (Key != 16) { // If the pressed key is anything other than SHIFT
    //    c = String.fromCharCode(Key);
    //    if (e.shiftKey && shiftUps.hasOwnProperty(Key)) {
    //        c = shiftUps[Key]; 
    //    }
    //    else if (e.shiftKey) { // If the SHIFT key is down, return the ASCII code for the capital letter
    //        //alert("ASCII Code: " + Key + " Character: " + c);
    //    } else { // If the SHIFT key is not down, convert to the ASCII code for the lowecase letter
    //        c = c.toLowerCase(c);
    //        //  alert("ASCII Code: " + c.charCodeAt(0) + " Character: " + c);
    //    }
    //}

    // Char = c;
    //if (isSplKey(Key) || e.ctrlKey)//for suppress special keys in ie8 and lower than ie11
    //    return true;

    //var str = document.getElementById('txtTM').value;


    //// show last character in the string
    //Char = str.charAt(str.length - 1);
    //str = str.slice(0, -1);
    ////var marst = e.target.selectionStart;
    ////var marend = e.target.selectionEnd;
    //document.getElementById('txtTM').value = str;
    //e.target.selectionStart = marst;
    //e.target.selectionEnd = marend;



    if (typeof numchar == "undefined")
        numchar = 4;
    if (isIE) {
        //IE9 processs the event faster. so cancel the bubble first and then process the key
        e.cancelBubble = true;
        e.returnValue = false;
        if (isSplKey(Key) || e.ctrlKey)//for suppress special keys in ie8 and lower than ie11
            return true;
        myField = e.srcElement;
        myField.caretPos = document.selection.createRange().duplicate();
        prevChar = myField.caretPos.text;
        diff = 0;
        cpos = getCursorPosition(myField);
        if (prevChar.length != 0)
            document.selection.clear();
        if (myField.value.length != 0 && cpos != "1,1") {
            myField.caretPos.moveStart('character', -1);
            prevChar = myField.caretPos.text;
            diff++;
        }
        if (prevChar == chnbin) {
            myField.caretPos.moveStart('character', -1);
            prevChar = myField.caretPos.text;
            diff++;
        }

        if (cpos[1] > numchar) {
            prevPrevChar = prevChar;
            myField.caretPos.moveStart('character', diff - numchar);
            prevChar = myField.caretPos.text;
            if (isEnglish(prevChar)) {
                prevChar = prevPrevChar;
                myField.caretPos.moveStart('character', numchar - diff);
            }
        }
        if (prevChar == "" && cpos != "1,1")
            prevChar = "\u000A";
        if (Key == 13)
            Char = "\u000A";

        myField.caretPos.text = getLang(prevChar, Char, 0)
    }
    else {
        myField = e.target;
        if (myField.selectionStart >= 0) {
            if (isSplKey(Key) || e.ctrlKey)
                return true;
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            txtTop = myField.scrollTop;
            if (myField.value.length == 0) {
                prevChar = "";
                myField.value = getLang(prevChar, Char, startPos)
            }
            else {
                prevChar = myField.value.substring(startPos - 1, startPos);
                prevStr = myField.value.substring(0, startPos - 1);
                if (prevChar == chnbin) {
                    prevChar = myField.value.substring(startPos - 2, startPos);
                    prevStr = myField.value.substring(0, startPos - 2);
                }
                cpos = getCursorPosition(myField);
                if (cpos[1] >= numchar) {
                    prevChar = myField.value.substring(startPos - numchar, startPos);
                    prevStr = myField.value.substring(0, startPos - numchar);
                    if (isEnglish(prevChar)) {
                        prevChar = myField.value.substring(startPos - 1, startPos);
                        prevStr = myField.value.substring(0, startPos - 1);
                        if (prevChar == chnbin) {
                            prevChar = myField.value.substring(startPos - 2, startPos);
                            prevStr = myField.value.substring(0, startPos - 2);
                        }
                    }
                }
                myField.value = prevStr + getLang(prevChar, Char, myField.selectionStart)
						  + myField.value.substring(endPos, myField.value.length);
            }
            //myField.selectionStart = marst;
            //myField.selectionEnd = marend;
            myField.selectionStart = sPos;
            myField.selectionEnd = sPos;
            if ((myField.scrollHeight + 4) + "px" != myField.style.height)
                myField.scrollTop = txtTop;
            e.stopPropagation();
            e.preventDefault();
        }
    }
    showCombi(e)

    
   
    
   
}




function toggleT(obj) {
    savepref = eval('document.' + obj.form.name + '.savepref');
    if (savepref != null) {
        savepref.disabled = false;
        savepref.onclick = savePref;
    }
    isTh = obj.checked;
    if (isTh)
        ta['t'] = "\u0BA4\u0BCD";
    else
        ta['t'] = "\u0B9F\u0BCD";
}

function toggleG(obj) {
    savepref = eval('document.' + obj.form.name + '.savepref');
    if (savepref != null) {
        savepref.disabled = false;
        savepref.onclick = savePref;
    }
    isNg = obj.checked;
    if (isNg)
        ta['g'] = "\u0B99\u0BCD";
    else
        ta['g'] = "\u0B95\u0BCD"
}

function toggleKBMode(e, obj) {    
    if (obj != null) {
        pkbmode = kbmode;
        kbmode = obj.value;
        if (kbmode == "typewriter" && lang != 'english')
            myimg.src = webhome + "/images/ucedit/" + lang + "tw.png";
        else if (kbmode == "tamil99")
            myimg.src = webhome + "/images/ucedit/tamil99.png";
        else if (kbmode == "bamini")
            myimg.src = webhome + "/images/ucedit/tamilbamini.png";
        else if (kbmode == "modular")
            myimg.src = webhome + "/images/ucedit/tamilmodular.png";
        else if (kbmode == "vaanavil")
            myimg.src = webhome + "/images/ucedit/tamilvaanavil.png";
        else if (kbmode == "applete")
            myimg.src = webhome + "/images/ucedit/teluguapple.png";
        else
            myimg.src = webhome + "/images/ucedit/" + lang + ".png";
        savepref = eval('document.' + obj.form.name + '.savepref');                
        if (savepref != null) {
            savepref.disabled = false;
            savepref.onclick = savePref;
        }
    }
    else {
       // alert(133);
        if (!isIE)
            key = e.which;
        else
            key = e.keyCode;

        if (key == 120) {
            if (kbmode != "english") {
                pkbmode = kbmode;
                kbmode = "english";
            }
            else {
                kbmode = pkbmode;
                pkbmode = "english";
            }
        }

    }
}

function savePref(e) {
    if (isIE)
        savepref = event.srcElement
    else
        savepref = e.target

    frm = savepref.form
    showmap = eval('document.' + frm.name + '.showmap');
    showhelp = eval('document.' + frm.name + '.showhelp');
    keybrd = eval('document.' + frm.name + '.keybrd');
    tha = eval('document.' + frm.name + '.tha');
    nga = eval('document.' + frm.name + '.nga');

    setCookie(lang + "_showmap", showmap.checked, 365);
    setCookie(lang + "_showhelp", showhelp.checked, 365);
    if (tha != null)
        setCookie(lang + "_tha", tha.checked, 365);
    if (nga != null)
        setCookie(lang + "_nga", nga.checked, 365);

    for (var i = 0; i < keybrd.length; i++)
        if (keybrd[i].checked)
            setCookie(lang + "_keybrd", keybrd[i].value, 365);
    savepref.disabled = true;
    savepref.blur();
}

function restorePref() {
    if (getCookie(lang + "_help") != null && document.post != null
		&& document.post.showhelp != null && document.post.savepref != null
		&& eval(getCookie(lang + "_showhelp"))) {
        document.post.showhelp.click();
        document.post.savepref.disabled = true;
    }

    if (getCookie(lang + "_tha") != null && document.post != null
		&& document.post.tha != null && document.post.savepref != null
		&& eval(getCookie(lang + "_tha"))) {
        document.post.tha.click();
        document.post.savepref.disabled = true;
    }

    if (getCookie(lang + "_nga") != null && document.post != null
		&& document.post.nga != null && document.post.savepref != null
		&& eval(getCookie(lang + "_nga"))) {
        document.post.nga.click();
        document.post.savepref.disabled = true;
    }

    if (getCookie(lang + "_keybrd") != null && document.post != null
		&& document.post.keybrd != null && document.post.savepref != null) {
        keybrdopt = getCookie(lang + "_keybrd");
        for (var i = 0; i < document.post.keybrd.length; i++)
            if (document.post.keybrd[i].value == keybrdopt) {
                document.post.keybrd[i].click();
                document.post.savepref.disabled = true;
            }
    }
    if (getCookie(lang + "_showmap") != null && document.post != null
		&& document.post.showmap != null && document.post.savepref != null
		&& eval(getCookie(lang + "_showmap"))) {
        document.post.showmap.click();
        document.post.savepref.disabled = true;
    }
}

function isSplKey(keynum) {
    retVal = false;
    for (i in SplKeys) {
        if (keynum == SplKeys[i])
            retVal = true;
    }
    return retVal;
}

function getLang(prv, txt, sP) {
    sPos = sP;
    prvPrv = prv;
    if (kbmode == "english") {
        retTxt = prv + txt;
        sPos++;
    }
    else if (kbmode == "typewriter") {
        if (isEnglish(prvPrv))
            prv = "";
        if (prv == ugar && mapLang(txt, sP, "tw") == uugar)
            retTxt = mapLang(prv + txt, sP, "tw");
        else
            retTxt = prv + mapLang(txt, sP, "tw");
        if (isEnglish(prvPrv))
            retTxt = prvPrv + retTxt;
        if (lang == 'tamil');
        retTxt = canoFix(retTxt);
    }
    else if (kbmode == "tamil99") {
        if (isEnglish(prvPrv))
            prv = "";
        retTxt = mapLang(prv + txt, sP, "ta99");
        if (isEnglish(prvPrv))
            retTxt = prvPrv + retTxt;
    }
    else if (kbmode == "applete") {
        if (isEnglish(prvPrv))
            prv = "";
        if ((prv.indexOf(":") != -1) || (prv.indexOf("/") != -1) ||
		    (prv.indexOf(";") != -1) || (prv.indexOf("?") != -1))
            retTxt = prv + mapLang(txt, sP, "teap");
        else
            retTxt = mapLang(prv + txt, sP, "teap");
        if (isEnglish(prvPrv))
            retTxt = prvPrv + retTxt;
    }
    else if (kbmode == "bamini") {
        if (isEnglish(prvPrv))
            prv = "";
        if (prv == ugar && mapLang(txt, sP, "taba") == uugar)
            retTxt = mapLang(prv + txt, sP, "taba");
        else
            retTxt = prv + mapLang(txt, sP, "taba");
        if (isEnglish(prvPrv))
            retTxt = prvPrv + retTxt;
        retTxt = typeOrderFix(retTxt);
        retTxt = canoFix(retTxt);
    }
    else if (kbmode == "vaanavil") {
        if (isEnglish(prvPrv))
            prv = "";
        if (prv == ugar && mapLang(txt, sP, "tava") == uugar)
            retTxt = mapLang(prv + txt, sP, "tava");
        else
            retTxt = prv + mapLang(txt, sP, "tava");
        if (isEnglish(prvPrv))
            retTxt = prvPrv + retTxt;
        retTxt = typeOrderFix(retTxt);
        retTxt = canoFix(retTxt);
    }
    else if (kbmode == "modular") {
        if (isEnglish(prvPrv))
            prv = "";
        if (prv == ugar && mapLang(txt, sP, "tamo") == uugar)
            retTxt = mapLang(prv + txt, sP, "tamo");
        else
            retTxt = prv + mapLang(txt, sP, "tamo");
        if (isEnglish(prvPrv))
            retTxt = prvPrv + retTxt;
        retTxt = canoFix(retTxt);
    }

    else {
        if (pkbmode == "roman") {
            retTxt = prv + mapLang(txt);
            pkbmode = "english";
        }
        else {
            if (isEnglish(prvPrv))
                prv = "";
            retTxt = mapLang(prv + txt);
            if (isEnglish(prvPrv))
                retTxt = prvPrv + retTxt;
        }
    }
    return retTxt;
}

function typeOrderFix(retTxt) {
    rexp = new RegExp('\u200C\u0BC6\u200C(.)', "g");
    retTxt = retTxt.replace(rexp, "$1\u0BC6");
    rexp = new RegExp('\u200C\u0BC7\u200C(.)', "g");
    retTxt = retTxt.replace(rexp, "$1\u0BC7");
    rexp = new RegExp('\u200C\u0BC8\u200C(.)', "g");
    retTxt = retTxt.replace(rexp, "$1\u0BC8");
    return retTxt;
}

function canoFix(retTxt) {
    //Correct ragaram + pulli
    retTxt = retTxt.replace('\u0BBE\u0BCD', "\u0BB0\u0BCD");
    //Correct Ogara otru
    retTxt = retTxt.replace('\u0BC6\u0BBE', "\u0BCA");
    //Correct Ogaara otru
    retTxt = retTxt.replace('\u0BC7\u0BBE', "\u0BCB");
    //Correct Augaaram
    retTxt = retTxt.replace('\u0B92\u0BB3', "\u0B94");
    //Correct Augara otru
    retTxt = retTxt.replace('\u0BC6\u0BB3', "\u0BCC");


    // re-split Ogaram + Lagaram +  otru
    mychar = "\u0B94([\u0BBE|\u0BBF|\u0BC0|\u0BC1|\u0BC2|\u0BC6|\u0BC7|\u0BC8|\u0BCA|\u0BCB|\u0BCC|\u0BCD])";
    rexp = new RegExp(mychar, "g");
    if (retTxt.match(rexp)) {
        retTxt = retTxt.replace(rexp, "\u0B92\u0BB3$1");
        sPos += 1;
    }
    // re-split Ogara otru + Lagaram +  otru
    mychar = "\u0BCC([\u0BBE|\u0BBF|\u0BC0|\u0BC1|\u0BC2|\u0BC6|\u0BC7|\u0BC8|\u0BCA|\u0BCB|\u0BCC|\u0BCD])";
    rexp = new RegExp(mychar, "g");
    if (retTxt.match(rexp)) {
        retTxt = retTxt.replace(rexp, "\u0BC6\u0BB3$1");
        sPos += 1;
    }


    // re-split egaram + ragaram + otru
    mychar = "\u0BCA([\u0BBE|\u0BBF|\u0BC0|\u0BC1|\u0BC2|\u0BC6|\u0BC7|\u0BC8|\u0BCA|\u0BCB|\u0BCC|\u0BCD])";
    rexp = new RegExp(mychar, "g");
    if (retTxt.match(rexp)) {
        retTxt = retTxt.replace(rexp, "\u0BC6\u0BB0$1");
        sPos += 1;
    }

    // re-split Egaaram + ragaram + otru
    mychar = "\u0BCB([\u0BBE|\u0BBF|\u0BC0|\u0BC1|\u0BC2|\u0BC6|\u0BC7|\u0BC8|\u0BCA|\u0BCB|\u0BCC|\u0BCD])";
    var rexp = new RegExp(mychar, "g");
    if (retTxt.match(rexp)) {
        retTxt = retTxt.replace(rexp, "\u0BC7\u0BB0$1");
        sPos += 1;
    }
    // make aagaara otru + otru = ragaram + otru
    mychar = "\u0BBE([\u0BBF|\u0BC0|\u0BC1|\u0BC2|\u0BCD])";
    rexp = new RegExp(mychar, "g");
    retTxt = retTxt.replace(rexp, "\u0BB0$1");
    return retTxt;
}


function mapLang(txt, sP, mod) {
    if (sP != null)
        sPos = sP;
    prvlen = txt.length;
    txtarr = eval(lang.substring(0, 2));
    if (mod != null && mod == "tw")
        txtarr = eval(lang.substring(0, 2) + "tw");
    if (mod != null && (mod == "teap" || mod == "ta99" || mod == "taba" || mod == "tava" || mod == "tamo"))
        txtarr = eval(mod);
    retTxt = "";
    for (itm in txtarr) {
        rexp = new RegExp(itm, "g");
        txt = txt.replace(rexp, txtarr[itm]);
    }
    sPos += (txt.length - prvlen + 1);
    return txt;
}

function getCursorPosition(textarea) {
    var txt = textarea.value;
    var len = txt.length;
    var erg = txt.split("\n");
    var pos = -1;
    if (typeof document.selection != "undefined") { // FOR MSIE
        range_sel = document.selection.createRange();
        range_obj = textarea.createTextRange();
        range_obj.moveToBookmark(range_sel.getBookmark());
        range_obj.moveEnd('character', textarea.value.length);
        pos = len - range_obj.text.length;
    }
    else if (typeof textarea.selectionStart != "undefined") { // FOR MOZILLA
        pos = textarea.selectionStart;
    }
    if (pos != -1) {
        for (ind = 0; ind < erg.length; ind++) {
            len = erg[ind].length + 1;
            if (pos < len)
                break;
            pos -= len;
        }
        ind++; pos++;
        return [ind, pos]; // ind = LINE, pos = COLUMN
    }
}

function showCombi(e) {
    if (document.getElementById('HelpDiv') == null) {
        helpdiv = document.createElement('div');
        helpdiv.setAttribute('id', 'HelpDiv');
        helpdiv.setAttribute('align', 'left');
        if (isIE) {
            bdy = e.srcElement.parentNode;
            bdy.insertBefore(helpdiv, e.srcElement);
        }
        else {
            bdy = e.target.parentNode;
            bdy.insertBefore(helpdiv, e.target);
        }

    }
    else {
        helpdiv = document.getElementById('HelpDiv');
    }
    helpstyle = getStyleObject('HelpDiv');
    if (!toShowHelp || kbmode != 'roman')
    { helpstyle.display = 'none'; return; }

    prevWord = getLang(prevChar, Char, 0)
    if (isLangOtru(prevWord.substring(prevWord.length - 1)))
        prevWord = prevWord.substring(prevWord.length - 2)
    else
        prevWord = prevWord.substring(prevWord.length - 1)

    helptxt = "";
    prevLet = getLang(prevWord, Char, 0); prevLet = prevLet.substring(prevLet.length - 1);
    if (prevWord != "" && !isLangOtru(prevWord) && prevLet != getLang('', Char, 0)) {
        if (Char == 'a' || Char == 'i' || Char == 'u' || Char == 'e' || Char == 'o') {
            helptxt = '<td style="font-size:12px;border:1px solid #0DE8E9;">' + prevWord + ' + ' + Char + ' = <b>' + getLang(prevWord, Char, 0) + "</b></td>";
            if (Char == 'a')
                helptxt += '<td style="font-size:12px;border:1px solid #0DE8E9;">' + prevWord + ' + i = <b>' + getLang(prevWord, 'i', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
						  + prevWord + ' + u = <b>' + getLang(prevWord, 'u', 0) + "</b></td>";
        }
        else if (Char != getLang('', Char, 0)) {
            helptxt = '<td style="font-size:12px;border:1px solid #0DE8E9;">' + prevWord + ' + a = <b>' + getLang(prevWord, 'a', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + A = <b>' + getLang(prevWord, 'A', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + i = <b>' + getLang(prevWord, 'i', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + I = <b>' + getLang(prevWord, 'I', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + u = <b>' + getLang(prevWord, 'u', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + U = <b>' + getLang(prevWord, 'U', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + e = <b>' + getLang(prevWord, 'e', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + E = <b>' + getLang(prevWord, 'E', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + a + i = <b>' + getLang(getLang(prevWord, 'a', 0), 'i', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + o = <b>' + getLang(prevWord, 'o', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + o = <b>' + getLang(prevWord, 'O', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
				+ prevWord + ' + a + u = <b>' + getLang(getLang(prevWord, 'a', 0), 'u', 0) + "</b></td>"
            if (lang == 'tamil') {
                if (getLang('', 't', 0) == prevWord)
                    helptxt += '<td style="font-size:12px;border:1px solid #0DE8E9;">' + prevWord + ' + h = <b>' + getLang(prevWord, 'h', 0) + "</b></td>";
                if (getLang('', 's', 0) == prevWord)
                    helptxt += '<td style="font-size:12px;border:1px solid #0DE8E9;">' + prevWord + ' + h = <b>' + getLang(prevWord, 'h', 0) + "</b></td>";
                if (getLang('', 'S', 0) == prevWord)
                    helptxt += '<td style="font-size:12px;border:1px solid #0DE8E9;">' + prevWord + ' + r + I = <b>' + getLang(getLang(prevWord, 'r', 0), 'I', 0) + "</b></td>";
                if (getLang('k', 'n', 0).indexOf(prevWord) > 0)
                    helptxt += '<td style="font-size:12px;border:1px solid #0DE8E9;">' + prevWord + ' + t + h = <b>' + getLang(getLang(prevWord, 't', 0), 'h', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
								+ prevWord + ' + g = <b>' + getLang(prevWord, 'g', 0) + "</b></td><td style='font-size:12px;border:1px solid #0DE8E9;'>"
								+ prevWord + ' + j = <b>' + getLang(prevWord, 'j', 0) + "</b></td>";
            }
        }
        helpdiv.innerHTML = '<table cellpadding="2" cellspacing="0" border="0" style="border:1px solid #0DE8E9;background-color:#BDE8E9"><tr>' + helptxt + '</tr></table>';
        helpstyle.display = 'block';

    }
    else
        helpstyle.display = 'none';
    if (isIE) e.srcElement.onblur = hideHelp;
    else e.target.onblur = hideHelp;
}

function isLangOtru(letter) {
    isOtru = false;
    otruArr = new Array('\u200C',
	"\u0BCD", "\u0BBE", "\u0BBF", "\u0BC0", "\u0BC1", "\u0BC2", "\u0BC6", "\u0BC7", "\u0BC8", "\u0BCA", "\u0BCB", "\u0BCC", // Tamil
	"\u0C4D", "\u0C3E", "\u0C3F", "\u0C40", "\u0C41", "\u0C42", "\u0C46", "\u0C47", "\u0C48", "\u0C4A", "\u0C4B", "\u0C4C", "\u0C43", "\u0C44", "\u0C01", "\u0C02", "\u0C03",  //Telugu
	"\u094D", "\u093E", "\u093F", "\u0940", "\u0941", "\u0942", "\u0946", "\u0947", "\u0948", "\u094A", "\u094B", "\u094C", "\u0901", "\u0902", "\u0903",// Hindi
	"\u0D3E", "\u0D3F", "\u0D40", "\u0D41", "\u0D42", "\u0D43", "\u0D47", "\u0D46", "\u0D48", "\u0D4A", "\u0D4B", "\u0D4C", "\u0D4D", "\u0D02", "\u0D03",  //Malayalam
	"\u0CBE", "\u0CBF", "\u0CC0", "\u0CC1", "\u0CC2", "\u0CC3", "\u0CC4", "\u0CC6", "\u0CC7", "\u0CC8", "\u0CCA", "\u0CCB", "\u0CCD", "\u0CCC", "\u0C82", "\u0C83",//Kannada
	"\u0ABE", "\u0ABF", "\u0AC0", "\u0AC1", "\u0AC2", "\u0AC5", "\u0AC7", "\u0AC8", "\u0AC9", "\u0ACB", "\u0ACC", "\u0ACD", "\u0A81", "\u0A82", "\u0A83",//Gujarathi
	"\u0B3E", "\u0B3F", "\u0B40", "\u0B41", "\u0B42", "\u0B46", "\u0B47", "\u0B48", "\u0B4A", "\u0B4B", "\u0B4C", "\u0B4D", "\u0B01", "\u0B02", "\u0B03",//Oriya
	"\u09BE", "\u09BF", "\u09C0", "\u09C1", "\u09C2", "\u09C6", "\u09C7", "\u09C8", "\u09CA", "\u09CB", "\u09CC", "\u09CD", "\u0981", "\u0982", "\u0983",//Bengali
	"\u0A3E", "\u0A3F", "\u0A40", "\u0A41", "\u0A42", "\u0A46", "\u0A47", "\u0A48", "\u0A4A", "\u0A4B", "\u0A4C", "\u0A4D", "\u0A50", "\u0A03"//Punjabi
	);
    for (i = 0; i < otruArr.length; i++)
        if (otruArr[i] == letter)
            isOtru = true;
    return isOtru;
}

function showHelp(obj) {
    savepref = eval('document.' + obj.form.name + '.savepref');
    if (savepref != null) {
        savepref.disabled = false;
        savepref.onclick = savePref;
    }
    toShowHelp = obj.checked;
    helpstyle = getStyleObject('HelpDiv');
    if (!toShowHelp)
        helpstyle.display = 'none';
}

function hideHelp() {
    helpstyle = getStyleObject('HelpDiv');
    helpstyle.display = 'none';
}

function toggleScreen() {
    objectId = "logo";
    // cross-browser function to get an object's style object given its
    if (document.getElementById && document.getElementById(objectId)) {
        // W3C DOM
        styleObj = document.getElementById(objectId).style;
    } else if (document.all && document.all(objectId)) {
        // MSIE 4 DOM
        styleObj = document.all(objectId).style;
    } else if (document.layers && document.layers[objectId]) {
        // NN 4 DOM.. note: this won't find nested layers
        styleObj = document.layers[objectId];
    } else {
        return false;
    }
    if (styleObj.paddingTop == "" || styleObj.paddingTop == "156px") {
        styleObj.paddingTop = "56px";
        document.getElementById("updownarrow").src = webhome + "/templates/siteground39/images/downarrow.gif";
        setCookie("ScreenPref", "Half", 365);
    }
    else {
        styleObj.paddingTop = "156px";
        document.getElementById("updownarrow").src = webhome + "/templates/siteground39/images/uparrow.gif";
        setCookie("ScreenPref", "Full", 365);
    }
}

function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
    ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}