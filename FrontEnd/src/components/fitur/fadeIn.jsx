import React, { useRef, useEffect } from 'react';

function FadeInAnimation({ children, trigger }) {
    const containerRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.2 }
        );

        const elements = containerRef.current
            ? containerRef.current.querySelectorAll(".fade-in")
            : [];
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [trigger]);

    return <div ref={containerRef}>{children}</div>;
}

export default FadeInAnimation;