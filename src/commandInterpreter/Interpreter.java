package commandInterpreter;

import commandInterpreter.ast_tree.AstNode;
import commandInterpreter.tokens.Token;

import java.util.List;

public class Interpreter {

    private final Lexer lexer = new Lexer();
    private final Context ctx = new Context();

    public Object eval(String input) {
        List<Token> tokens = lexer.tokenize(input);
        Parser parser = new Parser(tokens);
        AstNode ast = parser.parse();
        return ast.execute(ctx);
    }
}
