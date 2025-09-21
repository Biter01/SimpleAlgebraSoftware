package util;

public class Factorial {
    public static long getRecursive(int n) {
        if(n < 0) {
            throw new IllegalArgumentException("n must be a positive integer");
        }

        if(n == 0) {
            return 1;
        }

        return n * getRecursive(n-1);
    }

    public static long getIterative(int n) {
        if(n < 0) {
            throw new IllegalArgumentException("n must be a positive integer");
        }

        long factorial = 1;

        for(int i = 1; i <= n; i++) {
            factorial *= i;
        }

        return factorial;
    }

}
