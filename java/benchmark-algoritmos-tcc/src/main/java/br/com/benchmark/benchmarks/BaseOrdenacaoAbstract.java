package br.com.benchmark.benchmarks;

import org.openjdk.jmh.annotations.Level;
import org.openjdk.jmh.annotations.Param;
import org.openjdk.jmh.annotations.Scope;
import org.openjdk.jmh.annotations.Setup;
import org.openjdk.jmh.annotations.State;

import java.util.Random;

@State(Scope.Benchmark)
public abstract class BaseOrdenacaoAbstract extends BaseBenchmark {

    @Param({"500000"})
    protected int lengthArray;
    protected int[] arrayAleatorio;
    protected int[] arrayParaOrdenar;

    @Setup(Level.Trial)
    public void setupTrial() {
        arrayAleatorio = new int[lengthArray];
        Random random = new Random();
        for (int i = 0; i < lengthArray; i++) {
            arrayAleatorio[i] = random.nextInt(lengthArray);
        }
    }
}