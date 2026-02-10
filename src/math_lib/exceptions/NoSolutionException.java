package math_lib.exceptions;

public class NoSolutionException extends MatrixArgumentException {

    private final String string;

    public NoSolutionException(String message) {
        super(message);
        this.string = message;
    }

    public String getString() {
        return string;
    }
}