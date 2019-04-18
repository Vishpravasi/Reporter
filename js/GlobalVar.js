var INCH_TO_CENTIMETER = 2.54;
var GstrImagePreviewURL =gStrIpValPreview+ "imgPreview/";
var gstrCurrentDate = null;
var gstrCurrentTime = null;
var gintAllowBkdDates = null;
var gblnEditBookedAds = false;
var gblnEditBookedAds = false;
var gblnMultiOkCancel = false;
var strBkdDate = "";
var strBkdDateforDB = "";
var strDate = "";
var gstrTick = '';
var gstrBold = '';
var gstrClientCode = "";
var strSingleAdText = "";

$(document).ready(function () {
    Array.prototype.containsSubString = function (text) {
        for (var i = 0; i < this.length; ++i) {
            if (this[i].toString().indexOf(text) != -1)
                return i;
        }
        return -1;
    }
    Array.prototype.containsSubStringLen = function (text) {
        var strMatchLen = 0;
        for (var i = 0; i < this.length; ++i) {
            if (this[i].toString().indexOf(text) != -1)
                strMatchLen++;
        }
        return strMatchLen;
    }

    strSysDate();
});

//to check issue date falls within the eff from & to dates
function chkIssueDtBwnFromTo(strFromDt, strToDt, strIssuDt) {
    var blnchkIssueDt = false;
    if (strFromDt == "" || strFromDt == undefined || strFromDt == null)
        blnchkIssueDt = false;
    else if (((new Date(strFromDt.split('/')[1] + '/' + strFromDt.split('/')[0] + '/' + strFromDt.split('/')[2])) <= (new Date(strIssuDt.split('/')[1] + '/' + strIssuDt.split('/')[0] + '/' + strIssuDt.split('/')[2]))) && ((new Date(strToDt.split('/')[1] + '/' + strToDt.split('/')[0] + '/' + strToDt.split('/')[2])) >= (new Date(strIssuDt.split('/')[1] + '/' + strIssuDt.split('/')[0] + '/' + strIssuDt.split('/')[2])))) {
        blnchkIssueDt = true;
    }
    else if (((new Date(strFromDt.split('/')[1] + '/' + strFromDt.split('/')[0] + '/' + strFromDt.split('/')[2])) <= (new Date(strIssuDt.split('/')[1] + '/' + strIssuDt.split('/')[0] + '/' + strIssuDt.split('/')[2]))) && (strToDt == '')) {
        blnchkIssueDt = true;
    }
    return blnchkIssueDt;
}

//var lstIssueDts = [];
//var pValiDays = "";
//lstIssueDts.push('19/02/2015', '26/03/2015', '26/02/2015');
//pValiDays = '30';
//chkValidityDays(lstIssueDts, pValiDays);
//to check whether list of issue dates user selected falls within valid days
function chkValidityDays(lstIssueDts, pValidDays) {
    var blnValidDays = false;
    var CntIssueDt = 0;
    var currentDate = "";
    currentDate = new Date().addDays(pValidDays);
    $.each(lstIssueDts, function (ind, vall) {
        if (new Date(vall.split('/')[1] + '/' + vall.split('/')[0] + '/' + vall.split('/')[2]) <= new Date(currentDate)) {
            CntIssueDt = CntIssueDt + 1;
        }
    });
    if (CntIssueDt == lstIssueDts.length)
        blnValidDays = true;
    else
        blnValidDays = false;
    if (pValidDays != undefined && pValidDays != "" && parseInt(pValidDays) > 0) { }
    else blnValidDays = true;//if valid days is not given
    return blnValidDays;
}

