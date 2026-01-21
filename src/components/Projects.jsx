import { motion } from 'framer-motion';
import { useState } from 'react';

const Projects = () => {
    const [hoveredProject, setHoveredProject] = useState(null);

    const featuredProject = {
        title: 'Smart Navigation System',
        year: '2025',
        tech: 'IoT, Computer Vision, LED Display, 360° Camera, Real-time Navigation',
        description: 'Revolutionary campus navigation system using IoT technology with 360° view integration. The system captures real-time data of the entire college campus and provides intelligent navigation guidance through an autonomous car. Features include real-time point-to-point navigation, interactive LED displays showing information about intermediate locations, and seamless integration with campus infrastructure.',
        achievement: '🏆 1st Place at National Science Day 2025, CHRIST (Deemed to be University)',
        features: [
            '360° Campus View Integration',
            'IoT-based Real-time Data Collection',
            'Autonomous Navigation Car',
            'Interactive LED Information Display',
            'Point-to-Point Route Optimization',
            'Live Location Tracking'
        ],
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%, #f093fb 100%)',
        icon: '🚗'
    };

    const projects = [
        {
            title: 'Attendance Management System using Face Recognition',
            year: '2024',
            tech: 'Python, OpenCV, Flask, SQLite',
            description: 'Built a face-recognition attendance solution that automates identification and time logging with high accuracy. Implemented secure data storage and real-time camera engine with CSV exports.',
            achievement: '🥈 2nd Place at National Science Day 2024, CHRIST (Deemed to be University)',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            icon: '👤'
        },
        {
            title: 'Live OMR Scanner',
            year: '2025',
            tech: 'Python, OpenCV, SQLite',
            description: 'Engineered a real-time OMR scanning pipeline with live camera integration and automated result processing. Added dynamic answer-key recognition, CSV exports, and database persistence for large cohort evaluations.',
            achievement: null,
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            icon: '📝'
        },
        {
            title: 'AI Chatbot Development',
            year: '2025',
            tech: 'Python, NLP, Flask, DialogFlow',
            description: 'Developed an NLP-driven chatbot for real-time Q&A, integrating external APIs and custom intents/entities. Deployed on a dynamic dashboard with automation, designed fallback logic for reliability.',
            achievement: null,
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            icon: '🤖'
        },
        {
            title: 'Barcode Generator Web Tool',
            year: '2025',
            tech: 'Flask, ReportLab',
            description: 'Created a web app that generates barcodes with templated PDF export for inventory and library systems.',
            achievement: null,
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            icon: '📊'
        },
        {
            title: 'CNN Image Classifier',
            year: '2025',
            tech: 'Python, TensorFlow/Keras',
            description: 'Achieved ~85% test accuracy on CIFAR-10 via data augmentation, regularization, and hyperparameter tuning.',
            achievement: null,
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            icon: '🖼️'
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <section className="content" id="projects">
            <motion.div
                className="glass-card"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Featured Projects
                </motion.h2>

                {/* FEATURED PROJECT - Smart Navigation System */}
                <motion.div
                    className="featured-project"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, type: 'spring' }}
                    whileHover={{
                        scale: 1.02,
                        boxShadow: '0 30px 80px rgba(102, 126, 234, 0.4)',
                    }}
                    onHoverStart={() => setHoveredProject('featured')}
                    onHoverEnd={() => setHoveredProject(null)}
                >
                    <div className="featured-badge">
                        <motion.span
                            animate={{
                                scale: hoveredProject === 'featured' ? 1.1 : 1,
                                rotate: hoveredProject === 'featured' ? [0, 5, -5, 0] : 0
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            ⭐ AWARD WINNING PROJECT
                        </motion.span>
                    </div>

                    <div className="featured-content">
                        <div className="featured-left">
                            <motion.div
                                className="project-icon-large"
                                animate={{
                                    rotate: hoveredProject === 'featured' ? 360 : 0,
                                    scale: hoveredProject === 'featured' ? 1.2 : 1
                                }}
                                transition={{ duration: 0.6 }}
                            >
                                {featuredProject.icon}
                            </motion.div>

                            <h3>{featuredProject.title}</h3>
                            <p className="project-year">{featuredProject.year}</p>
                            <p className="project-tech">{featuredProject.tech}</p>

                            <div className="project-features">
                                <h4>Key Features:</h4>
                                <ul>
                                    {featuredProject.features.map((feature, idx) => (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <span className="feature-bullet">▸</span> {feature}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="featured-right">
                            <p className="project-description-large">
                                {featuredProject.description}
                            </p>

                            <motion.div
                                className="project-achievement-large"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                animate={{
                                    boxShadow: hoveredProject === 'featured'
                                        ? '0 0 30px rgba(255, 215, 0, 0.5)'
                                        : '0 0 0px rgba(255, 215, 0, 0)'
                                }}
                            >
                                {featuredProject.achievement}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* OTHER PROJECTS */}
                <motion.h3
                    className="section-subtitle"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ marginTop: '4rem', marginBottom: '2rem' }}
                >
                    Other Notable Projects
                </motion.h3>

                <motion.div
                    className="projects-grid"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="project-card"
                            variants={item}
                            whileHover={{
                                scale: 1.05,
                                y: -10,
                                boxShadow: '0 20px 60px rgba(0, 212, 255, 0.4)',
                            }}
                            onHoverStart={() => setHoveredProject(index)}
                            onHoverEnd={() => setHoveredProject(null)}
                        >
                            <motion.div
                                className="project-icon"
                                animate={{
                                    rotate: hoveredProject === index ? 360 : 0,
                                    scale: hoveredProject === index ? 1.2 : 1
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                {project.icon}
                            </motion.div>

                            <div
                                className="project-glow"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '4px',
                                    background: project.gradient,
                                }}
                            />

                            <h3>{project.title}</h3>
                            <p className="project-year">{project.year}</p>
                            <p className="project-tech">{project.tech}</p>
                            <p className="project-description">{project.description}</p>

                            {project.achievement && (
                                <motion.div
                                    className="project-achievement"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.4 }}
                                >
                                    {project.achievement}
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Projects;
