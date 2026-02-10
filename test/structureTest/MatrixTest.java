package structureTest;

import math_lib.exceptions.MatrixArgumentException;
import org.junit.jupiter.api.Test;
import math_lib.LinearExpression;
import math_lib.Matrix;
import math_lib.exceptions.NoSolutionException;
import static org.junit.jupiter.api.Assertions.*;

public class MatrixTest {

    @Test
    public void testBiggerLinSystem() throws NoSolutionException {
        double[][] a = {
                {1, 1, 0, 0, 0, 0, 0, 1},   // x1 + x2 = 1
                {0, 1, 1, 0, 0, 0, 0, 2},   // x2 + x3 = 2
                {0, 0, 1, 1, 0, 0, 0, 3},   // x3 + x4 = 3
                {0, 0, 0, 1, 1, 1, 1, 4}    // x4 + x5 + x6 + x7 = 4
        };

        Matrix m = new Matrix(a);

        //[1.0*e + 1.0 *f + 1.0 *g - 2.0 , -1.0*e - 1.0 *f - 1.0 *g + 3.0 , 1.0*e + 1.0 *f + 1.0 *g - 1.0 , -1.0*e - 1.0 *f - 1.0 *g + 4.0 , 1.0*e, 1.0*f, 1.0*g]
        LinearExpression[] aSol = {
                new LinearExpression("1.0*e + 1.0*f + 1.0*g - 2.0"),
                new LinearExpression("-1.0*e - 1.0*f - 1.0*g + 3.0"),
                new LinearExpression("1.0*e + 1.0*f + 1.0*g - 1.0"),
                new LinearExpression("-1.0*e - 1.0 *f - 1.0 *g + 4.0"),
                new LinearExpression("1.0*e"),
                new LinearExpression("1.0*f"),
                new LinearExpression("1.0*g")
        };

        assertArrayEquals(aSol, m.linearSolve());
    }

    @Test
    public void testStandardLinSystem() throws NoSolutionException {
        double[][] b = {
                {3,11,10,9000},
                {6,2,2,5000},
                {150,220,120,194000},
        };

        Matrix m = new Matrix(b);

        LinearExpression[] bSol = {
                new LinearExpression( "600.0"),
                new LinearExpression( "200.0"),
                new LinearExpression( "500.0")
        };

        assertArrayEquals(bSol, m.linearSolve());
    }

    @Test
    public void testLinSysWithInfiniteSolutions1() throws NoSolutionException {
        double[][] c = {{0,2,1,-4,0}, {1,5,3,-3,0}, {0,0,1,6,0}};

        Matrix m = new Matrix(c);

        LinearExpression[] cSol = {
                new LinearExpression( "-4.0*d"),
                new LinearExpression( "5.0*d"),
                new LinearExpression( "-6.0*d"),
                new LinearExpression("1.0*d")
        };

        assertArrayEquals(cSol, m.linearSolve());
    }


    @Test
    public void testLinSysWithInfiniteSolutions2() throws NoSolutionException {
        double[][] e = {
                {1, -5, 8, 2, -2, -9},   // x1 + x2 = 1
                {1, -4, 6, -2, 0, -4},   // x2 + x3 = 2
                {-1, 0, 2, 2, 0, 0},   // x3 + x4 = 3
                {5, -8, 6, 0, -5, -18}    // x4 + x5 + x6 + x7 = 4
        };

        LinearExpression[] eSol = {
                new LinearExpression( "-2+2*c+1*e"),
                new LinearExpression( "1+2*c"),
                new LinearExpression( "1*c"),
                new LinearExpression("-1+0.5*e"),
                new LinearExpression("1*e")
        };

        Matrix m = new Matrix(e);
        assertArrayEquals(eSol, m.linearSolve());
    }

    @Test
    public void testNoSolutionSystem() throws NoSolutionException {

        double[][] d = {
                {1,1,1,1,0},
                {2,2,2,2,1},
                {4,2,2,2,1}
        };

        Matrix m = new Matrix(d);

        assertThrows(NoSolutionException.class, () -> m.linearSolve());
    }



    @Test
    public void testTrivialSystem() throws NoSolutionException {
        double[][] a = {{5, 10}}; // 5x1 = 10 → x1 = 2
        LinearExpression[] expected = { new LinearExpression("2.0") };

        Matrix m = new Matrix(a);

        assertArrayEquals(expected, m.linearSolve());
    }

    @Test
    public void testOverdeterminedConsistentLinSystem() throws NoSolutionException {
        double[][] a = {
                {1, 1, 2},  // x1 + x2 = 2
                {2, 2, 4},  // 2x1 + 2x2 = 4 (Redundant)
                {3, 3, 6}   // 3x1 + 3x2 = 6 (Redundant)
        };

        LinearExpression[] expected = {
                new LinearExpression("2.0 - 1.0*b"),
                new LinearExpression("1.0*b")
        };

        Matrix m = new Matrix(a);

        assertArrayEquals(expected, m.linearSolve());
    }

