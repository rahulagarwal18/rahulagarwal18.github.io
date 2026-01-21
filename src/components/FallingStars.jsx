import { useMemo } from 'react';
import './FallingStars.css';

const FallingStars = () => {
    const stars = useMemo(() => {
        return Array.from({ length: 80 }).map((_, i) => ({
            id: i,
            startLeft: Math.random() * 120 - 10, // Random position across entire width
            xOffset: Math.random() * 60 - 30, // Random horizontal drift (-30vw to +30vw)
            delay: i * 0.5 + Math.random() * 0.4, // Staggered delays
            duration: Math.random() * 4 + 14, // 14-18 seconds (slower)
            size: Math.random() * 2.5 + 1.5,
            opacity: Math.random() * 0.5 + 0.3,
        }));
    }, []);

    return (
        <div className="falling-stars-container">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="falling-star"
                    style={{
                        left: `${star.startLeft}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animation: `fall${star.id} ${star.duration}s linear ${star.delay}s infinite`,
                        opacity: star.opacity,
                        boxShadow: `0 0 ${star.size}px #ffffff, 0 0 ${star.size * 2}px rgba(255,255,255,0.5)`,
                        '--x-offset': `${star.xOffset}vw`,
                    }}
                />
            ))}
            <style>{stars.map((star) => `
                @keyframes fall${star.id} {
                    0% {
                        top: -10px;
                        transform: translateX(0) translateY(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        top: 100vh;
                        transform: translateX(var(--x-offset)) translateY(0);
                        opacity: 0;
                    }
                }
            `).join('')}</style>
        </div>
    );
};

export default FallingStars;
