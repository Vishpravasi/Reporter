
var strMode = "I";
var strContriEdnID = "";
var lstContMobileNo = [];
var lstContName = [];

$(document).ready(function () {


    if (window.sessionStorage.strUserId == undefined || window.sessionStorage.strUserId == null || window.sessionStorage.strUserId.trim() == "" || window.sessionStorage.strUserId.trim() == "undefined" || window.sessionStorage.strUserId.trim() == "null") {
        window.sessionStorage.removeItem("strUserId");
        location.replace(gStrIpVal + 'login.html');
        return;
    }
    LoadViewContributorDtls();
    LoadProductList("");
    LoadAllContributorDtls();

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

    $('#txtNewPwd').attr('readonly', true);
    $('#txtCnfNewPwd').attr('readonly', true);

    $('#divActiveStatus').css('display', 'none');

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

    $('#btn_View').click(function () {
        LoadViewContributorDtls();
    });

    $('#btnAddNew').click(function () {
        strMode = "I";
        $('#divActiveStatus').css('display', 'none');
        $('#chkActiveSts').attr('checked', true);
        $('#txtContributorName').val("");
        $('#txtMobileNo').val("");
        $('#ddlCity').val("");
        $("input[name='chkProd']:checkbox").prop('checked', false);


        $('#myModalContributor').modal('show');
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

    $('#btnAddorSave').click(function () {
        //        $('#lblErrMsg').text('');
        //        if (!fnloadOldPassword()) {
        //            $('#lblErrMsg').text('Invalid Password');
        //            return false;
        //        }
        if ($('#txtContributorName').val() == "") {
            alert('Contributor Name should not empty.');
            return false;
        }
        if ($('#txtMobileNo').val() == "") {
            alert('Contributor mobile no should not empty.');
            return false;
        }

        if (lstContMobileNo.containsSubString($('#txtMobileNo').val()) != -1 && strMode=="I") {
            alert('The mobile number is already exists.');
            return false;
        }
        if (lstContName.containsSubString($('#txtContributorName').val()) != -1 && strMode == "I") {
            alert('The Contributor Name is already exists.');
            return false;
        }
        //        if ($('#txtNewPwd').val() != $('#txtCnfNewPwd').val()) {
        //            $('#lblErrMsg').text('New password and confirm password must be same.');
        //            return false;
        //        }

        //        $.alert.open('confirm', ' Are you sure you want to change the password   </br>  ', function (button) {
        //            if (button == 'yes') {
        AddorModyNewContributor(strMode);
        //            }
        //            else if (button == 'no') {
        //                return false;
        //            }
        //            else {
        //                return false;
        //            }
        //        });

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


function AddorModyNewContributor(AddMod) {
    // AddorModyNewContributor(string strcontributorID, string strContriName, string strMobileNo, string strCity, string strSessionProd, string strInsorUpd, string strUser_id, string strActiveStatus);  
    var strUser_id = window.sessionStorage.strUserId;
    var strcontributorID = ""; var strContriName = ""; var strMobileNo = ""; var strCity = ""; var strSessionProd = ""; var strInsorUpd = "";  var strActiveStatus = "";
    if (AddMod == "I")
        strcontributorID = "";
    else
        strcontributorID = strContriEdnID;
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
                        window.location.href = "ContributorMaster.html";
                    }
                });
            }
            else {
                window.location.href = "ContributorMaster.html";
            }


        },
        error: function (jqXHR) {

            alert("Not saved");

        }
    });

};


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


