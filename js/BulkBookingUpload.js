var lstScheme_IS_Records = []; var lstScheme_SP_Records = [];
var lstScheme_SCMP_Records = []; var lstScheme_IEP_Records = [];
var lstClientRateMaster = []; var lstCardRateMaster = []; var lstTieUpMaster = [];
var lstMED = []; var strRateType = ""; var lstBatchRecords = []; var lstBkgRecords = [];
var lstRates = []; var lstCalculatedNormRt = []; var lstCalculatedNormRtFinal = [];

var lstLogBkgRecords = []; var lstLogSuccessRecords = []; var lstLogFailedRecords = [];

//var lstLogBatchDtls = [];//bkgno ~ client code ~ client name ~ rate type ~ pkg code ~ ro no ~ ro date ~ batch no

//to enter log
var lstLogDbRecords = [];

var lstBkgRecords = []; var BulkFileName = "";

var batchBkgTotalRecords = 0; var BkgRecordsSuccessCnt = 0; var BkgRecordsFailedCnt = 0;
var BkgSuccess = ""; var BkgFailed = "";

var userLoggedId = "";

$(document).ready(function () {

    userLoggedId = window.sessionStorage.strUserId;//strUserName;
    //userLoggedId = 'welcome';

    BbClearSelFiles();

    $('#btnBulkBookingCancel').click(function (event) {
        event.preventDefault();
        BbClearSelFiles();
    });
});

//to form the file upload control newly
function BbClearSelFiles() {
    $('#divUploadBulkBkg').empty();
    $('#divUploadBulkBkg').html('<input name="fileUploadBulkBkg" tabindex="-1" class="filestyle" id="fileUploadBulkBkg" ' +
        'style="position: absolute; clip: rect(0px, 0px, 0px, 0px);" type="file" accept="application/xml" data-icon="false">');

    var script_cycle = document.createElement('script');
    script_cycle.setAttribute("type", "text/javascript");
    script_cycle.setAttribute("src", "../js/bootstrap-filestyle.js");
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_cycle);

    //$('#fileUploadBulkBkg').click(function (e) {
    //    //BulkBkgXmlUpload();
    //});
}

//Begin--to Download Master records

//to get records for - IS rateType
function BbGet_IS_SchemeRecords() {
    var strRateTypeTemp = "IS";
    lstScheme_IS_Records = [];
    $.ajax({
        // url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/ValidateAd",
        url: gStrIpVal + "HinduFranchiseeService.svc/ValidateAd",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: '{"strRateType": "' + strRateTypeTemp + '"}',
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data.ValidateAdResult.length > 0) {
                lstScheme_IS_Records = data.ValidateAdResult;
            }
        },
        error: function (jqXHR) {
            alert("fn : BbGet_IS_SchemeRecords : " + jqXHR.responseText);
        }
    });
}

//to get records for - IEP rateType
function BbGet_IEP_SchemeRecords() {
    var strRateTypeTemp = "IEP";
    lstScheme_IEP_Records = [];
    $.ajax({
       // url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/ValidateAd",
        url: gStrIpVal + "HinduFranchiseeService.svc/ValidateAd",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: '{"strRateType": "' + strRateTypeTemp + '"}',
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data.ValidateAdResult.length > 0) {
                lstScheme_IEP_Records = data.ValidateAdResult;
            }
        },
        error: function (jqXHR) {
            alert("fn : BbGet_IEP_SchemeRecords : " + jqXHR.responseText);
        }
    });
}

//to get records for - SP rateType
function BbGet_SP_SchemeRecords() {
    var strRateTypeTemp = "SP";
    lstScheme_SP_Records = [];
    $.ajax({
        //url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/ValidateAd",
        url: gStrIpVal + "HinduFranchiseeService.svc/ValidateAd",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: '{"strRateType": "' + strRateTypeTemp + '"}',
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data.ValidateAdResult.length > 0) {
                lstScheme_SP_Records = data.ValidateAdResult;
            }
        },
        error: function (jqXHR) {
            alert("fn : BbGet_SP_SchemeRecords : " + jqXHR.responseText);
        }
    });
}

//to get records for - SCMP rateType
function BbGet_SCMP_SchemeRecords() {
    var strRateTypeTemp = "SCMP";
    lstScheme_SCMP_Records = [];
    $.ajax({
        //url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/ValidateAd",
        url: gStrIpVal + "HinduFranchiseeService.svc/ValidateAd",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: '{"strRateType": "' + strRateTypeTemp + '"}',
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data.ValidateAdResult.length > 0) {
                lstScheme_SCMP_Records = data.ValidateAdResult;
            }
        },
        error: function (jqXHR) {
            alert("fn : BbGet_SCMP_SchemeRecords : " + jqXHR.responseText);
        }
    });
}

//to get records for - MED rateType
function BbGet_MED_SchemeRecords() {
    var strRateTypeTemp = "MEDCLNTDISC";
    lstMED = [];
    $.ajax({
        //url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/ValidateAd",
        url: gStrIpVal + "HinduFranchiseeService.svc/ValidateAd",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: '{"strRateType": "' + strRateTypeTemp + '"}',
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data.ValidateAdResult.length > 0) {
                lstMED = data.ValidateAdResult;
            }
        },
        error: function (jqXHR) {
            alert("fn : BbGet_MED_SchemeRecords : " + jqXHR.responseText);
        }
    });
}

//to get records from CLIENT_RATE_MASTER
function BbGetRatesFromClientRateMaster() {
    lstClientRateMaster = [];
    $.ajax({
       // url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetRatesFromClientRateMaster",
        url: gStrIpVal + "HinduFranchiseeService.svc/GetRatesFromClientRateMaster",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: '{"strValues": ""}',
        dataType: 'json',
        async: true,
        success: function (data) {
            lstClientRateMaster = data.GetRatesFromClientRateMasterResult;
        },
        error: function (jqXHR) {
            alert("fn : BbGetRatesFromClientRateMaster : " + jqXHR.responseText);
        }
    });
}

//to get records from CARD_RATE_MASTER
function BbGetRatesFromCardRateMaster() {
    lstCardRateMaster = [];
    $.ajax({
       // url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetRatesFromCardRateMaster",
        url: gStrIpVal + "HinduFranchiseeService.svc/GetRatesFromCardRateMaster",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: '{"strValues": ""}',
        dataType: 'json',
        async: false,
        success: function (data) {
            lstCardRateMaster = data.GetRatesFromCardRateMasterResult;
        },
        error: function (jqXHR) {
            alert("fn : BbGetRatesFromCardRateMaster : " + jqXHR.responseText);
        }
    });
}

//to get records from Tieup Master
function BbGetTieUpMaster() {
    lstTieUpMaster = [];
    $.ajax({
        //  url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetTieUpMaster",
        url: gStrIpVal + "HinduFranchiseeService.svc/GetTieUpMaster",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: false,
        success: function (data) {
            lstTieUpMaster = data.GetTieUpMasterResult;
        },
        error: function (jqXHR) {
            alert("fn : BbGetTieUpMaster : " + jqXHR.responseText);
        }
    });
}

//End--to Download Master records

//to validate & to intitate the sending file sequence
function BulkBkgXmlUpload() {
    blnisSelectFile = true;
    extension = $('#fileUploadBulkBkg').val().substring($('#fileUploadBulkBkg').val().lastIndexOf('.'));
    if (extension == "") {
        BbClearSelFiles();
        return false;
    }
    else if (extension != ".xml") {
        alert("The uploaded file format is not supported. Please upload the files in XML format");
        BbClearSelFiles();
        return false;
    }
    var file, img, fileSize;
    if ((file = $('#fileUploadBulkBkg')[0].files[0])) {
        fileSize = (file.size / 1024) / 1024;
        BulkFileName = $('#fileUploadBulkBkg')[0].files[0].name;
        BbSendFile("", "fileUploadBulkBkg", $('#fileUploadBulkBkg')[0].files[0].name);
    }
}

//to upload file to server
function BbSendFile(file, strfileCntrol, strFileName) {
    $.ajaxFileUpload({
        url:gStrIpVal + 'FileUpload.ashx?Bulk=Y&FileName=' + strFileName,
        secureuri: false,
        fileElementId: strfileCntrol,
        dataType: 'json',
        data: { name: 'logan', id: 'id' },
        success: function (data, status) {
            if (typeof (data.error) != 'undefined') {
                if (data.error != '') {
                    alert(data.error);
                } else {
                    GetBulkXmlRecords("", data.FileName);
                }
            }
        },
        error: function (data, status, e) {
            alert("fn : BbSendFile : " + e.responseText);
        }
    });
    $.extend({
        handleError: function (s, xhr, status, e) {
            if (s.error)
                s.error(xhr, status, e);
            else if (xhr.responseText)
                console.log(xhr.responseText);
        }
    });
}

//to get the records from xml
function GetBulkXmlRecords(strVal1, fileName) {
    var strVal = fileName; lstBatchRecords = [];
    $.ajax({
        // url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetListFromXml",
        url: gStrIpVal + "HinduFranchiseeService.svc/GetListFromXml",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: '{"strVal": "' + strVal + '"}',
        dataType: 'json',
        async: true,
        success: function (data) {
            lstBatchRecords = data.GetListFromXmlResult;
            ProcessBulkBkgRecords(strVal);
            BbClearSelFiles();
        },
        error: function (jqXHR) {
            alert("fn : GetBulkXmlRecords : " + jqXHR.responseText);
        }
    });
}

//to process the bulk booking xml records
function ProcessBulkBkgRecords(strXmlFileName) {
    batchBkgTotalRecords = 0; BkgRecordsSuccessCnt = 0; BkgRecordsFailedCnt = 0;
    BkgSuccess = ""; BkgFailed = ""; lstLogDbRecords = [];
    //lstLogBatchDtls = [];//bkgno ~ client code ~ client name ~ rate type ~ pkg code ~ ro no ~ ro date ~ batch no
    lstLogBkgRecords = []; lstLogSuccessRecords = []; lstLogFailedRecords = [];
    if (lstBatchRecords.length > 0) {
        lstBkgRecords = []; var BkgNoTemp = ""; strRateType = "";
        $.each(lstBatchRecords, function (BkgInd, BkgVal) {
            if (BkgNoTemp == "") {
                strRateType = BkgVal.strRateType;
                BkgNoTemp = BkgVal.strBookingno; lstBkgRecords.push(BkgVal);
            }
            else if (BkgNoTemp != BkgVal.strBookingno) {
                batchBkgTotalRecords++; ValidateSchemeRecords();
                //lstLogBatchDtls.push(BkgVal.strBookingno + "~" + BkgVal.ClientCode + "~" + BkgVal.strClientName + "~" + BkgVal.strRateType + "~" +
                //    BkgVal.strSchemeCode + "~" + BkgVal.strRoNo + "~" + BkgVal.strRoDate + "~" + BkgVal.strBatchNo);
                strRateType = BkgVal.strRateType;
                BkgNoTemp = BkgVal.strBookingno; lstBkgRecords = []; lstBkgRecords.push(BkgVal); lstLogDbRecords = [];
            }
            else lstBkgRecords.push(BkgVal);
            if (BkgInd == lstBatchRecords.length - 1) {
                batchBkgTotalRecords++; ValidateSchemeRecords();
                //lstLogBatchDtls.push(BkgVal.strBookingno + "~" + BkgVal.ClientCode + "~" + BkgVal.strClientName + "~" + BkgVal.strRateType + "~" +
                //    BkgVal.strSchemeCode + "~" + BkgVal.strRoNo + "~" + BkgVal.strRoDate + "~" + BkgVal.strBatchNo);
            }
        });
        var msg = 'Batch File Name : ' + strXmlFileName;
        msg += '\nTotal Batch Records : ' + batchBkgTotalRecords.toString() + '\nSucceed : ' + BkgRecordsSuccessCnt.toString() + ', Failed : '
        + BkgRecordsFailedCnt.toString();
        if (BkgRecordsSuccessCnt > 0)
            msg += "\nSuccess Booking : " + BkgSuccess.toString();
        if (BkgRecordsFailedCnt > 0)
            msg += "\nFailed Booking : " + BkgFailed.toString();
        alert(msg);
    }
}

