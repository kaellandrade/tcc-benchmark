package br.com.benchmark.benchmarks.O_n;

import br.com.benchmark.algoritmos.AlgoritmosLineares;
import br.com.benchmark.benchmarks.BaseBenchmark;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Level;
import org.openjdk.jmh.annotations.Param;
import org.openjdk.jmh.annotations.Setup;
import org.openjdk.jmh.infra.Blackhole;

import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.Set;

public class RemoverDuplicatasComHashSet extends BaseBenchmark {

    @Param({"1000"})
    protected int lengthArray;
    String[] possveisDuplicados;

    private List<String> list;

    @Setup(Level.Trial)
    public void setup() {
        possveisDuplicados = new String[lengthArray];
        Random random = new Random();
        for (int i = 0; i < lengthArray; i++) {
            int valorAleatorio = random.nextInt(lengthArray);
            possveisDuplicados[i] = String.valueOf(valorAleatorio);
        }
        list = Arrays.asList(possveisDuplicados);
    }

    @Benchmark
    public void removerDuplicatas(Blackhole bh) {
        bh.consume(AlgoritmosLineares.removerDuplicadasComSet(list));
    }

}
