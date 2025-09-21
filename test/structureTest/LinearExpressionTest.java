package structureTest;
import org.junit.jupiter.api.Test;
import structures.LinearExpression;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;


public class LinearExpressionTest {

    @Test
    void testAdd()  {
        LinearExpression expression = new LinearExpression("-2*x + 5*y");

        LinearExpression add1 = expression.add(new LinearExpression("-5*x"));
        assertEquals(new LinearExpression("-7*x + 5*y"), add1);

        LinearExpression add2 = expression.add(new LinearExpression(""));

        assertEquals(new LinearExpression("-2*x + 5*y"), add2);

        LinearExpression add3 = expression.add(new LinearExpression("7*z * 6*u"));

        assertEquals(new LinearExpression("7*z * 6*u -2*x + 5*y "), add3);

        assertEquals(new LinearExpression("2*x + 5*x"), new LinearExpression("7*x"));
    }

    @Test
    void testLinExpressionFormat()  {
        assertThrows(IllegalArgumentException.class, () -> new LinearExpression("--2*x"));

        assertThrows(IllegalArgumentException.class, () -> new LinearExpression("2x + 4*y"));

        assertThrows(IllegalArgumentException.class, () -> new LinearExpression("+2*x+4*y"));

        assertThrows(IllegalArgumentException.class, () -> new LinearExpression("2x + + 4*y"));

        assertThrows(IllegalArgumentException.class, () -> new LinearExpression("3. * ."));
    }
}
