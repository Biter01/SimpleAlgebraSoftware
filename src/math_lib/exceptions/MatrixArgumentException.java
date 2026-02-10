package math_lib.exceptions;

public class MatrixArgumentException extends Exception {
    private final String string;

    public MatrixArgumentException(String message) {
        super(message);
        this.string = message;
    }

    public String getString() {
        return string;
    }
}
