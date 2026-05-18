import { useEffect } from 'react';

interface LoaderProps {
    onComplete?: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
    useEffect(() => {
        if (onComplete) {
            const timer = setTimeout(() => {
                onComplete();
            }, 2000); // Wait for initial animation
            return () => clearTimeout(timer);
        }
    }, [onComplete]);

    return (
        <div className="loader-container">
            <div className="three-body">
                <div className="three-body__dot" />
                <div className="three-body__dot" />
                <div className="three-body__dot" />
            </div>
        </div>
    );
}

export default Loader;
