jQuery.support.cors = true;

var intMinimumLnCnt = 0;
var lstInvalidWords = [];
var strInserTypeEdt = "";
var ininitalHeightET, currentRowET, iterationET = 0;
var ininitalHeightETHeading, currentRowETHeading, iterationETHeading = 0;
$(document).ready(function () {

    //Get Line     

    //$('li').each(function () { console.log($(this).getLines()); })

    //on 29-12-2015

    //    //For Getting Invalid words for not to use in the content for Text Ads
    GetInvalidWords();
    document.addEventListener("paste", function (e) {
        if (e.target.id == "SglAdCompose_txt_English_ET" || e.target.id == "SglAdCompose_txt_EnglishMulti_ET"
            || e.target.id == "SglAdCompose_txt_English_ET_Address" || e.target.id == "SglAdCompose_txt_EnglishMulti_ET_Address"
            ) {
            //if (e.target.id == "SglAdCompose_txt_English_ET") {
            //console.log(e.target.id);
            //var currPos = 0;
            var remainText = "";
            var pastedText = undefined;
            if (window.clipboardData && window.clipboardData.getData) { // IE
                pastedText = window.clipboardData.getData('Text');
            } else if (e.clipboardData && e.clipboardData.getData) {
                pastedText = e.clipboardData.getData('text/plain');
            }
            /*
            //// e.target.innerText = "You just pasted '" + pastedText + "'";
            //// e.target.value = "You just pasted '" + pastedText + "'";
            //pastedText = getCaretPosition(e.target, pastedText);
            //if (pastedText != null && pastedText.trim() != "" && pastedText != undefined) {
            //    //if (e.target.id == "SglAdCompose_txt_English_ET")
            //    //    e.target.innerHTML = pastedText;
            //    //else // for text area
            //    $('#' + e.target.id).val(pastedText);
            //    if (e.target.id == "SglAdCompose_txt_English_ET" || e.target.id == "SglAdCompose_txt_English_ET_Address")
            //        GetEntertainmentLineCalc("");
            //    else if (e.target.id == "SglAdCompose_txt_EnglishMulti_ET" || e.target.id == "SglAdCompose_txt_EnglishMulti_ET_Address")
            //        GetEntertainmentLineCalc_Multi("");
            //}
            */
            //commented above lines & added below lines on 12122015 - changed in 'div' to 'textarea'
            pastedText = pastedText.replaceAll("\r\n\r\n", "<br>").replaceAll("\r\n", "<br>");
            var valTemp = ReplaceAllCharsOtherThanEnglish(pastedText);
            if (valTemp.trim() == "") { }
            else {
                e.preventDefault();
                $.alert.open("warning", "Please remove the following letters : '" + valTemp + "'");
                return false;
            }
            //commented above lines & added below lines on 12122015 - changed in 'div' to 'textarea'
        }
    });

    $('#txtTH').bind('input propertychange', function () {   // substitute for txtAdvContent_textchange event 
        //For Displaying first two words in Bold
        GetLnCntTH();
    });

    $('#txtBL').bind('input propertychange', function () {   // substitute for txtAdvContent_textchange event 
        GetLnCntBL();
    });

    //For Text Ads content Key Pressed i.e KeyDown
    $("#txtTH").keydown(function (event) {
        var enterkey = event.keyCode || event.which;
        var el = $(this).get(0);
        var pos = el.selectionStart;
        // for restricting the press of enter key 
        if (enterkey == 13) {
            return false;
            //event.preventDefault();
        }
        // for pressing space at the start of textarea
        if ((enterkey == 32) && ($("#txtTH").val().trim() == "")) {
            return false;
        }
        if ((enterkey == 32) && ($("#txtTH").val().trim() != "")) {
            var elem = 'txtTH';
            if (elem == 'txtTH') {
                var strCont = $("#txtTH").val();
                //To check whether there is already space where the space has been entered currently
                if (pos > 0) {
                    if (strCont.charAt(pos) == " " || strCont.charAt(pos - 1) == " ")
                        return false;
                }
                else if (pos == 0)
                    return false;
                //
                ////     show last character in the string            
                //var lastchar = strCont.charAt(strCont.length - 1);
                //if (lastchar == ' ') {
                //    //alert("doublespace");
                //    return false;
                //}
            }
        }

        //$('#txtAdsPreviewDtl').val($('#txtAdvContent').val());
        var arrBanWords = [];
        var arrConWords = [];
        arrConWords = $("#txtTH").val().toUpperCase().split(' ');
        var intCnt = 0;
        var intBanCnt = 0;
        gstrNotAccWord = "";
        //        if ((enterkey == 8) || (enterkey == 46)) {
        //            var BfChar = null;
        //            var AfChar = null;
        //            var intcurPos = txtAdvContent.SelectionStart;

        //        }    
        if (lstInvalidWords == "")
            return;
        for (lstinvi = 0; lstinvi < lstInvalidWords.length; lstinvi++) {
            var strIstCnt = lstInvalidWords[lstinvi].trim().toUpperCase().trim();
            if ($("#txtTH").val().toUpperCase().indexOf(strIstCnt) != -1) {
                arrBanWords = strIstCnt.split(' ');
                for (lstinvj = 0; lstinvj < arrConWords.length; lstinvj++) {
                    intCnt = lstinvj;
                    for (lstinvh = 0; lstinvh < arrBanWords.length; lstinvh++)
                        if (arrConWords[lstinvj].trim() == arrBanWords[lstinvh].trim()) {
                            lstinvj++;
                            intBanCnt = intBanCnt + 1;
                        }
                        else {
                            intBanCnt = 0;
                        }
                    //37----left   39-----right                
                    if (arrBanWords.length == intBanCnt) {

                        //                            txtAdvContent.Focus();
                        //                            txtAdvContent.SelectionStart = txtAdvContent.Text.toUpperCase().indexOf(strIstCnt);
                        //                            e.Handled = true;
                        if ((enterkey == 8) || (enterkey == 46)) {//for backspace and delete key
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return;
                        }
                        else if ((enterkey == 37) || (enterkey == 39)) {//for left and right key to pass through the invalid word
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return;
                        }
                        else {
                            $.alert.open("warning", "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                            //alert("'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return false;
                        }
                    }
                    lstinvj = intCnt;
                }
            }
        }
        if ($('#chkLNSameMaterialTH').is(':checked') == true) {
            $("#txtBL").val($("#txtTH").val());
            GetLnCntBL();
            $("#txtTM").val($("#txtTH").val());
            $('#lblLnCntSingle').text(TmpLnCountTM);//for setting the text in label in tamil tab the calculated line count from the duplicate mirror placed next to the hindu textbox
            //lblSameMatrial = true;
            TmpInitheight = TmpInitheight;   //for sending the initial height to txttm for calculating linecount in tamil tab when continuing to type text after clicking same material
        }
    });

    $("#txtTH").keyup(function (event) {
        var enterkey = event.keyCode || event.which;
        //$('#txtAdsPreviewDtl').val($('#txtAdvContent').val());
        if ($("#txtTH").val().trim() != "") {
            settheFocusContro($("#divEditorTH"), 'N');
            if ($('#ddlTHGroupLN').css('visibility') == 'visible') {
                if ($('#ddlTHGroupLN').val() == 'dummy') {
                    settheFocusContro($("#ddlTHGroupLN"), 'Y');
                }
                else {
                    settheFocusContro($("#ddlTHGroupLN"), 'N');
                }
            }
        }
        else {
            settheFocusContro($("#divEditorTH"), 'Y');
            if ($('#ddlTHGroupLN').css('visibility') == 'visible') {
                settheFocusContro($("#ddlTHGroupLN"), 'N');
            }
        }
        var arrBanWords = [];
        var arrConWords = [];
        arrConWords = $("#txtTH").val().toUpperCase().split(' ');
        var intCnt = 0;
        var intBanCnt = 0;
        gstrNotAccWord = "";
        //        if ((enterkey == 8) || (enterkey == 46)) {
        //            var BfChar = null;
        //            var AfChar = null;
        //            var intcurPos = txtAdvContent.SelectionStart;
        //        }    
        if (lstInvalidWords == "")
            return;
        for (lstinvi = 0; lstinvi < lstInvalidWords.length; lstinvi++) {
            var strIstCnt = lstInvalidWords[lstinvi].trim().toUpperCase().trim();
            if ($("#txtTH").val().toUpperCase().indexOf(strIstCnt) != -1) {
                arrBanWords = strIstCnt.split(' ');
                for (lstinvj = 0; lstinvj < arrConWords.length; lstinvj++) {
                    intCnt = lstinvj;
                    for (lstinvh = 0; lstinvh < arrBanWords.length; lstinvh++)
                        if (arrConWords[lstinvj].trim() == arrBanWords[lstinvh].trim()) {
                            lstinvj++;
                            intBanCnt = intBanCnt + 1;
                        }
                        else {
                            intBanCnt = 0;
                        }
                    //37----left   39-----right                
                    if (arrBanWords.length == intBanCnt) {
                        //                            txtAdvContent.Focus();
                        //                            txtAdvContent.SelectionStart = txtAdvContent.Text.toUpperCase().indexOf(strIstCnt);
                        //                            e.Handled = true;
                        if ((enterkey == 8) || (enterkey == 46)) {//for backspace and delete key
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return;
                        }
                        else if ((enterkey == 37) || (enterkey == 39)) {//for left and right key to pass through the invalid word
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return;
                        }
                        else {
                            $.alert.open("warning", "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                            // alert("'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return false;
                        }
                    }
                    lstinvj = intCnt;
                }
            }
        }

        if ($('#chkLNSameMaterialTH').is(':checked') == true) {
            $("#txtBL").val($("#txtTH").val());
            GetLnCntBL();
            $("#txtTM").val($("#txtTH").val());
            $('#lblLnCntSingle').text(TmpLnCountTM);//for setting the text in label in tamil tab the calculated line count from the duplicate mirror placed next to the hindu textbox
            //lblSameMatrial = true;
            TmpInitheight = TmpInitheight;   //for sending the initial height to txttm for calculating linecount in tamil tab when continuing to type text after clicking same material
        }
    });

    $("#txtTH").focusout(function () {   // substitute for txtAdvContent_lostfocus event 
        // alert("hello focusout");
        var intActualLnCnt = $("#txtTH").val().trim().length;
        var strAdTextEdt = "";
        var EdtLnCnt = 0;
        var strAdLnCntEdt = 0;
        var strMinLnCntEdt = 0;
        $.each(lstLnCntPubEdt, function (iii, vvv) {
            if (vvv.split('~')[0] == 'TH') {
                strAdLnCntEdt = parseInt(vvv.split('~')[2]);
                strMinLnCntEdt = parseInt(vvv.split('~')[1]);
                strAdTextEdt = vvv.split('~')[3].trim();
            }
        });
        if (((intActualLnCnt % 35) < 17) && (intActualLnCnt != 0) && ((intActualLnCnt % 35) != 0) && (intActualLnCnt > 1))
            //alert(35 - (intActualLnCnt % 35) + " characters remaining. If you wish, Please utilise the remaining space");
            // alert(35 - (intActualLnCnt % 35) + " characters remaining. If you wish, Please utilise the remaining space");
            if (strInserTypeEdt == 'SCH' && (strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R') && lstDeadLnEdtAdDtls.length > 0) {
                if (strAdLnCntEdt <= strMinLnCntEdt) {
                    EdtLnCnt = strMinLnCntEdt;
                    if ($('#THlblLnCnt').text() > EdtLnCnt) {
                        $.alert.open("warning", "Ads has been Published and the ad line count mismatch with previous line count.Ad Content is replaced by old one.");
                        $("#txtTH").val("");
                        $("#txtTH").val(strAdTextEdt);
                        THCalculateLineCount();
                    }
                }
                else if (strAdLnCntEdt > strMinLnCntEdt) {
                    EdtLnCnt = strAdLnCntEdt;
                    if ($('#THlblLnCnt').text() != EdtLnCnt) {
                        $.alert.open("warning", "Since the Ad has been Published and the ad line count mismatch with previous line count.So the Ad Content is replaced by old one.");
                        $("#txtTH").val("");
                        $("#txtTH").val(strAdTextEdt);
                        THCalculateLineCount();
                    }
                }
            }
            else if (strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R') {
                if ($('#THlblLnCnt').text() < strAdLnCntEdt) {
                    $.alert.open("warning", "Decrease in the line count of booked ad cannot be allowed.Ad Content is replaced by old one.");
                    $("#txtTH").val("");
                    $("#txtTH").val(strAdTextEdt);
                    THCalculateLineCount();
                }
            }
    });

    //For Text Ads content Key Pressed i.e KeyDown
    $("#txtBL").keydown(function (event) {
        var enterkey = event.keyCode || event.which;
        var el = $(this).get(0);
        var pos = el.selectionStart;
        // for restricting the press of enter key 
        if (enterkey == 13) {
            return false;
            //event.preventDefault();
        }
        // for pressing space at the start of textarea
        if ((enterkey == 32) && ($("#txtBL").val().trim() == "")) {
            return false;
        }
        if ((enterkey == 32) && ($("#txtBL").val().trim() != "")) {
            //       alert("entered space key");
            //  if (event.srcElement) elem = event.srcElement.id;
            //  else if (event.target) elem = event.target.id;
            var elem = 'txtBL';
            if (elem == 'txtBL') {
                var strCont = $("#txtBL").val();
                //To check whether there is already space where the space has been entered currently
                if (pos > 0) {
                    if (strCont.charAt(pos) == " " || strCont.charAt(pos - 1) == " ")
                        return false;
                }
                else if (pos == 0)
                    return false;
                //
                ////     show last character in the string            
                //var lastchar = strCont.charAt(strCont.length - 1);
                //if (lastchar == ' ') {
                //    //alert("doublespace");
                //    return false;
                //}
            }
        }

        //$('#txtAdsPreviewDtl').val($('#txtAdvContent').val());
        var arrBanWords = [];
        var arrConWords = [];
        arrConWords = $("#txtBL").val().toUpperCase().split(' ');
        var intCnt = 0;
        var intBanCnt = 0;
        gstrNotAccWord = "";
        //        if ((enterkey == 8) || (enterkey == 46)) {
        //            var BfChar = null;
        //            var AfChar = null;
        //            var intcurPos = txtAdvContent.SelectionStart;

        //        }
        if (lstInvalidWords == "")
            return;
        for (lstinvi = 0; lstinvi < lstInvalidWords.length; lstinvi++) {
            var strIstCnt = lstInvalidWords[lstinvi].trim().toUpperCase().trim();
            if ($("#txtBL").val().toUpperCase().indexOf(strIstCnt) != -1) {
                arrBanWords = strIstCnt.split(' ');
                for (lstinvj = 0; lstinvj < arrConWords.length; lstinvj++) {
                    intCnt = lstinvj;
                    for (lstinvh = 0; lstinvh < arrBanWords.length; lstinvh++)
                        if (arrConWords[lstinvj].trim() == arrBanWords[lstinvh].trim()) {
                            lstinvj++;
                            intBanCnt = intBanCnt + 1;
                        }
                        else {
                            intBanCnt = 0;
                        }
                    //37----left   39-----right                
                    if (arrBanWords.length == intBanCnt) {

                        //                            txtAdvContent.Focus();
                        //                            txtAdvContent.SelectionStart = txtAdvContent.Text.toUpperCase().indexOf(strIstCnt);
                        //                            e.Handled = true;
                        if ((enterkey == 8) || (enterkey == 46)) {//for backspace and delete key
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return;
                        }
                        else if ((enterkey == 37) || (enterkey == 39)) {//for left and right key to pass through the invalid word
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return;
                        }
                        else {
                            $.alert.open("warning", "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                            // alert("'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return false;
                        }
                    }
                    lstinvj = intCnt;
                }
            }
        }
        if ($('#chkLNSameMaterialBL').is(':checked') == true) {
            $("#txtTH").val($("#txtBL").val());
            GetLnCntTH();
            $("#txtTM").val($("#txtBL").val());
            $('#lblLnCntSingle').text(TmpLnCountTM);//for setting the text in label in tamil tab the calculated line count from the duplicate mirror placed next to the hindu textbox
            //lblSameMatrial = true;
            TmpInitheight = TmpInitheight;   //for sending the initial height to txttm for calculating linecount in tamil tab when continuing to type text after clicking same material
        }
    });

    $("#txtBL").keyup(function (event) {
        //$('#txtAdsPreviewDtl').val($('#txtAdvContent').val());
        if ($("#txtBL").val().trim() != "") {
            settheFocusContro($("#divEditorBL"), 'N');
            if ($('#ddlBLGroupLN').css('visibility') == 'visible') {
                if ($('#ddlBLGroupLN').val() == 'dummy') {
                    settheFocusContro($("#ddlBLGroupLN"), 'Y');
                }
                else {
                    settheFocusContro($("#ddlBLGroupLN"), 'N');
                }
            }
        }
        else {
            settheFocusContro($("#divEditorBL"), 'Y');
            if ($('#ddlBLGroupLN').css('visibility') == 'visible') {
                settheFocusContro($("#ddlBLGroupLN"), 'N');
            }
        }
        var arrBanWords = [];
        var arrConWords = [];
        arrConWords = $("#txtBL").val().toUpperCase().split(' ');
        var intCnt = 0;
        var intBanCnt = 0;
        gstrNotAccWord = "";
        //        if ((enterkey == 8) || (enterkey == 46)) {
        //            var BfChar = null;
        //            var AfChar = null;
        //            var intcurPos = txtAdvContent.SelectionStart;
        //        }
        if (lstInvalidWords == "")
            return;
        for (lstinvi = 0; lstinvi < lstInvalidWords.length; lstinvi++) {
            var strIstCnt = lstInvalidWords[lstinvi].trim().toUpperCase().trim();
            if ($("#txtBL").val().toUpperCase().indexOf(strIstCnt) != -1) {
                arrBanWords = strIstCnt.split(' ');
                for (lstinvj = 0; lstinvj < arrConWords.length; lstinvj++) {
                    intCnt = lstinvj;
                    for (lstinvh = 0; lstinvh < arrBanWords.length; lstinvh++)
                        if (arrConWords[lstinvj].trim() == arrBanWords[lstinvh].trim()) {
                            lstinvj++;
                            intBanCnt = intBanCnt + 1;
                        }
                        else {
                            intBanCnt = 0;
                        }
                    //37----left   39-----right                
                    if (arrBanWords.length == intBanCnt) {
                        //                            txtAdvContent.Focus();
                        //                            txtAdvContent.SelectionStart = txtAdvContent.Text.toUpperCase().indexOf(strIstCnt);
                        //                            e.Handled = true;
                        if ((enterkey == 8) || (enterkey == 46)) {//for backspace and delete key
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return;
                        }
                        else if ((enterkey == 37) || (enterkey == 39)) {//for left and right key to pass through the invalid word
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return;
                        }
                        else {
                            $.alert.open("warning", "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                            // alert("'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return false;
                        }
                    }
                    lstinvj = intCnt;
                }
            }
        }

        if ($('#chkLNSameMaterialBL').is(':checked') == true) {
            $("#txtTH").val($("#txtBL").val());
            GetLnCntTH();
            $("#txtTM").val($("#txtBL").val());
            $('#lblLnCntSingle').text(TmpLnCountTM);//for setting the text in label in tamil tab the calculated line count from the duplicate mirror placed next to the hindu textbox
            //lblSameMatrial = true;
            TmpInitheight = TmpInitheight;   //for sending the initial height to txttm for calculating linecount in tamil tab when continuing to type text after clicking same material
        }
    });

    //$("#txtTM").keyup(function (event) {
    //    if ($("#txtTM").val().trim() != "")
    //        settheFocusContro($("#divEditorTM"), 'N');
    //    else
    //        settheFocusContro($("#divEditorTM"), 'Y');
    //});

    $("#txtBL").focusout(function () {   // substitute for txtAdvContent_lostfocus event 
        // alert("hello focusout");
        var intActualLnCnt = $("#txtBL").val().trim().length;
        var strAdTextEdt = "";
        var EdtLnCnt = 0;
        var strAdLnCntEdt = 0;
        var strMinLnCntEdt = 0;
        $.each(lstLnCntPubEdt, function (iii, vvv) {
            if (vvv.split('~')[0] == 'BL') {
                strAdLnCntEdt = parseInt(vvv.split('~')[2]);
                strMinLnCntEdt = parseInt(vvv.split('~')[1]);
                strAdTextEdt = vvv.split('~')[3].trim();
            }
        });
        if (((intActualLnCnt % 35) < 17) && (intActualLnCnt != 0) && ((intActualLnCnt % 35) != 0) && (intActualLnCnt > 1))
            //alert(35 - (intActualLnCnt % 35) + " characters remaining. If you wish, Please utilise the remaining space");
            //  alert(35 - (intActualLnCnt % 35) + " characters remaining. If you wish, Please utilise the remaining space");
            if (strInserTypeEdt == 'SCH' && (strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R') && lstDeadLnEdtAdDtls.length > 0) {
                if (strAdLnCntEdt <= strMinLnCntEdt) {
                    EdtLnCnt = strMinLnCntEdt;
                    if ($('#BLlblLnCnt').text() > EdtLnCnt) {
                        $.alert.open("warning", "Ads has been Published and the ad line count mismatch with previous line count.Ad Content is replaced by old one.");
                        $("#txtBL").val("");
                        $("#txtBL").val(strAdTextEdt);
                        BLCalculateLineCount();
                    }
                }
                else if (strAdLnCntEdt > strMinLnCntEdt) {
                    EdtLnCnt = strAdLnCntEdt;
                    if ($('#BLlblLnCnt').text() != EdtLnCnt) {
                        $.alert.open("warning", "Since the Ad has been Published and the ad line count mismatch with previous line count.So the Ad Content is replaced by old one.");
                        $("#txtBL").val("");
                        $("#txtBL").val(strAdTextEdt);
                        BLCalculateLineCount();
                    }
                }
            }
            else if (strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R') {
                if ($('#BLlblLnCnt').text() < strAdLnCntEdt) {
                    $.alert.open("warning", "Decrease in the line count of booked ad cannot be allowed.Ad Content is replaced by old one.");
                    $("#txtBL").val("");
                    $("#txtBL").val(strAdTextEdt);
                    BLCalculateLineCount();
                }
            }
    });

    $("#txtTM").focusout(function () {   // substitute for txtAdvContent_lostfocus event 
        //alert("hello focusout");
        //var intActualLnCnt = $("#txtTM").val().trim().length;
        var strAdTextEdt = $("#txtTM").val().trim();
        var strAdTextEdt = "";
        var EdtLnCnt = 0;
        var strAdLnCntEdt = 0;
        var strMinLnCntEdt = 0;
        $.each(lstLnCntPubEdt, function (iii, vvv) {
            if (vvv.split('~')[0] == 'TM') {
                strAdLnCntEdt = parseInt(vvv.split('~')[2]);
                strMinLnCntEdt = parseInt(vvv.split('~')[1]);
                strAdTextEdt = vvv.split('~')[3].trim();
            }
        });
        //if (((intActualLnCnt % 35) < 17) && (intActualLnCnt != 0) && ((intActualLnCnt % 35) != 0) && (intActualLnCnt > 1))
        //    alert(35 - (intActualLnCnt % 35) + " characters remaining. If you wish, Please utilise the remaining space");
        if (strInserTypeEdt == 'SCH' && (strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R') && lstDeadLnEdtAdDtls.length > 0) {
            if (strAdLnCntEdt <= strMinLnCntEdt) {
                EdtLnCnt = strMinLnCntEdt;
                if ($('#lblLnCntSingle').text() > EdtLnCnt) {
                    $.alert.open("warning", "Ads has been Published and the ad line count mismatch with previous line count.Ad Content is replaced by old one.");
                    $("#txtTM").val("");
                    $("#txtTM").val(strAdTextEdt);
                }
            }
            else if (strAdLnCntEdt > strMinLnCntEdt) {
                EdtLnCnt = strAdLnCntEdt;
                if ($('#lblLnCntSingle').text() != EdtLnCnt) {
                    $.alert.open("warning", "Since the Ad has been Published and the ad line count mismatch with previous line count.So the Ad Content is replaced by old one.");
                    $("#txtTM").val("");
                    $("#txtTM").val(strAdTextEdt);
                    $('#lblLnCntSingle').text(strAdLnCntEdt);
                }
            }
        }
        else if (strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R') {
            if ($('#lblLnCntSingle').text() < strAdLnCntEdt) {
                $.alert.open("warning", "Decrease in the line count of booked ad cannot be allowed.Ad Content is replaced by old one.");
                $("#txtTM").val("");
                $("#txtTM").val(strAdTextEdt);
                $('#lblLnCntSingle').text(strAdLnCntEdt);
            }
        }
    });

    //$('a.tltip').click(function () {
    //    if ((strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R') && lstDeadLnEdtAdDtls.length > 0 && blnEditFlag == true) {
    //        return false;
    //    }
    //    $(this).toggleClass('on');
    //    if ($(this).hasClass('on')) {
    //        if (this.id == 'THbold') {
    //            if ((strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R') && ($('#' + this.id).prop('disabled') == true) && blnEditFlag == true) {
    //                $(this).toggleClass('on');
    //                return false;
    //            }
    //            //TwoWordsBold();
    //        }
    //        else if (this.id == 'THtick') {
    //            if ((strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R') && ($('#' + this.id).prop('disabled') == true) && blnEditFlag == true) {
    //                $(this).toggleClass('on');
    //                return false;
    //            }
    //            //TwoWordsBold();
    //        }
    //        else if (this.id == 'BLbold') {
    //            if ((strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R') && ($('#' + this.id).prop('disabled') == true) && blnEditFlag == true) {
    //                $(this).toggleClass('on');
    //                return false;
    //            }
    //            //TwoWordsBold();
    //        }
    //        else if (this.id == 'BLtick') {
    //            if ((strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R') && ($('#' + this.id).prop('disabled') == true) && blnEditFlag == true) {
    //                $(this).toggleClass('on');
    //                return false;
    //            }
    //            //TwoWordsBold();
    //        }
    //    }
    //    else {
    //        if (this.id == 'THbold') {
    //            if ((strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R') && ($('#' + this.id).prop('disabled') == true) && blnEditFlag == true) {
    //                $(this).toggleClass('on');
    //                return false;
    //            }
    //            //TwoWordsBold();
    //        }
    //        else if (this.id == 'THtick') {
    //            if ((strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R') && ($('#' + this.id).prop('disabled') == true) && blnEditFlag == true) {
    //                $(this).toggleClass('on');
    //                return false;
    //            }
    //            //TwoWordsBold();
    //        }
    //        else if (this.id == 'BLbold') {
    //            if ((strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R') && ($('#' + this.id).prop('disabled') == true) && blnEditFlag == true) {
    //                $(this).toggleClass('on');
    //                return false;
    //            }
    //            //TwoWordsBold();
    //        }
    //        else if (this.id == 'BLtick') {
    //            if ((strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R') && ($('#' + this.id).prop('disabled') == true) && blnEditFlag == true) {
    //                $(this).toggleClass('on');
    //                return false;
    //            }
    //            //TwoWordsBold();
    //        }
    //    }
    //});

    $('#rbtnBWTH').click(function (event) {
        $("#lstColorTH").css('display', 'none');
        $("#SglAdCompose_txt_EnglishMulti .sp-preview").css('display', 'none');
        //$(".togglePaletteOnly").spectrum("set", "#FFFFFF");// to set the selected color to the palette in lstcolorTH
        gstrColorCode = '';
    });

    $('#rbtnCOLTH').click(function (event) {
        //$("#lstColorTH").css('display', 'inline-block');
        $("#SglAdCompose_txt_EnglishMulti .sp-preview").css('display', 'inline-block');
    });

    $('#rbtnBWTM').click(function (event) {
        $("#pChooseTam").css('display', 'none');
        $("#lstColorTM").css('display', 'none');
        $("#tabTM .sp-preview").css('display', 'none');
        //$(".togglePaletteOnly").spectrum("set", "#FFFFFF");// to set the selected color to the palette in lstcolorTM
        gstrColorCode = '';
    });

    $('#rbtnCOLTM').click(function (event) {
        $("#pChooseTam").css('display', 'inline-block');
        //$("#lstColorTM").css('display', 'inline-block');
        $("#tabTM .sp-preview").css('display', 'inline-block');
    });

    $('#rbtnBWBL').click(function (event) {
        $("#lstColorBL").css('display', 'none');
        $("#tabBL .sp-preview").css('display', 'none');
        //$(".togglePaletteOnly").spectrum("set", "#FFFFFF");// to set the selected color to the palette in lstcolorTH
        gstrColorCode = '';
    });

    $('#rbtnCOLBL').click(function (event) {
        $("#lstColorBL").css('display', 'inline-block');
        $("#tabBL .sp-preview").css('display', 'inline-block');
    });

    //For Text Ads content Key Pressed i.e KeyDown
    //$("#txtTM").keyup
    //(
    //function (event) {
    //});

    //    $("#txtTM").keydown
    //(
    //function (event) {
    //    var enterkey = event.keyCode || event.which;
    //    // for restricting the press of enter key 
    //    if (enterkey == 13) {
    //        return false;
    //        //event.preventDefault();
    //    }
    //    // for pressing space at the start of textarea
    //    if ((enterkey == 32) && ($("#txtTM").val().trim() == "")) {
    //        return false;
    //    }
    //    if ((enterkey == 32) && ($("#txtTM").val().trim() != "")) {
    //        //       alert("entered space key");
    //        //  if (event.srcElement) elem = event.srcElement.id;
    //        //  else if (event.target) elem = event.target.id;
    //        var elem = 'txtTM';
    //        if (elem == 'txtTM') {
    //            var strCont = $("#txtTM").val();
    //            //     show last character in the string
    //            //   alert(str);
    //            var lastchar = strCont.charAt(strCont.length - 1);
    //            if (lastchar == ' ') {
    //                //alert("doublespace");
    //                return false;
    //            }
    //        }
    //    }
    //});

    //**************************************************************************//
    //  For Franchisee line ad compose for Multiple (Nasurudeen 05-03-2015)
    //**************************************************************************//

    $('#SglAdCompose_txt_EnglishMulti').bind('input propertychange', function () {   // substitute for txtAdvContent_textchange event 
        //For Displaying first two words in Bold
        GetLnCntTH();
    });

    $('#txtBL').bind('input propertychange', function () {   // substitute for txtAdvContent_textchange event 
        GetLnCntBL();
    });

    //For Text Ads content Key Pressed i.e KeyDown
    $("#SglAdCompose_txt_EnglishMulti").keydown(function (event) {
        var enterkey = event.keyCode || event.which;
        var el = $(this).get(0);
        var pos = el.selectionStart;
        // for restricting the press of enter key 
        if (enterkey == 13) {
            return false;
            //event.preventDefault();
        }
        // for pressing space at the start of textarea
        if ((enterkey == 32) && ($("#SglAdCompose_txt_EnglishMulti").val().trim() == "")) {
            return false;
        }
        if ((enterkey == 32) && ($("#SglAdCompose_txt_EnglishMulti").val().trim() != "")) {
            var elem = 'SglAdCompose_txt_EnglishMulti';
            if (elem == 'SglAdCompose_txt_EnglishMulti') {
                var strCont = $("#SglAdCompose_txt_EnglishMulti").val();
                //To check whether there is already space where the space has been entered currently
                if (pos > 0) {
                    if (strCont.charAt(pos) == " " || strCont.charAt(pos - 1) == " ")
                        return false;
                }
                else if (pos == 0)
                    return false;
                //
                ////     show last character in the string            
                //var lastchar = strCont.charAt(strCont.length - 1);
                //if (lastchar == ' ') {
                //    //alert("doublespace");
                //    return false;
                //}
            }
        }

        //$('#txtAdsPreviewDtl').val($('#txtAdvContent').val());
        var arrBanWords = [];
        var arrConWords = [];
        arrConWords = $("#SglAdCompose_txt_EnglishMulti").val().toUpperCase().split(' ');
        var intCnt = 0;
        var intBanCnt = 0;
        gstrNotAccWord = "";
        //        if ((enterkey == 8) || (enterkey == 46)) {
        //            var BfChar = null;
        //            var AfChar = null;
        //            var intcurPos = txtAdvContent.SelectionStart;

        //        }    
        if (lstInvalidWords == "")
            return;
        for (lstinvi = 0; lstinvi < lstInvalidWords.length; lstinvi++) {
            var strIstCnt = lstInvalidWords[lstinvi].trim().toUpperCase().trim();
            if ($("#SglAdCompose_txt_EnglishMulti").val().toUpperCase().indexOf(strIstCnt) != -1) {
                arrBanWords = strIstCnt.split(' ');
                for (lstinvj = 0; lstinvj < arrConWords.length; lstinvj++) {
                    intCnt = lstinvj;
                    for (lstinvh = 0; lstinvh < arrBanWords.length; lstinvh++)
                        if (arrConWords[lstinvj].trim() == arrBanWords[lstinvh].trim()) {
                            lstinvj++;
                            intBanCnt = intBanCnt + 1;
                        }
                        else {
                            intBanCnt = 0;
                        }
                    //37----left   39-----right                
                    if (arrBanWords.length == intBanCnt) {

                        //                            txtAdvContent.Focus();
                        //                            txtAdvContent.SelectionStart = txtAdvContent.Text.toUpperCase().indexOf(strIstCnt);
                        //                            e.Handled = true;
                        if ((enterkey == 8) || (enterkey == 46)) {//for backspace and delete key
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            //return;
                        }
                        else if ((enterkey == 37) || (enterkey == 39)) {//for left and right key to pass through the invalid word
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            //return;
                        }
                        else {
                            $.alert.open("warning", "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                            //alert("'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return false;
                        }
                    }
                    lstinvj = intCnt;
                }
            }
        }
        if ($('#chkLNSameMaterialTH').is(':checked') == true) {
            $("#txtBL").val($("#SglAdCompose_txt_EnglishMulti").val());
            GetLnCntBL();
            $("#txtTM").val($("#SglAdCompose_txt_EnglishMulti").val());
            $('#lblLnCntSingle').text(TmpLnCountTM);//for setting the text in label in tamil tab the calculated line count from the duplicate mirror placed next to the hindu textbox
            //lblSameMatrial = true;
            TmpInitheight = TmpInitheight;   //for sending the initial height to txttm for calculating linecount in tamil tab when continuing to type text after clicking same material
        }
    });

    $("#SglAdCompose_txt_EnglishMulti").keyup(function (event) {
        var enterkey = event.keyCode || event.which;
        //$('#txtAdsPreviewDtl').val($('#txtAdvContent').val());
        if ($("#SglAdCompose_txt_EnglishMulti").val().trim() != "") {
            settheFocusContro($("#divEditorTH"), 'N');
            if ($('#ddlTHGroupLN').css('visibility') == 'visible') {
                if ($('#ddlTHGroupLN').val() == 'dummy') {
                    settheFocusContro($("#ddlTHGroupLN"), 'Y');
                }
                else {
                    settheFocusContro($("#ddlTHGroupLN"), 'N');
                }
            }
        }
        else {
            settheFocusContro($("#divEditorTH"), 'Y');
            if ($('#ddlTHGroupLN').css('visibility') == 'visible') {
                settheFocusContro($("#ddlTHGroupLN"), 'N');
            }
        }
        var arrBanWords = [];
        var arrConWords = [];
        arrConWords = $("#SglAdCompose_txt_EnglishMulti").val().toUpperCase().split(' ');
        var intCnt = 0;
        var intBanCnt = 0;
        gstrNotAccWord = "";
        //        if ((enterkey == 8) || (enterkey == 46)) {
        //            var BfChar = null;
        //            var AfChar = null;
        //            var intcurPos = txtAdvContent.SelectionStart;
        //        }    
        if (lstInvalidWords == "")
            return;
        for (lstinvi = 0; lstinvi < lstInvalidWords.length; lstinvi++) {
            var strIstCnt = lstInvalidWords[lstinvi].trim().toUpperCase().trim();
            if ($("#SglAdCompose_txt_EnglishMulti").val().toUpperCase().indexOf(strIstCnt) != -1) {
                arrBanWords = strIstCnt.split(' ');
                for (lstinvj = 0; lstinvj < arrConWords.length; lstinvj++) {
                    intCnt = lstinvj;
                    for (lstinvh = 0; lstinvh < arrBanWords.length; lstinvh++)
                        if (arrConWords[lstinvj].trim() == arrBanWords[lstinvh].trim()) {
                            lstinvj++;
                            intBanCnt = intBanCnt + 1;
                        }
                        else {
                            intBanCnt = 0;
                        }
                    //37----left   39-----right                
                    if (arrBanWords.length == intBanCnt) {
                        //                            txtAdvContent.Focus();
                        //                            txtAdvContent.SelectionStart = txtAdvContent.Text.toUpperCase().indexOf(strIstCnt);
                        //                            e.Handled = true;
                        if ((enterkey == 8) || (enterkey == 46)) {//for backspace and delete key
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return false;
                        }
                        else if ((enterkey == 37) || (enterkey == 39)) {//for left and right key to pass through the invalid word
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return false;
                        }
                        else {
                            $.alert.open("warning", "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                            // alert("'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return false;
                        }
                    }
                    lstinvj = intCnt;
                }
            }
        }

        if ($('#chkLNSameMaterialTH').is(':checked') == true) {
            $("#txtBL").val($("#SglAdCompose_txt_EnglishMulti").val());
            GetLnCntBL();
            $("#txtTM").val($("#SglAdCompose_txt_EnglishMulti").val());
            $('#lblLnCntSingle').text(TmpLnCountTM);//for setting the text in label in tamil tab the calculated line count from the duplicate mirror placed next to the hindu textbox
            //lblSameMatrial = true;
            TmpInitheight = TmpInitheight;   //for sending the initial height to txttm for calculating linecount in tamil tab when continuing to type text after clicking same material

        }
    });

    $("#SglAdCompose_txt_English").keydown(function (event) {
        var enterkey = event.keyCode || event.which;
        var el = $(this).get(0);
        var pos = el.selectionStart;
        // for restricting the press of enter key 
        if (enterkey == 13) {
            return false;
            //event.preventDefault();
        }
        // for pressing space at the start of textarea
        if ((enterkey == 32) && ($("#SglAdCompose_txt_English").val().trim() == "")) {
            return false;
        }
        if ((enterkey == 32) && ($("#SglAdCompose_txt_English").val().trim() != "")) {
            var elem = 'SglAdCompose_txt_English';
            if (elem == 'SglAdCompose_txt_English') {
                var strCont = $("#SglAdCompose_txt_English").val();
                //To check whether there is already space where the space has been entered currently
                if (pos > 0) {
                    if (strCont.charAt(pos) == " " || strCont.charAt(pos - 1) == " ")
                        return false;
                }
                else if (pos == 0)
                    return false;
                //
                ////     show last character in the string            
                //var lastchar = strCont.charAt(strCont.length - 1);
                //if (lastchar == ' ') {
                //    //alert("doublespace");
                //    return false;
                //}
            }
        }

        //$('#txtAdsPreviewDtl').val($('#txtAdvContent').val());
        var arrBanWords = [];
        var arrConWords = [];
        arrConWords = $("#SglAdCompose_txt_English").val().toUpperCase().split(' ');
        var intCnt = 0;
        var intBanCnt = 0;
        gstrNotAccWord = "";
        //        if ((enterkey == 8) || (enterkey == 46)) {
        //            var BfChar = null;
        //            var AfChar = null;
        //            var intcurPos = txtAdvContent.SelectionStart;

        //        }    
        if (lstInvalidWords == "")
            return;
        for (lstinvi = 0; lstinvi < lstInvalidWords.length; lstinvi++) {
            var strIstCnt = lstInvalidWords[lstinvi].trim().toUpperCase().trim();
            if ($("#SglAdCompose_txt_English").val().toUpperCase().indexOf(strIstCnt) != -1) {
                arrBanWords = strIstCnt.split(' ');
                for (lstinvj = 0; lstinvj < arrConWords.length; lstinvj++) {
                    intCnt = lstinvj;
                    for (lstinvh = 0; lstinvh < arrBanWords.length; lstinvh++)
                        if (arrConWords[lstinvj].trim() == arrBanWords[lstinvh].trim()) {
                            lstinvj++;
                            intBanCnt = intBanCnt + 1;
                        }
                        else {
                            intBanCnt = 0;
                        }
                    //37----left   39-----right                
                    if (arrBanWords.length == intBanCnt) {

                        //                            txtAdvContent.Focus();
                        //                            txtAdvContent.SelectionStart = txtAdvContent.Text.toUpperCase().indexOf(strIstCnt);
                        //                            e.Handled = true;
                        if ((enterkey == 8) || (enterkey == 46)) {//for backspace and delete key
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            //return false;
                        }
                        else if ((enterkey == 37) || (enterkey == 39)) {//for left and right key to pass through the invalid word
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            //return false;
                        }
                        else {
                            $.alert.open("warning", "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                            //alert("'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return false;
                        }
                    }
                    lstinvj = intCnt;
                }

            }
        }
        if ($('#chkLNSameMaterialTH').is(':checked') == true) {
            $("#txtBL").val($("#SglAdCompose_txt_English").val());
            GetLnCntBL();
            $("#txtTM").val($("#SglAdCompose_txt_English").val());
            $('#lblLnCntSingle').text(TmpLnCountTM);//for setting the text in label in tamil tab the calculated line count from the duplicate mirror placed next to the hindu textbox
            //lblSameMatrial = true;
            TmpInitheight = TmpInitheight;   //for sending the initial height to txttm for calculating linecount in tamil tab when continuing to type text after clicking same material

        }
    });

    $("#SglAdCompose_txt_English").keyup(function (event) {
        var enterkey = event.keyCode || event.which;
        //$('#txtAdsPreviewDtl').val($('#txtAdvContent').val());
        if ($("#SglAdCompose_txt_English").val().trim() != "") {
            settheFocusContro($("#divEditorTH"), 'N');
            if ($('#ddlTHGroupLN').css('visibility') == 'visible') {
                if ($('#ddlTHGroupLN').val() == 'dummy') {
                    settheFocusContro($("#ddlTHGroupLN"), 'Y');
                }
                else {
                    settheFocusContro($("#ddlTHGroupLN"), 'N');
                }
            }
        }
        else {
            settheFocusContro($("#divEditorTH"), 'Y');
            if ($('#ddlTHGroupLN').css('visibility') == 'visible') {
                settheFocusContro($("#ddlTHGroupLN"), 'N');
            }
        }
        var arrBanWords = [];
        var arrConWords = [];
        arrConWords = $("#SglAdCompose_txt_English").val().toUpperCase().split(' ');
        var intCnt = 0;
        var intBanCnt = 0;
        gstrNotAccWord = "";
        //        if ((enterkey == 8) || (enterkey == 46)) {
        //            var BfChar = null;
        //            var AfChar = null;
        //            var intcurPos = txtAdvContent.SelectionStart;
        //        }    
        if (lstInvalidWords == "")
            return;
        for (lstinvi = 0; lstinvi < lstInvalidWords.length; lstinvi++) {
            var strIstCnt = lstInvalidWords[lstinvi].trim().toUpperCase().trim();
            if ($("#SglAdCompose_txt_English").val().toUpperCase().indexOf(strIstCnt) != -1) {
                arrBanWords = strIstCnt.split(' ');
                for (lstinvj = 0; lstinvj < arrConWords.length; lstinvj++) {
                    intCnt = lstinvj;
                    for (lstinvh = 0; lstinvh < arrBanWords.length; lstinvh++)
                        if (arrConWords[lstinvj].trim() == arrBanWords[lstinvh].trim()) {
                            lstinvj++;
                            intBanCnt = intBanCnt + 1;
                        }
                        else {
                            intBanCnt = 0;
                        }
                    //37----left   39-----right                
                    if (arrBanWords.length == intBanCnt) {
                        //                            txtAdvContent.Focus();
                        //                            txtAdvContent.SelectionStart = txtAdvContent.Text.toUpperCase().indexOf(strIstCnt);
                        //                            e.Handled = true;
                        if ((enterkey == 8) || (enterkey == 46)) {//for backspace and delete key
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return false;
                        }
                        else if ((enterkey == 37) || (enterkey == 39)) {//for left and right key to pass through the invalid word
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return false;
                        }
                        else {
                            $.alert.open("warning", "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                            // alert("'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                            gstrNotAccWord = "'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements";
                            return false;
                        }
                    }
                    lstinvj = intCnt;
                }
            }
        }

        if ($('#chkLNSameMaterialTH').is(':checked') == true) {
            $("#txtBL").val($("#SglAdCompose_txt_English").val());
            GetLnCntBL();
            $("#txtTM").val($("#SglAdCompose_txt_English").val());
            $('#lblLnCntSingle').text(TmpLnCountTM);//for setting the text in label in tamil tab the calculated line count from the duplicate mirror placed next to the hindu textbox
            //lblSameMatrial = true;
            TmpInitheight = TmpInitheight;   //for sending the initial height to txttm for calculating linecount in tamil tab when continuing to type text after clicking same material

        }
    });

    $("#SglAdCompose_txt_EnglishMulti").focusout(function () {   // substitute for txtAdvContent_lostfocus event 
        // alert("hello focusout");
        var intActualLnCnt = $("#SglAdCompose_txt_EnglishMulti").val().trim().length;
        var strAdTextEdt = "";
        var EdtLnCnt = 0;
        var strAdLnCntEdt = 0;
        var strMinLnCntEdt = 0;
        $.each(lstLnCntPubEdt, function (iii, vvv) {
            if (vvv.split('~')[0] == EdnSelPub && vvv.split('~')[7] == EdnSelEdn) {
                strAdLnCntEdt = parseInt(vvv.split('~')[2]);
                strMinLnCntEdt = parseInt(vvv.split('~')[1]);
                strAdTextEdt = vvv.split('~')[3].trim();
            }
        });
        //if (((intActualLnCnt % 35) < 17) && (intActualLnCnt != 0) && ((intActualLnCnt % 35) != 0) && (intActualLnCnt > 1))
        //alert(35 - (intActualLnCnt % 35) + " characters remaining. If you wish, Please utilise the remaining space");
        //   alert(35 - (intActualLnCnt % 35) + " characters remaining. If you wish, Please utilise the remaining space");
        if (strInserTypeEdt == 'SCH' && (strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R') && lstDeadLnEdtAdDtls.length > 0) {
            if (strAdLnCntEdt <= strMinLnCntEdt) {
                EdtLnCnt = strMinLnCntEdt;
                if ($('#lblLnCntMulti').text() > EdtLnCnt) {
                    $.alert.open("warning", "Ads has been Published and the ad line count mismatch with previous line count.Ad Content is replaced by old one.");
                    $("#SglAdCompose_txt_EnglishMulti").val("");
                    $("#SglAdCompose_txt_EnglishMulti").val(strAdTextEdt);
                    THCalculateLineCount();
                    return false;
                }
            }
            else if (strAdLnCntEdt > strMinLnCntEdt) {
                EdtLnCnt = strAdLnCntEdt;
                if ($('#lblLnCntMulti').text() != EdtLnCnt) {
                    $.alert.open("warning", "Since the Ad has been Published and the ad line count mismatch with previous line count.So the Ad Content is replaced by old one.");
                    $("#SglAdCompose_txt_EnglishMulti").val("");
                    $("#SglAdCompose_txt_EnglishMulti").val(strAdTextEdt);
                    THCalculateLineCount();
                    return false;
                }
            }
        }
        else if (strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R') {
            if ($('#lblLnCntMulti').text() < strAdLnCntEdt && strAdLnCntEdt > strMinLnCntEdt) {
                /*Commented below on 18062015 - to allow decrease in ad - milton said
                $.alert.open("warning", "Decrease in the line count of booked ad cannot be allowed.Ad Content is replaced by old one.");
                $("#SglAdCompose_txt_EnglishMulti").val("");
                $("#SglAdCompose_txt_EnglishMulti").val(strAdTextEdt);
                THCalculateLineCount();
                return false;
                */
            }
        }
    });

    $("#SglAdCompose_txt_English").focusout(function () {   // substitute for txtAdvContent_lostfocus event 
        // alert("hello focusout");
        var intActualLnCnt = $("#SglAdCompose_txt_English").val().trim().length;
        var strAdTextEdt = "";
        var EdtLnCnt = 0;
        var strAdLnCntEdt = 0;
        var strMinLnCntEdt = 0;
        $.each(lstLnCntPubEdt, function (iii, vvv) {
            if (vvv.split('~')[0] == EdnSelPub && vvv.split('~')[7] == EdnSelEdn) {
                strAdLnCntEdt = parseInt(vvv.split('~')[2]);
                strMinLnCntEdt = parseInt(vvv.split('~')[1]);
                strAdTextEdt = vvv.split('~')[3].trim();
            }
        });
        //if (((intActualLnCnt % 35) < 17) && (intActualLnCnt != 0) && ((intActualLnCnt % 35) != 0) && (intActualLnCnt > 1))
        //alert(35 - (intActualLnCnt % 35) + " characters remaining. If you wish, Please utilise the remaining space");
        //   alert(35 - (intActualLnCnt % 35) + " characters remaining. If you wish, Please utilise the remaining space");
        if (lstLnCntPubEdt.length > 0) {
            if (strInserTypeEdt == 'SCH' && (strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R') && lstDeadLnEdtAdDtls.length > 0) {
                if (strAdLnCntEdt <= strMinLnCntEdt) {
                    EdtLnCnt = strMinLnCntEdt;
                    if (parseFloat($('#lblLnCntSingle').text()) > EdtLnCnt) {
                        $.alert.open("warning", "Ads has been Published and the ad line count mismatch with previous line count.Ad Content is replaced by old one.");
                        $("#SglAdCompose_txt_English").val("");
                        $("#SglAdCompose_txt_English").val(strAdTextEdt);
                        CalculateLineCount();
                        return false;
                    }
                }
                else if (strAdLnCntEdt > strMinLnCntEdt) {
                    EdtLnCnt = strAdLnCntEdt;
                    if (parseFloat($('#lblLnCntSingle').text()) != EdtLnCnt) {
                        $.alert.open("warning", "Since the Ad has been Published and the ad line count mismatch with previous line count.So the Ad Content is replaced by old one.");
                        $("#SglAdCompose_txt_English").val("");
                        $("#SglAdCompose_txt_English").val(strAdTextEdt);
                        CalculateLineCount();
                        return false;
                    }
                }
            }
            else if (strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R') {
                if (parseFloat($('#lblLnCntSingle').text()) < strAdLnCntEdt && strAdLnCntEdt > strMinLnCntEdt) {
                    /*Commented below on 18062015 - to allow decrease in ad - milton said
                    $.alert.open("warning", "Decrease in the line count of booked ad cannot be allowed.Ad Content is replaced by old one.");
                    $("#SglAdCompose_txt_English").val("");
                    $("#SglAdCompose_txt_English").val(strAdTextEdt);
                    CalculateLineCount();
                    return false;
                    */
                }
            }
        }
    });

    //**************************************************************************//
    //  End Franchisee line ad compose for Multiple (Nasurudeen 05-03-2015)
    //**************************************************************************//

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    if (isMobile.Windows() || isMobile.Android()) {
        //alert("windows mobile");

        jQuery.fn.trackRows = function () {
            return this.each(function () {

                var ininitalHeight, currentRow, iteration = 0;

                var createMirror = function (textarea) {
                    jQuery(textarea).after('<div class="autogrow-textarea-mirror"></div>');
                    return jQuery(textarea).next('.autogrow-textarea-mirror')[0];
                }

                var sendContentToMirror = function (textarea) {
                    // convertThis(event);
                    //mirror.innerHTML = String(textarea.value.substring(0,textarea.selectionStart)).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />') + '<br/>.';
                    mirror.innerHTML = String(textarea.value.substring(0, undefined)).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />') + '<br/>.';

                    calculateRowNumber();
                }

                var growTextarea = function (event) {
                    convertThis(event);
                    sendContentToMirror(event.currentTarget);
                }

                var calculateRowNumber = function () {
                    if (iteration === 0) {
                        ininitalHeight = $(mirror).height();
                        currentHeight = ininitalHeight;
                        iteration++;
                    }
                    else {
                        currentHeight = $(mirror).height();
                    }
                    //document.getElementById('txt1').value = currentHeight;
                    //document.getElementById('txt2').value = ininitalHeight;
                    currentRow = Math.floor(currentHeight / (ininitalHeight / 2) - 1);
                    //remove tracker in production
                    // $('.tracker').html('Current row: ' + currentRow);
                    if ($('#SglAdCompose_txt_Tamil').val().trim() == "")
                        $('#lblLnCntSingle').text(0);
                    else
                        $('#lblLnCntSingle').text(currentRow);

                    strSingleAdText = $('#SglAdCompose_txt_Tamil').val().trim();
                }

                // Create a mirror
                var mirror = createMirror(this);

                // Style the mirror
                mirror.style.display = 'none';
                mirror.style.wordWrap = 'break-word';
                mirror.style.whiteSpace = jQuery(this).css('white-space');
                mirror.style.padding = jQuery(this).css('padding');
                //mirror.style.width = "265px";
                mirror.style.width = '300px';
                //mirror.style.width = jQuery(this).css('width');
                mirror.style.fontFamily = jQuery(this).css('font-family');
                mirror.style.fontSize = jQuery(this).css('font-size');
                mirror.style.lineHeight = jQuery(this).css('line-height');
                //mirror.style.background = 'red';

                // Style the textarea
                //this.style.overflowY = "scroll";
                //this.style.overflowX = "hidden";
                this.style.overflow = "hidden";
                this.style.minHeight = this.rows + "em";

                var ininitalHeight = $(mirror).height();

                // Bind the textarea's event
                this.onkeyup = growTextarea;

                // Fire the event for text already present
                // sendContentToMirror(this);

            });
        };
        jQuery.fn.trackRowsET = function () {
            return this.each(function () {
                var createMirrorET = function (textareaET) {
                    jQuery(textareaET).after('<div class="autogrow-textarea-mirrorET"></div>');
                    return jQuery(textareaET).next('.autogrow-textarea-mirrorET')[0];
                }
                var createMirrorETHeading = function (textareaET) {
                    jQuery('.autogrow-textarea-mirrorET').after('<div class="autogrow-textarea-mirrorETHeading"></div>');
                    jQuery('.autogrow-textarea-mirrorETHeading').after('<label id="lblmirrorETHeading" style="display:none"></label>');
                    return jQuery('.autogrow-textarea-mirrorET').next('.autogrow-textarea-mirrorETHeading')[0];
                }
                //var sendContentToMirrorET = function (textareaET) {
                //    // convertThis(event);
                //    //mirror.innerHTML = String(textarea.value.substring(0,textarea.selectionStart)).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />') + '<br/>.';
                //    mirror.innerHTML = String(textareaET.value.substring(0, undefined)).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />') + '<br/>.';
                //    calculateRowNumberET(textareaET.id);
                //}
                //var growTextareaET = function (event) {
                //   sendContentToMirrorET(event.currentTarget);
                //}
                //var calculateRowNumberET = function (pEveCurrId) {
                //    if (iterationET === 0) {
                //        ininitalHeightET = $(mirror).height();
                //        currentHeightET = ininitalHeightET;
                //        iterationET++;
                //    }
                //    else {
                //        currentHeightET = $(mirror).height();
                //    }
                //    currentRowET = Math.floor(currentHeightET / (ininitalHeightET / 2) - 1);
                //    $('#THlblLnCnt').text(currentRowET.toString());
                //}
                // Create a mirror
                var mirror = createMirrorET(this);
                var mirrorHeading = createMirrorETHeading(this);
                // Style the mirror
                mirror.style.display = 'none';
                mirror.style.wordWrap = 'break-word';
                //mirror.style.whiteSpace = jQuery(this).css('white-space');
                mirror.style.padding = jQuery(this).css('padding');
                mirror.style.width = '132.283464567px';
                //mirror.style.width = jQuery(this).css('width');
                mirror.style.fontFamily = jQuery(this).css('font-family');
                mirror.style.fontSize = jQuery(this).css('font-size');
                mirror.style.resize = 'none';
                //mirror.style.lineHeight = jQuery(this).css('line-height'); //commented by naz on 11112015
                mirror.style.background = 'red';
                mirror.style.aligncontent = 'justify';
                mirror.style.textalign = 'justify';
                //mirror.css("align-content", "");
                /*align-content: center;
            text-align: justify;
            -webkit-hyphens: auto;
            -moz-hyphens: auto;
            hyphens: auto;
            -ms-word-break: break-all;
            word-break: break-all;*/
                //mirror.style.overflowX = "hidden";
                //mirror.style.overflowY = "scroll";
                // Style the textarea
                //this.style.overflowY = "scroll";
                //this.style.overflowX = "hidden";
                ////this.style.overflow = "hidden";
                //this.style.minHeight = this.rows + "em";
                //var ininitalHeightET = $(mirror).height();
                // Bind the textarea's event
                //this.onkeypress = growTextarea;
                //this.addEventListener("input", growTextareaET);
                //this.onpaste = growTextarea;
                //this.oninput = growTextarea;
                // Fire the event for text already present
                // sendContentToMirror(this);
                mirrorHeading.style.display = 'none';
                mirrorHeading.style.wordWrap = 'break-word';
                //mirror.style.whiteSpace = jQuery(this).css('white-space');
                mirrorHeading.style.padding = jQuery(this).css('padding');
                mirrorHeading.style.width = '132.283464567px';
                //mirror.style.width = jQuery(this).css('width');
                mirrorHeading.style.fontFamily = jQuery(this).css('font-family');
                mirrorHeading.style.fontSize = jQuery(this).css('font-size');
                mirrorHeading.style.resize = 'none';
                //mirrorHeading.style.lineHeight = jQuery(this).css('line-height'); //commented by naz on 11112015
                mirrorHeading.style.background = 'blue';
                mirrorHeading.style.aligncontent = 'left';
                mirrorHeading.style.textalign = 'left';
            });
        };
        $(function () {
            $('#SglAdCompose_txt_Tamil').trackRows();
            $('#SglAdCompose_txt_TamilMulti').trackRows();
            $('#txtTH').trackRows();
            $('#divEntertainmentPreview').trackRowsET();
        });
        ///********************************//
        //Start of Entertainment ad Process//
        ///********************************//
        $('#SglAdCompose_txt_English_ET').bind('keyup input propertychange', function () {   // substitute for txtAdvContent_textchange event 
            //For Displaying first two words in Bold
            GetLnCntTHforET();
            //GetET_Content();GetET_Address("");
            //GetEntertainmentLineCalc("");
        });
        $("#SglAdCompose_txt_English_ET").keydown(function (event) {
            //if (parseInt($('#lblmirrorETHeading').text()) > 5) {
            //    $.alert.open('Info', " Line count of Headings should not be more than 5 lines");
            //    return false;
            //}
            var enterkey = event.keyCode || event.which;
            var el = $(this).get(0);
            var pos = el.selectionStart;
            // for restricting the press of enter key 
            if (enterkey == 9) {
                $("#SglAdCompose_txt_English_ET").html(ReplaceForEntertainmentTabKey($("#SglAdCompose_txt_English_ET").html()));
                return;
                //    enterkey = 68;
                //event.preventDefault();
            }
            // for pressing space at the start of textarea
            //if (enterkey == 32) {
            //    alert("keydownb4"+$("#txtEnterTH").html());
            //    e.preventDefault();
            //    //return false;
            //}
            //if ((enterkey == 32) && (GetETContent($("#txtEnterTH").text()) != "")) {
            //    var elem = 'txtEnterTH';
            //    if (elem == 'txtEnterTH') {
            //        var strCont = GetETContentNotTrim($("#txtEnterTH").text());
            //        //To check whether there is already space where the space has been entered currently
            //        if (pos > 0) {
            //            if (strCont.charAt(pos) == " " || strCont.charAt(pos - 1) == " ")
            //                return false;
            //        }
            //        else if (pos == 0)
            //            return false;
            //        //
            //        ////     show last character in the string            
            //        //var lastchar = strCont.charAt(strCont.length - 1);
            //        //if (lastchar == ' ') {
            //        //    //alert("doublespace");
            //        //    return false;
            //        //}
            //}
            //}
            //$('#txtAdsPreviewDtl').val($('#txtAdvContent').val());
            var arrBanWords = [];
            var arrConWords = [];
            arrConWords = GetETContentNotTrim($("#SglAdCompose_txt_English_ET").text()).toUpperCase().split(' ');
            var intCnt = 0;
            var intBanCnt = 0;
            gstrNotAccWord = "";
            //        if ((enterkey == 8) || (enterkey == 46)) {
            //            var BfChar = null;
            //            var AfChar = null;
            //            var intcurPos = txtAdvContent.SelectionStart;
            //        }    
            if (lstInvalidWords == "")
                return;
            for (lstinvi = 0; lstinvi < lstInvalidWords.length; lstinvi++) {
                var strIstCnt = lstInvalidWords[lstinvi].trim().toUpperCase().trim();
                if (GetETContentNotTrim($("#SglAdCompose_txt_English_ET").text()).toUpperCase().indexOf(strIstCnt) != -1) {
                    arrBanWords = strIstCnt.split(' ');
                    for (lstinvj = 0; lstinvj < arrConWords.length; lstinvj++) {
                        intCnt = lstinvj;
                        for (lstinvh = 0; lstinvh < arrBanWords.length; lstinvh++)
                            if (arrConWords[lstinvj].trim() == arrBanWords[lstinvh].trim()) {
                                lstinvj++;
                                intBanCnt = intBanCnt + 1;
                            }
                            else {
                                intBanCnt = 0;
                            }
                        //37----left   39-----right                
                        if (arrBanWords.length == intBanCnt) {
                            //                            txtAdvContent.Focus();
                            //                            txtAdvContent.SelectionStart = txtAdvContent.Text.toUpperCase().indexOf(strIstCnt);
                            //                            e.Handled = true;
                            if ((enterkey == 8) || (enterkey == 46)) {//for backspace and delete key
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return;
                            }
                            else if ((enterkey == 37) || (enterkey == 39)) {//for left and right key to pass through the invalid word
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return;
                            }
                            else {
                                $.alert.open("'" + strIstCnt + "' word(s) cannot be used for advertisements");
                                //alert("'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return false;
                            }
                        }
                        lstinvj = intCnt;
                    }
                }
            }
        });
        $("#SglAdCompose_txt_English_ET").keyup(function (event) {
            //if (parseInt($('#THlblLnCnt').text()) > 5 && $("#txtEnterTH").text() == "") {
            //    $.alert.open('Info', " Line count of Headings should not be more than 5 lines");
            //    return false;
            //}
            var enterkey = event.keyCode || event.which;
            if (enterkey == 9) {
                $("#SglAdCompose_txt_English_ET").html(ReplaceForEntertainmentTabKey($("#SglAdCompose_txt_English_ET").html()));
                return;
                //    enterkey = 68;
                //event.preventDefault();
            }
            if (enterkey == 32) {
                var cursorPos = "", clickx = "", clicky = "";
                if ($("#SglAdCompose_txt_English_ET").html().substring($("#SglAdCompose_txt_English_ET").html().length - 4, $("#SglAdCompose_txt_English_ET").html().length) == '<br>') {
                    cursorPos = document.selection.createRange().duplicate();
                    clickx = cursorPos.getBoundingClientRect().left;
                    clicky = cursorPos.getBoundingClientRect().top;
                    var TrimmedBr = $("#SglAdCompose_txt_English_ET").html().substring(0, $("#SglAdCompose_txt_English_ET").html().length - 4);
                    $("#SglAdCompose_txt_English_ET").html("");
                    $("#SglAdCompose_txt_English_ET").html(TrimmedBr);
                    cursorPos = document.body.createTextRange();
                    cursorPos.moveToPoint(clickx, clicky);
                    cursorPos.select();
                    //  setEndOfContenteditable(this);
                }
                //e.preventDefault();
                //return false;
            }
            //$('#txtAdsPreviewDtl').val($('#txtAdvContent').val());
            if ($("#SglAdCompose_txt_English_ET").text().trim() != "") {
                settheFocusContro($("#divEditorTH"), 'N');
                if ($('#ddlTHGroupLN').css('visibility') == 'visible') {
                    if ($('#ddlTHGroupLN').val() == 'dummy') {
                        settheFocusContro($("#ddlTHGroupLN"), 'Y');
                    }
                    else {
                        settheFocusContro($("#ddlTHGroupLN"), 'N');
                    }
                }
            }
            else {
                settheFocusContro($("#divEditorTH"), 'Y');
                if ($('#ddlTHGroupLN').css('visibility') == 'visible') {
                    settheFocusContro($("#ddlTHGroupLN"), 'N');
                }
            }
            var arrBanWords = [];
            var arrConWords = [];
            arrConWords = GetETContentNotTrim($("#SglAdCompose_txt_English_ET").text()).toUpperCase().split(' ');
            var intCnt = 0;
            var intBanCnt = 0;
            gstrNotAccWord = "";
            //        if ((enterkey == 8) || (enterkey == 46)) {
            //            var BfChar = null;
            //            var AfChar = null;
            //            var intcurPos = txtAdvContent.SelectionStart;
            //        }    
            if (lstInvalidWords == "")
                return;
            for (lstinvi = 0; lstinvi < lstInvalidWords.length; lstinvi++) {
                var strIstCnt = lstInvalidWords[lstinvi].trim().toUpperCase().trim();
                if (GetETContentNotTrim($("#SglAdCompose_txt_English_ET").text()).toUpperCase().indexOf(strIstCnt) != -1) {
                    arrBanWords = strIstCnt.split(' ');
                    for (lstinvj = 0; lstinvj < arrConWords.length; lstinvj++) {
                        intCnt = lstinvj;
                        for (lstinvh = 0; lstinvh < arrBanWords.length; lstinvh++)
                            if (arrConWords[lstinvj].trim() == arrBanWords[lstinvh].trim()) {
                                lstinvj++;
                                intBanCnt = intBanCnt + 1;
                            }
                            else {
                                intBanCnt = 0;
                            }
                        //37----left   39-----right                
                        if (arrBanWords.length == intBanCnt) {
                            //                            txtAdvContent.Focus();
                            //                            txtAdvContent.SelectionStart = txtAdvContent.Text.toUpperCase().indexOf(strIstCnt);
                            //                            e.Handled = true;
                            if ((enterkey == 8) || (enterkey == 46)) {//for backspace and delete key
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return;
                            }
                            else if ((enterkey == 37) || (enterkey == 39)) {//for left and right key to pass through the invalid word
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return;
                            }
                            else {
                                $.alert.open("'" + strIstCnt + "' word(s) cannot be used for advertisements");
                                // alert("'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return false;
                            }
                        }
                        lstinvj = intCnt;
                    }
                }
            }
            GetEntertainmentLineCalc("");
        });
        $("#SglAdCompose_txt_English_ET").focusout(function () {   // substitute for txtAdvContent_lostfocus event 
            //// alert("hello focusout");
            //var intActualLnCnt = GetETContent($("#SglAdCompose_txt_English_ET").text()).length;
            //var strAdTextEdt = "";
            //var EdtLnCnt = 0;
            //var strAdLnCntEdt = 0;
            //var strMinLnCntEdt = 0;
            //$.each(lstLnCntPubEdt, function (iii, vvv) {
            //    if (vvv.split('~')[0] == 'TH') {
            //        strAdLnCntEdt = parseInt(vvv.split('~')[2]);
            //        strMinLnCntEdt = parseInt(vvv.split('~')[1]);
            //        strAdTextEdt = vvv.split('~')[3].trim();
            //    }
            //});
            ////    if (((intActualLnCnt % 35) < 17) && (intActualLnCnt != 0) && ((intActualLnCnt % 35) != 0) && (intActualLnCnt > 1))
            ////        //alert(35 - (intActualLnCnt % 35) + " characters remaining. If you wish, Please utilise the remaining space");
            ////        $.alert.open(35 - (intActualLnCnt % 35) + " characters remaining. If you wish, please utilise the remaining space");
            //if (strInserTypeEdt == 'SCH' && (strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R' || strAdStatus == 'P') && lstDeadLnEdtAdDtls.length > 0) {
            //    if (strAdLnCntEdt <= strMinLnCntEdt) {
            //        EdtLnCnt = strMinLnCntEdt;
            //        if ($('#lblLnCntSingle_ET').text() > EdtLnCnt) {
            //            $.alert.open("info", "Ads has been published and the ad line count mismatch with previous line count.Ad content is replaced by old one.");
            //            $("#SglAdCompose_txt_English_ET").val("");
            //            $("#SglAdCompose_txt_English_ET").val(strAdTextEdt);
            //            //THCalculateLineCountforET();
            //            GetEntertainmentLineCalc("");
            //        }
            //    }
            //    else if (strAdLnCntEdt > strMinLnCntEdt) {
            //        EdtLnCnt = strAdLnCntEdt;
            //        if ($('#lblLnCntSingle_ET').text() != EdtLnCnt) {
            //            $.alert.open("info", "Since the ad has been published and the ad line count mismatch with previous line count.so the ad content is replaced by old one.");
            //            $("#SglAdCompose_txt_English_ET").val("");
            //            $("#SglAdCompose_txt_English_ET").val(strAdTextEdt);
            //            //THCalculateLineCountforET();
            //            GetEntertainmentLineCalc("");
            //        }
            //    }
            //}
            //else if (strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R' || strAdStatus == 'P') {
            //    if ($('#lblLnCntSingle_ET').text() < strAdLnCntEdt) {
            //        $.alert.open("info", "Decreasing the line count of booked ad cannot be allowed.Ad content is replaced by old one.");
            //        $("#SglAdCompose_txt_English_ET").val("");
            //        $("#SglAdCompose_txt_English_ET").val(strAdTextEdt);
            //        //THCalculateLineCountforET();
            //        GetEntertainmentLineCalc("");
            //    }
            //}
            GetEntertainmentLineCalc('');
        });

        $('#SglAdCompose_txt_EnglishMulti_ET').bind('keyup input propertychange', function () {   // substitute for txtAdvContent_textchange event 
            //For Displaying first two words in Bold
            GetLnCntTHforET_Multi();
            //GetET_Content_Multi(); GetET_Address_Multi("");
            //GetEntertainmentLineCalc_Multi("");
        });
        $("#SglAdCompose_txt_EnglishMulti_ET").keydown(function (event) {
            //if (parseInt($('#lblmirrorETHeading').text()) > 5) {
            //    $.alert.open('Info', " Line count of Headings should not be more than 5 lines");
            //    return false;
            //}
            var enterkey = event.keyCode || event.which;
            var el = $(this).get(0);
            var pos = el.selectionStart;
            // for restricting the press of enter key 
            if (enterkey == 9) {
                //$("#SglAdCompose_txt_EnglishMulti_ET").html(ReplaceForEntertainmentTabKey($("#SglAdCompose_txt_EnglishMulti_ET").html()));
                $("#SglAdCompose_txt_EnglishMulti_ET").val(ReplaceForEntertainmentTabKey($("#SglAdCompose_txt_EnglishMulti_ET").val()));
                return;
                //    enterkey = 68;
                //event.preventDefault();
            }
            // for pressing space at the start of textarea
            //if (enterkey == 32) {
            //    alert("keydownb4"+$("#txtEnterTH").html());
            //    e.preventDefault();
            //    //return false;
            //}
            //if ((enterkey == 32) && (GetETContent($("#txtEnterTH").text()) != "")) {
            //    var elem = 'txtEnterTH';
            //    if (elem == 'txtEnterTH') {
            //        var strCont = GetETContentNotTrim($("#txtEnterTH").text());
            //        //To check whether there is already space where the space has been entered currently
            //        if (pos > 0) {
            //            if (strCont.charAt(pos) == " " || strCont.charAt(pos - 1) == " ")
            //                return false;
            //        }
            //        else if (pos == 0)
            //            return false;
            //        //
            //        ////     show last character in the string            
            //        //var lastchar = strCont.charAt(strCont.length - 1);
            //        //if (lastchar == ' ') {
            //        //    //alert("doublespace");
            //        //    return false;
            //        //}
            //}
            //}
            //$('#txtAdsPreviewDtl').val($('#txtAdvContent').val());
            var arrBanWords = [];
            var arrConWords = [];
            //arrConWords = GetETContentNotTrim($("#SglAdCompose_txt_EnglishMulti_ET").text()).toUpperCase().split(' ');
            arrConWords = GetETContentNotTrim($("#SglAdCompose_txt_EnglishMulti_ET").val()).toUpperCase().split(' ');
            var intCnt = 0;
            var intBanCnt = 0;
            gstrNotAccWord = "";
            //        if ((enterkey == 8) || (enterkey == 46)) {
            //            var BfChar = null;
            //            var AfChar = null;
            //            var intcurPos = txtAdvContent.SelectionStart;
            //        }    
            if (lstInvalidWords == "")
                return;
            for (lstinvi = 0; lstinvi < lstInvalidWords.length; lstinvi++) {
                var strIstCnt = lstInvalidWords[lstinvi].trim().toUpperCase().trim();
                //if (GetETContentNotTrim($("#SglAdCompose_txt_EnglishMulti_ET").text()).toUpperCase().indexOf(strIstCnt) != -1) {
                if (GetETContentNotTrim($("#SglAdCompose_txt_EnglishMulti_ET").val()).toUpperCase().indexOf(strIstCnt) != -1) {
                    arrBanWords = strIstCnt.split(' ');
                    for (lstinvj = 0; lstinvj < arrConWords.length; lstinvj++) {
                        intCnt = lstinvj;
                        for (lstinvh = 0; lstinvh < arrBanWords.length; lstinvh++)
                            if (arrConWords[lstinvj].trim() == arrBanWords[lstinvh].trim()) {
                                lstinvj++;
                                intBanCnt = intBanCnt + 1;
                            }
                            else {
                                intBanCnt = 0;
                            }
                        //37----left   39-----right                
                        if (arrBanWords.length == intBanCnt) {
                            //                            txtAdvContent.Focus();
                            //                            txtAdvContent.SelectionStart = txtAdvContent.Text.toUpperCase().indexOf(strIstCnt);
                            //                            e.Handled = true;
                            if ((enterkey == 8) || (enterkey == 46)) {//for backspace and delete key
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return;
                            }
                            else if ((enterkey == 37) || (enterkey == 39)) {//for left and right key to pass through the invalid word
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return;
                            }
                            else {
                                $.alert.open("'" + strIstCnt + "' word(s) cannot be used for advertisements");
                                //alert("'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return false;
                            }
                        }
                        lstinvj = intCnt;
                    }
                }
            }
        });
        $("#SglAdCompose_txt_EnglishMulti_ET").keyup(function (event) {
            //if (parseInt($('#THlblLnCnt').text()) > 5 && $("#txtEnterTH").text() == "") {
            //    $.alert.open('Info', " Line count of Headings should not be more than 5 lines");
            //    return false;
            //}
            var enterkey = event.keyCode || event.which;
            if (enterkey == 9) {
                //$("#SglAdCompose_txt_EnglishMulti_ET").html(ReplaceForEntertainmentTabKey($("#SglAdCompose_txt_EnglishMulti_ET").html()));
                $("#SglAdCompose_txt_EnglishMulti_ET").val(ReplaceForEntertainmentTabKey($("#SglAdCompose_txt_EnglishMulti_ET").val()));
                return;
                //    enterkey = 68;
                //event.preventDefault();
            }
            if (enterkey == 32) {
                var cursorPos = "", clickx = "", clicky = "";
                //if ($("#SglAdCompose_txt_EnglishMulti_ET").html().substring($("#SglAdCompose_txt_EnglishMulti_ET").html().length - 4, $("#SglAdCompose_txt_EnglishMulti_ET").html().length) == '<br>') {
                if ($("#SglAdCompose_txt_EnglishMulti_ET").val().substring($("#SglAdCompose_txt_EnglishMulti_ET").val().length - 4, $("#SglAdCompose_txt_EnglishMulti_ET").val().length) == '<br>') {
                    cursorPos = document.selection.createRange().duplicate();
                    clickx = cursorPos.getBoundingClientRect().left;
                    clicky = cursorPos.getBoundingClientRect().top;
                    //var TrimmedBr = $("#SglAdCompose_txt_EnglishMulti_ET").html().substring(0, $("#SglAdCompose_txt_EnglishMulti_ET").html().length - 4);
                    var TrimmedBr = $("#SglAdCompose_txt_EnglishMulti_ET").val().substring(0, $("#SglAdCompose_txt_EnglishMulti_ET").val().length - 4);
                    //$("#SglAdCompose_txt_EnglishMulti_ET").html("");
                    $("#SglAdCompose_txt_EnglishMulti_ET").val("");
                    //$("#SglAdCompose_txt_EnglishMulti_ET").html(TrimmedBr);
                    $("#SglAdCompose_txt_EnglishMulti_ET").val(TrimmedBr);
                    cursorPos = document.body.createTextRange();
                    cursorPos.moveToPoint(clickx, clicky);
                    cursorPos.select();
                    //  setEndOfContenteditable(this);
                }
                //e.preventDefault();
                //return false;
            }
            //$('#txtAdsPreviewDtl').val($('#txtAdvContent').val());
            //if ($("#SglAdCompose_txt_EnglishMulti_ET").text().trim() != "") {
            if ($("#SglAdCompose_txt_EnglishMulti_ET").val().trim() != "") {
                settheFocusContro($("#divEditorTH"), 'N');
                if ($('#ddlTHGroupLN').css('visibility') == 'visible') {
                    if ($('#ddlTHGroupLN').val() == 'dummy') {
                        settheFocusContro($("#ddlTHGroupLN"), 'Y');
                    }
                    else {
                        settheFocusContro($("#ddlTHGroupLN"), 'N');
                    }
                }
            }
            else {
                settheFocusContro($("#divEditorTH"), 'Y');
                if ($('#ddlTHGroupLN').css('visibility') == 'visible') {
                    settheFocusContro($("#ddlTHGroupLN"), 'N');
                }
            }
            var arrBanWords = [];
            var arrConWords = [];
            //arrConWords = GetETContentNotTrim($("#SglAdCompose_txt_EnglishMulti_ET").text()).toUpperCase().split(' ');
            arrConWords = GetETContentNotTrim($("#SglAdCompose_txt_EnglishMulti_ET").val()).toUpperCase().split(' ');
            var intCnt = 0;
            var intBanCnt = 0;
            gstrNotAccWord = "";
            //        if ((enterkey == 8) || (enterkey == 46)) {
            //            var BfChar = null;
            //            var AfChar = null;
            //            var intcurPos = txtAdvContent.SelectionStart;
            //        }    
            if (lstInvalidWords == "")
                return;
            for (lstinvi = 0; lstinvi < lstInvalidWords.length; lstinvi++) {
                var strIstCnt = lstInvalidWords[lstinvi].trim().toUpperCase().trim();
                //if (GetETContentNotTrim($("#SglAdCompose_txt_EnglishMulti_ET").text()).toUpperCase().indexOf(strIstCnt) != -1) {
                if (GetETContentNotTrim($("#SglAdCompose_txt_EnglishMulti_ET").val()).toUpperCase().indexOf(strIstCnt) != -1) {
                    arrBanWords = strIstCnt.split(' ');
                    for (lstinvj = 0; lstinvj < arrConWords.length; lstinvj++) {
                        intCnt = lstinvj;
                        for (lstinvh = 0; lstinvh < arrBanWords.length; lstinvh++)
                            if (arrConWords[lstinvj].trim() == arrBanWords[lstinvh].trim()) {
                                lstinvj++;
                                intBanCnt = intBanCnt + 1;
                            }
                            else {
                                intBanCnt = 0;
                            }
                        //37----left   39-----right                
                        if (arrBanWords.length == intBanCnt) {
                            //                            txtAdvContent.Focus();
                            //                            txtAdvContent.SelectionStart = txtAdvContent.Text.toUpperCase().indexOf(strIstCnt);
                            //                            e.Handled = true;
                            if ((enterkey == 8) || (enterkey == 46)) {//for backspace and delete key
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return;
                            }
                            else if ((enterkey == 37) || (enterkey == 39)) {//for left and right key to pass through the invalid word
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return;
                            }
                            else {
                                $.alert.open("'" + strIstCnt + "' word(s) cannot be used for advertisements");
                                // alert("'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return false;
                            }
                        }
                        lstinvj = intCnt;
                    }
                }
            }
            GetEntertainmentLineCalc("");
        });
        $("#SglAdCompose_txt_EnglishMulti_ET").focusout(function () {   // substitute for txtAdvContent_lostfocus event 
            //// alert("hello focusout");
            ////var intActualLnCnt = GetETContent($("#SglAdCompose_txt_EnglishMulti_ET").text()).length;
            //var intActualLnCnt = GetETContent($("#SglAdCompose_txt_EnglishMulti_ET").val()).length;
            //var strAdTextEdt = "";
            //var EdtLnCnt = 0;
            //var strAdLnCntEdt = 0;
            //var strMinLnCntEdt = 0;
            //$.each(lstLnCntPubEdt, function (iii, vvv) {
            //    if (vvv.split('~')[0] == 'TH') {
            //        strAdLnCntEdt = parseInt(vvv.split('~')[2]);
            //        strMinLnCntEdt = parseInt(vvv.split('~')[1]);
            //        strAdTextEdt = vvv.split('~')[3].trim();
            //    }
            //});
            ////    if (((intActualLnCnt % 35) < 17) && (intActualLnCnt != 0) && ((intActualLnCnt % 35) != 0) && (intActualLnCnt > 1))
            ////        //alert(35 - (intActualLnCnt % 35) + " characters remaining. If you wish, Please utilise the remaining space");
            ////        $.alert.open(35 - (intActualLnCnt % 35) + " characters remaining. If you wish, please utilise the remaining space");
            //if (strInserTypeEdt == 'SCH' && (strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R' || strAdStatus == 'P') && lstDeadLnEdtAdDtls.length > 0) {
            //    if (strAdLnCntEdt <= strMinLnCntEdt) {
            //        EdtLnCnt = strMinLnCntEdt;
            //        if ($('#lblLnCntMulti_ET').text() > EdtLnCnt) {
            //            $.alert.open("info", "Ads has been published and the ad line count mismatch with previous line count.Ad content is replaced by old one.");
            //            $("#SglAdCompose_txt_EnglishMulti_ET").val("");
            //            $("#SglAdCompose_txt_EnglishMulti_ET").val(strAdTextEdt);
            //            //THCalculateLineCountforET();
            //            GetEntertainmentLineCalc_Multi();
            //        }
            //    }
            //    else if (strAdLnCntEdt > strMinLnCntEdt) {
            //        EdtLnCnt = strAdLnCntEdt;
            //        if ($('#lblLnCntMulti_ET').text() != EdtLnCnt) {
            //            $.alert.open("info", "Since the ad has been published and the ad line count mismatch with previous line count.so the ad content is replaced by old one.");
            //            $("#SglAdCompose_txt_EnglishMulti_ET").val("");
            //            $("#SglAdCompose_txt_EnglishMulti_ET").val(strAdTextEdt);
            //            //THCalculateLineCountforET();
            //            GetEntertainmentLineCalc_Multi();
            //        }
            //    }
            //}
            //else if (strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R' || strAdStatus == 'P') {
            //    if ($('#lblLnCntMulti_ET').text() < strAdLnCntEdt) {
            //        $.alert.open("info", "Decreasing the line count of booked ad cannot be allowed.Ad content is replaced by old one.");
            //        $("#SglAdCompose_txt_EnglishMulti_ET").val("");
            //        $("#SglAdCompose_txt_EnglishMulti_ET").val(strAdTextEdt);
            //        //THCalculateLineCountforET();
            //        GetEntertainmentLineCalc_Multi();
            //    }
            //}
            GetEntertainmentLineCalc_Multi('');
        });
        //$('#txtEnterTH').keypress(function (event) {            
        //    GetEntertainmentLineCalc();
        //});
        //$('#txtETName').keypress(function (event) {           
        //    GetEntertainmentLineCalc();
        //});
        //$('#txtETAddress').keypress(function (event) {
        //    GetEntertainmentLineCalc();
        //});
        //$('#txtETContanctNo').keypress(function (event) {
        //    GetEntertainmentLineCalc();
        //});
        ///******************************//
        //End of Entertainment ad Process//
        ///******************************//
    }
    else {
        //alert("desktop");
        jQuery.fn.trackRows = function () {
            return this.each(function () {

                var ininitalHeight, currentRow, iteration = 0;
                var createMirror = function (textarea) {
                    jQuery(textarea).after('<div class="autogrow-textarea-mirror-' + textarea.id.substring(textarea.id.length - 5, textarea.id.length) + '"></div>');
                    return jQuery(textarea).next('.autogrow-textarea-mirror-' + textarea.id.substring(textarea.id.length - 5, textarea.id.length) + '')[0];
                }

                var sendContentToMirror = function (textarea) {
                    // convertThis(event);
                    //mirror.innerHTML = String(textarea.value.substring(0,textarea.selectionStart)).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />') + '<br/>.';
                    mirror.innerHTML = String(textarea.value.substring(0, undefined)).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />') + '<br/>.';

                    calculateRowNumber(textarea.id);
                }

                var growTextarea = function (event) {
                    //if (event.currentTarget.id != 'SglAdCompose_txt_EnglishMulti' && event.currentTarget.id != 'txtBL') {
                    //    convertThisgen(event);
                    //}
                    //if (event.currentTarget == undefined)
                    //    sendContentToMirror(event.target);
                    //else
                    convertThisgen(event);
                    sendContentToMirror(event.currentTarget);
                    //if(this.id == 'SglAdCompose_txt_EnglishMulti')     //for calculating the linecount for the hindu textarea modified after same material checkbox concept
                    //    GetLnCntTH();
                    //else if (this.id == 'txtBL')   //for calculating the linecount for the business line textarea modified after same material checkbox concept
                    //    GetLnCntBL();
                }

                var calculateRowNumber = function (pEveCurrId) {
                    if (blnEditFlag != true) {
                        ininitalHeight = 54;
                    }
                    if (iteration === 0 && blnEditFlag != true) {
                        ininitalHeight = $(mirror).height();
                        currentHeight = ininitalHeight;
                        iteration++;
                        //if (TmpInitheight > 0) {
                        //ininitalHeight = TmpInitheight;
                        //currentHeight = $(mirror).height();
                        //}
                    }
                    else if (iteration === 0 && blnEditFlag == true) {
                        if ($('#lblLnCntSingle').text().trim() > 0 && $('#single').css('display') == "block") {
                            if ($('#lblLnCntSingle').text().trim() > 0) {
                                ininitalHeight = ($(mirror).height() * 2) / (parseInt($('#lblLnCntSingle').text()) + 1);
                                currentHeight = $(mirror).height();
                                iteration++;
                            }
                            else {
                                ininitalHeight = $(mirror).height();
                                currentHeight = ininitalHeight;
                                iteration++;
                            }
                        }
                        if ($('#lblLnCntMulti').text().trim() > 0 && $('#multipule').css('display') == "block") {
                            if ($('#lblLnCntMulti').text().trim() > 0) {
                                ininitalHeight = ($(mirror).height() * 2) / (parseInt($('#lblLnCntMulti').text()) + 1);
                                currentHeight = $(mirror).height();
                                iteration++;
                            }
                            else {
                                ininitalHeight = $(mirror).height();
                                currentHeight = ininitalHeight;
                                iteration++;
                            }
                        }
                    }
                    else {
                        currentHeight = $(mirror).height();
                    }
                    //document.getElementById('txt1').value = currentHeight;
                    //document.getElementById('txt2').value = ininitalHeight;
                    currentRow = Math.floor(currentHeight / (ininitalHeight / 2) - 1);
                    //remove tracker in production
                    //if ((pEveCurrId == 'SglAdCompose_txt_EnglishMulti') || (pEveCurrId == 'txtBL')) {
                    //    if ($('#SglAdCompose_txt_EnglishMulti').val() == "" && pEveCurrId == 'SglAdCompose_txt_EnglishMulti') {
                    //        TmpLnCountTM = 0;
                    //        TmpInitheight = 0;
                    //    }
                    //    else if ($('#txtBL').val() == "" && pEveCurrId == 'txtBL') {
                    //        TmpInitheight = 0;
                    //        TmpLnCountTM = 0;
                    //    }
                    //    else {
                    //        TmpLnCountTM = currentRow;
                    //        //$('.tracker').html(currentRow+'~'+ininitalHeight);
                    //        TmpInitheight = ininitalHeight;
                    //    }
                    //}
                    //if (pEveCurrId == 'SglAdCompose_txt_Tamil') {
                    if ($('#' + pEveCurrId).val().trim() == "")
                        strLineCount = 0;
                    else
                        strLineCount = currentRow;
                    //}

                    if (pEveCurrId == 'SglAdCompose_txt_Tamil')
                        $('#lblLnCntSingle').text(strLineCount);
                    else if (pEveCurrId == 'SglAdCompose_txt_TamilMulti')
                        $('#lblLnCntMulti').text(strLineCount);
                    strSingleAdText = $('#' + pEveCurrId).val().trim();
                }

                // Create a mirror
                var mirror = createMirror(this);
                if (this.id == 'SglAdCompose_txt_Tamil' || this.id == 'SglAdCompose_txt_TamilMulti') {
                    // Style the mirror
                    mirror.style.display = 'none';
                    mirror.style.wordWrap = 'break-word';
                    mirror.style.whiteSpace = jQuery(this).css('white-space');
                    mirror.style.padding = jQuery(this).css('padding');
                    mirror.style.width = '250px';
                    //mirror.style.width = jQuery(this).css('width');
                    mirror.style.fontFamily = jQuery(this).css('font-family');
                    mirror.style.fontSize = jQuery(this).css('font-size');
                    //mirror.style.lineHeight = jQuery(this).css('line-height');
                    mirror.style.lineHeight = '1.7';
                    mirror.style.background = 'red';
                    mirror.style.overflowX = "hidden";
                    mirror.style.overflowY = "scroll";

                    // Style the textarea
                    this.style.overflowY = "scroll";
                    this.style.overflowX = "hidden";
                    //this.style.overflow = "hidden";
                    this.style.minHeight = this.rows + "em";

                    var ininitalHeight = $(mirror).height();

                    // Bind the textarea's event
                    this.onkeypress = growTextarea;
                    this.addEventListener("input", growTextarea);
                    this.addEventListener("paste", growTextarea);//did it for google chrome didnot call the grow textarea while pasting the content
                    //this.onpaste = growTextarea;
                    //this.oninput = growTextarea;
                    // Fire the event for text already present
                    // sendContentToMirror(this);
                }
                //else if (this.id == 'SglAdCompose_txt_EnglishMulti' || this.id == 'txtBL') {//creating the mirror for TH textarea and BL textarea
                //    // Style the mirror
                //    mirror.style.display = 'none';
                //    mirror.style.wordWrap = 'break-word';
                //    mirror.style.whiteSpace = jQuery('#SglAdCompose_txt_Tamil').css('white-space');
                //    mirror.style.padding = jQuery('#SglAdCompose_txt_Tamil').css('padding');
                //    mirror.style.width = '300px';
                //    //mirror.style.width = jQuery(this).css('width');
                //    mirror.style.fontFamily = jQuery('#SglAdCompose_txt_Tamil').css('font-family');
                //    mirror.style.fontSize = jQuery('#SglAdCompose_txt_Tamil').css('font-size');
                //    mirror.style.lineHeight = jQuery('#SglAdCompose_txt_Tamil').css('line-height');
                //    mirror.style.background = 'red';
                //    mirror.style.overflowX = "hidden";
                //    mirror.style.overflowY = "scroll";

                //    // Style the textarea
                //    //this.style.overflowY = "scroll";
                //    //this.style.overflowX = "hidden";
                //    //this.style.overflow = "hidden";
                //    //this.style.minHeight = this.rows + "em";                    
                //    //var ininitalHeight = $(mirror).height();
                //    // Bind the textarea's event
                //    this.onkeypress = growTextarea;        //calculate the linecount while doing keypress event in textarea
                //    this.addEventListener("input", growTextarea);  //calculate the linecount while doing copy paste in textarea
                //    //if (this.id == 'SglAdCompose_txt_EnglishMulti')
                //    //    GetLnCntTH();
                //    //else if (this.id == 'txtBL')
                //    //    GetLnCntBL();
                //}
            });
        };
        jQuery.fn.trackRowsET = function () {
            return this.each(function () {
                var createMirrorET = function (textareaET) {
                    jQuery(textareaET).after('<div class="autogrow-textarea-mirrorET"></div>');
                    return jQuery(textareaET).next('.autogrow-textarea-mirrorET')[0];
                }
                var createMirrorETHeading = function (textareaET) {
                    jQuery('.autogrow-textarea-mirrorET').after('<div class="autogrow-textarea-mirrorETHeading"></div>');
                    jQuery('.autogrow-textarea-mirrorETHeading').after('<label id="lblmirrorETHeading" style="display:none"></label>');
                    return jQuery('.autogrow-textarea-mirrorET').next('.autogrow-textarea-mirrorETHeading')[0];
                }
                //var sendContentToMirrorET = function (textareaET) {
                //    // convertThis(event);
                //    //mirror.innerHTML = String(textarea.value.substring(0,textarea.selectionStart)).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />') + '<br/>.';
                //    mirror.innerHTML = String(textareaET.value.substring(0, undefined)).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />') + '<br/>.';
                //    calculateRowNumberET(textareaET.id);
                //}
                //var growTextareaET = function (event) {
                //   sendContentToMirrorET(event.currentTarget);
                //}
                //var calculateRowNumberET = function (pEveCurrId) {
                //    if (iterationET === 0) {
                //        ininitalHeightET = $(mirror).height();
                //        currentHeightET = ininitalHeightET;
                //        iterationET++;
                //    }
                //    else {
                //        currentHeightET = $(mirror).height();
                //    }
                //    currentRowET = Math.floor(currentHeightET / (ininitalHeightET / 2) - 1);
                //    $('#THlblLnCnt').text(currentRowET.toString());
                //}
                // Create a mirror
                var mirror = createMirrorET(this);
                var mirrorHeading = createMirrorETHeading(this);
                // Style the mirror
                mirror.style.display = 'none';
                mirror.style.wordWrap = 'break-word';
                //mirror.style.whiteSpace = jQuery(this).css('white-space');
                mirror.style.padding = jQuery(this).css('padding');
                mirror.style.width = '132.283464567px';
                //mirror.style.width = jQuery(this).css('width');
                mirror.style.fontFamily = jQuery(this).css('font-family');
                mirror.style.fontSize = jQuery(this).css('font-size');
                mirror.style.resize = 'none';
                //mirror.style.lineHeight = jQuery(this).css('line-height'); //commented by naz on 11112015
                mirror.style.background = 'red';
                mirror.style.aligncontent = 'justify';
                mirror.style.textalign = 'justify';
                //mirror.style.overflowX = "hidden";
                //mirror.style.overflowY = "scroll";
                // Style the textarea
                //this.style.overflowY = "scroll";
                //this.style.overflowX = "hidden";
                ////this.style.overflow = "hidden";
                //this.style.minHeight = this.rows + "em";
                //var ininitalHeightET = $(mirror).height();
                // Bind the textarea's event
                //this.onkeypress = growTextarea;
                //this.addEventListener("input", growTextareaET);
                //this.onpaste = growTextarea;
                //this.oninput = growTextarea;
                // Fire the event for text already present
                // sendContentToMirror(this);
                mirrorHeading.style.display = 'none';
                mirrorHeading.style.wordWrap = 'break-word';
                //mirror.style.whiteSpace = jQuery(this).css('white-space');
                mirrorHeading.style.padding = jQuery(this).css('padding');
                mirrorHeading.style.width = '132.283464567px';
                //mirror.style.width = jQuery(this).css('width');
                mirrorHeading.style.fontFamily = jQuery(this).css('font-family');
                mirrorHeading.style.fontSize = jQuery(this).css('font-size');
                mirrorHeading.style.resize = 'none';
                //mirrorHeading.style.lineHeight = jQuery(this).css('line-height'); //commented by naz on 11112015
                mirrorHeading.style.background = 'blue';
                mirrorHeading.style.aligncontent = 'left';
                mirrorHeading.style.textalign = 'left';
            });
        };
        $(function () {
            //$('#SglAdCompose_txt_EnglishMulti').trackRows();
            $('#SglAdCompose_txt_Tamil').trackRows();
            $('#SglAdCompose_txt_TamilMulti').trackRows();
            //$('#txtBL').trackRows();
            $('#txtTH').trackRows();
            $('#divEntertainmentPreview').trackRowsET();
        });
        ///********************************//
        //Start of Entertainment ad Process//
        ///********************************//
        $('#SglAdCompose_txt_English_ET').bind('keyup input propertychange', function () {   // substitute for txtAdvContent_textchange event 
            //For Displaying first two words in Bold
            GetLnCntTHforET();
            //GetET_Content(); GetET_Address("");
            //GetEntertainmentLineCalc("");
        });
        $("#SglAdCompose_txt_English_ET").keydown(function (event) {
            //if (parseInt($('#lblmirrorETHeading').text()) > 5) {
            //    $.alert.open('Info', " Line count of Headings should not be more than 5 lines");
            //    return false;
            //}
            var enterkey = event.keyCode || event.which;
            var el = $(this).get(0);
            var pos = el.selectionStart;
            // for restricting the press of enter key 
            if (enterkey == 9) {
                $("#SglAdCompose_txt_English_ET").html(ReplaceForEntertainmentTabKey($("#SglAdCompose_txt_English_ET").html()));
                return;
                //    enterkey = 68;
                //event.preventDefault();
            }
            // for pressing space at the start of textarea
            //if (enterkey == 32) {
            //    alert("keydownb4"+$("#txtEnterTH").html());
            //    e.preventDefault();
            //    //return false;
            //}
            //if ((enterkey == 32) && (GetETContent($("#txtEnterTH").text()) != "")) {
            //    var elem = 'txtEnterTH';
            //    if (elem == 'txtEnterTH') {
            //        var strCont = GetETContentNotTrim($("#txtEnterTH").text());
            //        //To check whether there is already space where the space has been entered currently
            //        if (pos > 0) {
            //            if (strCont.charAt(pos) == " " || strCont.charAt(pos - 1) == " ")
            //                return false;
            //        }
            //        else if (pos == 0)
            //            return false;
            //        //
            //        ////     show last character in the string            
            //        //var lastchar = strCont.charAt(strCont.length - 1);
            //        //if (lastchar == ' ') {
            //        //    //alert("doublespace");
            //        //    return false;
            //        //}
            //}
            //}
            //$('#txtAdsPreviewDtl').val($('#txtAdvContent').val());
            var arrBanWords = [];
            var arrConWords = [];
            arrConWords = GetETContentNotTrim($("#SglAdCompose_txt_English_ET").text()).toUpperCase().split(' ');
            var intCnt = 0;
            var intBanCnt = 0;
            gstrNotAccWord = "";
            //        if ((enterkey == 8) || (enterkey == 46)) {
            //            var BfChar = null;
            //            var AfChar = null;
            //            var intcurPos = txtAdvContent.SelectionStart;
            //        }    
            if (lstInvalidWords == "")
                return;
            for (lstinvi = 0; lstinvi < lstInvalidWords.length; lstinvi++) {
                var strIstCnt = lstInvalidWords[lstinvi].trim().toUpperCase().trim();
                if (GetETContentNotTrim($("#SglAdCompose_txt_English_ET").text()).toUpperCase().indexOf(strIstCnt) != -1) {
                    arrBanWords = strIstCnt.split(' ');
                    for (lstinvj = 0; lstinvj < arrConWords.length; lstinvj++) {
                        intCnt = lstinvj;
                        for (lstinvh = 0; lstinvh < arrBanWords.length; lstinvh++)
                            if (arrConWords[lstinvj].trim() == arrBanWords[lstinvh].trim()) {
                                lstinvj++;
                                intBanCnt = intBanCnt + 1;
                            }
                            else {
                                intBanCnt = 0;
                            }
                        //37----left   39-----right                
                        if (arrBanWords.length == intBanCnt) {
                            //                            txtAdvContent.Focus();
                            //                            txtAdvContent.SelectionStart = txtAdvContent.Text.toUpperCase().indexOf(strIstCnt);
                            //                            e.Handled = true;
                            if ((enterkey == 8) || (enterkey == 46)) {//for backspace and delete key
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return;
                            }
                            else if ((enterkey == 37) || (enterkey == 39)) {//for left and right key to pass through the invalid word
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return;
                            }
                            else {
                                $.alert.open("'" + strIstCnt + "' word(s) cannot be used for advertisements");
                                //alert("'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return false;
                            }
                        }
                        lstinvj = intCnt;
                    }
                }
            }
        });
        $("#SglAdCompose_txt_English_ET").keyup(function (event) {
            //if (parseInt($('#THlblLnCnt').text()) > 5 && $("#txtEnterTH").text() == "") {
            //    $.alert.open('Info', " Line count of Headings should not be more than 5 lines");
            //    return false;
            //}
            var enterkey = event.keyCode || event.which;
            if (enterkey == 9) {
                $("#SglAdCompose_txt_English_ET").html(ReplaceForEntertainmentTabKey($("#SglAdCompose_txt_English_ET").html()));
                return;
                //    enterkey = 68;
                //event.preventDefault();
            }
            if (enterkey == 32) {
                var cursorPos = "", clickx = "", clicky = "";
                if ($("#SglAdCompose_txt_English_ET").html().substring($("#SglAdCompose_txt_English_ET").html().length - 4, $("#SglAdCompose_txt_English_ET").html().length) == '<br>') {
                    cursorPos = document.selection.createRange().duplicate();
                    clickx = cursorPos.getBoundingClientRect().left;
                    clicky = cursorPos.getBoundingClientRect().top;
                    var TrimmedBr = $("#SglAdCompose_txt_English_ET").html().substring(0, $("#SglAdCompose_txt_English_ET").html().length - 4);
                    $("#SglAdCompose_txt_English_ET").html("");
                    $("#SglAdCompose_txt_English_ET").html(TrimmedBr);
                    cursorPos = document.body.createTextRange();
                    cursorPos.moveToPoint(clickx, clicky);
                    cursorPos.select();
                    //  setEndOfContenteditable(this);
                }
                //e.preventDefault();
                //return false;
            }
            //$('#txtAdsPreviewDtl').val($('#txtAdvContent').val());
            if ($("#SglAdCompose_txt_English_ET").text().trim() != "") {
                settheFocusContro($("#divEditorTH"), 'N');
                if ($('#ddlTHGroupLN').css('visibility') == 'visible') {
                    if ($('#ddlTHGroupLN').val() == 'dummy') {
                        settheFocusContro($("#ddlTHGroupLN"), 'Y');
                    }
                    else {
                        settheFocusContro($("#ddlTHGroupLN"), 'N');
                    }
                }
            }
            else {
                settheFocusContro($("#divEditorTH"), 'Y');
                if ($('#ddlTHGroupLN').css('visibility') == 'visible') {
                    settheFocusContro($("#ddlTHGroupLN"), 'N');
                }
            }
            var arrBanWords = [];
            var arrConWords = [];
            arrConWords = GetETContentNotTrim($("#SglAdCompose_txt_English_ET").text()).toUpperCase().split(' ');
            var intCnt = 0;
            var intBanCnt = 0;
            gstrNotAccWord = "";
            //        if ((enterkey == 8) || (enterkey == 46)) {
            //            var BfChar = null;
            //            var AfChar = null;
            //            var intcurPos = txtAdvContent.SelectionStart;
            //        }    
            if (lstInvalidWords == "")
                return;
            for (lstinvi = 0; lstinvi < lstInvalidWords.length; lstinvi++) {
                var strIstCnt = lstInvalidWords[lstinvi].trim().toUpperCase().trim();
                if (GetETContentNotTrim($("#SglAdCompose_txt_English_ET").text()).toUpperCase().indexOf(strIstCnt) != -1) {
                    arrBanWords = strIstCnt.split(' ');
                    for (lstinvj = 0; lstinvj < arrConWords.length; lstinvj++) {
                        intCnt = lstinvj;
                        for (lstinvh = 0; lstinvh < arrBanWords.length; lstinvh++)
                            if (arrConWords[lstinvj].trim() == arrBanWords[lstinvh].trim()) {
                                lstinvj++;
                                intBanCnt = intBanCnt + 1;
                            }
                            else {
                                intBanCnt = 0;
                            }
                        //37----left   39-----right                
                        if (arrBanWords.length == intBanCnt) {
                            //                            txtAdvContent.Focus();
                            //                            txtAdvContent.SelectionStart = txtAdvContent.Text.toUpperCase().indexOf(strIstCnt);
                            //                            e.Handled = true;
                            if ((enterkey == 8) || (enterkey == 46)) {//for backspace and delete key
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return;
                            }
                            else if ((enterkey == 37) || (enterkey == 39)) {//for left and right key to pass through the invalid word
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return;
                            }
                            else {
                                $.alert.open("'" + strIstCnt + "' word(s) cannot be used for advertisements");
                                // alert("'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return false;
                            }
                        }
                        lstinvj = intCnt;
                    }
                }
            }
            GetEntertainmentLineCalc("");
        });
        $("#SglAdCompose_txt_English_ET").focusout(function () {   // substitute for txtAdvContent_lostfocus event 
            //// alert("hello focusout");
            //var intActualLnCnt = GetETContent($("#SglAdCompose_txt_English_ET").text()).length;
            //var strAdTextEdt = "";
            //var EdtLnCnt = 0;
            //var strAdLnCntEdt = 0;
            //var strMinLnCntEdt = 0;
            //$.each(lstLnCntPubEdt, function (iii, vvv) {
            //    if (vvv.split('~')[0] == 'TH') {
            //        strAdLnCntEdt = parseInt(vvv.split('~')[2]);
            //        strMinLnCntEdt = parseInt(vvv.split('~')[1]);
            //        strAdTextEdt = vvv.split('~')[3].trim();
            //    }
            //});
            ////    if (((intActualLnCnt % 35) < 17) && (intActualLnCnt != 0) && ((intActualLnCnt % 35) != 0) && (intActualLnCnt > 1))
            ////        //alert(35 - (intActualLnCnt % 35) + " characters remaining. If you wish, Please utilise the remaining space");
            ////        $.alert.open(35 - (intActualLnCnt % 35) + " characters remaining. If you wish, please utilise the remaining space");
            //if (strInserTypeEdt == 'SCH' && (strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R' || strAdStatus == 'P') && lstDeadLnEdtAdDtls.length > 0) {
            //    if (strAdLnCntEdt <= strMinLnCntEdt) {
            //        EdtLnCnt = strMinLnCntEdt;
            //        if ($('#lblLnCntSingle_ET').text() > EdtLnCnt) {
            //            $.alert.open("info", "Ads has been published and the ad line count mismatch with previous line count.Ad content is replaced by old one.");
            //            $("#SglAdCompose_txt_English_ET").val("");
            //            $("#SglAdCompose_txt_English_ET").val(strAdTextEdt);
            //            //THCalculateLineCountforET();
            //            GetEntertainmentLineCalc("");
            //        }
            //    }
            //    else if (strAdLnCntEdt > strMinLnCntEdt) {
            //        EdtLnCnt = strAdLnCntEdt;
            //        if ($('#lblLnCntSingle_ET').text() != EdtLnCnt) {
            //            $.alert.open("info", "Since the ad has been published and the ad line count mismatch with previous line count.so the ad content is replaced by old one.");
            //            $("#SglAdCompose_txt_English_ET").val("");
            //            $("#SglAdCompose_txt_English_ET").val(strAdTextEdt);
            //            //THCalculateLineCountforET();
            //            GetEntertainmentLineCalc("");
            //        }
            //    }
            //}
            //else if (strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R' || strAdStatus == 'P') {
            //    if ($('#lblLnCntSingle_ET').text() < strAdLnCntEdt) {
            //        $.alert.open("info", "Decreasing the line count of booked ad cannot be allowed.Ad content is replaced by old one.");
            //        $("#SglAdCompose_txt_English_ET").val("");
            //        $("#SglAdCompose_txt_English_ET").val(strAdTextEdt);
            //        //THCalculateLineCountforET();
            //        GetEntertainmentLineCalc("");
            //    }
            //}
            GetEntertainmentLineCalc("");
        });

        $('#SglAdCompose_txt_EnglishMulti_ET').bind('keyup input propertychange', function () {   // substitute for txtAdvContent_textchange event 
            //For Displaying first two words in Bold
            GetLnCntTHforET_Multi();
            //GetET_Content_Multi(); GetET_Address_Multi("");
            //GetEntertainmentLineCalc_Multi("");
        });
        $("#SglAdCompose_txt_EnglishMulti_ET").keydown(function (event) {
            //if (parseInt($('#lblmirrorETHeading').text()) > 5) {
            //    $.alert.open('Info', " Line count of Headings should not be more than 5 lines");
            //    return false;
            //}
            var enterkey = event.keyCode || event.which;
            var el = $(this).get(0);
            var pos = el.selectionStart;
            // for restricting the press of enter key 
            if (enterkey == 9) {
                //$("#SglAdCompose_txt_EnglishMulti_ET").html(ReplaceForEntertainmentTabKey($("#SglAdCompose_txt_EnglishMulti_ET").html()));
                $("#SglAdCompose_txt_EnglishMulti_ET").val(ReplaceForEntertainmentTabKey($("#SglAdCompose_txt_EnglishMulti_ET").val()));
                return;
                //    enterkey = 68;
                //event.preventDefault();
            }
            // for pressing space at the start of textarea
            //if (enterkey == 32) {
            //    alert("keydownb4"+$("#txtEnterTH").html());
            //    e.preventDefault();
            //    //return false;
            //}
            //if ((enterkey == 32) && (GetETContent($("#txtEnterTH").text()) != "")) {
            //    var elem = 'txtEnterTH';
            //    if (elem == 'txtEnterTH') {
            //        var strCont = GetETContentNotTrim($("#txtEnterTH").text());
            //        //To check whether there is already space where the space has been entered currently
            //        if (pos > 0) {
            //            if (strCont.charAt(pos) == " " || strCont.charAt(pos - 1) == " ")
            //                return false;
            //        }
            //        else if (pos == 0)
            //            return false;
            //        //
            //        ////     show last character in the string            
            //        //var lastchar = strCont.charAt(strCont.length - 1);
            //        //if (lastchar == ' ') {
            //        //    //alert("doublespace");
            //        //    return false;
            //        //}
            //}
            //}
            //$('#txtAdsPreviewDtl').val($('#txtAdvContent').val());
            var arrBanWords = [];
            var arrConWords = [];
            //arrConWords = GetETContentNotTrim($("#SglAdCompose_txt_EnglishMulti_ET").text()).toUpperCase().split(' ');
            arrConWords = GetETContentNotTrim($("#SglAdCompose_txt_EnglishMulti_ET").val()).toUpperCase().split(' ');
            var intCnt = 0;
            var intBanCnt = 0;
            gstrNotAccWord = "";
            //        if ((enterkey == 8) || (enterkey == 46)) {
            //            var BfChar = null;
            //            var AfChar = null;
            //            var intcurPos = txtAdvContent.SelectionStart;
            //        }    
            if (lstInvalidWords == "")
                return;
            for (lstinvi = 0; lstinvi < lstInvalidWords.length; lstinvi++) {
                var strIstCnt = lstInvalidWords[lstinvi].trim().toUpperCase().trim();
                //if (GetETContentNotTrim($("#SglAdCompose_txt_EnglishMulti_ET").text()).toUpperCase().indexOf(strIstCnt) != -1) {
                if (GetETContentNotTrim($("#SglAdCompose_txt_EnglishMulti_ET").val()).toUpperCase().indexOf(strIstCnt) != -1) {
                    arrBanWords = strIstCnt.split(' ');
                    for (lstinvj = 0; lstinvj < arrConWords.length; lstinvj++) {
                        intCnt = lstinvj;
                        for (lstinvh = 0; lstinvh < arrBanWords.length; lstinvh++)
                            if (arrConWords[lstinvj].trim() == arrBanWords[lstinvh].trim()) {
                                lstinvj++;
                                intBanCnt = intBanCnt + 1;
                            }
                            else {
                                intBanCnt = 0;
                            }
                        //37----left   39-----right                
                        if (arrBanWords.length == intBanCnt) {
                            //                            txtAdvContent.Focus();
                            //                            txtAdvContent.SelectionStart = txtAdvContent.Text.toUpperCase().indexOf(strIstCnt);
                            //                            e.Handled = true;
                            if ((enterkey == 8) || (enterkey == 46)) {//for backspace and delete key
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return;
                            }
                            else if ((enterkey == 37) || (enterkey == 39)) {//for left and right key to pass through the invalid word
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return;
                            }
                            else {
                                $.alert.open("'" + strIstCnt + "' word(s) cannot be used for advertisements");
                                //alert("'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return false;
                            }
                        }
                        lstinvj = intCnt;
                    }
                }
            }
        });
        $("#SglAdCompose_txt_EnglishMulti_ET").keyup(function (event) {
            //if (parseInt($('#THlblLnCnt').text()) > 5 && $("#txtEnterTH").text() == "") {
            //    $.alert.open('Info', " Line count of Headings should not be more than 5 lines");
            //    return false;
            //}
            var enterkey = event.keyCode || event.which;
            if (enterkey == 9) {
                //$("#SglAdCompose_txt_EnglishMulti_ET").html(ReplaceForEntertainmentTabKey($("#SglAdCompose_txt_EnglishMulti_ET").html()));
                $("#SglAdCompose_txt_EnglishMulti_ET").val(ReplaceForEntertainmentTabKey($("#SglAdCompose_txt_EnglishMulti_ET").val()));
                return;
                //    enterkey = 68;
                //event.preventDefault();
            }
            if (enterkey == 32) {
                var cursorPos = "", clickx = "", clicky = "";
                //if ($("#SglAdCompose_txt_EnglishMulti_ET").html().substring($("#SglAdCompose_txt_EnglishMulti_ET").html().length - 4, $("#SglAdCompose_txt_EnglishMulti_ET").html().length) == '<br>') {
                if ($("#SglAdCompose_txt_EnglishMulti_ET").val().substring($("#SglAdCompose_txt_EnglishMulti_ET").val().length - 4, $("#SglAdCompose_txt_EnglishMulti_ET").val().length) == '<br>') {
                    cursorPos = document.selection.createRange().duplicate();
                    clickx = cursorPos.getBoundingClientRect().left;
                    clicky = cursorPos.getBoundingClientRect().top;
                    //var TrimmedBr = $("#SglAdCompose_txt_EnglishMulti_ET").html().substring(0, $("#SglAdCompose_txt_EnglishMulti_ET").html().length - 4);
                    var TrimmedBr = $("#SglAdCompose_txt_EnglishMulti_ET").val().substring(0, $("#SglAdCompose_txt_EnglishMulti_ET").val().length - 4);
                    //$("#SglAdCompose_txt_EnglishMulti_ET").html("");
                    $("#SglAdCompose_txt_EnglishMulti_ET").val("");
                    //$("#SglAdCompose_txt_EnglishMulti_ET").html(TrimmedBr);
                    $("#SglAdCompose_txt_EnglishMulti_ET").val(TrimmedBr);
                    cursorPos = document.body.createTextRange();
                    cursorPos.moveToPoint(clickx, clicky);
                    cursorPos.select();
                    //  setEndOfContenteditable(this);
                }
                //e.preventDefault();
                //return false;
            }
            //$('#txtAdsPreviewDtl').val($('#txtAdvContent').val());
            //if ($("#SglAdCompose_txt_EnglishMulti_ET").text().trim() != "") {
            if ($("#SglAdCompose_txt_EnglishMulti_ET").val().trim() != "") {
                settheFocusContro($("#divEditorTH"), 'N');
                if ($('#ddlTHGroupLN').css('visibility') == 'visible') {
                    if ($('#ddlTHGroupLN').val() == 'dummy') {
                        settheFocusContro($("#ddlTHGroupLN"), 'Y');
                    }
                    else {
                        settheFocusContro($("#ddlTHGroupLN"), 'N');
                    }
                }
            }
            else {
                settheFocusContro($("#divEditorTH"), 'Y');
                if ($('#ddlTHGroupLN').css('visibility') == 'visible') {
                    settheFocusContro($("#ddlTHGroupLN"), 'N');
                }
            }
            var arrBanWords = [];
            var arrConWords = [];
            //arrConWords = GetETContentNotTrim($("#SglAdCompose_txt_EnglishMulti_ET").text()).toUpperCase().split(' ');
            arrConWords = GetETContentNotTrim($("#SglAdCompose_txt_EnglishMulti_ET").val()).toUpperCase().split(' ');
            var intCnt = 0;
            var intBanCnt = 0;
            gstrNotAccWord = "";
            //        if ((enterkey == 8) || (enterkey == 46)) {
            //            var BfChar = null;
            //            var AfChar = null;
            //            var intcurPos = txtAdvContent.SelectionStart;
            //        }    
            if (lstInvalidWords == "")
                return;
            for (lstinvi = 0; lstinvi < lstInvalidWords.length; lstinvi++) {
                var strIstCnt = lstInvalidWords[lstinvi].trim().toUpperCase().trim();
                //if (GetETContentNotTrim($("#SglAdCompose_txt_EnglishMulti_ET").text()).toUpperCase().indexOf(strIstCnt) != -1) {
                if (GetETContentNotTrim($("#SglAdCompose_txt_EnglishMulti_ET").val()).toUpperCase().indexOf(strIstCnt) != -1) {
                    arrBanWords = strIstCnt.split(' ');
                    for (lstinvj = 0; lstinvj < arrConWords.length; lstinvj++) {
                        intCnt = lstinvj;
                        for (lstinvh = 0; lstinvh < arrBanWords.length; lstinvh++)
                            if (arrConWords[lstinvj].trim() == arrBanWords[lstinvh].trim()) {
                                lstinvj++;
                                intBanCnt = intBanCnt + 1;
                            }
                            else {
                                intBanCnt = 0;
                            }
                        //37----left   39-----right                
                        if (arrBanWords.length == intBanCnt) {
                            //                            txtAdvContent.Focus();
                            //                            txtAdvContent.SelectionStart = txtAdvContent.Text.toUpperCase().indexOf(strIstCnt);
                            //                            e.Handled = true;
                            if ((enterkey == 8) || (enterkey == 46)) {//for backspace and delete key
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return;
                            }
                            else if ((enterkey == 37) || (enterkey == 39)) {//for left and right key to pass through the invalid word
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return;
                            }
                            else {
                                $.alert.open("'" + strIstCnt + "' word(s) cannot be used for advertisements");
                                // alert("'" + strIstCnt + "' Word(s) Cannot Be Used For Advertisements");
                                gstrNotAccWord = "'" + strIstCnt + "' word(s) cannot be used for advertisements";
                                return false;
                            }
                        }
                        lstinvj = intCnt;
                    }
                }
            }
            GetEntertainmentLineCalc_Multi();
        });
        $("#SglAdCompose_txt_EnglishMulti_ET").focusout(function () {   // substitute for txtAdvContent_lostfocus event 
            //// alert("hello focusout");
            ////var intActualLnCnt = GetETContent($("#SglAdCompose_txt_EnglishMulti_ET").text()).length;
            //var intActualLnCnt = GetETContent($("#SglAdCompose_txt_EnglishMulti_ET").val()).length;
            //var strAdTextEdt = "";
            //var EdtLnCnt = 0;
            //var strAdLnCntEdt = 0;
            //var strMinLnCntEdt = 0;
            //$.each(lstLnCntPubEdt, function (iii, vvv) {
            //    if (vvv.split('~')[0] == 'TH') {
            //        strAdLnCntEdt = parseInt(vvv.split('~')[2]);
            //        strMinLnCntEdt = parseInt(vvv.split('~')[1]);
            //        strAdTextEdt = vvv.split('~')[3].trim();
            //    }
            //});
            ////    if (((intActualLnCnt % 35) < 17) && (intActualLnCnt != 0) && ((intActualLnCnt % 35) != 0) && (intActualLnCnt > 1))
            ////        //alert(35 - (intActualLnCnt % 35) + " characters remaining. If you wish, Please utilise the remaining space");
            ////        $.alert.open(35 - (intActualLnCnt % 35) + " characters remaining. If you wish, please utilise the remaining space");
            //if (strInserTypeEdt == 'SCH' && (strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R' || strAdStatus == 'P') && lstDeadLnEdtAdDtls.length > 0) {
            //    if (strAdLnCntEdt <= strMinLnCntEdt) {
            //        EdtLnCnt = strMinLnCntEdt;
            //        if ($('#lblLnCntMulti_ET').text() > EdtLnCnt) {
            //            $.alert.open("info", "Ads has been published and the ad line count mismatch with previous line count.Ad content is replaced by old one.");
            //            $("#SglAdCompose_txt_EnglishMulti_ET").val("");
            //            $("#SglAdCompose_txt_EnglishMulti_ET").val(strAdTextEdt);
            //            //THCalculateLineCountforET();
            //            GetEntertainmentLineCalc_Multi();
            //        }
            //    }
            //    else if (strAdLnCntEdt > strMinLnCntEdt) {
            //        EdtLnCnt = strAdLnCntEdt;
            //        if ($('#lblLnCntMulti_ET').text() != EdtLnCnt) {
            //            $.alert.open("info", "Since the ad has been published and the ad line count mismatch with previous line count.so the ad content is replaced by old one.");
            //            $("#SglAdCompose_txt_EnglishMulti_ET").val("");
            //            $("#SglAdCompose_txt_EnglishMulti_ET").val(strAdTextEdt);
            //            //THCalculateLineCountforET();
            //            GetEntertainmentLineCalc_Multi();
            //        }
            //    }
            //}
            //else if (strAdStatus == 'B' || strAdStatus == 'A' || strAdStatus == 'R' || strAdStatus == 'P') {
            //    if ($('#lblLnCntMulti_ET').text() < strAdLnCntEdt) {
            //        $.alert.open("info", "Decreasing the line count of booked ad cannot be allowed.Ad content is replaced by old one.");
            //        $("#SglAdCompose_txt_EnglishMulti_ET").val("");
            //        $("#SglAdCompose_txt_EnglishMulti_ET").val(strAdTextEdt);
            //        //THCalculateLineCountforET();
            //        GetEntertainmentLineCalc_Multi();
            //    }
            //}
            GetEntertainmentLineCalc_Multi('');
        });
        //$('#txtEnterTH').keypress(function (event) {            
        //    GetEntertainmentLineCalc();
        //});
        //$('#txtETName').keypress(function (event) {           
        //    GetEntertainmentLineCalc();
        //});
        //$('#txtETAddress').keypress(function (event) {
        //    GetEntertainmentLineCalc();
        //});
        //$('#txtETContanctNo').keypress(function (event) {
        //    GetEntertainmentLineCalc();
        //});
        ///******************************//
        //End of Entertainment ad Process//
        ///******************************//
    }

    //    $('#chkLNSameMaterialTH').click
    //(
    //function (event) {    
    //    if ($("#chkLNSameMaterialTH").is(":checked") == true) {
    //        gblnSameMaterialflg = true;
    //        $('#pgLNSameMaterialBL').css({ display: "none" });
    //        SameMeterialApplyforAllPublication("Add", "TH");
    //    }
    //    else {
    //        gblnSameMaterialflg = false;
    //        $('#pgLNSameMaterialBL').css({ display: "block" });
    //        SameMeterialApplyforAllPublication("Remove", "TH");
    //    }
    //    //FN_Publications("TM");
    //});
    //$('#chkLNSameMaterialBL').click
    //(
    //function (event) {        
    //    if ($("#chkLNSameMaterialBL").is(":checked") == true) {
    //        gblnSameMaterialflg = true;
    //        $('#pgLNSameMaterialTH').css({ display: "none" });
    //        SameMeterialApplyforAllPublication("Add", "BL");
    //    }
    //    else {
    //        gblnSameMaterialflg = false;
    //        $('#pgLNSameMaterialTH').css({ display: "block" });
    //        SameMeterialApplyforAllPublication("Remove", "BL");
    //    }
    //    //FN_Publications("TM");
    //});
    //$('#chkLNSameMaterialTM').click
    //(
    //function (event) {        
    //    gblnSameMaterialflg = true;
    //    if ($("#chkLNSameMaterialTH").is(":checked") == true) {
    //        $('#pgLNSameMaterialTH').css({ display: "none" });
    //        $('#pgLNSameMaterialBL').css({ display: "none" });
    //        SameMeterialApplyforAllPublication("Add", "TM");
    //    }
    //    else {
    //        gblnSameMaterialflg = false;
    //        SameMeterialApplyforAllPublication("Remove", "TM");
    //        $('#pgLNSameMaterialTH').css({ display: "block" });
    //        $('#pgLNSameMaterialBL').css({ display: "block" });
    //    }
    //    //FN_Publications("TM");
    //});

    $('#SglAdCompose_txt_English_ET_Address').keypress(function (e) {
        var regex = "~,|,^".split(',');
        var code = e.charCode === 0 ? e.which : e.charCode;
        var key = String.fromCharCode(code);
        
        if (regex.containsSubString(key) != -1) {
            e.preventDefault();
            return false;
        }
    });

    $('#SglAdCompose_txt_English_ET').keypress(function (e) {
        var regex = "~,|,^".split(',');
        var code = e.charCode === 0 ? e.which : e.charCode;
        var key = String.fromCharCode(code);

        if (regex.containsSubString(key) != -1) {
            e.preventDefault();
            return false;
        }
    });
    
});

//For calculating the line count for Text Ad/s for TH
function THCalculateLineCount() {
    var strAdVContent = "";
    var intActualLnCnt = 0;
    var intCharCnt = 0;
    var intRemainingCharCnt = 0;
    var intTempActualLnCnt = 0;
    strAdVContent = $('#SglAdCompose_txt_EnglishMulti').val().trim();
    intCharCnt = strAdVContent.trim().length;
    intActualLnCnt = parseInt(Math.floor((strAdVContent.length) / 35));
    intTempActualLnCnt = parseInt(Math.floor((strAdVContent.length) / 35));
    if (intActualLnCnt < intMinimumLnCnt)
        intActualLnCnt = intMinimumLnCnt;
    if ($('#chkBox').is(":checked") == true)
        intActualLnCnt += 1;
    intRemainingCharCnt = (strAdVContent.length) % 35;
    if ((intRemainingCharCnt != 0) && (intTempActualLnCnt >= intMinimumLnCnt))
        intActualLnCnt = intActualLnCnt + 1;
    intTempActualLnCnt = parseInt(Math.floor((strAdVContent.length) / 35));
    intRemainingCharCnt = (strAdVContent.length) % 35;
    if (intRemainingCharCnt != 0)
        intTempActualLnCnt = intTempActualLnCnt + 1;
    intTempActualLnCnt = parseInt(Math.floor((strAdVContent.length) / 35));
    intRemainingCharCnt = (strAdVContent.length) % 35;
    if (intRemainingCharCnt != 0)
        intTempActualLnCnt = intTempActualLnCnt + 1;
    $('#lblLnCntMulti').text(intTempActualLnCnt.toString());


    $('#lblCharCntMulti').text(intCharCnt.toString());
}

function BLCalculateLineCount() {
    var strAdVContent = "";
    var intActualLnCnt = 0;
    var intCharCnt = 0;
    var intRemainingCharCnt = 0;
    var intTempActualLnCnt = 0;
    strAdVContent = $('#txtBL').val().trim();
    intCharCnt = strAdVContent.trim().length;
    intActualLnCnt = parseInt(Math.floor((strAdVContent.length) / 35));
    intTempActualLnCnt = parseInt(Math.floor((strAdVContent.length) / 35));
    if (intActualLnCnt < intMinimumLnCnt)
        intActualLnCnt = intMinimumLnCnt;
    if ($('#chkBox').is(":checked") == true)
        intActualLnCnt += 1;
    intRemainingCharCnt = (strAdVContent.length) % 35;
    if ((intRemainingCharCnt != 0) && (intTempActualLnCnt >= intMinimumLnCnt))
        intActualLnCnt = intActualLnCnt + 1;
    intTempActualLnCnt = parseInt(Math.floor((strAdVContent.length) / 35));
    intRemainingCharCnt = (strAdVContent.length) % 35;
    if (intRemainingCharCnt != 0)
        intTempActualLnCnt = intTempActualLnCnt + 1;
    intTempActualLnCnt = parseInt(Math.floor((strAdVContent.length) / 35));
    intRemainingCharCnt = (strAdVContent.length) % 35;
    if (intRemainingCharCnt != 0)
        intTempActualLnCnt = intTempActualLnCnt + 1;
    $('#BLlblLnCnt').text(intTempActualLnCnt.toString());
    $('#BLlblCharCnt').text(intCharCnt.toString());
}

//For Displaying first two words in Bold
function TwoWordsBold() {
    var intTempCnt1 = 0;
    var intTempCnt2 = 0;
    var strTempText = "";
    var strCapsText = "";
    var strNormalText = "";
    var lstTick = [];
    var lstBold = [];

    lstTick = gstrTick.split(',');
    lstBold = gstrBold.split(',');
    $('#divPreviewTH').text("");
    $('#divPreviewBL').text("");
    if ($("#SglAdCompose_txt_EnglishMulti")[0].style.display == "block") {
        if ($('#SglAdCompose_txt_EnglishMulti').val().trim().split(' ').length > 2) {

            intTempCnt1 = $('#SglAdCompose_txt_EnglishMulti').val().indexOf(' ') + 1;
            strTempText = $('#SglAdCompose_txt_EnglishMulti').val().trim().substr(intTempCnt1, $('#SglAdCompose_txt_EnglishMulti').val().trim().length - intTempCnt1);
            intTempCnt2 = strTempText.indexOf(' ') + 1;
            strCapsText = $('#SglAdCompose_txt_EnglishMulti').val().trim().substr(0, intTempCnt1 + intTempCnt2);
            strNormalText = $('#SglAdCompose_txt_EnglishMulti').val().trim().substr(intTempCnt1 + intTempCnt2, $('#SglAdCompose_txt_EnglishMulti').val().trim().length - intTempCnt1 - intTempCnt2);

            if (($('#THbold').hasClass('on') == true && lstBold.containsSubString('TH') > -1) && ($('#THtick').hasClass('on') == true && lstTick.containsSubString('TH') > -1)) {
                // strCapsText = "       " + strCapsText;
                $("#imgTickImageTH").css("visibility", "visible");
                strCapsText = strCapsText.toUpperCase();
                var result = (strCapsText + strNormalText).replace((strCapsText + strNormalText), "<span>" + (strCapsText + strNormalText) + "</span>");
                //$('.text-view').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + result);
                $('.text-view').html('<img id="imgTickImage" src="images/tickImg.png"  height="20" width="20" alt="tickimg" style="visibility:visible"/>&nbsp;' + result);
            }
            else if (($('#THbold').hasClass('on') == false) && ($('#THtick').hasClass('on') == true && lstTick.containsSubString('TH') > -1)) {
                $("#imgTickImageTH").css("visibility", "visible");
                var text = $('#SglAdCompose_txt_EnglishMulti').val();
                $('.text-view').html('').append(text);
                var result = $('.text-view').html();
                var result = result.replace(strCapsText, "<span>" + strCapsText.toUpperCase() + "</span>");
                //$('.text-view').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + result);
                $('.text-view').html('<img id="imgTickImage" src="images/tickImg.png"  height="20" width="20" alt="tickimg" style="visibility:visible"/>&nbsp;' + result);
            }
            else if (($('#THbold').hasClass('on') == true && lstBold.containsSubString('TH') > -1) && ($('#THtick').hasClass('on') == false)) {
                // $('#TxtAdvPreview').empty();
                strCapsText = strCapsText.toUpperCase();
                var result = (strCapsText + strNormalText).replace((strCapsText + strNormalText), "<span>" + (strCapsText + strNormalText) + "</span>");
                $('.text-view').html(result);

            }
            else if (($('#THbold').hasClass('on') == true && lstBold.containsSubString('TH') > -1) && ($('#THtick').hasClass('on') == true && lstTick.containsSubString('TH') == -1)) {
                strCapsText = strCapsText.toUpperCase();
                var result = (strCapsText + strNormalText).replace((strCapsText + strNormalText), "<span>" + (strCapsText + strNormalText) + "</span>");
                $('.text-view').html(result);
            }
            else if (($('#THbold').hasClass('on') == true && lstBold.containsSubString('TH') == -1) && ($('#THtick').hasClass('on') == true && lstTick.containsSubString('TH') > -1)) {
                $("#imgTickImageTH").css("visibility", "visible");
                var text = $('#SglAdCompose_txt_EnglishMulti').val();
                $('.text-view').html('').append(text);
                var result = $('.text-view').html();
                var result = result.replace(strCapsText, "<span>" + strCapsText.toUpperCase() + "</span>");
                $('.text-view').html('<img id="imgTickImage" src="images/tickImg.png"  height="20" width="20" alt="tickimg" style="visibility:visible"/>&nbsp;' + result);
            }
            else {
                // $('#TxtAdvPreview').empty();
                var text = $('#SglAdCompose_txt_EnglishMulti').val();
                $('.text-view').html('').append(text);
                var result = $('.text-view').html();
                var result = result.replace(strCapsText, "<span>" + strCapsText.toUpperCase() + "</span>");
                $('.text-view').html(result);
            }

        }
        else
            if ($('#THtick').hasClass('on') == true && lstTick.containsSubString('TH') > -1) {
                //alert("ticked");
                $("#imgTickImageTH").css("visibility", "visible");
                //txtAdsPreviewDtl.Inlines.Add(new Run() { Text = "       " + txtAdvContent.Text.trim().toUpperCase, FontWeight = FontWeights.Bold });
                var text = $('#SglAdCompose_txt_EnglishMulti').val().toUpperCase();
                var result = (text).replace((text), "<span>" + (text) + "</span>");
                //$('.text-view').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + result);
                $('.text-view').html('<img id="imgTickImage" src="images/tickImg.png"  height="20" width="20" alt="tickimg" style="visibility:visible"/>&nbsp;' + result);
            }
            else {
                //alert("no ticked");
                //$('#TxtAdvPreview').empty();
                var text = $('#SglAdCompose_txt_EnglishMulti').val().toUpperCase();
                var result = (text).replace((text), "<span>" + (text) + "</span>");
                $('.text-view').html(result);
                //  txtAdsPreviewDtl.Inlines.Add(new Run() { Text = txtAdvContent.Text.trim().toUpperCase, FontWeight = FontWeights.Bold });
            }

    }
    else if ($("#tabBL")[0].style.display == "block") {
        if ($('#txtBL').val().trim().split(' ').length > 2) {

            intTempCnt1 = $('#txtBL').val().indexOf(' ') + 1;
            strTempText = $('#txtBL').val().trim().substr(intTempCnt1, $('#txtBL').val().trim().length - intTempCnt1);
            intTempCnt2 = strTempText.indexOf(' ') + 1;
            strCapsText = $('#txtBL').val().trim().substr(0, intTempCnt1 + intTempCnt2);
            strNormalText = $('#txtBL').val().trim().substr(intTempCnt1 + intTempCnt2, $('#txtBL').val().trim().length - intTempCnt1 - intTempCnt2);
            if (($('#BLbold').hasClass('on') == true && lstBold.containsSubString('BL') > -1) && ($('#BLtick').hasClass('on') == true && lstTick.containsSubString('BL') > -1)) {
                // strCapsText = "       " + strCapsText;
                $("#imgTickImageBL").css("visibility", "visible");
                strCapsText = strCapsText.toUpperCase();
                var result = (strCapsText + strNormalText).replace((strCapsText + strNormalText), "<span>" + (strCapsText + strNormalText) + "</span>");
                //$('.text-view').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + result);
                $('.text-view').html('<img id="imgTickImage" src="images/tickImg.png"  height="20" width="20" alt="tickimg" style="visibility:visible"/>&nbsp;' + result);
            }
            else if (($('#BLbold').hasClass('on') == false) && ($('#BLtick').hasClass('on') == true && lstTick.containsSubString('BL') > -1)) {
                // strCapsText = "       " + strCapsText;
                $("#imgTickImageBL").css("visibility", "visible");
                var text = $('#txtBL').val();
                $('.text-view').html('').append(text);
                var result = $('.text-view').html();
                var result = result.replace(strCapsText, "<span>" + strCapsText.toUpperCase() + "</span>");
                //$('.text-view').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + result);
                $('.text-view').html('<img id="imgTickImage" src="images/tickImg.png"  height="20" width="20" alt="tickimg" style="visibility:visible"/>&nbsp;' + result);

            }
            else if (($('#BLbold').hasClass('on') == true && lstBold.containsSubString('BL') > -1) && ($('#BLtick').hasClass('on') == false)) {
                // $('#TxtAdvPreview').empty();
                strCapsText = strCapsText.toUpperCase();
                var result = (strCapsText + strNormalText).replace((strCapsText + strNormalText), "<span>" + (strCapsText + strNormalText) + "</span>");
                $('.text-view').html(result);

            }
            else if (($('#BLbold').hasClass('on') == true && lstBold.containsSubString('BL') > -1) && ($('#BLtick').hasClass('on') == true && lstTick.containsSubString('BL') == -1)) {
                strCapsText = strCapsText.toUpperCase();
                var result = (strCapsText + strNormalText).replace((strCapsText + strNormalText), "<span>" + (strCapsText + strNormalText) + "</span>");
                $('.text-view').html(result);
            }
            else if (($('#BLbold').hasClass('on') == true && lstBold.containsSubString('BL') == -1) && ($('#BLtick').hasClass('on') == true && lstTick.containsSubString('BL') > -1)) {
                $("#imgTickImageBL").css("visibility", "visible");
                var text = $('#txtBL').val();
                $('.text-view').html('').append(text);
                var result = $('.text-view').html();
                var result = result.replace(strCapsText, "<span>" + strCapsText.toUpperCase() + "</span>");
                $('.text-view').html('<img id="imgTickImage" src="images/tickImg.png"  height="20" width="20" alt="tickimg" style="visibility:visible"/>&nbsp;' + result);
            }
            else {
                // $('#TxtAdvPreview').empty();
                var text = $('#txtBL').val();
                $('.text-view').html('').append(text);
                var result = $('.text-view').html();
                var result = result.replace(strCapsText, "<span>" + strCapsText.toUpperCase() + "</span>");
                $('.text-view').html(result);
            }
        }
        else
            if ($('#BLtick').hasClass('on') == true && lstTick.containsSubString('BL') > -1) {
                //alert("ticked");
                $("#imgTickImageBL").css("visibility", "visible");
                //txtAdsPreviewDtl.Inlines.Add(new Run() { Text = "       " + txtAdvContent.Text.trim().toUpperCase, FontWeight = FontWeights.Bold });
                var text = $('#txtBL').val().toUpperCase();
                var result = (text).replace((text), "<span>" + (text) + "</span>");
                //$('.text-view').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + result);
                $('.text-view').html('<img id="imgTickImage" src="images/tickImg.png"  height="20" width="20" alt="tickimg" style="visibility:visible"/>&nbsp;' + result);
            }
            else {
                //alert("no ticked");
                //$('#TxtAdvPreview').empty();
                var text = $('#txtBL').val().toUpperCase();
                var result = (text).replace((text), "<span>" + (text) + "</span>");
                $('.text-view').html(result);
                //  txtAdsPreviewDtl.Inlines.Add(new Run() { Text = txtAdvContent.Text.trim().toUpperCase, FontWeight = FontWeights.Bold });
            }
    }
    gstrTick = '';
    gstrBold = '';
}

function SameMeterialApplyforAllPublication(status, strPubCode) {
    switch (strPubCode) {
        case "TH":
            if (status == "Add") {
                $('#txtBL').val($('#txt' + strPubCode).val());
                $('#txtTM').val($('#txt' + strPubCode).val());
                //TwoWordsBold();
                BLCalculateLineCount();
                $('#lblLnCntSingle').text(TmpLnCountTM);//for setting the text in label in tamil tab the calculated line count from the duplicate mirror placed next to the hindu textbox
                //lblSameMatrial = true;
                TmpInitheight = TmpInitheight;   //for sending the initial height to txttm for calculating linecount in tamil tab when continuing to type text after clicking same material
                settheFocusContro($('#divEditorBL'), 'N');
                if ($('#ddlBLGroupLN').css('visibility') == 'visible') {
                    if ($('#ddlBLGroupLN').val() == 'dummy') {
                        settheFocusContro($("#ddlBLGroupLN"), 'Y');
                    }
                    else {
                        settheFocusContro($("#ddlBLGroupLN"), 'N');
                    }
                }
                settheFocusContro($('#divEditorTM'), 'N');
            }
            else {
                $('#txtBL').val("");
                $('#txtTM').val("");
                $('#lblLnCntSingle').text(0);
                //TwoWordsBold();
                BLCalculateLineCount();
                settheFocusContro($('#divEditorBL'), 'Y');
                settheFocusContro($('#divEditorTM'), 'Y');
            }
            break;
        case "BL":
            if (status == "Add") {
                $('#SglAdCompose_txt_EnglishMulti').val($('#txt' + strPubCode).val());
                $('#txtTM').val($('#txt' + strPubCode).val());
                //TwoWordsBold();
                THCalculateLineCount();
                $('#lblLnCntSingle').text(TmpLnCountTM);
                //lblSameMatrial = true;
                TmpInitheight = TmpInitheight;
                settheFocusContro($('#divEditorTH'), 'N');
                if ($('#ddlTHGroupLN').css('visibility') == 'visible') {
                    if ($('#ddlTHGroupLN').val() == 'dummy') {
                        settheFocusContro($("#ddlTHGroupLN"), 'Y');
                    }
                    else {
                        settheFocusContro($("#ddlTHGroupLN"), 'N');
                    }
                }
                settheFocusContro($('#divEditorTM'), 'N');
            }
            else {
                $('#SglAdCompose_txt_EnglishMulti').val("");
                $('#txtTM').val("");
                $('#lblLnCntSingle').text(0);
                //TwoWordsBold();
                THCalculateLineCount();
                settheFocusContro($('#divEditorTH'), 'Y');
                settheFocusContro($('#divEditorTM'), 'Y');
            }
            break;
        case "TM":
            if (status == "Add") {
                $('#SglAdCompose_txt_EnglishMulti').val($('#txt' + strPubCode).val());
                $('#txtBL').val($('#txt' + strPubCode).val());
                //TwoWordsBold();
                THCalculateLineCount();
                if ($('#ddlTHGroupLN').css('visibility') == 'visible') {
                    if ($('#ddlTHGroupLN').val() == 'dummy') {
                        settheFocusContro($("#ddlTHGroupLN"), 'Y');
                    }
                    else {
                        settheFocusContro($("#ddlTHGroupLN"), 'N');
                    }
                }
                if ($('#ddlBLGroupLN').css('visibility') == 'visible') {
                    if ($('#ddlBLGroupLN').val() == 'dummy') {
                        settheFocusContro($("#ddlBLGroupLN"), 'Y');
                    }
                    else {
                        settheFocusContro($("#ddlBLGroupLN"), 'N');
                    }
                }
                settheFocusContro($('#divEditorTH'), 'N');
                settheFocusContro($('#divEditorBL'), 'N');
            }
            else {
                $('#SglAdCompose_txt_EnglishMulti').val("");
                $('#txtBL').val("");
                //TwoWordsBold();
                THCalculateLineCount();
                settheFocusContro($('#divEditorTH'), 'Y');
                settheFocusContro($('#divEditorBL'), 'Y');
            }
            break;
    }
}

//For getting Invalid words to check while thwe user books Text Advertisements
function GetInvalidWords() {
    $.ajax({
       // url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetInvalidWords",
        url: gStrIpVal+ "HinduFranchiseeService.svc/GetInvalidWords",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        returnType: "json",
        async: false,
        success: function (data) {
            $.each(data.GetInvalidWordsResult, function (index, value) {
                lstInvalidWords.push(data.GetInvalidWordsResult[index].strInvalidWords);
            });

            //     lstInvalidWords = data;

        } //close for success fn
    });
}

function GetLnCntTH() {
    //$('#divPreview').text($('#txtTH').val());
    ////TwoWordsBold();
    THCalculateLineCount();
}

function GetLnCntBL() {
    //$('#divPreview').text($('#txtBL').val());
    ////TwoWordsBold();
    BLCalculateLineCount();
}

//for Highlate the foucus 
function settheFocusContro(control, addorRemove) {
    if (addorRemove == "Y") {
        control.addClass("shadow");
    }
    else if (addorRemove == "N") {
        control.removeClass("shadow");
    }
}
//

///********************************//
//Start of Entertainment ad Process//
///********************************//

function GetETContent(strText) {
    strText = strText;//.replaceAll('\n', '').trim();
    return strText;
}

function GetETContentNotTrim(strText) {
    strText = strText;//.replaceAll('\n', '');
    return strText;
}

function THCalculateLineCountforET() {
    var strAdVContent = "";
    var intActualLnCnt = 0;
    var intCharCnt = 0;
    var intRemainingCharCnt = 0;
    var intTempActualLnCnt = 0;
    strAdVContent = GetETContent($('#SglAdCompose_txt_English_ET').text());
    intCharCnt = strAdVContent.trim().length;
    intActualLnCnt = parseInt(Math.floor((strAdVContent.length) / 35));
    intTempActualLnCnt = parseInt(Math.floor((strAdVContent.length) / 35));
    if (intActualLnCnt < intMinimumLnCnt)
        intActualLnCnt = intMinimumLnCnt;
    if ($('#chkBox').is(":checked") == true)
        intActualLnCnt += 1;
    intRemainingCharCnt = (strAdVContent.length) % 35;
    if ((intRemainingCharCnt != 0) && (intTempActualLnCnt >= intMinimumLnCnt))
        intActualLnCnt = intActualLnCnt + 1;
    intTempActualLnCnt = parseInt(Math.floor((strAdVContent.length) / 35));
    intRemainingCharCnt = (strAdVContent.length) % 35;
    if (intRemainingCharCnt != 0)
        intTempActualLnCnt = intTempActualLnCnt + 1;
    intTempActualLnCnt = parseInt(Math.floor((strAdVContent.length) / 35));
    intRemainingCharCnt = (strAdVContent.length) % 35;
    if (intRemainingCharCnt != 0)
        intTempActualLnCnt = intTempActualLnCnt + 1;
    //$('#THlblLnCnt').text(intTempActualLnCnt.toString());
    //$('#THlblCharCnt').text(intCharCnt.toString());
}

function GetLnCntTHforET() {//GetET_Content
    $('#divPreview').text(GetETContent($('#SglAdCompose_txt_English_ET').text()));
    GetPreviewET();
}

function GetET_Address(strEvent) {
    var sendContentToMirrorET = function (textareaET) {
        $('.autogrow-textarea-mirrorET').html($(textareaET).html());
        //for initial height if Copy past function.
        if (iterationET === 0 && blnEditFlag != true && strEvent != "" && $(textareaET).html() == "") {
            if (strEvent != "Initial") {
                if (strEvent == "body")
                    $('.autogrow-textarea-mirrorET').html("<span class='EntertainmaneBody'><p lang='en' class='auto'>" + ReplaceForEntertainmentTabKey(ReplaceBreakSpace("S")) + "</p></span>");
                else
                    $('.autogrow-textarea-mirrorET').html("<span class='EntertainmaneNameAdd'><p lang='en' class='auto'>" + ReplaceBreakSpace("S") + "</p></span>");
            }
        }
        calculateRowNumberET();
    }
    var calculateRowNumberET = function (pEveCurrId) {
        if (strEvent == "Initial") {
            if ($('#lblLnCntSingle_ET').text().trim() > 0) {
                ininitalHeightET = ($('.autogrow-textarea-mirrorET').height()) / (parseInt($('#lblLnCntSingle_ET').text()));
                currentHeightET = $('.autogrow-textarea-mirrorET').height();
                if (currentHeightET != null && currentHeightET != undefined && parseInt(currentHeightET) > 0)
                    iterationET++;
                editedLnCnt = parseInt($('#lblLnCntSingle_ET').text());
                return false;
            }
            else {
                ininitalHeightET = $('.autogrow-textarea-mirrorET').height();
                currentHeightET = ininitalHeightET;
                if (currentHeightET != null && currentHeightET != undefined && parseInt(currentHeightET) > 0)
                    iterationET++;
            }
        }
        else if (iterationET === 0 && blnEditFlag != true) {
            if (strEvent != "") {
                ininitalHeightET = $('.autogrow-textarea-mirrorET').height();
                currentHeightET = ininitalHeightET;
                iterationET++;
                return;
            }
            ininitalHeightET = $('.autogrow-textarea-mirrorET').height();
            currentHeightET = ininitalHeightET;
            iterationET++;
            //if (TmpInitheightET > 0) {
            //    ininitalHeightET = TmpInitheightET;
            //    currentHeightET = $$('.autogrow-textarea-mirrorET').height();
            //}
        }
        else if (strEvent != "") {
            //no function ******
            return false;
        }
        else
            if (iterationET === 0 && blnEditFlag == true) {
                if ($('#lblLnCntSingle_ET').text().trim() > 0) {
                    ininitalHeightET = ($('.autogrow-textarea-mirrorET').height()) / (parseInt($('#lblLnCntSingle_ET').text()));
                    currentHeightET = $('.autogrow-textarea-mirrorET').height();
                    iterationET++;
                }
                else {
                    ininitalHeightET = $('.autogrow-textarea-mirrorET').height();
                    currentHeightET = ininitalHeightET;
                    iterationET++;
                }
            }
            else {
                if (parseInt($('.autogrow-textarea-mirrorET').height() % ininitalHeightET) != 0)
                    currentHeightET = parseInt($('.autogrow-textarea-mirrorET').height() + 1);
                else
                    currentHeightET = $('.autogrow-textarea-mirrorET').height();
            }
        //currentRowET = Math.floor(currentHeightET / ininitalHeightET);
        // Modified by nasurudeen on 29-12-2015 Line count new function.
        if (strEvent == "")
            currentRowET = $('#divEntertainmentPreview').getLines();

        if ($('#SglAdCompose_txt_English_ET_Address').html().trim().replaceAll('<br>', '') == "" &&
            $('#SglAdCompose_txt_English_ET').html().trim().replaceAll('<br>', '') == "") {
            currentRowET = 0;
        }
        $('#lblLnCntSingle_ET').text(currentRowET.toString());
    }
    if (parseInt($('#lblLnCntSingle_ET').text()) > 30) {     //for if line count is grater than 30 then remove the save to pdf   
        $('#btnSavetoPdf').css({ display: "none" });
        gstrJcnNumber = "";
    }
    else {
        $('#btnSavetoPdf').css({ display: "none" });
    }
    sendContentToMirrorET($('#divEntertainmentPreview'));
}

function GetLnCntTHforET_Multi() {//GetET_Content_Multi
    //$('#divPreview').text(GetETContent($('#SglAdCompose_txt_EnglishMulti_ET').text()));
    $('#divPreview').text(GetETContent($('#SglAdCompose_txt_EnglishMulti_ET').val()));
    GetPreviewET_Multi();
}

function GetET_Address_Multi(strEvent) {
    var sendContentToMirrorET = function (textareaET) {
        $('.autogrow-textarea-mirrorET').html($(textareaET).html());
        //for initial height if Copy past function.
        if (iterationET === 0 && blnEditFlag != true && strEvent != "" && $(textareaET).html() == "") {
            if (strEvent != "Initial") {
                if (strEvent == "body")
                    $('.autogrow-textarea-mirrorET').html("<span class='EntertainmaneBody'><p lang='en' class='auto'>" + ReplaceForEntertainmentTabKey(ReplaceBreakSpace("S")) + "</p></span>");
                else
                    $('.autogrow-textarea-mirrorET').html("<span class='EntertainmaneNameAdd'><p lang='en' class='auto'>" + ReplaceBreakSpace("S") + "</p></span>");
            }
        }
        calculateRowNumberET();
    }
    var calculateRowNumberET = function (pEveCurrId) {
        if (strEvent == "Initial") {
            if ($('#lblLnCntMulti_ET').text().trim() > 0) {
                ininitalHeightET = ($('.autogrow-textarea-mirrorET').height()) / (parseInt($('#lblLnCntMulti_ET').text()));
                currentHeightET = $('.autogrow-textarea-mirrorET').height();
                if (currentHeightET != null && currentHeightET != undefined && parseInt(currentHeightET) > 0)
                    iterationET++;
                editedLnCnt = parseInt($('#lblLnCntMulti_ET').text());
                return false;
            }
            else {
                ininitalHeightET = $('.autogrow-textarea-mirrorET').height();
                currentHeightET = ininitalHeightET;
                if (currentHeightET != null && currentHeightET != undefined && parseInt(currentHeightET) > 0)
                    iterationET++;
            }
        }
        else if (iterationET === 0 && blnEditFlag != true) {
            if (strEvent != "") {
                ininitalHeightET = $('.autogrow-textarea-mirrorET').height();
                currentHeightET = ininitalHeightET;
                if (currentHeightET != null && currentHeightET != undefined && parseInt(currentHeightET) > 0)
                    iterationET++;
                return;
            }
            ininitalHeightET = $('.autogrow-textarea-mirrorET').height();
            currentHeightET = ininitalHeightET;
            if (currentHeightET != null && currentHeightET != undefined && parseInt(currentHeightET) > 0)
                iterationET++;
            //if (TmpInitheightET > 0) {
            //    ininitalHeightET = TmpInitheightET;
            //    currentHeightET = $$('.autogrow-textarea-mirrorET').height();
            //}
        }
        else if (strEvent != "") {
            //no function ******
            return false;
        }
        else {
            if (iterationET === 0 && blnEditFlag == true) {
                if ($('#lblLnCntMulti_ET').text().trim() > 0) {
                    ininitalHeightET = ($('.autogrow-textarea-mirrorET').height()) / (parseInt($('#lblLnCntMulti_ET').text()));
                    currentHeightET = $('.autogrow-textarea-mirrorET').height();
                    if (currentHeightET != null && currentHeightET != undefined && parseInt(currentHeightET) > 0)
                        iterationET++;
                }
                else {
                    ininitalHeightET = $('.autogrow-textarea-mirrorET').height();
                    currentHeightET = ininitalHeightET;
                    if (currentHeightET != null && currentHeightET != undefined && parseInt(currentHeightET) > 0)
                        iterationET++;
                }
            }
            else {
                if (parseInt($('.autogrow-textarea-mirrorET').height() % ininitalHeightET) != 0)
                    currentHeightET = parseInt($('.autogrow-textarea-mirrorET').height() + 1);
                else
                    currentHeightET = $('.autogrow-textarea-mirrorET').height();
            }
        }
        //currentRowET = Math.floor(currentHeightET / ininitalHeightET);
        // Modified by nasurudeen on 29-12-2015 Line count new function.
        if (strEvent == "")
            currentRowET = $('#divEntertainmentPreview').getLines();


        if ($('#SglAdCompose_txt_EnglishMulti_ET_Address').html().trim().replaceAll('<br>', '') == "" &&
            //$('#SglAdCompose_txt_EnglishMulti_ET').html().trim().replaceAll('<br>', '') == "") {
            $('#SglAdCompose_txt_EnglishMulti_ET').val().trim().replaceAll('<br>', '') == "") {
            currentRowET = 0;
        }
        $('#lblLnCntMulti_ET').text(currentRowET.toString());
    }
    if (parseInt($('#lblLnCntMulti_ET').text()) > 30) {     //for if line count is grater than 30 then remove the save to pdf   
        $('#btnSavetoPdf').css({ display: "none" });
        gstrJcnNumber = "";
    }
    else {
        $('#btnSavetoPdf').css({ display: "none" });
    }
    sendContentToMirrorET($('#divEntertainmentPreview'));
}

function GetPreviewET() {
    var strName = "";
    var strAddress = "";
    var strContact = "";
    var strMainContent = "";
    var sendContentToMirrorETHeading = function (vv) {
        $('.autogrow-textarea-mirrorETHeading').html(vv);
        //calculateRowNumberET();
        if (iterationETHeading === 0) {
            ininitalHeightETHeading = $('.autogrow-textarea-mirrorETHeading').height();
            currentHeightETHeading = ininitalHeightETHeading;
            if (currentHeightETHeading != null && currentHeightETHeading != undefined && parseInt(currentHeightETHeading) > 0)
                iterationETHeading++;
            //if (TmpInitheightET > 0) {
            //    ininitalHeightET = TmpInitheightET;
            //    currentHeightET = $$('.autogrow-textarea-mirrorET').height();
            //}
        }
        else {
            if (parseInt($('.autogrow-textarea-mirrorETHeading').height() % ininitalHeightETHeading) != 0)
                currentHeightETHeading = parseInt($('.autogrow-textarea-mirrorETHeading').height() + 1);
            else
                currentHeightETHeading = $('.autogrow-textarea-mirrorETHeading').height();
        }
        //if (iterationET === 0 && blnEditFlag == true) {
        //    if ($('#lblmirrorETHeading').text().trim() > 0) {
        //        ininitalHeightET = ($('.autogrow-textarea-mirrorETHeading').height()) / (parseInt($('#THlblLnCnt').text()));
        //        currentHeightET = $('.autogrow-textarea-mirrorETHeading').height();
        //        iterationET++;
        //    }
        //    else {
        //        ininitalHeightET = $('.autogrow-textarea-mirrorETHeading').height();
        //        currentHeightET = ininitalHeightET;
        //        iterationET++;
        //    }
        //}
        //else {
        //}
        currentRowETHeading = Math.floor(currentHeightETHeading / ininitalHeightETHeading);
        $('#lblmirrorETHeading').text(currentRowETHeading.toString());
    }
    //if ($('#txtETName').val().trim() != "")
    //    strName = "<span class='EntertainmaneNameAdd'><strong>" + ReplaceBreakSpace($('#txtETName').val().trim()) + "</strong></span></br>";
    if ($('#SglAdCompose_txt_English_ET_Address').val().trim() != "")
        strAddress = "<span class='EntertainmaneNameAdd'><p lang='en' class='auto'>" + ReplaceNewLineToBreak(ReplaceBreakSpace($('#SglAdCompose_txt_English_ET_Address').val().trim())) + "</p></span>";
    //if ($('#txtETContanctNo').val().trim() != "")
    //    strContact = "<span class='EntertainmaneNameAdd'><strong>" + ReplaceBreakSpace($('#txtETContanctNo').val().trim()) + "</strong></span></br>";

    //if ($('#SglAdCompose_txt_English_ET').html().trim().replaceAll('<br>', '') != "")
    //    strMainContent = "<span class='EntertainmaneBody'>" + ReplaceNewLineToParaClosing(ReplaceForEntertainmentTabKey(ReplaceBreakSpace($('#SglAdCompose_txt_English_ET').html())).replaceAll("<p>", "")) + "</span>";
    //commented above 2 line & added below 2 line on 12122015 - changed in 'div' to 'textarea'
    if ($('#SglAdCompose_txt_English_ET').val().trim().replaceAll('<br>', '') != "")
        strMainContent = "<span class='EntertainmaneBody'><p lang='en' class='auto'>" + ReplaceNewLineToBreak(ReplaceBreakSpace($('#SglAdCompose_txt_English_ET').val())) + "</p></span>";
    $('#divEntertainmentPreview').html(strName + strAddress + strContact + strMainContent);
    gStrETContent = strName + strAddress + strContact + strMainContent.trim();
    sendContentToMirrorETHeading(strName + strAddress + strContact);
}

function GetPreviewET_Multi() {
    var strName = "";
    var strAddress = "";
    var strContact = "";
    var strMainContent = "";
    var sendContentToMirrorETHeading = function (vv) {
        $('.autogrow-textarea-mirrorETHeading').html(vv);
        //calculateRowNumberET();
        if (iterationETHeading === 0) {
            ininitalHeightETHeading = $('.autogrow-textarea-mirrorETHeading').height();
            currentHeightETHeading = ininitalHeightETHeading;
            if (currentHeightETHeading != null && currentHeightETHeading != undefined && parseInt(currentHeightETHeading) > 0)
                iterationETHeading++;
        }
        else {
            if (parseInt($('.autogrow-textarea-mirrorETHeading').height() % ininitalHeightETHeading) != 0)
                currentHeightETHeading = parseInt($('.autogrow-textarea-mirrorETHeading').height() + 1);
            else
                currentHeightETHeading = $('.autogrow-textarea-mirrorETHeading').height();
        }
        currentRowETHeading = Math.floor(currentHeightETHeading / ininitalHeightETHeading);
        $('#lblmirrorETHeading').text(currentRowETHeading.toString());
    }
    //if ($('#txtETName').val().trim() != "")
    //    strName = "<span class='EntertainmaneNameAdd'><strong>" + ReplaceBreakSpace($('#txtETName').val().trim()) + "</strong></span></br>";
    if ($('#SglAdCompose_txt_EnglishMulti_ET_Address').val().trim() != "")
        strAddress = "<span class='EntertainmaneNameAdd'><p lang='en' class='auto'>" + ReplaceNewLineToBreak(ReplaceBreakSpace($('#SglAdCompose_txt_EnglishMulti_ET_Address').val().trim())) + "</p></span>";
    //if ($('#txtETContanctNo').val().trim() != "")
    //    strContact = "<span class='EntertainmaneNameAdd'><strong>" + ReplaceBreakSpace($('#txtETContanctNo').val().trim()) + "</strong></span></br>";
    //if ($('#SglAdCompose_txt_EnglishMulti_ET').html().trim().replaceAll('<br>', '') != "") {
    if ($('#SglAdCompose_txt_EnglishMulti_ET').val().trim().replaceAll('<br>', '') != "") {
        //strMainContent = "<span class='EntertainmaneBody'>" + ReplaceForEntertainmentTabKey(ReplaceBreakSpace($('#SglAdCompose_txt_EnglishMulti_ET').html())) + "</span>";
        //strMainContent = "<span class='EntertainmaneBody'>" + ReplaceNewLineToParaClosing(ReplaceForEntertainmentTabKey(ReplaceBreakSpace($('#SglAdCompose_txt_EnglishMulti_ET').html())).replaceAll("<p>", "")) + "</span>";
        strMainContent = "<span class='EntertainmaneBody'><p lang='en' class='auto'>" + ReplaceNewLineToParaClosing(ReplaceForEntertainmentTabKey(ReplaceBreakSpace($('#SglAdCompose_txt_EnglishMulti_ET').val())).replaceAll("<p>", "")) + "</p></span>";
    }
    $('#divEntertainmentPreview').html(strName + strAddress + strContact + strMainContent);
    gStrETContent = strName + strAddress + strContact + strMainContent.trim();
    sendContentToMirrorETHeading(strName + strAddress + strContact);
}

function GetEntertainmentLineCalc(strEvent) {
    GetLnCntTHforET();//GetET_Content();
    var sendContentToMirrorET = function (textareaET) {
        $('.autogrow-textarea-mirrorET').html($(textareaET).html());
        //for initial height if Copy past function.
        if (iterationET === 0 && blnEditFlag != true && strEvent != "" && $(textareaET).html() == "") {
            if (strEvent == "body")
                $('.autogrow-textarea-mirrorET').html("<span class='EntertainmaneBody'><p lang='en' class='auto'>" + ReplaceForEntertainmentTabKey(ReplaceBreakSpace("S")) + "</p></span>");
            else
                $('.autogrow-textarea-mirrorET').html("<span class='EntertainmaneNameAdd'><p lang='en' class='auto'>" + ReplaceBreakSpace("S") + "</p></span>");
        }
        calculateRowNumberET();
    }
    var calculateRowNumberET = function (pEveCurrId) {
        if (iterationET === 0 && blnEditFlag != true) {
            ininitalHeightET = $('.autogrow-textarea-mirrorET').height();
            currentHeightET = ininitalHeightET;
            if (currentHeightET != null && currentHeightET != undefined && parseInt(currentHeightET) > 0)
                iterationET++;
            //if (TmpInitheightET > 0) {
            //    ininitalHeightET = TmpInitheightET;
            //    currentHeightET = $$('.autogrow-textarea-mirrorET').height();
            //}
        }
        else
            if (iterationET === 0 && blnEditFlag == true) {
                if ($('#lblLnCntSingle_ET').text().trim() > 0) {
                    ininitalHeightET = ($('.autogrow-textarea-mirrorET').height()) / (parseInt($('#lblLnCntSingle_ET').text()));
                    currentHeightET = $('.autogrow-textarea-mirrorET').height();
                    if (currentHeightET != null && currentHeightET != undefined && parseInt(currentHeightET) > 0)
                        iterationET++;
                }
                else {
                    ininitalHeightET = $('.autogrow-textarea-mirrorET').height();
                    currentHeightET = ininitalHeightET;
                    if (currentHeightET != null && currentHeightET != undefined && parseInt(currentHeightET) > 0)
                        iterationET++;
                }
            }
            else {
                if (parseInt($('.autogrow-textarea-mirrorET').height() % ininitalHeightET) != 0)
                    currentHeightET = parseInt($('.autogrow-textarea-mirrorET').height() + 1);
                else
                    currentHeightET = $('.autogrow-textarea-mirrorET').height();
            }
        //currentRowET = Math.floor(currentHeightET / ininitalHeightET);
        // Modified by nasurudeen on 29-12-2015 Line count new function.
        if (strEvent == "")
            currentRowET = $('#divEntertainmentPreview').getLines();
        try {
            if (($('#SglAdCompose_txt_English_ET_Address').html().trim().replaceAll('<br>', '') == "" && $('#SglAdCompose_txt_English_ET_Address').val().trim() == "") &&
                ($('#SglAdCompose_txt_English_ET').html().trim().replaceAll('<br>', '') == "" && $('#SglAdCompose_txt_English_ET').val().trim() == "")) {
                currentRowET = 0;
            }
        } catch (e) { currentRowET = 0; }
        //if (currentRowET > 0)
        $('#lblLnCntSingle_ET').text(currentRowET.toString());
    }
    if (parseInt($('#lblLnCntSingle_ET').text()) > 30) {     //for if line count is grater than 30 then remove the save to pdf   
        $('#btnSavetoPdf').css({ display: "none" });
        gstrJcnNumber = "";
    }
    else {
        $('#btnSavetoPdf').css({ display: "none" });
    }
    sendContentToMirrorET($('#divEntertainmentPreview'));
}

function GetEntertainmentLineCalc_Multi(strEvent) {
    GetLnCntTHforET_Multi();//GetET_Content_Multi();
    var sendContentToMirrorET = function (textareaET) {
        $('.autogrow-textarea-mirrorET').html($(textareaET).html());
        //for initial height if Copy past function.
        if (iterationET === 0 && blnEditFlag != true && strEvent != "" && $(textareaET).html() == "") {
            if (strEvent == "body")
                $('.autogrow-textarea-mirrorET').html("<span class='EntertainmaneBody'><p lang='en' class='auto'>" + ReplaceForEntertainmentTabKey(ReplaceBreakSpace("S")) + "</p></span>");
            else
                $('.autogrow-textarea-mirrorET').html("<span class='EntertainmaneNameAdd'><p lang='en' class='auto'>" + ReplaceBreakSpace("S") + "</p></span>");
        }
        calculateRowNumberET();
    }
    var calculateRowNumberET = function (pEveCurrId) {
        if (iterationET === 0 && blnEditFlag != true) {
            ininitalHeightET = $('.autogrow-textarea-mirrorET').height();
            currentHeightET = ininitalHeightET;
            if (currentHeightET != null && currentHeightET != undefined && parseInt(currentHeightET) > 0)
                iterationET++;
            //if (TmpInitheightET > 0) {
            //    ininitalHeightET = TmpInitheightET;
            //    currentHeightET = $$('.autogrow-textarea-mirrorET').height();
            //}
        }
        else
            if (iterationET === 0 && blnEditFlag == true) {
                if ($('#lblLnCntMulti_ET').text().trim() > 0) {
                    ininitalHeightET = ($('.autogrow-textarea-mirrorET').height()) / (parseInt($('#lblLnCntMulti_ET').text()));
                    currentHeightET = $('.autogrow-textarea-mirrorET').height();
                    if (currentHeightET != null && currentHeightET != undefined && parseInt(currentHeightET) > 0)
                        iterationET++;
                }
                else {
                    ininitalHeightET = $('.autogrow-textarea-mirrorET').height();
                    currentHeightET = ininitalHeightET;
                    if (currentHeightET != null && currentHeightET != undefined && parseInt(currentHeightET) > 0)
                        iterationET++;
                }
            }
            else {
                if (parseInt($('.autogrow-textarea-mirrorET').height() % ininitalHeightET) != 0)
                    currentHeightET = parseInt($('.autogrow-textarea-mirrorET').height() + 1);
                else
                    currentHeightET = $('.autogrow-textarea-mirrorET').height();
            }
        //currentRowET = Math.floor(currentHeightET / ininitalHeightET);
        // Modified by nasurudeen on 29-12-2015 Line count new function.
        if (strEvent == "")
            currentRowET = $('#divEntertainmentPreview').getLines();

        try {
            if (($('#SglAdCompose_txt_EnglishMulti_ET_Address').html().trim().replaceAll('<br>', '') == "" && $('#SglAdCompose_txt_EnglishMulti_ET_Address').val().trim() == "") &&
                //(($('#SglAdCompose_txt_EnglishMulti_ET').html().trim().replaceAll('<br>', '') == "" ||
                (($('#SglAdCompose_txt_EnglishMulti_ET').val().trim().replaceAll('<br>', '') == "" ||
                //$('#SglAdCompose_txt_EnglishMulti_ET').html() == "Enter Content"
                $('#SglAdCompose_txt_EnglishMulti_ET').val() == "Enter Content"
                ) && $('#SglAdCompose_txt_EnglishMulti_ET').val().trim() == "")
                ) {
                currentRowET = 0;
            }
        } catch (e) { currentRowET = 0; }
        if (currentRowET > 0)
            $('#lblLnCntMulti_ET').text(currentRowET.toString());
    }
    if (parseInt($('#lblLnCntMulti_ET').text()) > 30) {     //for if line count is grater than 30 then remove the save to pdf   
        $('#btnSavetoPdf').css({ display: "none" });
        gstrJcnNumber = "";
    }
    else {
        $('#btnSavetoPdf').css({ display: "none" });
    }
    sendContentToMirrorET($('#divEntertainmentPreview'));
}

function setEndOfContenteditable(contentEditableElement) {
    var range, selection;
    if (document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if (document.selection)//IE 8 and lower
    {
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}

function ReplaceForEntertainmentTabKey(strVal) {
    strVal = strVal.replaceAll("<blockquote style=\"margin-right: 0px;\" dir=\"ltr\"><p><br></p></blockquote>", "").replaceAll("<blockquote style=\"margin-right: 0px;\" dir=\"ltr\"><p>", "").replaceAll("</p></blockquote>", "").replaceAll("<blockquote>", "").replaceAll("</blockquote>", "").replaceAll("<blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\">", "").replaceAll("<<pseudo:before>></<pseudo:before>>", "").replaceAll("<<pseudo:after>></<pseudo:after>>", "");
    return strVal;
}

function ReplaceBreakSpace(strVal) {
    strVal = strVal.replaceAll("&nbsp;", "").replaceAll("&ensp;", "").replaceAll("&#8194;", "").replaceAll("&#8195;", "").replaceAll("&emsp;", "").replaceAll("&#8196;", "").replaceAll("&#8197;", "").replaceAll("&#8198;", "").replaceAll("&#8199;", "").replaceAll("&#8200;", "").replaceAll("&#8201;", "").replaceAll("&#8202;", "");
    return strVal;
}

function ReplaceNewLineToBreak(strVal) {
    strVal = strVal.replaceAll("\n", "<br/>");
    return strVal;
}

function ReplaceNewLineToParaClosing(strVal) {
    var strValTemp = strVal.replaceAll("\n", "<br/>").replaceAll("<br>", "<br/>"); var strResTemp = "";
    if (strVal.substring(0, 4) == "<br>")
        strValTemp = strVal.substring(4, strVal.length);
    else if (strVal.substring(0, 5) == "<br/>")
        strValTemp = strVal.substring(5, strVal.length);
    else if (strVal.substring(0, 3) == "<p>")
        strValTemp = strVal.substring(3, strVal.length);
    $.each(strValTemp.split('</p>'), function (iii, vvv) {
        if (strResTemp != "" && vvv != "<br/>" && vvv != "<br>") strResTemp += "<br/>";
        strResTemp += vvv;
    });
    strVal = strResTemp;
    return strVal;
}

function GetPreviewETCompose(strText) {
    try {
        strText = strText.replaceAll('"', "'")
    } catch (e) { }
    if (strText.split('</span>').length == 3) {
        var arr = strText.split('</span>');
        //strText = arr[0] + "</span><br>";
        strText = arr[0] + "</span>";
        strText += arr[1] + "</span>";
    }
    $("#divEnterPreviewAds").html('');
    $("#divEnterPreviewAds").html(strText);
}

function fnGetPreviewETCompose() {
    GetPreviewETCompose($("#divEntertainmentPreview").html());
}

function getCaretPosition(editableDiv, strpastText) {
    var caretPos = 0,
      sel, range;
    var strStartStr = "";
    strpastText = strpastText.replaceAll("\r\n\r\n", "<br>");

    var valTemp = ReplaceAllCharsOtherThanEnglish(strpastText);

    if (valTemp.trim() == "") { }
    else {
        $.alert.open("warning", "Please remove the following letters : '" + valTemp + "'");
        return "";
    }

    var strEndStr = "";
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            if (range.commonAncestorContainer.parentNode == editableDiv) {
                caretPos = range.endOffset;
            }
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        if (range.parentElement() == editableDiv) {
            var tempEl = document.createElement("span");
            editableDiv.insertBefore(tempEl, editableDiv.firstChild);
            var tempRange = range.duplicate();
            tempRange.moveToElementText(tempEl);
            tempRange.setEndPoint("EndToEnd", range);
            caretPos = tempRange.text.length;
        }
    }
    if (range != undefined) {
        if (editableDiv.value != undefined) {// && editableDiv.value != null && editableDiv.value.trim() != "") {
            strStartStr = editableDiv.value.substr(0, caretPos - 1);
            strEndStr = editableDiv.value.substr(caretPos, editableDiv.value.length - caretPos);
        }
        else {
            //strStartStr = range.commonAncestorContainer.textContent.substr(0, caretPos);
            //strEndStr = range.commonAncestorContainer.textContent.substr(caretPos + 1, range.commonAncestorContainer.textContent.length - caretPos);
            ////commented above 2 lines & added below 2 lines on 17112015
            strStartStr = range.commonAncestorContainer.textContent.substr(0, caretPos - 1);
            strEndStr = range.commonAncestorContainer.textContent.substr(caretPos, range.commonAncestorContainer.textContent.length - caretPos);
            //added below try catch on 10122015 - In firefox - 'range.commonAncestorContainer.textContent' value is empty
            try {
                if (range.commonAncestorContainer.textContent == "" || range.commonAncestorContainer.textContent == null || range.commonAncestorContainer.textContent == undefined) {
                    strStartStr = range.commonAncestorContainer.value.substr(0, caretPos - 1);
                    strEndStr = range.commonAncestorContainer.value.substr(caretPos, range.commonAncestorContainer.value.length - caretPos);
                }
            } catch (e) { }
        }
    }
    else {
        var divText = editableDiv.innerHTML;
        strStartStr = divText.toString().substring(0, editableDiv.selectionStart);
        strEndStr = divText.toString().substring(editableDiv.selectionEnd, (divText.toString().length));
    }
    return strStartStr + strpastText + strEndStr;
}

//need to use if require while copy paste functions
function cleanWordPaste(in_word_text) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = in_word_text;
    var newString = tmp.textContent || tmp.innerText;
    // this next piece converts line breaks into break tags
    // and removes the seemingly endless crap code
    newString = newString.replace(/\n\n/g, "<br />").replace(/.*<!--.*-->/g, "");
    // this next piece removes any break tags (up to 10) at beginning
    for (i = 0; i < 10; i++) {
        if (newString.substr(0, 6) == "<br />") {
            newString = newString.replace("<br />", "");
        }
    }
    return newString;
}

function handlepaste(elem, e) {
    var savedcontent = elem.innerHTML;
    if (e && e.clipboardData && e.clipboardData.getData) {// Webkit - get data from clipboard, put into editdiv, cleanup, then cancel event
        if (/text\/html/.test(e.clipboardData.types)) {
            elem.innerHTML = e.clipboardData.getData('text/html');
        }
        else if (/text\/plain/.test(e.clipboardData.types)) {
            elem.innerHTML = e.clipboardData.getData('text/plain');
        }
        else {
            elem.innerHTML = "";
        }
        waitforpastedata(elem, savedcontent);
        if (e.preventDefault) {
            e.stopPropagation();
            e.preventDefault();
        }
        return false;
    }
    else {// Everything else - empty editdiv and allow browser to paste content into it, then cleanup
        elem.innerHTML = "";
        waitforpastedata(elem, savedcontent);
        return true;
    }
}

function waitforpastedata(elem, savedcontent) {
    if (elem.childNodes && elem.childNodes.length > 0) {
        processpaste(elem, savedcontent);
    }
    else {
        that = {
            e: elem,
            s: savedcontent
        }
        that.callself = function () {
            waitforpastedata(that.e, that.s)
        }
        setTimeout(that.callself, 20);
    }
}

function processpaste(elem, savedcontent) {
    pasteddata = elem.innerHTML;
    //^^Alternatively loop through dom (elem.childNodes or elem.getElementsByTagName) here

    elem.innerHTML = savedcontent;

    // Do whatever with gathered data;
    alert(pasteddata);
}
//--need to use if require while copy paste functions

function ReInitialiseVals() {
    //ininitalHeightET = 0; currentRowET = 0; iterationET = 0;
    //ininitalHeightETHeading = 0; currentRowETHeading = 0; iterationETHeading = 0;
    ininitalHeightET, currentRowET, iterationET = 0; editedLnCnt = 0;
    ininitalHeightETHeading, currentRowETHeading, iterationETHeading = 0;
    $('#divEntertainmentPreview').trackRowsET();
}

//added on 10122015 - restrict other languages while pasting
function ReplaceAllCharsOtherThanEnglish(strValPastedTemp) {
    var valTemp = strValPastedTemp;
    //ASCII printable characters
    //valTemp = valTemp.replaceAll(" ", "");
    valTemp = valTemp.replaceAll("~", "");
    valTemp = valTemp.replaceAll("^", "");
    valTemp = valTemp.replaceAll("|", "");
    valTemp = valTemp.replaceAll("!", "");
    valTemp = valTemp.replaceAll('"', "");
    valTemp = valTemp.replaceAll("#", "");
    valTemp = valTemp.replaceAll("$", "");
    valTemp = valTemp.replaceAll("%", "");
    valTemp = valTemp.replaceAll("&", "");
    valTemp = valTemp.replaceAll("'", "");
    valTemp = valTemp.replaceAll("(", "");
    valTemp = valTemp.replaceAll(")", "");
    valTemp = valTemp.replaceAll("*", "");
    valTemp = valTemp.replaceAll("+", "");
    valTemp = valTemp.replaceAll(",", "");
    valTemp = valTemp.replaceAll("-", "");
    valTemp = valTemp.replaceAll(".", "");
    valTemp = valTemp.replaceAll("/", "");
    valTemp = valTemp.replaceAll("0", "");
    valTemp = valTemp.replaceAll("1", "");
    valTemp = valTemp.replaceAll("2", "");
    valTemp = valTemp.replaceAll("3", "");
    valTemp = valTemp.replaceAll("4", "");
    valTemp = valTemp.replaceAll("5", "");
    valTemp = valTemp.replaceAll("6", "");
    valTemp = valTemp.replaceAll("7", "");
    valTemp = valTemp.replaceAll("8", "");
    valTemp = valTemp.replaceAll("9", "");
    valTemp = valTemp.replaceAll(":", "");
    valTemp = valTemp.replaceAll(";", "");
    valTemp = valTemp.replaceAll("<", "");
    valTemp = valTemp.replaceAll("=", "");
    valTemp = valTemp.replaceAll(">", "");
    valTemp = valTemp.replaceAll("?", "");
    valTemp = valTemp.replaceAll("@", "");
    valTemp = valTemp.replaceAll("A", "");
    valTemp = valTemp.replaceAll("B", "");
    valTemp = valTemp.replaceAll("C", "");
    valTemp = valTemp.replaceAll("D", "");
    valTemp = valTemp.replaceAll("E", "");
    valTemp = valTemp.replaceAll("F", "");
    valTemp = valTemp.replaceAll("G", "");
    valTemp = valTemp.replaceAll("H", "");
    valTemp = valTemp.replaceAll("I", "");
    valTemp = valTemp.replaceAll("J", "");
    valTemp = valTemp.replaceAll("K", "");
    valTemp = valTemp.replaceAll("L", "");
    valTemp = valTemp.replaceAll("M", "");
    valTemp = valTemp.replaceAll("N", "");
    valTemp = valTemp.replaceAll("O", "");
    valTemp = valTemp.replaceAll("P", "");
    valTemp = valTemp.replaceAll("Q", "");
    valTemp = valTemp.replaceAll("R", "");
    valTemp = valTemp.replaceAll("S", "");
    valTemp = valTemp.replaceAll("T", "");
    valTemp = valTemp.replaceAll("U", "");
    valTemp = valTemp.replaceAll("V", "");
    valTemp = valTemp.replaceAll("W", "");
    valTemp = valTemp.replaceAll("X", "");
    valTemp = valTemp.replaceAll("Y", "");
    valTemp = valTemp.replaceAll("Z", "");
    valTemp = valTemp.replaceAll("[", "");
    valTemp = valTemp.replaceAll("\\", "");
    valTemp = valTemp.replaceAll("]", "");
    valTemp = valTemp.replaceAll("^", "");
    valTemp = valTemp.replaceAll("_", "");
    valTemp = valTemp.replaceAll("`", "");
    valTemp = valTemp.replaceAll("a", "");
    valTemp = valTemp.replaceAll("b", "");
    valTemp = valTemp.replaceAll("c", "");
    valTemp = valTemp.replaceAll("d", "");
    valTemp = valTemp.replaceAll("e", "");
    valTemp = valTemp.replaceAll("f", "");
    valTemp = valTemp.replaceAll("g", "");
    valTemp = valTemp.replaceAll("h", "");
    valTemp = valTemp.replaceAll("i", "");
    valTemp = valTemp.replaceAll("j", "");
    valTemp = valTemp.replaceAll("k", "");
    valTemp = valTemp.replaceAll("l", "");
    valTemp = valTemp.replaceAll("m", "");
    valTemp = valTemp.replaceAll("n", "");
    valTemp = valTemp.replaceAll("o", "");
    valTemp = valTemp.replaceAll("p", "");
    valTemp = valTemp.replaceAll("q", "");
    valTemp = valTemp.replaceAll("r", "");
    valTemp = valTemp.replaceAll("s", "");
    valTemp = valTemp.replaceAll("t", "");
    valTemp = valTemp.replaceAll("u", "");
    valTemp = valTemp.replaceAll("v", "");
    valTemp = valTemp.replaceAll("w", "");
    valTemp = valTemp.replaceAll("x", "");
    valTemp = valTemp.replaceAll("y", "");
    valTemp = valTemp.replaceAll("z", "");
    valTemp = valTemp.replaceAll("{", "");
    valTemp = valTemp.replaceAll("|", "");
    valTemp = valTemp.replaceAll("}", "");
    valTemp = valTemp.replaceAll("~", "");
    //Extended ASCII characters
    valTemp = valTemp.replaceAll("Ç", "");
    valTemp = valTemp.replaceAll("ü", "");
    valTemp = valTemp.replaceAll("é", "");
    valTemp = valTemp.replaceAll("â", "");
    valTemp = valTemp.replaceAll("ä", "");
    valTemp = valTemp.replaceAll("à", "");
    valTemp = valTemp.replaceAll("å", "");
    valTemp = valTemp.replaceAll("ç", "");
    valTemp = valTemp.replaceAll("ê", "");
    valTemp = valTemp.replaceAll("ë", "");
    valTemp = valTemp.replaceAll("è", "");
    valTemp = valTemp.replaceAll("ï", "");
    valTemp = valTemp.replaceAll("î", "");
    valTemp = valTemp.replaceAll("ì", "");
    valTemp = valTemp.replaceAll("Ä", "");
    valTemp = valTemp.replaceAll("Å", "");
    valTemp = valTemp.replaceAll("É", "");
    valTemp = valTemp.replaceAll("æ", "");
    valTemp = valTemp.replaceAll("Æ", "");
    valTemp = valTemp.replaceAll("ô", "");
    valTemp = valTemp.replaceAll("ö", "");
    valTemp = valTemp.replaceAll("ò", "");
    valTemp = valTemp.replaceAll("û", "");
    valTemp = valTemp.replaceAll("ù", "");
    valTemp = valTemp.replaceAll("ÿ", "");
    valTemp = valTemp.replaceAll("Ö", "");
    valTemp = valTemp.replaceAll("Ü", "");
    valTemp = valTemp.replaceAll("ø", "");
    valTemp = valTemp.replaceAll("£", "");
    valTemp = valTemp.replaceAll("Ø", "");
    valTemp = valTemp.replaceAll("×", "");
    valTemp = valTemp.replaceAll("ƒ", "");
    valTemp = valTemp.replaceAll("á", "");
    valTemp = valTemp.replaceAll("í", "");
    valTemp = valTemp.replaceAll("ó", "");
    valTemp = valTemp.replaceAll("ú", "");
    valTemp = valTemp.replaceAll("ñ", "");
    valTemp = valTemp.replaceAll("Ñ", "");
    valTemp = valTemp.replaceAll("ª", "");
    valTemp = valTemp.replaceAll("º", "");
    valTemp = valTemp.replaceAll("¿", "");
    valTemp = valTemp.replaceAll("®", "");
    valTemp = valTemp.replaceAll("¬", "");
    valTemp = valTemp.replaceAll("½", "");
    valTemp = valTemp.replaceAll("¼", "");
    valTemp = valTemp.replaceAll("¡", "");
    valTemp = valTemp.replaceAll("«", "");
    valTemp = valTemp.replaceAll("»", "");
    valTemp = valTemp.replaceAll("░", "");
    valTemp = valTemp.replaceAll("▒", "");
    valTemp = valTemp.replaceAll("▓", "");
    valTemp = valTemp.replaceAll("│", "");
    valTemp = valTemp.replaceAll("┤", "");
    valTemp = valTemp.replaceAll("Á", "");
    valTemp = valTemp.replaceAll("Â", "");
    valTemp = valTemp.replaceAll("À", "");
    valTemp = valTemp.replaceAll("©", "");
    valTemp = valTemp.replaceAll("╣", "");
    valTemp = valTemp.replaceAll("║", "");
    valTemp = valTemp.replaceAll("╗", "");
    valTemp = valTemp.replaceAll("╝", "");
    valTemp = valTemp.replaceAll("¢", "");
    valTemp = valTemp.replaceAll("¥", "");
    valTemp = valTemp.replaceAll("┐", "");
    valTemp = valTemp.replaceAll("└", "");
    valTemp = valTemp.replaceAll("┴", "");
    valTemp = valTemp.replaceAll("┬", "");
    valTemp = valTemp.replaceAll("├", "");
    valTemp = valTemp.replaceAll("─", "");
    valTemp = valTemp.replaceAll("┼", "");
    valTemp = valTemp.replaceAll("ã", "");
    valTemp = valTemp.replaceAll("Ã", "");
    valTemp = valTemp.replaceAll("╚", "");
    valTemp = valTemp.replaceAll("╔", "");
    valTemp = valTemp.replaceAll("╩", "");
    valTemp = valTemp.replaceAll("╦", "");
    valTemp = valTemp.replaceAll("╠", "");
    valTemp = valTemp.replaceAll("═", "");
    valTemp = valTemp.replaceAll("╬", "");
    valTemp = valTemp.replaceAll("¤", "");
    valTemp = valTemp.replaceAll("ð", "");
    valTemp = valTemp.replaceAll("Ð", "");
    valTemp = valTemp.replaceAll("Ê", "");
    valTemp = valTemp.replaceAll("Ë", "");
    valTemp = valTemp.replaceAll("È", "");
    valTemp = valTemp.replaceAll("ı", "");
    valTemp = valTemp.replaceAll("Í", "");
    valTemp = valTemp.replaceAll("Î", "");
    valTemp = valTemp.replaceAll("Ï", "");
    valTemp = valTemp.replaceAll("┘", "");
    valTemp = valTemp.replaceAll("┌", "");
    valTemp = valTemp.replaceAll("█", "");
    valTemp = valTemp.replaceAll("▄", "");
    valTemp = valTemp.replaceAll("¦", "");
    valTemp = valTemp.replaceAll("Ì", "");
    valTemp = valTemp.replaceAll("▀", "");
    valTemp = valTemp.replaceAll("Ó", "");
    valTemp = valTemp.replaceAll("ß", "");
    valTemp = valTemp.replaceAll("Ô", "");
    valTemp = valTemp.replaceAll("Ò", "");
    valTemp = valTemp.replaceAll("õ", "");
    valTemp = valTemp.replaceAll("Õ", "");
    valTemp = valTemp.replaceAll("µ", "");
    valTemp = valTemp.replaceAll("þ", "");
    valTemp = valTemp.replaceAll("Þ", "");
    valTemp = valTemp.replaceAll("Ú", "");
    valTemp = valTemp.replaceAll("Û", "");
    valTemp = valTemp.replaceAll("Ù", "");
    valTemp = valTemp.replaceAll("ý", "");
    valTemp = valTemp.replaceAll("Ý", "");
    valTemp = valTemp.replaceAll("¯", "");
    valTemp = valTemp.replaceAll("´", "");
    valTemp = valTemp.replaceAll("≡", "");
    valTemp = valTemp.replaceAll("±", "");
    valTemp = valTemp.replaceAll("‗", "");
    valTemp = valTemp.replaceAll("¾", "");
    valTemp = valTemp.replaceAll("¶", "");
    valTemp = valTemp.replaceAll("§", "");
    valTemp = valTemp.replaceAll("÷", "");
    valTemp = valTemp.replaceAll("¸", "");
    valTemp = valTemp.replaceAll("°", "");
    valTemp = valTemp.replaceAll("¨", "");
    valTemp = valTemp.replaceAll("·", "");
    valTemp = valTemp.replaceAll("¹", "");
    valTemp = valTemp.replaceAll("³", "");
    valTemp = valTemp.replaceAll("²", "");
    valTemp = valTemp.replaceAll("■", "");
    valTemp = valTemp.replaceAll("&nbsp;", "");
    valTemp = valTemp.replaceAll('–', '');
    valTemp = valTemp.replaceAll("“", "");
    valTemp = valTemp.replaceAll("”", "");
    valTemp = valTemp.replaceAll("‘", "");
    valTemp = valTemp.replaceAll("’", "");
    return valTemp;
}

void function $getLines($) {
    function countLines($element) {
        var lines = 0;
        var greatestOffset = void 0;

        $element.find('character').each(function () {
            if (!greatestOffset || this.offsetTop > greatestOffset) {
                greatestOffset = this.offsetTop;
                ++lines;
            }
        });

        return lines;
    }

    $.fn.getLines = function $getLines() {
        var lines = 0;
        var clean = this;
        var dirty = this.clone();

        (function wrapCharacters(fragment) {
            var parent = fragment;

            $(fragment).contents().each(function () {
                if (this.nodeType === Node.ELEMENT_NODE) {
                    wrapCharacters(this);
                }
                else if (this.nodeType === Node.TEXT_NODE) {
                    void function replaceNode(text) {
                        var characters = document.createDocumentFragment();

                        text.nodeValue.replace(/[\s\S]/gm, function wrapCharacter(character) {
                            characters.appendChild($('<character>' + character + '</>')[0]);
                        });

                        parent.replaceChild(characters, text);
                    }(this);
                }
            });
        }(dirty[0]));

        clean.replaceWith(dirty);

        lines = countLines(dirty);

        dirty.replaceWith(clean);

        return lines;
    };
}(jQuery);

///******************************//
//End of Entertainment ad Process//
///******************************//