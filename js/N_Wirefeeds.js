
var lstArticleDtls = [];
$(document).ready(function () {

    if (window.sessionStorage.strUserId == undefined || window.sessionStorage.strUserId == null || window.sessionStorage.strUserId.trim() == "" || window.sessionStorage.strUserId.trim() == "undefined" || window.sessionStorage.strUserId.trim() == "null") {
        window.sessionStorage.removeItem("strUserId");
        location.replace(gStrIpVal + 'login.html');
        return;
    }
    $("#dvLoad").css({ "display": "none" });
    $("#dvGenerate").css({ "display": "none" });

    var now = new Date();
    now.setDate(now.getDate() + 1);
    $('#txtIssuedate').val($.datepicker.formatDate("dd/mm/yy", now));



    $("#LoginUserName").text(window.sessionStorage.strUserId);

    $("#btn_saveclear").click(function () {
        $("#dvLoad").css({ "display": "block" });
        $("#dvGenerate").css({ "display": "block" });
        LoadViewDetails();
    });

    $("#btn_Clear").click(function () {
        $("#dvLoad").css({ "display": "none" });
        $("#dvGenerate").css({ "display": "none" });
        $("#tblView tbody tr").empty();
        $('#txtCreatedDate').val("");
    });

    $("#btn_View").click(function () {

        //if (Validation()) {
        $("#dvLoad").css({ "display": "block" });
        $("#dvGenerate").css({ "display": "block" });
        LoadViewDetails();
        //}
    });

});

function Validation() {
    var Result = true;

    if ($("#txtIssuedate").val() == "" || $("#txtIssuedate").val() == "undefined" || $("#txtIssuedate").val() == null) {
        Result = false;
        alert("Kindly Select Issue Date");
    }
    return Result;
}
function LoadViewDetails() {
    var strTmpUserId = "";
    strTmpUserId = window.sessionStorage.strUserId;
    $("#tblView tbody tr").empty();
    $("#tblView tbody").empty();
    var strDate = $('#txtCreatedDate').val();
    var strHead = "";
    var strContent = "";
    var strTrnsID = "";
    $.ajax({
        url: gStrIpVal + "/NewsStreamService.svc/ViewWirefeeds",
        cache: false,
        type: "POST",
        async: false,
        data: '{"strDate": "' + strDate + '","strHead": "' + strHead + '","strContent": "' + strContent + '","strTrnsID": "' + strTrnsID + '"}',
        contentType: "application/json",
        returnType: 'json',
        success: function (data) {
            var index; strVal = "";
            var strslno = 0;

            if (data.ViewWirefeedsResult.length > 0) {
                $.each(data.ViewWirefeedsResult, function (index, value) {

                    strVal += "  <tr title='" + data.ViewWirefeedsResult[index].strWireFeedContent + "'> ";
                    strVal += " <td>" + data.ViewWirefeedsResult[index].strWireFeedSrc + "</td> ";
                    strVal += " <td>" + data.ViewWirefeedsResult[index].strWireFeedHead + "</td> ";
                    //                    strVal += " <td >" + data.ViewWirefeedsResult[index].strWireFeedContent + "</td> ";
                    strVal += " <td>" + data.ViewWirefeedsResult[index].strWireFeedWords + "</td> ";
                    strVal += " <td>" + data.ViewWirefeedsResult[index].strWireFeedDateLine + "</td> ";
                    strVal += " <td>" + data.ViewWirefeedsResult[index].strWireFeedDateTime + "</td> ";                    
                    strVal += "<td> <a class='btn btn btn-primary'  href='ArticleEditor.html?Trnsid=" + data.ViewWirefeedsResult[index].strWireFeedID + "'>Edit Story </a> </td>";
                    //strVal += " <td class='Page'>" + data.ViewWirefeedsResult[index].strPageName + "</td> ";
                    strVal += " </tr> ";

                });


                $("#tblView tbody").append(strVal);

                $("#tblView").dataTable().fnDestroy();
                $('#tblView').dataTable();

            }
            else {


            }


        },
        error: function (jqXHR) {

            alert("Not saved");

        }

    });

};


function GetGroupName() {
    if (window.sessionStorage.strUserGroup == "RPT") {
        $('.clsStyGpname').text('Story Editor - Reporter');
    }
    if (window.sessionStorage.strUserGroup == "CHRPT") {
        $('.clsStyGpname').text('Story Editor - Chief Reporter');

    }
    if (window.sessionStorage.strUserGroup == "EDT") {
        $('.clsStyGpname').text('Story Editor - Editor');

    }
    if (window.sessionStorage.strUserGroup == "SUBEDT") {
        $('.clsStyGpname').text('Story Editor - Sub Editor');
    }
    if (window.sessionStorage.strUserGroup == "EDTSUP") {
        $('.clsStyGpname').text('Story Editor - Supplementary Editor');
    }
}