function LoadViewContributorDtls() {
    lstContMobileNo = [];
    lstContName = [];

    var strTmpUserId = "";
    //    if (window.sessionStorage.strUserGroup == "SUP" || window.sessionStorage.strUserGroup == "EDT") {
    //        strTmpUserId = "";
    //    }
    //    else {
    strTmpUserId = window.sessionStorage.strUserId;
    //}
    $("#tblView tbody tr").empty();
    $("#tblView tbody").empty();
    var strConName = $("#txtContributor_Name").val();
    var strMobileNumber = $("#txtConMobileNumber").val();
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
                    strVal += "  <tr> ";
                    strVal += " <td>" + data.ViewContributorDtlsResult[index].strContID + "</td> ";
                    strVal += " <td>" + data.ViewContributorDtlsResult[index].strContName + "</td> ";
                    strVal += " <td>" + data.ViewContributorDtlsResult[index].strContMobileNumber + "</td> ";
                    strVal += " <td style='display:none'>" + data.ViewContributorDtlsResult[index].strContCity + "</td> ";
                    strVal += " <td>" + data.ViewContributorDtlsResult[index].strContPrdSec + "</td> ";
                    strVal += " <td>" + data.ViewContributorDtlsResult[index].strContActiveStatus + "</td> ";
                    strVal += " <td>";
                    strVal += " <a class='btn btn btn-primary' id='" + data.ViewContributorDtlsResult[index].strContID + "~"
                    + data.ViewContributorDtlsResult[index].strContName + "~"
                    + data.ViewContributorDtlsResult[index].strContMobileNumber + "~"
                    + data.ViewContributorDtlsResult[index].strContCity + "~"
                    + data.ViewContributorDtlsResult[index].strContPrdSec + "~"
                    + data.ViewContributorDtlsResult[index].strContActiveStatus
                    + "' onclick='EditContributor(this.id)'  >Edit </a>";
                    strVal += "  </td>";
                    strVal += " </tr> ";
                });


                $("#tblView tbody").append(strVal);

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


function EditContributor(ContriDetl) {
    $('#divActiveStatus').css('display', 'block');
    strMode = "U";
    strContriEdnID = "";
    strContriEdnID = ContriDetl.split('~')[0].toString();
    $('#txtContributorName').val(ContriDetl.split('~')[1].toString());
    $('#txtMobileNo').val(ContriDetl.split('~')[2].toString());
    $('#ddlCity').val(ContriDetl.split('~')[3].toString());
    LoadProductList(ContriDetl.split('~')[4].toString());
    if (ContriDetl.split('~')[5].toString() == "A") {
        $('#chkActiveSts').attr('checked', true);
    }
    else {
        $('#chkActiveSts').attr('checked', false);
    }
    $('#myModalContributor').modal('show'); 

}



//var handles = ["SELECT STATE", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
//                                        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
//                                        "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];

