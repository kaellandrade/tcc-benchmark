package br.com.benchmark;

import org.teavm.interop.Export;

public class WasmEntry {

    // A anotação @Export torna este método "público" para o JavaScript.
    @Export(name = "soma")
    public static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println("Olá, mundo!");
    }
}