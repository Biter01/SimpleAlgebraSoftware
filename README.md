# SimpleAlgebraSoftware

A lightweight algebra library for working with **matrices**, **vectors** and **linear expressions**.

## Features

### Matrices in $\mathbb{R}^{n \times m}$

- Solve linear systems
- Gauss elimination
- Matrix multiplication

### Vectors in $\mathbb{R}^{n}$
- Basic operations (addition, scaling, …)
- Scalar product

### Linear expressions
- Basic operations

## Examples

### Solve a linear system
```java
import static structures.Matrix.*;

...

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

// Output -> [600.0, 200.0, 500.0]
```
### Work with LinearExpression

```java
LinearExpression e3 =  e1.add(e2);
LinearExpression e1 = new LinearExpression("-3*y + 5*x + 5");
LinearExpression e2 = new LinearExpression("1*x - 5*y - 20 +2*y");
LinearExpression e3 =  e1.add(e2);

System.out.println(e3);
//Output -> 6.0*x - 6.0*y - 15.0

System.out.println(e3.multiplyConstant(5));
//Output -> 30.0*x - 30.0*y - 75.0
```
