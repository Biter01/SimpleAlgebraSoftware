package structures;
import structures.exceptions.NoSolutionException;
import java.util.*;

public class Matrix {

    public static double[][] multiplyMatrix(double[][] a, double[][] b) {
        if(a[0].length != b.length) {
            throw new IllegalArgumentException("structures.Matrix does not have the same number of columns and rows");
        }

        double[][] c = new double[a.length][b[0].length];

        for(int i = 0; i < a.length; i++) {
            for(int k = 0; k < b[0].length; k++) {
                c[i][k] = 0.0;
                for(int j = 0; j < a[0].length; j++) {
                    c[i][k] += a[i][j] * b[j][k];
                }
            }
        }
        return c;
    }

    public static LinearExpression[] linearSolve(double[][] a) throws NoSolutionException {
        double[][] reducedMatrix = gaussElimination(a);

        if(!isMatrixSolveable(reducedMatrix)) {
            throw new NoSolutionException("LinSystem as coefficient Matrix is not solvable");
        }

        int n = reducedMatrix.length;
        int m = reducedMatrix[0].length;

        return solveForVariables(reducedMatrix,n, m);

    }

    private static LinearExpression[] solveForVariables(double[][] reducedMatrix, int n, int m)  {
        int solutionColumn = m-1;
        int variablesAmount = m-1;

        LinearExpression[] solutionVec = new LinearExpression[variablesAmount];
        List<LinearExpression> rowValueVec = new ArrayList<>();

        int diagonalStepIdx = variablesAmount-1;

        //Start in the last row
        for(int rowIdx = n-1; rowIdx >= 0; rowIdx--) {
            //Right hand solutions
            addRHS(rowValueVec, rowIdx, solutionColumn, reducedMatrix);

            int colPivotIndex =  findPivotIndex(reducedMatrix, rowIdx);

            double stepColumn = reducedMatrix[rowIdx][diagonalStepIdx];

            int amountOfFreeVars = diagonalStepIdx - colPivotIndex;

            if(amountOfFreeVars > 0) {
                setFreeVars(rowValueVec,solutionVec ,colPivotIndex, diagonalStepIdx);
            }

            //At first there aren't any solutions ;)
            if(rowIdx < n-1 || amountOfFreeVars > 0) {
                substituteSolutions(reducedMatrix,solutionVec,rowValueVec,colPivotIndex, rowIdx);
            }

            double pivotValue = reducedMatrix[rowIdx][colPivotIndex];

            calculateSolution(rowValueVec, solutionVec, pivotValue, colPivotIndex);

            if(diagonalStepIdx  > 0 ) {
                //this is always the last element with a solution -1
                diagonalStepIdx = colPivotIndex -1;
            }
        }

        return solutionVec;
    }

    private static boolean isMatrixSolveable(double[][] reducedMatrix) {
        int rows = reducedMatrix.length;
        int cols = reducedMatrix[0].length;
        int lastCol = cols - 1;

        for (int i = 0; i < rows; i++) {
            boolean allZero = true;
            for (int j = 0; j < lastCol; j++) {
                if (reducedMatrix[i][j] != 0) {
                    allZero = false;
                    break;
                }
            }

            // Widerspruch: alle Koeffizienten = 0, aber RHS != 0
            if (allZero && reducedMatrix[i][lastCol] != 0) {
                return false;
            }
        }
        return true;
    }

    private static void addRHS(List<LinearExpression> rowValueVec, int rowIdx, int solutionColumn, double[][] reducedMatrix)  {
        double rowSolutionField = reducedMatrix[rowIdx][solutionColumn];
        String rowSolutionFieldStr = rowSolutionField + "";
        rowValueVec.addFirst(new LinearExpression(rowSolutionFieldStr));
    }

    private static void calculateSolution(List<LinearExpression> rowValueVec, LinearExpression[] solutionVec, double pivotValue, int colPivotIndex)  {
        LinearExpression rowSolution = rowValueVec.removeLast();
        for(LinearExpression rowValue : rowValueVec) {
            rowSolution = rowSolution.subtract(rowValue);
        }

         solutionVec[colPivotIndex] =  rowSolution.multiplyConstant((1/pivotValue));

        solutionVec[colPivotIndex].round(4);

        rowValueVec.clear();
    }

    private static void substituteSolutions(double[][] reducedMatrix, LinearExpression[] solutionVec, List<LinearExpression> rowValueVec , int colPivotIdx, int currRowIdx)  {
        for(int colIdx = solutionVec.length-1; colIdx > colPivotIdx; colIdx--) {
            double currField = reducedMatrix[currRowIdx][colIdx];
            LinearExpression substitutedRowValue = solutionVec[colIdx].multiplyConstant(currField);
            rowValueVec.addFirst(substitutedRowValue);
        }
    }

    private static void setFreeVars(List<LinearExpression> rowVec, LinearExpression[] solutionVec , int colPivotIndex, int diagonalStepIdx)  {

        int freeVariableIdx = diagonalStepIdx;

        while(freeVariableIdx > colPivotIndex) {
            addFreeVar(freeVariableIdx, rowVec, solutionVec);
            freeVariableIdx--;
        }
    }

    private static void addFreeVar(int freeVariableIdx, List<LinearExpression> rowVec, LinearExpression[] solutionVec)  {
        char freeVariableSymbol = (char)(freeVariableIdx % 26 + 97);

        String linearExpressionString = "1 *" + freeVariableSymbol ;

        //rowVec.addFirst(new LinearExpression(linearExpressionString));
        //free variables have to go also in the solution vec
        solutionVec[freeVariableIdx] = new LinearExpression(linearExpressionString);
    }

