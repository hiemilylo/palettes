import java.awt.*;
import java.awt.font.*;
import java.awt.geom.*;
import java.awt.image.BufferedImage;
import java.text.*;
import java.util.*;
import java.util.List; // resolves problem with java.awt.List and java.util.List


/**
 * A class that represents a picture. This class inherits from SimplePicture and
 * allows the student to add functionality to the Picture class.
 *
 * @author Emily Lo
 * @version 4/8/2015
 * @author Period: 4
 * @author Assignment: APCSPixLab - IntArrayWorker
 *
 * @author Sources:
 *
 * @author Barbara Ericson ericson@cc.gatech.edu
 */
public class Picture extends SimplePicture
{
    // /////////////////// constructors //////////////////////////////////

    /**
     * Constructor that takes no arguments
     */
    public Picture()
    {
        /*
         * not needed but use it to show students the implicit call to super()
         * child constructors always call a parent constructor
         */
        super();
    }


    /**
     * Constructor that takes a file name and creates the picture
     *
     * @param fileName
     *            the name of the file to create the picture from
     */
    public Picture( String fileName )
    {
        // let the parent class handle this fileName
        super( fileName );
    }


    /**
     * Constructor that takes the width and height
     *
     * @param height
     *            the height of the desired picture
     * @param width
     *            the width of the desired picture
     */
    public Picture( int height, int width )
    {
        // let the parent class handle this width and height
        super( width, height );
    }


    /**
     * Constructor that takes a picture and creates a copy of that picture
     *
     * @param copyPicture
     *            the picture to copy
     */
    public Picture( Picture copyPicture )
    {
        // let the parent class do the copy
        super( copyPicture );
    }


    /**
     * Constructor that takes a buffered image
     *
     * @param image
     *            the buffered image to use
     */
    public Picture( BufferedImage image )
    {
        super( image );
    }


    // //////////////////// methods ///////////////////////////////////////

    /**
     * Method to return a string with information about this picture.
     *
     * @return a string with information about the picture such as fileName,
     *         height and width.
     */
    public String toString()
    {
        String output = "Picture, filename " + getFileName() + " height "
            + getHeight() + " width " + getWidth();
        return output;

    }


    /**
     * Method to set the blue to 0
     */
    public void zeroBlue()
    {
        Pixel[][] pixels = this.getPixels2D();
        for ( Pixel[] rowArray : pixels )
        {
            for ( Pixel pixelObj : rowArray )
            {
                pixelObj.setBlue( 0 );
            }
        }
    }


    /**
     * Method that keeps only the blue color - sets the red and green to zero
     */
    public void keepOnlyBlue()
    {
        Pixel[][] pixels = this.getPixels2D();
        for ( Pixel[] rowArray : pixels )
        {
            for ( Pixel pixelObj : rowArray )
            {
                pixelObj.setGreen( 0 );
                pixelObj.setRed( 0 );
            }
        }
    }


    /**
     * Method that keeps only the red color
     */
    public void keepOnlyRed()
    {
        Pixel[][] pixels = this.getPixels2D();
        for ( Pixel[] rowArray : pixels )
        {
            for ( Pixel pixelObj : rowArray )
            {
                pixelObj.setGreen( 0 );
                pixelObj.setBlue( 0 );
            }
        }
    }


    /**
     * Method that keeps only the green color
     */
    public void keepOnlyGreen()
    {
        Pixel[][] pixels = this.getPixels2D();
        for ( Pixel[] rowArray : pixels )
        {
            for ( Pixel pixelObj : rowArray )
            {
                pixelObj.setRed( 0 );
                pixelObj.setBlue( 0 );
            }
        }
    }


    /**
     * Method that negates the colors in the picture
     */
    public void negate()
    {
        Pixel[][] pixels = this.getPixels2D();
        for ( Pixel[] rowArray : pixels )
        {
            for ( Pixel pixelObj : rowArray )
            {
                pixelObj.setRed( 255 - pixelObj.getRed() );
                pixelObj.setGreen( 255 - pixelObj.getGreen() );
                pixelObj.setBlue( 255 - pixelObj.getBlue() );
            }
        }
    }


