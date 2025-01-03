import { addBookMarkAPI } from '@/services/user';
import { useModalStore } from '@/stores/modalStore';
import { contentType } from '@/types/study/types';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useAuth } from './useAuth';

interface UseContentDetailProps<T> {
    contentType: contentType;
    contentId: string;
    getDetailAPI: (id: string) => Promise<T>;
    deleteAPI: (id: string) => Promise<void>;
    navigateAfterDelete: string;
}

export const useContentDetail = <T>({
    contentType,
    contentId,
    getDetailAPI,
    deleteAPI,
    navigateAfterDelete,
}: UseContentDetailProps<T>) => {
    const navigate = useNavigate();
    const { userInfo } = useAuth();
    const { openModal, closeModal } = useModalStore();

    const { data } = useQuery<T>({
        queryKey: [contentType, contentId],
        queryFn: () => getDetailAPI(contentId),
    });

    const handleDelete = async () => {
        try {
            openModal({
                title: '컨텐츠 삭제',
                icon: 'warning',
                subTitle: '정말로 삭제하시겠습니까?',
                onConfirmClick: async () => {
                    await deleteAPI(contentId);
                    navigate(navigateAfterDelete);
                },
                onCancelClick: () => {
                    closeModal();
                },
            });
        } catch (error) {
            console.error('삭제 실패', error);
        }
    };

    const handleEdit = () => {
        navigate('edit');
    };

    const handleLike = () => {
        if (!userInfo) return;
        addBookMarkAPI(userInfo.userId, {
            contentType,
            contentId,
        });
    };

    return {
        data,
        handleDelete,
        handleEdit,
        handleLike,
    };
};
