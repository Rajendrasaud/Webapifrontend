$(document).ready(function() {
    var token = localStorage.getItem('token')
    var n=1;

    $.getJSON('http://localhost:8080/blog/getall', function(res) {

        $.each(res, function(blogdata) {
            $('#blog_details').append(
                '<tr>'+
                    '<td>'+n+'</td>'+
                    '<td style="width:15%"><img src="http://localhost:8080/assets/images/blog/' + res[blogdata].theme_image + '" style="width: 100%" alt="blog"></td>'+
                    '<td>' + res[blogdata].blog_title + '</td>' +
                    '<td>' + res[blogdata].heading + '</td>' +
                    '<td>' + res[blogdata].description + '</td>' +
                    '<td> <button type="button" class="btn btn-danger" blog_id="' + res[blogdata]._id + '" id="btn_delete"> Delete '+
                '</tr>'
            );
            n++;
        });
    })


    $("#blog_details").on('click', '#btn_delete', function() {

        var confirm_btn=confirm("Are you sure?");

            if (confirm_btn==true) {
                blog_id = $(this).attr('blog_id');
                var data = {
                    _id: blog_id
                }

                $.ajax({
                    type: 'DELETE',
                    url: 'http://localhost:8080/blog/delete',
                    data: data,
                    // beforeSend: function(xhr) {
                    //     if (token) {
                    //         xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    //     }
                    // },
                    success: function(data) {
                        alert('Blog Deleted');
                        location.href = "blog_table.html";
                    },
                    error: function() {
                        alert("error")
                    }
                })

            }
    })



// ----------------------Add blog----------------------


var selectedImage = $('#selected_image')

$('#btn_add_blog').click(function(e) {
   e.preventDefault();
   blog_title = $("#blog_title").val();
   heading = $("#blog_heading").val();
   description = $("#blog_description").val();

   if (blog_title == "" 
   || heading == "" 
   || description == "") {
       alert('Invalid Credentials')
   } else {
           data = {
               "blog_title": blog_title,
               "heading": heading,
               "description": description
           }
           $.ajax({
               url: 'http://localhost:8080/blog/register',
               type: 'post',
               dataType: 'json',
               data: data,
               success: function(res, textStatus, xhr) {
                   if (res == true) {
                      alert('Blog Successfully registered.');
                       setTimeout(
                           function(){
                               window.location.href='blog.html'
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
   displaySelectedImage(this);
});


function sendImage(selectedImage) {
   var form_data = new FormData();
   let files = selectedImage.get(0).files;
   form_data.append("image", files[0]);

   $.ajax({
       type: "POST",
       url: 'http://localhost:8080/upload/blog',
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

function displaySelectedImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('#blog_image').attr('src', e.target.result);
        }

        reader.onload = function(e) {
            $('#display_selected_image').css({ 'display': 'block' });
            $('#display_selected_image').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}




});