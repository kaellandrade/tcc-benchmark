package br.com.benchmark.benchmarks;

import org.openjdk.jmh.annotations.Level;
import org.openjdk.jmh.annotations.Param;
import org.openjdk.jmh.annotations.Setup;

public abstract class BaseBuscaAbstract extends BaseBenchmark {

    @Param({ "1000", "1000000", "10000000" })
    protected int lengthArray;
    protected int[] array;
    protected int elementoCasoMedio;

    @Setup(Level.Trial)
    public void setup() {
        // Cria o array com base no parâmetro 'lengthArray'
        array = new int[lengthArray];
        for (int i = 0; i < lengthArray; i++) {
            array[i] = i * 2; // Preenche com números pares para ter um valor "não encontrado" garantido
        }

        elementoCasoMedio = array[lengthArray / 2];
    }

}