package commandInterpreter;

import commandInterpreter.ast.values.Value;
import commandInterpreter.exceptions.unchecked.ContextNotFoundException;

import java.util.HashMap;
import java.util.Map;

public class Context {
    private final Map<String, Value> variables;

    public Context() {
        variables = new HashMap<>();
    }

    public void set(String identifier, Value variable) {
        variables.put(identifier, variable);
    }

    public Value lookup(String text) throws ContextNotFoundException {
        if(!variables.containsKey(text)) {
            throw new ContextNotFoundException("Could not find variable '" + text + "'");
        }

        return variables.get(text);
    }
}
