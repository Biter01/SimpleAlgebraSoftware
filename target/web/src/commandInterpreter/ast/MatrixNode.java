package commandInterpreter.ast;

import commandInterpreter.Context;
import commandInterpreter.ast.values.MatrixValue;
import commandInterpreter.ast.values.Value;
import mathlib.Matrix;

import java.util.List;

public class MatrixNode implements AstNode {
    public List<List<Double>> values;
    public MatrixNode(List<List<Double>> v) {
        values = v;
    }

    @Override
    public Value execute(Context ctx) {
        double[][] array = values.stream()
                .map(row -> row.stream().mapToDouble(Double::doubleValue).toArray())
                .toArray(double[][]::new);

        return new MatrixValue(new Matrix(array));
    }
}
