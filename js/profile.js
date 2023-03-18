const username = localStorage.getItem('username');

$(document).ready(function() {
    if(!username){
        window.location.href = "/login.html"; 
    }
});

function load(){
    console.log("hi")
    $(document).ready(function() {

        let data = {"type": "get","username":username};
    
        $.ajax({
            type:"POST",
            cache:false,
            url:"/php/profile.php",
            data:data,
            success: function (data) {
                render(data);      
            }
        });
    
    });
}

const render = (data) => {
    console.log(data);
    const userdetails = JSON.parse(data);
    const id = userdetails[0]._id.$oid.toString()
    console.log(userdetails);
    console.log(id);
    localStorage.setItem("id",id);
    // console.log(userdetails);
    if(userdetails[0].username){
        document.getElementById('username').value = userdetails[0].username;
    }
    if(userdetails[0].email){
        document.getElementById('email').value = userdetails[0].email;
    }
    if(userdetails[0].address){
        document.getElementById('address').value = userdetails[0].email;
    }
    if(userdetails[0].dob){
        document.getElementById('dob').value = userdetails[0].dob;
    }
    if(userdetails[0].fname){
        document.getElementById('fname').value = userdetails[0].fname;
    }
    if(userdetails[0].lname){
        document.getElementById('lname').value = userdetails[0].lname;
    }
    if(userdetails[0].number!='0'){
        document.getElementById('number').value = userdetails[0].number;
    }
    if(userdetails[0].state){
        document.getElementById('state').value = userdetails[0].state;
    }
    if(userdetails[0].city){
        document.getElementById('city').value = userdetails[0].city;
    }
    if(userdetails[0].about){
        document.getElementById('about').value = userdetails[0].about;
    }
}


// $(document).ready(function() {

    $('#form').submit(function(event) {
        event.preventDefault();
        var email = $('#email').val();
        var fname = $('#fname').val();
        var lname = $('#lname').val();
        var number = $('#number').val() *1;
        var dob = $('#dob').val();
        var address = $('#address').val();
        var state = $('#state').val();
        var city = $('#city').val();
        var about = $('#about').val();
        var id = localStorage.getItem('id');

        var data = {"type": "update", "id": id,"email":email, "fname":fname, "lname": lname, "number": number, "dob":dob, "address": address, "state": state, "city":city, "about":about};
        
        console.log(data)

        $.ajax({
            type:"POST",
            cache:false,
            url:"/php/profile.php",
            data:data,
            success: function (data) {
                
            }
        });

        // return false;
    });
// });


function logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    window.location.href = "/login.html"; 
}

