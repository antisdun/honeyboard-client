import { Button, SelectOption } from '@/components/atoms';
import { TabNavigation } from '@/components/molecules';
import { Header } from '@/components/organisms';
import {
    ProjectCardSkeletonList,
    WebConceptCards,
} from '@/components/templates';
import { useAuth } from '@/hooks/useAuth';
import { useGenerationStore } from '@/stores/generationStore';
import { convertSelectType } from '@/utils/convertSelectType';
import { Suspense, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const WebGuideList = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { userInfo } = useAuth();
    const { generationList } = useGenerationStore();

    const [generationId, setGenerationId] = useState<string | null>(
        userInfo!.generationId,
    );
    const userRole = userInfo?.role;

    const ROUTES = [
        {
            path: 'study/web/concept',
            name: '웹 개념',
            isActive: true,
        },
        {
            path: 'study/web/recommend',
            name: '웹 추천',
            isActive: false,
        },
    ];

    return (
        <>
            <Header
                titleProps={{ title: '웹 개념' }}
                BreadcrumbProps={{ pathname }}
            >
                <div className="flex items-end justify-between">
                    <TabNavigation routes={ROUTES} />

                    <div className="flex gap-4">
                        {userRole === 'ADMIN' && (
                            <Button
                                onClick={() => {
                                    navigate('create');
                                }}
                            >
                                글작성
                            </Button>
                        )}
                        <SelectOption
                            id="generation"
                            name="generation"
                            placeholder="기수"
                            options={convertSelectType(generationList)}
                            value={generationId}
                            onChange={(e) => {
                                setGenerationId(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </Header>
            <Suspense fallback={<ProjectCardSkeletonList />}>
                <WebConceptCards generationId={generationId} />
            </Suspense>
        </>
    );
};

export default WebGuideList;
