import { Suspense } from 'react';
import { BarLoader } from 'react-spinners';
import NotFoundPage from '@/features/Notfound';

// public chứa những router không cần đăng nhập hoặc web view
export const PublicRoutes = [{ path: '*', element: <NotFoundPage /> }];

const Lazy = ({ children }: { children: any }) => {
    return (
        <Suspense
            fallback={
                <div
                    style={{
                        height: '100vh',
                        width: '100%',
                        backgroundColor: 'rgba(0,0,0,.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <BarLoader />
                </div>
            }
        >
            {children}
        </Suspense>
    );
};

export default Lazy;