    @Test
    public void testOverdeterminedInconsistentLinSystem() {
        double[][] a = {
                {1, 0, 1},  // x1 = 1
                {1, 0, 2}   // x1 = 2 → Widerspruch
        };

        Matrix m = new Matrix(a);

        assertThrows(NoSolutionException.class, () -> m.linearSolve());
    }

    @Test
    public void testLinSystemWithZeroRow() throws NoSolutionException {
        double[][] a = {
                {1, 0, 1},  // x1 = 1
                {0, 0, 0}   // 0 = 0 → keine Information
        };
        LinearExpression[] expected = {
                new LinearExpression("1.0"),
                new LinearExpression("1.0*b") // b frei
        };

        Matrix m = new Matrix(a);

        assertArrayEquals(expected, m.linearSolve());
    }

    @Test
    public void testEmptyLinSystem() throws NoSolutionException {
        double[][] a = {}; // keine Gleichungen, keine Variablen
        LinearExpression[] expected = {};

        assertThrows(IllegalArgumentException.class, () ->new Matrix(a));
    }

    @Test
    public void testLargeNumbersLinSystem() throws NoSolutionException {
        // Test auf numerische Stabilität mit großen Zahlen
        double[][] a = {
                {1E9, 1, 1E9 + 1},
                {2E9, 2, 2E9 + 2},
        };
        // zweite Gleichung ist nur Vielfaches der ersten → unendliche Lösungen
        LinearExpression[] expected = {
                new LinearExpression("1.0"),
                new LinearExpression("1.0*b")
        };

        Matrix m = new Matrix(a);

        //System.out.println(Arrays.toString(expected) + " " + Arrays.toString(linearSolve(a)) + "  " + linearSolve(a)[0].hashCode() + "  " + expected[0].hashCode());
        assertArrayEquals(expected, m.linearSolve());
    }

    @Test
    public void testDeterminant() throws MatrixArgumentException {

        double [][] a = {
                {2,1,3},
                {0,4,1},
                {5,2,6}
        };

        double[][] b = {
                {3,11,10,90},
                {6,2,2,50},
                {150,220,120,194},
                {120, 40, 50, 60}
        };

        double[][] matrix8x8 = {
                { 3, -2,  1,  0, -4,  2,  5, -1},
                { 0,  1, -3,  2,  4, -2,  0,  3},
                { 5,  0,  2, -1,  3, -3,  1,  0},
                { 2,  4, -2,  1,  0,  5, -1, -3},
                {-3,  2,  0,  4, -1,  1,  3,  2},
                { 1, -4,  5,  0,  2, -2,  0,  1},
                { 0,  3, -1,  2,  1,  0, -3,  4},
                { 4,  0,  2, -2,  3,  1, -5,  0}
        };

        Matrix A = new Matrix(a);
        Matrix B = new Matrix(b);
        Matrix C = new Matrix(matrix8x8);

        assertEquals(-11, A.laplaceExpansion());
        assertEquals(-5977800, B.laplaceExpansion());
        assertEquals(-104348, C.laplaceExpansion());

    }

    @Test
    public void testMatrixMultiply() throws MatrixArgumentException {
        double[][] a = {{1,2,3},{4,5,6},{7,8,9}};
        double[][] b = {{1,2},{4,5},{7,8}};
        double[][] c = {{1,2}, {4,5}};

        double[][] expected = {{30, 36}, {66, 81}, {102, 126}};
        Matrix expectedMatrix = new Matrix(expected);


        Matrix A = new Matrix(a);
        Matrix B = new Matrix(b);
        Matrix C = new Matrix(c);

        assertEquals(expectedMatrix, A.multiplyMatrix(B));

        assertThrows(MatrixArgumentException.class, () -> A.multiplyMatrix(C));

    }

    @Test
    public void testMatrixAddition() throws MatrixArgumentException {
        double[][] a = {{1,2,3},{4,5,6},{7,8,9}};
        double[][] b = {{1,2,3},{4,5,6},{7,8,9}};

        double[][] expectedData = {{2,4,6}, {8,10,12}, {14,16,18}};

        Matrix expectedMatrix = new Matrix(expectedData);

        Matrix A = new Matrix(a);
        Matrix B = new Matrix(b);

        assertEquals(expectedMatrix, A.addMAtrix(B));

    }

    @Test
    public void testMatrixSubtraction() throws MatrixArgumentException{
        double[][] a = {{1,2,3},{4,5,6},{7,8,9}};
        double[][] b = {{1,2,3},{4,5,6},{7,8,9}};

        double[][] c = {{2,4,6}, {8,10,12}, {14,16,18}};

        Matrix C = new Matrix(c);

        Matrix A = new Matrix(a);
        Matrix B = new Matrix(b);

        assertEquals(A, C.subtractMatrix(B));
    }

}
