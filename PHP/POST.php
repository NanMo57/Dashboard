<?php
    header('Access-Control-Allow-Headers:Content-Type, Authorization');
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:*');
    header('Content-Type:application/json;charset=UTF-8');

    $data = json_decode(file_get_contents('php://input'),true);
    
    
    print_r( $data['Products_images']);

    /*
                "Products_Title",
                "Products_Price",
                "Products_Category",
                "Products_images",
                "Products_Sizes",
                "Products_Colors",
                "Order"
    */
?>
