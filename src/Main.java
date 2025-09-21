import structures.LinearExpression;
import structures.RVector;
import java.util.Arrays;
import structures.exceptions.NoSolutionException;
import static structures.Matrix.*;
//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) throws NoSolutionException {
        RVector v1 = new RVector(1,2,3);
        RVector v2 = new RVector(4,5,6);

        RVector sum = RVector.add(v1,v2);

        double scalarProd = RVector.scalarProduct(v1,v2);

        System.out.println(scalarProd);
        //Output -> 32.0

        LinearExpression expression = new LinearExpression("-2*x + 5*y");

        LinearExpression addedLinExp = expression.add(new LinearExpression("-5*x"));

        System.out.println(addedLinExp);
        //Output -> -7.0*x + 5.0*y

        double[][] a = {{1,2,3},{4,5,6},{7,8,9}};
        double[][] b = {{1,2},{4,5},{7,8}};

        System.out.println(Arrays.deepToString(multiplyMatrix(a, b)));
        // Output -> [[30.0, 36.0], [66.0, 81.0], [102.0, 126.0]]

        double[][] linSys = {
                {1, 1, 0, 0, 0, 0, 0, 1},   // x1 + x2 = 1
                {0, 1, 1, 0, 0, 0, 0, 2},   // x2 + x3 = 2
                {0, 0, 1, 1, 0, 0, 0, 3},   // x3 + x4 = 3
                {0, 0, 0, 1, 1, 1, 1, 4}    // x4 + x5 + x6 + x7 = 4
        };

        System.out.println(Arrays.deepToString(linearSolve(linSys)));
        //Output -> [1.0*e + 1.0*f + 1.0*g - 2.0, -1.0*e - 1.0*f - 1.0*g + 3.0, 1.0*e + 1.0*f + 1.0*g - 1.0, -1.0*e - 1.0*f - 1.0*g + 4.0, 1.0*e, 1.0*f, 1.0*g]

        double [][] c = {
                {2,1,3},
                {0,4,1},
                {5,2,6}
        };

        System.out.println(laplaceExpension(c));
        //Output -> -11.0

    }
}