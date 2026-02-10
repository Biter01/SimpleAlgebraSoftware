package commandInterpreter.ast_tree;

import commandInterpreter.Context;
import math_lib.Matrix;

import java.util.List;

public class MatrixNode implements AstNode {
    public List<List<Double>> values;
    public MatrixNode(List<List<Double>> v) {
        values = v;
    }

    @Override
    public Matrix execute(Context ctx) {
        double[][] array = values.stream()
                .map(row -> row.stream().mapToDouble(Double::doubleValue).toArray())
                .toArray(double[][]::new);

        return new Matrix(array);
    }
}