    /**
     * Method that makes the picture all shades of gray
     */
    public void grayscale()
    {
        int average;
        Pixel[][] pixels = this.getPixels2D();
        for ( Pixel[] rowArray : pixels )
        {
            for ( Pixel pixelObj : rowArray )
            {
                average = ( pixelObj.getBlue() + pixelObj.getRed() + pixelObj.getGreen() ) / 3;
                pixelObj.setRed( average );
                pixelObj.setGreen( average );
                pixelObj.setBlue( average );
            }
        }
    }

    /**
     * copy from the passed fromPic to the specified startRow and startCol in
     * the current picture
     *
     * @param fromPic
     *            the picture to copy from
     * @param startRow
     *            the start row to copy to
     * @param startCol
     *            the start col to copy to
     */
    public void copy( Picture fromPic, int startRow, int startCol )
    {
        Pixel fromPixel = null;
        Pixel toPixel = null;
        Pixel[][] toPixels = this.getPixels2D();
        Pixel[][] fromPixels = fromPic.getPixels2D();
        for ( int fromRow = 0, toRow = startRow; fromRow < fromPixels.length
            && toRow < toPixels.length; fromRow++, toRow++ )
        {
            for ( int fromCol = 0, toCol = startCol; fromCol < fromPixels[0].length
                && toCol < toPixels[0].length; fromCol++, toCol++ )
            {
                fromPixel = fromPixels[fromRow][fromCol];
                toPixel = toPixels[toRow][toCol];
                toPixel.setColor( fromPixel.getColor() );
            }
        }
    }

    public void addBar( int x , int y )
    {
        Pixel[][] pixels = this.getPixels2D();
        Pixel currPixel = pixels[x][y];
        int red = currPixel.getRed();
        int blue = currPixel.getBlue();
        int green = currPixel.getGreen();
        for ( int row = 100; row < 150; row++ )
        {
            for ( int col = pixels[0].length/3; col < pixels[0].length*2/3; col++ )
            {
                pixels[row][col].setRed( red );
                pixels[row][col].setBlue( blue );
                pixels[row][col].setGreen( green );
            }
        }

    }

    public void addBar( int rows )
    {
        Pixel[][] pixels = this.getPixels2D();
        int dividor = rows + 1;
        int thickness = pixels.length/30;
        for ( int numBar = 0; numBar < rows; numBar++ )
        {
          Pixel currPixel = pixels[pixels.length * (numBar+1)/dividor][pixels[0].length/2];
          int red = currPixel.getRed();
          int blue = currPixel.getBlue();
          int green = currPixel.getGreen();
          for ( int row = pixels.length * (numBar+1) /dividor - thickness; row <
          pixels.length * (numBar+1) /dividor + thickness; row++ )
          {
            for ( int col = pixels[0].length/2 - 50 ; col < pixels[0].length/2 + 50; col++ )
            {
              pixels[row][col].setRed( red );
              pixels[row][col].setBlue( blue );
              pixels[row][col].setGreen( green );
            }
          }
        }
    }


    /**
     * Method to return the average value for the specified column
     *
     * @param col
     *            the column index to get the average from
     * @return the average of the values in that column
     */
    public int[] getAverageForColumn( int col )
    {
        Pixel[][] pixels = this.getPixels2D();
        Pixel currPixel = null;
        int[] averageArray = new int[pixels[col].length];
        int total = 0;

        for ( int row = 0; row < pixels.length; row++ )
        {
            currPixel = pixels[row][col];
            total = currPixel.getRed() + currPixel.getGreen()
                + currPixel.getBlue();
            averageArray[row] = total / 3;
        }
        return averageArray;
    }


    /*
     * Main method for testing - each class in Java can have a main method
     */
    public static void main( String[] args )
    {
        Picture beach = new Picture( "beach.jpg" );
        beach.explore();
        beach.addBar( 6 );
        beach.explore();
    }

}
