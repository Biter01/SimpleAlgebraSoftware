package structures;
import structures.exceptions.NoSolutionException;
import java.util.*;

public class Matrix {

    private final double[][] data;
    private final int rows;
    private final int cols;

    public Matrix(double[][] matrixData) {
        if (matrixData.length == 0 || matrixData[0].length == 0) {
            throw new IllegalArgumentException("Matrix must not be empty");
        }

        this.rows = matrixData.length;
        this.cols = matrixData[0].length;

        this.data = new double[rows][cols];
        for (int i = 0; i < rows; i++) {
            this.data[i] = Arrays.copyOf(matrixData[i], cols);
        }
    }

    public Matrix multiplyMatrix(Matrix b) {
        double[][] aMatrixData = copyData();
        Matrix a = new Matrix(aMatrixData);

        if(a.cols != b.rows) {
            throw new IllegalArgumentException("structures.Matrix does not have the same number of columns and rows");
        }

        double[][] c = new double[a.rows][b.cols];

        for(int i = 0; i < a.rows; i++) {
            for(int k = 0; k < b.cols; k++) {
                c[i][k] = 0.0;
                for(int j = 0; j < a.cols; j++) {
                    c[i][k] += a.data[i][j] * b.data[j][k];
                }
            }
        }
        return new Matrix(c);
    }


    public Matrix addMAtrix(Matrix b) {
        double[][] aMatrixData = copyData();
        Matrix a = new Matrix(aMatrixData);

        if(a.cols != b.cols || a.rows != b.rows) {
            throw new IllegalArgumentException("structures.Matrix does not have the same number of columns and rows");
        }

        double[][] c = new double[a.rows][a.cols];

        for(int i = 0; i < a.rows; i++) {
            for(int k = 0; k < a.cols; k++) {
                c[i][k] = a.data[i][k] + b.data[i][k];
            }
        }

        return new Matrix(c);

    }


    public LinearExpression[] linearSolve() throws NoSolutionException {
        Matrix reducedMatrix = gaussElimination();

        if(!isMatrixSolveable(reducedMatrix)) {
            throw new NoSolutionException("LinSystem as coefficient Matrix is not solvable");
        }

        return solveForVariables(reducedMatrix.data, reducedMatrix.rows, reducedMatrix.cols);

    }

    private LinearExpression[] solveForVariables(double[][] reducedMatrix, int n, int m)  {
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

    private boolean isMatrixSolveable(Matrix reducedMatrix) {

        int lastCol = reducedMatrix.cols - 1;

        for (int i = 0; i < reducedMatrix.rows; i++) {
            boolean allZero = true;
            for (int j = 0; j < lastCol; j++) {
                if (reducedMatrix.data[i][j] != 0) {
                    allZero = false;
                    break;
                }
            }

            // Widerspruch: alle Koeffizienten = 0, aber RHS != 0
            if (allZero && reducedMatrix.data[i][lastCol] != 0) {
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

    public Matrix gaussElimination() {
        // Copy of Matrix Data for the solution
        double[][] solutionMatrixData = copyData();

        if(solutionMatrixData.length == 0 || solutionMatrixData[0].length == 0) {
            throw new IllegalArgumentException("structures.Matrix has no rows and columns");
        }

        sortEquations(solutionMatrixData);

        int n = solutionMatrixData.length;
        int m = solutionMatrixData[0].length;

        for(int row1 = 0; row1 < n-1; row1++) {

            int colPivotIndex = -1;
            for(int col = 0; col < m; col++) {
                if(solutionMatrixData[row1][col] != 0.0) {
                    colPivotIndex = col;
                    break;
                }
            }

            if(colPivotIndex == -1) {
                //return solutionMatrix;
                double[][] nonZeroSolution = getNonZeroSolution(solutionMatrixData, n, m);
                return new Matrix(nonZeroSolution);
            }

            for(int row2 = row1 + 1; row2 < n; row2++) {

                double pivotRow1 = solutionMatrixData[row1][colPivotIndex];
                double pivotRow2 = solutionMatrixData[row2][colPivotIndex];

                if(solutionMatrixData[row2][colPivotIndex] != 0.0) {
                    for (int currCol = colPivotIndex; currCol < m; currCol++) {
                        solutionMatrixData[row2][currCol] = -solutionMatrixData[row1][currCol]  + solutionMatrixData[row2][currCol] * pivotRow1/pivotRow2;
                    }
                }
            }

        }
        double[][] nonZeroSolution = getNonZeroSolution(solutionMatrixData, n, m);
        return new Matrix(nonZeroSolution);
    }

    private static double[][] getNonZeroSolution(double[][] solutionMatrixData, int n, int m) {
        return Arrays.stream(solutionMatrixData)
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

    public double laplaceExpansion() {
        double[][] matrixData = copyData();

        if(matrixData.length == 0 || matrixData[0].length == 0) {
            throw new IllegalArgumentException("structures.Matrix has no rows and columns");
        }

        if(matrixData[0].length != matrixData.length) {
            throw new IllegalArgumentException("You need a quadratic matrix with the same number of rows and columns");
        }

        int[] columnPermutation = new int[matrixData.length];
        boolean[] usedColumns = new boolean[matrixData.length];
        List<Double> solutionList = new ArrayList<>();

        calcLaplaceExp(matrixData, 0, solutionList, columnPermutation, usedColumns);

        return solutionList.stream()
                .mapToDouble(Double::doubleValue)
                .sum();
    }

    private static void calcLaplaceExp(final double[][] matrixData,int currRow ,List<Double> solutionList, int[] columnPermutation, boolean[] usedColumns) {
        int n = matrixData.length;

        if(currRow < n) {
            int num = 1;
            while(num <= matrixData[0].length) {
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
                    calcLaplaceExp(matrixData, currRow + 1, solutionList, columnPermutation, usedColumns);
                }
                num++;
            }

            usedColumns[columnPermutation[currRow]-1] = false;
            columnPermutation[currRow] = 0;

            return;
        }

        addPermutationTerm(matrixData,columnPermutation, solutionList);
        return;
    }

    private static void addPermutationTerm(double[][] matrixData ,int[] columnPermutation, List<Double> solutionList) {
        int permutations = countInversions(columnPermutation);

        int sign = 1;

        if(permutations%2 == 1) {
            sign = -1;
        }

        double solution = 1;

        for(int i = 0; i< columnPermutation.length; i++) {
            solution*= matrixData[i][columnPermutation[i]-1];
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

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for(int i = 0; i < data.length; i++) {
            sb.append("[");
            for(int j = 0; j < data[0].length; j++) {

                if(j == data[0].length - 1) {
                    sb.append(data[i][j]);
                } else {
                    sb.append(data[i][j]).append(", ");
                }
            }
            if(i == data.length - 1) {
                sb.append("]");
            } else {
                sb.append("],");
            }
        }
        sb.append("]");
        return sb.toString();
    }

    private double[][] copyData() {

        double[][] copiedData = new double[rows][cols];

        for (int i = 0; i < rows; i++) {
            copiedData[i] = Arrays.copyOf(data[i], cols);
        }

        return copiedData;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Matrix other)) return false;

        if (this.rows != other.rows || this.cols != other.cols) {
            return false;
        }

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                //tolerance
                if (Math.abs(this.data[i][j] - other.data[i][j]) > 1e-9) {
                    return false;
                }
            }
        }

        return true;
    }
}
