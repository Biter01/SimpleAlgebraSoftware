package structures.exceptions;

public class NoSolutionException extends Exception {

    private final String string;

    public NoSolutionException(String message) {
        super(message);
        this.string = message;
    }

    public String getString() {
        return string;
    }
}
