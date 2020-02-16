$(document).ready(function () {


    var tok = localStorage.getItem('token');


    $('#btn_checkout').click(function(e) {
        e.preventDefault();
                data = {
                user_id: localStorage.getItem('user_id')
            }
            // console.log(data)
            $.ajax({
                url: 'http://localhost:8080/empty/cart',
                type: 'delete',
                beforeSend: function(xhr) {
                    if (tok) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + tok);
                    }
                },
                data: data,
                success: function(res, textStatus, xhr) {

                    alert('Checkout proceeding.');

                        window.location.href = "shopping-cart.html";
                    
                   
                },
                error: function(xhr, textStatus, errorThrown) {
                   alert('Error')
                }
            });

    });


});