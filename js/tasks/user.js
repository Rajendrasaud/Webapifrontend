$(document).ready(function() {

    $.getJSON('http://localhost:8080/user/get/'+localStorage.getItem('user_id'), function(res) {
        $('#profile_name').val(res.user_name);
        $('#profile_email').val(res.user_email);
    })


    $('#btn_profile_update').click(function(e) {
        e.preventDefault();
        name = $("#profile_email").val();
        email = $("#profile_email").val();
        password = $("#profile_password").val();
        if (password == "") {
            alert('Password is empty.')
        }else{

            data = {
                "id":localStorage.getItem('user_id'),
                "user_name": name,
                "user_email": email,
                "user_password": password
            }
            console.log(data)
            $.ajax({
                url: 'http://localhost:8080/user/updateuser',
                type: 'PUT',
                dataType: 'json',
                data: data,
                success: function(res, textStatus, xhr) {

                    alert('Success')
                        window.location.href = "index.html";
                  
                   
                },
                error: function(xhr, textStatus, errorThrown) {
                   alert('Error')
                }
            });

        }
    });


});