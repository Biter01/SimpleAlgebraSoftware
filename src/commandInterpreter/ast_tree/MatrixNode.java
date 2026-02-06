package commandInterpreter.ast_tree;

import structures.Matrix;

import java.util.List;

public class MatrixNode implements AstNode {
    public List<List<Double>> values;
    public MatrixNode(List<List<Double>> v) {
        values = v;
    }

    @Override
    public Matrix execute() {
        double[][] array = values.stream()
                .map(row -> row.stream().mapToDouble(Double::doubleValue).toArray())
                .toArray(double[][]::new);

        Matrix matrix = new Matrix(array);

        return matrix;
    }
}
