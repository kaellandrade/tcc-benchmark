package br.com.benchmark.benchmarks;

import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.infra.Blackhole;

import br.com.benchmark.algoritmos.AlgoritmosConstantes;

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;

@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@State(Scope.Benchmark)
@Fork(value = 1)
@Warmup(iterations = 5)
@Measurement(iterations = 5)
public class MainBenchmarkConstantes {

    // Valores pequeno, médio e grande
    @Param({ "10", "100000", "999999999" })
    private int valoresParaAlgoritmosConstantes;

    private int[] dataForSwap;

    // Um array bem grande para tornar os efeitos de cache mais visíveis
    private final int ARRAY_SIZE = 10_000_000;
    private int[] dataArray;

    // Usaremos @Param para testar o acesso no início, meio e fim do array
    @Param({ "0", "4999999", "9999999" })
    private int indexToAccess;

    @Param({ "100", "10000", "1000000" })
    private int initialSize;

    private Stack<String> originalPilha; // O "molde"
    private Stack<String> pilhaParaTeste; // A cópia de trabalho
    private final String ELEMENTO_PARA_INSERIR = "Novo Elemento";

    static Map<Integer, String> hashMap;

    @Setup(Level.Trial)
    public void setupPilha() {
        // 1. Criamos o molde uma vez
        originalPilha = new Stack<>();
        for (int i = 0; i < initialSize; i++) {
            originalPilha.push("Elemento " + i);
        }
    }

    @Setup(Level.Invocation)
    public void setupResetPilha() {
        // Antes de cada chamada, clonamos o molde para a cópia de trabalho
        pilhaParaTeste = (Stack<String>) originalPilha.clone();
    }

    @Setup(Level.Invocation)
    public void setupHashMap() {
        hashMap = new HashMap<>(initialSize);
        for (int i = 0; i < initialSize; i++) {
            hashMap.put(i, ELEMENTO_PARA_INSERIR);
        }
    }

    @Setup(Level.Invocation)
    public void setupSwap() {
        // Prepara um array simples antes de cada chamada
        // Level.Invocation garante que o estado seja sempre o mesmo
        dataForSwap = new int[] { 10, 20, 30, 40, 50 };
    }

    @Setup(Level.Trial)
    public void setupArrayAccess() {
        // Criar e preencher o array uma única vez por experimento
        dataArray = new int[ARRAY_SIZE];
        // Preenche com valores aleatórios
        for (int i = 0; i < ARRAY_SIZE; i++) {
            dataArray[i] = ThreadLocalRandom.current().nextInt();
        }
    }

    @Benchmark
    public boolean isEven_O_1() {
        return AlgoritmosConstantes.isEven(valoresParaAlgoritmosConstantes);
    }

    @Benchmark
    public void swapInArray_O_1(Blackhole bh) {
        // Chamamos o método público e estático que realmente funciona
        AlgoritmosConstantes.swapInArray(dataForSwap, 0, 1);

        // Usamos o Blackhole para garantir que o JIT não elimine a operação
        bh.consume(dataForSwap);
    }

    @Benchmark
    public int arrayAccess_O_1() {
        // Chama o método estático e público e retorna o valor
        return AlgoritmosConstantes.acessarElementoArray(indexToAccess, dataArray);
    }

    @Benchmark
    public void push_O_1() {
        AlgoritmosConstantes.inserirNaPilha(ELEMENTO_PARA_INSERIR, pilhaParaTeste);
    }

    @Benchmark
    public void pop_O_1() {
        AlgoritmosConstantes.removerNaPilha(pilhaParaTeste);
    }

    @Benchmark
    public void acessar_hashMap_O_1() {
        AlgoritmosConstantes.acessoHashMap(initialSize, hashMap);
    }

}