//$(function () {
//    var options = '';
//    for (var i = 0; i < handles.length; i++) {
//        options += '<option value="' + handles[i] + '">' + handles[i] + '</option>';
//    }
//    $('#listBox').html(options);
//});
//function selct_district($val) {
//    if ($val == 'SELECT STATE') {
//        var options = '';
//        $('#secondlist').html(options);
//    }
//    if ($val == 'Andhra Pradesh') {
//        var andhra = ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "SriPotti Sri Ramulu Nellore",
//                                    "Vishakhapatnam", "Vizianagaram", "West Godavari", "Cudappah"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < andhra.length; i++) {
//                options += '<option value="' + andhra[i] + '">' + andhra[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Arunachal Pradesh') {
//        var ap = ["Anjaw", "Changlang", "Dibang Valley", "East Siang", "East Kameng", "Kurung Kumey", "Lohit", "Longding", "Lower Dibang Valley", "Lower Subansiri", "Papum Pare",
//                                        "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < ap.length; i++) {
//                options += '<option value="' + ap[i] + '">' + ap[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Assam') {
//        var assam = ["Baksa", "Barpeta", "Bongaigaon", "Cachar", "Chirang", "Darrang", "Dhemaji", "Dima Hasao", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Jorhat",
//                                     "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "Tinsukia", "Udalguri"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < assam.length; i++) {
//                options += '<option value="' + assam[i] + '">' + assam[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Bihar') {
//        var bihar = ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur",
//                                        "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa",
//                                        "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < bihar.length; i++) {
//                options += '<option value="' + bihar[i] + '">' + bihar[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Chhattisgarh') {
//        var Chhattisgarh = ["Bastar", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Jashpur", "Janjgir-Champa", "Korba", "Koriya", "Kanker", "Kabirdham (formerly Kawardha)", "Mahasamund",
//                                            "Narayanpur", "Raigarh", "Rajnandgaon", "Raipur", "Surajpur", "Surguja"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < Chhattisgarh.length; i++) {
//                options += '<option value="' + Chhattisgarh[i] + '">' + Chhattisgarh[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Dadra and Nagar Haveli') {
//        var dadra = ["Amal", "Silvassa"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < dadra.length; i++) {
//                options += '<option value="' + dadra[i] + '">' + dadra[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Daman and Diu') {
//        var daman = ["Daman", "Diu"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < daman.length; i++) {
//                options += '<option value="' + daman[i] + '">' + daman[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Delhi') {
//        var delhi = ["Delhi", "New Delhi", "North Delhi", "Noida", "Patparganj", "Sonabarsa", "Tughlakabad"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < delhi.length; i++) {
//                options += '<option value="' + delhi[i] + '">' + delhi[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Goa') {
//        var goa = ["Chapora", "Dabolim", "Madgaon", "Marmugao (Marmagao)", "Panaji Port", "Panjim", "Pellet Plant Jetty/Shiroda", "Talpona", "Vasco da Gama"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < goa.length; i++) {
//                options += '<option value="' + goa[i] + '">' + goa[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Gujarat') {
//        var gujarat = ["Ahmedabad", "Amreli district", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Dahod", "Dang", "Gandhinagar", "Jamnagar", "Junagadh",
//                                        "Kutch", "Kheda", "Mehsana", "Narmada", "Navsari", "Patan", "Panchmahal", "Porbandar", "Rajkot", "Sabarkantha", "Surendranagar", "Surat", "Tapi", "Vadodara", "Valsad"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < gujarat.length; i++) {
//                options += '<option value="' + gujarat[i] + '">' + gujarat[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Haryana') {
//        var haryana = ["Ambala", "Bhiwani", "Faridabad", "Fatehabad", "Gurgaon", "Hissar", "Jhajjar", "Jind", "Karnal", "Kaithal",
//                                            "Kurukshetra", "Mahendragarh", "Mewat", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamuna Nagar"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < haryana.length; i++) {
//                options += '<option value="' + haryana[i] + '">' + haryana[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }


