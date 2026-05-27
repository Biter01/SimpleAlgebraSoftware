package commandInterpreter.tokens;

public enum TokenType {
    IDENT,     // identifier -> solve, var usw
    LPAR, RPAR, // ( )
    LBRACK, RBRACK, // [ ]
    COMMA,
    NUMBER,
    EQUAL,
    PLUS,
    MINUS,
    MULT,
    DIV,
    EOF
}
