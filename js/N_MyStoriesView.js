
var lstArticleDtls = [];
$(document).ready(function () {

    if (window.sessionStorage.strUserId == undefined || window.sessionStorage.strUserId == null || window.sessionStorage.strUserId.trim() == "" || window.sessionStorage.strUserId.trim() == "undefined" || window.sessionStorage.strUserId.trim() == "null") {
        window.sessionStorage.removeItem("strUserId");
        location.replace(gStrIpVal + 'login.html');
        return;
    }
    $("#dvLoad").css({ "display": "none" });
    $("#dvGenerate").css({ "display": "none" });
    fnloadProduct();
    fnloadLayOutDesk();
    fnloadContentDesk(); fnloadZone(); fnloadPageno();
    GetGroupName();
    //fnLoadFilterUsers();
    var now = new Date();
    now.setDate(now.getDate() + 1);
    $('#txtIssuedate').val($.datepicker.formatDate("dd/mm/yy", now));
    //$('#txtIssuedate').val($.datepicker.formatDate("dd/mm/yy", new Date()));

    fnloadSearch();


    $("#LoginUserName").text(window.sessionStorage.strUserId);
    //var $input = $(':fileroupload');
    //$input.fileinput({
    //    showUpload: false,
    //    minFileCount: 1,
    //    maxFileCount: 10,
    //    validateInitialCount: true,
    //    maxFileSize: 25 * 1024,
    //    msgSizeTooLarge: 'File "{name}" (<b>{size} KB</b>)'
    //                    + 'exceeds maximum allowed upload size of <b>{25} MB</b>. '
    //                    + 'Please retry your upload!',
    //    allowedFileExtensions: ['zip', 'rar', 'tar', 'gzip', 'gz', '7z', 'png', 'jpg', 'txt', 'doc', 'docx', 'pdf'],
    //    uploadUrl: gStrIpVal + "NewsStreamService.svc/SaveImages"
    //})

    $("#btn_saveclear").click(function () {
        //if (Validation()) {
        saveSearch();
        $("#dvLoad").css({ "display": "block" });
        $("#dvGenerate").css({ "display": "block" });
        LoadViewDetails();
        // $("#dvLoad").css({ "display": "block" });
        // $("#dvGenerate").css({ "display": "block" });
        // LoadViewDetails();
        // }
    });

    $("#btn_Clear").click(function () {
        $("#dvLoad").css({ "display": "none" });
        $("#dvGenerate").css({ "display": "none" });
        $("#tblView tbody tr").empty();
        //$("#txtIssuedate").val("");
        //  $("#ddProduct").val("");
        //$("#ddLayoutDesk").text("Select Layout Desk");
        //$("#ddContentDesk").text("Select Content Desk ");
        //$("#ddZone").text("Select Zone");
        //$("#ddPageNo").text("Select Page Name ");

    });

    $("#btn_View").click(function () {

        if (Validation()) {
            $("#dvLoad").css({ "display": "block" });
            $("#dvGenerate").css({ "display": "block" });
            LoadViewDetails();
        }
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
    //    if (window.sessionStorage.strUserGroup == "SUP" || window.sessionStorage.strUserGroup == "EDT") {
    //        strTmpUserId = "";
    //    }
    //    else {
    strTmpUserId = window.sessionStorage.strUserId;
    //}
    $("#tblView tbody tr").empty();
    $("#tblView tbody").empty();
    var IssueDate = $('#txtIssuedate').val()
    var Product = $('#ddProduct').val();
    var LayoutDesk = $("#ddLayoutDesk").val();
    var ContentDesk = $("#ddArticleType").val();
    var Zone = $("#ddZone").val();
    var Page = $("#ddPageNo").val();
    $.ajax({
        url: gStrIpVal + "/NewsStreamService.svc/MyStoryViewDetails",
        cache: false,
        type: "POST",
        async: false,
        data: '{"IssueDate": "' + IssueDate + '","Product": "' + Product + '","LayoutDesk": "' + LayoutDesk + '","ContentDesk": "' + ContentDesk + '","Zone": "' +
         Zone + '","Page": "' + Page + '","strUserId": "' + strTmpUserId + '","strRefStoryName": "' + $('#txtRefStoryName').val() + '","strArtUserID": "' + window.sessionStorage.strUserId + '"}',
        contentType: "application/json",
        returnType: 'json',
        success: function (data) {
            var index; strVal = "";
            var strslno = 0;

            if (data.MyStoryViewDetailsResult.length > 0) {
                $.each(data.MyStoryViewDetailsResult, function (index, value) {
//                    if ((data.MyStoryViewDetailsResult[index].strstatus == "T" && data.MyStoryViewDetailsResult[index].strArticles_Created == window.sessionStorage.strUserId) || data.MyStoryViewDetailsResult[index].strstatus != "T") {
                        var strStyleBkColor = "";
                        if (data.MyStoryViewDetailsResult[index].strChiefRepoterViewed == "Y")
                            strStyleBkColor = "style='background-color: #FFFACD;'";
                        if (data.MyStoryViewDetailsResult[index].strEditorViewed == "Y")
                            strStyleBkColor = "style='background-color: #AFEEEE;'";
                        if (data.MyStoryViewDetailsResult[index].strSubEditorViewed == "Y")
                            strStyleBkColor = "style='background-color: #D8BFD8;'";

                        strVal += "  <tr title='" + data.MyStoryViewDetailsResult[index].strcontent + "' " + strStyleBkColor + "> ";
                        strVal += " <td class='strParentId'>" + data.MyStoryViewDetailsResult[index].ParentId + "</td> ";
                        strVal += " <td class='StoryRef'>" + data.MyStoryViewDetailsResult[index].strRef_story_name + "</td> ";
                        strVal += " <td style='display:none' class='Caption'>" + data.MyStoryViewDetailsResult[index].Caption + "</td> ";
                        strVal += " <td class='Zone'>" + data.MyStoryViewDetailsResult[index].Zone + "</td> ";
                        strVal += " <td class='IssueDate'>" + data.MyStoryViewDetailsResult[index].IssueDate + "</td> ";
                        strVal += " <td class='Page'>" + data.MyStoryViewDetailsResult[index].strPageName + "</td> ";
                        if (data.MyStoryViewDetailsResult[index].strstatus != "A") {
                            strVal += " <td class=''>" + "Not Approved" + "</td> ";
                        }
                        else {
                            strVal += " <td class=''>" + "Approved" + "</td> ";
                        }
                        //if ((window.sessionStorage.strUserGroup == "SUP" || window.sessionStorage.strUserGroup == "EDT" || window.sessionStorage.strUserGroup == "CHRPT" || window.sessionStorage.strUserGroup == "SUBEDT")) {
                        strVal += " <td class=''>" + data.MyStoryViewDetailsResult[index].strCreatedUser + "</td> ";
                        if (window.sessionStorage.strUserGroup == "RPT") {
                            strVal += " <td class=''>" + data.MyStoryViewDetailsResult[index].strReportUser + "</td> ";
                            strVal += " <td class=''>" + data.MyStoryViewDetailsResult[index].strChiefReportUser + "</td> ";
                            strVal += " <td class=''>" + data.MyStoryViewDetailsResult[index].strEditorialUser + "</td> ";
                            strVal += " <td class=''>" + data.MyStoryViewDetailsResult[index].strSubEditorialUser + "</td> ";
                        }
                        if (window.sessionStorage.strUserGroup == "CHRPT") {
                            strVal += " <td class=''>" + data.MyStoryViewDetailsResult[index].strReportUser + "</td> ";
                            strVal += " <td class=''>" + data.MyStoryViewDetailsResult[index].strChiefReportUser + "</td> ";
                            strVal += " <td class=''>" + data.MyStoryViewDetailsResult[index].strEditorialUser + "</td> ";
                            strVal += " <td class=''>" + data.MyStoryViewDetailsResult[index].strSubEditorialUser + "</td> ";
                        }
                        if (window.sessionStorage.strUserGroup == "EDT") {
                            strVal += " <td class=''>" + data.MyStoryViewDetailsResult[index].strReportUser + "</td> ";
                            strVal += " <td class=''>" + data.MyStoryViewDetailsResult[index].strChiefReportUser + "</td> ";
                            strVal += " <td class=''>" + data.MyStoryViewDetailsResult[index].strEditorialUser + "</td> ";
                            strVal += " <td class=''>" + data.MyStoryViewDetailsResult[index].strSubEditorialUser + "</td> ";
                        }
                        if (window.sessionStorage.strUserGroup == "SUBEDT") {
                            strVal += " <td class=''>" + data.MyStoryViewDetailsResult[index].strReportUser + "</td> ";
                            strVal += " <td class=''>" + data.MyStoryViewDetailsResult[index].strChiefReportUser + "</td> ";
                            strVal += " <td class=''>" + data.MyStoryViewDetailsResult[index].strEditorialUser + "</td> ";
                            strVal += " <td class=''>" + data.MyStoryViewDetailsResult[index].strSubEditorialUser + "</td> ";
                        }
                        if (window.sessionStorage.strUserGroup == "EDTSUP") {
                            strVal += " <td class=''>" + data.MyStoryViewDetailsResult[index].strSupplementary_Editor + "</td> ";
                            //strVal += " <td class=''>" + data.MyStoryViewDetailsResult[index].strSubEditorialUser + "</td> ";
                        }
                        //                    }
                        //                    else {
                        //                        strVal += " <td style='display:none;' class=''></td>";
                        //                    }
                        strVal += " <td>";
                        if (data.MyStoryViewDetailsResult[index].strstatus != "A" && window.sessionStorage.strUserGroup != "SUP" && (data.MyStoryViewDetailsResult[index].strProcessedUser == "" || data.MyStoryViewDetailsResult[index].strProcessedUser == window.sessionStorage.strUserId)) {
                            strVal += " <a class='btn btn btn-primary' href='ArticleEditor.html?ArticleId=" + data.MyStoryViewDetailsResult[index].ParentId + "&Display=EDIT'>Edit </a>";
                        }
                        //                    if ((window.sessionStorage.strUserGroup == "SUP" || window.sessionStorage.strUserGroup == "EDT" || window.sessionStorage.strUserGroup == "CHRPT" || window.sessionStorage.strUserGroup == "SUBEDT") && data.MyStoryViewDetailsResult[index].strstatus != "A") {
                        var strProcessAnotherUser = "";
                        if ((data.MyStoryViewDetailsResult[index].strProcessedUser != "" && data.MyStoryViewDetailsResult[index].strProcessedUser != window.sessionStorage.strUserId)) {
                            strProcessAnotherUser = " title='The story cannot modify because it is being used by " + data.MyStoryViewDetailsResult[index].strProcessedUser + " user ' ";
                        }
                        strVal += " <a class='btn btn btn-primary' " + strProcessAnotherUser + "  href='ArticleEditor.html?ArticleId=" + data.MyStoryViewDetailsResult[index].ParentId + "&Display=View'>View </a>";
                        if (window.sessionStorage.strUserGroup != "SUP")
                            strVal += " <a class='btn btn btn-primary' id='" + data.MyStoryViewDetailsResult[index].ParentId + "' title='" + data.MyStoryViewDetailsResult[index].strRef_story_name + "' onclick='DeleteStory(this.id, this.title)' >Delete </a>";
                        //                    }
                        strVal += "  </td>";
                        strVal += " </tr> ";
//                    }
                });


                $("#tblView tbody").append(strVal);
                //if ((window.sessionStorage.strUserGroup == "SUP" || window.sessionStorage.strUserGroup == "EDT" || window.sessionStorage.strUserGroup == "CHRPT" || window.sessionStorage.strUserGroup == "SUBEDT")) {
                if (window.sessionStorage.strUserGroup == "RPT") {
                    $("#tblView").find(".ArtCreatedUser").show();
                    $("#tblView").find(".Report_User").show();
                    $("#tblView").find(".Chief_Report_User").show();
                    $("#tblView").find(".Editorial_User").show();
                    $("#tblView").find(".Sub_Editorial_User").show();
                    $("#tblView").find(".Subli_Editorial_User").hide();
                }
                if (window.sessionStorage.strUserGroup == "CHRPT") {
                    $("#tblView").find(".ArtCreatedUser").show();
                    $("#tblView").find(".Report_User").show();
                    $("#tblView").find(".Chief_Report_User").show();
                    $("#tblView").find(".Editorial_User").show();
                    $("#tblView").find(".Sub_Editorial_User").show();
                    $("#tblView").find(".Subli_Editorial_User").hide();
                }
                if (window.sessionStorage.strUserGroup == "EDT") {
                    $("#tblView").find(".ArtCreatedUser").show();
                    $("#tblView").find(".Report_User").show();
                    $("#tblView").find(".Chief_Report_User").show();
                    $("#tblView").find(".Editorial_User").show();
                    $("#tblView").find(".Sub_Editorial_User").show();
                    $("#tblView").find(".Subli_Editorial_User").hide();
                }
                if (window.sessionStorage.strUserGroup == "SUBEDT") {
                    $("#tblView").find(".ArtCreatedUser").show();
                    $("#tblView").find(".Report_User").show();
                    $("#tblView").find(".Chief_Report_User").show();
                    $("#tblView").find(".Editorial_User").show();
                    $("#tblView").find(".Sub_Editorial_User").show();
                    $("#tblView").find(".Subli_Editorial_User").hide();
                }
                if (window.sessionStorage.strUserGroup == "EDTSUB") {
                    $("#tblView").find(".ArtCreatedUser").show();
                    $("#tblView").find(".Report_User").hide();
                    $("#tblView").find(".Chief_Report_User").hide();
                    $("#tblView").find(".Editorial_User").hide();
                    $("#tblView").find(".Sub_Editorial_User").hide();
                    $("#tblView").find(".Subli_Editorial_User").show();
                }
                //}
                //                else {
                //                    $("#tblView").find(".ArtCreatedUser").hide();
                //                    $("#tblView").find(".Report_User").hide();
                //                    $("#tblView").find(".Chief_Report_User").hide();
                //                    $("#tblView").find(".Editorial_User").hide();
                //                    $("#tblView").find(".Sub_Editorial_User").hide();
                //                }

                $("#tblView").dataTable().fnDestroy();
                $('#tblView').dataTable();

            }
            else {
                //$("#tblView tbody").append('<tr><td colspan="11">No Data Found</td></tr>');

            }


        },
        error: function (jqXHR) {

            alert("Not saved");

        }

    });

};


function fnloadProduct() {
    var ele = "";
    $("#ddProduct").get(0).options.length = 0;
    $("#ddProduct").get(0).options[0] = new Option("Select Product", "");
    ele = $("#ddProduct"); var Cntproduct = 0;
    $.ajax({
        url: gStrIpVal + "NewsStreamService.svc/GetProduct",
        cache: false,
        type: "POST",
        contentType: "application/json",
        async: false,
        dataType: 'JSON',
        success: function (data) {
            var index1; strval = "";
            $.each(data.GetProductResult, function (index1, value) {
                ele.append("<option value=" + data.GetProductResult[index1].strProductcode + ">" + data.GetProductResult[index1].strProductDesc + "</option>");
            });
            Cntproduct = data.GetProductResult.length;
            if (Cntproduct == 1) {
                ele.get(0).selectedIndex = 1
                ele.trigger("change");
            }

            $('#ddProduct').change(function () {
                if ($('#ddProduct').val() != "") {
                    fnloadLayOutDesk();
                }
            });
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}

function fnloadLayOutDesk() {
    var ele = "";
    ele = $("#ddLayoutDesk"); var Cntproduct = 0;
    var strProd = $('#ddProduct').val();
    $(ele).get(0).options.length = 0;
    $(ele).get(0).options[0] = new Option("Select Layout Desk", "");
    $.ajax({
        url: gStrIpVal + "NewsStreamService.svc/GetLayOutDesk",
        data: '{"strProduct": "' + strProd + '"}',
        cache: false,
        type: "POST",
        contentType: "application/json",
        async: false,
        dataType: 'JSON',
        success: function (data) {
            var index1; strval = "";
            $.each(data.GetLayOutDeskResult, function (index1, value) {
                ele.append("<option value=" + data.GetLayOutDeskResult[index1].strProductcode + ">" + data.GetLayOutDeskResult[index1].strProductDesc + "</option>");
            });
            Cntproduct = data.GetLayOutDeskResult.length;
            if (Cntproduct == 1) {
                ele.get(0).selectedIndex = 1
                ele.trigger("change");
            }

            $('#ddLayoutDesk').change(function () {
                if ($('#ddLayoutDesk').val() != "")
                    fnloadPageno();
            });
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}

function fnloadContentDesk() {
    var ele = "";
    ele = $("#ddContentDesk"); var Cntproduct = 0;
    //$(ele).get(0).options.length = 0;
    //$(ele).get(0).options[0] = new Option("Select Layout Desk", "");
    $.ajax({
        url: gStrIpVal + "NewsStreamService.svc/GetContentDesk",
        cache: false,
        type: "POST",
        contentType: "application/json",
        async: false,
        dataType: 'JSON',
        success: function (data) {
            var index1; strval = "";
            $.each(data.GetContentDeskResult, function (index1, value) {
                ele.append("<option value=" + data.GetContentDeskResult[index1].strProductcode + ">" + data.GetContentDeskResult[index1].strProductDesc + "</option>");
            });
            Cntproduct = data.GetContentDeskResult.length;
            if (Cntproduct == 1) {
                ele.get(0).selectedIndex = 1
                ele.trigger("change");
            }
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}

function fnloadZone() {

    var ele = "";
    ele = $("#ddZone"); var Cntproduct = 0;
    $("#ddZone").get(0).options.length = 0;
    $("#ddZone").get(0).options[0] = new Option("Select Zone", "");
    $.ajax({
        url: gStrIpVal + "NewsStreamService.svc/GetZone",
        cache: false,
        type: "POST",
        contentType: "application/json",
        async: false,
        dataType: 'JSON',
        success: function (data) {
            var index1; strval = "";
            $.each(data.GetZoneResult, function (index1, value) {
                ele.append("<option value=" + data.GetZoneResult[index1].strProductcode + ">" + data.GetZoneResult[index1].strProductDesc + "</option>");
            });
            Cntproduct = data.GetZoneResult.length;
            if (Cntproduct == 1) {
                ele.get(0).selectedIndex = 1
                ele.trigger("change");
            }
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}


function fnloadPageno() {
    var ele = "";
    ele = $("#ddPageNo"); var Cntproduct = 0;
    $("#ddPageNo").get(0).options.length = 0;
    $("#ddPageNo").get(0).options[0] = new Option("Select Page No", "");
    var strDesk = $('#ddLayoutDesk').val();
    $.ajax({
        url: gStrIpVal + "NewsStreamService.svc/GetPageno",
        data: '{"strDesk": "' + strDesk + '"}',
        cache: false,
        type: "POST",
        contentType: "application/json",
        async: false,
        dataType: 'JSON',
        success: function (data) {
            var index1; strval = "";
            $.each(data.GetPagenoResult, function (index1, value) {
                ele.append("<option value=" + data.GetPagenoResult[index1].strProductcode + ">" + data.GetPagenoResult[index1].strProductDesc + "</option>");
            });
            Cntproduct = data.GetPagenoResult.length;
            if (Cntproduct == 1) {
                ele.get(0).selectedIndex = 1
                ele.trigger("change");
            }
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}

function GetGroupName() {
    if (window.sessionStorage.strUserGroup == "RPT") {
        $('.clsStyGpname').text('View My Stories - Reporter');
    }
    if (window.sessionStorage.strUserGroup == "CHRPT") {
        $('.clsStyGpname').text('View My Stories - Chief Reporter');

    }
    if (window.sessionStorage.strUserGroup == "EDT") {
        $('.clsStyGpname').text('View My Stories - Editor');

    }
    if (window.sessionStorage.strUserGroup == "SUBEDT") {
        $('.clsStyGpname').text('View My Stories - Sub Editor');
    }
    if (window.sessionStorage.strUserGroup == "EDTSUP") {
        $('.clsStyGpname').text('View My Stories - Supplementary Editor');
    }
}

function saveSearch() {

    var Product = $('#ddProduct').val();
    var LayoutDesk = $("#ddLayoutDesk").val();
    var ContentDesk = $("#ddArticleType").val();
    var Zone = $("#ddZone").val();
    var Page = $("#ddPageNo").val();

    $.ajax({
        url: gStrIpVal + "/NewsStreamService.svc/SaveSearch",
        cache: false,
        type: "POST",
        async: false,
        data: '{"Product": "' + Product + '","LayoutDesk": "' + LayoutDesk + '","ContentDesk": "' + ContentDesk + '","Zone": "' +
         Zone + '","Page": "' + Page + '","strUserId": "' + window.sessionStorage.strUserId + '"}',
        contentType: "application/json",
        returnType: 'json',
        success: function (data) {

        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}


function CheckPlacedStory(story_id) {
    var strarticle_placed = "";
    try {
        if (story_id != "") {
            $.ajax({
                url: gStrIpVal + "NewsStreamService.svc/ChkAlreadyPlaced",
                data: '{"strstory_id": "' + story_id + '"}',
                cache: false,
                type: "POST",
                contentType: "application/json",
                async: false,
                dataType: 'JSON',
                success: function (data) {
                    var index1; strval = "";
                    ///$("#tmpID").text(data.GetTmpUniIDResult);
                    strarticle_placed = data.ChkAlreadyPlacedResult;

                },
                error: function (jqXHR) {
                }
            });
        }
    }
    catch (e) { }
    return strarticle_placed;
}

function DeleteStory(story_id, strStory_Name) {
    var strarticle_placed = "";
    strarticle_placed = CheckPlacedStory(story_id);


    if (strarticle_placed == "Y") {
        $.alert.open("warning", "The mentioned story <b>" + strStory_Name + "</b> has already placed. ");
        return false;
    }
    else {


        $.alert.open('confirm', ' Are you sure you want to delete the story    ' + strStory_Name + '</br>  ', function (button) {
            if (button == 'yes') {

                $.ajax({
                    url: gStrIpVal + "/NewsStreamService.svc/DeleteStory",
                    cache: false,
                    type: "POST",
                    async: false,
                    data: '{"story_id": "' + story_id + '","strDeleteUserId": "' + window.sessionStorage.strUserId + '"}',
                    contentType: "application/json",
                    returnType: 'json',
                    success: function (data) {
                        window.location.href = "ArticleView.html";
                    },
                    error: function (jqXHR) {
                        //alert(jqXHR.responseText);
                        window.location.href = "ArticleView.html";
                    }
                });


            }
            else if (button == 'no') {
                return false;
            }
            else {
                return false;
            }
        });

    }


}

function fnloadSearch() {

    var lstsearch = [];
    $.ajax({
        url: gStrIpVal + "NewsStreamService.svc/SearchDetails",
        cache: false,
        type: "POST",
        contentType: "application/json",
        async: false,
        data: '{"strUserId": "' + window.sessionStorage.strUserId + '"}',
        dataType: 'JSON',
        success: function (data) {

            lstsearch = data.SearchDetailsResult;
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });

    if (lstsearch.length > 0) {
        $('#ddProduct').val(lstsearch[0].strProductid);
        fnloadLayOutDesk();
        $('#ddZone').val(lstsearch[0].strZone);
        $('#ddPageNo').val(lstsearch[0].strpage);
        $('#ddLayoutDesk').val(lstsearch[0].strlayoutdesk);
        $('#ddArticleType').val(lstsearch[0].strtype);
        $("#dvLoad").css({ "display": "block" });
        $("#dvGenerate").css({ "display": "block" });
        LoadViewDetails();

    }
    // alert(lstsearch.length);
}


////function fnLoadFilterUsers() {
////    var ele = "";
////    ele = $("#ddlAllUserList"); var Cntproduct = 0;    
////    $(ele).get(0).options.length = 0;
////    $(ele).get(0).options[0] = new Option("Select User", "");
////    $.ajax({
////        url: gStrIpVal + "NewsStreamService.svc/GetAllUserList",
////        //data: '{"strProduct": "' + strProd + '"}',
////        cache: false,
////        type: "POST",
////        contentType: "application/json",
////        async: false,
////        dataType: 'JSON',
////        success: function (data) {
////            var index1; strval = "";
////            $.each(data.GetAllUserListResult, function (index1, value) {
////                ele.append("<option value=" + data.GetAllUserListResult[index1].strArtUserID + ">" + data.GetAllUserListResult[index1].strArtUserName + "</option>");
////            });
////            $('#ddlAllUserList').selectpicker('refresh');
////            Cntproduct = data.GetAllUserListResult.length;
////            if (Cntproduct == 1) {
////                ele.get(0).selectedIndex = 1
////                ele.trigger("change");                
////            }
//////            $('#ddlAllUserList').change(function () {
//////                if ($('#ddLayoutDesk').val() != "")
//////                    fnloadPageno();
//////            });
////        },
////        error: function (jqXHR) {
////            //alert(jqXHR.responseText);
////        }
////    });
////}