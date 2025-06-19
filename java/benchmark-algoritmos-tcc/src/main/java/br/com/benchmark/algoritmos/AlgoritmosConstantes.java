package br.com.benchmark.algoritmos;

import java.util.Map;
import java.util.Stack;

public class AlgoritmosConstantes {

    /**
     * Rerifica se um dano número é par.
     * 
     * @return
     */
    public static boolean isEven(int n) {
        return n % 2 == 0;
    }

    /**
     * Troca os valores em duas posições de um array.
     * Esta operação é O(1) e tem um efeito observável.
     */
    public static void swapInArray(int[] array, int i, int j) {
        if (array == null || i >= array.length || j >= array.length)
            return;

        int temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    public static int acessarElementoArray(int index, int[] arr) {
        // Validação de limites é uma boa prática, mas não afeta a complexidade
        if (arr == null || index < 0 || index >= arr.length) {
            throw new IndexOutOfBoundsException("Index " + index + " fora dos limites para o array.");
        }
        return arr[index];
    }

    /**
     * Recebe um elemento e insere na pilha
     * @param elementoInserir
     * @param pilha
     */
    public static void inserirNaPilha(String elementoInserir, Stack<String> pilha) {
        pilha.push(elementoInserir);

    }

    /**
     * Remove o elemento da pilha
     * @param pilha
     */
    public static String removerNaPilha(Stack<String> pilha) {
        return pilha.pop();

    }

    /**
     * Acessa e retorna o item da hashmap.
     * @param INDEX
     * @param hashMap
     * @return
     */
    public static String acessoHashMap(int INDEX, Map<Integer, String> hashMap) {
        return hashMap.get(INDEX);
    }

}
