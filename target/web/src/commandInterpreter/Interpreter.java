package commandInterpreter;

import commandInterpreter.ast.AstNode;
import commandInterpreter.ast.values.Value;
import commandInterpreter.tokens.Token;

import java.util.List;

public class Interpreter {

    private final Lexer lexer = new Lexer();
    private final Context ctx = new Context();

    public Value eval(String input) {
        List<Token> tokens = lexer.tokenize(input);
        Parser parser = new Parser(tokens);
        AstNode ast = parser.parse();
        return ast.execute(ctx);
    }
}
