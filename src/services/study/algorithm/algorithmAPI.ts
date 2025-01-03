import { api } from '@/services/common/axiosInstance';
import { PageResponse } from '@/types/common/type';
import {
    AlgorithmConceptDetail,
    AlgorithmProblem,
    AlgorithmSolutionDetail,
} from '@/types/study';

export const getAlgorithmConceptsAPI = async (generationId: string) => {
    const { data } = await api.get('/algorithm/guide', {
        params: {
            generationId,
        },
    });
    return data;
};

export const getAlgorithmConceptDetailAPI = async (
    conceptId: string,
    bookmark: boolean,
) => {
    const { data } = await api.get(`/algorithm/guide/${conceptId}`, {
        params: {
            bookmark,
        },
    });
    return data;
};

export const createAlgorithmConceptAPI = async (
    generationId: string,
    algorithmConcept: AlgorithmConceptDetail,
): Promise<AlgorithmConceptDetail> => {
    const { data } = await api.post(
        `/algorithm/guide?generationId=${generationId}`,
        algorithmConcept,
    );
    return data;
};

export const updateAlgorithmConceptAPI = async (
    id: string,
    algorithmConcept: AlgorithmConceptDetail,
): Promise<AlgorithmConceptDetail> => {
    const { data } = await api.put(`/algorithm/guide/${id}`, algorithmConcept);
    return data;
};

export const getAlgorithmProblemsAPI = async (
    page: number,
    size: number,
): Promise<PageResponse<AlgorithmProblem>> => {
    const { data } = await api.get('/algorithm/problem', {
        params: {
            page,
            size,
        },
    });
    return data;
};

export const createAlgorithmSolutionAPI = async (
    problemId: string,
    algorithmSolution: AlgorithmSolutionDetail,
): Promise<AlgorithmSolutionDetail> => {
    const { data } = await api.post(
        `/algorithm/problem/${problemId}/solution`,
        algorithmSolution,
    );
    return data;
};

export const updateAlgorithmSolutionAPI = async (
    problemId: string,
    solutionId: string,
    algorithmSolution: AlgorithmSolutionDetail,
): Promise<AlgorithmSolutionDetail> => {
    const { data } = await api.put(
        `/algorithm/problem/${problemId}/solution/${solutionId}`,
        algorithmSolution,
    );
    return data;
};