//    if ($val == 'Himachal Pradesh') {
//        var himachal = ["Baddi", "Baitalpur", "Chamba", "Dharamsala", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul & Spiti", "Mandi", "Simla", "Sirmaur", "Solan", "Una"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < himachal.length; i++) {
//                options += '<option value="' + himachal[i] + '">' + himachal[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Jammu and Kashmir') {
//        var jammu = ["Jammu", "Leh", "Rajouri", "Srinagar"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < jammu.length; i++) {
//                options += '<option value="' + jammu[i] + '">' + jammu[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Jharkhand') {
//        var jharkhand = ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribag", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu",
//                                            "Ramgarh", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < jharkhand.length; i++) {
//                options += '<option value="' + jharkhand[i] + '">' + jharkhand[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Karnataka') {
//        var karnataka = ["Bagalkot", "Bangalore", "Bangalore Urban", "Belgaum", "Bellary", "Bidar", "Bijapur", "Chamarajnagar", "Chikkamagaluru", "Chikkaballapur",
//                                           "Chitradurga", "Davanagere", "Dharwad", "Dakshina Kannada", "Gadag", "Gulbarga", "Hassan", "Haveri district", "Kodagu",
//                                           "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", "Shimoga", "Tumkur", "Udupi", "Uttara Kannada", "Ramanagara", "Yadgir"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < karnataka.length; i++) {
//                options += '<option value="' + karnataka[i] + '">' + karnataka[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Kerala') {
//        var kerala = ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thrissur", "Thiruvananthapuram", "Wayanad"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < kerala.length; i++) {
//                options += '<option value="' + kerala[i] + '">' + kerala[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Madhya Pradesh') {
//        var mp = ["Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhilai", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Dewas", "Dhar", "Guna", "Gwalior", "Hoshangabad",
//                                    "Indore", "Itarsi", "Jabalpur", "Khajuraho", "Khandwa", "Khargone", "Malanpur", "Malanpuri (Gwalior)", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Pithampur", "Raipur", "Raisen", "Ratlam",
//                                    "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Singrauli", "Ujjain"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < mp.length; i++) {
//                options += '<option value="' + mp[i] + '">' + mp[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Maharashtra') {
//        var maharashtra = ["Ahmednagar", "Akola", "Alibag", "Amaravati", "Arnala", "Aurangabad", "Aurangabad", "Bandra", "Bassain", "Belapur", "Bhiwandi", "Bhusaval", "Borliai-Mandla", "Chandrapur", "Dahanu", "Daulatabad", "Dighi (Pune)", "Dombivali", "Goa", "Jaitapur", "Jalgaon",
//                                             "Jawaharlal Nehru (Nhava Sheva)", "Kalyan", "Karanja", "Kelwa", "Khopoli", "Kolhapur", "Lonavale", "Malegaon", "Malwan", "Manori",
//                                             "Mira Bhayandar", "Miraj", "Mumbai (ex Bombay)", "Murad", "Nagapur", "Nagpur", "Nalasopara", "Nanded", "Nandgaon", "Nasik", "Navi Mumbai", "Nhave", "Osmanabad", "Palghar",
//                                             "Panvel", "Pimpri", "Pune", "Ratnagiri", "Sholapur", "Shrirampur", "Shriwardhan", "Tarapur", "Thana", "Thane", "Trombay", "Varsova", "Vengurla", "Virar", "Wada"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < maharashtra.length; i++) {
//                options += '<option value="' + maharashtra[i] + '">' + maharashtra[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Manipur') {
//        var manipur = ["Bishnupur", "Churachandpur", "Chandel", "Imphal East", "Senapati", "Tamenglong", "Thoubal", "Ukhrul", "Imphal West"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < manipur.length; i++) {
//                options += '<option value="' + manipur[i] + '">' + manipur[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Meghalaya') {
//        var meghalaya = ["Baghamara", "Balet", "Barsora", "Bolanganj", "Dalu", "Dawki", "Ghasuapara", "Mahendraganj", "Moreh", "Ryngku", "Shella Bazar", "Shillong"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < meghalaya.length; i++) {
//                options += '<option value="' + meghalaya[i] + '">' + meghalaya[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Mizoram') {
//        var mizoram = ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < mizoram.length; i++) {
//                options += '<option value="' + mizoram[i] + '">' + mizoram[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Nagaland') {
//        var nagaland = ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < nagaland.length; i++) {
//                options += '<option value="' + nagaland[i] + '">' + nagaland[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Orissa') {
//        var orissa = ["Bahabal Pur", "Bhubaneswar", "Chandbali", "Gopalpur", "Jeypore", "Paradip Garh", "Puri", "Rourkela"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < orissa.length; i++) {
//                options += '<option value="' + orissa[i] + '">' + orissa[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Puducherry') {
//        var puducherry = ["Karaikal", "Mahe", "Pondicherry", "Yanam"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < puducherry.length; i++) {
//                options += '<option value="' + puducherry[i] + '">' + puducherry[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Punjab') {
//        var punjab = ["Amritsar", "Barnala", "Bathinda", "Firozpur", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Sri Muktsar Sahib", "Pathankot",
//                                        "Patiala", "Rupnagar", "Ajitgarh (Mohali)", "Sangrur", "Shahid Bhagat Singh Nagar", "Tarn Taran"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < punjab.length; i++) {
//                options += '<option value="' + punjab[i] + '">' + napunjabgaland[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Rajasthan') {
//        var rajasthan = ["Ajmer", "Banswara", "Barmer", "Barmer Rail Station", "Basni", "Beawar", "Bharatpur", "Bhilwara", "Bhiwadi", "Bikaner", "Bongaigaon", "Boranada, Jodhpur", "Chittaurgarh", "Fazilka", "Ganganagar", "Jaipur", "Jaipur-Kanakpura",
//                                       "Jaipur-Sitapura", "Jaisalmer", "Jodhpur", "Jodhpur-Bhagat Ki Kothi", "Jodhpur-Thar", "Kardhan", "Kota", "Munabao Rail Station", "Nagaur", "Rajsamand", "Sawaimadhopur", "Shahdol", "Shimoga", "Tonk", "Udaipur"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < rajasthan.length; i++) {
//                options += '<option value="' + rajasthan[i] + '">' + rajasthan[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//    if ($val == 'Sikkim') {
//        var sikkim = ["Chamurci", "Gangtok"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < sikkim.length; i++) {
//                options += '<option value="' + sikkim[i] + '">' + sikkim[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }


