$(document).ready(function() {

 var selectedImage = $('#selected_image')
 var ImageName = '';

$('#btn_register').click(function(e) {
    e.preventDefault();
    user_name = $("#user_name").val();
    user_password = $("#user_password").val();
    user_email = $("#user_email").val();
    user_profile = ImageName;

    if (user_name == "" || user_password == "" || user_email == "") {
        alert('Invalid Credentials')
    } else {
            data = {
                "user_name": user_name,
                "user_password": user_password,
                "user_email": user_email,
                "user_profile": user_profile
            }
            $.ajax({
                url: 'http://localhost:8080/user/register',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function(res, textStatus, xhr) {
                    if (res == true) {
                       alert('You are successfully registered.\nPlease Login to proceed');
                        setTimeout(
                            function(){
                                window.location.href='login.html'
                            },500
                        );
                    } else {
                        alert('Someting went wrong');
                    }
                },
                error: function(xhr, textStatus, errorThrown) {
                    alert('Invalid Credentials');
                }
            });
    }
});


$('#selected_image').change(function() {
    sendImage(selectedImage);
});


function sendImage(selectedImage) {
    var form_data = new FormData();
    let files = selectedImage.get(0).files;
    form_data.append("image", files[0]);

    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/upload/user',
        contentType: false,
        cache: false,
        processData: false,
        data: form_data,
        success: function(data) {
            ImageName = JSON.parse(data);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        }
    });
}


});