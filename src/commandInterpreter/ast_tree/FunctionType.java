package commandInterpreter.ast_tree;

import java.util.Arrays;
import java.util.Optional;

public enum FunctionType {
    SOLVE("solve"),
    DETERMINANT("det"),
    GAUSS("gauss");

    private final String identifier;


    FunctionType(String identifier) {
        this.identifier = identifier;
    }

    public static Optional<FunctionType> fromIdentifier(String identifier) {
        return Arrays.stream(FunctionType.values())
                .filter(ft -> ft.identifier.equals(identifier))
                .findFirst();
    }
}
