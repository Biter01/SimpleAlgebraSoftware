package commandInterpreter.ast_tree;

public class NumberExpr implements AstNode {

    public Double value;

    public NumberExpr(Double value) {
        this.value = value;
    }

    @Override
    public Double execute() {
        return value;
    }
}
