/*package commandInterpreter;

import commandInterpreter.expressions.Expr;
import commandInterpreter.expressions.MatrixExpr;
import commandInterpreter.expressions.SolveExpr;
import structures.Matrix;
import structures.exceptions.NoSolutionException;

class Executor {

    Object execute(Expr expr)  {

        if (expr instanceof SolveExpr s) {
            Object v = execute(s.argument);

            if (!(v instanceof double[][]))
                throw new RuntimeException("solve erwartet eine Matrix");

            try {
                return Matrix.linearSolve((double[][]) v);
            } catch (NoSolutionException e) {
                throw new RuntimeException("No solution found");
            }
        }

        if (expr instanceof MatrixExpr m) {
            return m.values.toArray();
        }

        throw new RuntimeException("Unbekannter AST-Knoten");
    }
}
*/