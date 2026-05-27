package commandInterpreter.ast.values;
import mathlib.Matrix;

public record MatrixValue(Matrix matrix) implements Value {
    @Override
    public String toString() {
        return matrix.toString();
    }

}