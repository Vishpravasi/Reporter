
var lstCertificate = []; 
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
    fnfileDisplay();

   
});

function fnfileDisplay() {
    $('#demerge tbody').empty();
   // $('#demerge tbody').append('<tr><th>CERTIFICATE NAME</th></tr>');
    $.ajax({
        //url: "http://thehinduads.com/b2badops/HinduAdopsService.svc/Get_AgencyBranch",
        url: gStrIpVal + "HinduFranchiseeService.svc/Get_Demerge_details",
        //data: '{"branch": "' + $("#txtAgencyBranch").val() + '","strColumn": "' + $("#ddSerachSPAgency").val() + '","strValue": "' + $("#txtSPAdminAgency").val() + '"}',
        cache: false,
        type: "POST",
        async: false,
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            var index1; strval = "";

            $.each(data.Get_Demerge_detailsResult, function (index1, value) {
                if (index1 % 2 == 0 || index1==0)
                $('#demerge tbody').append('<tr class="trSPAgencyInfo" style="cursor:pointer">');
                $('#demerge tbody').append('<td><a href="' + data.Get_Demerge_detailsResult[index1].strPath + '" target="_blank" download>' + data.Get_Demerge_detailsResult[index1].strDisplayName + '</a></td>');
                if (index1 % 2 == 0 || index1 == 0)
                $('#demerge tbody').append('</tr>');
                //$('#demerge tbody').append('<tr class="trSPAgencyInfo" style="cursor:pointer"><td>' + data.Get_Demerge_detailsResult[index1].strDisplayName + '</td><td>' + data.Get_Demerge_detailsResult[index1].strPath + '</td></tr>');

               // $('#demerge tbody').append('<tr class="trSPAgencyInfo" style="cursor:pointer"><td>' + data.Get_Demerge_detailsResult[index1].strDisplayName + '</td><td>' + data.Get_Demerge_detailsResult[index1].strPath + '</td></tr>');
                // $('#txtAgencyBranch option[value="' + data.Get_AgencyBranchResult[index1].strBranchCode + '"]').attr("selected", "selected");

            });
        },
        error: function (jqXHR) {
            //alert(jqXHR.responseText);
        }
    });
   
}