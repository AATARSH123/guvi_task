<?php
    $servername = "localhost:3306";
    $username = "root";
    $password = "anishadmin";
    $dbname = "guvi_task";
    require  '../assets/vendor/autoload.php';

    use Predis\Client;
    //redis connection
    $redis = new Client([
        'scheme' => 'tcp',
        'host'   => 'redis-17774.c262.us-east-1-3.ec2.cloud.redislabs.com',
        'port'   => 17774,
        'password' => 'qGIcPzClx7bwx4ebmKLxstQoDSzS738X',
    ]);
    

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Check connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $name = $_POST['name'];
    $pass = $_POST['password'];
    //Checking user name exists or not
    $sql="SELECT * FROM users WHERE username = '".$name."'";
    $result = mysqli_query($conn,$sql);
    $datadict = mysqli_fetch_array($result);

    if (mysqli_num_rows($result)==0){
        echo -1;
    }else{
        if ($pass == $datadict['pass']){
            $redis->set('username', $name);
            $redis->expire("username", 10*60);
            // echo $redis->get('key');
            echo 1;
        }
        else{
            echo 0;
        }
    }

?>