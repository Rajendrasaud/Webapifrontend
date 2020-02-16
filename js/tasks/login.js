$(document).ready(function () {


    var tok = localStorage.getItem('token');


    $('#btnlogin').click(function(e) {
        e.preventDefault();
        email = $("#user_email").val();
        password = $("#user_password").val();
        if (email == ""||password == "") {
            alert('E mail or password is empty.')
        }else{

            data = {
                "user_email": email,
                "user_password": password
            }
            console.log(data)
            $.ajax({
                url: 'http://localhost:8080/user/login',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function(res, textStatus, xhr) {

                    localStorage.setItem('token', res.token);
                    localStorage.setItem('user_id', res.id);
                    alert(localStorage.getItem('user_id'));
                    if (res.user_type == 'user') {
                        window.location.href = "index.html";
                    } else if (res.user_type == 'admin') {
                        window.location.href = "adminindex.html";
                    }
                   
                },
                error: function(xhr, textStatus, errorThrown) {
                   alert('Error')
                }
            });

        }


    });


});