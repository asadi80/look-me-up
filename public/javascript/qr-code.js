var id=window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
     ];
 var qrcode = new QRCode("qrcode", {
       text: `https://look-meup.herokuapp.com/user/${id}`,
   width: 300,
   height: 300,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H,
     });

 