//to validate the schemes -> SP_FetchRate
function ValidateSchemeRecords() {
    lstRates = []; lstCalculatedNormRt = []; lstCalculatedNormRtFinal = [];
    var lstFailedRecords = []; var lstSuccessRecords = [];
    if (strRateType == "SP" || strRateType == "SCMP" || strRateType == "IEP") {

        //to get the extra SQ size
        var SqExtraSize = 0;
        var lstBkgRecordsCheck = []; var testObj = null;
        $.each(lstBkgRecords, function (indTest, DbValTest) {
            testObj = null; testObj = DbValTest;
            if (testObj.strUOMCode == "SQ") {
                if (SqExtraSize == 0 || parseFloat(DbValTest.strMinSize) < SqExtraSize) {
                    SqExtraSize = parseFloat(DbValTest.strMinSize);
                }
            }
        });

        $.each(lstBkgRecords, function (indTest, DbValTest) {
            testObj = null; testObj = DbValTest;
            if (testObj.strUOMCode == "SQ") {
                if (parseFloat(DbValTest.strMinSize) > SqExtraSize) {
                    testObj.strExtraLnCntSqSize = parseFloat(DbValTest.strMinSize) - SqExtraSize;
                }
            }
            lstBkgRecordsCheck.push(testObj);
        });

        lstBkgRecords = []; lstBkgRecords = lstBkgRecordsCheck;

        var lstBkgEachRec = null; var lstRecordsSorted = []; var selectedSchemes = []; var lstRecordsTemp = []; var lstRecordsTemp1 = [];
        var indexTempLoop = 0;
        if (strRateType == "SP") {
            if (lstScheme_SP_Records.length > 0) { }
            else BbGet_SP_SchemeRecords();
            if (lstScheme_SP_Records.length > 0) { }
            else {
                do {
                    BbGet_SP_SchemeRecords(); indexTempLoop++;
                } while (lstScheme_SP_Records.length < 0 && indexTempLoop <= 10);
            }
            lstRecordsSorted = lstScheme_SCMP_Records;
        }
        else if (strRateType == "SCMP") {
            if (lstScheme_SCMP_Records.length > 0) { }
            else BbGet_SCMP_SchemeRecords();
            if (lstScheme_SCMP_Records.length > 0) { }
            else {
                do {
                    BbGet_SCMP_SchemeRecords(); indexTempLoop++;
                } while (lstScheme_SCMP_Records.length < 0 && indexTempLoop <= 10);
            }
            lstRecordsSorted = lstScheme_SCMP_Records;
        }
        else if (strRateType == "IEP") {
            if (lstScheme_IEP_Records.length > 0) { }
            else BbGet_IEP_SchemeRecords();
            if (lstScheme_IEP_Records.length > 0) { }
            else {
                do {
                    BbGet_IEP_SchemeRecords(); indexTempLoop++;
                } while (lstScheme_IEP_Records.length < 0 && indexTempLoop <= 10);
            }
            lstRecordsSorted = lstScheme_IEP_Records;
        }
        if (lstRecordsSorted.length > 0) {
            //to get the scheme records which satisfy publn, prod, ad type, sub type/addn sub type, classfn/addn classfn, edn, eff from to, clr& bw rate
            var intBwAdsCount = 0; var intClrAdsCount = 0; var Temp = []; var schemeNameTemp = ""; var _blnSchemeSelected = false;
            var selectedScheme = ""; var TotalNoOfInsertions = -1;

            $.each(lstBkgRecords, function (indTest, DbValTest) {
                lstFailedRecords.push(DbValTest.strBookingno + "->" + DbValTest.stradvno + "~" + DbValTest.strRateType);
            });
            var blnBkgSuccess = true; var blnCheck = false;
            $.each(lstRecordsSorted, function (ind, DbVal) {
                blnCheck = false;
                if (DbVal.strNoofInsertions == lstBkgRecords.length) {
                    if (strRateType == "IEP") {
                        if ((parseInt(DbVal.strClrAdsCount) == intTempClrAdsCnt) || (parseInt(DbVal.strBwAdsCount) == intTempBwAdsCnt))
                            blnCheck = true;
                    }
                    else {
                        if ((parseInt(DbVal.strClrAdsCount) == intTempClrAdsCnt) && (parseInt(DbVal.strBwAdsCount) == intTempBwAdsCnt))
                            blnCheck = true;
                    }
                    if (blnCheck == true) {
                        if (schemeNameTemp == "")
                            schemeNameTemp = DbVal.strSchemeCode;
                        var _intBwAdsCount = 0; var _intClrAdsCount = 0;
                        if (schemeNameTemp != DbVal.strSchemeCode) {
                            if (TotalNoOfInsertions == (intBwAdsCount + intClrAdsCount)) {
                            }
                            else {
                                intBwAdsCount = 0; intClrAdsCount = 0; _intBwAdsCount = 0; _intClrAdsCount = 0;
                                schemeNameTemp = DbVal.strSchemeCode; _blnSchemeSelected = false;
                            }
                        }
                        if (_blnSchemeSelected == false || selectedScheme == "" || selectedScheme == DbVal.strSchemeCode) {
                            if (schemeNameTemp != DbVal.strSchemeCode) {
                                intBwAdsCount = 0; intClrAdsCount = 0;
                                schemeNameTemp = DbVal.strSchemeCode;
                            }
                            TotalNoOfInsertions = DbVal.strNoofInsertions;
                            $.each(lstBkgRecords, function (index, BkgValue) {
                                var ftSize = 0.0;
                                if (BkgValue.strUOMCode == "LN")
                                    ftSize = parseFloat(BkgValue.strLnCnt);
                                else if (BkgValue.strUOMCode == "SQ")
                                    ftSize = parseFloat(BkgValue.strWidth) * parseFloat(BkgValue.strHeight);
                                //with comb & MANADATORY Option
                                if (DbVal.strRateType == strRateType && BkgValue.strPublncode == DbVal.strPublncode /*publn*/ && BkgValue.strProductcode == DbVal.strProductcode /*prod*/
                                    && BkgValue.strAdTypeCode == DbVal.strAdTypeCode /*adtype*/ && BkgValue.strEditionCode == DbVal.strEditionCode /*edn*/
                                    && (BkgValue.strSubTypeCode == DbVal.strSubTypeCode /*sub type*/ ||
                                    (DbVal.strAddnSubType != "" && BkgValue.strAddnSubType != undefined && BkgValue.strAddnSubType == DbVal.strAddnSubType) /*addn sub type*/
                                    )
                                    && (BkgValue.StrComb_Code == DbVal.StrComb_Code /*combn if given*/ ||
                                    (DbVal.strAddnCatgCombn != "" && BkgValue.strAddnCatgCombn != undefined && BkgValue.strAddnCatgCombn == DbVal.strAddnCatgCombn) /*addn combn*/
                                    )
                                    && (BkgValue.strClassificationCode == DbVal.strClassificationCode /*clasfn*/ ||
                                    (DbVal.strAddnClasfn != "" && BkgValue.strAddnClasfn != undefined && BkgValue.strAddnClasfn == DbVal.strAddnClasfn) /*addn clasfn*/
                                    )
                                    && (chkSizes(ftSize, parseFloat(DbVal.strMinSize), parseFloat(DbVal.strMaxSize), parseFloat(DbVal.strAddnMinSize), parseFloat(DbVal.strAddnMaxSize)) == true)
                                    && (chkIssueDtBwnFromTo(DbVal.strEffectiveFrom, DbVal.strEffectiveTo, BkgValue.strIssueDate) == true)/*eff from & eff to*/
                                    && (DbVal.strDtlEffFrom == "" || (chkIssueDtBwnFromTo(DbVal.strDtlEffFrom, DbVal.strDtlEffTo, BkgValue.strIssueDate) == true))/*dtl from & eff to*/
                                    && (DbVal.strSchemeEffFrom == "" || (chkIssueDtBwnFromTo(DbVal.strSchemeEffFrom, DbVal.strSchemeEffTo, BkgValue.strIssueDate) == true))/*scheme eff from & eff to*/
                                    && (DbVal.strAddnEffFrom == "" || (chkIssueDtBwnFromTo(DbVal.strAddnEffFrom, DbVal.strAddnEffTo, BkgValue.strIssueDate) == true))/* addn eff from & eff to*/
                                    && (DbVal.strSchemeInsertionType.toUpperCase() == "MAN" || DbVal.strSchemeInsertionType.toUpperCase() == "MANDATORY")/*types*/
                                    && (DbVal.strDayCode == "ALL" || DbVal.strDayCode == BkgValue.strDayCode)
                                    && (DbVal.strProductFeature == "" || BkgValue.strProductFeature == DbVal.strProductFeature)
                                    && (BkgValue.strSchemeCode == DbVal.strSchemeCode)
                                    ) {
                                    var DbValTemp1 = DbVal; var blnAdd = false;
                                    if (parseInt(DbVal.strNoofInsertions) >= (intBwAdsCount + intClrAdsCount) && BkgValue.strClrBw == "B" && parseInt(DbVal.strBwAdsCount) > _intBwAdsCount) {
                                        DbValTemp1.strClrBw = "B"; blnAdd = true;
                                    }
                                    else if (parseInt(DbVal.strNoofInsertions) >= (intBwAdsCount + intClrAdsCount) && BkgValue.strClrBw == "C" && parseInt(DbVal.strClrAdsCount) > _intClrAdsCount) {
                                        DbValTemp1.strClrBw = "C"; blnAdd = true;
                                    }
                                    if (blnAdd == true) {
                                        lstFailedRecords.pop(DbValTemp1.strBookingno + "->" + DbValTemp1.stradvno + "~" + DbValTemp1.strRateType);
                                        if (lstRecordsTemp1.length > 0) {
                                            $.each(lstRecordsTemp1, function (ind, val) {
                                                if ($.inArray(DbValTemp1, lstRecordsTemp1) == -1) {
                                                    lstRecordsTemp1.push(DbValTemp1); lstRecordsTemp.push(DbValTemp1);
                                                    _blnSchemeSelected = true; selectedScheme = schemeNameTemp;
                                                    if (BkgValue.strClrBw == "C") _intClrAdsCount++;
                                                    if (BkgValue.strClrBw == "B") _intBwAdsCount++;
                                                    lstSuccessRecords.push(DbValTemp1.strBookingno + "->" + DbValTemp1.stradvno + "~" + DbValTemp1.strRateType);
                                                }
                                            });
                                        }
                                        else {
                                            lstRecordsTemp1.push(DbValTemp1); lstRecordsTemp.push(DbValTemp1);
                                            _blnSchemeSelected = true; selectedScheme = schemeNameTemp;
                                            if (BkgValue.strClrBw == "C") _intClrAdsCount++;
                                            if (BkgValue.strClrBw == "B") _intBwAdsCount++;
                                            lstSuccessRecords.push(DbValTemp1.strBookingno + "->" + DbValTemp1.stradvno + "~" + DbValTemp1.strRateType);
                                        }
                                    }
                                }
                                    //with comb - without MANADATORY Option
                                else if (DbVal.strRateType == strRateType && BkgValue.strPublncode == DbVal.strPublncode /*publn*/ && BkgValue.strProductcode == DbVal.strProductcode /*prod*/
                                    && BkgValue.strAdTypeCode == DbVal.strAdTypeCode /*adtype*/ && BkgValue.strEditionCode == DbVal.strEditionCode /*edn*/
                                    && (BkgValue.strSubTypeCode == DbVal.strSubTypeCode /*sub type*/ ||
                                    (DbVal.strAddnSubType != "" && BkgValue.strAddnSubType != undefined && BkgValue.strAddnSubType == DbVal.strAddnSubType) /*addn sub type*/
                                    )
                                    && (BkgValue.StrComb_Code == DbVal.StrComb_Code /*combn if given*/ ||
                                    (DbVal.strAddnCatgCombn != "" && BkgValue.strAddnCatgCombn != undefined && BkgValue.strAddnCatgCombn == DbVal.strAddnCatgCombn) /*addn combn*/
                                    )
                                    && (BkgValue.strClassificationCode == DbVal.strClassificationCode /*clasfn*/ ||
                                    (DbVal.strAddnClasfn != "" && BkgValue.strAddnClasfn != undefined && BkgValue.strAddnClasfn == DbVal.strAddnClasfn) /*addn clasfn*/
                                    )
                                    && (chkSizes(ftSize, parseFloat(DbVal.strMinSize), parseFloat(DbVal.strMaxSize), parseFloat(DbVal.strAddnMinSize), parseFloat(DbVal.strAddnMaxSize)) == true)
                                    && (chkIssueDtBwnFromTo(DbVal.strEffectiveFrom, DbVal.strEffectiveTo, BkgValue.strIssueDate) == true)/*eff from & eff to*/
                                    && (DbVal.strDtlEffFrom == "" || (chkIssueDtBwnFromTo(DbVal.strDtlEffFrom, DbVal.strDtlEffTo, BkgValue.strIssueDate) == true))/*dtl from & eff to*/
                                    && (DbVal.strSchemeEffFrom == "" || (chkIssueDtBwnFromTo(DbVal.strSchemeEffFrom, DbVal.strSchemeEffTo, BkgValue.strIssueDate) == true))/*scheme eff from & eff to*/
                                    && (DbVal.strAddnEffFrom == "" || (chkIssueDtBwnFromTo(DbVal.strAddnEffFrom, DbVal.strAddnEffTo, BkgValue.strIssueDate) == true))/* addn eff from & eff to*/
                                    //&& (DbVal.strSchemeInsertionType.toUpperCase() == "MAN" || DbVal.strSchemeInsertionType.toUpperCase() == "MANDATORY")/*types*/
                                    && (DbVal.strDayCode == "ALL" || DbVal.strDayCode == BkgValue.strDayCode)
                                    && (DbVal.strProductFeature == "" || BkgValue.strProductFeature == DbVal.strProductFeature)
                                    && (BkgValue.strSchemeCode == DbVal.strSchemeCode)
                                    ) {
                                    var DbValTemp1 = DbVal; var blnAdd = false;
                                    if (parseInt(DbVal.strNoofInsertions) >= (intBwAdsCount + intClrAdsCount) && BkgValue.strClrBw == "B" && parseInt(DbVal.strBwAdsCount) > _intBwAdsCount) {
                                        DbValTemp1.strClrBw = "B"; blnAdd = true;
                                    }
                                    else if (parseInt(DbVal.strNoofInsertions) >= (intBwAdsCount + intClrAdsCount) && BkgValue.strClrBw == "C" && parseInt(DbVal.strClrAdsCount) > _intClrAdsCount) {
                                        DbValTemp1.strClrBw = "C"; blnAdd = true;
                                    }
                                    if (blnAdd == true) {
                                        lstFailedRecords.pop(DbValTemp1.strBookingno + "->" + DbValTemp1.stradvno + "~" + DbValTemp1.strRateType);
                                        if (lstRecordsTemp1.length > 0) {
                                            $.each(lstRecordsTemp1, function (ind, val) {
                                                if ($.inArray(DbValTemp1, lstRecordsTemp1) == -1) {
                                                    lstRecordsTemp1.push(DbValTemp1); lstRecordsTemp.push(DbValTemp1);
                                                    _blnSchemeSelected = true; selectedScheme = schemeNameTemp;
                                                    if (BkgValue.strClrBw == "C") _intClrAdsCount++;
                                                    if (BkgValue.strClrBw == "B") _intBwAdsCount++;
                                                    lstSuccessRecords.push(DbValTemp1.strBookingno + "->" + DbValTemp1.stradvno + "~" + DbValTemp1.strRateType);
                                                }
                                            });
                                        }
                                        else {
                                            lstRecordsTemp1.push(DbValTemp1); lstRecordsTemp.push(DbValTemp1);
                                            _blnSchemeSelected = true; selectedScheme = schemeNameTemp;
                                            if (BkgValue.strClrBw == "C") _intClrAdsCount++;
                                            if (BkgValue.strClrBw == "B") _intBwAdsCount++;
                                            lstSuccessRecords.push(DbValTemp1.strBookingno + "->" + DbValTemp1.stradvno + "~" + DbValTemp1.strRateType);
                                        }
                                    }
                                }
                                    //without comb - with MANADATORY Option
                                else if (DbVal.strRateType == strRateType && BkgValue.strPublncode == DbVal.strPublncode /*publn*/ && BkgValue.strProductcode == DbVal.strProductcode /*prod*/
                                    && BkgValue.strAdTypeCode == DbVal.strAdTypeCode /*adtype*/ && BkgValue.strEditionCode == DbVal.strEditionCode /*edn*/
                                    && (BkgValue.strSubTypeCode == DbVal.strSubTypeCode /*sub type*/ ||
                                    (DbVal.strAddnSubType != "" && BkgValue.strAddnSubType != undefined && BkgValue.strAddnSubType == DbVal.strAddnSubType) /*addn sub type*/
                                    )
                                    && (DbVal.StrComb_Code == "" /*combn if given*/ ||
                                    (DbVal.strAddnCatgCombn != "" && BkgValue.strAddnCatgCombn != undefined && BkgValue.strAddnCatgCombn == DbVal.strAddnCatgCombn) /*addn combn*/
                                    )
                                    //&& (BkgValue.strClassificationCode == DbVal.strClassificationCode /*clasfn*/ ||
                                    && (DbVal.strClassificationCode == "" /*clasfn*/ ||
                                    (DbVal.strAddnClasfn != "" && BkgValue.strAddnClasfn != undefined && BkgValue.strAddnClasfn == DbVal.strAddnClasfn) /*addn clasfn*/
                                    )
                                    && (chkSizes(ftSize, parseFloat(DbVal.strMinSize), parseFloat(DbVal.strMaxSize), parseFloat(DbVal.strAddnMinSize), parseFloat(DbVal.strAddnMaxSize)) == true)
                                    && (chkIssueDtBwnFromTo(DbVal.strEffectiveFrom, DbVal.strEffectiveTo, BkgValue.strIssueDate) == true)/*eff from & eff to*/
                                    && (DbVal.strDtlEffFrom == "" || (chkIssueDtBwnFromTo(DbVal.strDtlEffFrom, DbVal.strDtlEffTo, BkgValue.strIssueDate) == true))/*dtl from & eff to*/
                                    && (DbVal.strSchemeEffFrom == "" || (chkIssueDtBwnFromTo(DbVal.strSchemeEffFrom, DbVal.strSchemeEffTo, BkgValue.strIssueDate) == true))/*scheme eff from & eff to*/
                                    && (DbVal.strAddnEffFrom == "" || (chkIssueDtBwnFromTo(DbVal.strAddnEffFrom, DbVal.strAddnEffTo, BkgValue.strIssueDate) == true))/* addn eff from & eff to*/
                                    && (DbVal.strSchemeInsertionType.toUpperCase() == "MAN" || DbVal.strSchemeInsertionType.toUpperCase() == "MANDATORY")/*types*/
                                    && (DbVal.strDayCode == "ALL" || DbVal.strDayCode == BkgValue.strDayCode)
                                    && (DbVal.strProductFeature == "" || BkgValue.strProductFeature == DbVal.strProductFeature)
                                    && (BkgValue.strSchemeCode == DbVal.strSchemeCode)
                                    ) {
                                    var DbValTemp1 = DbVal; var blnAdd = false;
                                    if (parseInt(DbVal.strNoofInsertions) >= (intBwAdsCount + intClrAdsCount) && BkgValue.strClrBw == "B" && parseInt(DbVal.strBwAdsCount) > _intBwAdsCount) {
                                        DbValTemp1.strClrBw = "B"; blnAdd = true;
                                    }
                                    else if (parseInt(DbVal.strNoofInsertions) >= (intBwAdsCount + intClrAdsCount) && BkgValue.strClrBw == "C" && parseInt(DbVal.strClrAdsCount) > _intClrAdsCount) {
                                        DbValTemp1.strClrBw = "C"; blnAdd = true;
                                    }
                                    if (blnAdd == true) {
                                        lstFailedRecords.pop(DbValTemp1.strBookingno + "->" + DbValTemp1.stradvno + "~" + DbValTemp1.strRateType);
                                        if (lstRecordsTemp1.length > 0) {
                                            $.each(lstRecordsTemp1, function (ind, val) {
                                                if ($.inArray(DbValTemp1, lstRecordsTemp1) == -1) {
                                                    lstRecordsTemp1.push(DbValTemp1); lstRecordsTemp.push(DbValTemp1);
                                                    _blnSchemeSelected = true; selectedScheme = schemeNameTemp;
                                                    if (BkgValue.strClrBw == "C") _intClrAdsCount++;
                                                    if (BkgValue.strClrBw == "B") _intBwAdsCount++;
                                                    lstSuccessRecords.push(DbValTemp1.strBookingno + "->" + DbValTemp1.stradvno + "~" + DbValTemp1.strRateType);
                                                }
                                            });
                                        }
                                        else {
                                            lstRecordsTemp1.push(DbValTemp1); lstRecordsTemp.push(DbValTemp1);
                                            _blnSchemeSelected = true; selectedScheme = schemeNameTemp;
                                            if (BkgValue.strClrBw == "C") _intClrAdsCount++;
                                            if (BkgValue.strClrBw == "B") _intBwAdsCount++;
                                            lstSuccessRecords.push(DbValTemp1.strBookingno + "->" + DbValTemp1.stradvno + "~" + DbValTemp1.strRateType);
                                        }
                                    }
                                }
                                    //without comb & MANADATORY Option
                                else if (DbVal.strRateType == strRateType && BkgValue.strPublncode == DbVal.strPublncode /*publn*/ && BkgValue.strProductcode == DbVal.strProductcode /*prod*/
                                    && BkgValue.strAdTypeCode == DbVal.strAdTypeCode /*adtype*/ && BkgValue.strEditionCode == DbVal.strEditionCode /*edn*/
                                    && (BkgValue.strSubTypeCode == DbVal.strSubTypeCode /*sub type*/ ||
                                    (DbVal.strAddnSubType != "" && BkgValue.strAddnSubType != undefined && BkgValue.strAddnSubType == DbVal.strAddnSubType) /*addn sub type*/
                                    )
                                    && (DbVal.StrComb_Code == "" /*combn if given*/ ||
                                    (DbVal.strAddnCatgCombn != "" && BkgValue.strAddnCatgCombn != undefined && BkgValue.strAddnCatgCombn == DbVal.strAddnCatgCombn) /*addn combn*/
                                    )
                                    //&& (BkgValue.strClassificationCode == DbVal.strClassificationCode /*clasfn*/ ||
                                    && (DbVal.strClassificationCode == "" /*clasfn*/ ||
                                    (DbVal.strAddnClasfn != "" && BkgValue.strAddnClasfn != undefined && BkgValue.strAddnClasfn == DbVal.strAddnClasfn) /*addn clasfn*/
                                    )
                                    && (chkSizes(ftSize, parseFloat(DbVal.strMinSize), parseFloat(DbVal.strMaxSize), parseFloat(DbVal.strAddnMinSize), parseFloat(DbVal.strAddnMaxSize)) == true)
                                    && (chkIssueDtBwnFromTo(DbVal.strEffectiveFrom, DbVal.strEffectiveTo, BkgValue.strIssueDate) == true)/*eff from & eff to*/
                                    && (DbVal.strDtlEffFrom == "" || (chkIssueDtBwnFromTo(DbVal.strDtlEffFrom, DbVal.strDtlEffTo, BkgValue.strIssueDate) == true))/*dtl from & eff to*/
                                    && (DbVal.strSchemeEffFrom == "" || (chkIssueDtBwnFromTo(DbVal.strSchemeEffFrom, DbVal.strSchemeEffTo, BkgValue.strIssueDate) == true))/*scheme eff from & eff to*/
                                    && (DbVal.strAddnEffFrom == "" || (chkIssueDtBwnFromTo(DbVal.strAddnEffFrom, DbVal.strAddnEffTo, BkgValue.strIssueDate) == true))/* addn eff from & eff to*/
                                    //&& (DbVal.strSchemeInsertionType.toUpperCase() == "MAN" || DbVal.strSchemeInsertionType.toUpperCase() == "MANDATORY")/*types*/
                                    && (DbVal.strDayCode == "ALL" || DbVal.strDayCode == BkgValue.strDayCode)
                                    && (DbVal.strProductFeature == "" || BkgValue.strProductFeature == DbVal.strProductFeature)
                                    && (BkgValue.strSchemeCode == DbVal.strSchemeCode)
                                    ) {
                                    var DbValTemp1 = DbVal; var blnAdd = false;
                                    if (parseInt(DbVal.strNoofInsertions) >= (intBwAdsCount + intClrAdsCount) && BkgValue.strClrBw == "B" && parseInt(DbVal.strBwAdsCount) > _intBwAdsCount) {
                                        DbValTemp1.strClrBw = "B"; blnAdd = true;
                                    }
                                    else if (parseInt(DbVal.strNoofInsertions) >= (intBwAdsCount + intClrAdsCount) && BkgValue.strClrBw == "C" && parseInt(DbVal.strClrAdsCount) > _intClrAdsCount) {
                                        DbValTemp1.strClrBw = "C"; blnAdd = true;
                                    }
                                    if (blnAdd == true) {
                                        lstFailedRecords.pop(DbValTemp1.strBookingno + "->" + DbValTemp1.stradvno + "~" + DbValTemp1.strRateType);
                                        if (lstRecordsTemp1.length > 0) {
                                            $.each(lstRecordsTemp1, function (ind, val) {
                                                if ($.inArray(DbValTemp1, lstRecordsTemp1) == -1) {
                                                    lstRecordsTemp1.push(DbValTemp1); lstRecordsTemp.push(DbValTemp1);
                                                    _blnSchemeSelected = true; selectedScheme = schemeNameTemp;
                                                    if (BkgValue.strClrBw == "C") _intClrAdsCount++;
                                                    if (BkgValue.strClrBw == "B") _intBwAdsCount++;
                                                    lstSuccessRecords.push(DbValTemp1.strBookingno + "->" + DbValTemp1.stradvno + "~" + DbValTemp1.strRateType);
                                                }
                                            });
                                        }
                                        else {
                                            lstRecordsTemp1.push(DbValTemp1); lstRecordsTemp.push(DbValTemp1);
                                            _blnSchemeSelected = true; selectedScheme = schemeNameTemp;
                                            if (BkgValue.strClrBw == "C") _intClrAdsCount++;
                                            if (BkgValue.strClrBw == "B") _intBwAdsCount++;
                                            lstSuccessRecords.push(DbValTemp1.strBookingno + "->" + DbValTemp1.stradvno + "~" + DbValTemp1.strRateType);
                                        }
                                    }
                                }
                            });
                            intBwAdsCount += _intBwAdsCount; intClrAdsCount += _intClrAdsCount;
                        }
                    }
                }
            });
            //to restrict for 1 scheme
            var ScName = ""; var lstTemp = [];
            $.each(lstRecordsTemp, function (ind, DbVal) {
                if (ScName == "" || ScName == DbVal.strSchemeCode) {
                    ScName = DbVal.strSchemeCode;
                    lstTemp.push(DbVal);
                }
            });
            lstRecordsTemp = lstTemp;
            if (lstRecordsTemp.length > 0) {
                BbCalCulateSchemeRate(lstRecordsTemp);
            }
            CheckList(lstFailedRecords, lstSuccessRecords);
        }
    }
    else if (strRateType == "TP") {
        BbGetSchemeForTieUp();
        CheckList(lstFailedRecords, lstSuccessRecords);
    }
    else if (strRateType == "MEDCLNTDISC") {
        BbValidateMED();
        CheckList(lstFailedRecords, lstSuccessRecords);
    }
    else if (strRateType == "IS") {
        BbValidateIS();
        CheckList(lstFailedRecords, lstSuccessRecords);
    }
    else if (strRateType == "CARD") {
        if (lstCardRateMaster.length > 0) { }
        else BbGetRatesFromCardRateMaster();
        var indexTempLoop = 0;
        if (lstCardRateMaster.length > 0) { }
        else {
            do {
                BbGetRatesFromCardRateMaster(); indexTempLoop++;
            } while (lstCardRateMaster.length < 0 && indexTempLoop <= 10);
        }
        if (lstCardRateMaster.length > 0)
            BbRateFromRateMaster("CardRateMaster");
    }
    //to log
    if (strRateType == "SP" || strRateType == "SCMP" || strRateType == "IEP" || strRateType == "TP" || strRateType == "MEDCLNTDISC"
        || strRateType == "IS") {

        CheckList(lstFailedRecords, lstSuccessRecords);
    }
    if (strRateType == "SP" || strRateType == "SCMP" || strRateType == "IEP" || strRateType == "TP" || strRateType == "MEDCLNTDISC"
        || strRateType == "IS" || strRateType == "CARD")
        LogBulkBkgStatus();
}

