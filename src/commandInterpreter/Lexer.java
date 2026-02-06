package commandInterpreter;

import commandInterpreter.tokens.Token;
import commandInterpreter.tokens.TokenType;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Lexer {
    private static final Pattern TOKEN_PATTERN = Pattern.compile(
            "\\s*(?:" +
                    "(?<NUMBER>-?\\d+(\\.\\d+)?)|" +
                    "(?<IDENT>[a-zA-Z_][a-zA-Z0-9_]*)|" +
                    "(?<LPAR>\\()|" +
                    "(?<RPAR>\\))|" +
                    "(?<LBRACK>\\[)|" +
                    "(?<RBRACK>\\])|" +
                    "(?<COMMA>,)|" +
                    "(?<EQUAL>=)|" +
                    "(?<PLUS>\\+)|" +
                    "(?<MINUS>-)|" +
                    "(?<MULT>\\*)|" +
                    "(?<DIV>/)" +
                    ")"
    );

    public List<Token> tokenize(String input) {
        List<Token> tokens = new ArrayList<>();
        Matcher m = TOKEN_PATTERN.matcher(input);

        while (m.find()) {
            if (m.group("NUMBER") != null)
                tokens.add(new Token(TokenType.NUMBER, m.group()));
            else if (m.group("IDENT") != null)
                tokens.add(new Token(TokenType.IDENT, m.group()));
            else if (m.group("LPAR") != null)
                tokens.add(new Token(TokenType.LPAR, "("));
            else if (m.group("RPAR") != null)
                tokens.add(new Token(TokenType.RPAR, ")"));
            else if (m.group("LBRACK") != null)
                tokens.add(new Token(TokenType.LBRACK, "["));
            else if (m.group("RBRACK") != null)
                tokens.add(new Token(TokenType.RBRACK, "]"));
            else if (m.group("COMMA") != null)
                tokens.add(new Token(TokenType.COMMA, ","));
            else if (m.group("EQUAL") != null)
                tokens.add(new Token(TokenType.EQUAL, "="));
            else if (m.group("PLUS") != null)
                tokens.add(new Token(TokenType.PLUS, "+"));
            else if (m.group("MINUS") != null)
                tokens.add(new Token(TokenType.MINUS, "-"));
            else if (m.group("MULT") != null)
                tokens.add(new Token(TokenType.MULT, "*"));
            else if (m.group("DIV") != null)
                tokens.add(new Token(TokenType.DIV, "/"));
        }

        tokens.add(new Token(TokenType.EOF, ""));
        return tokens;
    }
}
