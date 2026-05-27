package commandInterpreter.ast.values;

public record NumberValue(double value) implements Value {
        @Override
        public String toString() {
            return Double.toString(value);
        }
}
