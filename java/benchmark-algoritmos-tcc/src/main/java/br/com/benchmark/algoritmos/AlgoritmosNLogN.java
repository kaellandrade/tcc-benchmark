package br.com.benchmark.algoritmos;

import java.util.Arrays;

public class AlgoritmosNLogN {
    // Método público que inicia o processo
    public static int[] mergeSort(int[] data) {
        // 1. Crie o array auxiliar APENAS UMA VEZ.
        int[] helper = new int[data.length];
        sortArray(data, helper, 0, data.length - 1);
        return data;
    }

    // A função recursiva agora aceita o array auxiliar
    private static void sortArray(int[] data, int[] helper, int low, int high) {
        if (low < high) {
            int middle = (low + high) / 2;
            sortArray(data, helper, low, middle);      // Ordena a metade da esquerda
            sortArray(data, helper, middle + 1, high); // Ordena a metade da direita
            merge(data, helper, low, middle, high);    // Junta as duas metades
        }
    }

    private static void merge(int[] data, int[] helper, int low, int middle, int high) {
        // 2. Copie ambas as metades para o array auxiliar
        for (int i = low; i <= high; i++) {
            helper[i] = data[i];
        }

        int helperLeft = low;
        int helperRight = middle + 1;
        int current = low;

        // 3. Itere sobre o array auxiliar, compare as metades e copie de volta
        //    para o array original na ordem correta.
        while (helperLeft <= middle && helperRight <= high) {
            if (helper[helperLeft] <= helper[helperRight]) {
                data[current] = helper[helperLeft];
                helperLeft++;
            } else {
                data[current] = helper[helperRight];
                helperRight++;
            }
            current++;
        }

        // Copia o resto da metade esquerda (se houver)
        int remaining = middle - helperLeft;
        for (int i = 0; i <= remaining; i++) {
            data[current + i] = helper[helperLeft + i];
        }
    }

    public static int[] quicksortInternoDoJava(int[] data) {
        Arrays.sort(data);
        return data;
    }


}
