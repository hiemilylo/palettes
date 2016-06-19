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
                   while ( imgWidth > screen.width - 100 || imgHeight > screen.height - 200 ){
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
                      $("#newCanvas").css("display", "inline");
                   }
                   else{
                     $("#newCanvas").css("display", "block");
                   }

                   $("#origCanvas").css("display", "inline");
                   $("#selections").css("display", "inline");

                   ctx2.drawImage(img, 0, 0, imgWidth, imgHeight);
           };
           reader.readAsDataURL(input.files[0]);
       }
   }

function resetCanvas(){
    var c = document.getElementById("origCanvas");
    var ctx = c.getContext("2d");
    var c2 = document.getElementById("newCanvas");
    var ctx2 = c2.getContext("2d");
    ctx2.putImageData(ctx.getImageData(0,0,c.width,c.height), 0, 0);
}

function createImage(numBars) {
    resetCanvas();
    var c = document.getElementById("newCanvas");
    var ctx = c.getContext("2d");
    var spacing = 4;
    var rows = numBars;
    var widthBar = 75;
    var heightBar = parseInt(c.height/30);
    var topX = parseInt(c.width/2) - parseInt(widthBar/2);
    var topY = parseInt(c.height/(rows + spacing));
    var colors = [];
    //color selection
    for ( var x = 2; x < rows + 2; x++ ){
      var imgData = ctx.getImageData(topX, topY*x + parseInt(widthBar/2), 1, 1);
      var red = imgData.data[0];
      var green = imgData.data[1];
      var blue = imgData.data[2];
      var hex = rgbToHex( red, green, blue );
      colors[x - 2] = hex;
    }
    colors.sort();

    var decrement = 0;
    //alignment
    for ( var k = 1; k < 4; k++ ){
        if (document.getElementById("align" + k).checked){
            if (k == 2 ){ //Left
              topX = 1;
              decrement = parseInt(c.height/(rows + spacing));
            }
            if (k == 3){ //Right
              topX = c.width - widthBar;
              decrement = parseInt(c.height/(rows + spacing));
            }
        }
    }

    for ( var j = 2; j < rows + 2; j++ ){
      ctx.fillStyle = "#" + colors[j-2];
      ctx.fillRect( topX, topY*j - decrement, widthBar, heightBar );
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

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}
