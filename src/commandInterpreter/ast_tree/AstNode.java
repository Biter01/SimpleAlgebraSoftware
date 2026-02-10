package commandInterpreter.ast_tree;

import commandInterpreter.Context;

public interface AstNode {
    Object execute(Context ctx);
}
