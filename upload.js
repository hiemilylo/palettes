function readURL(input) {
       if (input.files && input.files[0]) {
           var maxWidth = screen.width;
           var maxHeight = screen.height;
           var reader = new FileReader();
           var c = document.getElementById("origCanvas");
           var ctx = c.getContext("2d");
           reader.onload = function (e) {
                   var img = document.createElement("IMG");
                   img.src = e.target.result;
                   var imgWidth = img.width;
                   var imgHeight = img.height;
                   while ( imgWidth > screen.width - 100 || imgHeight > screen.height - 100 ){
                      imgWidth = parseInt(imgWidth*9/10);
                      imgHeight = parseInt(imgHeight*9/10);
                      console.log(imgWidth + " " + maxWidth );
                      console.log(imgHeight + " " + maxHeight );
                   }
                   img.width = ""  + imgWidth;
                   img.height = "" + imgHeight;
                   c.width = ""  + imgWidth;
                   c.height = "" + imgHeight;
                   ctx.drawImage(img, 0, 0, imgWidth, imgHeight);

                   var c2 = document.getElementById("newCanvas");
                   c2.width = ""  + imgWidth;
                   c2.height = "" + imgHeight;
                   var ctx2 = c2.getContext("2d");

                   if ( imgHeight > imgWidth ){
                      c2.style.display = 'inline';
                   }
                   else{
                      c2.style.display = 'block';
                   }

                   ctx2.drawImage(img, 0, 0, imgWidth, imgHeight);
           };
           reader.readAsDataURL(input.files[0]);
       }
   }
