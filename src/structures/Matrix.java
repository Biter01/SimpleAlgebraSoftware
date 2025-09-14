package structures;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Matrix {

    public static double[][] multiplyMatrix(double[][] a, double[][] b) {
        if(a.length != b[0].length) {
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

    public static LinearExpression[] linearSolve(double[][] a) {
        double[][] reducedMatrix = gaussElimination(a);
        System.out.println(Matrix.stringOf(reducedMatrix));

        if(!isMatrixSolveable(reducedMatrix)) {
            throw new IllegalArgumentException("Matrix is not solvable");
        }

        int n = reducedMatrix.length;
        int m = reducedMatrix[0].length;

        return solveForVariables(reducedMatrix,n, m);

    }

    private static LinearExpression[] solveForVariables(double[][] reducedMatrix, int n, int m) {
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

    private static void addRHS(List<LinearExpression> rowValueVec, int rowIdx, int solutionColumn, double[][] reducedMatrix) {
        double rowSolutionField = reducedMatrix[rowIdx][solutionColumn];
        String rowSolutionFieldStr = rowSolutionField + "";
        rowValueVec.addFirst(new LinearExpression(rowSolutionFieldStr));
    }

    private static void calculateSolution(List<LinearExpression> rowValueVec, LinearExpression[] solutionVec, double pivotValue, int colPivotIndex) {
        LinearExpression rowSolution = rowValueVec.removeLast();
        for(LinearExpression rowValue : rowValueVec) {
            rowSolution = rowSolution.subtract(rowValue);
        }

         solutionVec[colPivotIndex] =  rowSolution.multiplyConstant((1/pivotValue));

        solutionVec[colPivotIndex].round(4);

        rowValueVec.clear();
    }

    private static void substituteSolutions(double[][] reducedMatrix, LinearExpression[] solutionVec, List<LinearExpression> rowValueVec , int colPivotIdx, int currRowIdx) {
        for(int colIdx = solutionVec.length-1; colIdx > colPivotIdx; colIdx--) {
            double currField = reducedMatrix[currRowIdx][colIdx];
            LinearExpression substitutedRowValue = solutionVec[colIdx].multiplyConstant(currField);
            rowValueVec.addFirst(substitutedRowValue);
        }
    }

    private static void setFreeVars(List<LinearExpression> rowVec, LinearExpression[] solutionVec , int colPivotIndex, int diagonalStepIdx) {

        int freeVariableIdx = diagonalStepIdx;

        while(freeVariableIdx > colPivotIndex) {
            addFreeVar(freeVariableIdx, rowVec, solutionVec);
            freeVariableIdx--;
        }
    }

    private static void addFreeVar(int freeVariableIdx, List<LinearExpression> rowVec, LinearExpression[] solutionVec) {
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
            throw new IllegalArgumentException("structures.Matrix does not have the same number of columns and rows");
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
                return solutionMatrix;
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
