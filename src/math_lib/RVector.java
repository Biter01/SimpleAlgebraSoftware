package math_lib;

public class RVector {
    public final double[] vi;
    public final int dim;

    public RVector(double ...args) {
        this(args.length);

        System.arraycopy(args, 0, vi, 0, args.length);
    }

    public RVector(int size) {
        if (size < 0) {
            throw new IllegalArgumentException("structures.RVector size must be a positive integer");
        }

        dim = size;
        vi = new double[size];
    }

    public static RVector add(RVector a, RVector b) {
        if(a.vi.length != b.vi.length) {
            throw new IllegalArgumentException("Vectors must have the same length");
        }

        RVector result = new RVector(a.dim);

        for(int i=0; i<a.vi.length; i++) {
            result.vi[i] = a.vi[i] + b.vi[i];
        }

        return result;
    }

    public static RVector subtract(RVector a, RVector b) {
        if(a.vi.length != b.vi.length) {
            throw new IllegalArgumentException("Vectors must have the same length");
        }

        RVector result = new RVector(a.dim);

        for(int i=0; i<a.vi.length; i++) {
            result.vi[i] = a.vi[i] - b.vi[i];
        }

        return result;
    }

    public static double scalarProduct(RVector a, RVector b) {
        if(a.vi.length != b.vi.length) {
            throw new IllegalArgumentException("Vectors must have the same length");
        }

        double result = 0;

        for(int i=0; i<a.vi.length; i++) {
            result += a.vi[i] * b.vi[i];
        }

        return result;
    }

    @Override
    public String toString() {
        StringBuilder result = new StringBuilder();
        result.append("(");
        result.append(vi[0]);
        for(int i=1; i<dim; i++) {
            result.append(", ");
            result.append(vi[i]);
        }
        result.append(")");

        return result.toString();
    }

}
