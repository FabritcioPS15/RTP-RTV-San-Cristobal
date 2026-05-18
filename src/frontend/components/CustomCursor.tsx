import { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        const handleLinkHover = () => setIsHovering(true);
        const handleLinkLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', updateCursor);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Add listeners to clickable elements
        const clickables = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
        clickables.forEach((el) => {
            el.addEventListener('mouseenter', handleLinkHover);
            el.addEventListener('mouseleave', handleLinkLeave);
        });

        // Mutation observer to handle dynamically added elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    const newClickables = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
                    newClickables.forEach((el) => {
                        el.removeEventListener('mouseenter', handleLinkHover);
                        el.removeEventListener('mouseleave', handleLinkLeave);
                        el.addEventListener('mouseenter', handleLinkHover);
                        el.addEventListener('mouseleave', handleLinkLeave);
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', updateCursor);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            observer.disconnect();

            clickables.forEach((el) => {
                el.removeEventListener('mouseenter', handleLinkHover);
                el.removeEventListener('mouseleave', handleLinkLeave);
            });
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <style>{`
                body, a, button, input, textarea, select, [role="button"] {
                    cursor: none !important;
                }
            `}</style>
            <div
                className="fixed pointer-events-none z-[9999] transition-all duration-200 ease-out"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div className={`
                    rounded-full transition-all duration-200
                    ${isHovering ? 'w-3 h-3 bg-orange-500' : 'w-2 h-2 bg-white'}
                    border-2 border-black
                `} />
            </div>
        </>
    );
}