    private static int findPivotIndex(double[][] elimnatedMatrix, int row) {
        int colPivotIndex = -1;
        for(int col = 0; col < elimnatedMatrix[0].length; col++) {
            if(elimnatedMatrix[row][col] != 0.0) {
                colPivotIndex = col;
                break;
            }
        }
        return colPivotIndex;
    }

    public static  double[][] gaussElimination(double[][] matrix) {
        if(matrix.length == 0 || matrix[0].length == 0) {
            throw new IllegalArgumentException("structures.Matrix has no rows and columns");
        }

        sortEquations(matrix);

        int n = matrix.length;
        int m = matrix[0].length;

        // Kopie der Matrix für das Ergebnis
        double[][] solutionMatrix = new double[n][m];
        for (int i = 0; i < n; i++) {
            solutionMatrix[i] = Arrays.copyOf(matrix[i], m);
        }

        for(int row1 = 0; row1 < n-1; row1++) {

            int colPivotIndex = -1;
            for(int col = 0; col < m; col++) {
                if(solutionMatrix[row1][col] != 0.0) {
                    colPivotIndex = col;
                    break;
                }
            }

            if(colPivotIndex == -1) {
                //return solutionMatrix;
                return getNonZeroSolution(solutionMatrix, n, m);
            }

            for(int row2 = row1 + 1; row2 < n; row2++) {

                double pivotRow1 = solutionMatrix[row1][colPivotIndex];
                double pivotRow2 =solutionMatrix[row2][colPivotIndex];

                if(solutionMatrix[row2][colPivotIndex] != 0.0) {
                    for (int currCol = colPivotIndex; currCol < m; currCol++) {
                        solutionMatrix[row2][currCol] = -solutionMatrix[row1][currCol]  + solutionMatrix[row2][currCol] * pivotRow1/pivotRow2;
                    }
                }
            }

        }

        return getNonZeroSolution(solutionMatrix, n, m);
    }

    private static double[][] getNonZeroSolution(double[][] solutionMatrix, int n, int m) {
        return Arrays.stream(solutionMatrix)
                .filter(row -> Arrays.stream(row).anyMatch(val -> val != 0))
                .map(row -> Arrays.copyOfRange(row, 0, m))
                .toArray(double[][]::new);
    }

    private static void sortEquations(double[][] matrix) {
        Arrays.sort(matrix, (r1, r2) -> {
            for (int i = 0; i < matrix[0].length; i++) {
                int cmp = Double.compare(Math.abs(r2[i]), Math.abs(r1[i])); // absteigend
                if (cmp != 0) return cmp;
            }
            return 0;
        });
    }

    public static double laplaceExpension(double[][] matrix) {
        if(matrix.length == 0 || matrix[0].length == 0) {
            throw new IllegalArgumentException("structures.Matrix has no rows and columns");
        }

        if(matrix[0].length != matrix.length) {
            throw new IllegalArgumentException("You need a quadratic matrix with the same number of rows and columns");
        }


        int[] columnPermutation = new int[matrix.length];
        boolean[] usedColumns = new boolean[matrix.length];
        List<Double> solutionList = new ArrayList<>();

        calcLaplaceExp(matrix, 0, solutionList, columnPermutation, usedColumns);


        return solutionList.stream()
                .mapToDouble(Double::doubleValue)
                .sum();
    }

    private static void calcLaplaceExp(final double[][] matrix,int currRow ,List<Double> solutionList, int[] columnPermutation, boolean[] usedColumns) {
        int n = matrix.length;

        if(currRow < n) {
            int num = 1;
            while(num <= matrix[0].length) {
                if(!usedColumns[num-1]) {
                    int freeNumIdx = num-1;

                    if(columnPermutation[currRow] != 0) {
                        //look if you have to give permutation free -> set to false
                        int usedColumnIdx = columnPermutation[currRow]-1;
                        usedColumns[usedColumnIdx] =  false;
                    }

                    columnPermutation[currRow] = num;
                    //Set previously free column true
                    usedColumns[freeNumIdx] = true;
                    calcLaplaceExp(matrix, currRow + 1, solutionList, columnPermutation, usedColumns);
                }
                num++;
            }

            usedColumns[columnPermutation[currRow]-1] = false;
            columnPermutation[currRow] = 0;

            return;
        }

        addPermutationTerm(matrix,columnPermutation, solutionList);
        return;
    }

    private static void addPermutationTerm(double[][] matrix ,int[] columnPermutation, List<Double> solutionList) {
        int permutations = countInversions(columnPermutation);

        int sign = 1;

        if(permutations%2 == 1) {
            sign = -1;
        }

        double solution = 1;

        for(int i = 0; i< columnPermutation.length; i++) {
            solution*= matrix[i][columnPermutation[i]-1];
        }

        solutionList.add((solution*sign));
    }

    private static int countInversions(int[] perm) {
        int count = 0;
        for (int i = 0; i < perm.length; i++) {
            for (int j = i + 1; j < perm.length; j++) {
                if (perm[i] > perm[j]) {
                    count++;
                }
            }
        }
        return count;
    }

    public static String stringOf(double[][] a) {
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        for(int i = 0; i < a.length; i++) {
            sb.append("{");
            for(int j = 0; j < a[0].length; j++) {

                if(j == a[0].length - 1) {
                    sb.append(a[i][j]);
                } else {
                    sb.append(a[i][j]).append(", ");
                }
            }
            if(i == a.length - 1) {
                sb.append("}");
            } else {
                sb.append("},");
            }
        }
        sb.append("}");
        return sb.toString();
    }
}
