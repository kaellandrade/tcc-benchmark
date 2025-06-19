package br.com.benchmark.benchmarks.O_1;

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;
import java.util.concurrent.ThreadLocalRandom;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Level;
import org.openjdk.jmh.annotations.Param;
import org.openjdk.jmh.annotations.Setup;
import org.openjdk.jmh.infra.Blackhole;

import br.com.benchmark.algoritmos.AlgoritmosConstantes;
import br.com.benchmark.benchmarks.BaseBenchmark;

public class HashMapBenchmark extends BaseBenchmark {
    private int keyParaAcessoHashMap;
    private Map<Integer, String> hashMap;
    
    @Param({ "100", "1000" })
    private int initialSize;

    @Setup(Level.Trial)
    public void setupTrialState() {
        // Setup para o HashMap
        hashMap = new HashMap<>(initialSize);
        for (int i = 0; i < initialSize; i++) {
            hashMap.put(i, "Valor " + i);
        }
    }

    @Setup(Level.Invocation)
    public void setupInvocationState() {
        if (initialSize > 0) {
            keyParaAcessoHashMap = ThreadLocalRandom.current().nextInt(initialSize);
        }
    }

    @Benchmark
    public void acessar_hashMap_O_1(Blackhole bh) {
        bh.consume(AlgoritmosConstantes.acessoHashMap(keyParaAcessoHashMap, hashMap));
    }
}
