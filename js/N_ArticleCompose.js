
var lstArticleDtls = []; var strEditArticleId = ""; var blnEditFlag = false; var lstImgDtlsWhenEdit = []; var lstImgCaptionDtlsWhenEdit = [];
var lstImgNameDtlsWhenEdit = [];
var strProcessedUserid = "";
var strGChiefReportUser = ""; var strGEditorialUser = ""; var strGSubEditorialUser = "";
var lstImgDtlsToDeleteWhenEdit = "";
var strGChkAvailabl = "";
var strEditImagePath = "";
var strEditImageName = "";
var strEditImageCutline = "";
var strEditDisplay = "";
var strMode = "I";

var lstContMobileNo = [];
var lstContName = [];
var strTrans = "";


$(document).ready(function () {
    //if (window.sessionStorage.strUserId == undefined || window.sessionStorage.strUserId == null || window.sessionStorage.strUserId.trim() == "" || window.sessionStorage.strUserId.trim() == "undefined" || window.sessionStorage.strUserId.trim() == "null") {
    //    window.sessionStorage.removeItem("strUserId");
    //    location.replace(gStrIpVal + 'login.html');
    //    return;
    //}
    GetGroupName();
    fnloadProduct();
    //fnloadLayOutDesk();
    fnloadContentDesk();
    fnloadZone();
    //fnloadPageno();
    LoadProductList("");
    strEditArticleId = "";
    //$('#btnAddNew').css('display', 'none');
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

    $("#LoginUserName").text(window.sessionStorage.strUserId);

    $("#btnApprove").hide(); $("#btnUpdate").hide();

    $('#btnclose').click(function () {

        if (blnEditFlag == true) {
            UpdateProcessSts(strEditArticleId);
        }
        location.replace(gStrIpVal + 'ArticleView.html');
    });

    //To disable the translate option to repoter and chief editor
    if (window.sessionStorage.strUserGroup == "CHRPT" || window.sessionStorage.strUserGroup == "RPT") {
        $('#btn_Clear').css('display', 'none');
    }

    if (window.sessionStorage.strUserGroup == "SUP" || window.sessionStorage.strUserGroup == "EDT" || window.sessionStorage.strUserGroup == "SUBEDT" || window.sessionStorage.strUserGroup == "EDTSUP") {
        if (window.sessionStorage.strUserGroup == "SUBEDT") {
            $('#ddlAssignUser').removeClass('mandatory');
            $('#strAssgnMadr').text('');
            //$('#ddlAssignUser').css('display', 'none');
            $('#divAssignStory').css('display', 'none');
        }
        else {
            $('#ddlAssignUser').removeClass('mandatory');
            $('#strAssgnMadr').text('');
        }
    }
    else {
        $('#strAssgnMadr').text('*');
    }

    strEditArticleId = querySt("ArticleId");
    strEditDisplay = querySt("Display");

    strTrans = querySt("Trnsid");

    if (strEditArticleId != "" && strEditArticleId != undefined) {
        blnEditFlag = true;
        $('#data_2').css('display', 'block');
        fnEditArticle(strEditArticleId);
        strEditArticleId = strEditArticleId;
        $("#tmpID").text(strEditArticleId);
        $("#btnSave").hide();
        $("#btnSaveToDraft").hide();
        fnLoadArticleImage();
        if (window.sessionStorage.strUserGroup == "SUP" || window.sessionStorage.strUserGroup == "EDT" || window.sessionStorage.strUserGroup == "SUBEDT" || window.sessionStorage.strUserGroup == "EDTSUP") {
            if (strProcessedUserid == '' || (strProcessedUserid == window.sessionStorage.strUserId)) {
                if (ValidateAlreadyAssign(window.sessionStorage.strUserGroup, strGChiefReportUser, strGEditorialUser, strGSubEditorialUser)) {
                    $("#btnSave").show();
                    $("#btnApprove").show();
                    $("#btnSaveToDraft").show();
                }
                else {
                    $("#btnSave").hide();
                    $("#btnApprove").hide();
                    $("#btnSaveToDraft").hide();
                }
            }
            else {
                alert("The story cannot modify because it is being used by " + strProcessedUserid + " user ");
                $("#btnSave").hide();
                $("#btnApprove").hide();
                $("#btnSaveToDraft").hide();
            }

        }
        else {
            if (strProcessedUserid == '' || (strProcessedUserid == window.sessionStorage.strUserId)) {
                if (ValidateAlreadyAssign(window.sessionStorage.strUserGroup, strGChiefReportUser, strGEditorialUser, strGSubEditorialUser)) {
                    $("#btnApprove").hide(); $("#btnSave").show(); $("#btnSaveToDraft").show();
                }
                else {
                    $("#btnApprove").hide(); $("#btnSave").hide(); $("#btnSaveToDraft").hide();
                }
            }
            else {
                alert("The story cannot modify because it is being used by " + strProcessedUserid + " user ");
                $("#btnSave").hide();
                $("#btnApprove").hide();
                $("#btnSaveToDraft").hide();
            }
        }

    }
    if (strEditDisplay == "View") {
        $("#btnSave").hide();
        $("#btnApprove").hide();
        $("#btnSaveToDraft").hide();

    }


    if (strTrans != "" && strTrans != undefined) {
        fn_GetWireFeedStory(strTrans);
    }

    if (blnEditFlag == false) {
        var now = new Date();
        now.setDate(now.getDate() + 1);
        $('#txtIssuedate').val($.datepicker.formatDate("yy-mm-dd", now));
        fnGetTmpID();
    }

    $('#btncheckurl').click(function () {
        $('#divYoutubelink').empty();
        var str = $("#txtYurl").val();
        var str = str.replace("watch?v=", "embed/");
        $('#divYoutubelink').html('<iframe id="iframe"   src="' + str + '" width="500" height="350"></iframe>');
    });

    $('#chkquot').click(function () {
        if ($('#chkquot').is(":checked")) {
            $('#txtHead').removeClass('mandatory');
            $('#HeadMadr').text('');
            $('#txtDateLine').removeClass('mandatory');
            $('#DatelineMadr').text('');
        }
        else {
            $('#txtHead').addClass('mandatory');
            $('#HeadMadr').text('*');
            $('#txtDateLine').addClass('mandatory');
            $('#DatelineMadr').text('*');
        }
    });

    $("#file1").fileinput({
        theme: 'fa',
        minFileCount: 1,
        uploadAsync: false,
        uploadUrl: gStrIpVal + '/UploadImages.ashx?filename=' + $("#tmpID").text().trim() + "&blnEditOrCreate=" + blnEditFlag,
        allowedFileExtensions: ['jpg'],
        overwriteInitial: false,
        maxFileSize: 15000,
        maxFilesNum: 10,
        deleteUrl: gStrIpVal + '/UploadImages.ashx',
        overwriteInitial: false,
        initialPreviewAsData: true,
        initialPreview: lstImgDtlsWhenEdit,
        layoutTemplates: {
            footer: '<div class="file-thumbnail-footer">\n' +
            '   <div class="file-caption-name "></div>\n' +
            '   <input type="text" class="form-control customFileCaption" ' +
                'value="" placeholder="Type caption" data-name="title"/>\n' +

                '   <input type="text" class="form-control customFileCaption" ' +
                'value="" placeholder="Photographer Name" data-name="title"/>\n' +
            '   {actions}\n' +
            '</div>'
        },

        //allowedFileTypes: ['image', 'video', 'flash'],
        slugCallback: function (filename) {
            return filename.replace('(', '_').replace(']', '_');
        }
    });

    if (blnEditFlag == true && lstImgCaptionDtlsWhenEdit.length > 0) {
        $.each($(".file-preview-frame.krajee-default.file-preview-initial.file-sortable.kv-preview-thumb .customFileCaption"), function (index1, value) {
            if (lstImgCaptionDtlsWhenEdit[index1] != undefined)
                $(this).val(lstImgCaptionDtlsWhenEdit[index1]);
            $(this).attr("data-imgName", lstImgNameDtlsWhenEdit[index1]);
            $(this).attr("title", lstImgNameDtlsWhenEdit[index1]);
            $(this).attr("alt", lstImgNameDtlsWhenEdit[index1]);

        });
    }

    $("#code_preview0").keypress(function () {
        // $(this).val($(this).val().replace(/\s\s+/g, ' '));
        if ($(this).val() == "") {
            $("#wordCnt").text("0");
        } else {
            var words = $.trim($(this).val()).split(" ");
            $("#wordCnt").text(words.length);
        }
    });

    $("#code_preview0").keydown(function () {
        // $(this).val($(this).val().replace(/\s\s+/g, ' '));
        if ($(this).val() == "") {
            $("#wordCnt").text("0");
        } else {
            var words = $.trim($(this).val()).split(" ");
            $("#wordCnt").text(words.length);
        }
    });

    $("#code_preview0").focusout(function () {
        //  $(this).val($(this).val().replace(/\s\s+/g, ' '));
        if ($(this).val() == "") {
            $("#wordCnt").text("0");
        } else {
            var words = $.trim($(this).val()).split(" ");
            $("#wordCnt").text(words.length);
        }
    });

    $("#btnApprove").click(function () {


        $.alert.open('confirm', ' Are you sure you want to approve the story ' +
               '</br>  ', function (button) {
                   if (button == 'yes') {
                       var blnError = "";
                       blnError = validateMadatory();
                       if (blnError == false && $("#Chek").prop("checked") == true) {
                           if (($(".file-preview-frame.krajee-default.kv-preview-thumb.file-preview-success").length == 0 && blnEditFlag == false)) {
                               blnError = true; $.alert.open("warning", "Kindly provide atleast one image to proceed ");
                           }
                           if (($(".file-preview-frame.krajee-default.file-preview-initial.file-sortable.kv-preview-thumb").length == 0 && $(".file-preview-frame.krajee-default.kv-preview-thumb.file-preview-success").length == 0 && blnEditFlag == true)) {
                               blnError = true; $.alert.open("warning", "Kindly provide atleast one image to proceed ");
                           }
                       }
                       else if (blnError == false && $("#ChekSQ").prop("checked") == true) {
                           if (($(".file-preview-frame.krajee-default.kv-preview-thumb.file-preview-success").length == 0 && blnEditFlag == false)) {
                               blnError = true; $.alert.open("warning", "Kindly provide atleast one image to proceed ");
                           }
                           if (($(".file-preview-frame.krajee-default.file-preview-initial.file-sortable.kv-preview-thumb").length == 0 && $(".file-preview-frame.krajee-default.kv-preview-thumb.file-preview-success").length == 0 && blnEditFlag == true)) {
                               blnError = true; $.alert.open("warning", "Kindly provide atleast one image to proceed ");
                           }
                       }
                       if (blnError == false) {
                           ArticleInsertUpdate("U");

                       }


                       $.ajax({
                           url: gStrIpVal + "NewsStreamService.svc/ApproveArticleDtls",
                           cache: false,
                           type: "POST",
                           async: false,
                           data: '{"strEditArticleId": "' + strEditArticleId + '","strUserID": "' + window.sessionStorage.strUserId + '"}',
                           contentType: "application/json",
                           dataType: "json",
                           success: function (data) {
                               var index1; strval = "";
                               if (data.ApproveArticleDtlsResult == 'S') {
                                   $.alert.open({
                                       content: "Successfully Approved",
                                       type: "Success",
                                       callback: function () {
                                           window.location.href = "ArticleView.html";
                                       }
                                   });
                               }
                               else {
                                   $.alert.open("warning", " Not approved");
                               }
                           },
                           error: function (jqXHR) {
                               alert(jqXHR.responseText);
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

    });

    $("#btnUpdate").click(function () {
        var blnError = "";
        blnError = validateMadatory();
        if (blnError == false && $("#Chek").prop("checked") == true) {
            if (($(".file-preview-frame.krajee-default.kv-preview-thumb.file-preview-success").length == 0 && blnEditFlag == false)) {
                blnError = true; $.alert.open("warning", "Kindly provide atleast one image to proceed ");
            }
            if (($(".file-preview-frame.krajee-default.file-preview-initial.file-sortable.kv-preview-thumb").length == 0 && $(".file-preview-frame.krajee-default.kv-preview-thumb.file-preview-success").length == 0 && blnEditFlag == true)) {
                blnError = true; $.alert.open("warning", "Kindly provide atleast one image to proceed ");
            }
        }
        else if (blnError == false && $("#ChekSQ").prop("checked") == true) {
            if (($(".file-preview-frame.krajee-default.kv-preview-thumb.file-preview-success").length == 0 && blnEditFlag == false)) {
                blnError = true; $.alert.open("warning", "Kindly provide atleast one image to proceed ");
            }
            if (($(".file-preview-frame.krajee-default.file-preview-initial.file-sortable.kv-preview-thumb").length == 0 && $(".file-preview-frame.krajee-default.kv-preview-thumb.file-preview-success").length == 0 && blnEditFlag == true)) {
                blnError = true; $.alert.open("warning", "Kindly provide atleast one image to proceed ");
            }
        }
        if (blnError == false) {
            ArticleInsertUpdate("U");

        }
    });

    $("#btnSave").click(function () {
        var blnError = "";
        blnError = validateMadatory();
        if (blnError == false && $("#Chek").prop("checked") == true) {
            if (($(".file-preview-frame.krajee-default.kv-preview-thumb.file-preview-success").length == 0 && blnEditFlag == false)) {
                blnError = true; $.alert.open("warning", "Kindly provide atleast one image to proceed ");
            }
            if (($(".file-preview-frame.krajee-default.file-preview-initial.file-sortable.kv-preview-thumb").length == 0 && $(".file-preview-frame.krajee-default.kv-preview-thumb.file-preview-success").length == 0 && blnEditFlag == true)) {
                blnError = true; $.alert.open("warning", "Kindly provide atleast one image to proceed ");
            }
        }
        else if (blnError == false && $("#ChekSQ").prop("checked") == true) {
            if (($(".file-preview-frame.krajee-default.kv-preview-thumb.file-preview-success").length == 0 && blnEditFlag == false)) {
                blnError = true; $.alert.open("warning", "Kindly provide atleast one image to proceed ");
            }
            if (($(".file-preview-frame.krajee-default.file-preview-initial.file-sortable.kv-preview-thumb").length == 0 && $(".file-preview-frame.krajee-default.kv-preview-thumb.file-preview-success").length == 0 && blnEditFlag == true)) {
                blnError = true; $.alert.open("warning", "Kindly provide atleast one image to proceed ");
            }
        }
        if (blnError == false) {
            ArticleInsertUpdate("I");
        }

    });

    $("#btnSaveToDraft").click(function () {
        var blnError = "";
        blnError = validateMadatory();
        if (blnError == false && $("#Chek").prop("checked") == true) {
            if (($(".file-preview-frame.krajee-default.kv-preview-thumb.file-preview-success").length == 0 && blnEditFlag == false)) {
                blnError = true; $.alert.open("warning", "Kindly provide atleast one image to proceed ");
            }
            if (($(".file-preview-frame.krajee-default.file-preview-initial.file-sortable.kv-preview-thumb").length == 0 && $(".file-preview-frame.krajee-default.kv-preview-thumb.file-preview-success").length == 0 && blnEditFlag == true)) {
                blnError = true; $.alert.open("warning", "Kindly provide atleast one image to proceed ");
            }
        }
        else if (blnError == false && $("#ChekSQ").prop("checked") == true) {
            if (($(".file-preview-frame.krajee-default.kv-preview-thumb.file-preview-success").length == 0 && blnEditFlag == false)) {
                blnError = true; $.alert.open("warning", "Kindly provide atleast one image to proceed ");
            }
            if (($(".file-preview-frame.krajee-default.file-preview-initial.file-sortable.kv-preview-thumb").length == 0 && $(".file-preview-frame.krajee-default.kv-preview-thumb.file-preview-success").length == 0 && blnEditFlag == true)) {
                blnError = true; $.alert.open("warning", "Kindly provide atleast one image to proceed ");
            }
        }
        if (blnError == false) {
            ArticleInsertUpdate("T");
        }

    });

    $('#txtStoryName').focusout(function () {
        strGChkAvailabl = "";
        try {
            var strStoryRefname = $('#txtStoryName').val();
            if (strStoryRefname != "") {
                $.ajax({
                    url: gStrIpVal + "NewsStreamService.svc/ChkAvailability",
                    data: '{"strref_story_name": "' + strStoryRefname + '"}',
                    cache: false,
                    type: "POST",
                    contentType: "application/json",
                    async: false,
                    dataType: 'JSON',
                    success: function (data) {
                        var index1; strval = "";
                        ///$("#tmpID").text(data.GetTmpUniIDResult);
                        strGChkAvailabl = data.ChkAvailabilityResult;

                    },
                    error: function (jqXHR) {
                    }
                });

                if (strGChkAvailabl != "" && blnEditFlag == false) {
                    alert("The mentioned story name already available. ");
                    return false;
                }
            }
        }
        catch (e) { }
    });


    if (strEditArticleId == undefined || strEditArticleId == "")
        fnloadSearch();


    $('#btnAddNew').click(function () {
        strMode = "I";
        $('#chkActiveSts').attr('checked', true);
        $('#txtContributorName').val("");
        $('#txtMobileNo').val("");
        $('#ddlCity').val("");
        $("input[name='chkProd']:checkbox").prop('checked', false);


        $('#myModalContributor').modal('show');

        LoadAllContributorDtls();
    });

    $('#btnAddorSave').click(function () {
        if ($('#txtContributorName').val() == "") {
            alert('Contributor Name should not empty.');
            return false;
        }
        if ($('#txtMobileNo').val() == "") {
            alert('Contributor mobile no should not empty.');
            return false;
        }
        if (lstContMobileNo.containsSubString($('#txtMobileNo').val()) != -1 && strMode == "I") {
            alert('The mobile number is already exists.');
            return false;
        }
        if (lstContName.containsSubString($('#txtContributorName').val()) != -1 && strMode == "I") {
            alert('The Contributor Name is already exists.');
            return false;
        }

        AddorModyNewContributor(strMode);
    });

    var tn = ["Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mandapam", "Nagapattinam", "Nilgiris", "Namakkal", "Perambalur", "Puducherry", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Thiruvallur", "Tirupur",
                                   "Tiruchirapalli", "Theni", "Tirunelveli", "Thanjavur", "Thoothukudi", "Tiruvallur", "Tiruvannamalai", "Vellore", "Villupuram", "Viruthunagar"];
    $(function () {
        var options = '';
        for (var i = 0; i < tn.length; i++) {
            options += '<option value="' + tn[i] + '">' + tn[i] + '</option>';
        }
        $('#ddlCity').html(options);
    });


    $("#txtMobileNo").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
        // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $('#isContriDetails').click(function () {
        if ($('#isContriDetails').is(":checked")) {
            $('#divContriOptions').css('display', 'block');
            fnloadContributorDeatails();
        }
        else {
            $('#divContriOptions').css('display', 'none');
        }
    });

    $('#txtContriName').focusout(function (e) {
        $('#btnAddNew').css('display', 'block');
    });

});

function validateMadatory() {
    var blnError = false; var strErrorMsg = "";
    $.each($("#MainDiv .mandatory"), function (index1, value) {

        if (($(this).val() == "" || $(this).val() == "Dummy")) {
            if ($(this).find('button').hasClass('selectpicker') == true && $("#" + $(this).find('button').attr('data-id')).val() != "") {
                //blnError = false;
                if ($(this).find('button').hasClass('selectpicker') == true) {
                    var sdd = ""; $(this).closest(".checkFld").find('button.selectpicker.dropdown-toggle').css("border-bottom", "");
                    $(this).closest(".checkFld").find('button.selectpicker.dropdown-toggle').css("border-bottom", "1px solid #e5e6e7");
                    $(this).closest(".checkFld").find('div.btn-group.bootstrap-select.form-control.mandatory').css("border", "none");

                } else {
                    if ($(this).find('button').hasClass('selectpicker') == false) {
                        var sdd = ""; $(this).css("border", "");
                        $(this).css("border", "1px solid #e5e6e7");
                    }
                }
            }
            else {
                blnError = true;
                if (strErrorMsg == "") {
                    strErrorMsg += $(this).closest(".checkFld").find(".ErrLab").text();
                }
                else {
                    strErrorMsg += "," + $(this).closest(".checkFld").find(".ErrLab").text();
                }
                if ($(this).find('button').hasClass('selectpicker') == true) {
                    var sdd = "";
                    $(this).closest(".checkFld").find('button.selectpicker.dropdown-toggle').css("border-bottom", "1px solid red");
                    $(this).closest(".checkFld").find('div.btn-group.bootstrap-select.form-control.mandatory').css("border", "none");

                } else {
                    if ($(this).find('button').hasClass('selectpicker') == false) {
                        var sdd = "";
                        $(this).css("border", "1px solid red");
                    }
                }
            }
        }


    });
    if (blnError == true) {
        //   alert("Kindly provide "+ strErrorMsg.trimEnd(",")+ " detailes" );
        $.alert.open("warning", "Kindly provide " + strErrorMsg + " details ");
    }
    return blnError;
}

function fnLoadArticleImage() {

}

function ArticleInsertUpdate(pParam) {
    var strTmpXml = ""; var strTmpID = ""; var strTmpImagesList = "";var strTempSaveVal = "";
    var strTmpStatus = ""; var strTmpstrcreated = ""; var tempstrImage_Type = "";
    if ((pParam == "I" || pParam=="T") && blnEditFlag == false) {
        strTmpStatus = "I"; strTmpstrcreated = "Created";
        strTempSaveVal = pParam;
    }
    else {
        if (pParam == "U") {
            strTmpStatus = "U"; strTmpstrcreated = "Updated";
            strTempSaveVal = "U";
        }
        if (pParam == "I" || pParam == "T") {
            strTmpStatus = "U"; strTmpstrcreated = "Updated";
            strTempSaveVal = "U";
        }
    }
    var strTmpImageCaption = "";

    if (strGChkAvailabl != "" && blnEditFlag == false) {
        alert("The mentioned story name already available. ");
        return false;
    }
    strEditImageName = "";
    if (blnEditFlag == false) {

        $.each($(".file-preview-frame.krajee-default.kv-preview-thumb.file-preview-success"), function (index1, value) {
            if (index1 == 0) {
                strTmpImagesList += $(this).find('img').attr('title');
                strTmpImageCaption += $(this).find(".customFileCaption").val();
                tempstrImage_Type += "RGB"
            }
            else {
                strTmpImagesList += "~" + $(this).find('img').attr('title');
                strTmpImageCaption += "~" + $(this).find(".customFileCaption").val();
                tempstrImage_Type += "~" + "RGB";
            }
        });
    }
    else {


        $.each($(".file-preview-frame.krajee-default.file-preview-initial.file-sortable.kv-preview-thumb"), function (index1, value) {
            if (index1 == 0 && strTmpImagesList=="" ) {
                strTmpImagesList += $(this).find('.customFileCaption').attr('data-imgName');
                strTmpImageCaption += $(this).find(".customFileCaption").val();
                strEditImageName += $(this).find('.customFileCaption').attr('data-imgName');
                tempstrImage_Type += "RGB";
            }
            else {
                strTmpImagesList += "~" + $(this).find('.customFileCaption').attr('data-imgName');
                strTmpImageCaption += "~" + $(this).find(".customFileCaption").val();
                strEditImageName += "~" + $(this).find('.customFileCaption').attr('data-imgName');
                tempstrImage_Type += "~" + "RGB";
            }
        });

        $.each($(".file-preview-frame.krajee-default.kv-preview-thumb.file-preview-success"), function (index1, value) {
            if (index1 == 0 && strTmpImagesList == "") {
                strTmpImagesList += $(this).find('img').attr('title');
                strTmpImageCaption += $(this).find(".customFileCaption").val();
                tempstrImage_Type += "RGB";
            }
            else {
                strTmpImagesList += "~" + $(this).find('img').attr('title');
                strTmpImageCaption += "~" + $(this).find(".customFileCaption").val();
                tempstrImage_Type += "~" + "RGB";
            }
        });
    }
    if ($("#txtHeadKicker").val() != "")
        strTmpXml += " <head_kicker><span>" + $("#txtHeadKicker").val() + "</span></head_kicker>";
    if ($("#txtHead").val() != "")
        strTmpXml += " <head><span>" + $("#txtHead").val() + "</p></span></head>";
    if ($("#txtHeadDeck").val() != "")
        strTmpXml += " <head_deck><span><p>" + $("#txtHeadDeck").val() + "</p></span></head_deck>";
    if ($("#txtByLine").val() != "")
        strTmpXml += " <byline><span>" + $("#txtByLine").val() + "</span></byline>";
    if ($("#txtDateLine").val() != "")
        strTmpXml += " <Dateline><span>" + $("#txtDateLine").val() + "</span></Dateline>";
    strTmpXml += " <body><span><p>" + $("#code_preview0").val() + "</p></span><p></p></body>";
//    if (blnEditFlag == true && lstImgCaptionDtlsWhenEdit.length > 0) {
//        $.each(lstImgCaptionDtlsWhenEdit, function (iCut, ValCut) {
//            strTmpXml += "<Image href='" + "D:\\EditorialImage\\" + $("#tmpID").text() + "\\LowRes\\" + $("#tmpID").text() + "_" + i + ".jpg" + "'/>";
//            strTmpXml += " <cutline>" + ValCut + "</cutline>";
//            if (tempstrImage_Type != "")
//                tempstrImage_Type += "RGB~";
//        });
    //    }
    if (blnEditFlag == true) {
        $.each(strTmpImagesList.split('~'), function (iCut, ValCut) {
            strTmpXml += "<Image href='" + "D:\\EditorialImage\\" + $("#tmpID").text() + "\\LowRes\\" + ValCut + ".jpg" + "'/>";
            strTmpXml += " <cutline>" + strTmpImageCaption.split('~')[iCut].toString() + "</cutline>";
            if (tempstrImage_Type != "")
                tempstrImage_Type += "RGB~";
        });
    }
    strTmpID = $("#tmpID").text();

    var strRefCaption = "";
    //if ($("#txtHead").val() == "")
    strRefCaption = $("#txtStoryName").val();
    //    else
    //        strRefCaption = $("#txtHead").val();
    var strQuot = "";
    if ($('#chkquot').is(":checked")) {
        strQuot = "Y";
    }
    else {
        strQuot = "N";
    }

    var isPrint = "";var isWeb = "";
    if ($('#isPrint').is(":checked")) {
        isPrint = "Y";
    }
    else {
        isPrint = "N";
    }
    if ($('#isWeb').is(":checked")) {
        isWeb = "Y";
    }
    else {
        isWeb = "N";
    }

    strDBImagePath = "";
    strDBImageName = "";

    if (blnEditFlag == true) {
        strDBImagePath = strEditImagePath;
        strDBImageName = strEditImageName;
        //strDBImageName = strTmpImagesList;
    }
    else {
        strDBImagePath = "";
        strDBImageName = "";
    }

    lstArticleDtls = [];
    lstArticleDtls.push({
        strMode: strTmpStatus,
        strdesktype: $("#ddLayoutDesk option:selected").text(),
        strnewsowner: "TheHindu",
        strcreated: strTmpstrcreated,
        strcaption: strRefCaption,
        strcontent: $("#code_preview0").val(),
        strbyline: $("#txtByLine").val(),
        strDateLine: $("#txtDateLine").val(),
        strstatus: strTempSaveVal,
        strZone: $("#ddZone option:selected").val(),
        strImages: strTmpImagesList,
        strIssueDate: $("#txtIssuedate").val(),
        strImagesAttribute: strTmpImageCaption,
        strImagePath: strDBImagePath,
        strImageName: strDBImageName,
        strNameCaption: strTmpImageCaption,
        strArticlePlaced: "N",
        strPagenAME: $("#ddPageNo").val(),
        strpUBLICATIONDATE: $("#txtIssuedate").val(),
        strProduct: $("#ddProduct").val(),
        strTotalXML: "",
        strCreatedUser: window.sessionStorage.strUserId,
        strArticles_Created: $("#ddZone option:selected").text(),
        strImage_Type: tempstrImage_Type,
        strHeadDesk: $("#txtHeadDeck").val(),
        strTotalXML: strTmpXml,
        strTmpID: strTmpID,
        strArticleType: $("#ddArticleView").val(),
        strHeadKicker: $("#txtHeadKicker").val(),
        strAssignedToUser: $("#ddlAssignUser").val(),
        strRef_story_name: $("#txtStoryName").val(),
        strEnglish_Content: $("#txtEnglishCnt").val(),
        strHead: $("#txtHead").val(),
        strquot_avail: strQuot,
        strContributor: $("#txtContriName").val(),
        strIsPrint: isPrint,
        strIsWeb: isWeb
    });

    var jData = {};
    var arrArticleDtls = JSON.stringify(lstArticleDtls);
    jData.hashstr = arrArticleDtls.toString();
    $.ajax({
        url: gStrIpVal + "NewsStreamService.svc/SaveArticleDtls",
        cache: false,
        type: "POST",
        async: false,
        data: JSON.stringify(jData),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            var index1; strval = "";
            if (data.SaveArticleDtlsResult == 'S') {
                if ((pParam == "I" || pParam == "T") && blnEditFlag == false) {
                    //alert("successfully saved");
                    //   $.alert.open("Success", "successfully saved");
                    if (pParam == "I") {
                        $.alert.open({
                            content: "Successfully Sent",
                            type: "Success",
                            callback: function () {
                                window.location.href = "ArticleView.html";
                            }
                        });
                    }
                    else {
                        $.alert.open({
                            content: "Successfully Save to Draft.",
                            type: "Success",
                            callback: function () {
                                window.location.href = "ArticleView.html";
                            }
                        });
                    }

                } else {
                    //alert("Updated successfully");
                    if (window.sessionStorage.strUserGroup == "EDT" || window.sessionStorage.strUserGroup == "SUBEDT" || window.sessionStorage.strUserGroup == "EDTSUP") {
                        $.alert.open('confirm', ' Click "Yes" to Stay Alive ' +
               '</br> Click "No" to Save & Close ', function (button) {
                   if (button == 'yes') {
                       return false;
                   }
                   else if (button == 'no') {
                       window.location.href = "ArticleView.html";
                   }
                   else {
                       return false;
                   }
               });
                    }
                    else {

                        $.alert.open({
                            content: "Successfully Updated",
                            type: "Success",
                            callback: function () {
                                window.location.href = "ArticleView.html";
                            }
                        });
                    }
                }

            }
            else if (data.SaveArticleDtlsResult == 'A') {
            }
            else {
                // alert("Not saved");
                $.alert.open("warning", "Not saved");
            }
        },
        error: function (jqXHR) {
            alert(jqXHR.responseText);
        }
    });

}

function querySt(Key) {
    var url = window.location.href;
    KeysValues = url.split(/[\?&]+/);
    for (i = 0; i < KeysValues.length; i++) {
        KeyValue = KeysValues[i].split("=");
        if (KeyValue[0] == Key) {
            return KeyValue[1];
        }
    }
}

function fnEditArticle(pEditArticleId) {
    strProcessedUserid = "";
    strGChiefReportUser = ""; strGEditorialUser = ""; strGSubEditorialUser = "";
    $.ajax({
        url: gStrIpVal + "NewsStreamService.svc/GetEditArticle",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        returnType: 'json',
        data: '{"strEditArticleId": "' + pEditArticleId + '","strProcessUser": "' + window.sessionStorage.strUserId + '"}',
        async: false,
        success: function (data) {
            $.each(data.GetEditArticleResult, function (index, value) {
                if (value.strContributor != "Dummy" && value.strContributor !="") {
                    fnloadContributorDeatails();
                    $('#divContriOptions').css('display', 'block');
                    $('#isContriDetails').prop('checked', true);

                    $("#txtContriName").selectpicker('val', value.strContributor).trigger("change");
                }
                else {
                    $('#divContriOptions').css('display', 'none');
                    $('#isContriDetails').prop('checked', false);
                }                               
                $("#txtStoryName").val(value.strRef_story_name);
                //$("#txtContriName").val(value.strContributor);
               

                

                $("#txtEnglishCnt").val(value.strEnglish_Content);
                $("#txtHead").val(value.strHead);
                $("#code_preview0").val(value.strcontent);
                $("#txtByLine").val(value.strbyline);
                $("#txtDateLine").val(value.strDateLine);
                $("#txtHeadDeck").val(value.strHeadDesk);
                $("#txtHeadKicker").val(value.strHeadKicker);
                //value.strstatus
                // $("#ddZone").val(value.strZone);
                $("#ddZone").selectpicker('val', value.strZone).trigger("change");
                // value.strImages
                $("#txtIssuedate").val(value.strIssueDate);
                //value.strImagesAttribute
                //value.strImagePath
                //value.strImageName
                // $("#ddPageNo option:contains(" + value.strPageName + ")").attr('selected', 'selected');

                //value.strpUBLICATIONDATE
                $("#txtHeadDeck").val(value.strHeadDesk);
                //$("#ddArticleView").selectpicker('val', value.strArticleType);
                $("#ddArticleView").val(value.strArticleType);
                $("#ddProduct").selectpicker('val', value.strProduct).trigger("change");
                $("#ddLayoutDesk").selectpicker('val', $("#ddLayoutDesk option:contains(" + value.strdesktype + ")").val()).trigger("change");
                $("#ddPageNo").selectpicker('val', $("#ddPageNo option:contains(" + value.strPageName + ")").val());
                if (value.strImages.split("~").length > 0 && value.strImages.split("~")[0] != "") {
                    $.each(value.strImages.split("~"), function (ii, vv) {
                        lstImgDtlsWhenEdit.push(value.strFullImagePath + vv);
                        lstImgCaptionDtlsWhenEdit.push(value.strImagesAttribute.split("~")[ii]);
                        lstImgNameDtlsWhenEdit.push(vv);
                        // lstImgDtlsToDeleteWhenEdit.push({ caption: "transport-1.jpg", size: 329892, width: "120px", url: gStrIpVal + '/UploadImages.ashx?ToDelete=' + 'Temp188\\LowRes\\Temp188_0.jpg', key: 1 })
                    });
                }
                if ($("#code_preview0").val() != "" && value.strImages.split("~").length > 0 && value.strImages.split("~")[0] != "") {
                    $("#Chek").click();
                }
                if ($("#code_preview0").val() == "" && value.strImages.split("~").length > 0 && value.strImages.split("~")[0] != "") {
                    $("#ChekSQ").click();
                }
                if ($("#code_preview0").val() != "" && lstImgDtlsWhenEdit.length == 0) {
                    $("#ChekLN").click();
                }
                strProcessedUserid = value.strProcessedUser;
                strGChiefReportUser = value.strChiefReportUser;
                strGEditorialUser = value.strEditorialUser;
                strGSubEditorialUser = value.strSubEditorialUser;

                strEditImageName = value.strImageName;
                strEditImagePath = value.strImgDBPath;
                //strEditImageCutline = value.strImgDBPath;

                if (window.sessionStorage.strUserGroup == "RPT" && strGChiefReportUser != "") {
                    //$('#ddlAssignUser').val(strGChiefReportUser);
                    //$("#ddlAssignUser").selectpicker('val', $("#ddlAssignUser option:contains(" + strGChiefReportUser + ")").val());
                    $("#ddZone").selectpicker('val', value.strZone);
                    $("#ddlAssignUser").selectpicker('val', strGChiefReportUser);
                }
                if (window.sessionStorage.strUserGroup == "CHRPT" && strGEditorialUser != "") {
                    //$('#ddlAssignUser').val(strGEditorialUser);
                    $("#ddlAssignUser").selectpicker('val', strGEditorialUser);
                }
                if (window.sessionStorage.strUserGroup == "EDT" && strGSubEditorialUser != "") {
                    //$('#ddlAssignUser').val(strGSubEditorialUser);
                    $("#ddlAssignUser").selectpicker('val', strGSubEditorialUser);
                }

                if (value.strquot_avail == "Y") {
                    $('#chkquot').click();
                    $('#txtHead').removeClass('mandatory');
                    $('#HeadMadr').text('');
                    $('#txtDateLine').removeClass('mandatory');
                    $('#DatelineMadr').text('');
                }

                $('#isPrint').prop('checked', false);
                $('#isWeb').prop('checked', false);
                if (value.strIsPrint == "Y") {
                    $('#isPrint').prop('checked', true);
                }

                if (value.strIsWeb == "Y") {
                    $('#isWeb').prop('checked', true);
                }
                //                else {
                //                    $('#chkquot').attr('checked', 'false').trigger("click");
                //                }

                //value.strTotalXML
                //value.strCreatedUser
                //value.strImage_Type
            });
        },
        error: function (jqXHR) {

            alert(jqXHR.responseText);
        }
    });
}

function fnGetTmpID() {
    $.ajax({
        url: gStrIpVal + "NewsStreamService.svc/GetTmpUniID",
        cache: false,
        type: "POST",
        contentType: "application/json",
        async: false,
        dataType: 'JSON',
        success: function (data) {
            var index1; strval = "";
            $("#tmpID").text(data.GetTmpUniIDResult);

        },
        error: function (jqXHR) {
        }
    });
}

function fnloadProduct() {
    var ele = "";
    $("#ddProduct").get(0).options.length = 0;
    $("#ddProduct").get(0).options[0] = new Option("Select Product", "Dummy");
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
                if (window.sessionStorage.strUserGroup == "EDTSUP") {
                    if (data.GetProductResult[index1].strProductcode != "TAMILTH")
                        ele.append("<option value=" + data.GetProductResult[index1].strProductcode + ">" + data.GetProductResult[index1].strProductDesc + "</option>");
                }
                else {
                    ele.append("<option value=" + data.GetProductResult[index1].strProductcode + ">" + data.GetProductResult[index1].strProductDesc + "</option>");
                }
            });
            Cntproduct = data.GetProductResult.length;
            $('#ddProduct').selectpicker('refresh');
            if (Cntproduct == 1) {
                ele.get(0).selectedIndex = 1
                ele.trigger("change");
            }
            $('#ddProduct').change(function () {
                if ($('#ddProduct').val() != "") {
                    if ($('#ddProduct').val() != "TAMILTH")
                        $('#data_2').css('display', 'block');
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
    $(ele).get(0).options[0] = new Option("Select Layout Desk", "Dummy");
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
            $('#ddLayoutDesk').selectpicker('refresh');
            Cntproduct = data.GetLayOutDeskResult.length;
            if (Cntproduct == 1) {
                ele.get(0).selectedIndex = 1
                ele.trigger("change");
                fnloadPageno();
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
            $('#ddContentDesk').selectpicker('refresh');
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
    $('#ddZone option').remove();

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
            $('#ddZone').selectpicker('refresh');
            Cntproduct = data.GetZoneResult.length;
            if (Cntproduct == 1) {
                ele.get(0).selectedIndex = 1
                ele.trigger("change");
                fnloadAssignUser();
            }

            $('#ddZone').change(function () {
                if ($('#ddZone').val() != "")
                    fnloadAssignUser();
            });
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
    $("#ddPageNo").get(0).options[0] = new Option("Select Page No", "Dummy");
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
                if ($('#ddProduct').val() == "TAMVeedu" || $('#ddProduct').val() == "TAMTalky" || $('#ddProduct').val() == "TAMPenn") {
                    ele.append("<option value=" + data.GetPagenoResult[index1].strProductcode + ">" + data.GetPagenoResult[index1].strProductDesc + "</option>");
                }
                else {
                    if (data.GetPagenoResult[index1].strProductDesc == "Sub_Inside_03" || data.GetPagenoResult[index1].strProductDesc == "Sub_Inside_04") { }
                    else {
                        ele.append("<option value=" + data.GetPagenoResult[index1].strProductcode + ">" + data.GetPagenoResult[index1].strProductDesc + "</option>");
                    }
                }
            });
            Cntproduct = data.GetPagenoResult.length;
            $('#ddPageNo').selectpicker('refresh');
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

function fnloadAssignUser() {
    var ele = "";
    ele = $("#ddlAssignUser"); var CntAssignUser = 0;
    $("#ddlAssignUser").get(0).options.length = 0;
    $("#ddlAssignUser").get(0).options[0] = new Option("Select Assign User", "Dummy");
    var strUserGroup = window.sessionStorage.strUserGroup;
    var strZoneCode = $('#ddZone').val();
    $.ajax({
        url: gStrIpVal + "NewsStreamService.svc/GetAssignUsers",
        data: '{"strUserGroup": "' + strUserGroup + '","strZoneCode": "' + strZoneCode + '","strUserId": "' + window.sessionStorage.strUserId + '"}',
        cache: false,
        type: "POST",
        contentType: "application/json",
        async: false,
        dataType: 'JSON',
        success: function (data) {
            var index1; strval = "";
            $.each(data.GetAssignUsersResult, function (index1, value) {
                ele.append("<option value=" + data.GetAssignUsersResult[index1].strSelUserCode + ">" + data.GetAssignUsersResult[index1].strSelUserName + "</option>");
            });
            CntAssignUser = data.GetAssignUsersResult.length;
            $('#ddlAssignUser').selectpicker('refresh');
            if (CntAssignUser == 1) {
                ele.get(0).selectedIndex = 1
                ele.trigger("change");
            }
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}

function ValidateAlreadyAssign(strGroup, _strChief_Report_User, _strEditorial_User, _strSub_Editorial_User) {
    var blnRes = true;
    if (strGroup == "RPT") {
        if (_strSub_Editorial_User != "") {
            alert("The story cannot modify because it is already processed by sub editor ");
            blnRes = false;
            return false;
        }
        if (_strEditorial_User != "") {
            alert("The story cannot modify because it is already processed by editor ");
            blnRes = false;
            return false;
        }
        //        if (_strChief_Report_User != "") {
        //            alert("The story cannot modify because it is already processed by chief repoter ");
        //            blnRes = false;
        //            return false;
        //        }
    }
    if (strGroup == "CHRPT") {
        if (_strSub_Editorial_User != "") {
            alert("The story cannot modify because it is already processed by sub editor ");
            blnRes = false;
            return false;
        }
        //        if (_strEditorial_User != "") {
        //            alert("The story cannot modify because it is already processed by editor ");
        //            blnRes = false;
        //            return false;
        //        }
    }
    //    if (strGroup == "EDT") {
    //        if (_strEditorial_User != "") {
    //            alert("The story cannot modify because it is already processed by editor ");
    //            blnRes = false;
    //            return false;
    //        }
    //    }
    return blnRes;
}

function GetGroupName() {
    $('#lblHeadKicker').text("Head kicker :");
    $('#txtByLine').removeClass('mandatory');
    $('#byLinemat').text('');
    $('#data_2').css('display', 'none');
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
        $('#lblHeadKicker').text("Slug :");
        $('#txtDateLine').removeClass('mandatory');
        $('#DatelineMadr').text('');
        $('#txtByLine').addClass('mandatory');
        $('#byLinemat').text('*');
        $('#data_2').css('display', 'block');
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
        $('#ddProduct').selectpicker('val', lstsearch[0].strProductid).trigger("change");
        $('#ddLayoutDesk').selectpicker('val', lstsearch[0].strlayoutdesk).trigger("change");
        $('#ddZone').selectpicker('val', lstsearch[0].strZone).trigger("change");
        $('#ddPageNo').selectpicker('val', lstsearch[0].strpage).trigger("change");
        $('#ddArticleType').selectpicker('val', lstsearch[0].strtype);


        //LoadViewDetails();

    }
    // alert(lstsearch.length);
}


function UpdateProcessSts(strStoryDI) {
    var res = false;
    $.ajax({
        url: gStrIpVal + "NewsStreamService.svc/UpdateProcessStatus",
        cache: false,
        type: "POST",
        contentType: "application/json",
        async: false,
        data: '{"strStoryID": "' + strStoryDI + '","strUserId": "' + window.sessionStorage.strUserId + '"}',
        dataType: 'JSON',
        success: function (data) {

            res = data.UpdateProcessStatusResult;
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}

function fnloadContributorDeatails() {
    var ele = "";
    ele = $("#txtContriName"); var Cntproduct = 0;
    $("#txtContriName").get(0).options.length = 0;
    $("#txtContriName").get(0).options[0] = new Option("Select Contributor", "Dummy");

    $.ajax({
        url: gStrIpVal + "NewsStreamService.svc/ContributorList",
        //data: '{"strDesk": "' + strDesk + '"}',
        cache: false,
        type: "POST",
        contentType: "application/json",
        async: false,
        dataType: 'JSON',
        success: function (data) {
            var index1; strval = "";
            $.each(data.ContributorListResult, function (index1, value) {
                ele.append("<option value=" + data.ContributorListResult[index1].strContID + ">" + data.ContributorListResult[index1].strContName + "</option>");
            });            
            $('#txtContriName').selectpicker('refresh');
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

function AddorModyNewContributor(AddMod) {
    // AddorModyNewContributor(string strcontributorID, string strContriName, string strMobileNo, string strCity, string strSessionProd, string strInsorUpd, string strUser_id, string strActiveStatus);  
    var strUser_id = window.sessionStorage.strUserId;
    var strcontributorID = ""; var strContriName = ""; var strMobileNo = ""; var strCity = ""; var strSessionProd = ""; var strInsorUpd = ""; var strActiveStatus = "";
    if (AddMod == "I")
        strcontributorID = "";
    strInsorUpd = AddMod;
    strContriName = $('#txtContributorName').val();
    strMobileNo = $('#txtMobileNo').val();
    strCity = $('#ddlCity').val();
    strSessionProd = "";
    $.each($("input[name='chkProd']:checked"), function () {
        strSessionProd += $(this).val() + ",";
    });


    strActiveStatus = "A";

    $.ajax({
        url: gStrIpVal + "/NewsStreamService.svc/AddorModyNewContributor",
        cache: false,
        type: "POST",
        async: false,
        data: '{"strcontributorID": "' + strcontributorID + '","strContriName": "' + strContriName + '","strMobileNo": "'
        + strMobileNo + '","strCity": "' + strCity + '","strSessionProd": "' + strSessionProd + '","strInsorUpd": "' + strInsorUpd + '","strUser_id": "' + strUser_id + '","strActiveStatus": "' + strActiveStatus + '"}',
        contentType: "application/json",
        returnType: 'json',
        success: function (data) {
            var index; strVal = "";
            var strslno = 0;
            if (data.AddorModyNewContributorResult == true) {
                $.alert.open({
                    content: "Contributor details has been saved.",
                    type: "Success",
                    callback: function () {
                        fnloadContributorDeatails();
                        $('#myModalContributor').modal('hide');
                    }
                });
            }
            else {
                fnloadContributorDeatails();
                $('#myModalContributor').modal('hide');
            }


        },
        error: function (jqXHR) {

            alert("Not saved");

        }
    });
    
}


function LoadProductList(EditProd) {
    var ele = "";
    ele = $("#lstProducts");
    var strChklist = "";
    var blnFlg = false;
    var lstEditProd = [];
    ele.empty();
    lstEditProd = EditProd.split(',');
    try {

        $.ajax({
            url: gStrIpVal + "NewsStreamService.svc/GetProduct",
            cache: false,
            type: "POST",
            contentType: "application/json",
            async: false,
            //data: '{"strOldPwd": "' + strOldPwd + '","strCurrUser":"' + window.sessionStorage.strUserId + '"}',
            dataType: 'JSON',
            success: function (data) {
                var index1; strval = ""; strChklist = "";
                strChklist = "<table width='100%'>"; var intCol = 3;
                $.each(data.GetProductResult, function (index1, value) {
                    if (index1 == 0) {
                        strChklist += "<tr>";
                    }
                    if (index1 == intCol) {
                        strChklist += "</tr><tr></tr><tr>";
                        intCol += 3;
                    }

                    //                    if (window.sessionStorage.strUserGroup == "EDTSUP") {
                    //                        if (data.GetProductResult[index1].strProductcode != "TAMILTH")
                    //                            ele.append("<option value=" + data.GetProductResult[index1].strProductcode + ">" + data.GetProductResult[index1].strProductDesc + "</option>");
                    //                    }
                    //                    else {
                    //ele.append("<input type='checkbox' value=" + data.GetProductResult[index1].strProductcode + "/>" + data.GetProductResult[index1].strProductDesc);

                    if (lstEditProd.length > 0) {
                        var blnEdnCked = false;
                        $.each(lstEditProd, function (inEdProd, ValEdn) {
                            if (ValEdn == data.GetProductResult[index1].strProductcode) {
                                blnEdnCked = true;
                                return;
                            }
                        });
                        if (blnEdnCked == true) {
                            strChklist += "<td><input checked='checked' type='checkbox' name='chkProd' id='" + data.GetProductResult[index1].strProductcode + "' value=" + data.GetProductResult[index1].strProductcode + " />" + data.GetProductResult[index1].strProductDesc + "</td>";
                        }
                        else {
                            strChklist += "<td><input type='checkbox' name='chkProd' id='" + data.GetProductResult[index1].strProductcode + "' value=" + data.GetProductResult[index1].strProductcode + " />" + data.GetProductResult[index1].strProductDesc + "</td>";
                        }
                    }
                    else {
                        strChklist += "<td><input type='checkbox' name='chkProd' id='" + data.GetProductResult[index1].strProductcode + "' value=" + data.GetProductResult[index1].strProductcode + " />" + data.GetProductResult[index1].strProductDesc + "</td>";
                    }
                    //}
                });
                strChklist += "</table>";

                ele.append(strChklist);
            },
            error: function (jqXHR) {
                //alert(jqXHR.responseText);
            }
        });
    }
    catch (e) { }
    finally { }
    return blnFlg;
}



function LoadAllContributorDtls() {
    lstContMobileNo = [];
    lstContName = [];

    var strTmpUserId = "";

    strTmpUserId = window.sessionStorage.strUserId;

    var strConName = "";
    var strMobileNumber = "";
    //    var LayoutDesk = $("#ddLayoutDesk").val();
    //    var ContentDesk = $("#ddArticleType").val();
    //    var Zone = $("#ddZone").val();
    //    var Page = $("#ddPageNo").val();
    $.ajax({
        url: gStrIpVal + "/NewsStreamService.svc/ViewContributorDtls",
        cache: false,
        type: "POST",
        async: false,
        data: '{"strConName": "' + strConName + '","strMobileNumber": "' + strMobileNumber + '"}',
        contentType: "application/json",
        returnType: 'json',
        success: function (data) {
            var index; strVal = "";
            var strslno = 0;

            if (data.ViewContributorDtlsResult.length > 0) {
                $.each(data.ViewContributorDtlsResult, function (index, value) {

                    lstContMobileNo.push(data.ViewContributorDtlsResult[index].strContMobileNumber);
                    lstContName.push(data.ViewContributorDtlsResult[index].strContName);
                });


            }
            else {


            }

        },
        error: function (jqXHR) {

        }
    });

}

function fn_GetWireFeedStory(strID) {

    var strDate = "";
    var strHead = "";
    var strContent = "";
    var strTrnsID = strID;
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

                    $('#txtEnglishCnt').val(data.ViewWirefeedsResult[index].strWireFeedHead + "\n" + data.ViewWirefeedsResult[index].strWireFeedContent);
                    $('#myModal').modal('show');
                    //                    strVal += "  <tr title='" + data.ViewWirefeedsResult[index].strWireFeedContent + "'> ";
                    //                    strVal += " <td>" + data.ViewWirefeedsResult[index].strWireFeedSrc + "</td> ";
                    //                    strVal += " <td>" + data.ViewWirefeedsResult[index].strWireFeedHead + "</td> ";
                    //                    //                    strVal += " <td >" + data.ViewWirefeedsResult[index].strWireFeedContent + "</td> ";
                    //                    strVal += " <td>" + data.ViewWirefeedsResult[index].strWireFeedWords + "</td> ";
                    //                    strVal += " <td>" + data.ViewWirefeedsResult[index].strWireFeedDateLine + "</td> ";
                    //                    strVal += " <td>" + data.ViewWirefeedsResult[index].strWireFeedDateTime + "</td> ";
                    //                    strVal += " <td>" + data.ViewWirefeedsResult[index].strWireFeedDateTime + "</td> ";
                    //                    strv += "<td> <a class='btn btn btn-primary' " + strProcessAnotherUser + "  href='ArticleEditor.html?Trnsid='" + data.ViewWirefeedsResult[index].strWireFeedID + "''>Edit Story </a> </td>";
                    //                    //strVal += " <td class='Page'>" + data.ViewWirefeedsResult[index].strPageName + "</td> ";
                    //                    strVal += " </tr> ";

                    //                });


                    //                $("#tblView tbody").append(strVal);

                    //                $("#tblView").dataTable().fnDestroy();
                    //                $('#tblView').dataTable();
                });
            }
            else {


            }


        },
        error: function (jqXHR) {



        }

    });

}