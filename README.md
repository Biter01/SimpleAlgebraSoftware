# SimpleAlgebraSoftware

This is a lightweight CLI tool created in Java

## Features
- Solve linear systems
- Gauss elimination
- Matrix multiplication
- Calculate determinants
- Work with Expressions

## Supported Commands
- `help` - display available commands
- `exit` - exit the application
- `solve(matrix)` – solve a linear system with linear expressions
- `det(matrix)` – calculate the determinant
- Variable assignment: `A = ...`
- Expression evaluation: `C = A + B * (A+B)/ 3`

## Usage
Start the CLI application and enter expressions, variables or commands directly.<br>

Type `help` to see all available commands.
Type `exit` to quit the application.

## Examples

### Work with Variables and Expressions

```
> A = (1+2)*3
9.0
> B = 15
15.0
> C = A/B
0.6
```

### Solve linear systems

```
> solve([[3,11,10,9000], [6,2,2,5000], [150,220,120,194000]])

[600.0, 200.0, 500.0]

> A = [[1, 1, 0, 0, 0, 0, 0, 1],
       [0, 1, 1, 0, 0, 0, 0, 2],
       [0, 0, 1, 1, 0, 0, 0, 3],
       [0, 0, 0, 1, 1, 1, 1, 4]]
       
> solve(A)

[1.0*e + 1.0*f + 1.0*g - 2.0,
 -1.0*e - 1.0*f - 1.0*g + 3.0,
 1.0*e + 1.0*f + 1.0*g - 1.0,
 -1.0*e - 1.0*f - 1.0*g + 4.0,
 1.0*e, 1.0*f, 1.0*g]
```

### Multiply matrices and calculate determinants

```

> A = [[1,2],[3,4]]
[
  [1.0, 2.0],
  [3.0, 4.0]
]
> B = [[1,2],[3,4]]
[
  [1.0, 2.0],
  [3.0, 4.0]
]
> det(A*B)
4.0

```
## Mathematical Scope
- Scalar expressions in $\mathbb{R}$
- Vectors in $\mathbb{R}^n$
- Matrices in $\mathbb{R}^{n \times m}$
- No symbolic simplification beyond linear expressions
- Expressions evaluation with variables and constants either in $\mathbb{R}$ or $\mathbb{R}^{n \times m}$

