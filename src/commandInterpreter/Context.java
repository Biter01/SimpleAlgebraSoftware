package commandInterpreter;

import commandInterpreter.exceptions.ContextNotFoundException;
import commandInterpreter.ast_tree.AstNode;

import java.util.HashMap;
import java.util.Map;

public class Context {
    private static Context ctx;
    private Map<String, AstNode> variables;

    public static Context getInstance() {
        if(ctx == null) {
            ctx = new Context();
            ctx.variables = new HashMap<>();
        }

        return ctx;
    }

    public void set(String identifier, AstNode variable) {
        variables.put(identifier, variable);
    }

    public AstNode lookup(String text) throws ContextNotFoundException {
        if(!variables.containsKey(text)) {
            throw new ContextNotFoundException("Could not find variable '" + text + "'");
        }

        return variables.get(text);
    }
}
