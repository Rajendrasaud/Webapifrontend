$(document).ready(function() {
    var token = localStorage.getItem('token')
var uid=localStorage.getItem('user_id');
// alert(uid)
    $.getJSON('http://localhost:8080/user/get/'+uid, function(res) {
         $('#admin_name').val(res.user_name);
         $('#admin_email').val(res.user_email);
    })

    $.getJSON('http://localhost:8080/user/getall', function(res) {

        $.each(res, function(data) {
            $('#user_data').append(
                '<a href="user_table.html">'+
                    '<div class="user-img"> '+
                    '<img src="http://localhost:8080/assets/images/user/'+res[data].user_image+'" alt="user" class="img-circle">'+ 
                    '<span class="profile-status online pull-right"></span> </div>'+
                    '<div class="mail-contnet">'+
                        '<h5>'+res[data].user_name+'</h5>'+
                         '<span class="mail-desc">'+res[data].user_email+'</span></div>'+
                '</a>'
            );

        });
    })

    $.getJSON('http://localhost:8080/contact/getall', function(res) {

        $.each(res, function(data) {
            $('#contact_data').append(
                '<a href="#">'+
                    '<div class="mail-contnet">'+
                        '<h5>Name: '+res[data].user_name+'</h5>'+ 
                        '<span class="mail-desc">Email: '+res[data].user_email+'</span>'+
                        '<span class="mail-desc">Message: '+res[data].message+'</span>'+
                        '<span class="mail-desc">Date: '+res[data].contact_date+'</span>'+
                        '<span class="mail-desc">Time: '+res[data].contact_time+'</span></div>'+
                '</a>'
            );

        });
    })

    
    $.getJSON('http://localhost:8080/blog/getall', function(res) {

        $.each(res, function(data) {
            $('#index_blog_components').append(
            //    ' <div class="sl-item">'+
                // '<div class="sl-left"> <img src="./assets/images/users/2.jpg" alt="user" class="img-circle"> </div>'+
                '<div class="sl-right">'+
                '<div>' +
                // <a href="blog_table.html" class="link">John Doe</a>'+
                '<p>Title : '+res[data].blog_title+'</p>'+
                '<div class="m-t-20 row">'+
                    '<div class="col-md-3 col-xs-12">'+
                        '<img src="http://localhost:8080/assets/images/blog/'+res[data].theme_image+'" alt="Blog" class="img-responsive radius"></div>'+
                    '<div class="col-md-9 col-xs-12">'+
                        '<p>'+res[data].description+' </p> </div>'+
                '</div>'+
            '</div>'  +                    
             '</div>'+
             '<hr>'

            );

        });
    })
    


    $('#btn_profile_update').click(function(e) {
        e.preventDefault();
        name = $("#admin_email").val();
        email = $("#admin_email").val();
        password = $("#admin_password").val();
        if (password == "") {
            alert('Password is empty.')
        }else{

            data = {
                // "_id":uid,
                "user_name": name,
                "user_email": email,
                "user_password": password
            }
            console.log(data)
            $.ajax({
                url: 'http://localhost:8080/user/update',
                type: 'PUT',
                dataType: 'json',
                data: data,
                success: function(res, textStatus, xhr) {

                    alert('Success')
                        window.location.href = "adminindex.html";
                  
                   
                },
                error: function(xhr, textStatus, errorThrown) {
                   alert('Error')
                }
            });

        }
    });


});