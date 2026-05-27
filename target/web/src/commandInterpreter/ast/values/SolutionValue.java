// commandInterpreter/ast/values/SolutionValue.java
package commandInterpreter.ast.values;

import mathlib.LinearExpression;

import java.util.Arrays;

public record SolutionValue(LinearExpression[] expressions) implements Value {
    @Override
    public String toString() {
       return Arrays.toString(this.expressions);
    }
}