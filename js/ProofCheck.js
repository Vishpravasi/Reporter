//ValidateBkb_TabDtls
var struserid = "";
var strVal = "";
var strBranch = "";
var strcolor = "";
var strAdtype = "";
var strSubType = "";
var strAdStatus = "";
var BkgStatus = "";
var publn = "";
var product = "";
var edn = "";
var premium = "";
var bkgFrmDate = "";
var bkgToDate = "";
var IssueFrmDate = "";
var IssueToDate = "";
var prodfeature = "";
var FranName = "";
var chkAdvno = "";
var chkbkgno = "";
//
var lstAdsForValidation = [];
var strAgencyCode = "";
var lstAgencyCodes = [];
var strAgencyName = "";
var lstAgencyName = [];
var xml_strAdStatus = "";
var xml_strRegCnt = "";
var xml_strAdAmt = "";
var xml_strUserId = "";
var xml_strBookingNo = "";
var xml_strAdvNo = "";
var SuccessBkg = "";
var FailedBkg = "";
var SuccessCount = 0;
var FailedCount = 0;
var RoDocurl = gStrIpValPreview+"imgPreview/";
var lstColor = [];

var strRejectReasons = ""; var strSelectedRejectReason = "";
var lstPublnDtlsLocal = []; var lstProdDtlsLocal = [];
var lstSubtypeDtlsLocal = []; var lstEdnDtlsLocal = [];
var lstPFDtlsLocal = []; var lstFranchiseeDtlsLocal = [];

$(document).ready(function () {
    struserid = window.sessionStorage.strUserId;
    if (window.sessionStorage.strUserId == undefined || window.sessionStorage.strUserId == null || window.sessionStorage.strUserId.trim() == "" || window.sessionStorage.strUserId.trim() == "undefined" || window.sessionStorage.strUserId.trim() == "null") {
        window.sessionStorage.removeItem("strUserId");
        //  location.replace('http://thehinduads.com/B2B/index.html');
        location.replace(gStrIpVal + 'index.html');
        return;
    }

    jQuery(window).mouseout(function (e) {
        if (window.sessionStorage.strUserId == undefined || window.sessionStorage.strUserId == null || window.sessionStorage.strUserId.trim() == "" || window.sessionStorage.strUserId.trim() == "undefined" || window.sessionStorage.strUserId.trim() == "null") {
            window.sessionStorage.removeItem("strUserId");
            //location.replace('http://thehinduads.com/B2B/index.html');
            location.replace(gStrIpVal + 'index.html');
            return;
        }
    });

    GetAdRejectReasonsMaster(); GetAdTypes();
    Array.prototype.containsSubString = function (text) {
        for (var i = 0; i < this.length; ++i) {
            if (this[i].toString().indexOf(text) != -1)
                return i;
        }
        return -1;
    }
    Array.prototype.containsSubStringLst = function (text) {
        var lstSubString = [];
        lstSubString = [];
        for (var i = 0; i < this.length; ++i) {
            if (this[i].toString().indexOf(text) != -1) {
                lstSubString.push(i);
            }
        }
        return lstSubString;
    }

    GetColorMas();

    LoadAdBookingDtls();
    $("#Btn_Clear").trigger("click");
    $("#Btn_PayImmediate").click(function () {
        if ($("#txt_FranchiseeName").val() == "") {
            alert("Please select a Franchisee user");
            //$.alert.open('error', 'Please select a Franchisee user');
            return false;
        }
        else {
            LoadAdBookingDtls();
            window.location.href = "approval-reciept-details.html";
        }
    });
});

function GetColorMas() {
    $.ajax({
        // url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetColorMas",
        url: gStrIpVal + "HinduFranchiseeService.svc/GetColorMas",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        returnType: 'json',
        async: false,
        success: function (data) {
            lstColor = [];
            $.each(data.GetColormasResult, function (inn, vvl) {
                var strRGB = "";
                if (vvl.strColorCode == 'T1') {//blue
                    //strpalette += "#CCFFFF" + ",";
                    strRGB = "rgb(204, 255, 255)";
                }
                else if (vvl.strColorCode == 'T2') {//green
                    //strpalette += "#CCFFCC" + ",";
                    strRGB = "rgb(204, 255, 204)";
                }
                else if (vvl.strColorCode == 'T3') {//orange
                    //strpalette += "#FFCCCC" + ",";
                    strRGB = "rgb(255, 204, 204)";
                }
                else if (vvl.strColorCode == 'T4') {//yellow
                    //strpalette += "#FFFFCC" + ",";
                    strRGB = "rgb(255, 255, 204)";
                }
                else if (vvl.strColorCode == 'T5') {//pink
                    //strpalette += "#FFCCFF" + ",";
                    strRGB = "rgb(255, 204, 255)";
                }
                lstColor.push(vvl.strColorCode + '~' + vvl.strColorName + '~' + vvl.strColor + '~' + strRGB);
            });
        } //close for success fn
    });
}

