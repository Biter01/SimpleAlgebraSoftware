package commandInterpreter;

import commandInterpreter.exceptions.unchecked.ContextNotFoundException;
import commandInterpreter.ast_tree.AstNode;

import java.util.HashMap;
import java.util.Map;

public class Context {
    private final Map<String, Object> variables;

    public Context() {
        variables = new HashMap<>();
    }

    public void set(String identifier, Object variable) {
        variables.put(identifier, variable);
    }

    public Object lookup(String text) throws ContextNotFoundException {
        if(!variables.containsKey(text)) {
            throw new ContextNotFoundException("Could not find variable '" + text + "'");
        }

        return variables.get(text);
    }
}
