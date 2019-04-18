var lstPubln = []; var lstProd = [];

$(document).ready(function () {
    $('.preloader').fadeOut();
    if (window.sessionStorage.strUserId == undefined || window.sessionStorage.strUserId == null || window.sessionStorage.strUserId.trim() == "" || window.sessionStorage.strUserId.trim() == "undefined" || window.sessionStorage.strUserId.trim() == "null") {
        window.sessionStorage.removeItem("strUserId");
        // location.replace('http://thehinduads.com/B2B/index.html');
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

    //window.sessionStorage.strAdType_Available -> C~D~E

    //GetClientDetailsForSearch();

    $("#BtnRptContentSearch").click(function (event) {
        event.preventDefault();
        try {

        } catch (e) { }
        var bkgFrmDate = $("#txtRptContentBkgFrmDate").val();
        var bkgToDate = $("#txtRptContentBkgToDate").val();
        var IssueFrmDate = $("#txtRptContentIssFromDate").val();
        var IssueToDate = $("#txtRptContentIssToDate").val();
        if (bkgFrmDate != undefined && bkgFrmDate != null && bkgFrmDate != "") {
            if (bkgToDate == undefined || bkgToDate == null || bkgToDate == "") {
                $.alert.open("warning", "Kindly Select Booking To Date");
                return false;
            }
        }
        if (bkgToDate != undefined && bkgToDate != null && bkgToDate != "") {
            if (bkgFrmDate == undefined || bkgFrmDate == null || bkgFrmDate == "") {
                $.alert.open("warning", "Kindly Select Booking From Date");
                return false;
            }
        }

        if (IssueFrmDate != undefined && IssueFrmDate != null && IssueFrmDate != "") {
            if (IssueToDate == undefined || IssueToDate == null || IssueToDate == "") {
                $.alert.open("warning", "Kindly Select Insertion To Date");
                return false;
            }
        }
        if (IssueToDate != undefined && IssueToDate != null && IssueToDate != "") {
            if (IssueFrmDate == undefined || IssueFrmDate == null || IssueFrmDate == "") {
                $.alert.open("warning", "Kindly Select Insertion From Date");
                return false;
            }
        }

        if (chkDtBwnFromTo(bkgFrmDate, bkgToDate) == false) { }
        else {
            $.alert.open("warning", "Booking To Date is Less than Booking From Date");
            return;
        }

        if (chkDtBwnFromTo(IssueFrmDate, IssueToDate) == false) { }
        else {
            $.alert.open("warning", "Insertion To Date is Less than Insertion From Date");
            return;
        }
        var AdStatus = $("#ddlAdStatus").val();
        var AdType = $("#ddlAdType").val();
        var rptTxtBkgNo = $("#rptTxtBkgNo").val().trim();
        var ddlPubln = $("#ddlPubln").val();
        var ddlProduct = $("#ddlProduct").val();

        var RptName = "";
        if ($("#rbtnContentRpt")[0].checked == true)
            RptName = "rptContent";
        else if ($("#rbtnContentDetailedRpt")[0].checked == true)
            RptName = "rptContentDetail";


        if (rptTxtBkgNo != undefined && rptTxtBkgNo != null && rptTxtBkgNo.trim() != "") { }
        else {
            if (RptName == "rptContent") {
                if ((bkgFrmDate == null || bkgFrmDate == "" || bkgFrmDate == undefined)
                    && (bkgToDate == null || bkgToDate == "" || bkgToDate == undefined)
                    && (IssueFrmDate == null || IssueFrmDate == "" || IssueFrmDate == undefined)
                    && (IssueToDate == null || IssueToDate == "" || IssueToDate == undefined)
                    && (AdStatus == null || AdStatus == "" || AdStatus == undefined)
                    && (rptTxtBkgNo == null || rptTxtBkgNo == "" || rptTxtBkgNo == undefined)
                    ) {
                    $.alert.open("warning", "Please select any search criteria & proceed further");
                    return false;
                }
            }
            else if (RptName == "rptContentDetail") {
                if ((bkgFrmDate == null || bkgFrmDate == "" || bkgFrmDate == undefined)
                    && (bkgToDate == null || bkgToDate == "" || bkgToDate == undefined)
                    && (IssueFrmDate == null || IssueFrmDate == "" || IssueFrmDate == undefined)
                    && (IssueToDate == null || IssueToDate == "" || IssueToDate == undefined)
                    && (AdStatus == null || AdStatus == "" || AdStatus == undefined)
                    && (AdType == null || AdType == "" || AdType == undefined)
                    && (rptTxtBkgNo == null || rptTxtBkgNo == "" || rptTxtBkgNo == undefined)
                    && (ddlPubln == null || ddlPubln == "" || ddlPubln == undefined)
                    && (ddlProduct == null || ddlProduct == "" || ddlProduct == undefined)
                    ) {
                    $.alert.open("warning", "Please select any search criteria & proceed further");
                    return false;
                }
            }
        }
        if (rptTxtBkgNo != undefined && rptTxtBkgNo != null && rptTxtBkgNo.trim() != "") { }
        else {
            var blnBkgDateEmpty = false; var blnIssDateEmpty = false;
            if ((bkgFrmDate == null || bkgFrmDate == "" || bkgFrmDate == undefined)
                && (bkgToDate == null || bkgToDate == "" || bkgToDate == undefined)
                && (IssueFrmDate == null || IssueFrmDate == "" || IssueFrmDate == undefined)
                    && (IssueToDate == null || IssueToDate == "" || IssueToDate == undefined)
                ) {
                blnBkgDateEmpty = true;
                $.alert.open("warning", "Please select Booking/Issue From & To dates");
                return false;
            }
                //else if ((bkgFrmDate == null || bkgFrmDate == "" || bkgFrmDate == undefined)
                //    && (bkgToDate == null || bkgToDate == "" || bkgToDate == undefined)
                //    ) {
                //    blnBkgDateEmpty = true;
                //    $.alert.open("warning", "Please select Booking From & To dates");
                //    return false;
                //}
            else if ((bkgFrmDate != undefined && bkgFrmDate != null && bkgFrmDate.trim() != "")
                && (bkgToDate != undefined && bkgToDate != null && bkgToDate.trim() != "")
                ) {
                var intDays = CalculateDiff(bkgFrmDate, bkgToDate);
                try {
                    if (intDays != null && intDays <= 45 && (intDays >= 0 || bkgFrmDate == bkgToDate)) { }
                    else {
                        $.alert.open("warning", "Please select booking date criteria within 45 days");
                        return false;
                    }
                } catch (e) { }
            }
            else if ((IssueFrmDate == null || IssueFrmDate == "" || IssueFrmDate == undefined)
                    && (IssueToDate == null || IssueToDate == "" || IssueToDate == undefined)
                && (blnBkgDateEmpty == true)
                    ) {
                $.alert.open("warning", "Please select Issue From & To dates");
                return false;
            }
            else if ((IssueFrmDate != undefined && IssueFrmDate != null && IssueFrmDate.trim() != "")
                && (IssueToDate != undefined && IssueToDate != null && IssueToDate.trim() != "")
                ) {
                var intDays = CalculateDiff(IssueFrmDate, IssueToDate);
                try {
                    if (intDays != null && intDays <= 45 && (intDays >= 0 || IssueFrmDate == IssueToDate)) { }
                    else {
                        $.alert.open("warning", "Please select issue date criteria within 45 days");
                        return false;
                    }
                } catch (e) { }
            }
            else {
                $.alert.open("warning", "Please select Booking/Issue date criteria");
                return false;
            }
        }
        var BkgFromDt = bkgFrmDate; var BkgToDt = bkgToDate;
        var IssFromDt = IssueFrmDate; var IssToDt = IssueToDate;
        var strParam = "RptName=" + RptName;
        strParam += "&BFD=" + BkgFromDt; strParam += "&BTD=" + BkgToDt;
        strParam += "&IFD=" + IssFromDt; strParam += "&ITD=" + IssToDt;
        strParam += "&ASt=" + AdStatus; strParam += "&Bkg=" + rptTxtBkgNo;
        strParam += "&AT=" + AdType; strParam += "&Pub=" + ddlPubln; strParam += "&Prod=" + ddlProduct;
        strParam += "&AC=" + window.sessionStorage.strFranchiseAgencyCode;
        strParam += "&BUId=" + window.sessionStorage.strUserId;

        ShowPopup(gStrIpVal +"ReportNew.aspx", strParam);
    });

    $("#BtnRptContentClear").click(function (event) {
        event.preventDefault();
        $("#txtRptContentBkgFrmDate").val(''); $("#txtRptContentBkgToDate").val('');
        $("#txtRptContentIssFromDate").val(''); $("#txtRptContentIssToDate").val('');
        $("#ddlAdType").val(''); $("#ddlAdStatus").val(''); $("#ddlClient").val('');
        $("#rbtnContentDetailedRpt")[0].checked = true;
        rbtn_Changed("rbtnContentDetailedRpt"); $("#rptTxtBkgNo").val('');

        //$("#tdContentDetailedRpt").css("display", "none");
        //$("#rbtnContentRpt").prop("checked", true);
        //rbtn_Changed("");
    });

    Loadpub_Publication(""); Loadpub_Product("", "");
    rbtn_Changed("rbtnContentDetailedRpt");
    //$("#tdContentDetailedRpt").css("display", "none");
    //$("#rbtnContentRpt").prop("checked", true);
    //rbtn_Changed("");

});



function Loadpub_Publication(strAdType) {
    if (strAdType == undefined || strAdType == null || strAdType.trim() == "") {
        $("#ddlPubln").get(0).options.length = 0;
        $("#ddlPubln").get(0).options[0] = new Option("Select Publication", "");
        $("#ddlProduct").get(0).options.length = 0;
        $("#ddlProduct").get(0).options[0] = new Option("Select Product", "");
        //lstPubln = [];
        $.ajax({
            // url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/Get_pub_Publication",
            url: gStrIpVal + "HinduFranchiseeService.svc/Get_pub_Publication",
            cache: false,
            type: "POST",
            data: '{"struserid": "' + window.sessionStorage.strUserId + '"}',
            async: false,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                var index1;
                $.each(data.Get_pub_PublicationResult, function (index1, value) {
                    $("#ddlPubln").append("<option value=" + data.Get_pub_PublicationResult[index1].strPublncode + ">" + data.Get_pub_PublicationResult[index1].strPublnDesc + "</option>");
                    //lstPubln.push(value);
                });
                Loadpub_Product("");
            },
            error: function (jqXHR) { }
        });
    }
    else {
        $("#ddlPubln").get(0).options.length = 0;
        $("#ddlPubln").get(0).options[0] = new Option("Select Publication", "");
        $("#ddlProduct").get(0).options.length = 0;
        $("#ddlProduct").get(0).options[0] = new Option("Select Product", "");
        $.ajax({
            // url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetPublnDtls",
            url: gStrIpVal + "HinduFranchiseeService.svc/GetPublnDtls",
            cache: false,
            type: "POST",
            data: '{"strAdType": "' + strAdType + '","strAdStatus": "","strUserId": "' + window.sessionStorage.strUserId + '"}',
            //, , 
            async: false,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                var index1;
                $.each(data.GetPublnDtlsResult, function (index1, value) {
                    $("#ddlPubln").append("<option value=" + data.GetPublnDtlsResult[index1].strPublncode + ">" + data.GetPublnDtlsResult[index1].strPublnDesc + "</option>");
                });
                Loadpub_Product("");
            },
            error: function (jqXHR) { }
        });
    }
}

