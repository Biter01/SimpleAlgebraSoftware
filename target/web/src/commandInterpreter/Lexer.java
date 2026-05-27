package commandInterpreter;

import commandInterpreter.tokens.Token;
import commandInterpreter.tokens.TokenType;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Lexer {

    // Group-Indices – muessen zur Pattern-Reihenfolge unten passen.
    // Wir nutzen (?:...) (non-capturing) fuer die innere Dezimal-Gruppe,
    // damit die aeusseren Gruppen schoen 1..12 durchnummeriert sind.
    private static final int G_NUMBER = 1;
    private static final int G_IDENT  = 2;
    private static final int G_LPAR   = 3;
    private static final int G_RPAR   = 4;
    private static final int G_LBRACK = 5;
    private static final int G_RBRACK = 6;
    private static final int G_COMMA  = 7;
    private static final int G_EQUAL  = 8;
    private static final int G_PLUS   = 9;
    private static final int G_MINUS  = 10;
    private static final int G_MULT   = 11;
    private static final int G_DIV    = 12;

    private static final Pattern TOKEN_PATTERN = Pattern.compile(
            "\\s*(?:" +
                    "(-?\\d+(?:\\.\\d+)?)|" +   // 1: NUMBER  (innere Gruppe non-capturing!)
                    "([a-zA-Z_][a-zA-Z0-9_]*)|" + // 2: IDENT
                    "(\\()|" +                  // 3: LPAR
                    "(\\))|" +                  // 4: RPAR
                    "(\\[)|" +                  // 5: LBRACK
                    "(\\])|" +                  // 6: RBRACK
                    "(,)|" +                    // 7: COMMA
                    "(=)|" +                    // 8: EQUAL
                    "(\\+)|" +                  // 9: PLUS
                    "(-)|" +                    // 10: MINUS
                    "(\\*)|" +                  // 11: MULT
                    "(/)" +                     // 12: DIV
                    ")"
    );

    public List<Token> tokenize(String input) {
        List<Token> tokens = new ArrayList<>();
        String inputTrimmed = input.replaceAll(" ", "");
        Matcher m = TOKEN_PATTERN.matcher(inputTrimmed);

        while (m.find()) {
            if (m.group(G_NUMBER) != null)
                tokens.add(new Token(TokenType.NUMBER, m.group(G_NUMBER)));
            else if (m.group(G_IDENT) != null)
                tokens.add(new Token(TokenType.IDENT, m.group(G_IDENT)));
            else if (m.group(G_LPAR) != null)
                tokens.add(new Token(TokenType.LPAR, "("));
            else if (m.group(G_RPAR) != null)
                tokens.add(new Token(TokenType.RPAR, ")"));
            else if (m.group(G_LBRACK) != null)
                tokens.add(new Token(TokenType.LBRACK, "["));
            else if (m.group(G_RBRACK) != null)
                tokens.add(new Token(TokenType.RBRACK, "]"));
            else if (m.group(G_COMMA) != null)
                tokens.add(new Token(TokenType.COMMA, ","));
            else if (m.group(G_EQUAL) != null)
                tokens.add(new Token(TokenType.EQUAL, "="));
            else if (m.group(G_PLUS) != null)
                tokens.add(new Token(TokenType.PLUS, "+"));
            else if (m.group(G_MINUS) != null)
                tokens.add(new Token(TokenType.MINUS, "-"));
            else if (m.group(G_MULT) != null)
                tokens.add(new Token(TokenType.MULT, "*"));
            else if (m.group(G_DIV) != null)
                tokens.add(new Token(TokenType.DIV, "/"));
        }

        tokens.add(new Token(TokenType.EOF, ""));
        return tokens;
    }
}