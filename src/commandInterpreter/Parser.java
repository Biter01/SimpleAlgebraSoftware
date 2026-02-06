package commandInterpreter;

import commandInterpreter.exceptions.ParseException;
import commandInterpreter.ast_tree.*;
import commandInterpreter.tokens.Token;
import commandInterpreter.tokens.TokenType;

import java.util.ArrayList;
import java.util.List;

public class Parser {
    private final List<Token> tokens;
    private int pos = 0;

    public Parser(List<Token> tokens) {
        this.tokens = tokens;
    }

    private Token peek() {
        return tokens.get(pos);
    }

    private Token peekNext() {return tokens.get(pos + 1);}

    Token consume(TokenType t) {
        Token curr = peek();
        expect(t);
        pos++; // bewusstes Weitergehen
        return curr;
    }

    private void next() {
        pos = pos + 1;
    }

    private void expect(TokenType t) {
        if (peek().type != t)
            throw new ParseException("Expected: " + t + " but found: " + peek().type);
    }

    // ENTRY POINT
    public AstNode parse() {
        AstNode stmt = parseStatement();
        expect(TokenType.EOF);
        return stmt;
    }

    AstNode parseStatement() {
        Token t = peek();
        if (t.type == TokenType.IDENT && peekNext().type == TokenType.LPAR) {
           return parseFunction();
        } else if(t.type == TokenType.IDENT && peekNext().type == TokenType.EQUAL) {
            return parseAssignVariable();
        } else if(t.type == TokenType.NUMBER || t.type == TokenType.LPAR || t.type == TokenType.IDENT) {
            return parseExpression();
        }
        throw new ParseException("Not a correct Symbol to begin your Statement " + peek().text);
    }


    AstNode parseExpression() {
        AstNode left = parseTerm();

        while (peek().type == TokenType.PLUS || peek().type == TokenType.MINUS) {
            Token op = consume(peek().type);
            AstNode right = parseTerm();
            left = new BinaryExpressionNode(left, op.type, right);
        }


        return left;
    }

    AstNode parseTerm() {
        AstNode left = parseFactor();

        while (peek().type == TokenType.MULT || peek().type == TokenType.DIV) {
            Token op = consume(peek().type);
            AstNode right = parseFactor();
            left = new BinaryExpressionNode(left, op.type, right);
        }

        return left;
    }

    AstNode parseFactor() {
        if (peek().type == TokenType.NUMBER) {
            return new NumberExpr(Double.parseDouble(consume(TokenType.NUMBER).text));
        }

        if (peek().type == TokenType.IDENT) {
            return new VariableNode(consume(TokenType.IDENT).text);
        }

        if (peek().type == TokenType.LBRACK) {
            return parseMatrix();
        }

        if (peek().type == TokenType.LPAR) {
            consume(TokenType.LPAR);
            AstNode e = parseExpression();
            consume(TokenType.RPAR);
            return e;
        }

        throw new ParseException("Expected number or '('");
    }

    AstNode parseFunction() {
        if(peek().text.equals("solve")) {
            return parseSolve();
        } else if(peek().text.equals("det")) {
            return parseDeterminant();
        } else {
            throw new ParseException("Not a correct Symbol to begin your Statement " + peek().text);
        }
    }

    AstNode parseDeterminant() {
        consume(TokenType.IDENT);
        consume(TokenType.LPAR);

        AstNode arg;
        if(peek().type == TokenType.LBRACK) {
            arg = parseMatrix();
        } else if(peek().type == TokenType.IDENT) {
            arg = new VariableNode(consume(TokenType.IDENT).text);
        } else {
            throw new ParseException("Not a correct symbol in command " + peek().text);
        }

        consume(TokenType.RPAR);
        //expect(TokenType.EOF);

        return new DetFuncNode(arg);
    }

    AstNode parseAssignVariable() {
        Token nameTok = consume(TokenType.IDENT);
        consume(TokenType.EQUAL);

        AstNode value;

        if(peek().type == TokenType.LBRACK) {
            value =  parseMatrix();
        } else if(peek().type == TokenType.IDENT || peek().type == TokenType.NUMBER) {
            value = parseExpression();
        } else {
            throw new ParseException("Not a correct symbol in command " + peek().text);
        }

        //expect(TokenType.EOF);

        return new AssignNode(nameTok.text, value);
    }

    AstNode parseSolve() {
        consume(TokenType.IDENT);
        consume(TokenType.LPAR);

        AstNode arg;
        if(peek().type == TokenType.RBRACK) {
            arg = parseMatrix();
        } else if(peek().type == TokenType.IDENT) {
            arg = new VariableNode(consume(TokenType.IDENT).text);
        } else {
            throw new ParseException("Not a correct symbol in command " + peek().text);
        }

        consume(TokenType.RPAR);
        //expect(TokenType.EOF);

        return new SolveFuncNode(arg);
    }

    AstNode parseMatrix() {
        consume(TokenType.LBRACK);

        List<List<Double>> rows = new ArrayList<>();

        rows.add(parseRow());

        while (peek().type == TokenType.COMMA) {
            consume(TokenType.COMMA);
            rows.add(parseRow());
        }

        consume(TokenType.RBRACK);

        return new MatrixNode(rows);
    }

    List<Double> parseRow() {
        consume(TokenType.LBRACK);

        List<Double> row = new ArrayList<>();

        row.add(parseNumber());

        while (peek().type != TokenType.RBRACK) {
            consume(TokenType.COMMA);
            row.add(parseNumber());
        }

        consume(TokenType.RBRACK);

        return row;
    }

    Double parseNumber() {
        Token t = consume(TokenType.NUMBER);
        return Double.parseDouble(t.text);
    }

}
