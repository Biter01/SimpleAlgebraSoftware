package commandInterpreter.ast_tree;

public class StatementRoot implements AstNode {

    AstNode node;

    public StatementRoot(AstNode node) {
        this.node = node;
    }

    @Override
    public Object execute() {
        return node.execute();
    }

}
