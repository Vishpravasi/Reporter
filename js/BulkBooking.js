var Pub_Ro_No = ""; var Pub_Ro_Date = ""; var Bkd_Frm_Date = ""; var Bkd_To_Date = "";
var Insetn_Frm_Date = ""; var Insetn_To_Date = ""; var pub_Publication = "";
var pub_Product = ""; var pub_Edition = ""; var pub_Ad_Type = ""; var pub_Sub_Type = "";
var pub_Catg = ""; var pub_Color = ""; var StrChkBookingNo = ""; var StrCurBookingNo = "";
var StrPreBookingNo = ""; var RoSequenceNo = ""; var strSno = ""; var strAdvSno = 0;
var strBatchNo = "";
var strUserid = "";
$(document).ready(function () {
    strUserid = window.sessionStorage.strUserId;//strUserName;
    Load_BulkBookingStatus();
    // $("#BulkBkg_Clear").trigger('click');
});

function Load_BulkBookingStatus() {
    Bkd_Frm_Date = $('#Bkd_Frm_Date').val();
    strBatchNo = $("#Batch_No").val();
    $("#BulkBooking_ViewAd").empty();
    var StrChkBookingNo = ""; var StrCurBookingNo = ""; var StrPreBookingNo = "";
    var str_headerval = ""; var strSno = "";
    str_headerval += "<thead><tr style='background-color:#3075B0' ><th class='w30'>&nbsp;</th> <th class='w100'>Booking No.</th> <th class='w100'>Franchise Booking No</th>";
    str_headerval += "<th class='w120'>Ad Type  </th> <th class='w73'>Publication   </th><th class='w73'>Edition</th><th class='w73'>Booking Date</th><th class='w73'>Ad Status </th>";
    str_headerval += " <th class='w100'>Reason</th></tr></thead><tbody>";
    $("#BulkBooking_ViewAd").append(str_headerval);
    $.ajax({
        //url: "http://thehinduads.com/B2B/HinduFranchiseeService.svc/Get_BulkBookingAdStatus",
        url: gStrIpVal + "HinduFranchiseeService.svc/Get_BulkBookingAdStatus",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: '{"struserid": "' + strUserid + '","Bkg_FromDate": "' + Bkd_Frm_Date + '","BatchNo": "' + strBatchNo + '"}',
        datatype: 'json',
        async: false,
        success: function (data) {
            var index; var strval = ""; var i = 0; var strvalAdv = "";
            var Published_StrPreBookingNo = ""; var Published_StrCurBookingNo = "";
            if (data.Get_BulkBookingAdStatusResult.length > 0) {
                $.each(data.Get_BulkBookingAdStatusResult, function (index, value) {
                    Published_StrCurBookingNo = data.Get_BulkBookingAdStatusResult[index].strBookingno;
                    if (Published_StrCurBookingNo != Published_StrPreBookingNo && Published_StrPreBookingNo == "") {
                        strAdvSno = 0; strSno++; strAdvSno++;
                        strval += "<tr class='ad'><td><a  href='javascript:;' title='" + data.Get_BulkBookingAdStatusResult[index].strBookingno + "' onclick='get_records(this.title)' class='viewad_BulkBooking" + data.Get_BulkBookingAdStatusResult[index].strBookingno + "'><span class='plus-minus'>+</span></a></td>";
                        strval += "<td>" + data.Get_BulkBookingAdStatusResult[index].strIASBkgNo + "</td>";
                        strval += "<td>" + data.Get_BulkBookingAdStatusResult[index].strBookingno + "</td>";
                        strval += "<td>" + data.Get_BulkBookingAdStatusResult[index].strAdTypeCode + "</td>";
                        strval += "<td>" + data.Get_BulkBookingAdStatusResult[index].strPublncode + "</td>";
                        strval += "<td>" + data.Get_BulkBookingAdStatusResult[index].strEditionCode + "</td>";
                        strval += "<td>" + data.Get_BulkBookingAdStatusResult[index].strbkgDate + "</td>";
                        strval += "<td>" + data.Get_BulkBookingAdStatusResult[index].strAdStatus + "</td>";
                        strval += "<td>" + "reason" + "</td>";
                        strval += "</tr> ";
                        strval += "<tr class='row_pub" + data.Get_BulkBookingAdStatusResult[index].strBookingno + "' style='display:none;'><td colspan='12' class='trinner'><table id='row' class='row_pub" + data.Get_BulkBookingAdStatusResult[index].strBookingno + " table tabledit active rowOuter tableInner' style='display:none;'>";
                        strval += "<thead ><tr><th class='w60'>Ad No</th><th class='w100'>Franchisee Ad No.</th> ";
                        strval += "<th class='w120'>Ad Type  </th> <th class='w73'>Publication   </th><th class='w73'>Edition</th><th class='w73'>Issue Date</th><th class='w73'>Ad Status </th>";
                        strval += " <th class='w100'>Reason</th></tr>";
                        strval += " </thead><tbody id='add_BulkBookingadv" + data.Get_BulkBookingAdStatusResult[index].strBookingno + "'></tbody></table></tr>";
                        $("#BulkBooking_ViewAd").append(strval);
                        //
                        strvalAdv += "<tr><td>" + data.Get_BulkBookingAdStatusResult[index].strIASBkgNo + "</td>";
                        strvalAdv += "<td>" + data.Get_BulkBookingAdStatusResult[index].stradvno + "</td>";
                        strvalAdv += "<td>" + data.Get_BulkBookingAdStatusResult[index].strAdTypeCode + "</td>";
                        strvalAdv += "<td>" + data.Get_BulkBookingAdStatusResult[index].strPublncode + "</td>";
                        strvalAdv += "<td>" + data.Get_BulkBookingAdStatusResult[index].strEditionCode + "</td>";
                        strvalAdv += "<td>" + data.Get_BulkBookingAdStatusResult[index].strIssueDate + "</td>";
                        strvalAdv += "<td>" + data.Get_BulkBookingAdStatusResult[index].strAdStatus + "</td>";
                        strvalAdv += "<td>" + "Reason" + "</td>";
                        strvalAdv += "</tr>";
                        $("#add_BulkBookingadv" + data.Get_BulkBookingAdStatusResult[index].strBookingno).append(strvalAdv);
                    }
                    if (Published_StrCurBookingNo != Published_StrPreBookingNo && Published_StrPreBookingNo != "") {
                        strAdvSno = 0; strSno++; strAdvSno++;
                        strval += "<tr class='ad'><td><a  href='javascript:;' title='" + data.Get_BulkBookingAdStatusResult[index].strBookingno + "' onclick='get_records(this.title)' class='viewad_BulkBooking" + data.Get_BulkBookingAdStatusResult[index].strBookingno + "'><span class='plus-minus'>+</span></a></td>";

                        strval += "<td>" + data.Get_BulkBookingAdStatusResult[index].strIASBkgNo + "</td>";
                        strval += "<td>" + data.Get_BulkBookingAdStatusResult[index].strBookingno + "</td>";
                        strval += "<td>" + data.Get_BulkBookingAdStatusResult[index].strAdTypeCode + "</td>";
                        strval += "<td>" + data.Get_BulkBookingAdStatusResult[index].strPublncode + "</td>";
                        strval += "<td>" + data.Get_BulkBookingAdStatusResult[index].strEditionCode + "</td>";
                        strval += "<td>" + data.Get_BulkBookingAdStatusResult[index].strbkgDate + "</td>";
                        strval += "<td>" + data.Get_BulkBookingAdStatusResult[index].strAdStatus + "</td>";
                        strval += "<td>" + "reason" + "</td>";
                        strval += "</tr> ";
                        strval += "<tr class='row_pub" + data.Get_BulkBookingAdStatusResult[index].strBookingno + "' style='display:none;'><td colspan='12' class='trinner'><table id='row' class='row_pub" + data.Get_BulkBookingAdStatusResult[index].strBookingno + " table tabledit active rowOuter tableInner' style='display:none;'>";
                        strval += "<thead ><tr><th class='w60'>Ad No</th><th class='w100'>Franchisee Ad No.</th> ";
                        strval += "<th class='w120'>Ad Type  </th> <th class='w73'>Publication   </th><th class='w73'>Edition</th><th class='w73'>Issue Date</th><th class='w73'>Ad Status </th>";
                        strval += " <th class='w100'>Reason</th></tr>";
                        strval += " </thead><tbody id='add_BulkBookingadv" + data.Get_BulkBookingAdStatusResult[index].strBookingno + "'></tbody></table></tr>";

                        $("#BulkBooking_ViewAd").append(strval);
                        strvalAdv += "<tr><td>" + data.Get_BulkBookingAdStatusResult[index].strIASBkgNo + "</td>";
                        strvalAdv += "<td>" + data.Get_BulkBookingAdStatusResult[index].stradvno + "</td>";
                        strvalAdv += "<td>" + data.Get_BulkBookingAdStatusResult[index].strAdTypeCode + "</td>";
                        strvalAdv += "<td>" + data.Get_BulkBookingAdStatusResult[index].strPublncode + "</td>";
                        strvalAdv += "<td>" + data.Get_BulkBookingAdStatusResult[index].strEditionCode + "</td>";
                        strvalAdv += "<td>" + data.Get_BulkBookingAdStatusResult[index].strIssueDate + "</td>";
                        strvalAdv += "<td>" + data.Get_BulkBookingAdStatusResult[index].strAdStatus + "</td>";
                        strvalAdv += "<td>" + "Reason" + "</td>";
                        strvalAdv += "</tr>";
                        $("#add_BulkBookingadv" + data.Get_BulkBookingAdStatusResult[index].strBookingno).append(strvalAdv);
                        //strvalAdv = "";
                    }
                    if (Published_StrCurBookingNo == Published_StrPreBookingNo) {
                        strAdvSno++;
                        //Changed
                        strvalAdv += "<tr><td>" + data.Get_BulkBookingAdStatusResult[index].strIASBkgNo + "</td>";
                        strvalAdv += "<td>" + data.Get_BulkBookingAdStatusResult[index].stradvno + "</td>";
                        strvalAdv += "<td>" + data.Get_BulkBookingAdStatusResult[index].strAdTypeCode + "</td>";
                        strvalAdv += "<td>" + data.Get_BulkBookingAdStatusResult[index].strPublncode + "</td>";
                        strvalAdv += "<td>" + data.Get_BulkBookingAdStatusResult[index].strEditionCode + "</td>";
                        strvalAdv += "<td>" + data.Get_BulkBookingAdStatusResult[index].strIssueDate + "</td>";
                        strvalAdv += "<td>" + data.Get_BulkBookingAdStatusResult[index].strAdStatus + "</td>";
                        strvalAdv += "<td>" + "Reason" + "</td>";
                        strvalAdv += "</tr>";
                        $("#add_BulkBookingadv" + data.Get_BulkBookingAdStatusResult[index].strBookingno).append(strvalAdv);
                        //strvalAdv = "";s
                    }
                    Published_StrPreBookingNo = data.Get_BulkBookingAdStatusResult[index].strBookingno;
                    strval = ""; strvalAdv = "";
                });
            }
            else {
                strval += "<tr><td colspan='12'><center>No Records Found</center></td></tr>";
                $("#BulkBooking_ViewAd").append(strval);
                strval = "";
            }
            $("#BulkBooking_ViewAd").append("</tbody>");
            $("#BulkBooking_ViewAd_Count").text("Total No. of Records: " + data.Get_BulkBookingAdStatusResult.length);
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
}

function get_records(id) {

    $(".row_pub" + id).toggle();
    $(".row_pub" + id).toggleClass("addsymbol");

    if ($(".row_pub" + id).hasClass("addsymbol")) {
        //F_Load_AdvRecords(id);
        $(".viewad_BulkBooking" + id + " span").text('-')
    }
    else {
        $(".viewad_BulkBooking" + id + " span").text('+')
    }


}

$("#BulkBkg_Search").click(function () {
    // Bkd_Frm_Date = new Date($('#Bkd_Frm_Date').val());
    // Bkd_To_Date = new Date($('#Bkd_To_Date').val());
    // if (Bkd_Frm_Date != "" && Bkd_To_Date != "") {
    //     if (Bkd_Frm_Date > Bkd_To_Date) {
    //        alert("Booking To Date is Less than Booking From Date");
    //        return;
    //    }
    //}
    Load_BulkBookingStatus();
});

$("#BulkBkg_Clear").click(function () {
    $('#Bkd_Frm_Date').val("");
    $('#Batch_No').val("");
});