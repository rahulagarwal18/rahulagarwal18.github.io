import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    const roles = [
        'AI/ML Engineer',
        'Full Stack Developer',
        'IoT Innovator',
        'Award-Winning Developer'
    ];
    const [currentRole, setCurrentRole] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hero">
            <div className="hero-content">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="gradient-text">Rahul Agarwal</span>
                </motion.h1>

                <div className="subtitle-container">
                    <motion.p
                        key={currentRole}
                        className="subtitle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="role-text">{roles[currentRole]}</span>
                    </motion.p>
                </div>

                <motion.p
                    className="description"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                >
                    Building intelligent solutions that bridge technology and innovation.
                    Specialized in AI/ML, IoT systems, and scalable web applications.
                </motion.p>

                <motion.div
                    className="contact-links"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <motion.a
                        href="tel:+919401203345"
                        className="contact-link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="icon">📞</span>
                        <span>Call Me</span>
                    </motion.a>

                    <motion.a
                        href="mailto:rahulagaral1@gmail.com"
                        className="contact-link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="icon">✉️</span>
                        <span>Email</span>
                    </motion.a>

                    <motion.a
                        href="https://linkedin.com/in/rahul-agarwal-1b888823a"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="icon">💼</span>
                        <span>LinkedIn</span>
                    </motion.a>

                    <motion.a
                        href="https://github.com/rahulagarwal18"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="icon">💻</span>
                        <span>GitHub</span>
                    </motion.a>
                </motion.div>

                <motion.div
                    className="scroll-indicator"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        y: [0, 10, 0]
                    }}
                    transition={{
                        opacity: { delay: 2, duration: 1 },
                        y: {
                            repeat: Infinity,
                            duration: 1.5,
                            ease: 'easeInOut'
                        }
                    }}
                >
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                    <p>Scroll to explore</p>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
