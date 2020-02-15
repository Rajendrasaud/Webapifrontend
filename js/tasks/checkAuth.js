$(document).ready(function() {

    var tokenAvailable = localStorage.getItem('token');

       $.ajax({
               url: 'http://localhost:8080/checking/auth',
               type: 'GET',
               beforeSend: function(xhr) {
                   if (tokenAvailable) {
                       xhr.setRequestHeader('Authorization', 'Bearer ' + tokenAvailable);
                   }
               },
               success: function(data) {
                   var user_type = data.user_type;
                   if (user_type == "admin") {
                       window.location.href = "adminindex.html";
                   } 
                   $('#contact_user_name').val(data.user_name);
                   $('#contact_user_email').val(data.user_email);

               },
               error: function(error) {
   
               }
           })
           // token check end
           var isUserAvailable=localStorage.getItem('user_id');
            var ulen=1;
           if(!isUserAvailable){
               ulen=1;
           }else{
               ulen=isUserAvailable.length;
           }
               
           if(ulen>1){
            $('#loginCoresol').append(
                '<i class="fa fa-user"></i><button style="background-color: white; border: none;" id="btn_loginCoresol">Logout</button>'
            );
            $("#loginCoresol").on('click', '#btn_loginCoresol', function() {
                console.log('I am here')
                $.ajax({
                    url: 'http://localhost:8080/logout',
                    type: 'post',
                    beforeSend: function(xhr) {
                        if (tokenAvailable) {
                            xhr.setRequestHeader('Authorization', 'Bearer ' + tokenAvailable);
                        }
                    },
                    success: function(data) {
                        localStorage.removeItem('user_id')
                        window.location.href = "index.html";
        
                    },
                    error: function(error) {
                        console.log("Error")
                    }
                })
            });

            $('#navbar').append(
                '<li><a href="./profile.html">Profie</a></li>'                      
            );

            


           }else{
            $('#loginCoresol').append(

            '<i class="fa fa-user"></i><button style="background-color: white; border: none;" id="btn_loginCoresol">Login</button>' 
            );

            $('#navbar').append(
                '<li><a href="./login.html">Login</a></li>' +                     
                '<li><a href="./register.html">Register</a></li>'                      
            );

            $("#loginCoresol").on('click', '#btn_loginCoresol', function() {
                window.location.href = "login.html";

            })
           }
});