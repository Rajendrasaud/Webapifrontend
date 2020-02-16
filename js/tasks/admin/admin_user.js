$(document).ready(function() {
    var token = localStorage.getItem('token')
    var n=1;

    $.getJSON('http://localhost:8080/user/getall', function(res) {

        $.each(res, function(userdata) {
            $('#user_details').append(
                '<tr>'+
                    '<td>'+n+'</td>'+
                    '<td style="width:15%"><img src="http://localhost:8080/assets/images/user/' + res[userdata].user_image + '" style="width: 100%" alt="User"></td>'+
                    '<td>' + res[userdata].user_name + '</td>' +
                    '<td>' + res[userdata].user_email + '</td>' +
                '</tr>'
            );
            n++;
        });
    })

    var id;


});