function Loadpub_Product(strPubln) {
    if (strPubln == undefined || strPubln == null || strPubln.trim() == "") {
        $("#ddlProduct").get(0).options.length = 0;
        $("#ddlProduct").get(0).options[0] = new Option("Select Product", "");
        //lstProd = [];
        $.ajax({
            //url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/Get_pub_Product",
            url: gStrIpVal + "HinduFranchiseeService.svc/Get_pub_Product",
            cache: false,
            type: "POST",
            data: '{"struserid": "' + window.sessionStorage.strUserId + '"}',
            async: false,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                var index1; strval = "";
                $.each(data.Get_pub_ProductResult, function (index1, value) {
                    $("#ddlProduct").append("<option value=" + data.Get_pub_ProductResult[index1].strProductcode + ">" + data.Get_pub_ProductResult[index1].strProductDesc + "</option>");
                    //lstProd.push(value);
                });
            },
            error: function (jqXHR) {
                //alert(jqXHR.responseText);
            }
        });
    }
    else {
        $("#ddlProduct").get(0).options.length = 0;
        $("#ddlProduct").get(0).options[0] = new Option("Select Product", "");
        var strAdTypeTemp = $("#ddlAdType").val();
        $.ajax({
            // url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetProdDtls",
            url: gStrIpVal + "HinduFranchiseeService.svc/GetProdDtls",
            cache: false,
            type: "POST",
            data: '{"strAdStatus":"","strUserId": "' + window.sessionStorage.strUserId + '","strAdType": "' + strAdTypeTemp + '","strPublnCode": "' + strPubln + '"}',
            async: false,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                var index1; strval = "";
                $.each(data.GetProdDtlsResult, function (index1, value) {
                    $("#ddlProduct").append("<option value=" + data.GetProdDtlsResult[index1].strProductcode + ">" + data.GetProdDtlsResult[index1].strProductDesc + "</option>");
                });
            },
            error: function (jqXHR) { }
        });
    }
}

