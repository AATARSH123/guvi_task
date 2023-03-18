<?php
    $servername = "localhost:3306";
    $username = "root";
    $password = "anishadmin";
    $dbname = "guvi_task";

    require  '../assets/vendor/autoload.php';

    use Predis\Client;
    
    $redis = new Client([
        'scheme' => 'tcp',
        'host'   => 'redis-17774.c262.us-east-1-3.ec2.cloud.redislabs.com',
        'port'   => 17774,
        'password' => 'qGIcPzClx7bwx4ebmKLxstQoDSzS738X',
    ]);

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    $manager = new MongoDB\Driver\Manager("mongodb+srv://anishmahi946:anishadmin@cluster0.rempjqu.mongodb.net/?retryWrites=true&w=majority");

    // Select the database and collection
    $database = "guvi_db";
    $collection = "profiles";

    
    // Check connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $name = $_POST['name'];
    $pass = $_POST['password'];
    $cpass = $_POST['cpassword'];
    $email = $_POST['email'];

    $document = [
        'username' => $name,
        'email' => $email
    ];

    $sql="SELECT * FROM users WHERE username = '".$name."'";
    $result = mysqli_query($conn,$sql);
    $datadict = mysqli_fetch_array($result);

    if (mysqli_num_rows($result)==1){
        echo -1;
    }
    else {

        if($cpass != $pass) {
            echo -2;
        } else {
            $sql2 = "INSERT INTO users (username, pass, email) VALUES ('$name','$pass','$email');";
            $bulk = new MongoDB\Driver\BulkWrite();
            $bulk->insert($document);

            // Execute the BulkWrite operation to insert the document
            $result = $manager->executeBulkWrite("$database.$collection", $bulk);

            if ($conn->query($sql2) === TRUE) {
                $redis->set('username', $name);
                $redis->expire("username", 10*60);
                echo 1;
            } else {
                echo 0;
            }
        }

    }

    
    
    $conn->close();
?>