//to check whether size falls within the min & max sizes
function chkSizes(dblAdSize, dblMinSize, dblMaxSize, dblAddnMinSize, dblAddnMaxSize) {
    var blnResult = false;
    if ((dblMaxSize == undefined || dblMaxSize == null || dblMaxSize == NaN || dblMaxSize == "") &&
        (dblAddnMaxSize == undefined || dblAddnMaxSize == null || dblAddnMaxSize == NaN || dblAddnMaxSize == ""))
        blnResult = true;
    else {
        var MinSizeTemp = dblMinSize; var MaxSizeTemp = dblMaxSize;
        if (dblAddnMinSize != undefined && dblAddnMinSize != null && dblAddnMinSize != "" && dblAddnMinSize > 0)
            MinSizeTemp = dblAddnMinSize;
        if (dblAddnMaxSize != undefined && dblAddnMaxSize != null && dblAddnMaxSize != "" && dblAddnMaxSize > 0)
            MaxSizeTemp = dblddnMaxSize;
        if (dblAdSize >= parseFloat(MinSizeTemp) && dblAdSize <= parseFloat(MaxSizeTemp))
            blnResult = true;
    }
    return blnResult;
}

//to check whether height, width falls within the min & max=>height & width
function chkHeightWidth(dblAdHeight, dblAdWidth, dblMinHeight, dblMaxHeight, dblMinWidth, dblMaxWidth) {
    var blnResult = false;
    if (dblAdHeight >= parseFloat(dblMinHeight) && dblAdHeight <= parseFloat(dblMaxHeight))
        blnResult = true;
    if (dblAdWidth >= parseFloat(dblMinWidth) && dblAdWidth <= parseFloat(dblMaxWidth) && blnResult == true)
        blnResult = true;
    return blnResult;
}

//to get the unique rows from db of deadline details
function UniqDeadLn(strDeadDtls, plst) {
    var lstTmpplst = [];
    var arrOutPutlst = [];
    var arrDeadDtls = [];
    var lstDeadDtls = [];
    var strDtls = "";
    arrDeadDtls = strDeadDtls.trim().split('~');
    lstDeadDtls = strDeadDtls.trim().split('~');
    $.each(plst, function (ind, val) {
        strDtls = val.strUniqueValue.split(',')[0] + '*' + val.strUniqueValue.split(',')[1] + '*' + val.strUniqueValue.split(',')[3] +
            '*' + val.strUniqueValue.split(',')[2] + '*' + val.strInsertionDate + '*' + val.strClrBw + '*' + val.strUniqueValue.split(',')[6] +
            '*' + val.strBookingUnit + '*' + val.strContentComp + '*' + val.strDesignType;
        //strDtls = val.strUniqueValue.split(',')[0] + '*' + val.strUniqueValue.split(',')[1] + '*' + val.strUniqueValue.split(',')[2] + '*' + val.strInsertionDate + '*' + val.strClrBw;
        //if ($.inArray(arrDeadDtls, val.strUniqueValue.split(',')[0] + '*' + val.strUniqueValue.split(',')[1] + '*' + val.strUniqueValue.split(',')[3] + '*' + val.strUniqueValue.split(',')[2] + '*' + val.strInsertionDate + '*' + val.strColorType) >= 0) {
        if (lstDeadDtls.containsSubString(strDtls) >= 0 && lstTmpplst.containsSubString(strDtls) < 0) {
            arrOutPutlst.push(val);
            lstTmpplst.push(strDtls);
        }
    });
    return arrOutPutlst;
}

//For getting sysdate from server
function strSysDate() {
    $.ajax({
        //url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/strSysDate",
        url: gStrIpVal + "HinduFranchiseeService.svc/strSysDate",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        returnType: "json",
        async: false,
        success: function (data) {
            gintSysTime = 0;
            gintSysTime += 1;
            gstrCurrentDate = data.strSysDateResult.split('~')[0];
            gstrCurrentTime = data.strSysDateResult.split('~')[1];
            strBoxContent = data.strSysDateResult.split('~')[2].trim();
            strCurrentDate = gstrCurrentDate;
            strCurrentTime = gstrCurrentTime;
            gintAllowBkdDates = data.strSysDateResult.split('~')[3].trim();
            if (gblnEditBookedAds == false) {
                strBkdDate = data.strSysDateResult.split('~')[4].trim().split(' ')[0].trim();
                strBkdDateforDB = data.strSysDateResult.split('~')[4].trim();
                var sepdate = strBkdDateforDB.split(' ')[0].trim();
                var septime = strBkdDateforDB.split(' ')[1] + ' ' + strBkdDateforDB.split(' ')[2];
                //strBkdDateforDB = jQuery.datepicker.formatDate('dd/M/yy', new Date(sepdate.split('-')[1] + '-' + sepdate.split('-')[2] + '-' + sepdate.split('-')[0])) + ' ' + septime;

            }
            strDate = data.strSysDateResult.split('~')[4].split(' ')[0].replace('/', '-').replace('.', '-'); //strDate = data.split('~')[4].split(' ')[0].replace('-', '/').replace('.', '/');
            strDate = new Date(strDate.split('-')[1] + '-' + strDate.split('-')[2] + '-' + strDate.split('-')[0]);
        } //close for success fn
    });
}

