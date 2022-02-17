var userId = document.getElementById('user-id').innerHTML;
 console.log(userId);

var qrcode = new QRCode("qrcode", {
    text: `https://look-meup.herokuapp.com/user/${userId}`,
    width: 300,
    height: 300,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H,

});