package util.cli;

public final class CLIUtils {
    public static final String RESET  = "\033[0m";

    private static final String BOLD   = "\033[1m";
    private static final String DIM    = "\033[2m";
    private static final String UNDER  = "\033[4m";

    private static final String RED    = "\033[31m";
    private static final String GREEN  = "\033[32m";
    private static final String YELLOW = "\033[33m";
    private static final String BLUE   = "\033[34m";
    private static final String CYAN   = "\033[36m";

    public static String red(String s)    { return RED    + s + RESET; }
    public static String green(String s)  { return GREEN  + s + RESET; }
    public static String yellow(String s) { return YELLOW + s + RESET; }
    public static String blue(String s)   { return BLUE   + s + RESET; }
    public static String cyan(String s)   { return CYAN   + s + RESET; }

    public static String bold(String s)   { return BOLD   + s + RESET; }
    public static String under(String s)   { return UNDER   + s + RESET; }
    public static String dim(String s)   { return DIM + s + RESET; }

    public static String error(String s)  { return BOLD + RED + s + RESET; }
    public static String success(String s){ return BOLD + GREEN + s + RESET; }
    public static String info(String s)   { return BOLD + BLUE  + s + RESET; }

    public static void printHelp() {
        System.out.println("CLI APP commands you can use: ;)");
        System.out.println(blue("1.") + " " + "exit" + " - Exit the application");
        System.out.println(blue("2.") + " " + "help" + " - Show this help message");
        System.out.println(blue("3.") + " You can solve linear systems. For example:");
        System.out.println("   - " + green("A = [[3,11,10,9000], [6,2,2,5000], [150,220,120,194000]]") + " //define matrix");
        System.out.println("   - " + green("solve(A)") + " //solve the linear system represented by matrix A");
        System.out.println(blue("4.") + " You can calculate the determinant. For example:");
        System.out.println("   - " + green("A = [[1,2], [3,4]]") + " //define matrix");
        System.out.println("   - " + green("det(A)") + " //calculate the determinant");
        System.out.println(blue("5.") + " You can enter any valid R or R^nxm expression to evaluate it. For example:");
        System.out.println("   - " + green("2 + 3 * 4") + "             // normal arithmetic");
        System.out.println("   - " + green("A = [[1, 2], [3, 4]]") + " // define a 2x2 matrix");
        System.out.println("   - " + green("B = [[5, 6], [7, 8]]") + " // define another 2x2 matrix");
        System.out.println("   - " + green("A + B") + "                 // matrix addition (element-wise)");
        System.out.println("   - " + green("A * B") + "                 // matrix multiplication (dot product)");
    }

    public static void printWelcome() {
        System.out.println(bold(blue("""
          _____ _                 _                 _            _              \s
         / ____(_)               | |          /\\   | |          | |             \s
        | (___  _ _ __ ___  _ __ | | ___     /  \\  | | __ _  ___| |__  _ __ __ _\s
         \\___ \\| | '_ ` _ \\| '_ \\| |/ _ \\   / /\\ \\ | |/ _` |/ _ \\ '_ \\| '__/ _` |
         ____) | | | | | | | |_) | |  __/  / ____ \\| | (_| |  __/ |_) | | | (_| |
        |_____/|_|_| |_| |_| .__/|_|\\___| /_/    \\_\\_|\\__, |\\___|_.__/|_|  \\__,_|
                           | |                         __/ |                    \s
                           |_|                        |___/                     \s
        """)));
        System.out.println("This application allows you to:");
        System.out.println("  " + blue("1.") + " Perform matrix operations (addition, multiplication, determinant etc.)");
        System.out.println("  " + blue("2.") + " Work with and solve linear systems");
        System.out.println("  " + blue("3.") + " Evaluate arithmetic expressions (e.g., 2 + 3 * 4)");
        System.out.println();
        System.out.println("Type " + bold(green("'help'")) + " to see available commands and usage instructions.");
        System.out.println();
    }
}