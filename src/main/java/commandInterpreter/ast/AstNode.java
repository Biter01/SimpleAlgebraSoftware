package commandInterpreter.ast;

import commandInterpreter.Context;
import commandInterpreter.ast.values.Value;

public interface AstNode {
    Value execute(Context ctx);
}
