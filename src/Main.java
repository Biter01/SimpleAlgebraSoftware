import commandInterpreter.Lexer;
import commandInterpreter.Parser;
import commandInterpreter.ast_tree.AstNode;
import commandInterpreter.tokens.Token;
import java.util.List;
//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args)  {
        /*Lexer lexer = new Lexer();
        List<Token> tokens = lexer.tokenize("solve([[3,11,10,9000],[6,2,2,5000],[150,220,120,194000]])");

        Parser parser = new Parser(tokens);

        Expr expr = parser.parse();
        System.out.println(expr.execute());
        */

        Lexer lexer = new Lexer();

        List<Token> tokens1 = lexer.tokenize("Aas=[[1,2],[3,4]]");

        Parser parser1 = new Parser(tokens1);

        AstNode expr1 = parser1.parse();

        expr1.execute();

        List<Token> tokens2 = lexer.tokenize("Aas + [[1,2],[3,4]]");

        Parser parser2 = new Parser(tokens2);

        AstNode expr2 = parser2.parse();

        System.out.println(expr2.execute());
    }
}