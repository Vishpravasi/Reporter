
$(document).ready(function () {

    if (window.sessionStorage.strUserId == undefined || window.sessionStorage.strUserId == null || window.sessionStorage.strUserId.trim() == "" || window.sessionStorage.strUserId.trim() == "undefined" || window.sessionStorage.strUserId.trim() == "null") {
        window.sessionStorage.removeItem("strUserId");
        location.replace(gStrIpVal + 'login.html');
        return;
    }

    $('#txtNewPwd').attr('readonly', true);
    $('#txtCnfNewPwd').attr('readonly', true);

    $('#txtOldPwd').focusout(function () {
        if ($('#txtOldPwd').val() == "") {
            return false;
        }
        if (!fnloadOldPassword()) {
            $('#lblErrMsg').text('Invalid Password');
            $('#txtNewPwd').attr('readonly', true);
            $('#txtCnfNewPwd').attr('readonly', true);
            return false;
        }
        else {
            $('#txtNewPwd').attr('readonly', false);
            $('#txtCnfNewPwd').attr('readonly', false);
        }
    });

    $('#btnChangePwd').click(function () {
        $('#lblErrMsg').text('');
        if (!fnloadOldPassword()) {
            $('#lblErrMsg').text('Invalid Password');
            return false;
        }
        if ($('#txtOldPwd').val() == "") {
            $('#lblErrMsg').text('Enter your old password.');
            return false;
        }
        if ($('#txtOldPwd').val() == $('#txtCnfNewPwd').val()) {
            $('#lblErrMsg').text('Your new password must be different from your previous password.');
            return false;
        }
        if ($('#txtNewPwd').val() != $('#txtCnfNewPwd').val()) {
            $('#lblErrMsg').text('New password and confirm password must be same.');
            return false;
        }

        $.alert.open('confirm', ' Are you sure you want to change the password   </br>  ', function (button) {
            if (button == 'yes') {
                ChangePassword();
            }
            else if (button == 'no') {
                return false;
            }
            else {
                return false;
            }
        });

    });

    $('#txtCnfNewPwd').keypress(function (e) {
        if (e.which == 13) {
            $('#btnChangePwd').click();
        }
    });

    //    $("#btn_Clear").click(function () {
    //        $("#dvLoad").css({ "display": "none" });
    //        $("#dvGenerate").css({ "display": "none" });
    //        $("#tblView tbody tr").empty();
    //        //$("#txtIssuedate").val("");
    //        //  $("#ddProduct").val("");
    //        //$("#ddLayoutDesk").text("Select Layout Desk");
    //        //$("#ddContentDesk").text("Select Content Desk ");
    //        //$("#ddZone").text("Select Zone");
    //        //$("#ddPageNo").text("Select Page Name ");

    //    });


});


function ChangePassword() {    
    var strUser_id = window.sessionStorage.strUserId;
    var strOldPwd = $('#txtOldPwd').val();
    var strNewPWd = $('#txtNewPwd').val();
    $.ajax({
        url: gStrIpVal + "/NewsStreamService.svc/ChangePassword",
        cache: false,
        type: "POST",
        async: false,
        data: '{"strUser_id": "' + strUser_id + '","strOldPwd": "' + strOldPwd + '","strNewPWd": "' + strNewPWd + '"}',
        contentType: "application/json",
        returnType: 'json',
        success: function (data) {
            var index; strVal = "";
            var strslno = 0;
            if (data.ChangePasswordResult == true) {
                $.alert.open({
                    content: "Your password has been changed.",
                    type: "Success",
                    callback: function () {
                        window.location.href = "ChangePassword.html";
                    }
                });
            }
            else {
                window.location.href = "ChangePassword.html";
            }


        },
        error: function (jqXHR) {

            alert("Not saved");

        }
    });

};


function fnloadOldPassword() {
    var ele = "";
    var strOldPwd = "";
    var blnFlg = false;
    try {
        strOldPwd = $('#txtOldPwd').val();
        $.ajax({
            url: gStrIpVal + "NewsStreamService.svc/ValidatePWD",
            cache: false,
            type: "POST",
            contentType: "application/json",
            async: false,
            data: '{"strOldPwd": "' + strOldPwd + '","strCurrUser":"' + window.sessionStorage.strUserId + '"}',
            dataType: 'JSON',
            success: function (data) {
                var index1; strval = "";
                var strDBOldPwd = "";
                strDBOldPwd = data.ValidatePWDResult;
                if (strDBOldPwd == strOldPwd) {
                    blnFlg = true;
                }
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

