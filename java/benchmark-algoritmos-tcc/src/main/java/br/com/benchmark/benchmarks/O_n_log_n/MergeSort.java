package br.com.benchmark.benchmarks.O_n_log_n;

import br.com.benchmark.algoritmos.AlgoritmosNLogN;
import br.com.benchmark.benchmarks.BaseOrdenacaoAbstract;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.infra.Blackhole;


public class MergeSort extends BaseOrdenacaoAbstract {
    @Benchmark
    public void ordenarArrayMergeSort(Blackhole bh) {
        arrayParaOrdenar = arrayAleatorio.clone();
        bh.consume(AlgoritmosNLogN.mergeSort(arrayParaOrdenar));
    }
}