//not used
function CheckTwoDtsSameRNot(strVal1, strVal2) {
    var blnCheck = false;
    if ((new Date(strVal1.split('/')[1] + '/' + strVal1.split('/')[0] + '/' + strVal1.split('/')[2])) == (new Date(strVal2.split('/')[1] + '/' + strVal2.split('/')[0] + '/' + strVal2.split('/')[2]))) {
        blnCheck = true;
    }
    return blnCheck;
}

function CheckTwoDtsFirstDtLsThanSecond(strVal1, strVal2) {
    var strRes = "";
    if ((new Date(strVal1.split('/')[1] + '/' + strVal1.split('/')[0] + '/' + strVal1.split('/')[2])) < (new Date(strVal2.split('/')[1] + '/' + strVal2.split('/')[0] + '/' + strVal2.split('/')[2]))) {
        strRes = "L";
    }
    else if ((new Date(strVal1.split('/')[1] + '/' + strVal1.split('/')[0] + '/' + strVal1.split('/')[2])) == (new Date(strVal2.split('/')[1] + '/' + strVal2.split('/')[0] + '/' + strVal2.split('/')[2]))) {
        strRes = "E";
    }
    else {
        strRes = "G";
    }
    return strRes;
}

function fnSetSessionValue(blnAdminFlag, strSPAgencyCode) {
    if (blnAdminFlag == false) {
        window.sessionStorage.strFranchiseAgencyCode = window.sessionStorage.strFranchiseAgencyCodeAdmin;
        window.sessionStorage.strPaymentMethod = window.sessionStorage.strPaymentMethodAdmin;
        window.sessionStorage.strAgencyTypeCode = window.sessionStorage.strAgencyTypeCodeAdmin;
        window.sessionStorage.strControllingBranch = window.sessionStorage.strControllingBranchAdmin;
        window.sessionStorage.strBookingNature = window.sessionStorage.strBookingNatureAdmin;
        window.sessionStorage.strFranchiseAgencyName = window.sessionStorage.strFranchiseAgencyNameAdmin;
        window.sessionStorage.strFranchiseEmailId = window.sessionStorage.strFranchiseEmailIdAdmin;
        window.sessionStorage.strFranchiseMob = window.sessionStorage.strFranchiseMobAdmin;
        window.sessionStorage.strCountryCode = window.sessionStorage.strCountryCodeAdmin;
        window.sessionStorage.strStatus = window.sessionStorage.strStatusAdmin;
        window.sessionStorage.strPaymentMode = window.sessionStorage.strPaymentModeAdmin;
        window.sessionStorage.strUserGroupCode = window.sessionStorage.strUserGroupCodeAdmin;
        window.sessionStorage.strControllingBranchName = window.sessionStorage.strControllingBranchNameAdmin;
        window.sessionStorage.strlogincontactno = window.sessionStorage.strlogincontactnoAdmin;
        window.sessionStorage.strloginaddress = window.sessionStorage.strloginaddressAdmin;
        window.sessionStorage.strStateCode = window.sessionStorage.strStateCodeAdmin;
        window.sessionStorage.StrSalesOffice = window.sessionStorage.StrSalesOfficeAdmin;
        window.sessionStorage.stragencydetails = window.sessionStorage.stragencydetailsAdmin;
        window.sessionStorage.strAdType_Available = window.sessionStorage.strAdType_AvailableAdmin;
        window.sessionStorage.strusertype = window.sessionStorage.strusertypeAdmin;
        window.sessionStorage.strUserID_Available = window.sessionStorage.strUserID_AvailableAdmin;
        $("#frnsName").text("Franchisee / Agency Name: " + window.sessionStorage.strFranchiseAgencyName);
        $("#frnsCode").text("Account Code: " + window.sessionStorage.strFranchiseAgencyCode);
    }
    if (blnAdminFlag == true && strSPAgencyCode != "") {
        var lstSPAsignAgencyDetails = [];
        $.ajax({
            //  url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetSPAgencyDetails",
            url: gStrIpVal + "HinduFranchiseeService.svc/GetSPAgencyDetails",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            returnType: 'json',
            data: '{"strColumn": "agency_code","strValue": "' + strSPAgencyCode + '"}',
            async: false,
            success: function (data) {
                lstSPAsignAgencyDetails = data.GetSPAgencyDetailsResult;
                $.each(lstSPAsignAgencyDetails, function (index, value) {
                    window.sessionStorage.strFranchiseAgencyCode = value.StrSPAgency_AGENCY_CODE.toString().trim();
                    window.sessionStorage.strPaymentMethod = value.StrSPAgency_PAYMENT_METHOD.toString().trim();
                    window.sessionStorage.strAgencyTypeCode = value.StrSPAgency_AGENCY_TYPE_CODE.toString().trim();
                    window.sessionStorage.strControllingBranch = value.StrSPAgency_CONTROLLING_BRANCH.toString().trim();
                    window.sessionStorage.strBookingNature = value.StrSPAgency_strBookingNature.toString().trim();
                    window.sessionStorage.strFranchiseAgencyName = value.StrSPAgency_AGENCY_NAME.toString().trim();
                    window.sessionStorage.strFranchiseEmailId = value.StrSPAgency_EMAIL_ID.toString().trim();
                    window.sessionStorage.strFranchiseMob = value.StrSPAgency_MOBILE_NO.toString().trim();
                    window.sessionStorage.strCountryCode = value.StrSPAgency_COUNTRY_CODE.toString().trim();
                    window.sessionStorage.strStatus = value.StrSPAgency_STATUS.toString().trim();
                    window.sessionStorage.strPaymentMode = value.StrSPAgency_strAllValues.toString().trim();
                    window.sessionStorage.strControllingBranchName = value.StrSPAgencyCONTROLLING_BRANCH_Name.toString().trim();
                    window.sessionStorage.strlogincontactno = value.StrSPAgency_contact_no.toString().trim();
                    window.sessionStorage.strloginaddress = value.StrSPAgency_address.toString().trim();
                    window.sessionStorage.strStateCode = value.StrSPAgency_STATE_CODE.toString().trim();
                    window.sessionStorage.StrSalesOffice = value.StrSPAgency_SALES_OFFICE.toString().trim();
                    window.sessionStorage.stragencydetails = value.StrSPAgency_strUserType.toString().trim() + "*" + value.StrSPAgency_AGENCY_CODE.toString().trim() + "*" +
                        value.StrSPAgency_AGENCY_TYPE_CODE.toString().trim() + "*" + value.StrSPAgency_CONTROLLING_BRANCH.toString().trim();
                    window.sessionStorage.strAdType_Available = value.StrSPAgency_strAdType_Available.toString().trim();
                    window.sessionStorage.strusertype = value.StrSPAgency_strUserType.toString().trim();
                    window.sessionStorage.strUserID_Available = value.StrSPAgency_UserID_Available.toString().trim();
                    $("#frnsName").text("Franchisee / Agency Name: " + window.sessionStorage.strFranchiseAgencyName);
                    $("#frnsCode").text("Account Code: " + window.sessionStorage.strFranchiseAgencyCode);
                    $("#txtSuperAdminAgencyCode").val(window.sessionStorage.strFranchiseAgencyCode);
                    $("#LISuperAdminAgencyName").text("Agency Name: " + window.sessionStorage.strFranchiseAgencyName);
                });
            },
            error: function (jqXHR) {
                //alert(jqXHR.responseText);
            }
        });
    }
}
function fnchkSuperAdmin() {
    var bln=false;
    if(window.sessionStorage.strUserGroupCode =="G031")
        bln = true;
    return bln;
}