//to log into db
function LogBulkBkgStatus() {
    var HshBookingtmplst = [];
    $(lstLogDbRecords).each(function (LogInd, LogVal) {
        var HshBookingtmp = [];
        HshBookingtmp.strBookingno = LogVal.strBookingno; HshBookingtmp.strRoNo = LogVal.strRoNo;
        HshBookingtmp.strRoDate = LogVal.strRoDate; HshBookingtmp.ClientCode = LogVal.ClientCode;
        HshBookingtmp.strClientName = LogVal.strClientName; HshBookingtmp.ClientAddr1 = LogVal.ClientAddr1;
        HshBookingtmp.ClientAddr2 = LogVal.ClientAddr2; HshBookingtmp.ClientAddr3 = LogVal.ClientAddr3;
        HshBookingtmp.ClientCity = LogVal.ClientCity; HshBookingtmp.strRateType = LogVal.strRateType;
        HshBookingtmp.strSchemeCode = LogVal.strSchemeCode; HshBookingtmp.ClassifiedsClasfn = LogVal.ClassifiedsClasfn;
        HshBookingtmp.ProductFeatureDisc = LogVal.ProductFeatureDisc; HshBookingtmp.strNoofInsertions = LogVal.strNoofInsertions;
        HshBookingtmp.BoxNo = LogVal.BoxNo; HshBookingtmp.RedirectAddr = LogVal.RedirectAddr;
        HshBookingtmp.PostageType = LogVal.PostageType; HshBookingtmp.AddressText = LogVal.AddressText;
        HshBookingtmp.PackageRate = LogVal.PackageRate; HshBookingtmp.strbkgDate = LogVal.strbkgDate;
        HshBookingtmp.BkgValue = LogVal.BkgValue; HshBookingtmp.SplDiscPercentage = LogVal.SplDiscPercentage;

        HshBookingtmp.stradvno = LogVal.stradvno; HshBookingtmp.strPublncode = LogVal.strPublncode;
        HshBookingtmp.strProductcode = LogVal.strProductcode; HshBookingtmp.strEditionCode = LogVal.strEditionCode;
        HshBookingtmp.strFeatureCode = LogVal.strFeatureCode; HshBookingtmp.strIssueDate = LogVal.strIssueDate;
        HshBookingtmp.strSubTypeCode = LogVal.strSubTypeCode; HshBookingtmp.strClassificationCode = LogVal.strClassificationCode;
        HshBookingtmp.StrComb_Code = LogVal.StrComb_Code; HshBookingtmp.strClrBw = LogVal.strClrBw;
        HshBookingtmp.strTintValue = LogVal.strTintValue; HshBookingtmp.strHeight = LogVal.strHeight;
        HshBookingtmp.strWidth = LogVal.strWidth; HshBookingtmp.Area = LogVal.Area;
        HshBookingtmp.StrArea = LogVal.StrArea; HshBookingtmp.strCardRate = LogVal.strCardRate;
        HshBookingtmp.RoRate = LogVal.RoRate; HshBookingtmp.strAdAmt = LogVal.strAdAmt;
        HshBookingtmp.Caption = LogVal.Caption; HshBookingtmp.strAdvText = LogVal.strAdvText;
        HshBookingtmp.ActualNoOfLines = LogVal.ActualNoOfLines; HshBookingtmp.SchemeSeqNo = LogVal.SchemeSeqNo;

        HshBookingtmp.strUOMCode = LogVal.strUOMCode; HshBookingtmp.strMaxSize = LogVal.strMaxSize;
        HshBookingtmp.strMinSize = LogVal.strMinSize; HshBookingtmp.strLnCnt = LogVal.strLnCnt;
        HshBookingtmp.strExtraLnCntSqSize = LogVal.strExtraLnCntSqSize; HshBookingtmp.strMinLnCntSqSize = LogVal.strMinLnCntSqSize;
        HshBookingtmp.strAdTypeCode = LogVal.strAdTypeCode; HshBookingtmp.strDayCode = LogVal.strDayCode;
        HshBookingtmp.strBatchNo = LogVal.strBatchNo; HshBookingtmp.strAdStatus = LogVal.strAdStatus;
        HshBookingtmp.strUploadedFileName = LogVal.strUploadedFileName; HshBookingtmp.strFranchiseFileName = LogVal.strFranchiseFileName;
        HshBookingtmp.strIASBkgNo = LogVal.strIASBkgNo; HshBookingtmp.strIASAdNo = LogVal.strIASAdNo;
        HshBookingtmp.strFranchiseFileName = BulkFileName; HshBookingtmp.strBkgUserId = userLoggedId

        HshBookingtmplst.push({
            strBookingno: HshBookingtmp.strBookingno, strRoNo: HshBookingtmp.strRoNo,
            strRoDate: HshBookingtmp.strRoDate, ClientCode: HshBookingtmp.ClientCode,
            strClientName: HshBookingtmp.strClientName, ClientAddr1: HshBookingtmp.ClientAddr1,
            ClientAddr2: HshBookingtmp.ClientAddr2, ClientAddr3: HshBookingtmp.ClientAddr3,
            ClientCity: HshBookingtmp.ClientCity, strRateType: HshBookingtmp.strRateType,
            strSchemeCode: HshBookingtmp.strSchemeCode, ClassifiedsClasfn: HshBookingtmp.ClassifiedsClasfn,
            ProductFeatureDisc: HshBookingtmp.ProductFeatureDisc, strNoofInsertions: HshBookingtmp.strNoofInsertions,
            BoxNo: HshBookingtmp.BoxNo, RedirectAddr: HshBookingtmp.RedirectAddr,
            PostageType: HshBookingtmp.PostageType, AddressText: HshBookingtmp.AddressText,
            PackageRate: HshBookingtmp.PackageRate, strbkgDate: HshBookingtmp.strbkgDate,
            BkgValue: HshBookingtmp.BkgValue, SplDiscPercentage: HshBookingtmp.SplDiscPercentage,

            stradvno: HshBookingtmp.stradvno, strPublncode: HshBookingtmp.strPublncode,
            strProductcode: HshBookingtmp.strProductcode, strEditionCode: HshBookingtmp.strEditionCode,
            strFeatureCode: HshBookingtmp.strFeatureCode, strIssueDate: HshBookingtmp.strIssueDate,
            strSubTypeCode: HshBookingtmp.strSubTypeCode, strClassificationCode: HshBookingtmp.strClassificationCode,
            StrComb_Code: HshBookingtmp.StrComb_Code, strClrBw: HshBookingtmp.strClrBw,
            strTintValue: HshBookingtmp.strTintValue, strHeight: HshBookingtmp.strHeight,
            strWidth: HshBookingtmp.strWidth, Area: HshBookingtmp.Area,
            StrArea: HshBookingtmp.StrArea, strCardRate: HshBookingtmp.strCardRate,
            RoRate: HshBookingtmp.RoRate, strAdAmt: HshBookingtmp.strAdAmt,
            Caption: HshBookingtmp.Caption, strAdvText: HshBookingtmp.strAdvText,
            ActualNoOfLines: HshBookingtmp.ActualNoOfLines, SchemeSeqNo: HshBookingtmp.SchemeSeqNo,

            strUOMCode: HshBookingtmp.strUOMCode, strMaxSize: HshBookingtmp.strMaxSize,
            strMinSize: HshBookingtmp.strMinSize, strLnCnt: HshBookingtmp.strLnCnt,
            strExtraLnCntSqSize: HshBookingtmp.strExtraLnCntSqSize, strMinLnCntSqSize: HshBookingtmp.strMinLnCntSqSize,
            strAdTypeCode: HshBookingtmp.strAdTypeCode, strDayCode: HshBookingtmp.strDayCode,
            strBatchNo: HshBookingtmp.strBatchNo, strAdStatus: HshBookingtmp.strAdStatus,
            strUploadedFileName: HshBookingtmp.strUploadedFileName, strFranchiseFileName: HshBookingtmp.strFranchiseFileName,
            strIASBkgNo: HshBookingtmp.strIASBkgNo, strIASAdNo: HshBookingtmp.strIASAdNo,
            strFranchiseFileName: HshBookingtmp.strFranchiseFileName, strBkgUserId: HshBookingtmp.strBkgUserId
        });
    });

    var jData = {};
    var arghasBookingDtl = JSON.stringify(HshBookingtmplst);
    jData.hashstr = arghasBookingDtl.toString();
    $.ajax({
        // url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/InsertLogBulkBooking",
        url: gStrIpVal + "HinduFranchiseeService.svc/InsertLogBulkBooking",
        cache: false,
        type: "POST",
        async: false,
        data: JSON.stringify(jData),
        contentType: "application/json",
        returnType: 'json',
        success: function (data) {
            var txt = data.childNodes[0].textContent;
            
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}

//to check for success or failed
function CheckList(lstFailedRecords, lstSuccessRecords) {
    var blnBkgSuccess = true;
    lstFailedRecords = []; lstSuccessRecords = []; lstLogDbRecords = [];
    //to check the rate for each ad
    try {
        $.each(lstBkgRecords, function (BkgIndTemp, BkgValTemp) {
            $.each(lstCalculatedNormRt, function (RateIndTemp, RateValTemp) {
                try {
                    if (BkgIndTemp == RateIndTemp) {
                        if (parseFloat(BkgValTemp.strAdAmt) == parseFloat(lstCalculatedNormRt[RateIndTemp].split('*')[3])) {
                            lstSuccessRecords.push(BkgValTemp.strBookingno + "->" + BkgValTemp.stradvno + "~" + BkgValTemp.strRateType);
                            var tempObj = BkgValTemp; tempObj.strAdStatus = "SUCCESS";
                            lstLogDbRecords.push(tempObj);
                        }
                        else {
                            lstFailedRecords.push(BkgValTemp.strBookingno + "->" + BkgValTemp.stradvno + "~" + BkgValTemp.strRateType);
                            var tempObj = BkgValTemp; tempObj.strAdStatus = "FAILED";
                            lstLogDbRecords.push(tempObj);
                        }
                        return;
                    }
                } catch (e) {
                    lstFailedRecords.push(BkgValTemp.strBookingno + "->" + BkgValTemp.stradvno + "~" + BkgValTemp.strRateType);
                    var tempObj = BkgValTemp; tempObj.strAdStatus = "FAILED";
                    lstLogDbRecords.push(tempObj);
                }
            });
        });
    } catch (e) { }

    if (lstFailedRecords.length > 0) blnBkgSuccess = false;
    $.each(lstFailedRecords, function (indexTest, valTest) {
        if (BkgFailed == "") BkgFailed += ", ";
        BkgFailed += valTest + "-FAILED"; lstLogFailedRecords.push(valTest + "-FAILED"); lstLogBkgRecords.push(valTest.split('~')[0].trim());
    });
    $.each(lstSuccessRecords, function (indexTest, valTest) {
        if (BkgSuccess != "") BkgSuccess += ", ";
        BkgSuccess += valTest + "-SUCCESS"; lstLogSuccessRecords.push(valTest + "-SUCCESS"); lstLogBkgRecords.push(valTest.split('~')[0].trim());
    });

    if (blnBkgSuccess == true)
        BkgRecordsSuccessCnt++;
    else
        BkgRecordsFailedCnt++;
}

//check for amt
function CheckRateApplicable(BkgVal, DbVal) {
    var db = 0; var blnResult = false; var BkgAdVal = parseFloat(BkgVal.strAdAmt);
    var dbRate = 0; var dbMinRate = 0;
    if (BkgVal.strUOMCode == "LN") {
        if (BkgVal.strClrBw == "B") { dbRate = parseFloat(DbVal.strRateBW); dbMinRate = parseFloat(DbVal.strBWMinValue); }
        else { dbRate = parseFloat(DbVal.strRateColor); dbMinRate = parseFloat(DbVal.strClrMinValue); }
        var lnMinCnt = 0; var lnExtraCnt = 0;
        var dbLnCnt = 0;
        if ((parseFloat(BkgVal.ActualNoOfLines) - parseFloat(BkgVal.strMinSize)) > 0) {
            dbLnCnt = parseFloat(BkgVal.ActualNoOfLines) - parseFloat(BkgVal.strMinSize);
            db = dbMinRate + (parseFloat(dbLnCnt) * parseFloat(dbRate));
        }
        else
            db = parseFloat(dbMinRate);
    }
    else {
        if (BkgVal.strClrBw == "B") dbRate = parseFloat(DbVal.strRateBW);
        else dbRate = parseFloat(DbVal.strRateColor);
        db = parseFloat(BkgVal.strMinSize) * parseFloat(dbRate);
    }
    if (db == parseFloat(BkgAdVal))
        blnResult = true;
    return blnResult;
}

//to find in client rate master or card rate master
function BbRateFromRateMaster(strMaster) {
    var strRateMultipleRecord = ""; var blnRecord = false; var blnBkgSuccess = true;
    $.each(lstBkgRecords, function (inx, BkgVal) {
        blnRecord = false;
        var test = ""; var blnHasRecord = false; var DbValTemp = ""; strRateMultipleRecord = "";
        for (var intComb = 0; intComb < 2; intComb++) {
            if (intComb == 0 && (strMaster == "ClientRateMaster" || strMaster == "CheckInBoth")) {
                $.each(lstClientRateMaster, function (DbInx, DbVal) {
                    if (DbVal.strPublncode == BkgVal.strPublncode && DbVal.strProductcode == BkgVal.strProductcode
                        && DbVal.strEditionCode == BkgVal.strEditionCode && DbVal.StrComb_Code == BkgVal.StrComb_Code
                        && DbVal.strSubTypeCode == BkgVal.strSubTypeCode && DbVal.strUOMCode == BkgVal.strUOMCode
                        && DbVal.strAdTypeCode == BkgVal.strAdTypeCode
                        && parseFloat(DbVal.strMinSize) <= parseFloat(BkgVal.strMinSize) && parseFloat(DbVal.strMaxSize) >= parseFloat(BkgVal.strMinSize)
                        && (DbVal.strDayCode == "ALL" || DbVal.strDayCode == BkgVal.strDayCode)
                        && (chkIssueDtBwnFromTo(DbVal.strEffectiveFrom, DbVal.strEffectiveTo, BkgVal.strIssueDate) == true)
                        && (DbVal.strProductFeature == "" || DbVal.strProductFeature == BkgVal.strFeatureCode)
                        && (CheckRateApplicable(BkgVal, DbVal) == true || (strMaster == "CheckInBoth"))
                        ) {
                        DbValTemp = DbVal; blnHasRecord = true;
                    }
                });
            }
            else if (intComb == 1 && blnHasRecord == false && (strMaster == "ClientRateMaster" || strMaster == "CheckInBoth")) {//without combn code
                $.each(lstClientRateMaster, function (DbInx, DbVal) {
                    if (DbVal.strPublncode == BkgVal.strPublncode && DbVal.strProductcode == BkgVal.strProductcode
                        && DbVal.strEditionCode == BkgVal.strEditionCode && DbVal.StrComb_Code == ""
                        && DbVal.strSubTypeCode == BkgVal.strSubTypeCode && DbVal.strUOMCode == BkgVal.strUOMCode
                        && DbVal.strAdTypeCode == BkgVal.strAdTypeCode
                        && parseFloat(DbVal.strMinSize) <= parseFloat(BkgVal.strMinSize) && parseFloat(DbVal.strMaxSize) >= parseFloat(BkgVal.strMinSize)
                        && (chkIssueDtBwnFromTo(DbVal.strEffectiveFrom, DbVal.strEffectiveTo, BkgVal.strIssueDate) == true)
                        && (DbVal.strDayCode == "ALL" || DbVal.strDayCode == BkgVal.strDayCode)
                        && (DbVal.strProductFeature == "" || DbVal.strProductFeature == BkgVal.strFeatureCode)
                        && (CheckRateApplicable(BkgVal, DbVal) == true || (strMaster == "CheckInBoth"))
                        ) {
                        DbValTemp = DbVal; blnHasRecord = true;
                    }
                });
            }
        }
        if (blnHasRecord == false) {
            for (var intComb = 0; intComb < 2; intComb++) {
                if (intComb == 0 && (strMaster == "CardRateMaster" || strMaster == "CheckInBoth")) {
                    $.each(lstCardRateMaster, function (DbInx, DbVal) {
                        if (DbVal.strPublncode == BkgVal.strPublncode && DbVal.strProductcode == BkgVal.strProductcode
                            && DbVal.strEditionCode == BkgVal.strEditionCode && DbVal.StrComb_Code == BkgVal.StrComb_Code
                            && DbVal.strSubTypeCode == BkgVal.strSubTypeCode && DbVal.strUOMCode == BkgVal.strUOMCode
                            && DbVal.strAdTypeCode == BkgVal.strAdTypeCode
                            && parseFloat(DbVal.strMinSize) <= parseFloat(BkgVal.strMinSize) && parseFloat(DbVal.strMaxSize) >= parseFloat(BkgVal.strMinSize)
                            && (DbVal.strDayCode == "ALL" || DbVal.strDayCode == BkgVal.strDayCode)
                            && (chkIssueDtBwnFromTo(DbVal.strEffectiveFrom, DbVal.strEffectiveTo, BkgVal.strIssueDate) == true)
                            && (DbVal.strProductFeature == "" || DbVal.strProductFeature == BkgVal.strFeatureCode)
                            && (CheckRateApplicable(BkgVal, DbVal) == true || (strMaster == "CheckInBoth"))
                            ) {
                            DbValTemp = DbVal; blnHasRecord = true;
                        }
                    });
                }
                else if (intComb == 1 && (strMaster == "CardRateMaster" || strMaster == "CheckInBoth")) {// && blnHasRecord == false) {//without combn code
                    $.each(lstCardRateMaster, function (DbInx, DbVal) {
                        if (DbVal.strPublncode == BkgVal.strPublncode && DbVal.strProductcode == BkgVal.strProductcode
                            && DbVal.strEditionCode == BkgVal.strEditionCode && DbVal.StrComb_Code == ""
                            && DbVal.strSubTypeCode == BkgVal.strSubTypeCode && DbVal.strUOMCode == BkgVal.strUOMCode
                            && DbVal.strAdTypeCode == BkgVal.strAdTypeCode
                            && parseFloat(DbVal.strMinSize) <= parseFloat(BkgVal.strMinSize) && parseFloat(DbVal.strMaxSize) >= parseFloat(BkgVal.strMinSize)
                            && (chkIssueDtBwnFromTo(DbVal.strEffectiveFrom, DbVal.strEffectiveTo, BkgVal.strIssueDate) == true)
                            && (DbVal.strDayCode == "ALL" || DbVal.strDayCode == BkgVal.strDayCode)
                            && (DbVal.strProductFeature == "" || DbVal.strProductFeature == BkgVal.strFeatureCode)
                            && (CheckRateApplicable(BkgVal, DbVal) == true || (strMaster == "CheckInBoth"))
                            ) {
                            DbValTemp = DbVal; blnHasRecord = true;
                        }
                    });
                }
            }
        }
        //to get rate value
        if (blnHasRecord == true) {
            if (strRateMultipleRecord == "No") {
                
                alert('Multiple Entry for Rate'); strRateMultipleRecord = "Yes"; return;
            }
            if (strMaster == "CardRateMaster")
                blnRecord = true;
            else if (strMaster == "CheckInBoth") {
                var AdDtls = lstCalculatedNormRt[inx]; var arrAdDtls = AdDtls.split('*'); var AdAmtMinTemp = AdDtls.split('*')[2];

                var _strBWMinValueTemp = AdAmtMinTemp.split('~')[0]; var _strRateBWTemp = AdAmtMinTemp.split('~')[1];
                var _strClrMinValueTemp = AdAmtMinTemp.split('~')[2]; var _strRateClrTemp = AdAmtMinTemp.split('~')[3];
                var AdClrBwTemp = AdDtls.split('*')[6]; var AdAmtTemp = AdDtls.split('*')[3]; var AdExtraAmt = AdDtls.split('*')[4];
                var AdFreePaid = AdDtls.split('*')[9].split('-')[0]; var AdLNSQ = AdDtls.split('*')[9].split('-')[3];
                var AdMinLnSQCnt = AdDtls.split('*')[9].split('-')[1]; var AdExtraLnSQCnt = AdDtls.split('*')[9].split('-')[2];

                var dbAmtTemp = 0; var bwMinAmt = 0; var bwAmt = 0; var clrMinAmt = 0; var clrAmt = 0;
                if (AdClrBwTemp == "B") {
                    bwMinAmt = parseFloat(DbValTemp.strBWMinValue); bwAmt = parseFloat(DbValTemp.strRateBW);
                    if (_strRateBWTemp == undefined || _strRateBWTemp == "" || _strRateBWTemp == null || _strRateBWTemp == NaN) {
                        _strRateBWTemp = bwAmt.toString(); AdExtraAmt = bwAmt.toString();
                    }
                    if (AdLNSQ == "LN") {
                        if (_strBWMinValueTemp == undefined || _strBWMinValueTemp == "" || _strBWMinValueTemp == "0" || _strBWMinValueTemp == null || _strBWMinValueTemp == NaN) {
                            _strBWMinValueTemp = bwMinAmt.toString();
                            dbAmtTemp = parseFloat(bwMinAmt) + (parseFloat(AdExtraLnSQCnt) * parseFloat(_strRateBWTemp));
                        }
                        else {
                            dbAmtTemp = parseFloat(_strBWMinValueTemp) + (parseFloat(AdExtraLnSQCnt) * parseFloat(_strRateBWTemp));
                        }
                    }
                    else
                        dbAmtTemp = (parseFloat(AdMinLnSQCnt) * parseFloat(_strRateBWTemp)) + (parseFloat(AdExtraLnSQCnt) * parseFloat(_strRateBWTemp));
                }
                else if (AdClrBwTemp == "C") {
                    clrMinAmt = parseFloat(DbValTemp.strClrMinValue); clrAmt = parseFloat(DbValTemp.strRateColor);
                    if (_strRateClrTemp == undefined || _strRateClrTemp == "" || _strRateClrTemp == null || _strRateClrTemp == NaN) {
                        _strRateClrTemp = clrAmt.toString(); AdExtraAmt = clrAmt.toString();
                    }
                    if (AdLNSQ == "LN") {
                        if (_strClrMinValueTemp == undefined || _strClrMinValueTemp == "" || _strClrMinValueTemp == "0" || _strClrMinValueTemp == null || _strClrMinValueTemp == NaN) {
                            _strClrMinValueTemp = clrMinAmt.toString();
                            dbAmtTemp = parseFloat(clrMinAmt) + (parseFloat(AdExtraLnSQCnt) * parseFloat(_strRateClrTemp));
                        }
                        else {
                            dbAmtTemp = parseFloat(_strClrMinValueTemp) + (parseFloat(AdExtraLnSQCnt) * parseFloat(_strRateClrTemp));
                        }
                    }
                    else
                        dbAmtTemp = (parseFloat(AdMinLnSQCnt) * parseFloat(_strRateClrTemp)) + (parseFloat(AdExtraLnSQCnt) * parseFloat(_strRateClrTemp));;
                }
                arrAdDtls[2] = _strBWMinValueTemp + "~" + _strRateBWTemp + "~" + _strClrMinValueTemp + "~" + _strRateClrTemp;
                arrAdDtls[3] = dbAmtTemp.toString(); arrAdDtls[4] = AdExtraAmt.toString();
                arrAdDtls = arrAdDtls.toString().replace(/\,/g, '*');
                lstCalculatedNormRt[inx] = arrAdDtls.toString();
            }
            if (strRateMultipleRecord == "") strRateMultipleRecord = "No";
        }
        if (strMaster == "CardRateMaster") {
            if (blnRecord == true) {
                if (BkgSuccess != "") BkgSuccess += ", ";
                BkgSuccess += "\n" + BkgVal.strBookingno + "->" + BkgVal.stradvno + "~" + BkgVal.strRateType + "-SUCCESS";
                lstLogSuccessRecords.push(BkgVal.strBookingno + "->" + BkgVal.stradvno + "~" + BkgVal.strRateType + "-SUCCESS");
                lstLogBkgRecords.push(BkgVal.strBookingno);
                var tempObj = BkgVal; tempObj.strAdStatus = "SUCCESS";
                lstLogDbRecords.push(tempObj);
            }
            else {
                blnBkgSuccess = false;
                if (BkgFailed != "") BkgFailed += ", ";
                BkgFailed += "\n" + BkgVal.strBookingno + "->" + BkgVal.stradvno + "~" + BkgVal.strRateType + "-FAILED";
                lstLogFailedRecords.push(BkgVal.strBookingno + "->" + BkgVal.stradvno + "~" + BkgVal.strRateType + "-FAILED");
                lstLogBkgRecords.push(BkgVal.strBookingno);
                var tempObj = BkgVal; tempObj.strAdStatus = "FAILED";
                lstLogDbRecords.push(tempObj);
            }
        }
    });
    if (strMaster == "CardRateMaster") {
        if (blnBkgSuccess == true)
            BkgRecordsSuccessCnt++;
        else
            BkgRecordsFailedCnt++;
    }
}

//to calculate the scheme rate -> CalCulateSchemeRate
function BbCalCulateSchemeRate(arrSchemeRecords) {
    var intActualLNCnt = 0; var intMinLNCnt = 0; var intExtraLNCnt = 0; var intMInValue = 0; var intPerLnValue = 0;
    var dblAmt = 0; var dblTotalAmt = 0; var lstFreeAds = []; var strFreeAds = ""; var strNoOfIns = ""; var TempSchemeName = "";
    var strTotFreeAdsScmp = parseInt(arrSchemeRecords[0].strBwFreeAds) + parseInt(arrSchemeRecords[0].strClrFreeAds);
    var strTotPaidAdsScmp = parseInt(arrSchemeRecords[0].strBwPaidAds) + parseInt(arrSchemeRecords[0].strClrPaidAds);
    var strSchemeCodeSCMP = arrSchemeRecords[0].strSchemeCode;

    intFreeAds = 0; intPaidAds = 0; lstAmt = []; intTotalFreeAds = undefined; intTotalPaidAds = undefined;
    var intDbFreeAds = 0; var intDbPaidAds = 0; lstCalculatedNormRt = []; lstCalculatedNormRtFinal = []; var RecAdded_lstCalculatedNormRt = 0;
    var lstBkgRecordsFinal = []; var tempBkgVal = null; var tempDbVal = null; var SchemeRowIndex = -1;
    var FreeAdIns = -1; var PaidAdIns = -1; var TotalAdIns = -1;
    $.each(arrSchemeRecords, function (ind, DbVal) {
        SchemeRowIndex = ind; TempSchemeName = DbVal.strSchemeCode;
        intTotalFreeAds = parseInt(DbVal.strTotalFreeAds);
        intTotalPaidAds = parseInt(DbVal.strTotalPaidAds);
        strNoOfIns = DbVal.strNoofInsertions;
        if (strRateType == "SP") {
            intFreeAds = 0; intPaidAds = 0;
        }
        $.each(lstBkgRecords, function (inx, BkgVal) {
            tempDbVal = ""; tempBkgVal = "";
            if (FreeAdIns == -1 && BkgVal.strClrBw == 'B' && DbVal.strBwFreeAds != "" && parseInt(DbVal.strBwFreeAds) > 0)
                FreeAdIns = parseInt(DbVal.strBwFreeAds);
            else if (FreeAdIns == -1 && BkgVal.strClrBw == 'C' && DbVal.strClrFreeAds != "" && parseInt(DbVal.strClrFreeAds) > 0)
                FreeAdIns = parseInt(DbVal.strClrFreeAds);

            if (PaidAdIns == -1 && BkgVal.strClrBw == 'B' && DbVal.strBwPaidAds != "" && parseInt(DbVal.strBwPaidAds) > 0)
                PaidAdIns = parseInt(DbVal.strBwPaidAds);
            else if (PaidAdIns == -1 && BkgVal.strClrBw == 'C' && DbVal.strClrPaidAds != "" && parseInt(DbVal.strClrPaidAds) > 0)
                PaidAdIns = parseInt(DbVal.strClrPaidAds);
            var blnFreeAd = false; var blnPaidAd = false; var blnHasRecord = false;
            var ftSize = 0.0;
            if (BkgVal.strUOMCode == "LN") { ftSize = parseFloat(BkgVal.strLnCnt); intActualLNCnt = parseInt(ftSize); }
            else if (BkgVal.strUOMCode == "SQ") ftSize = parseFloat(BkgVal.strWidth) * parseFloat(BkgVal.strHeight);

            intMinLNCnt = 0; intExtraLNCnt = 0; intMInValue = 0; intPerLnValue = 0;
            dblAmt = 0;

            if (DbVal.strRateType == strRateType && DbVal.strPublncode == BkgVal.strPublncode && DbVal.strEditionCode == BkgVal.strEditionCode &&
                //(DbVal.StrComb_Code == BkgVal.StrComb_Code || DbVal.StrComb_Code == "") && DbVal.strSubTypeCode == BkgVal.strSubTypeCode && DbVal.strProductcode == BkgVal.strProductcode
                //(DbVal.StrComb_Code == BkgVal.StrComb_Code || DbVal.StrComb_Code == "")
                //&& (DbVal.strClassificationCode == BkgVal.strClassificationCode)

                (((DbVal.StrComb_Code == BkgVal.StrComb_Code ||
                (DbVal.strAddnCatgCombn != "" && BkgValue.strAddnCatgCombn != undefined && BkgValue.strAddnCatgCombn == DbVal.strAddnCatgCombn) /*addn combn*/
                )
                &&
                (DbVal.strClassificationCode == BkgVal.strClassificationCode ||
                (DbVal.strAddnClasfn != "" && BkgValue.strAddnClasfn != undefined && BkgValue.strAddnClasfn == DbVal.strAddnClasfn) /*addn clasfn*/
                )
                )
                ||
                ((DbVal.StrComb_Code == "" ||
                (DbVal.strAddnCatgCombn != "" && BkgValue.strAddnCatgCombn != undefined && BkgValue.strAddnCatgCombn == DbVal.strAddnCatgCombn) /*addn combn*/
                )
                &&
                (DbVal.strClassificationCode == "" ||
                (DbVal.strAddnClasfn != "" && BkgValue.strAddnClasfn != undefined && BkgValue.strAddnClasfn == DbVal.strAddnClasfn) /*addn clasfn*/
                )
                ))

                && DbVal.strSubTypeCode == BkgVal.strSubTypeCode && DbVal.strProductcode == BkgVal.strProductcode
                && DbVal.strUOMCode == BkgVal.strUOMCode && BkgVal.strAdTypeCode == DbVal.strAdTypeCode
                //&& (chkIssueDtBwnFromTo(DbVal.strEffectiveFrom, DbVal.strEffectiveTo, BkgVal.strIssueDate) == true)
                && blnHasRecord == false
                && (chkSizes(ftSize, parseFloat(DbVal.strMinSize), parseFloat(DbVal.strMaxSize), parseFloat(DbVal.strAddnMinSize), parseFloat(DbVal.strAddnMaxSize)) == true)
                && (DbVal.strDayCode == "ALL" || DbVal.strDayCode == BkgVal.strDayCode)
                //&& (BkgVal.strClrBw == DbVal.strClrBw)
                ) {
                if (intPaidAds < PaidAdIns) {//paid ad
                    intPaidAds++; blnPaidAd = true;
                }
                else if (intFreeAds < FreeAdIns) {//free ad
                    intFreeAds++; blnFreeAd = true;
                }
                tempDbVal = DbVal; tempBkgVal = BkgVal; blnHasRecord = true;
            }
            if (blnHasRecord == true) {
                if (DbVal.struom == "LN" || DbVal.strUOMCode == "LN") {
                    if (BkgVal.strClrBw == 'B') {// && BkgVal.strClrBw == DbVal.strClrBw) {
                        intMinLNCnt = DbVal.strMinSize;
                        if (DbVal.strBWMinValue != "") {
                            intMInValue = DbVal.strBWMinValue; tempBkgVal.strBwMinValue = intMInValue;
                        }
                        intPerLnValue = DbVal.strRateBW; tempBkgVal.strRateBW = intPerLnValue;
                    }
                    else if (BkgVal.strClrBw == 'C') {// && BkgVal.strClrBw == DbVal.strClrBw) {
                        intMinLNCnt = DbVal.strMinSize;
                        if (DbVal.strClrMinValue != "") {
                            intMInValue = DbVal.strClrMinValue; tempBkgVal.strClrMinValue = intMInValue;
                        }
                        intPerLnValue = DbVal.strRateColor; tempBkgVal.strRateColor = intPerLnValue;
                    }
                    if (intPerLnValue == "" || intPerLnValue == undefined || intPerLnValue == NaN) intPerLnValue = 0;
                    if (intActualLNCnt - intMinLNCnt > 0) {
                        intExtraLNCnt = intActualLNCnt - intMinLNCnt;
                        dblAmt = parseFloat(intMInValue) + (parseFloat(intExtraLNCnt) * parseFloat(intPerLnValue));
                    }
                    else
                        dblAmt = intMInValue;
                    //to check whether free add or paid ad
                    if (blnPaidAd == true && intTotalPaidAds > 0) {
                        blnFreeAd = false; intTotalPaidAds--;
                    }
                    else if (blnFreeAd == true && intTotalFreeAds > 0) {
                        blnPaidAd = false; intTotalFreeAds--;
                    }
                    //
                    if (blnFreeAd == false && blnPaidAd == true) {
                        lstCalculatedNormRt[inx] = (DbVal.strPublncode + '*' + DbVal.strEditionCode + '*' + DbVal.strBWMinValue + '~' + DbVal.strRateBW + '~' + DbVal.strClrMinValue + '~' + DbVal.strRateColor + '*' + dblAmt + '*' + intPerLnValue + '*' + BkgVal.strProductcode + '*' + BkgVal.strClrBw + '*' + BkgVal.strIssueDate + '*' + DbVal.strSubTypeCode + '*PAID-' + intMinLNCnt + '-' + intExtraLNCnt + '-' + DbVal.strUOMCode + '-' + SchemeRowIndex.toString() + '-' + DbVal.strSchemeInsertionType);
                        RecAdded_lstCalculatedNormRt++;
                    }
                    else if (blnFreeAd == true && blnPaidAd == false) //free ad
                    {
                        lstCalculatedNormRt[inx] = (DbVal.strPublncode + '*' + DbVal.strEditionCode + '*' + DbVal.strBWMinValue + '~' + DbVal.strRateBW + '~' + DbVal.strClrMinValue + '~' + DbVal.strRateColor + '*' + dblAmt + '*' + intPerLnValue + '*' + BkgVal.strProductcode + '*' + BkgVal.strClrBw + '*' + BkgVal.strIssueDate + '*' + DbVal.strSubTypeCode + '*FREE-' + intMinLNCnt + '-' + intExtraLNCnt + '-' + DbVal.strUOMCode + '-' + SchemeRowIndex.toString() + '-' + DbVal.strSchemeInsertionType);
                        RecAdded_lstCalculatedNormRt++;
                    }
                    dblTotalAmt = parseFloat(dblTotalAmt) + parseFloat(dblAmt);
                    lstAmt[inx] = dblAmt; tempBkgVal.strAdAmt = dblAmt; lstBkgRecordsFinal[inx] = tempBkgVal;
                }
                else {
                    var strSelectWidth = BkgVal.strWidth;

                    //if (DbVal.strMinSize = funpaddingZeros(strSelectWidth, 4)) {
                    var dblHeight = 0; var dblWidth = 0; var dblTotAreaSqCm = 0;
                    dblHeight = BkgVal.strHeight; dblWidth = BkgVal.strWidth;
                    //dblTotAreaSqCm = dblHeight * dblWidth;
                    dblTotAreaSqCm = parseFloat(BkgVal.strMinSize);
                    if (BkgVal.strClrBw == 'B') {// && BkgVal.strClrBw == DbVal.strClrBw) {
                        if (DbVal.strRateBW != "" && DbVal.strRateBW != null)
                            dblPerSqCmAmt = DbVal.strRateBW;
                        else dblPerSqCmAmt = 0;
                        tempBkgVal.strRateBW = dblPerSqCmAmt; tempBkgVal.strRateColor = dblPerSqCmAmt;
                        intFreeAdCnt = parseInt(DbVal.strBwFreeAds); intPaidAdCnt = parseInt(DbVal.strBwPaidAds);
                    }
                    else if (BkgVal.strClrBw == 'C') {// && BkgVal.strClrBw == DbVal.strClrBw) {
                        if (DbVal.strRateColor != "" && DbVal.strRateColor != null)
                            dblPerSqCmAmt = DbVal.strRateColor;
                        else dblPerSqCmAmt = 0;
                        tempBkgVal.strRateColor = dblPerSqCmAmt; tempBkgVal.strRateColor = dblPerSqCmAmt;
                        intFreeAdCnt = parseInt(DbVal.strClrFreeAds); intPaidAdCnt = parseInt(DbVal.strClrPaidAds);
                    }
                    if (dblPerSqCmAmt == "" || dblPerSqCmAmt == undefined || dblPerSqCmAmt == NaN) dblPerSqCmAmt = 0;
                    dblAmt = dblTotAreaSqCm * dblPerSqCmAmt;
                    //to check whether free add or paid ad
                    if (blnPaidAd == true && intTotalPaidAds > 0) {
                        blnFreeAd = false; intTotalPaidAds--;
                    }
                    else if (blnFreeAd == true && intTotalFreeAds > 0) {
                        blnPaidAd = false; intTotalFreeAds--;
                    }
                    //
                    if (blnFreeAd == false && blnPaidAd == true) {
                        lstCalculatedNormRt[inx] = (DbVal.strPublncode + '*' + DbVal.strEditionCode + '*' + DbVal.strBWMinValue + '~' + DbVal.strRateBW + '~' + DbVal.strClrMinValue + '~' + DbVal.strRateColor + '*' + dblAmt + '*' + dblPerSqCmAmt + '*' + BkgVal.strProductcode + '*' + BkgVal.strClrBw + '*' + BkgVal.strIssueDate + '*' + DbVal.strSubTypeCode + '*PAID-' + BkgVal.strMinSize + '-' + BkgVal.strExtraLnCntSqSize + '-' + DbVal.strUOMCode + '-' + SchemeRowIndex.toString() + '-' + DbVal.strSchemeInsertionType);
                        RecAdded_lstCalculatedNormRt++;
                    }
                    else if (blnFreeAd == true && blnPaidAd == false) //free ad
                    {
                        lstCalculatedNormRt[inx] = (DbVal.strPublncode + '*' + DbVal.strEditionCode + '*' + DbVal.strBWMinValue + '~' + DbVal.strRateBW + '~' + DbVal.strClrMinValue + '~' + DbVal.strRateColor + '*' + dblAmt + '*' + dblPerSqCmAmt + '*' + BkgVal.strProductcode + '*' + BkgVal.strClrBw + '*' + BkgVal.strIssueDate + '*' + DbVal.strSubTypeCode + '*FREE-' + BkgVal.strMinSize + '-' + BkgVal.strExtraLnCntSqSize + '-' + DbVal.strUOMCode + '-' + SchemeRowIndex.toString() + '-' + DbVal.strSchemeInsertionType);
                        RecAdded_lstCalculatedNormRt++;
                    }
                    dblTotalAmt = parseFloat(dblTotalAmt) + parseFloat(dblAmt);
                    lstAmt[inx] = dblAmt;
                }
            }
        });
    });
    if (lstBkgRecords.length == lstCalculatedNormRt.length) {// && lstBkgRecords.length == RecAdded_lstCalculatedNormRt) {
        //to get the additional rate & min rate if not ther
        BbRateFromRateMaster("CheckInBoth");
        if (strRateType == "SP") {
            var lstSchemeIndexTypesTemp = []; var tempListRate = []; var lstCalculatedNormRtFinal = lstCalculatedNormRt;
            var lstAmtIndex = [];
            for (var i = 0; i < lstCalculatedNormRt.length; i++) {
                var RateVal = lstCalculatedNormRt[i]; var ins = RateVal.split('*')[9].split('-')[4];
                var OptMan = RateVal.split('*')[9].split('-')[5]; var Amt = RateVal.split('*')[3];
                var PaidFree = RateVal.split('*')[9].split('-')[0];
                //sch ins-PAID/FREE-Amtpubln-edn-prod-subtype-issue date
                var pn = ins.toString() + '-' + PaidFree.toString() + '-' + Amt.toString() + '-' + RateVal.split('*')[0] + '-' + RateVal.split('*')[1] + '-' + RateVal.split('*')[5] + '-' + RateVal.split('*')[8] + '-' + RateVal.split('*')[7] + '-' + RateVal.split('*')[6];
                //
                if (OptMan == "MAN" || OptMan == "MANADATORY") OptMan = "MAN";
                else OptMan = "OPT";
                if (OptMan == "MAN") {
                    lstSchemeIndexTypesTemp.push(pn);
                    lstAmtIndex.push(ins.toString() + '-' + Amt.toString());
                }
            }
            lstSchemeIndexTypesTemp.sort(); lstAmtIndex.sort(); var lstAmtIndexInitial = lstAmtIndex;
            var indexFreeTemp = 0; var insFREE = ""; var FREEVal = "";
            for (var i = 0; i < lstSchemeIndexTypesTemp.length; i++) {
                FREEVal = lstSchemeIndexTypesTemp[i].split('-')[1];
                if (FREEVal == "FREE") {
                    if (insFREE == "") {
                        insFREE = lstSchemeIndexTypesTemp[i].split('-')[0]; indexFreeTemp = 0; indexFreeTemp++;
                    }
                    else {
                        if (insFREE == lstSchemeIndexTypesTemp[i].split('-')[0]) indexFreeTemp++;
                        else {
                            for (var j = 0; j < indexFreeTemp; j++) {
                                var Amt = 0; var AmtIndexTemp = 0; var lstAmtIndexTemp = lstAmtIndex; var restVal = "";
                                $.each(lstSchemeIndexTypesTemp, function (indTemp, ValTemp) {
                                    AmtIndexTemp++;
                                    if (ValTemp.split('-')[0].toString() == insFREE.toString()) {
                                        if (Amt <= 0 && parseFloat(ValTemp.split('-')[2]) > 0) {
                                            Amt = parseFloat(ValTemp.split('-')[2]);
                                            restVal = ValTemp.split('-')[3] + '-' + ValTemp.split('-')[4] + '-' + ValTemp.split('-')[5] + '-' + ValTemp.split('-')[6] + '-' + ValTemp.split('-')[7] + '-' + ValTemp.split('-')[8];
                                        }
                                        else {
                                            if (Amt > parseFloat(ValTemp.split('-')[2])) {
                                                Amt = parseFloat(ValTemp.split('-')[2]);
                                                restVal = ValTemp.split('-')[3] + '-' + ValTemp.split('-')[4] + '-' + ValTemp.split('-')[5] + '-' + ValTemp.split('-')[6] + '-' + ValTemp.split('-')[7] + '-' + ValTemp.split('-')[8];
                                            }
                                        }
                                    }
                                    if (lstAmtIndex.length.toString() == AmtIndexTemp.toString() && parseFloat(Amt) > 0) {
                                        var indexCode = $.inArray(insFREE.toString() + '-FREE-' + Amt.toString() + '-' + restVal, lstSchemeIndexTypesTemp);
                                        if (parseInt(indexCode) <= -1)
                                            indexCode = $.inArray(insFREE.toString() + '-PAID-' + Amt.toString() + '-' + restVal, lstSchemeIndexTypesTemp);
                                        if (parseInt(indexCode) > -1)
                                            lstSchemeIndexTypesTemp[indexCode] += '-0';
                                    }
                                });
                                //lstAmtIndex = lstAmtIndexTemp;
                            }
                            insFREE = lstSchemeIndexTypesTemp[i].split('-')[0]; indexFreeTemp = 0; indexFreeTemp++; restVal = ""; var ValTemp = lstSchemeIndexTypesTemp[i];
                            restVal = ValTemp.split('-')[3] + '-' + ValTemp.split('-')[4] + '-' + ValTemp.split('-')[5] + '-' + ValTemp.split('-')[6] + '-' + ValTemp.split('-')[7];
                        }
                    }
                }
                if (i == lstSchemeIndexTypesTemp.length - 1) {
                    if (parseInt(indexFreeTemp) > 0) {
                        for (var j = 0; j < indexFreeTemp; j++) {
                            var Amt = 0; var AmtIndexTemp = 0; var lstAmtIndexTemp = lstAmtIndex; var restVal = "";
                            $.each(lstSchemeIndexTypesTemp, function (indTemp, ValTemp) {
                                AmtIndexTemp++;
                                if (ValTemp.split('-')[0].toString() == insFREE.toString()) {
                                    if (Amt <= 0 && parseFloat(ValTemp.split('-')[2]) > 0) {
                                        Amt = parseFloat(ValTemp.split('-')[2]);
                                        restVal = ValTemp.split('-')[3] + '-' + ValTemp.split('-')[4] + '-' + ValTemp.split('-')[5] + '-' + ValTemp.split('-')[6] + '-' + ValTemp.split('-')[7] + '-' + ValTemp.split('-')[8];
                                    }
                                    else {
                                        if (Amt > parseFloat(ValTemp.split('-')[2])) {
                                            Amt = parseFloat(ValTemp.split('-')[2]);
                                            restVal = ValTemp.split('-')[3] + '-' + ValTemp.split('-')[4] + '-' + ValTemp.split('-')[5] + '-' + ValTemp.split('-')[6] + '-' + ValTemp.split('-')[7] + '-' + ValTemp.split('-')[8];
                                        }
                                    }
                                }
                                if (lstAmtIndex.length.toString() == AmtIndexTemp.toString() && parseFloat(Amt) > 0) {
                                    var indexCode = $.inArray(insFREE.toString() + '-FREE-' + Amt.toString() + '-' + restVal, lstSchemeIndexTypesTemp);
                                    if (parseInt(indexCode) <= -1)
                                        indexCode = $.inArray(insFREE.toString() + '-PAID-' + Amt.toString() + '-' + restVal, lstSchemeIndexTypesTemp);
                                    if (parseInt(indexCode) > -1)
                                        lstSchemeIndexTypesTemp[indexCode] += '-0';
                                }
                            });
                        }
                    }
                    var gh = ""; var ind = -1; var _valTemp1 = null; var _valTemp2 = "";
                    if (lstCalculatedNormRtFinal.length == lstSchemeIndexTypesTemp.length) {
                        $.each(lstSchemeIndexTypesTemp, function (indTemp1, ValTemp2) {
                            var valFreeAd = ValTemp2.split('-')[9];
                            var FreeAdValTemp = ValTemp2.split('-')[0] + '-' + ValTemp2.split('-')[1] + '-' + ValTemp2.split('-')[2] + '-' + ValTemp2.split('-')[3] + '-' + ValTemp2.split('-')[4] + '-' + ValTemp2.split('-')[5] + '-' + ValTemp2.split('-')[6] + '-' + ValTemp2.split('-')[7] + '-' + ValTemp2.split('-')[8];
                            if (valFreeAd != undefined && valFreeAd != null) {
                                $.each(lstCalculatedNormRtFinal, function (indTemp, ValTemp) {
                                    _valTemp1 = ValTemp; ind = indTemp; _valTemp2 = "";
                                    _valTemp2 = _valTemp1.split('*')[9].split('-')[4] + '-' + _valTemp1.split('*')[9].split('-')[0] + '-' + _valTemp1.split('*')[3] + '-' + _valTemp1.split('*')[0] + '-' + _valTemp1.split('*')[1] + '-' + _valTemp1.split('*')[5] + '-' + _valTemp1.split('*')[8] + '-' + _valTemp1.split('*')[7] + '-' + _valTemp1.split('*')[6];
                                    if (FreeAdValTemp == _valTemp2) {
                                        //lstCalculatedNormRtFinal[ind] += "*0"; return;
                                        var valAdAmtFree = lstCalculatedNormRtFinal[ind].split('*');
                                        valAdAmtFree[3] = "0";
                                        valAdAmtFree = valAdAmtFree.toString().replace(/\,/g, '*');
                                        lstCalculatedNormRtFinal[ind] = valAdAmtFree; return;
                                    }
                                });
                            }
                        });
                    }
                }
            }
            var lstCalculatedSortedTemp = lstCalculatedNormRtFinal;
            lstCalculatedNormRt = [];
            $.each(lstCalculatedSortedTemp, function (indd, valuu) {
                lstCalculatedNormRt.push(valuu.split('*')[0] + '*' + valuu.split('*')[1] + '*' + valuu.split('*')[2] + '*' + valuu.split('*')[3] + '*' + valuu.split('*')[4] + '*' + valuu.split('*')[5] + '*' + valuu.split('*')[6] + '*' + valuu.split('*')[7] + '*' + valuu.split('*')[8] + '*' + strSchemeCodeSCMP + '*' + valuu.split('*')[9]);
            });

        }
        else if (strRateType == 'SCMP') {
            //lstCalculatedNormRt=[];
            //lstCalculatedNormRt[0] = "TH*CH*~~~555*61288*555*FR*C*20/02/2015*GD*PAID-110.25-0-SQ-1-OPT";
            //lstCalculatedNormRt[1] = "TH*CH*~~~555*61188.75*555*FR*C*20/02/2015*GD*FREE-110.25-0-SQ-1-OPT";
            //lstCalculatedNormRt[2] = "TH*CH*~~~555*61488*555*FR*C*20/02/2015*GD*FREE-110.25-0-SQ-1-OPT";
            //lstCalculatedNormRt[3] = "TH*CH*~~~555*61388.75*555*FR*C*20/02/2015*GD*FREE-110.25-0-SQ-1-OPT";

            var lstCalculatedSorted = [];
            $.each(lstCalculatedNormRt, function (inds, vals) {
                lstCalculatedSorted.push(vals.split('*')[3] + '*' + vals.split('*')[0] + '*' + vals.split('*')[1] + '*' + vals.split('*')[2] + '*' + vals.split('*')[4] + '*' + vals.split('*')[5] + '*' + vals.split('*')[6] + '*' + vals.split('*')[7] + '*' + vals.split('*')[8] + '*' + strSchemeCodeSCMP + '*' + vals.split('*')[9]);
            });
            lstCalculatedNormRt = [];
            lstCalculatedSorted.sort();
            $.each(lstCalculatedSorted, function (indd, valuu) {
                if (parseInt(parseInt(indd) + 1) <= parseInt(strTotFreeAdsScmp))
                    lstCalculatedNormRt.push(valuu.split('*')[1] + '*' + valuu.split('*')[2] + '*' + valuu.split('*')[3] + '*0.00*' + valuu.split('*')[4] + '*' + valuu.split('*')[5] + '*' + valuu.split('*')[6] + '*' + valuu.split('*')[7] + '*' + valuu.split('*')[8] + '*' + valuu.split('*')[9] + '*' + (valuu.split('*')[10].split('-')[0] + '-' + valuu.split('*')[10].split('-')[1] + '-' + valuu.split('*')[10].split('-')[2] + '-' + valuu.split('*')[10].split('-')[3] + '-' + valuu.split('*')[10].split('-')[4] + '-' + valuu.split('*')[10].split('-')[5]));
                else
                    lstCalculatedNormRt.push(valuu.split('*')[1] + '*' + valuu.split('*')[2] + '*' + valuu.split('*')[3] + '*' + valuu.split('*')[0] + '*' + valuu.split('*')[4] + '*' + valuu.split('*')[5] + '*' + valuu.split('*')[6] + '*' + valuu.split('*')[7] + '*' + valuu.split('*')[8] + '*' + valuu.split('*')[9] + '*' + (valuu.split('*')[10].split('-')[0] + '-' + valuu.split('*')[10].split('-')[1] + '-' + valuu.split('*')[10].split('-')[2] + '-' + valuu.split('*')[10].split('-')[3] + '-' + valuu.split('*')[10].split('-')[4] + '-' + valuu.split('*')[10].split('-')[5]));
            });
        }
        return true;
    }
    else {
        return false;
    }
}

//Validate MED
function BbValidateMED() {
    var lstTemped = []; var lsted = []; lstBkgRecords = [];
    var lstRecordsSorted = []; lstCalculatedNormRt = [];
    lstBkgRecords.push({ strPublncode: 'TH', strClassificationCode: '', strEditionCode: 'CH', strProductcode: 'MS', strSubTypeCode: 'GD', StrComb_Code: '', strDayCode: 'ALL', strUOMCode: 'SQ', strLnCnt: '0', strClrBw: 'B', strIssueDate: '01/05/2014', strWidth: '12', strHeight: '6', strAdTypeCode: 'D', strMinSize: '12', ExtraLnSQCnt: '0' });
    lstBkgRecords.push({ strPublncode: 'TH', strClassificationCode: '', strEditionCode: 'CBN', strProductcode: 'MS', strSubTypeCode: 'GD', StrComb_Code: '', strDayCode: 'ALL', strUOMCode: 'SQ', strLnCnt: '0', strClrBw: 'B', strIssueDate: '02/05/2014', strWidth: '12', strHeight: '6', strAdTypeCode: 'D', strMinSize: '12', ExtraLnSQCnt: '0' });
    $.each(lstBkgRecords, function (ind, val) {
        lstTemped.push(lstBkgRecords[ind].strEditionCode);
    });
    lsted = GetUnique(lstTemped);
    $.each(lstScheme_SP_Records, function (ind, val) {
        if (lsted.length > 1) {
            $.each(lstBkgRecords, function (ind1, val1) {
                if (lsted.length == lstScheme_SP_Records[ind].strNoofInsertions && lstScheme_SP_Records[ind].strClassificationCode != "" && // strClassificationCode= product GroupCode
                   lstScheme_SP_Records[ind].strProductcode == lstBkgRecords[ind1].strProductcode && // Product Code
                    lstScheme_SP_Records[ind].strPublncode == lstBkgRecords[ind1].strPublncode && // Product Code
                    lstScheme_SP_Records[ind].strEditionCode == lstBkgRecords[ind1].strEditionCode && //Edition Code 
                    lstScheme_SP_Records[ind].strAdTypeCode == lstBkgRecords[ind1].strAdTypeCode && //AdType Code 
                    lstScheme_SP_Records[ind].strSubTypeCode == lstBkgRecords[ind1].strSubTypeCode && //Sub Type Code 
                    (chkIssueDtBwnFromTo(lstScheme_SP_Records[ind].strEffectiveFrom, lstScheme_SP_Records[ind].strEffectiveTo, lstBkgRecords[ind1].strIssueDate) == true) &&/*AMS_EFFECTIVE_FROM from & AMS_EFFECTIVE_to*/
                    //   (chkIssueDtBwnFromTo(lstScheme_SP_Records[ind].strRateEffectiveFrom, lstScheme_SP_Records[ind].strRateEffectiveTo, lstBkgRecords[ind1].strIssueDate) == true) &&/*AMC_EFFECTIVE_FROM from & AMC_EFFECTIVE_to*/
                    (lstScheme_SP_Records[ind].StrComb_Code == lstBkgRecords[ind1].StrComb_Code || lstScheme_SP_Records[ind].StrComb_Code == "" || lstBkgRecords[ind1].StrComb_Code == "")//Combination Code
                    ) {
                    lstRecordsSorted.push(val);
                    lstCalculatedNormRt[ind1] = (val.strPublncode + '*' + val.strEditionCode + '*' + val.strBWMinValue + '~' + val.strRateBW + '~' + val.strClrMinValue + '~' + val.strRateColor + '*' + 0 + '*' + 0 + '*' + val.strProductcode + '*' + val1.strClrBw + '*' + val1.strIssueDate + '*' + val.strSubTypeCode + '*' + 'PAID' + '-' + val1.strMinSize + '-' + val1.ExtraLnSQCnt + '-' + val1.strUOMCode + '*' + val.strClrDiscPer + '-' + val.strBwDiscPer + '-' + val.strMEDFlag + '-' + val.strCmnDiscount);
                }
            });
        }
        else {
            $.each(lstBkgRecords, function (ind1, val1) {
                if (lsted.length == lstScheme_SP_Records[ind].strNoofInsertions && lstScheme_SP_Records[ind].strClassificationCode == "" && // strClassificationCode= product GroupCode
                    lstScheme_SP_Records[ind].strProductcode == lstBkgRecords[ind1].strProductcode && // Product Code
                    lstScheme_SP_Records[ind].strPublncode == lstBkgRecords[ind1].strPublncode && // Product Code
                    lstScheme_SP_Records[ind].strEditionCode == lstBkgRecords[ind1].strEditionCode && //Edition Code 
                    lstScheme_SP_Records[ind].strAdTypeCode == lstBkgRecords[ind1].strAdTypeCode && //AdType Code 
                    lstScheme_SP_Records[ind].strSubTypeCode == lstBkgRecords[ind1].strSubTypeCode && //Sub Type Code 
                    lstScheme_SP_Records[ind].strClassificationCode == lstBkgRecords[ind1].strClassificationCode && //Classification Code 
                    (chkIssueDtBwnFromTo(DbVal.strEffectiveFrom, DbVal.strEffectiveTo, BkgValue.strIssueDate) == true) &&/*AMS_EFFECTIVE_FROM from & AMS_EFFECTIVE_to*/
                    // (chkIssueDtBwnFromTo(DbVal.strRateEffectiveFrom, DbVal.strRateEffectiveTo, BkgValue.RATE_EFFECTIVE_FROM) == true) &&/*AMC_EFFECTIVE_FROM from & AMC_EFFECTIVE_to*/
                    (lstScheme_SP_Records[ind].StrComb_Code == lstBkgRecords[ind1].StrComb_Code || lstScheme_SP_Records[ind].StrComb_Code == "" || lstBkgRecords[ind1].StrComb_Code == "")//Combination Code
                     ) {
                    lstRecordsSorted.push(val);
                    lstCalculatedNormRt[ind1] = (val.strPublncode + '*' + val.strEditionCode + '*' + val.strBWMinValue + '~' + val.strRateBW + '~' + val.strClrMinValue + '~' + val.strRateColor + '*' + 0 + '*' + 0 + '*' + val.strProductcode + '*' + val1.strClrBw + '*' + val1.strIssueDate + '*' + val.strSubTypeCode + '*' + 'PAID' + '-' + val1.strMinSize + '-' + val1.ExtraLnSQCnt + '-' + val1.strUOMCode + '*' + val.strClrDiscPer + '-' + val.strBwDiscPer + '-' + val.strMEDFlag + '-' + val.strCmnDiscount);
                }
            });
        }
    });
    if (lstRecordsSorted.length == 0) {
        GetSchemeRecords('MED'); BbValidateMED();
    }
    var lstTmpchKPDGcode = [], lstchKPDGcode = [];
    var chkMedFlag_Y = false; var chkMedFlag_N = false;
    var adamt = 0; var getHighAMtindex = []; var cnt = 0;
    $.each(lstRecordsSorted, function (ind, val) {
        lstTmpchKPDGcode.push(lstRecordsSorted[ind].strClassificationCode);
    });
    lstchKPDGcode = GetUnique(lstTmpchKPDGcode);
    FindRateInRateMaster();
    if (lstRecordsSorted.length > 0 && lstchKPDGcode.length == 1) {
        $.each(lstCalculatedNormRt, function (ind, val) {
            if (lstCalculatedNormRt[ind].split('*')[10].split('-')[2].trim() == 'Y')
                chkMedFlag_Y = true;
            if (lstCalculatedNormRt[ind].split('*')[10].split('-')[2].trim() == 'N')
                chkMedFlag_N = true;
            getHighAMtindex.push(parseFloat(lstCalculatedNormRt[ind].split('*')[3]));
        });
        var strlrgInd = lstCalculatedNormRt[indexOflargest(getHighAMtindex)].split('*')[1];
        $.each(lstCalculatedNormRt, function (ind, val) {
            if (lstCalculatedNormRt[ind].split('*')[10].split('-')[3].trim() == '') {
                if (lstCalculatedNormRt[ind].split('*')[6] == 'B') {
                    if (chkMedFlag_Y == false && chkMedFlag_N == true) {
                        var AdDtls = lstCalculatedNormRt[ind]; var arrAdDtls = AdDtls.split('*');
                        adamt = parseFloat(lstCalculatedNormRt[ind].split('*')[3]) - (parseFloat(lstCalculatedNormRt[ind].split('*')[3]) * (parseFloat(lstCalculatedNormRt[ind].split('*')[10].split('-')[1].trim()) / 100));
                        arrAdDtls[3] = adamt.toString();
                        lstCalculatedNormRt[ind] = arrAdDtls.toString();
                    }
                    else if (lstCalculatedNormRt[ind].split('*')[1] != strlrgInd && chkMedFlag_Y == true && chkMedFlag_N == false) {
                        var AdDtls = lstCalculatedNormRt[ind]; var arrAdDtls = AdDtls.split('*');
                        adamt = parseFloat(lstCalculatedNormRt[ind].split('*')[3]) - (parseFloat(lstCalculatedNormRt[ind].split('*')[3]) * (parseFloat(lstCalculatedNormRt[ind].split('*')[10].split('-')[1].trim()) / 100));
                        arrAdDtls[3] = adamt.toString();
                        lstCalculatedNormRt[ind] = arrAdDtls.toString();
                    }
                }
                else {
                    if (chkMedFlag_Y == false && chkMedFlag_N == true) {
                        var AdDtls = lstCalculatedNormRt[ind]; var arrAdDtls = AdDtls.split('*');
                        adamt = parseFloat(lstCalculatedNormRt[ind].split('*')[3]) - (parseFloat(lstCalculatedNormRt[ind].split('*')[3]) * (parseFloat(lstCalculatedNormRt[ind].split('*')[10].split('-')[0].trim()) / 100));
                        arrAdDtls[3] = adamt.toString();
                        lstCalculatedNormRt[ind] = arrAdDtls.toString();
                    }
                    else if (lstCalculatedNormRt[ind].split('*')[1] != strlrgInd && chkMedFlag_Y == true && chkMedFlag_N == false) {
                        var AdDtls = lstCalculatedNormRt[ind]; var arrAdDtls = AdDtls.split('*');
                        adamt = parseFloat(lstCalculatedNormRt[ind].split('*')[3]) - (parseFloat(lstCalculatedNormRt[ind].split('*')[3]) * (parseFloat(lstCalculatedNormRt[ind].split('*')[10].split('-')[0].trim()) / 100));
                        arrAdDtls[3] = adamt.toString();
                        lstCalculatedNormRt[ind] = arrAdDtls.toString();
                    }
                }
            }
            else {
                var AdDtls = lstCalculatedNormRt[ind]; var arrAdDtls = AdDtls.split('*');
                adamt = parseFloat(lstCalculatedNormRt[ind].split('*')[3]) - (parseFloat(lstCalculatedNormRt[ind].split('*')[3]) * (parseFloat(lstCalculatedNormRt[ind].split('*')[10].split('-')[3].trim()) / 100));
                arrAdDtls[3] = adamt.toString();
                lstCalculatedNormRt[ind] = arrAdDtls.toString();
            }
        });
    }
    else { alert('No Scheme for this type'); }
}

//Validate IS
function BbValidateIS() {
    var lstrecord = []; lstBkgRecords = []; var strlrgInd = ""; var lstRecordsSorted = []; lstCalculatedNormRt = [];
    var strBkgCLRCnt = 0; var strBkgBWCnt = 0; var strfreeAddCnt = 0; var strclrFreeAdd = 0; var strBwFreeAdd = 0;
    var strAddfreeAddCnt = 0; var strAddclrFreeAdd = 0; var strAddBwFreeAdd = 0;
    lstBkgRecords.push({ strPublncode: 'TH', strClassificationCode: 'CF', strEditionCode: 'CH', strProductcode: 'CF', strSubTypeCode: 'MS', StrComb_Code: '2539', strDayCode: 'ALL', strUOMCode: 'SQ', strLnCnt: '0', strClrBw: 'B', strIssueDate: '08/05/2011', strWidth: '12', strHeight: '6', strAdTypeCode: 'C', strMinSize: '12', ExtraLnSQCnt: '0' });
    lstBkgRecords.push({ strPublncode: 'TH', strClassificationCode: 'CF', strEditionCode: 'CH', strProductcode: 'CF', strSubTypeCode: 'MS', StrComb_Code: '2539', strDayCode: 'ALL', strUOMCode: 'SQ', strLnCnt: '0', strClrBw: 'B', strIssueDate: '07/06/2011', strWidth: '12', strHeight: '6', strAdTypeCode: 'C', strMinSize: '12', ExtraLnSQCnt: '0' });
    lstBkgRecords.push({ strPublncode: 'TH', strClassificationCode: 'CF', strEditionCode: 'CH', strProductcode: 'CF', strSubTypeCode: 'MS', StrComb_Code: '2539', strDayCode: 'ALL', strUOMCode: 'SQ', strLnCnt: '0', strClrBw: 'B', strIssueDate: '07/08/2011', strWidth: '12', strHeight: '6', strAdTypeCode: 'C', strMinSize: '12', ExtraLnSQCnt: '0' });
    lstBkgRecords.push({ strPublncode: 'TH', strClassificationCode: 'CF', strEditionCode: 'CH', strProductcode: 'CF', strSubTypeCode: 'MS', StrComb_Code: '2539', strDayCode: 'ALL', strUOMCode: 'SQ', strLnCnt: '0', strClrBw: 'B', strIssueDate: '07/07/2011', strWidth: '12', strHeight: '6', strAdTypeCode: 'C', strMinSize: '12', ExtraLnSQCnt: '0' });
    $.each(lstBkgRecords, function (ind, val) {
        if (lstBkgRecords[ind].strClrBw == "B")
            strBkgBWCnt = strBkgBWCnt + 1;
        else
            strBkgCLRCnt = strBkgCLRCnt + 1;
    });
    $.each(lstScheme_SP_Records, function (ind, val) {
        if (lstBkgRecords.length == val.strNoofInsertions) {
            $.each(lstBkgRecords, function (ind1, val1) {
                var ftSize = 0.0;
                if (val1.strUOMCode == "LN")
                    ftSize = parseFloat(val1.strLnCnt);
                else if (val1.strUOMCode == "SQ")
                    ftSize = parseFloat(val1.strWidth) * parseFloat(val1.strHeight);
                if (strBkgBWCnt == val.strBwAdsCount &&
                    strBkgCLRCnt == val.strClrAdsCount &&
                    val.strProductcode == val1.strProductcode && // Product Code
                    val.strPublncode == val1.strPublncode && // Product Code
                    val.strEditionCode == val1.strEditionCode && //Edition Code 
                    val.strAdTypeCode == val1.strAdTypeCode && //AdType Code 
                    val.strClassificationCode == val1.strClassificationCode && //Classification Code
                    ((val.strSubTypeCode == val1.strSubTypeCode) || //Sub Type Code 
                    (val.strAddnSubType != "" && val1.strAddnSubType != undefined && val1.strAddnSubType == val.strAddnSubType)) && /*addn sub type*/
                     ((val.StrComb_Code == val1.StrComb_Code)//Combination Code 
                     || (val.strAddnCatgCombn != "" && val1.strAddnCatgCombn != undefined && val1.strAddnCatgCombn == val.strAddnCatgCombn)) && /*addn combn*/
                     ((ftSize >= parseFloat(val.strMinSize) /*min size*/
                     || (val.strAddnMinSize != "" && parseFloat(ftSize) >= parseFloat(val.strAddnMinSize)) /*additional min size*/
                     || parseFloat(ftSize) >= parseFloat(val.strMinSize))/*area*/
                     || (parseFloat(ftSize) >= parseFloat(val.strMaxSize) /*max size*/
                     || (val.strAddnMaxSize != "" && parseFloat(ftSize) >= parseFloat(val.strAddnMaxSize)) /*additional max size*/
                     || parseFloat(ftSize) >= parseFloat(val.strMaxSize)))/*area*/ &&
                    (chkIssueDtBwnFromTo(val.strEffectiveFrom, val.strEffectiveTo, val1.strIssueDate) == true) &&/*AMS_EFFECTIVE_FROM from & AMS_EFFECTIVE_to*/
                    (chkIssueDtBwnFromTo(val.strRateEffectiveFrom, val.strRateEffectiveTo, val1.strIssueDate) == true) /*AMC_EFFECTIVE_FROM from & AMC_EFFECTIVE_to*/
                   ) {
                    lstRecordsSorted.push(val);
                    strfreeAddCnt = val.strTotalFreeAds;
                    strclrFreeAdd = val.strClrFreeAds;
                    strBwFreeAdd = val.strBwFreeAds;
                    strAddfreeAddCnt = val.strAddnNoOfFreeAds;
                    strAddclrFreeAdd = val.strAddnClrFreeAds;
                    strAddBwFreeAdd = val.strAddnBwFreeAds;
                    if (val1.strClrBw == "B")
                        lstCalculatedNormRt[ind1] = (val.strPublncode + '*' + val.strEditionCode + '*' + val.strBWMinValue + '~' + val.strRateBW + '~' + val.strClrMinValue + '~' + val.strRateColor + '*' + val.strRateBW + '*' + 0 + '*' + val.strProductcode + '*' + val1.strClrBw + '*' + val1.strIssueDate + '*' + val.strSubTypeCode + '*' + 'PAID' + '-' + val1.strMinSize + '-' + val1.ExtraLnSQCnt + '*' + val1.strUOMCode + '*' + '');
                    else
                        lstCalculatedNormRt[ind1] = (val.strPublncode + '*' + val.strEditionCode + '*' + val.strBWMinValue + '~' + '0' + '~' + val.strClrMinValue + '~' + val.strRateColor + '*' + val.strRateColor + '*' + 0 + '*' + val.strProductcode + '*' + val1.strClrBw + '*' + val1.strIssueDate + '*' + val.strSubTypeCode + '*' + 'PAID' + '-' + val1.strMinSize + '-' + val1.ExtraLnSQCnt + '*' + val1.strUOMCode + '*' + '');
                }
            });
        }
    });
    FindRateInRateMaster();
    if (strclrFreeAdd == "") strclrFreeAdd = 0;
    if (strBwFreeAdd == "") strBwFreeAdd = 0;
    if (strclrFreeAdd == "") strclrFreeAdd = 0
    if (strAddfreeAddCnt == "") strAddnClrFreeAds = 0;
    if (strAddclrFreeAdd == "") strAddclrFreeAdd = 0;
    if (strAddBwFreeAdd == "") strAddBwFreeAdd = 0;
    strfreeAddCnt = parseInt(strfreeAddCnt) + parseInt(strAddfreeAddCnt);
    strBwFreeAdd = parseInt(strBwFreeAdd) + parseInt(strAddBwFreeAdd);
    strclrFreeAdd = parseInt(strclrFreeAdd) + parseInt(strAddclrFreeAdd);
    $.each(lstCalculatedNormRt, function (ind, val) {
        lstrecord.push(lstCalculatedNormRt[ind].split('*')[3] + '-' + ind);
    });
    lstrecord = lstrecord.sort();
    if (strfreeAddCnt != 0 && strfreeAddCnt != "") {
        var indx = "";
        for (var i = 0; i < strfreeAddCnt; i++) {
            indx += lstrecord[i].split('-')[1] + ",";
        }
    }
    var arrindx = [];
    arrindx = indx.split(',');
    for (var i = 0; i < arrindx.length - 1; i++) {
        var arrin = arrindx[i];
        if (lstCalculatedNormRt[arrin].split('*')[6] == "B" && parseInt(strBwFreeAdd) > 0) {
            var AdDtls = lstCalculatedNormRt[arrin]; var arrAdDtls = AdDtls.split('*');
            adamt = 0;
            arrAdDtls[3] = adamt.toString();
            arrAdDtls = arrAdDtls.toString().replace(/\,/g, '*');
            lstCalculatedNormRt[arrindx[i]] = arrAdDtls.toString();
            strBwFreeAdd = strBwFreeAdd - 1;
        }
        if (lstCalculatedNormRt[arrin].split('*')[6] == "C" && parseInt(strclrFreeAdd) > 0) {
            var AdDtls = lstCalculatedNormRt[arrin]; var arrAdDtls = AdDtls.split('*');
            adamt = 0;
            arrAdDtls[3] = adamt.toString();
            arrAdDtls = arrAdDtls.toString().replace(/\,/g, '*');
            lstCalculatedNormRt[arrindx[i]] = arrAdDtls.toString();
            strclrFreeAdd = strclrFreeAdd - 1;
        }
    }
    BbContenate_BkgList_RateList();
}

//to concatenate bkg list & rate list
function BbContenate_BkgList_RateList() {
    $.each(lstCalculatedNormRt, function (ind, val) {
        if (lstCalculatedNormRt[ind].split('*')[5] == lstBkgRecords[ind].strProductcode && // Product Code
                lstCalculatedNormRt[ind].split('*')[0] == lstBkgRecords[ind].strPublncode && //Publn Code
                lstCalculatedNormRt[ind].split('*')[1] == lstBkgRecords[ind].strEditionCode && //Edition Code 
                lstCalculatedNormRt[ind].split('*')[8] == lstBkgRecords[ind].strSubTypeCode && //Sub Type Code 
                lstCalculatedNormRt[ind].split('*')[7] == lstBkgRecords[ind].strIssueDate &&//issuedate
                lstCalculatedNormRt[ind].split('*')[6] == lstBkgRecords[ind].strClrBw && //ClrBw
                lstCalculatedNormRt[ind].split('*')[10] == lstBkgRecords[ind].strUOMCode //strUOMCode Code
               ) {
            lstCmpBkgCalNorm.push({
                strPublncode: lstBkgRecords[ind].strPublncode,
                strProductcode: lstBkgRecords[ind].strProductcode,
                strEditionCode: lstBkgRecords[ind].strEditionCode,
                strProductFeature: lstBkgRecords[ind].strProductFeature,
                strAdTypeCode: lstBkgRecords[ind].strAdTypeCode,
                strSubTypeCode: lstBkgRecords[ind].strSubTypeCode,
                strClassificationCode: lstBkgRecords[ind].strClassificationCode,
                StrComb_Code: lstBkgRecords[ind].StrComb_Code,
                strUOMCode: lstBkgRecords[ind].strUOMCode,
                strClrBw: lstBkgRecords[ind].strClrBw,
                strAmt: lstCalculatedNormRt[ind].split('*')[3],
                strPosition: 'P1',
                strPageCode: '',
                strPage: ''
            });
        }
    });
}

//to get the scheme for tieup master
function BbGetSchemeForTieUp() {
    lstBkgRecords = [];
    lstBkgRecords.push({ strPublncode: 'EN', strClassificationCode: '', strProductcode: 'MS', strEditionCode: 'ANP', strDayCode: 'MON', strAdTypeCode: 'D', strSubTypeCode: 'EO', StrComb_Code: '12', strLnCnt: '5', strClrBw: 'B', strIssueDate: '20/02/2015', strWidth: '10', strHeight: '13', strMinSize: '130', strExtraLnCntSqSize: '0', strUOMCode: 'SQ' });
    lstBkgRecords.push({ strPublncode: 'TH', strClassificationCode: '', strProductcode: 'OP', strEditionCode: 'AE', strDayCode: 'MON', strAdTypeCode: 'D', strSubTypeCode: 'OP', StrComb_Code: '12', strLnCnt: '5', strClrBw: 'B', strIssueDate: '20/02/2015', strWidth: '10', strHeight: '12', strMinSize: '120', strExtraLnCntSqSize: '0', strUOMCode: 'SQ' });
    //to validate the ads
    lstRecordsSorted = []; lstRecordsSorted = lstTieUpMaster; var lstRecordsTemp1 = []; var lstRecordsTemp = [];
    if (lstRecordsSorted.length > 0) {
        var intInternalPublnAdsCount = 0; var intExternalPublnAdsCount = 0; var Temp = []; var schemeNameTemp = ""; var _blnSchemeSelected = false;
        var selectedScheme = ""; var TotalNoOfInsertions = -1; var NoRows = 0;
        $.each(lstRecordsSorted, function (ind, DbVal) {
            if (DbVal.strApaNoRows == lstBkgRecords.length) {
                if (NoRows == 0)
                    NoRows = parseInt(DbVal.strApaNoRows);
                if (schemeNameTemp == "")
                    schemeNameTemp = DbVal.strSchemeCode;
                var _intInternalPublnAdsCount = 0; var _intExternalPublnAdsCount = 0;
                if (schemeNameTemp != DbVal.strSchemeCode) {
                    if (NoRows == (intInternalPublnAdsCount + intExternalPublnAdsCount)) {
                        return false;
                    }
                    else {
                        intInternalPublnAdsCount = 0; intExternalPublnAdsCount = 0; _intInternalPublnAdsCount = 0; _intExternalPublnAdsCount = 0;
                        //lstRecordsTemp = []; lstRecordsTemp1 = [];
                        schemeNameTemp = DbVal.strSchemeCode; _blnSchemeSelected = false; NoRows = parseInt(DbVal.strApaNoRows);
                    }
                }
                if (_blnSchemeSelected == false || selectedScheme == "" || selectedScheme == DbVal.strSchemeCode) {
                    if (schemeNameTemp != DbVal.strSchemeCode) {
                        intInternalPublnAdsCount = 0; intExternalPublnAdsCount = 0;
                        schemeNameTemp = DbVal.strSchemeCode;
                    }
                    TotalNoOfInsertions = DbVal.strNoofInsertions;
                    var _TotalNoOfInsertions = 0;
                    $.each(lstBkgRecords, function (index, BkgValue) {
                        var ftSize = 0.0;
                        if (BkgValue.strUOMCode == "LN")
                            ftSize = parseFloat(BkgValue.strLnCnt);
                        else if (BkgValue.strUOMCode == "SQ")
                            ftSize = parseFloat(BkgValue.strWidth) * parseFloat(BkgValue.strHeight);
                        //with comb & MANADATORY Option
                        if (BkgValue.strPublncode == DbVal.strPublncode /*publn*/ && BkgValue.strProductcode == DbVal.strProductcode /*prod*/
                            && BkgValue.strAdTypeCode == DbVal.strAdTypeCode /*adtype*/ && BkgValue.strEditionCode == DbVal.strEditionCode /*edn*/
                            && BkgValue.strSubTypeCode == DbVal.strSubTypeCode /*sub type*/ && DbVal.strRateType == strRateType
                            && (BkgValue.StrComb_Code == DbVal.StrComb_Code || DbVal.StrComb_Code == "") /*combn if given*/
                            && (chkSizes(ftSize, parseFloat(DbVal.strMinSize), parseFloat(DbVal.strMaxSize), parseFloat(DbVal.strAddnMinSize), parseFloat(DbVal.strAddnMaxSize)) == true)
                            && (chkIssueDtBwnFromTo(DbVal.strEffectiveFrom, DbVal.strEffectiveTo, BkgValue.strIssueDate) == true)
                            && (chkIssueDtBwnFromTo(DbVal.strPkgEffFrom, DbVal.strPkgEffTo, BkgValue.strIssueDate) == true)
                            && (chkIssueDtBwnFromTo(DbVal.strRateEffectiveFrom, DbVal.strRateEffectiveTo, BkgValue.strIssueDate) == true)
                            && (DbVal.strDayCode == "ALL" || DbVal.strDayCode == BkgValue.strDayCode)
                            && DbVal.strUOMCode == BkgValue.strUOMCode
                            && (DbVal.strClassificationCode == BkgValue.strClassificationCode)
                            ) {
                            var DbValTemp1 = DbVal; var blnAdd = false;
                            if (parseInt(DbVal.strApaNoRows) >= (intInternalPublnAdsCount + intExternalPublnAdsCount) && parseInt(DbVal.strNoofInsertions) > _intInternalPublnAdsCount) {
                                blnAdd = true;
                            }
                            if (blnAdd == true) {
                                if (lstRecordsTemp1.length > 0) {
                                    $.each(lstRecordsTemp1, function (ind, val) {
                                        if ($.inArray(DbValTemp1, lstRecordsTemp1) == -1) {
                                            lstRecordsTemp1.push(DbValTemp1); lstRecordsTemp.push(DbValTemp1);
                                            _blnSchemeSelected = true; selectedScheme = schemeNameTemp; _TotalNoOfInsertions++;
                                            if (DbVal.strPublnExtInt == "E") _intExternalPublnAdsCount++;
                                            if (DbVal.strPublnExtInt == "I") _intInternalPublnAdsCount++;
                                        }
                                    });
                                }
                                else {
                                    lstRecordsTemp1.push(DbValTemp1); lstRecordsTemp.push(DbValTemp1);
                                    _blnSchemeSelected = true; selectedScheme = schemeNameTemp; _TotalNoOfInsertions++;
                                    if (DbVal.strPublnExtInt == "E") _intExternalPublnAdsCount++;
                                    if (DbVal.strPublnExtInt == "I") _intInternalPublnAdsCount++;
                                }
                            }
                        }
                    });
                    intInternalPublnAdsCount += _intInternalPublnAdsCount; intExternalPublnAdsCount += _intExternalPublnAdsCount;
                }
            }
        });
        //to restrict for 1 scheme
        var ScName = ""; var lstTemp = [];
        $.each(lstRecordsTemp, function (ind, DbVal) {
            if (ScName == "" || ScName == DbVal.strSchemeCode) {
                ScName = DbVal.strSchemeCode;
                lstTemp.push(DbVal);
            }
        });
        lstRecordsTemp = lstTemp;
        if (lstRecordsTemp.length > 0) {
            BbCalculateTieupSchemeRate(lstRecordsTemp);
        }
        return false;
    }
}

//to calculate rate for tieup master
function BbCalculateTieupSchemeRate(arrSchemeRecords) {
    var intActualLNCnt = 0; var intMinLNCnt = 0; var intExtraLNCnt = 0; var intMInValue = 0; var intPerLnValue = 0;
    var dblAmt = 0; var dblTotalAmt = 0; var strNoOfIns = ""; var TempSchemeName = "";

    lstCalculatedNormRt = []; lstCalculatedNormRtFinal = [];
    var lstBkgRecordsFinal = []; var SchemeRowIndex = -1;
    $.each(arrSchemeRecords, function (ind, DbVal) {
        SchemeRowIndex = ind; TempSchemeName = DbVal.strSchemeCode;
        strNoOfIns = DbVal.strNoofInsertions;
        $.each(lstBkgRecords, function (inx, BkgValue) {
            var ftSize = 0.0; var _NoOfIns = 0;
            if (BkgValue.strUOMCode == "LN") { ftSize = parseFloat(BkgValue.strLnCnt); intActualLNCnt = parseInt(ftSize); }
            else if (BkgValue.strUOMCode == "SQ") ftSize = parseFloat(BkgValue.strWidth) * parseFloat(BkgValue.strHeight);

            intMinLNCnt = 0; intExtraLNCnt = 0; intMInValue = 0; intPerLnValue = 0; dblAmt = 0;
            //with combn
            if (BkgValue.strPublncode == DbVal.strPublncode /*publn*/ && BkgValue.strProductcode == DbVal.strProductcode /*prod*/
                && BkgValue.strAdTypeCode == DbVal.strAdTypeCode /*adtype*/ && BkgValue.strEditionCode == DbVal.strEditionCode /*edn*/
                && BkgValue.strSubTypeCode == DbVal.strSubTypeCode /*sub type*/ && DbVal.strRateType == strRateType
                && (BkgValue.StrComb_Code == DbVal.StrComb_Code || DbVal.StrComb_Code == "") /*combn*/
                && (chkSizes(ftSize, parseFloat(DbVal.strMinSize), parseFloat(DbVal.strMaxSize), parseFloat(DbVal.strAddnMinSize), parseFloat(DbVal.strAddnMaxSize)) == true)
                && (chkIssueDtBwnFromTo(DbVal.strEffectiveFrom, DbVal.strEffectiveTo, BkgValue.strIssueDate) == true)
                && (chkIssueDtBwnFromTo(DbVal.strPkgEffFrom, DbVal.strPkgEffTo, BkgValue.strIssueDate) == true)
                && (chkIssueDtBwnFromTo(DbVal.strRateEffectiveFrom, DbVal.strRateEffectiveTo, BkgValue.strIssueDate) == true)
                && (DbVal.strDayCode == "ALL" || DbVal.strDayCode == BkgValue.strDayCode)
                && DbVal.strUOMCode == BkgValue.strUOMCode
                && (DbVal.strClassificationCode == BkgValue.strClassificationCode)
                ) {
                tempDbVal = DbVal; blnHasRecord = true;
                if (DbVal.struom == "SQ" || DbVal.strUOMCode == "SQ") {
                    var dblTotAreaSqCm = 0;
                    dblTotAreaSqCm = parseFloat(BkgValue.strMinSize);
                    if (DbVal.strPublnExtInt == "E") {
                        if (BkgValue.strClrBw == 'B') {
                            if (DbVal.strRateExtShareBW != "" && DbVal.strRateExtShareBW != null)
                                dblPerSqCmAmt = DbVal.strRateExtShareBW;
                            else dblPerSqCmAmt = 0;
                        }
                        else if (BkgValue.strClrBw == 'C') {
                            if (DbVal.strRateExtShareClr != "" && DbVal.strRateExtShareClr != null)
                                dblPerSqCmAmt = DbVal.strRateExtShareClr;
                            else dblPerSqCmAmt = 0;
                        }
                    }
                    else {
                        if (BkgValue.strClrBw == 'B') {
                            if (DbVal.strRateHomeShareBW != "" && DbVal.strRateHomeShareBW != null)
                                dblPerSqCmAmt = DbVal.strRateHomeShareBW;
                            else dblPerSqCmAmt = 0;
                        }
                        else if (BkgValue.strClrBw == 'C') {
                            if (DbVal.strRateHomeShareClr != "" && DbVal.strRateHomeShareClr != null)
                                dblPerSqCmAmt = DbVal.strRateHomeShareClr;
                            else dblPerSqCmAmt = 0;
                        }
                    }
                    if (intPerLnValue == "" || intPerLnValue == undefined || intPerLnValue == NaN) intPerLnValue = 0;
                    dblAmt = dblTotAreaSqCm * dblPerSqCmAmt;
                    if (DbVal.strPublnExtInt == "E")
                        lstCalculatedNormRt[inx] = (DbVal.strPublncode + '*' + DbVal.strEditionCode + '*' + DbVal.strRateExtShareBW.toString() + '~' + DbVal.strRateExtBWCard.toString() + '~' + DbVal.strRateExtShareClr.toString() + '~' + DbVal.strRateExtClrCard.toString() + '*' + dblAmt.toString() + '*' + dblPerSqCmAmt.toString() + '*' + BkgValue.strProductcode + '*' + BkgValue.strClrBw + '*' + BkgValue.strIssueDate + '*' + DbVal.strSubTypeCode + '*PAID-' + BkgValue.strMinSize + '-' + BkgValue.strExtraLnCntSqSize + '-' + DbVal.strUOMCode + '-' + SchemeRowIndex.toString() + '-');
                    else
                        lstCalculatedNormRt[inx] = (DbVal.strPublncode + '*' + DbVal.strEditionCode + '*' + DbVal.strRateHomeShareBW.toString() + '~' + '~' + DbVal.strRateHomeShareClr.toString() + '~' + '*' + dblAmt.toString() + '*' + dblPerSqCmAmt.toString() + '*' + BkgValue.strProductcode + '*' + BkgValue.strClrBw + '*' + BkgValue.strIssueDate + '*' + DbVal.strSubTypeCode + '*PAID-' + BkgValue.strMinSize + '-' + BkgValue.strExtraLnCntSqSize + '-' + DbVal.strUOMCode + '-' + SchemeRowIndex.toString() + '-');
                    _NoOfIns++;
                    dblTotalAmt = parseFloat(dblTotalAmt) + parseFloat(dblAmt);
                    lstAmt[inx] = dblAmt;
                }
            }
        });
    });
    if (lstBkgRecords.length == lstCalculatedNormRt.length) {
        //to get the additional rate & min rate if not ther
        FindRateInRateMaster();
    }
    else {
        alert('No Scheme Matches'); return false;
    }
}
