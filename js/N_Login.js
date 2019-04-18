
window.sessionStorage.strUserId = "";

$('#txt_password').keypress(function (e) {
    if (e.which == 13) {
        $('#F_Login_btn').click();
    }
});


$("#F_Login_btn").click(function (event) {
    event.preventDefault();

    window.sessionStorage.strUserId = "";

    var struserid = $("#txt_userid").val().trim();
    var strpassword = $("#txt_password").val().trim();
    if (struserid == "" || struserid == null) {
        $('.errorMessage').text('Please Enter Your UserId');
        return false;
    }
    else if (strpassword == "" || strpassword == null) {
        $('.errorMessage').text('Please enter your Password');
        return false;
    }

    $.ajax({
        url: gStrIpVal + "NewsStreamService.svc/Check_LoginDt",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: '{"username": "' + struserid + '","password": "' + strpassword + '"}',
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data.Check_LoginDtResult == "" || data.Check_LoginDtResult==undefined) {
               
                $('.errorMessage').text('Your Credentials Are Incorrect.');
            }
            else {
                window.sessionStorage.strUserId = $("#txt_userid").val().trim();
                window.sessionStorage.strUserGroup = data.Check_LoginDtResult;
                window.location.href = "ArticleView.html";
            }
        },
        error: function (jqXHR) {
            alert(jqXHR.responseText);
        }
    });

});