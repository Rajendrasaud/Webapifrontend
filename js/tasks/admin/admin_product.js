$(document).ready(function() {
    var token = localStorage.getItem('token')
    var n=1;

    $.getJSON('http://localhost:8080/product/getall', function(res) {

        $.each(res, function(productdata) {
            $('#product_details').append(
                '<tr>'+
                    '<td>'+n+'</td>'+
                    '<td style="width:15%"><img src="http://localhost:8080/assets/images/product/' + res[productdata].product_image + '" style="width: 100%" alt="product"></td>'+
                    '<td>' + res[productdata].product_name + '</td>' +
                    '<td>' + res[productdata].product_description + '</td>' +
                    '<td>' + res[productdata].product_price + '</td>' +
                    '<td>' + res[productdata].product_weight + '</td>' +
                    '<td>' + res[productdata].product_category + '</td>' +
                    '<td>' + res[productdata].product_brand + '</td>' +
                    '<td> <button type="button" class="btn btn-danger" product_id="' + res[productdata]._id + '" id="btn_delete"> Delete '+
                '</tr>'
            );
            n++;
        });
    })


    $("#product_details").on('click', '#btn_delete', function() {

        var confirm_btn=confirm("Are you sure?");

            if (confirm_btn==true) {
                product_id = $(this).attr('product_id');
                var data = {
                    _id: product_id
                }

                $.ajax({
                    type: 'DELETE',
                    url: 'http://localhost:8080/product/delete',
                    data: data,
                    success: function(data) {
                        alert('Product Deleted');
                        location.href = "product_table.html";
                    },
                    error: function() {
                        alert("error")
                    }
                })

            }
    })



// Add product


var selectedImage = $('#selected_image')

$('#btn_add_product').click(function(e) {
   e.preventDefault();
   product_name = $("#product_name").val();
   product_price = $("#product_price").val();
   product_description = $("#product_description").val();
   product_category = $("#product_category").val();
   product_weight = $("#product_weight").val();
   product_brand = $("#product_brand").val();

   if (product_name == "" 
   || product_price == "" 
   || product_description == ""
   || product_category == ""
   || product_weight == ""
   || product_brand == "") {
       alert('Invalid Credentials')
   } else {
           data = {
               "product_name": product_name,
               "product_price": product_price,
               "product_description": product_description,
               "product_category": product_category,
               "product_weight": product_weight,
               "product_brand": product_brand
           }
           $.ajax({
               url: 'http://localhost:8080/product/register',
               type: 'post',
               dataType: 'json',
               data: data,
               success: function(res, textStatus, xhr) {
                   if (res == true) {
                      alert('Product Successfully registered.');
                       setTimeout(
                           function(){
                               window.location.href='adminproduct.html'
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
       url: 'http://localhost:8080/upload/product',
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
            $('#product_image').attr('src', e.target.result);
        }

        reader.onload = function(e) {
            $('#display_selected_image').css({ 'display': 'block' });
            $('#display_selected_image').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}




});