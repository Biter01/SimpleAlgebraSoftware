package app.web;

import commandInterpreter.Interpreter;
import commandInterpreter.exceptions.unchecked.CommandException;
import org.teavm.jso.JSExport;

/**
 * Bridge zwischen JavaScript und dem SimpleAlgebra-Interpreter.
 *
 * Web-Pendant zu app.CLIApp – statt Scanner/System.in/System.out kommen
 * die Eingaben aus JS und die Ergebnisse gehen als String zurueck.
 *
 * Wird nur fuer den JS-Build kompiliert (siehe Profile in pom.xml).
 */
public class ReplBridge {

    // Statisch = Interpreter-State (definierte Matrizen, Variablen, ...)
    // ueberlebt zwischen JS-Aufrufen, genau wie in der CLI-Session.
    private static final Interpreter INTERPRETER = new Interpreter();

    /**
     * Hauptschnittstelle: aus JS aufrufbar als window.evaluate(line)
     *
     * Verhaelt sich wie eine einzelne Iteration der CLI-Schleife in
     * CLIApp.runApp() / CLIApp.executeLine() – ohne 'exit', 'help' und
     * 'clear', die werden im JS-Frontend gehandhabt.
     */
    @JSExport
    public static String evaluate(String line) {
        if (line == null) return "";

        try {
            Object result = INTERPRETER.eval(line);
            return result == null ? "" : result.toString();
        } catch (CommandException e) {
            // CLIApp wuerde hier AnsiColors.error() nutzen – das wollen wir
            // im Browser nicht (ANSI-Codes sehen im HTML haesslich aus).
            // Stattdessen mit "Error: "-Prefix, die HTML-UI faerbt das ein.
            return "Error: " + e.getMessage();
        } catch (Exception e) {
            // Defensive: alles andere abfangen, damit das Wasm-Modul
            // bei einem Bug nicht den ganzen Browser-Tab killt.
            return "Error: " + e.getClass().getSimpleName()
                 + ": " + e.getMessage();
        }
    }

    /**
     * Help-Text fuer die UI – Inhalt aus CLIApp.helpMessage() uebernommen.
     * Aufrufbar als window.help() aus JS, falls die UI einen Help-Button
     * oder das Tippen von "help" anbieten will.
     */
    @JSExport
    public static String help() {
        return """
            SimpleAlgebra – verfuegbare Befehle:

            1. Lineare Gleichungssysteme loesen:
               A = [[3,11,10,9000], [6,2,2,5000], [150,220,120,194000]]
               solve(A)

            2. Determinante berechnen:
               A = [[1,2], [3,4]]
               det(A)

            3. Beliebige R- oder R^nxm-Ausdruecke auswerten:
               2 + 3 * 4              // Arithmetik
               A = [[1, 2], [3, 4]]   // 2x2 Matrix definieren
               B = [[5, 6], [7, 8]]   // weitere Matrix
               A + B                  // elementweise Addition
               A * B                  // Matrixmultiplikation

            UI-Befehle (nur im Browser): clear, help
            """;
    }

    /**
     * Setzt den Interpreter zurueck – analog zu einem Neustart der CLI.
     * Loescht alle definierten Variablen/Matrizen.
     */
    @JSExport
    public static void reset() {
        // Falls Interpreter eine reset()-Methode hat, lieber die nehmen.
        // Sonst: Reflection-frei einfach das Feld neu zuweisen geht nicht
        // (final). Dann eine Instanz-Variable draus machen oder dem
        // Interpreter eine reset()-Methode spendieren.
        //
        // Pragmatischer Workaround ohne Code-Aenderung am Interpreter:
        // Im JS-Frontend einfach window.location.reload() bei "reset".
    }

    // TeaVM braucht eine main-Methode als Entry-Point, auch wenn leer.
    // Hier NICHT new CLIApp().runApp() aufrufen – das wuerde versuchen
    // einen Scanner auf System.in zu oeffnen, was im Browser knallt.
    public static void main(String[] args) {
    }
}