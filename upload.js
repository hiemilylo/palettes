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
                      // console.log(imgWidth + " " + maxWidth );
                      // console.log(imgHeight + " " + maxHeight );
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

                   c.style.display = 'inline';
                   document.getElementById("cButton").style.display = 'block';

                   ctx2.drawImage(img, 0, 0, imgWidth, imgHeight);
           };
           reader.readAsDataURL(input.files[0]);

       }
   }

function createImage() {
    console.log("clicked");
    var c = document.getElementById("newCanvas");
    var ctx = c.getContext("2d");
    var spacing = 4;
    var rows = 6;
    var widthBar = 100;
    var heightBar = parseInt(c.height/30);
    var topX = parseInt(c.width/2) - 50;
    var topY = parseInt(c.height/(rows + spacing));
    for ( var x = 2; x < rows + (spacing-1); x++ ){
      ctx.fillRect( topX, topY*x, widthBar, heightBar );
    }
    // Pixel[][] pixels = this.getPixels2D();
    // int dividor = rows + 1;
    // int thickness = pixels.length/30;
    // for ( int numBar = 0; numBar < rows; numBar++ )
    // {
    //   Pixel currPixel = pixels[pixels.length * (numBar+1)/dividor][pixels[0].length/2];
    //   int red = currPixel.getRed();
    //   int blue = currPixel.getBlue();
    //   int green = currPixel.getGreen();
    //   for ( int row = pixels.length * (numBar+1) /dividor - thickness; row <
    //   pixels.length * (numBar+1) /dividor + thickness; row++ )
    //   {
    //     for ( int col = pixels[0].length/2 - 50 ; col < pixels[0].length/2 + 50; col++ )
    //     {
    //       pixels[row][col].setRed( red );
    //       pixels[row][col].setBlue( blue );
    //       pixels[row][col].setGreen( green );
    //     }
    //   }
    // }
}
