package br.com.benchmark.benchmarks.O_n_log_n;

import br.com.benchmark.algoritmos.AlgoritmosNLogN;
import br.com.benchmark.benchmarks.BaseOrdenacaoAbstract;
import br.com.benchmark.benchmarks.CasosInterfaces;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.infra.Blackhole;


public class QuicksortJavaDualPivot extends BaseOrdenacaoAbstract implements CasosInterfaces {
    @Benchmark
    public void melhorCaso(Blackhole bh) {
        arrayParaOrdenar = arrayOrdenado.clone();
        bh.consume(AlgoritmosNLogN.quicksortInternoDoJava(arrayParaOrdenar));
    }

    @Benchmark
    public void casoMedio(Blackhole bh) {
        arrayParaOrdenar = arrayAleatorio.clone();
        bh.consume(AlgoritmosNLogN.quicksortInternoDoJava(arrayParaOrdenar));
    }

    @Benchmark
    public void piorCaso(Blackhole bh) {
        arrayParaOrdenar = arrayInvertido.clone();
        bh.consume(AlgoritmosNLogN.quicksortInternoDoJava(arrayParaOrdenar));
    }
}
