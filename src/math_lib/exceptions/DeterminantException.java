package math_lib.exceptions;

public class DeterminantException extends MatrixArgumentException {
    private final String string;

    public DeterminantException(String message) {
        super(message);
        this.string = message;
    }

    public String getString() {
        return string;
    }

}
