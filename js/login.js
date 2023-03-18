const eyeslash = document.querySelector('.eyeslash');
const eyeopen = document.querySelector('.eyeopen');
const password = document.querySelector('.password');
const form  = document.querySelector('.loginform');

// console.log("hi");

if (eyeslash){
    eyeslash.addEventListener('click', e=>{
        eyeopen.classList.remove('nodisplay');
        eyeslash.classList.add('nodisplay');
        password.setAttribute('type','text');
    });
}

if (eyeopen){
eyeopen.addEventListener('click', e=>{
    eyeopen.classList.add('nodisplay');
    eyeslash.classList.remove('nodisplay');
    password.setAttribute('type','password');
});
}

const  p =/^[a-zA-Z]{5,12}$/;



$(document).ready(function() {

    $('#liveToastBtn').click(function () {
        document.getElementById('usernameError').style.display = "none";
        document.getElementById('passwordError').style.display = "none";
        var name = $('#username').val();
        var password = $('#password').val();

        var data = {"name":name, "password":password};
        
        console.log(data)

        $.ajax({
            type:"POST",
            cache:false,
            url:"/php/login.php",
            data:data,
            success: function (data) {
              if (data == 1){
                localStorage.setItem('username',name);
                window.location.href = "/profile.html"; 
              }
              else if (data == 0){
                document.getElementById('passwordError').style.display = "";
                console.log("Wrong password");
              }else{
                document.getElementById('usernameError').style.display = "";
                console.log("User doesnt exist");
              }
            }
        });

        return false;
    });
});