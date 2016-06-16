function readURL(input) {
       if (input.files && input.files[0]) {
           var reader = new FileReader();
           var c = document.getElementById("myCanvas");
           var ctx = c.getContext("2d");
           reader.onload = function (e) {
                   var img = document.createElement("IMG");
                   img.src = e.target.result;
                   var imgWidth = img.width;
                   var imgHeight = img.height;
                   while ( imgWidth > screen.width - 100 || imgHeight > screen.height - 100 ){
                      imgWidth = parseInt(imgWidth*9/10);
                      imgHeight = parseInt(imgHeight*9/10);
                      console.log(imgWidth + " " + screen.width );
                      console.log(imgHeight + " " + screen.height );
                   }
                   img.width = ""  + imgWidth;
                   img.height = "" + imgHeight;
                   c.width = ""  + imgWidth;
                   c.height = "" + imgHeight;
                   ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
           };
           reader.readAsDataURL(input.files[0]);
       }
   }
