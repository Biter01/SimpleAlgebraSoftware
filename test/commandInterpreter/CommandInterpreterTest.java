package commandInterpreter;

import commandInterpreter.ast.values.MatrixValue;
import commandInterpreter.ast.values.NumberValue;
import commandInterpreter.ast.values.SolutionValue;
import commandInterpreter.ast.values.Value;
import commandInterpreter.exceptions.unchecked.CommandException;
import commandInterpreter.exceptions.unchecked.CommandExecutorException;
import mathlib.Matrix;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class CommandInterpreterTest {

    private static final double DELTA = 1e-9;

    @Test
    void testBasicVariable() {
        Interpreter interpreter = new Interpreter();
        interpreter.eval("Aas=[[1,2],[3,4]]");
        Value output = interpreter.eval("Aas + [[1,2],[3,4]]");
        assertEquals(
                new MatrixValue(new Matrix(new double[][] {{2.0, 4.0}, {6.0, 8.0}})),
                output
        );
    }

    @Test
    void testAddition() {
        Interpreter interpreter = new Interpreter();
        assertEquals(new NumberValue(6.0), interpreter.eval("Aas=1+5"));
    }

    @Test
    void testMultiplication() {
        Interpreter interpreter = new Interpreter();
        assertEquals(new NumberValue(40.0), interpreter.eval("8*5"));

        interpreter.eval("Aas=[[1,2],[3,4]]");
        interpreter.eval(" Bas = [[5,6],[5,6]]");

        assertEquals(
                new MatrixValue(new Matrix(new double[][] {{15.0, 18.0}, {35.0, 42.0}})),
                interpreter.eval("Aas*Bas")
        );
    }

    @Test
    void testMinus() {
        Interpreter interpreter = new Interpreter();
        assertEquals(new NumberValue(40.0), interpreter.eval("8*5"));

        interpreter.eval("Aas=[[1,2],[3,4]]");
        interpreter.eval(" Bas = [[5,6],[5,6]]");

        assertEquals(
                new MatrixValue(new Matrix(new double[][] {{-4.0, -4.0}, {-2.0, -2.0}})),
                interpreter.eval("Aas-Bas")
        );
    }

    @Test
    void testDivision() {
        Interpreter interpreter = new Interpreter();
        assertEquals(new NumberValue(8.0 / 5), interpreter.eval("8/5"));

        assertThrows(CommandExecutorException.class,
                () -> interpreter.eval("[[1,2],[3,4]] / [[1,2],[3,4]]"));
    }

    @Test
    void testAdditionWithVariable() {
        Interpreter interpreter = new Interpreter();
        interpreter.eval("Aas=[[1,2],[3,4]]");
        interpreter.eval(" Bas = [[1,2],[3,4]]");
        assertEquals(
                new MatrixValue(new Matrix(new double[][] {{2.0, 4.0}, {6.0, 8.0}})),
                interpreter.eval(" Aas + Bas")
        );

        interpreter.eval("Aas=5");
        interpreter.eval("Bas = 8 ");

        assertEquals(new NumberValue(13.0), interpreter.eval(" Bas+ Aas "));
    }

    @Test
    void testSolveWithVariableNoSolution() {
        Interpreter interpreter = new Interpreter();
        interpreter.eval("Aas=[[1,2],[3,4]]");

        assertThrows(CommandExecutorException.class, () -> interpreter.eval("solve(Aas)"));
    }

    @Test
    void testSolve() {
        Interpreter interpreter = new Interpreter();

        String solutionString = "[600.0, 200.0, 500.0]";
        assertEquals(
                solutionString,
                interpreter.eval("solve([[3,11,10,9000], [6,2,2,5000], [150,220,120,194000]])").toString()
        );

        String solutionString2 = "[-1.0*b - 1.0*c + 2.0, 1.0*b, 1.0*c]";
        assertEquals(
                solutionString2,
                interpreter.eval("solve([[1,1,1,2],[2,2,2,4]])").toString()
        );
    }

    @Test
    void testDet() {
        Interpreter interpreter = new Interpreter();
        Value result = interpreter.eval("det([[1,2], [3,4]])");
        assertInstanceOf(NumberValue.class, result);
        assertEquals(-2.0, ((NumberValue) result).value(), DELTA);
    }

    @Test
    void testMultipleVariables() {
        Interpreter interpreter = new Interpreter();
        assertEquals(new NumberValue(10.0), interpreter.eval("A=2*4+2"));
        assertEquals(new NumberValue(12.0), interpreter.eval("B=12"));
        assertEquals(new NumberValue(22.0), interpreter.eval("C=A+B"));
        assertEquals(new NumberValue(22.0), interpreter.eval("A=C"));
    }

    @Test
    void testWrongDeterminantArguments() {
        Interpreter interpreter = new Interpreter();
        assertThrows(CommandException.class, () -> interpreter.eval("det(5)"));
        assertThrows(CommandException.class, () -> interpreter.eval("det([[1,2],[3,4],[5,6]])"));
        assertThrows(CommandException.class, () -> interpreter.eval("det([[1,2],[3,4]], [[1,2],[3,4]])"));
        assertThrows(CommandException.class, () -> interpreter.eval("det(A*B)"));
    }
}