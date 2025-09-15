package structures;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicInteger;

public class LinearExpression {
    private final Map<String, Double> expression = new TreeMap<>((s1, s2) -> {
        if(s1.length() != s2.length()) {
            return s1.length() - s2.length();
        } else {
            return s1.compareTo(s2);
        }
    });

    private static class Term {
        String operator;
        String coefficientString;
        String key;
        boolean isFirst;
        String multiplier = "*";

        StringBuilder termRep = new StringBuilder();

        private Term(String coefficientString, String key) {
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

    public LinearExpression(String inputStr) {
        // "-" durch "+-" ersetzen, damit split funktioniert
        if(inputStr.isEmpty()) {
            return;
        }

        String[] terms = getTerms(inputStr);
        convertToExpression(terms);
    }

    private String[] getTerms(String inputStr) {

        String replacedString = inputStr.replace("-", "+-");

        String normalizedString;

        if(replacedString.charAt(0) == '+') {
            normalizedString = replacedString.substring(1);
        } else {
            normalizedString = replacedString;
        }

        normalizedString = normalizedString.replace(" ", "");

        return normalizedString.split("\\+");
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

    public LinearExpression add(LinearExpression other) {
        LinearExpression result = new LinearExpression("");
        result.expression.putAll(this.expression);

        other.expression.forEach((key, coefficient) ->
                result.expression.merge(key, coefficient, Double::sum)
        );

        removeZeroCoefficents(result);

        return result;
    }

    public LinearExpression subtract(LinearExpression other) {
        LinearExpression result = new LinearExpression("");
        result.expression.putAll(this.expression);

        other.expression.forEach((key, coefficient) ->
                result.expression.merge(key, -coefficient, Double::sum)
        );

        removeZeroCoefficents(result);

        return result;
    }

    public LinearExpression multiplyConstant(double c) {
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

    @Override
    public String toString() {

        if(expression.isEmpty()) return "0";

        StringBuilder expressionString = new StringBuilder();

        AtomicInteger counter = new AtomicInteger(1);

        expression.forEach((key, coefficient) -> {

            Term term = new Term(coefficient.toString(), key);

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
            } else {
                term.operator = "";
                term.coefficientString = "";
                term.key = "";
                term.multiplier = "";
            }

            expressionString.append(buildTermString(term));

            counter.getAndIncrement();
        });

        return expressionString.toString();
    }

    private String buildTermString(Term term) {
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
}
