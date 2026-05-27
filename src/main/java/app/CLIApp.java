package app;

import commandInterpreter.Interpreter;
import commandInterpreter.exceptions.unchecked.CommandException;

import java.io.IOException;
import java.util.NoSuchElementException;
import java.util.Scanner;
import static util.cli.CLIUtils.*;

public class CLIApp {
    Interpreter interpreter;
    Scanner sc;

    public CLIApp() {
        this.interpreter = new Interpreter();
        this.sc = new Scanner(System.in);
    }

    public void runApp() {
        printWelcome();
        while (true) {
            System.out.print(blue("> "));
            String line;

            try {
                line = getNextLine();
            } catch (NoSuchElementException e) {
                exitApp();
                return;
            }

            executeLine(line);
        }
    }

    private String getNextLine() throws NoSuchElementException {
        try {
            if (!sc.hasNextLine()) {
                // No stdin available (non-interactive environment) -> exit gracefully
                System.out.println("No input available, exiting.");
                exitApp();
            }
            return sc.nextLine();
        } catch (NoSuchElementException e) {
            // Scanner closed or no input -> exit
            System.out.println("No input available (exception), exiting.");
            exitApp();
            throw new NoSuchElementException();
        }
    }

    private void executeLine(String line) {
        switch (line) {
            case "exit":
                exitApp();
                return;
            case "help":
                printHelp();
                return;
            case "clear":
                clearScreen();
                return;
        }

        try {
            Object result = interpreter.eval(line);
            if (result != null)
                System.out.println(green(result.toString()));
        } catch (CommandException e) {
            String error = error(e.getMessage());
            System.out.println(error);
        }
    }

    public void exitApp() {
        sc.close();
        System.exit(0);
    }

    private void clearScreen() {
        try {
            String os = System.getProperty("os.name").toLowerCase();
            if (os.contains("win")) {
                new ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor();
            } else {
                new ProcessBuilder("clear").inheritIO().start().waitFor();
            }
        } catch (IOException | InterruptedException e) {
            // Fallback: ANSI versuchen
            System.out.print("\033[H\033[2J\033[3J");
            System.out.flush();
        }
    }
}