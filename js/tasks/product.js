$(document).ready(function () {
    var link = window.location.href;
    var valu = link.split('?')[1];
    var token = localStorage.getItem('token');
    var usrid = localStorage.getItem('user_id');
    var url;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    if (valu == "All" || !valu) {
        // valu="getall"
        url = 'http://localhost:8080/product/getall';
    } else {
        url = 'http://localhost:8080/product/getByCategory/' + valu;

    }

    $.getJSON(url, function (res) {
        $.each(res, function (data) {

            $('#productslist').append(
                '<input type="text" id="txt_prodid" value="' + res[data]._id + '" hidden/>' +

                '<div class="col-lg-4 col-sm-6">' +
                '<div class="product-item">' +
                '<div class="pi-pic">' +
                '<img src="http://localhost:8080/assets/images/product/' + res[data].product_image + '" alt="">' +
                '<div class="icon">' +

                '</div>' +
                '<ul>' +
                '<li class="w-icon active" id="btn_addTOcart" product_id="' + res[data]._id + '"><a><i class="icon_bag_alt"></i></a></li>' +
                '</ul>' +
                '</div>' +
                '<div class="pi-text">' +
                '<a href="#">' +
                '<h5>' + res[data].product_name + '</h5>' +
                '</a>' +
                '<div class="product-price">' +
                '£' + res[data].product_price + '' +
                '</div></div></div></div>'
            );
        });
    })



    $.getJSON('http://localhost:8080/cart/get/' + usrid, function (res) {
        var totalPrice = 0;
        var finalTotalPrice;

        $.each(res, function (data) {

            $('#cartlist').append(
                '<tr>' +
                '<td class="cart-pic first-row"><img src="http://localhost:8080/assets/images/product/' + res[data].product_image + '" alt=""></td>' +
                '<td class="cart-title first-row">' +
                '<h5>' + res[data].product_name + '</h5>' +
                '</td>' +
                '<td class="p-price first-row">£' + res[data].product_price + '</td>' +
                '<td class="total-price first-row">' + res[data].product_brand + '</td>' +
                '<td class="total-price first-row"><button class="btn btn-danger" id="btn_del_cart" pid="' + res[data]._id + '">Remove from Cart</button></td>' +
                '</tr>'
            );

            totalPrice = parseInt(res[data].product_price) + totalPrice;
        });

        $('#totalPrice').append(
            '£' + totalPrice
        )

    })


    $("#productslist").on('click', '#btn_addTOcart', function () {
        var pid = $(this).attr('product_id');
        var time = date + ' :: ' + time;
        var data = {
            product_id: pid
        }

        if (usrid != null) {
            $.ajax({
                type: 'post',
                url: 'http://localhost:8080/product/getById',
                data: data,
                beforeSend: function (xhr) {
                    if (token) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                    }
                },
                success: function (fetchedData) {
                    var product_name = fetchedData.product_name;
                    var product_image = fetchedData.product_image;
                    var product_price = fetchedData.product_price;
                    var product_brand = fetchedData.product_brand;

                    var data1 = {
                        user_id: usrid,
                        product_name: product_name,
                        product_image: product_image,
                        product_price: product_price,
                        product_brand: product_brand
                    }
                    $.ajax({
                        type: 'POST',
                        url: 'http://localhost:8080/product/addtocart',
                        data: data1,
                        success: function (data) {

                            alert("Item added");

                        },
                        error: function () {
                            alert("Please LogIn!")
                        }
                    })

                },
                error: function () {
                    alert("Please LogIn!")
                }
            })
        } else {
            alert("Please LogIn!")

        }

    });


    $("#cartlist").on('click', '#btn_del_cart', function () {
        var id = $(this).attr('pid');
        data = {
            pid: id
        }
        // alert(id)
        $.ajax({
            type: 'delete',
            url: 'http://localhost:8080/empty/cartById',
            data: data,
            success: function (data) {

                alert("Item Removed from cart");
                location.href = "cart.html";
            },
            error: function () {
                alert("Error")
            }
        })

    })

});