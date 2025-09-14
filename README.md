# SimpleAlgebraSoftware

A lightweight algebra library for working with **matrices**, **vectors** and **linear expressions**.

## Features

### Matrices
- Solve linear systems
- Gauss elimination
- Matrix multiplication

### Vectors in ℝⁿ
- Basic operations (addition, scaling, …)
- Scalar product

### Linear expressions
- Basic operations

## Examples

### Solve a linear system
```java
double[][] v = {
    {1, 1, 0, 0, 0, 0, 0, 1},
    {0, 1, 1, 0, 0, 0, 0, 2},
    {0, 0, 1, 1, 0, 0, 0, 3},
    {0, 0, 0, 1, 1, 1, 1, 4}
};

System.out.println(Arrays.toString(linearSolve(v)));

// Output ->
// [1.0*e + 1.0*f + 1.0*g - 2.0,
//  -1.0*e - 1.0*f - 1.0*g + 3.0,
//   1.0*e + 1.0*f + 1.0*g - 1.0,
//  -1.0*e - 1.0*f - 1.0*g + 4.0,
//   1.0*e, 1.0*f, 1.0*g]

double[][] u = {
    {3, 11, 10, 9000},
    {6,  2,  2, 5000},
    {150, 220, 120, 194000}
};

System.out.println(Arrays.toString(linearSolve(u)));

// Output [600.0, 200.0, 500.0]