function GetAdTypes() {
    $('#txt_AdType').get(0).options.length = 0;
    $('#txt_AdType').append("<option value=''>Select AdType</option>");
    $.ajax({
        // url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetAdtype",
        url: gStrIpVal + "HinduFranchiseeService.svc/GetAdtype",
        cache: false,
        type: "POST",
        contentType: "application/json",
        async: false,
        data: '',
        dataType: 'JSON',
        success: function (data) {
            var index1; strval = "";
            $.each(data.GetAdtypeResult, function (index1, value) {
                $("#txt_AdType").append("<option value=" + data.GetAdtypeResult[index1].strAdTypeCode + ">" + data.GetAdtypeResult[index1].strAdTypeDesc + "</option>");
            });
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}

function GetList() {
    strAdStatus = "D','B";
    var strTempBranch = $("#txt_BkgBranch").val();
    var strTempColor = $("#txt_Color").val();
    var strTempAdtype = $("#txt_AdType").val();
    var strTempSubType = $("#hdnSubType").val();
    var strTempPubln = $("#hdnPublnCode").val();
    var strTempProduct = $("#hdnProd").val();
    var strTempEdn = $("#hdnEdn").val();
    var strTempPremium = $("#txt_Premium").val();
    var strTempBkgFrmDate = $("#txt_BkgFrmDate").val();
    var strTempBkgToDate = $("#txt_BkgToDate").val();
    var strTempIssueFrmDate = $("#txt_InsertnFrmDate").val();
    var strTempIssueToDate = $("#txt_InsertnToDate").val();
    var strTempProdfeature = $("#hdnProdFeature").val();
    var strTempFranName = $("#hdnFranchiseeName").val();

    //var strTempBranch = $("#txt_BkgBranch").val();
    //var strTempColor = $("#txt_Color").val();
    //var strTempAdtype = $("#txt_AdType").val();
    //var strTempSubType = $("#txt_SubType").val();
    //var strTempPubln = $("#txt_publn").val();
    //var strTempProduct = $("#txt_Prod").val();
    //var strTempEdn = $("#txt_Edn").val();
    //var strTempPremium = $("#txt_Premium").val();
    //var strTempBkgFrmDate = $("#txt_BkgFrmDate").val();
    //var strTempBkgToDate = $("#txt_BkgToDate").val();
    //var strTempIssueFrmDate = $("#txt_InsertnFrmDate").val();
    //var strTempIssueToDate = $("#txt_InsertnToDate").val();
    //var strTempProdfeature = $("#txt_ProdFeature").val();
    //var strTempFranName = $("#txt_FranchiseeName").val();

    var strBkgStatusTemp = "";

    if ((window.sessionStorage.strUserGroupId == 'G021') || (window.sessionStorage.strUserGroupId == 'G024')) {
        strBkgStatusTemp = 'PAY IMMEDIATE';
    }
    else if (window.sessionStorage.strUserGroupId == 'G023') {
        strBkgStatusTemp = "PAY IMMEDIATE','ON CREDIT";
    }

    var strUomCode = ""; var strSubTypeCode = "";
    try {
        strUomCode = strTempSubType.split('~')[1];
    } catch (e) { }
    try {
        strSubTypeCode = strTempSubType.split('~')[0];
    } catch (e) { }
    if (strUomCode == undefined) strUomCode = "";
    lstAdsForValidation = [];
    $.ajax({
        // url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetValidateAdList",
        url: gStrIpVal + "HinduFranchiseeService.svc/GetValidateAdList",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: '{"strAdStatus": "' + strAdStatus + '","strBranch": "' + strTempBranch + '","strcolor": "' + strTempColor +
               '","strAdtype": "' + strTempAdtype + '","strSubType": "' + strSubTypeCode + '","publn": "' + strTempPubln +
               '","product": "' + strTempProduct + '","edn": "' + strTempEdn + '","premium": "' + strTempPremium +
               '","bkgFrmDate": "' + strTempBkgFrmDate + '","bkgToDate": "' + strTempBkgToDate + '","IssueFrmDate": "' +
               strTempIssueFrmDate + '","IssueToDate": "' + strTempIssueToDate + '","prodfeature": "' + strTempProdfeature +
               '","FranName": "' + strTempFranName + '","BkgStatus": "' + strBkgStatusTemp + '"}',
        datatype: 'json',
        async: false,
        success: function (data) {
            var index; strVal = "";
            lstAdsForValidation = data.GetValidateAdListResult;
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}

$("#Btn_Validate").click(function () {
    GetValidateAdsDtls();
});

function GetValidateAdsDtls() {
    lstAgencyCodes = [];
    $("#ValidateFn_AdTabDtl").empty();
    $("#validateAd").find('.checkbox').prop('checked', false);
    var curAgencyCode = "";
    var PreAgencyCode = "";
    var arr = [];
    var xx = "";
    SuccessBkg = "";
    FailedBkg = "";
    SuccessCount = 0;
    FailedCount = 0;
    strVal = "";
    $.each(lstAdsForValidation, function (index, value) {
        curAgencyCode = lstAdsForValidation[index].strAgencyCode;
        if (PreAgencyCode != curAgencyCode && PreAgencyCode == "") {
            lstAgencyCodes.push(lstAdsForValidation[index].strAgencyCode);
            lstAgencyName.push(lstAdsForValidation[index].strAgencyName);
            strAgencyCode = lstAdsForValidation[index].strAgencyCode;
            strAgencyName = lstAdsForValidation[index].strAgencyName;
            strVal += "<div class='row Agency" + lstAdsForValidation[index].strAgencyCode + "'><div class=col-lg-12 clearfix>";
            strVal += " <div class=col-lg-1><label for=coupon_question>";
            strVal += "<input id='" + lstAdsForValidation[index].strAppCnt + "' type=checkbox name=foo value=valid class=checkbox coupon_question></label>";
            strVal += "</div><div class=col-lg-11><table class=table>";
            strVal += "<tbody >";
            strVal += "<tr>";
            strVal += "<td></td>";
            strVal += "<td>";
            strVal += "<table width=100%>";
            strVal += "<tr>";
            strVal += "<td width=150>Booking Number   </td>";
            strVal += "<td width=180><input id='txt_BkgNo' readonly='readonly' value='" + lstAdsForValidation[index].strBookingno + "' type=text class=form-control placeholder=''></td>";
            strVal += "<td colspan=2 rowspan=2>";
            strVal += "<div>";
            strVal += "<table class=tblright>";
            strVal += "<tr>";
            strVal += "<td width=200>Clr / Subtype / Classification </td>";
            strVal += "<td> <textarea readonly='readonly' placeholder=''>" + lstAdsForValidation[index].strColor + "/" + lstAdsForValidation[index].strSubTypeDesc + "/";
            strVal += "/" + lstAdsForValidation[index].strClassificationCode + "</textarea></td>";
            strVal += "</tr></table></div></td></tr><tr>";
            strVal += "<td>AD Number  </td>";
            strVal += "<td> <textarea id='txt_AdvNo' readonly='readonly' placeholder=''>" + lstAdsForValidation[index].stradvno + "</textarea>";
            // strVal += "<td><input id='txt_AdvNo' type=text value='" + lstAdsForValidation[index].stradvno + "' class=form-control placeholder=''/>";
            // strVal += "<input id='txt_strAdStatus' type=text value='" + lstAdsForValidation[index].strAdStatus + "' class=form-control placeholder=''/>";
            strVal += "<input readonly='readonly' id='txt_strRegCnt' type=text value='" + lstAdsForValidation[index].strEditionCode + "' class=form-control placeholder=''/>";
            strVal += "<input readonly='readonly' id='txt_strAdAmt' type=text value='" + lstAdsForValidation[index].strAdAmt + "' class=form-control placeholder=''/>";
            strVal += "<input style='display:none;' readonly='readonly' id='txt_strUserId' type=text value='" + lstAdsForValidation[index].strUserId + "' class=form-control placeholder=''/><input readonly='readonly' id='' type=text value='" + lstAdsForValidation[index].strIssueDate + "' class=form-control placeholder=''/></td>";
            strVal += "<td>&nbsp;</td>";
            strVal += "</tr><tr><td>Classified Ref. No.  </td>";
            strVal += "<td><input type=text  readonly='readonly'  class=form-control placeholder=''></td>";
            strVal += "<td colspan=2><div><table class=tblleft><tr>";
            if (lstAdsForValidation[index].strUOMCode == "LN") {
                strVal += "<td width=100 id='txt_width'>Line Count</td>";
                strVal += "<td><input readonly='readonly' type=text class=form-control value='" + lstAdsForValidation[index].strLineCount + "' placeholder=''></td>";
                // strVal += "<td width=75><input type=text class=form-control placeholder></td>";
                strVal += "<td width=135 id='txt_Height'>Character Count</td>";
                strVal += "<td><input readonly='readonly' type=text value='" + lstAdsForValidation[index].strCharCount + "' class=form-control placeholder=''></td>";
            }
            else {
                strVal += "<td width=100 id='txt_width'>Height</td>";
                strVal += "<td><input readonly='readonly' type=text class=form-control value='" + lstAdsForValidation[index].strHeight + "' placeholder=''></td>";
                // strVal += "<td width=75><input type=text class=form-control placeholder></td>";
                strVal += "<td width=135 id='txt_Height'>Width</td>";
                strVal += "<td><input readonly='readonly' type=text value='" + lstAdsForValidation[index].strWidth + "' class=form-control placeholder=''></td>";
            }
            // strVal += "<td width=75><input type=text class=form-control placeholder=''></td>";
            strVal += "</tr></table></div></td><td></td></tr></table></td>";
            strVal += "</tr><tr><td></td><td colspan=2><div><table class=tblbtm><tr>";
            if (lstAdsForValidation[index].strUOMCode == "LN") {
                //strVal += "<td width=150>Classified text</td><td width=450><textarea readonly='readonly' class=form-controlNew>" + lstAdsForValidation[index].strAdvText + "</textarea></td>";
                strVal += "<td width=150>Classified text</td><td width=450>";
                strVal += "<table><tr>";
                if (lstAdsForValidation[index].strTickValue != undefined && lstAdsForValidation[index].strTickValue != null && lstAdsForValidation[index].strTickValue != "") {
                    strVal += "<td><img src='images/tick.jpg'/></td>";
                }
                strVal += "<td>";
                if (lstAdsForValidation[index].strBoldValue != undefined && lstAdsForValidation[index].strBoldValue != null && lstAdsForValidation[index].strBoldValue != "") {
                    strVal += "<b>";
                }
                strVal += "<textarea readonly='readonly' class=form-controlNew style='width: 450px;";
                if (lstAdsForValidation[index].strColorCode != undefined && lstAdsForValidation[index].strColorCode != null && lstAdsForValidation[index].strColorCode != "") {
                    strVal += "background-color:";
                    var clrCode = lstAdsForValidation[index].strColorCode;
                    $.each(lstColor, function (indClr, valClr) {
                        try {
                            if (valClr.split('~')[0] == clrCode) {
                                strVal += valClr.split('~')[3] + "; ";
                                return;
                            }
                        } catch (e) { }
                    });
                }
                strVal += "'>" + lstAdsForValidation[index].strAdvText + "</textarea>";
                if (lstAdsForValidation[index].strBoldValue != undefined && lstAdsForValidation[index].strBoldValue != null && lstAdsForValidation[index].strBoldValue != "") {
                    strVal += "</b>";
                }
                strVal += "</td></tr></table>";
                strVal += "</td>";
            }
            else {
                strVal += "<td width=150>JCN No. </td><td width=450><div style='overflow-y:scroll;max-height:60px;max-width:220px'>";
                arr = [];
                xx = "";
                // xx = "F0#BE3CHEN5000001042#,F0#BE3CHEN5000001041#,F0#BE3CHEN5000001044#,F0#BE3CHEN5000001042#,F0#BE3CHEN5000001041#,F0#BE3CHEN5000001044#,F0#BE3CHEN5000001042#,F0#BE3CHEN5000001041#,F0#BE3CHEN5000001044#";
                xx = lstAdsForValidation[index].strJcnNo;
                arr = (xx.split(","));
                $.each(arr, function (ind, value) {
                    strVal += "<a target='_blank' href='" + RoDocurl + arr[ind].replace("#", "%23").replace("#", "%23").split('.')[0] + ".jpg'" + "'>" + arr[ind] + ".jpg" + "</a></br>";
                });
                strVal += "</div></td>";
            }
            strVal += "<td width=268><textarea class=txtwidth answer placeholder='' readonly='readonly' >" + lstAdsForValidation[index].strMaterialStatus + "</textarea></td></tr></table></div></td></tr>";
            //<div><button class='btn btn-default' data-toggle='modal' data-backdrop='static' data-keyboard='false' id='" + lstAdsForValidation[index].strBookingno + "' onclick='PreviewImg(this.id)' data-target='#bulkView'>View RO</button></div>
            strVal += "</tbody></table><div><button class='btn btn-default' data-toggle='modal' data-backdrop='static' data-keyboard='false' id='" + lstAdsForValidation[index].strBookingno + "' onclick='PreviewImg(this.id)' data-target='#bulkView'>View RO</button></div></div></div></div>";
            $("#ValidateFn_AdTabDtl").append(strVal);
            if (lstAdsForValidation[index].strUOMCode != "LN") {
                $("#ValidateFn_AdTabDtl").find("div.row:last").find("table").find("#txt_width").text("Height");
                $("#ValidateFn_AdTabDtl").find("div.row:last").find("table").find("#txt_Height").text("Width");
            }
            else {
                $("#ValidateFn_AdTabDtl").find("div.row:last").find("table").find("#txt_width").text("Line Count");
                $("#ValidateFn_AdTabDtl").find("div.row:last").find("table").find("#txt_Height").text("Character Count");
            }
        }
        else if (PreAgencyCode == curAgencyCode && PreAgencyCode != "") {
            strVal += "<div class='row Agency" + lstAdsForValidation[index].strAgencyCode + "'><div class=col-lg-12 clearfix>";
            strVal += " <div class=col-lg-1><label for=coupon_question>";
            strVal += "<input type=checkbox id='" + lstAdsForValidation[index].strAppCnt + "' name=foo value=valid class=checkbox coupon_question></label>";
            strVal += "</div><div class=col-lg-11><table class=table>";
            strVal += "<tbody >";
            strVal += "<tr>";
            strVal += "<td></td>";
            strVal += "<td>";
            strVal += "<table width=100%>";
            strVal += "<tr>";
            strVal += "<td width=150>Booking Number   </td>";
            strVal += "<td width=180><input readonly='readonly' id='txt_BkgNo' value='" + lstAdsForValidation[index].strBookingno + "' type=text class=form-control placeholder=''></td>";
            strVal += "<td colspan=2 rowspan=2>";
            strVal += "<div>";
            strVal += "<table class=tblright>";
            strVal += "<tr>";
            strVal += "<td width=200>Clr / Subtype / Classification </td>";
            strVal += "<td> <textarea readonly='readonly' placeholder=''>" + lstAdsForValidation[index].strColor + "/" + lstAdsForValidation[index].strSubTypeDesc + "/";
            strVal += "/" + lstAdsForValidation[index].strClassificationCode + "</textarea></td>";
            strVal += "</tr></table></div></td></tr><tr>";
            strVal += "<td>AD Number  </td>";
            strVal += "<td> <textarea id='txt_AdvNo' placeholder=''>" + lstAdsForValidation[index].stradvno + "</textarea>";
            // strVal += "<td><input id='txt_AdvNo' type=text value='" + lstAdsForValidation[index].stradvno + "' class=form-control placeholder=''/>";
            // strVal += "<input id='txt_strAdStatus' type=text value='" + lstAdsForValidation[index].strAdStatus + "' class=form-control placeholder=''/>";
            strVal += "<input readonly='readonly' id='txt_strRegCnt' type=text value='" + lstAdsForValidation[index].strEditionCode + "' class=form-control placeholder=''/>";
            strVal += "<input readonly='readonly' id='txt_strAdAmt' type=text value='" + lstAdsForValidation[index].strAdAmt + "' class=form-control placeholder=''/>";
            //strVal += "<input readonly='readonly' id='txt_strUserId' type=text value='" + lstAdsForValidation[index].strIssueDate + "' class=form-control placeholder=''/></td>";
            strVal += "<input style='display:none;' readonly='readonly' id='txt_strUserId' type=text value='" + lstAdsForValidation[index].strUserId + "' class=form-control placeholder=''/><input readonly='readonly' id='' type=text value='" + lstAdsForValidation[index].strIssueDate + "' class=form-control placeholder=''/></td>";
            strVal += "<td>&nbsp;</td>";
            strVal += "</tr><tr><td>Classified Ref. No.  </td>";
            strVal += "<td><input type=text  readonly='readonly'  class=form-control placeholder=''></td>";
            strVal += "<td colspan=2><div><table class=tblleft><tr>";
            if (lstAdsForValidation[index].strUOMCode == "LN") {
                strVal += "<td width=100 id='txt_width'>Line Count</td>";
                strVal += "<td><input type=text readonly='readonly' class=form-control value='" + lstAdsForValidation[index].strLineCount + "' placeholder=''></td>";
                //  strVal += "<td width=75><input type=text class=form-control placeholder></td>";
                strVal += "<td width=135 id='txt_Height'>Character Count</td>";
                strVal += "<td><input readonly='readonly' type=text value='" + lstAdsForValidation[index].strCharCount + "' class=form-control placeholder=''></td>";
            }
            else {
                strVal += "<td width=100 id='txt_width'>Height</td>";
                strVal += "<td><input readonly='readonly' type=text class=form-control value='" + lstAdsForValidation[index].strHeight + "' placeholder=''></td>";
                // strVal += "<td width=75><input type=text class=form-control placeholder></td>";
                strVal += "<td width=135 id='txt_Height'>Width</td>";
                strVal += "<td><input readonly='readonly' type=text value='" + lstAdsForValidation[index].strWidth + "' class=form-control placeholder=''></td>";
            }
            // strVal += "<td width=75><input type=text class=form-control placeholder=''></td>";
            strVal += "</tr></table></div></td><td></td></tr></table></td>";
            strVal += "</tr><tr><td></td><td colspan=2><div><table class=tblbtm><tr>";
            if (lstAdsForValidation[index].strUOMCode == "LN") {
                //strVal += "<td width=150>Classified text</td><td width=450><textarea readonly='readonly' class=form-controlNew>" + lstAdsForValidation[index].strAdvText + "</textarea></td>";
                strVal += "<td width=150>Classified text</td><td width=450>";
                strVal += "<table><tr>";
                if (lstAdsForValidation[index].strTickValue != undefined && lstAdsForValidation[index].strTickValue != null && lstAdsForValidation[index].strTickValue != "") {
                    strVal += "<td><img src='images/tick.jpg'/></td>";
                }
                strVal += "<td>";
                if (lstAdsForValidation[index].strBoldValue != undefined && lstAdsForValidation[index].strBoldValue != null && lstAdsForValidation[index].strBoldValue != "") {
                    strVal += "<b>";
                }
                strVal += "<textarea readonly='readonly' class=form-controlNew style='width: 450px;";
                if (lstAdsForValidation[index].strColorCode != undefined && lstAdsForValidation[index].strColorCode != null && lstAdsForValidation[index].strColorCode != "") {
                    strVal += "background-color:";
                    var clrCode = lstAdsForValidation[index].strColorCode;
                    $.each(lstColor, function (indClr, valClr) {
                        try {
                            if (valClr.split('~')[0] == clrCode) {
                                strVal += valClr.split('~')[3] + "; ";
                                return;
                            }
                        } catch (e) { }
                    });
                }
                strVal += "'>" + lstAdsForValidation[index].strAdvText + "</textarea>";
                if (lstAdsForValidation[index].strBoldValue != undefined && lstAdsForValidation[index].strBoldValue != null && lstAdsForValidation[index].strBoldValue != "") {
                    strVal += "</b>";
                }
                strVal += "</td></tr></table>";
                strVal += "</td>";
            }
            else {
                strVal += "<td width=150>JCN No. </td><td width=450><div style='overflow-y:scroll;max-height:60px;max-width:220px'>";
                arr = [];
                xx = "";
                xx = lstAdsForValidation[index].strJcnNo;
                arr = (xx.split(","));
                $.each(arr, function (ind, value) {
                    strVal += "<a target='_blank' href='" + RoDocurl + arr[ind].replace("#", "%23").replace("#", "%23").split('.')[0] + ".jpg'" + "'>" + arr[ind] + ".jpg" + "</a></br>";
                });
                strVal += "</div></td>";
            }
            //  strVal += "<td width=450><textarea readonly='readonly' class=form-control>" + lstAdsForValidation[index].strAdvText + "</textarea></td>";
            strVal += "<td width=268><textarea class=txtwidth answer placeholder='' readonly='readonly' >" + lstAdsForValidation[index].strMaterialStatus + "</textarea></td></tr></table></div></td></tr>";
            strVal += "</tbody></table><div><button class='btn btn-default' data-toggle='modal' data-backdrop='static' data-keyboard='false' id='" + lstAdsForValidation[index].strBookingno + "' onclick='PreviewImg(this.id)' data-target='#bulkView'>View RO</button></div></div></div></div>";
            $("#ValidateFn_AdTabDtl").append(strVal);
            if (lstAdsForValidation[index].strUOMCode != "LN") {
                $("#ValidateFn_AdTabDtl").find("div.row:last").find("table").find("#txt_width").text("Height");
                $("#ValidateFn_AdTabDtl").find("div.row:last").find("table").find("#txt_Height").text("Width");
            }
            else {
                $("#ValidateFn_AdTabDtl").find("div.row:last").find("table").find("#txt_width").text("Line Count");
                $("#ValidateFn_AdTabDtl").find("div.row:last").find("table").find("#txt_Height").text("Character Count");
            }
        }
        else if (PreAgencyCode != curAgencyCode && PreAgencyCode != "") {
            lstAgencyCodes.push(lstAdsForValidation[index].strAgencyCode);
            lstAgencyName.push(lstAdsForValidation[index].strAgencyName);

            strVal += "<div style='display:none' class='row Agency" + lstAdsForValidation[index].strAgencyCode + "'><div class=col-lg-12 clearfix>";
            strVal += " <div class=col-lg-1><label for=coupon_question>";
            strVal += "<input type=checkbox id='" + lstAdsForValidation[index].strAppCnt + "' name=foo value=valid class=checkbox coupon_question></label>";
            strVal += "</div><div class=col-lg-11><table class=table>";
            strVal += "<tbody >";
            strVal += "<tr>";
            strVal += "<td></td>";
            strVal += "<td>";
            strVal += "<table width=100%>";
            strVal += "<tr>";
            strVal += "<td width=150>Booking Number   </td>";
            strVal += "<td width=180><input readonly='readonly' id='txt_BkgNo' value='" + lstAdsForValidation[index].strBookingno + "' type=text class=form-control placeholder=''></td>";
            strVal += "<td colspan=2 rowspan=2>";
            strVal += "<div>";
            strVal += "<table class=tblright>";
            strVal += "<tr>";
            strVal += "<td width=200>Clr / Subtype / Classification </td>";
            strVal += "<td> <textarea readonly='readonly' placeholder=''>" + lstAdsForValidation[index].strColor + "/" + lstAdsForValidation[index].strSubTypeDesc + "/";
            strVal += "/" + lstAdsForValidation[index].strClassificationCode + "</textarea></td>";
            strVal += "</tr></table></div></td></tr><tr>";
            strVal += "<td>AD Number  </td>";
            //strVal += "<td><input id='txt_AdvNo' type=text value='" + lstAdsForValidation[index].stradvno + "' class=form-control placeholder=''/>";
            strVal += "<td> <textarea readonly='readonly' id='txt_AdvNo' placeholder=''>" + lstAdsForValidation[index].stradvno + "</textarea>";
            //strVal += "<input id='txt_strAdStatus' type=text value='" + lstAdsForValidation[index].strAdStatus + "' class=form-control placeholder=''/>";
            strVal += "<input readonly='readonly' id='txt_strRegCnt' type=text value='" + lstAdsForValidation[index].strEditionCode + "' class=form-control placeholder=''/>";
            strVal += "<input readonly='readonly' id='txt_strAdAmt' type=text value='" + lstAdsForValidation[index].strAdAmt + "' class=form-control placeholder=''/>";
            //strVal += "<input readonly='readonly' id='txt_strUserId' type=text value='" + lstAdsForValidation[index].strIssueDate + "' class=form-control placeholder=''/></td>";
            strVal += "<input style='display:none;' readonly='readonly' id='txt_strUserId' type=text value='" + lstAdsForValidation[index].strUserId + "' class=form-control placeholder=''/><input readonly='readonly' id='' type=text value='" + lstAdsForValidation[index].strIssueDate + "' class=form-control placeholder=''/></td>";
            strVal += "<td>&nbsp;</td>";
            strVal += "</tr><tr><td>Classified Ref. No.  </td>";
            strVal += "<td><input type=text  readonly='readonly'  class=form-control placeholder=''></td>";
            strVal += "<td colspan=2><div><table class=tblleft><tr>";
            if (lstAdsForValidation[index].strUOMCode == "LN") {
                strVal += "<td width=100 id='txt_width'>Line Count</td>";
                strVal += "<td><input readonly='readonly' type=text class=form-control value='" + lstAdsForValidation[index].strLineCount + "' placeholder=''></td>";
                //strVal += "<td width=75><input type=text class=form-control placeholder></td>";
                strVal += "<td width=135 id='txt_Height'>Character Count</td>";
                strVal += "<td><input readonly='readonly' type=text value='" + lstAdsForValidation[index].strCharCount + "' class=form-control placeholder=''></td>";
            }
            else {
                strVal += "<td width=100 id='txt_width'>Height</td>";
                strVal += "<td><input readonly='readonly' type=text class=form-control value='" + lstAdsForValidation[index].strHeight + "' placeholder=''></td>";
                // strVal += "<td width=75><input type=text class=form-control placeholder></td>";
                strVal += "<td width=135 id='txt_Height'>Width</td>";
                strVal += "<td><input readonly='readonly' type=text value='" + lstAdsForValidation[index].strWidth + "' class=form-control placeholder=''></td>";
            }
            // strVal += "<td width=75><input type=text class=form-control placeholder=''></td>";
            strVal += "</tr></table></div></td><td></td></tr></table></td>";
            strVal += "</tr><tr><td></td><td colspan=2><div><table class=tblbtm><tr>";
            // strVal += "<td width=450><textarea readonly='readonly' class=form-control>" + lstAdsForValidation[index].strAdvText + "</textarea></td>";
            if (lstAdsForValidation[index].strUOMCode == "LN") {
                strVal += "<td width=150>Classified text</td><td width=450>";
                strVal += "<table><tr>";
                if (lstAdsForValidation[index].strTickValue != undefined && lstAdsForValidation[index].strTickValue != null && lstAdsForValidation[index].strTickValue != "") {
                    strVal += "<td><img src='images/tick.jpg'/></td>";
                }
                strVal += "<td>";
                if (lstAdsForValidation[index].strBoldValue != undefined && lstAdsForValidation[index].strBoldValue != null && lstAdsForValidation[index].strBoldValue != "") {
                    strVal += "<b>";
                }
                strVal += "<textarea readonly='readonly' class=form-controlNew style='width: 450px;";
                if (lstAdsForValidation[index].strColorCode != undefined && lstAdsForValidation[index].strColorCode != null && lstAdsForValidation[index].strColorCode != "") {
                    strVal += "background-color:";
                    var clrCode = lstAdsForValidation[index].strColorCode;
                    $.each(lstColor, function (indClr, valClr) {
                        try {
                            if (valClr.split('~')[0] == clrCode) {
                                strVal += valClr.split('~')[3] + "; ";
                                return;
                            }
                        } catch (e) { }
                    });
                }
                strVal += "'>" + lstAdsForValidation[index].strAdvText + "</textarea>";
                if (lstAdsForValidation[index].strBoldValue != undefined && lstAdsForValidation[index].strBoldValue != null && lstAdsForValidation[index].strBoldValue != "") {
                    strVal += "</b>";
                }
                strVal += "</td></tr></table>";
                strVal += "</td>";
            }
            else {
                strVal += "<td width=150>JCN No. </td><td width=450><div style='overflow-y:scroll;max-height:60px;max-width:220px'>";
                arr = [];
                xx = "";
                xx = lstAdsForValidation[index].strJcnNo;
                arr = (xx.split(","));
                $.each(arr, function (ind, value) {
                    strVal += "<a target='_blank' href='" + RoDocurl + arr[ind].replace("#", "%23").replace("#", "%23").split('.')[0] + ".jpg'" + "'>" + arr[ind] + ".jpg" + "</a></br>";
                });
                strVal += "</div></td>";
            }
            strVal += "<td width=268><textarea class=txtwidth answer placeholder=''  readonly='readonly' >" + lstAdsForValidation[index].strMaterialStatus + "</textarea></td></tr></table></div></td></tr>";
            strVal += "</tbody></table><div><button class='btn btn-default' data-toggle='modal' data-backdrop='static' data-keyboard='false' id='" + lstAdsForValidation[index].strBookingno + "' onclick='PreviewImg(this.id)' data-target='#bulkView'>View RO</button></div></div></div></div>";
            $("#ValidateFn_AdTabDtl").append(strVal);
            if (lstAdsForValidation[index].strUOMCode != "LN") {
                $("#ValidateFn_AdTabDtl").find("div.row:last").find("table").find("#txt_width").text("Height");
                $("#ValidateFn_AdTabDtl").find("div.row:last").find("table").find("#txt_Height").text("Width");
            }
            else {
                $("#ValidateFn_AdTabDtl").find("div.row:last").find("table").find("#txt_width").text("Line Count");
                $("#ValidateFn_AdTabDtl").find("div.row:last").find("table").find("#txt_Height").text("Character Count");
            }
        }
        strVal = "";
        PreAgencyCode = lstAdsForValidation[index].strAgencyCode;
    });
    if (lstAdsForValidation <= 0) {
        $("#AgencyName_Label").css('display', 'none');
        strVal = "";
        $("#btnsApproveRejectSkip").css('display', 'none');
        strVal += " <center>No Records Founded</center>";
        $("#ValidateFn_AdTabDtl").append(strVal);
        $("#Agency_Name").text("");
    }
    else {
        $("#AgencyName_Label").css('display', 'block');
        $("#btnsApproveRejectSkip").css('display', 'block');
        strAgencyCode = $("#Agency_Code").text(strAgencyCode);
        strAgencyName = $("#Agency_Name").text(strAgencyName);
        var strIndx = $.inArray(strAgencyCode, lstAgencyCodes);
        $("#ValidateFn_AdTabDtl").find("div.Agency" + lstAgencyCodes[strIndx + 1]).css('display', 'block');
        $("#ValidateFn_AdTabDtl").find('div.row').not(".Agency" + lstAgencyCodes[strIndx + 1]).css('display', 'none');
    }
}

$("#Btn_Send").click(function () {
    chkbkgno = "";
    //xml_strAdStatus = "";
    xml_strRegCnt = "";
    xml_strAdAmt = "";
    xml_strUserId = "";
    xml_strBookingNo = "";
    xml_strAdvNo = "";
    var cur_bkgno = "";
    var pre_bkgno = "";
    var passBkg = "";
    var count = "";
    SuccessBkg = "";
    FailedBkg = "";
    SuccessCount = 0;
    FailedCount = 0;
    var snl = [];
    var sno = [];
    var SuccessAdvNo = "";
    if ($('#ValidateFn_AdTabDtl input:checked').length > 0) {
        jQuery('#ValidateFn_AdTabDtl input:checked').each(function () {
            var chkcount = $('#ValidateFn_AdTabDtl input:checked').length;
            if (this.checked) {
                count++;
                xml_strBookingNo += "'" + $(this).closest("div.row").find("#txt_BkgNo").val() + "',";
                cur_bkgno = $(this).closest("div.row").find("#txt_BkgNo").val();
                if (cur_bkgno == pre_bkgno && pre_bkgno != "") {

                    passBkg = passBkg;
                }
                if (cur_bkgno != pre_bkgno && pre_bkgno != "") {
                    passBkg = $(this).closest("div.row").find("#txt_BkgNo").val();
                }

                if (cur_bkgno != pre_bkgno && pre_bkgno != "") {
                    xml_strAdStatus = "A";
                    //xml_strRegCnt = xml_strRegCnt.trimEnd(',');
                    pre_bkgno = pre_bkgno.trimEnd(',');
                    xml_strRegCnt = "";
                    xml_strAdAmt = xml_strAdAmt.trimEnd(',');
                    xml_strUserId = xml_strUserId.trimEnd(',');
                    xml_strAdvNo = xml_strAdvNo.trimEnd(',');
                    xml_strBookingNo = cur_bkgno;
                    // sno = sno.trimEnd(',');
                    // snl.push($(this).attr("id"));
                    if ($.inArray($(this).attr("id"), snl) < 0) {
                        snl.push($(this).attr("id"));
                    }
                    strAgencyCode = $("#Agency_Code").text();
                    $.ajax({
                        //url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/updateAdsReject",
                        url: gStrIpVal + "HinduFranchiseeService.svc/updateAdsReject",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        returnType: "json",
                        data: '{"user": "' + window.sessionStorage.strUserId + '","strBkgNo": "' + pre_bkgno + '","strAdNo": "' + xml_strAdvNo + '","strRejectreason": "' + xml_strRegCnt + '","strAdAmt": "' + xml_strAdAmt + '","strApproveStatus": "' + xml_strAdStatus + '"}',
                        async: false,
                        success: function (data) {
                            strval = "";
                            if (data.updateAdsRejectResult == true) {
                                SuccessCount++;
                                SuccessBkg += "'" + pre_bkgno + "',";
                                xml_strAdAmt = "";
                                xml_strUserId = "";
                                xml_strAdvNo = "";
                                //SuccessAdvNo += xml_strAdvNo + ",";
                                //sno = sno;
                                snl = snl;
                                $.each(snl, function (index, value) {
                                    lstAdsForValidation.splice(index - 1, 1);
                                    $("#ValidateFn_AdTabDtl").find("input#" + snl[index]).closest("div.row").html("");

                                });
                            }
                            else {
                                FailedCount++;
                                FailedBkg += "'" + pre_bkgno + "',";
                                snl.pop($(this).attr("id"));
                            }
                        }
                    });
                }
                if (chkcount == count && chkcount != 1) {
                    xml_strAdStatus = "A";
                    //xml_strRegCnt = xml_strRegCnt.trimEnd(',');
                    passBkg = passBkg.trimEnd(',');
                    xml_strRegCnt = "";
                    xml_strAdAmt += "'" + $(this).closest("div.row").find("#txt_strAdAmt").val() + "'";
                    xml_strUserId += "'" + $(this).closest("div.row").find("#txt_strUserId").val() + "'";
                    xml_strAdvNo += "'" + $(this).closest("div.row").find("#txt_AdvNo").val() + "'";
                    //   sno += "'" + $(this).attr("id") + "',";
                    // snl.push($(this).attr("id"));
                    if ($.inArray($(this).attr("id"), snl) < 0) {
                        snl.push($(this).attr("id"));
                    }
                    strAgencyCode = $("#Agency_Code").text();
                    $.ajax({
                        // url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/updateAdsReject",
                        url: gStrIpVal + "HinduFranchiseeService.svc/updateAdsReject",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        returnType: "json",
                        data: '{"user": "' + window.sessionStorage.strUserId + '","strBkgNo": "' + passBkg + '","strAdNo": "' + xml_strAdvNo + '","strRejectreason": "' + xml_strRegCnt + '","strAdAmt": "' + xml_strAdAmt + '","strApproveStatus": "' + xml_strAdStatus + '"}',
                        async: false,
                        success: function (data) {
                            strval = "";
                            if (data.updateAdsRejectResult == true) {
                                SuccessCount++;
                                SuccessBkg += "'" + passBkg + "',";
                                xml_strAdAmt = "";
                                xml_strUserId = "";
                                xml_strAdvNo = "";
                                SuccessAdvNo += xml_strAdvNo + ",";
                                snl = snl;
                                $.each(snl, function (index, value) {
                                    lstAdsForValidation.splice(index - 1, 1);
                                    $("#ValidateFn_AdTabDtl").find("input#" + snl[index]).closest("div.row").html("");

                                });
                            }
                            else {
                                FailedCount++;
                                FailedBkg += "'" + passBkg + "',";
                                snl.pop($(this).attr("id"));
                                //$.grep(snl, function (n, i) {
                                //    return n > 0;
                                //});
                            }
                        }
                    });
                }
                if (chkcount == count && chkcount == 1) {
                    xml_strAdStatus = "A";
                    //xml_strRegCnt = xml_strRegCnt.trimEnd(',');
                    passBkg = $(this).closest("div.row").find("#txt_BkgNo").val();
                    xml_strRegCnt = "";
                    xml_strAdAmt += "'" + $(this).closest("div.row").find("#txt_strAdAmt").val() + "'";
                    sno += "'" + $(this).attr("id") + "',";
                    //snl.push($(this).attr("id"));
                    if ($.inArray($(this).attr("id"), snl) < 0) {
                        snl.push($(this).attr("id"));
                    }
                    xml_strUserId += "'" + $(this).closest("div.row").find("#txt_strUserId").val() + "'";
                    xml_strAdvNo += "'" + $(this).closest("div.row").find("#txt_AdvNo").val() + "'";
                    strAgencyCode = $("#Agency_Code").text();
                    $.ajax({
                        //url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/updateAdsReject",
                        url: gStrIpVal + "HinduFranchiseeService.svc/updateAdsReject",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        returnType: "json",
                        data: '{"user": "' + window.sessionStorage.strUserId + '","strBkgNo": "' + passBkg + '","strAdNo": "' + xml_strAdvNo + '","strRejectreason": "' + xml_strRegCnt + '","strAdAmt": "' + xml_strAdAmt + '","strApproveStatus": "' + xml_strAdStatus + '"}',
                        async: false,
                        success: function (data) {
                            strval = "";
                            if (data.updateAdsRejectResult == true) {
                                SuccessCount++;
                                SuccessBkg += "'" + passBkg + "',";
                                xml_strAdAmt = "";
                                xml_strUserId = "";
                                xml_strAdvNo = "";
                                SuccessAdvNo += xml_strAdvNo + ",";
                                snl = snl;
                                $.each(snl, function (index, value) {
                                    lstAdsForValidation.splice(index - 1, 1);
                                    $("#ValidateFn_AdTabDtl").find("input#" + snl[index]).closest("div.row").html("");
                                });
                            }
                            else {
                                FailedCount++;
                                FailedBkg += "'" + passBkg + "',";
                                snl.pop($(this).attr("id"));
                            }
                        }
                    });
                }
                else {
                    //  xml_strAdStatus += "'" + $(this).closest("div.row").find("#txt_strAdStatus").val() + "',";
                    passBkg = xml_strBookingNo;
                    xml_strRegCnt += "";
                    xml_strAdAmt += "'" + $(this).closest("div.row").find("#txt_strAdAmt").val() + "',";
                    xml_strUserId += "'" + $(this).closest("div.row").find("#txt_strUserId").val() + "',";
                    xml_strAdvNo += "'" + $(this).closest("div.row").find("#txt_AdvNo").val() + "',";
                    sno += "'" + $(this).attr("id") + "',";
                    //SuccessAdvNo
                    //if ($.inArray($(this).attr("id"), SuccessAdvNo) < 0) {
                    //    SuccessAdvNo.push($(this).attr("id"));
                    //}
                    if ($.inArray($(this).attr("id"), snl) < 0) {
                        snl.push($(this).attr("id"));
                    }
                }
                pre_bkgno = $(this).closest("div.row").find("#txt_BkgNo").val();
            }
        });
        strAgencyCode = "";
        strAgencyCode = $("#Agency_Code").text();
        SuccessBkg = SuccessBkg.trimEnd(',');
        FailedBkg = FailedBkg.trimEnd(',');
        LoadAdBookingDtls();
        var strIndx = $.inArray(strAgencyCode, lstAgencyCodes);
        if ($("#ValidateFn_AdTabDtl").find("div.Agency" + lstAgencyCodes[strIndx + 1]).length == 0) {
            if (SuccessCount > 0 && FailedCount == 0)
                alert(SuccessBkg + " has been approved successfully");
            else if (SuccessCount == 0 && FailedCount > 0)
                alert(FailedBkg + " has not approved ");
            else if (SuccessCount > 0 && FailedCount > 0)
                alert(SuccessBkg + " has been approved successfully and" + FailedBkg + "has not approved");
            $(this).attr('data-dismiss', 'modal');
        }
        else {
            $("#ValidateFn_AdTabDtl").find("div.Agency" + strAgencyCode).html("");
            $("#ValidateFn_AdTabDtl").find("div.Agency" + lstAgencyCodes[strIndx + 1]).css('display', 'block');
            $("#ValidateFn_AdTabDtl").find('div.row').not(".Agency" + lstAgencyCodes[strIndx + 1]).css('display', 'none');
            $(this).removeAttr("data-dismiss");
            //  window.location("http://thehinduads.com/B2B/validate-booking.html");
        }
        $("#Agency_Code").text(lstAgencyCodes[strIndx + 1]);
        $("#Agency_Name").text(lstAgencyName[strIndx + 1]);
    }
    else {
        alert("please select the ads to Approve");
    }
});

$("#btnSkipApprove").click(function () {
    SuccessBkg = SuccessBkg.trimEnd(',');
    FailedBkg = FailedBkg.trimEnd(',');
    strAgencyCode = $("#Agency_Code").text();
    var strIndx = $.inArray(strAgencyCode, lstAgencyCodes);
    if ($("#ValidateFn_AdTabDtl").find("div.Agency" + lstAgencyCodes[strIndx + 1]).length == 0) {
        //if (SuccessCount > 0 && FailedCount == 0)
        //    alert(SuccessBkg + " has been approved successfully");
        //else if (SuccessCount == 0 && FailedCount > 0)
        //    alert(FailedBkg + " has not approved ");
        //else if (SuccessCount > 0 && FailedCount > 0)
        //    alert(SuccessBkg + " has been approved successfully and" + FailedBkg + "has not approved");
        $(this).attr('data-dismiss', 'modal');
    }
    else if ($('div').is(".Agency" + lstAgencyCodes[strIndx + 1])) {
        $("#ValidateFn_AdTabDtl").find("div.Agency" + strAgencyCode).html("");
        $("#ValidateFn_AdTabDtl").find("div.Agency" + lstAgencyCodes[strIndx + 1]).css('display', 'block');
        $("#ValidateFn_AdTabDtl").find('div.row').not(".Agency" + lstAgencyCodes[strIndx + 1]).css('display', 'none');
        $(this).removeAttr("data-dismiss"); //('data-dismiss', 'modal');
    }
    $("#Agency_Code").text(lstAgencyCodes[strIndx + 1]);
    $("#Agency_Name").text(lstAgencyName[strIndx + 1]);
});

$("#btnAdRejectOk").click(function () {
    var blnReject = false;
    if (strSelectedRejectReason == "" || strSelectedRejectReason == null || strSelectedRejectReason == undefined) {
        alert('Select reason for Ad rejection');
        return false;
    }
    else if (strSelectedRejectReason.toUpperCase() == "OTHERS") {
        var txt = $("#txtOthers").val();
        if (txt.trim().length > 0) {
            blnReject = true;
            strSelectedRejectReason = txt.trim();
        }
        else {
            alert('Enter reason for Ad rejection');
            return false;
        }
    }
    else {
        blnReject = true;
    }
    if (blnReject == true) {
        chkbkgno = "";
        //xml_strAdStatus = "";
        xml_strRegCnt = "";
        xml_strAdAmt = "";
        xml_strUserId = "";
        xml_strBookingNo = "";
        xml_strAdvNo = "";
        var cur_bkgno = "";
        var pre_bkgno = "";
        var passBkg = "";
        var count = "";
        SuccessBkg = "";
        FailedBkg = "";
        SuccessCount = 0;
        FailedCount = 0;
        var snl = [];
        var sno = [];
        var SuccessAdvNo = "";
        if ($('#ValidateFn_AdTabDtl input:checked').length > 0) {
            jQuery('#ValidateFn_AdTabDtl input:checked').each(function () {
                var chkcount = $('#ValidateFn_AdTabDtl input:checked').length;
                if (this.checked) {
                    count++;
                    xml_strBookingNo += "'" + $(this).closest("div.row").find("#txt_BkgNo").val() + "',";
                    cur_bkgno = $(this).closest("div.row").find("#txt_BkgNo").val();
                    if (cur_bkgno == pre_bkgno && pre_bkgno != "") {

                        passBkg = passBkg;
                    }
                    if (cur_bkgno != pre_bkgno && pre_bkgno != "") {
                        passBkg = $(this).closest("div.row").find("#txt_BkgNo").val();
                    }

                    if (cur_bkgno != pre_bkgno && pre_bkgno != "") {
                        xml_strAdStatus = "R";
                        pre_bkgno = pre_bkgno.trimEnd(',');
                        xml_strRegCnt = strSelectedRejectReason;
                        xml_strAdAmt = xml_strAdAmt.trimEnd(',');
                        xml_strUserId = xml_strUserId.trimEnd(',');
                        xml_strAdvNo = xml_strAdvNo.trimEnd(',');
                        xml_strBookingNo = cur_bkgno;
                        if ($.inArray($(this).attr("id"), snl) < 0) {
                            snl.push($(this).attr("id"));
                        }
                        strAgencyCode = $("#Agency_Code").text();
                        $.ajax({
                            //  url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/updateAdsReject",
                            url: gStrIpVal + "HinduFranchiseeService.svc/updateAdsReject",
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            returnType: "json",
                            data: '{"user": "' + window.sessionStorage.strUserId + '","strBkgNo": "' + pre_bkgno + '","strAdNo": "' + xml_strAdvNo + '","strRejectreason": "' + xml_strRegCnt + '","strAdAmt": "' + xml_strAdAmt + '","strApproveStatus": "' + xml_strAdStatus + '"}',
                            async: false,
                            success: function (data) {
                                strval = "";
                                if (data.updateAdsRejectResult == true) {
                                    SuccessCount++;
                                    SuccessBkg += "'" + pre_bkgno + "',";
                                    xml_strAdAmt = "";
                                    xml_strUserId = "";
                                    xml_strAdvNo = "";
                                    snl = snl;
                                    $.each(snl, function (index, value) {
                                        lstAdsForValidation.splice(index - 1, 1);
                                        $("#ValidateFn_AdTabDtl").find("input#" + snl[index]).closest("div.row").html("");
                                    });
                                }
                                else {
                                    FailedCount++;
                                    FailedBkg += "'" + pre_bkgno + "',";
                                    snl.pop($(this).attr("id"));
                                }
                            }
                        });
                    }
                    if (chkcount == count && chkcount != 1) {
                        xml_strAdStatus = "R";
                        passBkg = passBkg.trimEnd(',');
                        xml_strRegCnt = strSelectedRejectReason;
                        xml_strAdAmt += "'" + $(this).closest("div.row").find("#txt_strAdAmt").val() + "'";
                        xml_strUserId += "'" + $(this).closest("div.row").find("#txt_strUserId").val() + "'";
                        xml_strAdvNo += "'" + $(this).closest("div.row").find("#txt_AdvNo").val() + "'";
                        if ($.inArray($(this).attr("id"), snl) < 0) {
                            snl.push($(this).attr("id"));
                        }
                        strAgencyCode = $("#Agency_Code").text();
                        $.ajax({
                            // url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/updateAdsReject",
                            url: gStrIpVal + "HinduFranchiseeService.svc/updateAdsReject",
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            returnType: "json",
                            data: '{"user": "' + window.sessionStorage.strUserId + '","strBkgNo": "' + passBkg + '","strAdNo": "' + xml_strAdvNo + '","strRejectreason": "' + xml_strRegCnt + '","strAdAmt": "' + xml_strAdAmt + '","strApproveStatus": "' + xml_strAdStatus + '"}',
                            async: false,
                            success: function (data) {
                                strval = "";
                                if (data.updateAdsRejectResult == true) {
                                    SuccessCount++;
                                    SuccessBkg += "'" + passBkg + "',";
                                    xml_strAdAmt = "";
                                    xml_strUserId = "";
                                    xml_strAdvNo = "";
                                    SuccessAdvNo += xml_strAdvNo + ",";
                                    snl = snl;
                                    $.each(snl, function (index, value) {
                                        lstAdsForValidation.splice(index - 1, 1);
                                        $("#ValidateFn_AdTabDtl").find("input#" + snl[index]).closest("div.row").html("");
                                    });
                                }
                                else {
                                    FailedCount++;
                                    FailedBkg += "'" + passBkg + "',";
                                    snl.pop($(this).attr("id"));
                                }
                            }
                        });
                    }
                    if (chkcount == count && chkcount == 1) {
                        xml_strAdStatus = "R";
                        passBkg = $(this).closest("div.row").find("#txt_BkgNo").val();
                        xml_strRegCnt = strSelectedRejectReason;
                        xml_strAdAmt += "'" + $(this).closest("div.row").find("#txt_strAdAmt").val() + "'";
                        sno += "'" + $(this).attr("id") + "',";
                        if ($.inArray($(this).attr("id"), snl) < 0) {
                            snl.push($(this).attr("id"));
                        }
                        xml_strUserId += "'" + $(this).closest("div.row").find("#txt_strUserId").val() + "'";
                        xml_strAdvNo += "'" + $(this).closest("div.row").find("#txt_AdvNo").val() + "'";
                        strAgencyCode = $("#Agency_Code").text();
                        $.ajax({
                            //url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/updateAdsReject",
                            url: gStrIpVal + "HinduFranchiseeService.svc/updateAdsReject",
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            returnType: "json",
                            data: '{"user": "' + window.sessionStorage.strUserId + '","strBkgNo": "' + passBkg + '","strAdNo": "' + xml_strAdvNo + '","strRejectreason": "' + xml_strRegCnt + '","strAdAmt": "' + xml_strAdAmt + '","strApproveStatus": "' + xml_strAdStatus + '"}',
                            async: false,
                            success: function (data) {
                                strval = "";
                                if (data.updateAdsRejectResult == true) {
                                    SuccessCount++;
                                    SuccessBkg += "'" + passBkg + "',";
                                    xml_strAdAmt = "";
                                    xml_strUserId = "";
                                    xml_strAdvNo = "";
                                    SuccessAdvNo += xml_strAdvNo + ",";
                                    snl = snl;
                                    $.each(snl, function (index, value) {
                                        lstAdsForValidation.splice(index - 1, 1);
                                        $("#ValidateFn_AdTabDtl").find("input#" + snl[index]).closest("div.row").html("");
                                    });
                                }
                                else {
                                    FailedCount++;
                                    FailedBkg += "'" + passBkg + "',";
                                    snl.pop($(this).attr("id"));
                                }
                            }
                        });
                    }
                    else {
                        passBkg = xml_strBookingNo;
                        xml_strRegCnt += strSelectedRejectReason;
                        xml_strAdAmt += "'" + $(this).closest("div.row").find("#txt_strAdAmt").val() + "',";
                        xml_strUserId += "'" + $(this).closest("div.row").find("#txt_strUserId").val() + "',";
                        xml_strAdvNo += "'" + $(this).closest("div.row").find("#txt_AdvNo").val() + "',";
                        sno += "'" + $(this).attr("id") + "',";
                        if ($.inArray($(this).attr("id"), snl) < 0) {
                            snl.push($(this).attr("id"));
                        }
                    }
                    pre_bkgno = $(this).closest("div.row").find("#txt_BkgNo").val();
                }
            });
            strAgencyCode = "";
            strAgencyCode = $("#Agency_Code").text();
            SuccessBkg = SuccessBkg.trimEnd(',');
            FailedBkg = FailedBkg.trimEnd(',');
            var strIndx = $.inArray(strAgencyCode, lstAgencyCodes);
            LoadAdBookingDtls();
            if ($("#ValidateFn_AdTabDtl").find("div.Agency" + lstAgencyCodes[strIndx + 1]).length == 0) {
                if (SuccessCount > 0 && FailedCount == 0)
                    alert(SuccessBkg + " has been rejected successfully");
                else if (SuccessCount == 0 && FailedCount > 0)
                    alert(FailedBkg + " has not rejected ");
                else if (SuccessCount > 0 && FailedCount > 0)
                    alert(SuccessBkg + " has been rejected successfully and" + FailedBkg + "has not rejected");
                $(this).attr('data-dismiss', 'modal');
            }
            else {
                $("#ValidateFn_AdTabDtl").find("div.Agency" + strAgencyCode).html("");
                $("#ValidateFn_AdTabDtl").find("div.Agency" + lstAgencyCodes[strIndx + 1]).css('display', 'block');
                $("#ValidateFn_AdTabDtl").find('div.row').not(".Agency" + lstAgencyCodes[strIndx + 1]).css('display', 'none');
                $(this).removeAttr("data-dismiss");
                //  window.location("http://thehinduads.com/B2B/validate-booking.html");
            }
            $("#Agency_Code").text(lstAgencyCodes[strIndx + 1]);
            $("#Agency_Name").text(lstAgencyName[strIndx + 1]);
        }
        else {
            alert("please select the ads to Reject");
        }
    }
});

$("#btnAdRejectCancel").click(function () {
    strSelectedRejectReason = "";
    //$("#idPopupRejectReason").removeAttr("data-target");
    //$(this).removeAttr("data-dismiss");
});

$("#btnAdReject").click(function () {
    xml_strBookingNo = "";
    xml_strAdAmt = "";
    xml_strUserId = "";
    xml_strAdvNo = "";
    strSelectedRejectReason = "";
    jQuery('#ValidateFn_AdTabDtl input:checked').each(function () {
        xml_strBookingNo += "'" + $(this).closest("div.row").find("#txt_BkgNo").val() + "',";
        xml_strAdAmt += "'" + $(this).closest("div.row").find("#txt_strAdAmt").val() + "',";
        xml_strUserId += "'" + $(this).closest("div.row").find("#txt_strUserId").val() + "',";
        xml_strAdvNo += "'" + $(this).closest("div.row").find("#txt_AdvNo").val() + "',";
    });
    if ($('#ValidateFn_AdTabDtl input:checked').length > 0) {
        if (strRejectReasons.split('~').length > 0) {
            $(this).attr("data-target", "#popupRejectReason");
            $("#idPopupRejectReason").attr("data-target", "#popupRejectReason");
            var ReasonText = "";
            var index; var indexTemp = 0;
            ReasonText = "<table border='1' align='center' style='width:auto;'>" +
                        "<thead><tr><td><b>Sno</b></td><td><b>Reject Reason</b></td></tr>";
            $.each(strRejectReasons.split('~'), function (index, value) {
                indexTemp++;
                ReasonText += "<tr><td><b>" + indexTemp.toString() + "</b></td><td><input id='" + indexTemp.toString() + "' ";
                ReasonText += " type='radio' name='rbtn' value='" + value + "' onclick='RejectReasonSelected(this.value);' />" + value;
                if (value.toString().toUpperCase() == "OTHERS")
                    ReasonText += "<input id='txtOthers' style='display:none;' maxlength='100'/> ";
                ReasonText += "</td></tr>";//onclick='Publn_Clicked(this);'
            });
            ReasonText += "</thead></table>";
            $("#divAdRejectReasonMasters").empty();
            $("#divAdRejectReasonMasters").append(ReasonText);
        }
    }
    else {
        alert("please select the ads to Reject");
        $("#idPopupRejectReason").removeAttr("data-target");
    }
});

function LoadAdBookingDtls() {
    BkgStatus = "";
    if ((window.sessionStorage.strUserGroupId == 'G021') || (window.sessionStorage.strUserGroupId == 'G024')) {
        $('#Btn_Validate').css('display', 'none');
        $('#Btn_PayImmediate').css('display', 'none');
        strAdStatus = 'D';
        BkgStatus = 'PAY IMMEDIATE';
    }
    else if (window.sessionStorage.strUserGroupId == 'G023') {
        $('#Btn_Validate').css('display', 'none');
        $('#Btn_PayImmediate').css('display', 'none');
        strAdStatus = "D','B";
        BkgStatus = "PAY IMMEDIATE','ON CREDIT";
    }
    GetList();
    $("#ValidateBkg_TabDtls").empty();
    //strBranch = $("#txt_BkgBranch").val();
    //strcolor = $("#txt_Color").val();
    //strAdtype = $("#txt_AdType").val();
    //strSubType = $("#txt_SubType").val();
    //publn = $("#txt_publn").val();
    //product = $("#txt_Prod").val();
    //edn = $("#txt_Edn").val();
    //premium = $("#txt_Premium").val();
    //bkgFrmDate = $("#txt_BkgFrmDate").val();
    //bkgToDate = $("#txt_BkgToDate").val();
    //IssueFrmDate = $("#txt_InsertnFrmDate").val();
    //IssueToDate = $("#txt_InsertnToDate").val();
    //prodfeature = $("#txt_ProdFeature").val();
    //FranName = $("#txt_FranchiseeName").val();

    strBranch = $("#txt_BkgBranch").val();
    strcolor = $("#txt_Color").val();
    strAdtype = $("#txt_AdType").val();
    strSubType = $("#hdnSubType").val();
    publn = $("#hdnPublnCode").val();
    product = $("#hdnProd").val();
    edn = $("#hdnEdn").val();
    premium = $("#txt_Premium").val();
    bkgFrmDate = $("#txt_BkgFrmDate").val();
    bkgToDate = $("#txt_BkgToDate").val();
    IssueFrmDate = $("#txt_InsertnFrmDate").val();
    IssueToDate = $("#txt_InsertnToDate").val();
    prodfeature = $("#hdnProdFeature").val();
    FranName = $("#hdnFranchiseeName").val();

    var strUomCode = ""; var strSubTypeCode = "";
    try {
        strUomCode = strSubType.split('~')[1];
    } catch (e) { }
    try {
        strSubTypeCode = strSubType.split('~')[0];
    } catch (e) { }
    if (strUomCode == undefined) strUomCode = "";
    $.ajax({
        //url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/LoadAdBookingDtls",
        url: gStrIpVal + "HinduFranchiseeService.svc/LoadAdBookingDtls",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: '{"strAdStatus": "' + strAdStatus + '","strBranch": "' + strBranch + '","strcolor": "' + strcolor +
               '","strAdtype": "' + strAdtype + '","strSubType": "' + strSubTypeCode + '","publn": "' + publn +
               '","product": "' + product + '","edn": "' + edn + '","premium": "' + premium + '","IssueToDate": "' + IssueToDate +
               '","bkgFrmDate": "' + bkgFrmDate + '","bkgToDate": "' + bkgToDate + '","IssueFrmDate": "' + IssueFrmDate +
               '" ,"prodfeature": "' + prodfeature + '","FranName": "' + FranName + '","BkgStatus": "' + BkgStatus + '"}',
        datatype: 'json',
        async: false,
        success: function (data) {
            var index; strVal = "";
            if (data.LoadAdBookingDtlsResult.length > 0) {
                if ((window.sessionStorage.strUserGroupId == 'G021') || (window.sessionStorage.strUserGroupId == 'G024')) {
                    $('#Btn_Validate').css('display', 'none');
                    $('#Btn_PayImmediate').css('display', 'block');
                }
                else if (window.sessionStorage.strUserGroupId == 'G023') {
                    $('#Btn_Validate').css('display', 'block');
                    $('#Btn_PayImmediate').css('display', 'none');
                }
                $.each(data.LoadAdBookingDtlsResult, function (index, value) {
                    strVal += "<tr>";
                    strVal += "<td><input type='checkbox'></td>";//strBookingno
                    strVal += "<td>" + data.LoadAdBookingDtlsResult[index].strBookingno + " </td>";
                    strVal += "<td>" + data.LoadAdBookingDtlsResult[index].strRoNo + " </td>";
                    strVal += "<td> " + data.LoadAdBookingDtlsResult[index].strbkgDate + "</td>";
                    strVal += "<td style='display:none;'> " + data.LoadAdBookingDtlsResult[index].strBookingno + "</td>";
                    strVal += "<td>" + data.LoadAdBookingDtlsResult[index].stradvno + "</td>";
                    strVal += "<td> " + data.LoadAdBookingDtlsResult[index].strIssueDate + "</td>";
                    strVal += "<td><div class='input-group date w118'>";
                    strVal += "<input type='text' placeholder='dd/mm/yyyy ' id='exampleInputPassword1' tabindex='9' class='form-control'>";
                    strVal += "<span class='input-group-addon'><span class='glyphicon-calendar glyphicon'></span> </span> </div></td>";
                    if (data.LoadAdBookingDtlsResult[index].strUOMCode == 'LN') {
                        strVal += "<td>" + data.LoadAdBookingDtlsResult[index].strLineCount + " X " + data.LoadAdBookingDtlsResult[index].strCharCount + "</td>";
                        strVal += "<td></td>";
                    } else {
                        strVal += "<td></td>";
                        strVal += "<td>" + data.LoadAdBookingDtlsResult[index].strWidth + " X " + data.LoadAdBookingDtlsResult[index].strHeight + "</td>";
                    }
                    strVal += "<td>" + data.LoadAdBookingDtlsResult[index].strColor + " </td>";
                    strVal += "<td><input type='text' class='form-control' value='" + data.LoadAdBookingDtlsResult[index].strPageCode + "' placeholder=''></td>";
                    strVal += "<td><input type='text' class='form-control' value='" + data.LoadAdBookingDtlsResult[index].StrPosition_Code + "' placeholder=''></td>";
                    strVal += "<td><input type='text' class='form-control' placeholder=''></td>";
                    strVal += "<td> " + data.LoadAdBookingDtlsResult[index].strAdAmt + "</td>";
                    strVal += "<td><input type='text' class='form-control'> " + data.LoadAdBookingDtlsResult[index].strRoRate + "</td>";
                    strVal += "</tr>";
                });
                $("#ValidateBkg_TabDtls").append(strVal);
            }
            else {
                strVal += "<tr><td colspan='13'><center><h4> No Records Founded </h4></center> </td></tr>";
                $("#ValidateBkg_TabDtls").append(strVal);
                $('#Btn_Validate').css('display', 'none');
                $('#Btn_PayImmediate').css('display', 'none');
                strVal = "";
            }

            $("#ValidateBkg_Count").text(data.LoadAdBookingDtlsResult.length);
            //var today = new Date();
            //var blackouttoday = new Date();
            ////  $("#ValidateBkg_TabDtls").find(".input-group.date").datepicker('remove');
            //blackouttoday.setDate(today.getDate() + 1);
            //blackouttoday = jQuery.datepicker.formatDate('dd/mm/yy', blackouttoday);
            //$("#ValidateBkg_TabDtls").find('.input-group.date').datepicker({
            //    format: "dd/mm/yyyy",
            //    autoclose: true,
            //    startDate: blackouttoday
            //});
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}

$("#Btn_Search").click(function (event) {
    event.preventDefault();
    GetList();
    LoadAdBookingDtls();
});

$("#Btn_Clear").click(function (event) {
    event.preventDefault();
    strBranch = "";
    strcolor = "";
    strAdtype = "";
    strSubType = "";
    publn = "";
    product = "";
    edn = "";
    premium = "";
    bkgFrmDate = "";
    bkgToDate = "";
    IssueFrmDate = "";
    IssueToDate = "";
    prodfeature = "";
    FranName = "";
    chkAdvno = "";
    chkbkgno = "";
    clrValues();
});

function clrValues() {
    $("#txt_AdType").val('');
    lstPublnDtlsLocal = [];
    $("#txt_publn").val(''); $("#hdnPublnCode").val('');
    lstProdDtlsLocal = [];
    $("#txt_Prod").val(''); $("#hdnProd").val('');
    lstSubtypeDtlsLocal = [];
    $("#txt_SubType").val(''); $("#hdnSubType").val('');
    lstEdnDtlsLocal = [];
    $("#txt_Edn").val(''); $("#hdnEdn").val('');
    lstPFDtlsLocal = [];
    $("#txt_ProdFeature").val(''); $("#hdnProdFeature").val('');
    lstFranchiseeDtlsLocal = [];
    $("#txt_FranchiseeName").val(''); $("#hdnFranchiseeName").val('');
}

$(".Search_Publn").click(function () {
    ClearModal();
    $("table.SearchTbl").empty();
    strval = "";
    strheader = "";
    var ele = "";
    ele = "#PublicationDtlModal";

    lstPublnDtlsLocal = [];
    $("#txt_publn").val(''); $("#hdnPublnCode").val('');
    lstProdDtlsLocal = [];
    $("#txt_Prod").val(''); $("#hdnProd").val('');
    lstSubtypeDtlsLocal = [];
    $("#txt_SubType").val(''); $("#hdnSubType").val('');
    lstEdnDtlsLocal = [];
    $("#txt_Edn").val(''); $("#hdnEdn").val('');

    $("#txt_AdType").val();
    var strAdType = "";
    strAdType = $("#txt_AdType").val();
    GetPubln(strAdType);

    $(this).closest("li").find(".Cmn_Code").addClass("SearchResult_Code");
    $(this).closest("li").find(".Cmn_Desc").addClass("SearchResult_Desc");
    strheader += " <thead  style='background: none repeat scroll 0 0 #3075b0; color: white;'><tr><th></th><th id='Key_agencycode'>Publication Code</th><th> Publication Name</th></tr></thead><tbody >";
    $.each(lstPublnDtlsLocal, function (index1, value) {
        strval += "<tr class='trSearchInfo'><td><input name='rbnCat' type='radio' onclick='UpdateSelectedvalue(this)' id='" + lstPublnDtlsLocal[index1].strPublncode + "' class='rad' value='" + lstPublnDtlsLocal[index1].strPublnDesc + "' /></td>";
        strval += "<td> <span class='com_code'>" + lstPublnDtlsLocal[index1].strPublncode + "</span></td>";
        strval += "<td>" + lstPublnDtlsLocal[index1].strPublnDesc + "</td>";
        strval += " </tr>";
    });
    strval += "</tbody>";
    $(ele).find("table.SearchTbl").append(strheader + strval);
});

function GetPubln(strAdType) {
    $.ajax({
        //url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetPublicationDtls",
        url: gStrIpVal + "HinduFranchiseeService.svc/GetPublicationDtls",
        cache: false,
        type: "POST",
        contentType: "application/json",
        async: false,
        data: '{"strAdType": "' + strAdType + '"}',
        dataType: 'JSON',
        success: function (data) {
            lstPublnDtlsLocal = data.GetPublicationDtlsResult;
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}

$(".Search_Prod").click(function () {
    ClearModal();
    $("table.SearchTbl").empty();
    strval = "";
    strheader = "";
    var ele = "";
    ele = "#ProductDtlModal";

    lstProdDtlsLocal = [];
    $("#txt_Prod").val(''); $("#hdnProd").val('');
    lstSubtypeDtlsLocal = [];
    $("#txt_SubType").val(''); $("#hdnSubType").val('');
    lstEdnDtlsLocal = [];
    $("#txt_Edn").val(''); $("#hdnEdn").val('');

    var strAdType = "";
    strAdType = $("#txt_AdType").val();

    var strPublnCode = "";
    strPublnCode = $("#hdnPublnCode").val();

    GetProduct(strAdType, strPublnCode, "");

    $(this).closest("li").find(".Cmn_Code").addClass("SearchResult_Code");
    $(this).closest("li").find(".Cmn_Desc").addClass("SearchResult_Desc");
    strheader += " <thead  style='background: none repeat scroll 0 0 #3075b0; color: white;'><tr><th></th><th id=''>Product Code</th><th> Product Name</th></tr></thead><tbody >";
    $.each(lstProdDtlsLocal, function (index1, value) {
        strval += "<tr class='trSearchInfo'><td><input name='rbnCat' type='radio' onclick='UpdateSelectedvalue(this)' id='" + lstProdDtlsLocal[index1].strProductcode + "' class='rad' value='" + lstProdDtlsLocal[index1].strProductDesc + "' /></td>";
        strval += "<td> <span class='com_code'>" + lstProdDtlsLocal[index1].strProductcode + "</span></td>";
        strval += "<td>" + lstProdDtlsLocal[index1].strProductDesc + "</td>";
        strval += " </tr>";
    });
    strval += "</tbody>";
    $(ele).find("table.SearchTbl").append(strheader + strval);
});

function GetProduct(strAdType, strPublnCode, strPublnDesc) {
    $.ajax({
        //url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetProductDtls",
        url: gStrIpVal + "HinduFranchiseeService.svc/GetProductDtls",
        cache: false,
        type: "POST",
        contentType: "application/json",
        async: false,
        data: '{"strAdType": "' + strAdType + '","strPublnCode": "' + strPublnCode + '","strPublnDesc": "' + strPublnDesc + '"}',
        dataType: 'JSON',
        success: function (data) {
            lstProdDtlsLocal = data.GetProductDtlsResult;
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}

$(".Search_SubType").click(function () {
    ClearModal();
    $("table.SearchTbl").empty();
    strval = "";
    strheader = "";
    var ele = "";
    ele = "#SubTypeDtlModal";

    lstSubtypeDtlsLocal = [];
    $("#txt_SubType").val(''); $("#hdnSubType").val('');
    lstEdnDtlsLocal = [];
    $("#txt_Edn").val(''); $("#hdnEdn").val('');

    var strAdType = "";
    strAdType = $("#txt_AdType").val();

    var strPublnCode = "";
    strPublnCode = $("#hdnPublnCode").val();

    var strProdCode = "";
    strProdCode = $("#hdnProd").val();

    GetSubTypeDtls(strAdType, strPublnCode, strProdCode);

    $(this).closest("li").find(".Cmn_Code").addClass("SearchResult_Code");
    $(this).closest("li").find(".Cmn_Desc").addClass("SearchResult_Desc");
    strheader += " <thead  style='background: none repeat scroll 0 0 #3075b0; color: white;'><tr><th></th><th id=''>SubType Code ~ UOM Code</th><th>SubType Name</th></tr></thead><tbody >";
    $.each(lstSubtypeDtlsLocal, function (index1, value) {
        strval += "<tr class='trSearchInfo'><td><input name='rbnCat' type='radio' onclick='UpdateSelectedvalue(this)' ";
        strval += "id='" + lstSubtypeDtlsLocal[index1].strSubTypeCode + "~" + lstSubtypeDtlsLocal[index1].strUOMCode + "' class='rad' value='" + lstSubtypeDtlsLocal[index1].strSubTypeDesc + "' /></td>";
        strval += "<td> <span class='com_code'>" + lstSubtypeDtlsLocal[index1].strSubTypeCode + "~" + lstSubtypeDtlsLocal[index1].strUOMCode + "</span></td>";
        strval += "<td>" + lstSubtypeDtlsLocal[index1].strSubTypeDesc + "</td>";
        strval += " </tr>";
    });
    strval += "</tbody>";
    $(ele).find("table.SearchTbl").append(strheader + strval);
});

function GetSubTypeDtls(strAdType, strPublnCode, strProdCode) {
    $.ajax({
        //url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetSubTypeDtls",
        url: gStrIpVal + "HinduFranchiseeService.svc/GetSubTypeDtls",
        cache: false,
        type: "POST",
        contentType: "application/json",
        async: false,
        data: '{"strPubln": "' + strPublnCode + '","strProd": "' + strProdCode + '","strAdtype": "' + strAdType + '"}',
        dataType: 'JSON',
        success: function (data) {
            lstSubtypeDtlsLocal = data.GetSubTypeDtlsResult;
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}

//Edition
$(".Search_Edn").click(function () {
    ClearModal();
    $("table.SearchTbl").empty();
    strval = "";
    strheader = "";
    var ele = "";
    ele = "#EditionDtlModal";

    lstEdnDtlsLocal = [];
    $("#txt_Edn").val(''); $("#hdnEdn").val('');

    var strAdType = "";
    strAdType = $("#txt_AdType").val();

    var strPublnCode = "";
    strPublnCode = $("#hdnPublnCode").val();

    var strProdCode = "";
    strProdCode = $("#hdnProd").val();

    var strSubTypeUomCode = "";
    strSubTypeUomCode = $("#hdnSubType").val();

    var strUomCode = ""; var strSubTypeCode = "";
    try {
        strUomCode = strSubTypeUomCode.split('~')[1];
    } catch (e) { }
    try {
        strSubTypeCode = strSubTypeUomCode.split('~')[0];
    } catch (e) { }

    if (strUomCode == undefined) strUomCode = "";

    GetEditionDtls(strAdType, strPublnCode, strProdCode, strSubTypeCode, strUomCode);

    $(this).closest("li").find(".Cmn_Code").addClass("SearchResult_Code");
    $(this).closest("li").find(".Cmn_Desc").addClass("SearchResult_Desc");
    strheader += " <thead  style='background: none repeat scroll 0 0 #3075b0; color: white;'><tr><th></th><th id=''>Edition Code</th><th> Edition Name</th></tr></thead><tbody >";
    $.each(lstEdnDtlsLocal, function (index1, value) {
        strval += "<tr class='trSearchInfo'><td><input name='rbnCat' type='radio' onclick='UpdateSelectedvalue(this)' id='" + lstEdnDtlsLocal[index1].strEditionCode + "' class='rad' value='" + lstEdnDtlsLocal[index1].strEditionDesc + "' /></td>";
        strval += "<td> <span class='com_code'>" + lstEdnDtlsLocal[index1].strEditionCode + "</span></td>";
        strval += "<td>" + lstEdnDtlsLocal[index1].strEditionDesc + "</td>";
        strval += " </tr>";
    });
    strval += "</tbody>";
    $(ele).find("table.SearchTbl").append(strheader + strval);
});

function GetEditionDtls(strAdType, strPublnCode, strProdCode, strSubtype, strUom) {
    $.ajax({
        //url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetEditionDtls",
        url: gStrIpVal + "HinduFranchiseeService.svc/GetEditionDtls",
        cache: false,
        type: "POST",
        contentType: "application/json",
        async: false,
        data: '{"strAdtype": "' + strAdType + '","strPubln": "' + strPublnCode + '","strProd": "' + strProdCode + '","strSubtype": "' + strSubtype + '","strUom": "' + strUom + '"}',
        dataType: 'JSON',
        success: function (data) {
            lstEdnDtlsLocal = data.GetEditionDtlsResult;
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}

$(".Search_FranchiseName").click(function () {
    ClearModal();
    $("table#Franchitable").empty();
    strval = "";
    strheader = "";
    var ele = "";
    ele = "#FranchiseeNameModal";

    lstFranchiseeDtlsLocal = [];
    $("#txt_FranchiseeName").val(''); $("#hdnFranchiseeName").val('');
    GetFranchiseeNameDtls();

    $(this).closest("li").find(".Cmn_Code").addClass("SearchResult_Code");
    $(this).closest("li").find(".Cmn_Desc").addClass("SearchResult_Desc");
    strheader += " <thead  style='background: none repeat scroll 0 0 #3075b0; color: white;'><tr><th></th><th id=''>FranchiseeName Code</th><th> FranchiseeName Name</th></tr></thead><tbody >";
    $.each(lstFranchiseeDtlsLocal, function (index1, value) {
        strval += "<tr class='trSearchInfo'><td><input name='rbnCat' type='radio' onclick='UpdateSelectedvalue(this)' id='" + lstFranchiseeDtlsLocal[index1].strAgencyCode + "' class='rad' value='" + lstFranchiseeDtlsLocal[index1].strAgencyName + "' /></td>";
        strval += "<td> <span class='com_code'>" + lstFranchiseeDtlsLocal[index1].strAgencyCode + "</span></td>";
        strval += "<td>" + lstFranchiseeDtlsLocal[index1].strAgencyName + "</td>";
        strval += " </tr>";
    });
    strval += "</tbody>";
    $(ele).find("table#Franchitable").append(strheader + strval);
    ////commented below 2 lines bcoz of error
    //$(ele).find("table#Franchitable").dataTable().fnDestroy();
    //$(ele).find("table#Franchitable").dataTable();
});

function GetFranchiseeNameDtls() {
    $.ajax({
        // url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetFranchiseeNameDtls",
        url: gStrIpVal + "HinduFranchiseeService.svc/GetFranchiseeNameDtls",
        cache: false,
        type: "POST",
        contentType: "application/json",
        async: false,
        dataType: 'JSON',
        success: function (data) {
            lstFranchiseeDtlsLocal = data.GetFranchiseeNameDtlsResult;
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}

//ProductFeature
$(".Search_ProductFeature").click(function () {
    ClearModal();
    $("table.SearchTbl").empty();
    strval = "";
    strheader = "";
    var ele = "";
    ele = "#ProductFeatureDtlModal";

    lstPFDtlsLocal = [];
    $("#txt_ProdFeature").val(''); $("#hdnProdFeature").val('');
    GetPFDtls();

    $(this).closest("li").find(".Cmn_Code").addClass("SearchResult_Code");
    $(this).closest("li").find(".Cmn_Desc").addClass("SearchResult_Desc");
    strheader += " <thead  style='background: none repeat scroll 0 0 #3075b0; color: white;'><tr><th></th><th id=''>Product Feature Code</th><th> Product Feature Name</th></tr></thead><tbody >";
    $.each(lstPFDtlsLocal, function (index1, value) {
        strval += "<tr class='trSearchInfo'><td><input name='rbnCat' type='radio' onclick='UpdateSelectedvalue(this)' id='" + lstPFDtlsLocal[index1].strFeatureCode + "' class='rad' value='" + lstPFDtlsLocal[index1].strFeatureDesc + "' /></td>";
        strval += "<td> <span class='com_code'>" + lstPFDtlsLocal[index1].strFeatureCode + "</span></td>";
        strval += "<td>" + lstPFDtlsLocal[index1].strFeatureDesc + "</td>";
        strval += " </tr>";
    });
    strval += "</tbody>";
    $(ele).find("table.SearchTbl").append(strheader + strval);
});

function GetPFDtls() {
    $.ajax({
        //url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetPFDtls",
        url: gStrIpVal + "HinduFranchiseeService.svc/GetPFDtls",
        cache: false,
        type: "POST",
        contentType: "application/json",
        async: false,
        dataType: 'JSON',
        success: function (data) {
            lstPFDtlsLocal = data.GetPFDtlsResult;
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}

function ClearModal() {
    $("select.Cmn_ddl").val("");
    $(".SearchInput").val("").css({ "display": "none" });
}

function UpdateSelectedvalue(evt) {
    var SelectedDesc = ""; var SelectedCode = "";
    $(".rad:checked").each(function () {
        SelectedDesc += $(this).val();
        SelectedCode += $(this).closest('tr').find('.com_code').text();
    });
    $('.SearchResult_Code').val(SelectedCode);
    $('.SearchResult_Desc').val(SelectedDesc);
    if ($("div").find(".Cmn_Code").hasClass("SearchResult_Code")) {
        $("div").find(".Cmn_Code").removeClass("SearchResult_Code");
    }
    if ($("div").find(".Cmn_Desc").addClass("SearchResult_Desc")) {
        $("div").find(".Cmn_Desc").removeClass("SearchResult_Desc");
    }
    $(evt).attr('data-dismiss', 'modal');
}

function PopUpCloseEvent() {
    if ($("div").find(".Cmn_Code").hasClass("SearchResult_Code")) {
        $("div").find(".Cmn_Code").removeClass("SearchResult_Code");
    }
    if ($("div").find(".Cmn_Desc").addClass("SearchResult_Desc")) {
        $("div").find(".Cmn_Desc").removeClass("SearchResult_Desc");
    }
}

$("#Btn_VSearch").click(function () {
    LoadAdBookingDtls();
});

$("#Btn_VClear").click(function () {
    $("input").val("");
    $("select").val("");
    clrValues();
});

//for Preview the Ro uploded history....
function PreviewImg(Strbkn) {
    // alert(Strbkn);
    $("#PreviewAd").empty();
    $("#PreviewAd").html("");
    var RoDocurlpreview = "http://thehinduads.com/RoDocuments/";
    $.ajax({
        //url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetRo_Documents",
        url: gStrIpVal + "HinduFranchiseeService.svc/GetRo_Documents",
        cache: false,
        type: "POST",
        data: '{"StrBookingNo": "' + Strbkn + '"}',
        async: false,
        contentType: "application/json",

        dataType: "json",
        success: function (data) {
            //strFilename
            var index;
            var strval = "";
            //[Ro_Type]strRoType,strFilename
            $.each(data.GetRo_DocumentsResult, function (index, value) {

                if (data.GetRo_DocumentsResult[index].strRoType == '.pdf') {
                    strval += "<td><a target='_blank' href='" + RoDocurlpreview + data.GetRo_DocumentsResult[index].strFilename + data.GetRo_DocumentsResult[index].strRoType + "'>" + data.GetRo_DocumentsResult[index].strFilename + data.GetRo_DocumentsResult[index].strRoType + "</a></td><td>&nbsp&nbsp</td>";
                }
                else {
                    strval += "<td><img src=" + RoDocurlpreview + data.GetRo_DocumentsResult[index].strFilename + data.GetRo_DocumentsResult[index].strRoType + " width='200px;' height='300px;'></img></td><td>&nbsp&nbsp</td>";
                }
            });

            $("#PreviewAd").append(strval);
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });

}
//end 

function GetAdRejectReasonsMaster() {
    strRejectReasons = "";
    $.ajax({
        //url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetAdRejectReasons",
        url: gStrIpVal + "HinduFranchiseeService.svc/GetAdRejectReasons",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.GetAdRejectReasonsResult != null && data.GetAdRejectReasonsResult != "") {
                strRejectReasons = data.GetAdRejectReasonsResult;
            }
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}

function RejectReasonSelected(event) {
    strSelectedRejectReason = "";
    if (event.toUpperCase() == "OTHERS") {
        $("#txtOthers").css("display", "block");
    }
    else {
        $("#txtOthers").css("display", "none");
        $("#txtOthers").val('');
    }
    strSelectedRejectReason = event;
}
