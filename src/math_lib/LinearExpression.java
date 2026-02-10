package math_lib;
import java.util.Arrays;
import java.util.Map;
import java.util.Objects;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Pattern;

public class LinearExpression {
    private final Map<String, Double> expression = new TreeMap<>((s1, s2) -> {
        if(s1.length() != s2.length()) {
            return s1.length() - s2.length();
        } else {
            return s1.compareTo(s2);
        }
    });

    public LinearExpression(String inputStr) {
        if(inputStr.isBlank()) {
            return;
        }

        String normalizedString = inputStr.replace(" ", "");

        LinearExpressionValidator.validate(normalizedString);

        String[] terms = getTerms(normalizedString);

        convertToExpression(terms);
    }

    public static class LinearExpressionValidator {

        private static final Pattern NUMBER = Pattern.compile("[-]?(\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?");

        private static final Pattern VARIABLE = Pattern.compile("[a-z]"); // nur Kleinbuchstaben!

        public static void validate(String expr) {
            // 1. Basischecks
            if (expr.isEmpty()) {
                throw new IllegalArgumentException("Expression cannot be empty");
            }
            if (expr.charAt(0) == '+') {
                throw new IllegalArgumentException("Unnecessary '+' at start in LinExp");
            }
            if (expr.contains("--") || expr.contains("++") || expr.contains("**")) {
                throw new IllegalArgumentException("Too many signs in LinExp");
            }
            if (expr.contains("=")) {
                throw new IllegalArgumentException("Linear expressions must not contain '='");
            }

            // 2. Zeichenprüfung
            expr.chars()
                    .mapToObj(c -> (char) c)
                    .forEach(ch -> {
                        if (!isLegalChar(ch)) {
                            throw new IllegalArgumentException("Invalid character '" + ch + "'");
                        }
                    });

            // 3. Normalisierte Terme prüfen
            Arrays.stream(getTerms(expr))
                    .forEach(LinearExpressionValidator::validateTerm);
        }

        private static void validateTerm(String term) {

            String core = term; // Kopie vom Original-String

            // Nur das führende '+' entfernen
            if (core.startsWith("+") || core.startsWith("-")) {
                core = core.substring(1);
            }

            Arrays.stream(core.split("\\*")) // substring(1) entfernt das führende '+'
                    .filter(factor -> !isValidFactor(factor))
                    .findAny()
                    .ifPresent(invalid -> {
                        throw new IllegalArgumentException(
                                "Invalid factor '" + invalid + "' in term: " + term
                        );
                    });
        }

        private static boolean isValidFactor(String token) {
            return NUMBER.matcher(token).matches() || VARIABLE.matcher(token).matches();
        }

        private static boolean isLegalChar(char c) {
            return Character.isDigit(c) || (c >= 'a' && c <= 'z') || c == '+' || c == '-' || c == '*' || c == '.' || c == 'E';
        }

    }

    private static String[] getTerms(final String normalizedString) {

        String replacedString = normalizedString.replace("-", "+-");

        if(replacedString.charAt(0) == '+') {
            replacedString = replacedString.substring(1);
        }

        return replacedString.split("\\+");
    }

    private void convertToExpression(String[] terms) {
        for (String term : terms) {
            if (term.isBlank()) continue;

            double coefficient = 1.0;
            StringBuilder variable = new StringBuilder();

            // Faktoren aufsplitten
            String[] factors = term.split("\\*");

            for (String factor : factors) {
                if (factor.isBlank()) continue;

                // Prüfen ob es eine Zahl ist
                try {
                    coefficient *= Double.parseDouble(factor);
                } catch (NumberFormatException e) {
                    // Kein reiner Zahl-Faktor → dann Variable oder gemischt
                    variable.append(factor);
                }
            }

            String key = variable.isEmpty() ? "num" : variable.toString();
            expression.merge(key, coefficient, Double::sum);
        }
    }

    public LinearExpression add(LinearExpression other)  {
        LinearExpression result = new LinearExpression("");
        result.expression.putAll(this.expression);

        other.expression.forEach((key, coefficient) ->
                result.expression.merge(key, coefficient, Double::sum)
        );

        removeZeroCoefficents(result);

        return result;
    }

    public LinearExpression subtract(LinearExpression other)  {
        LinearExpression result = new LinearExpression("");
        result.expression.putAll(this.expression);

        other.expression.forEach((key, coefficient) ->
                result.expression.merge(key, -coefficient, Double::sum)
        );

        removeZeroCoefficents(result);

        return result;
    }

    public LinearExpression multiplyConstant(double c)  {
        LinearExpression result = new LinearExpression("");
        result.expression.putAll(this.expression);

        result.expression.forEach((key, coefficient) -> {
            result.expression.replace(key, coefficient*c);
        });

        removeZeroCoefficents(result);

        return result;
    }

    private void removeZeroCoefficents(LinearExpression result) {
        result.expression.entrySet().removeIf(entry -> entry.getValue() == 0);
    }

    public void round(int afterComma) {
        expression.forEach((key, coefficient) -> {
            double multiplied = coefficient * Math.pow(10, afterComma);
            long rounded = Math.round(multiplied);

            double newCoefficent = (double) rounded / Math.pow(10, afterComma);

            expression.replace(key, newCoefficent);
        });
    }

    private static class TermComponent {
        String operator;
        String coefficientString;
        String key;
        boolean isFirst;
        String multiplier = "*";

        StringBuilder termRep = new StringBuilder();

        private TermComponent(String coefficientString, String key) {
            this.operator = "";
            this.multiplier = "*";
            this.isFirst = false;
            this.coefficientString = coefficientString;
            this.key = key;
        }

        private void append(String str) {
            termRep.append(str);
        }

        private void negate() {
            coefficientString = coefficientString.substring(1);
        }
    }

    @Override
    public String toString() {

        if(expression.isEmpty()) return "0";
        removeZeroCoefficents(this);

        StringBuilder expressionString = new StringBuilder();

        AtomicInteger counter = new AtomicInteger(1);

        expression.forEach((key, coefficient) -> {

            TermComponent term = new TermComponent(coefficient.toString(), key);

            if(counter.get() == 1) {
                term.isFirst = true;
            }

            if(key.equals("num")) {
                term.key = "";
                term.multiplier = "";
            }

            if(coefficient < 0) {
                term.operator = "-";
                term.negate();
            } else if(coefficient > 0) {
                term.operator = "+";
            }

            expressionString.append(buildTermString(term));

            counter.getAndIncrement();
        });

        return expressionString.toString().strip();
    }

    private String buildTermString(TermComponent term) {
        if(term.isFirst) {
            if(term.operator.equals("-")) {
                term.append(term.operator + term.coefficientString + term.multiplier + term.key);
            } else {
                term.append(term.coefficientString+ term.multiplier+term.key);
            }
        } else {
            term.append(" " + term.operator + " " + term.coefficientString  + term.multiplier + term.key);
        }

        return term.termRep.toString();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true ;
        if (o == null || getClass() != o.getClass()) return false;
        LinearExpression that = (LinearExpression) o;

        removeZeroCoefficents(this);
        removeZeroCoefficents(that);

        return expression.equals(that.expression);
    }

    @Override
    public int hashCode() {
        removeZeroCoefficents(this);
        return Objects.hashCode(expression);
    }
}
