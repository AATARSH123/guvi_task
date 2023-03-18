const eyeslash = document.querySelector('.eyeslash');
const eyeopen = document.querySelector('.eyeopen');
const ceyeslash = document.querySelector('.ceyeslash');
const ceyeopen = document.querySelector('.ceyeopen');
const password = document.querySelector('.password');
const cpassword = document.querySelector('.cpassword');
const form  = document.querySelector('.loginform');

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

if (ceyeslash){
    ceyeslash.addEventListener('click', e=>{
        ceyeopen.classList.remove('nodisplay');
        ceyeslash.classList.add('nodisplay');
        cpassword.setAttribute('type','text');
    });
}

if (ceyeopen){
    ceyeopen.addEventListener('click', e=>{
        ceyeopen.classList.add('nodisplay');
        ceyeslash.classList.remove('nodisplay');
        cpassword.setAttribute('type','password');
    });
}

const  p =/^[a-zA-Z]{5,12}$/;

// let us assume this is a password and username of user
// Username: anish
// password: Anish@12
// if he enter wrong credentials we will be showing error of incorrect username or password

// form.addEventListener('submit', e=>{
//     e.preventDefault();
//     const name = form.username.value;
//     const pass = form.password.value;
//     console.log(name,pass)
    
// });

$(document).ready(function() {

    $('#liveToastBtn').click(function () {

        document.getElementById('userError').style.display = "none";
        document.getElementById('passwordMismatchError').style.display = "none";

        var name = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var cpassword = $('#cpassword').val();

        var data = {"name":name, "email": email,"password":password , "cpassword":cpassword};
        
        console.log(data)

        $.ajax({
            type:"POST",
            cache:false,
            url:"/php/register.php",
            data:data,
            success: function (data) {
                if(data==1){
                    localStorage.setItem('username',name);
                    window.location.href = "/profile.html";
                }
                else if(data == -1){
                    document.getElementById('userError').style.display = "";
                }
                else if(data == -2){
                    document.getElementById('passwordMismatchError').style.display = "";
                }
                else{
                    alert('We are having server issues. Please try again later');
                }
            }
        });

        return false;
    });
});