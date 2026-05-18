import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';

interface PageTransitionProps {
    children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    const location = useLocation();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [displayLocation, setDisplayLocation] = useState(location);

    useEffect(() => {
        if (location.pathname !== displayLocation.pathname) {
            // Start transition
            setIsTransitioning(true);

            // Artificial delay for the loader to be visible and smooth
            const timer = setTimeout(() => {
                setDisplayLocation(location);
                setIsTransitioning(false);
                window.scrollTo(0, 0); // Scroll to top on page change
            }, 600); // 0.6 seconds is enough for a snappy feel

            return () => clearTimeout(timer);
        }
    }, [location.pathname, displayLocation.pathname]);

    return (
        <>
            {isTransitioning ? (
                <div className="flex items-center justify-center h-[100dvh] w-full bg-white fixed inset-0 z-[9999]">
                    <Loader />
                </div>
            ) : (
                <div className="fadeIn">
                    {children}
                </div>
            )}
        </>
    );
}