//    if ($val == 'Tamil Nadu') {
        var tn = ["Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mandapam", "Nagapattinam", "Nilgiris", "Namakkal", "Perambalur","Puducherry", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Thiruvallur", "Tirupur",
                                   "Tiruchirapalli", "Theni", "Tirunelveli", "Thanjavur", "Thoothukudi", "Tiruvallur", "Tiruvannamalai", "Vellore", "Villupuram", "Viruthunagar"];
        $(function () {
            var options = '';
            for (var i = 0; i < tn.length; i++) {
                options += '<option value="' + tn[i] + '">' + tn[i] + '</option>';
            }
            $('#ddlCity').html(options);
        });
//    }


//    if ($val == 'Telangana') {
//        var telangana = ["Adilabad", "Hyderabad", "Karimnagar", "Mahbubnagar", "Medak", "Nalgonda", "Nizamabad", "Ranga Reddy", "Warangal"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < telangana.length; i++) {
//                options += '<option value="' + telangana[i] + '">' + telangana[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }


//    if ($val == 'Tripura') {
//        var tripura = ["Agartala", "Dhalaighat", "Kailashahar", "Kamalpur", "Kanchanpur", "Kel Sahar Subdivision", "Khowai", "Khowaighat", "Mahurighat", "Old Raghna Bazar", "Sabroom", "Srimantapur"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < tripura.length; i++) {
//                options += '<option value="' + tripura[i] + '">' + tripura[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }


//    if ($val == 'Uttar Pradesh') {
//        var up = ["Agra", "Allahabad", "Auraiya", "Banbasa", "Bareilly", "Berhni", "Bhadohi", "Dadri", "Dharchula", "Gandhar", "Gauriphanta", "Ghaziabad", "Gorakhpur", "Gunji",
//                                    "Jarwa", "Jhulaghat (Pithoragarh)", "Kanpur", "Katarniyaghat", "Khunwa", "Loni", "Lucknow", "Meerut", "Moradabad", "Muzaffarnagar", "Nepalgunj Road", "Pakwara (Moradabad)",
//                                    "Pantnagar", "Saharanpur", "Sonauli", "Surajpur", "Tikonia", "Varanasi"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < up.length; i++) {
//                options += '<option value="' + up[i] + '">' + up[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }


//    if ($val == 'Uttarakhand') {
//        var uttarakhand = ["Almora", "Badrinath", "Bangla", "Barkot", "Bazpur", "Chamoli", "Chopra", "Dehra Dun", "Dwarahat", "Garhwal", "Haldwani", "Hardwar", "Haridwar", "Jamal", "Jwalapur", "Kalsi", "Kashipur", "Mall",
//                                           "Mussoorie", "Nahar", "Naini", "Pantnagar", "Pauri", "Pithoragarh", "Rameshwar", "Rishikesh", "Rohni", "Roorkee", "Sama", "Saur"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < uttarakhand.length; i++) {
//                options += '<option value="' + uttarakhand[i] + '">' + uttarakhand[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }


//    if ($val == 'West Bengal') {
//        var wb = ["Alipurduar", "Bankura", "Bardhaman", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah",
//                                    "Jalpaiguri", "Kolkata", "Maldah", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"];
//        $(function () {
//            var options = '';
//            for (var i = 0; i < wb.length; i++) {
//                options += '<option value="' + wb[i] + '">' + wb[i] + '</option>';
//            }
//            $('#secondlist').html(options);
//        });
//    }

//}