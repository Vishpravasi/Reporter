$(document).ready(function () {

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

    GetClientDetailsForSearch();

    $("#BtnRptPaymentSearch").click(function (event) {
        event.preventDefault();
        try {

        } catch (e) { }
        var bkgFrmDate = $("#txtRptPaymentBkgFrmDate").val();
        var bkgToDate = $("#txtRptPaymentBkgToDate").val();
        var IssueFrmDate = $("#txtRptPaymentIssFromDate").val();
        var IssueToDate = $("#txtRptPaymentIssToDate").val();
        if (bkgFrmDate != undefined && bkgFrmDate != null && bkgFrmDate != "") {
            if (bkgToDate == undefined || bkgToDate == null || bkgToDate == "") {
                alert("Kindly Select Booking To Date");
                return false;
            }
        }
        if (bkgToDate != undefined && bkgToDate != null && bkgToDate != "") {
            if (bkgFrmDate == undefined || bkgFrmDate == null || bkgFrmDate == "") {
                alert("Kindly Select Booking From Date");
                return false;
            }
        }

        if (IssueFrmDate != undefined && IssueFrmDate != null && IssueFrmDate != "") {
            if (IssueToDate == undefined || IssueToDate == null || IssueToDate == "") {
                alert("Kindly Select Insertion To Date");
                return false;
            }
        }
        if (IssueToDate != undefined && IssueToDate != null && IssueToDate != "") {
            if (IssueFrmDate == undefined || IssueFrmDate == null || IssueFrmDate == "") {
                alert("Kindly Select Insertion From Date");
                return false;
            }
        }

        if (chkDtBwnFromTo(bkgFrmDate, bkgToDate) == false) { }
        else {
            alert("Booking To Date is Less than Booking From Date");
            return;
        }

        if (chkDtBwnFromTo(IssueFrmDate, IssueToDate) == false) { }
        else {
            alert("Insertion To Date is Less than Insertion From Date");
            return;
        }
        var AdStatus = $("#ddlAdStatus").val();
        var AdType = $("#ddlAdType").val();
        var CC = $("#ddlClient").val();

        if ((bkgFrmDate == null || bkgFrmDate == "" || bkgFrmDate == undefined)
            && (BkgToDt == null || BkgToDt == "" || BkgToDt == undefined)
            && (IssueFrmDate == null || IssueFrmDate == "" || IssueFrmDate == undefined)
            && (IssueToDate == null || IssueToDate == "" || IssueToDate == undefined)
            && (AdStatus == null || AdStatus == "" || AdStatus == undefined)
            && (AdType == null || AdType == "" || AdType == undefined)
            ) {
            alert("Please select any search criteria & proceed further");
            //$.alert.open('error', 'Please select a Franchisee user');
            return false;
        }

        if ((bkgFrmDate == null || bkgFrmDate == "" || bkgFrmDate == undefined)
            && (BkgToDt == null || BkgToDt == "" || BkgToDt == undefined)
            ) {
            alert("Please select Booking dates");
            //$.alert.open('error', 'Please select a Franchisee user');
            return false;
        }

        //if (AdStatus == null || AdStatus == "" || AdStatus == undefined) {
        //    alert("Please select Ad Status");
        //    //$.alert.open('error', 'Please select a Franchisee user');
        //    return false;
        //}

        //alert(daydiff(parseDate(bkgFrmDate), parseDate(bkgToDate)));
        var intDays = CalculateDiff(bkgFrmDate, bkgToDate);
        try {
            if (intDays != null && intDays <= 45 && (intDays >= 0 || bkgFrmDate == bkgToDate)) { }
            else {
                alert("Please select date criteria within 45 days");
                return false;
            }
        } catch (e) { }
        var RptName = "PaymentRpt";
        var BkgFromDt = bkgFrmDate; var BkgToDt = bkgToDate;
        var IssFromDt = IssueFrmDate; var IssToDt = IssueToDate;
        var strParam = "RptName=" + RptName;
        strParam += "&BFD=" + BkgFromDt; strParam += "&BTD=" + BkgToDt;
        strParam += "&IFD=" + IssFromDt; strParam += "&ITD=" + IssToDt;
        strParam += "&ASt=" + AdStatus; strParam += "&AT=" + AdType;
        strParam += "&AC=" + window.sessionStorage.strFranchiseAgencyCode;
        strParam += "&CC=" + CC;

        ShowPopup(gStrIpVal +"Report.aspx", strParam);
    });

    $("#BtnRptPaymentClear").click(function (event) {
        event.preventDefault();
        $("#txtRptPaymentBkgFrmDate").val(''); $("#txtRptPaymentBkgToDate").val('');
        $("#txtRptPaymentIssFromDate").val(''); $("#txtRptPaymentIssToDate").val('');
        $("#ddlAdType").val(''); $("#ddlAdStatus").val(''); $("#ddlClient").val('');
    });

});

function GetClientDetailsForSearch() {
    $("#ddlClient").get(0).options.length = 0;
    $("#ddlClient").get(0).options[0] = new Option("Select Client", "");
    $.ajax({
        //url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/GetClientDetailsForSearch",
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