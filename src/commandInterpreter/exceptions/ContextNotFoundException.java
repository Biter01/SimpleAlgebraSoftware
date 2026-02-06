package commandInterpreter.exceptions;

public class ContextNotFoundException extends RuntimeException {
        private final String string;

        public ContextNotFoundException(String message) {
            super(message);
            this.string = message;
        }

        public String getString() {
            return string;
        }

}
