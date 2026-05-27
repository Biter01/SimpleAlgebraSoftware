package commandInterpreter.exceptions.unchecked;

public class CommandException extends RuntimeException {
    public CommandException(String message) {
        super(message);
    }
}
