package commandInterpreter.exceptions.unchecked;

public class ContextNotFoundException extends CommandException {
        private final String string;

        public ContextNotFoundException(String message) {
            super(message);
            this.string = message;
        }

        public String getString() {
            return string;
        }

}
