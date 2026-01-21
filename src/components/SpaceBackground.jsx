import { useEffect, useRef } from 'react';

const SpaceBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Stars
    const stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        opacity: Math.random(),
        speed: Math.random() * 0.5,
      });
    }

    // Meteors
    const meteors = [];
    const createMeteor = () => {
      meteors.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        length: Math.random() * 80 + 20,
        speed: Math.random() * 10 + 5,
        opacity: 1,
      });
    };

    // Create meteors periodically
    setInterval(createMeteor, 3000);

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        star.opacity += star.speed * 0.01;
        if (star.opacity > 1 || star.opacity < 0) star.speed *= -1;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.opacity)})`;
        ctx.fill();
      });

      // Draw meteors
      meteors.forEach((meteor, index) => {
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x + meteor.length, meteor.y + meteor.length);
        
        const gradient = ctx.createLinearGradient(
          meteor.x,
          meteor.y,
          meteor.x + meteor.length,
          meteor.y + meteor.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        meteor.x += meteor.speed;
        meteor.y += meteor.speed;
        meteor.opacity -= 0.01;

        if (meteor.opacity <= 0) {
          meteors.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="space-background">
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      
      {/* Planets */}
      <div className="planet planet-1"></div>
      <div className="planet planet-2"></div>
      <div className="planet planet-3"></div>
      
      {/* Satellite */}
      <div className="satellite">
        <div className="satellite-body">
          <div className="satellite-panel left"></div>
          <div className="satellite-panel right"></div>
        </div>
      </div>
    </div>
  );
};

export default SpaceBackground;
