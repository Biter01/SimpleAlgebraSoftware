package app;

import commandInterpreter.Interpreter;
import commandInterpreter.exceptions.unchecked.CommandException;
import java.util.Scanner;

public class CLIApp {
    Interpreter interpreter;
    Scanner sc;

    public CLIApp() {
        this.interpreter = new Interpreter();
        this.sc = new Scanner(System.in);
    }

    private void boldSizeOfString(String str)
    {
        String strNormalSize = "\033[0;0m";
        String strBoldSize = "\033[0;1m";
        System.out.println(strBoldSize + str);
        System.out.print(strNormalSize);
    }

    private void helpMessage() {
        System.out.println("CLI APP commands you can use: ;)");
        System.out.println("1. exit - Exit the application");
        System.out.println("2. help - Show this help message");
        System.out.println("3. You can solve linear systems. For example:");
        System.out.println("   - A = [[3,11,10,9000], [6,2,2,5000], [150,220,120,194000]] //define matrix");
        System.out.println("   - solve(A) //solve the linear system represented by matrix A");
        System.out.println("4. You can calculate the determinant. For example:");
        System.out.println("   - A = [[1,2], [3,4]] //define matrix");
        System.out.println("   - det(A) //calculate the determinant");
        System.out.println("5. You can enter any valid R or R^nxm expression to evaluate it. For example:");
        System.out.println("   - 2 + 3 * 4             // normal arithmetic");
        System.out.println("   - A = [[1, 2], [3, 4]] // define a 2x2 matrix");
        System.out.println("   - B = [[5, 6], [7, 8]] // define another 2x2 matrix");
        System.out.println("   - A + B                 // matrix addition (element-wise)");
        System.out.println("   - A * B                 // matrix multiplication (dot product)");

    }

    private void welcomeMessage() {
            System.out.println("==============================================");
            System.out.println(" Welcome to the SimpleAlgebra CLI Application ");
            System.out.println("==============================================");
            System.out.println("This application allows you to:");
            System.out.println("  -> Perform matrix operations (addition, multiplication, determinant etc.)");
            System.out.println("  -> Work with and solve linear systems");
            System.out.println("  -> Evaluate arithmetic expressions (e.g., 2 + 3 * 4)");
            System.out.println();
            System.out.println("Type 'help' to see available commands and usage instructions.");
            System.out.println();
    }

    public void runApp() {
        welcomeMessage();
        label:
        while (true) {
            System.out.print("> ");
            String line = sc.nextLine();

            switch (line) {
                case "exit":
                    exitApp();
                    break label;
                case "help":
                    helpMessage();
                    continue;
            }

            try {
                Object result = interpreter.eval(line);
                if (result != null)
                    System.out.println(result);
            } catch (CommandException e) {
                boldSizeOfString(e.getMessage());
            }
        }
    }

    public void exitApp() {
        sc.close();
        System.exit(0);
    }

}