function rbtn_Changed(evnt) {
    $("#ddlAdType").css('display', 'none'); $("#ddlPubln").css('display', 'none'); $("#ddlProduct").css('display', 'none');
    $("#ddlAdType").val(''); $("#ddlPubln").val(''); $("#ddlProduct").val('');
    Loadpub_Publication(""); Loadpub_Product("");
    if (evnt == "rbtnContentDetailedRpt") {
        $("#ddlAdType").css('display', 'block'); $("#ddlPubln").css('display', 'block'); $("#ddlProduct").css('display', 'block');
    }
}

function GetClientDetailsForSearch() {
    $("#ddlClient").get(0).options.length = 0;
    $("#ddlClient").get(0).options[0] = new Option("Select Client", "");
    $.ajax({
        // url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetClientDetailsForSearch",
        url: gStrIpVal + "HinduFranchiseeService.svc/GetClientDetailsForSearch",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: '{"strUserId": "' + window.sessionStorage.strUserId + '","strCliFranCode": "' + window.sessionStorage.strFranchiseAgencyCode + '"}',
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data.GetClientDetailsForSearchResult != null) {
                $.each(data.GetClientDetailsForSearchResult, function (index1, value) {
                    $("#ddlClient").append("<option value=" + data.GetClientDetailsForSearchResult[index1].strClientCode + ">" + data.GetClientDetailsForSearchResult[index1].StrClientDesc + "</option>");
                });
            }
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}

function CalculateDiff(strFrmDt, strToDt) {
    var intResult = -1;
    if (strFrmDt != "" && strToDt != "") {
        var From_date = new Date(strFrmDt.split('/')[1] + "/" + strFrmDt.split('/')[0] + "/" + strFrmDt.split('/')[2]);
        var To_date = new Date(strToDt.split('/')[1] + "/" + strToDt.split('/')[0] + "/" + strToDt.split('/')[2]);
        var diff_date = To_date - From_date;

        var years = Math.floor(diff_date / 31536000000);
        var months = Math.floor((diff_date % 31536000000) / 2628000000);
        var days = Math.floor(((diff_date % 31536000000) % 2628000000) / 86400000);
        //only days
        days = Math.floor(diff_date / 86400000);
        //alert(years + " year(s) " + months + " month(s) " + days + " and day(s)");
        intResult = parseInt(days);
    }
    return intResult;
}

function chkDtBwnFromTo(strFromDt, strToDt) {
    var blnchkIssueDt = true;
    if (strFromDt == "" || strFromDt == null || strFromDt == undefined || strToDt == "" || strToDt == null || strToDt == undefined)
        blnchkIssueDt = false;
    if (((new Date(strFromDt.split('/')[1] + '/' + strFromDt.split('/')[0] + '/' + strFromDt.split('/')[2])) <= (new Date(strToDt.split('/')[1] + '/' + strToDt.split('/')[0] + '/' + strToDt.split('/')[2])))) {
        blnchkIssueDt = false;
    }
    return blnchkIssueDt;
}

var popup; var wnd;
function ShowPopup(url, strParam) {
    //popup = window.open(url, "Popup", "toolbar=no,scrollbars=no,location=no,statusbar=no,menubar=no,resizable=0,width=100,height=100,left = 490,top = 262");
    if (!wnd || wnd.closed) {
        //wnd = window.open(url + "?" + strParam, 'Popup', 'height=' + screen.height + ',width=' + screen.width + ',scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=0,top=0');
    }
    else {
        wnd.close();
    }
    //wnd = window.open(url + "?" + strParam, "Popup", "toolbar=no,scrollbars=yes,location=no,statusbar=no,menubar=no,resizable=0,width=1200,height=900,left = 10,top = 10");
    wnd = window.open(url + "?" + strParam, "Popup", "toolbar=no,scrollbars=yes,location=no,statusbar=no,menubar=no,resizable=0,width=" + (screen.width - ((screen.width * 10) / 100)) + ",height=" + (screen.height - ((screen.height * 10) / 100)) + ",left = 0,top = 0");
    //screen.height-((screen.height * 10)/100)
    wnd.focus();
}

var wnd;
$('#A1').click(function (e) {

});