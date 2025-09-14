import structures.RVector;

import java.util.Arrays;

import static structures.Matrix.*;
//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        RVector v1 = new RVector(1,2,3);
        RVector v2 = new RVector(4,5,6);

        RVector sum = RVector.add(v1,v2);

        double scalarProd = RVector.scalarProduct(v1,v2);

        System.out.println(sum + "\n " + scalarProd);

        double[][] u = {{3,11,10,9000},{6,2,2,5000},{150,220,120,194000}};

        double[][] v = {{0,2,1,-4,0}, {1,5,3,-3,0}, {0,0,1,6,0}};

        double[][] A1 = {
                {2, 1, -1,  8},
                {-3, -1, 2, -11},
                {-2, 1,  2, -3}
        };

        double[][] A2 = {
                {1, 1, 1},
                {2, 2, 3}
        };

        double[][] A3 = {
                {1, 2, 3, 4},
                {2, 5, 7, 10}
        };


        double[][] A4 = {
                {1,1,1,1,0},
                {2,2,2,2,0}
        };

        double[][] A_A = {
                {1, 0, 1, 0, 0, 0, 1},   // x1 + x3 = 1
                {0, 1, 1, 0, 0, 0, 2},   // x2 + x3 = 2
                {0, 0, 0, 1, 1, 1, 3}    // x4 + x5 + x6 = 3
        };

        double[][] A_B = {
                {1, 1, 0, 0, 0, 0, 0, 1},   // x1 + x2 = 1
                {0, 1, 1, 0, 0, 0, 0, 2},   // x2 + x3 = 2
                {0, 0, 1, 1, 0, 0, 0, 3},   // x3 + x4 = 3
                {0, 0, 0, 1, 1, 1, 1, 4}    // x4 + x5 + x6 + x7 = 4
        };


        System.out.println(Arrays.toString(linearSolve(u)));
        // Output -> [600.0, 200.0, 500.0]

        System.out.println(Arrays.toString(linearSolve(v)));
        //Output -> [-4.0*d, 5.0*d, -6.0*d, 1.0*d]

        System.out.println(Arrays.toString(linearSolve(A_B)));
        //Output -> [1.0*e + 1.0 *f + 1.0 *g - 2.0 , -1.0*e - 1.0 *f - 1.0 *g + 3.0 , 1.0*e + 1.0 *f + 1.0 *g - 1.0 , -1.0*e - 1.0 *f - 1.0 *g + 4.0 , 1.0*e, 1.0*f, 1.0*g]
    }
}