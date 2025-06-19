package br.com.benchmark.benchmarks.O_1;

import java.util.concurrent.ThreadLocalRandom;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Level;
import org.openjdk.jmh.annotations.Param;
import org.openjdk.jmh.annotations.Setup;
import org.openjdk.jmh.infra.Blackhole;

import br.com.benchmark.algoritmos.AlgoritmosConstantes;
import br.com.benchmark.benchmarks.BaseBenchmark;

public class AccessValueArray  extends BaseBenchmark{
    private int[] dataArray;

    @Param({ "50", "9999" })
    private int indexToAccess;

    private static final int ARRAY_SIZE = 10_000;

    @Setup(Level.Trial)
    public void setupTrialState() {
        // Setup para o acesso ao array
        dataArray = new int[ARRAY_SIZE];
        for (int i = 0; i < ARRAY_SIZE; i++) {
            dataArray[i] = ThreadLocalRandom.current().nextInt();
        }

    }

    @Benchmark
    public void arrayAccess_O_1(Blackhole bh) {
        bh.consume(AlgoritmosConstantes.acessarElementoArray(indexToAccess, dataArray));
    }
}
