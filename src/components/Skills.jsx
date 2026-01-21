import { motion } from 'framer-motion';

const Skills = () => {
    const skillsData = {
        languages: ['Python', 'Java', 'C#', 'JavaScript', 'SQL', 'HTML/CSS'],
        frameworks: ['Flask', 'React', 'Node.js', 'FastAPI', '.NET', 'Tkinter', 'DialogFlow'],
        libraries: ['OpenCV', 'TensorFlow', 'Keras', 'NumPy', 'Pandas', 'Matplotlib'],
        tools: ['Git', 'Visual Studio', 'VS Code', 'PyCharm', 'Android Studio', 'Power BI', 'Figma'],
        interests: ['AI/ML', 'AR/VR', 'Web Development', 'Automation', 'UI/UX'],
    };

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
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section className="content">
            <motion.div
                className="glass-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Skills & Expertise
                </motion.h2>

                <motion.div
                    className="skills-grid"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <motion.div className="skill-category" variants={item} whileHover={{ scale: 1.05, rotateY: 5 }}>
                        <h3>💻 Languages</h3>
                        <div className="skill-tags">
                            {skillsData.languages.map((skill, index) => (
                                <motion.span
                                    key={index}
                                    className="skill-tag"
                                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 212, 255, 0.3)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="skill-category" variants={item} whileHover={{ scale: 1.05, rotateY: 5 }}>
                        <h3>🚀 Frameworks</h3>
                        <div className="skill-tags">
                            {skillsData.frameworks.map((skill, index) => (
                                <motion.span
                                    key={index}
                                    className="skill-tag"
                                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 212, 255, 0.3)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="skill-category" variants={item} whileHover={{ scale: 1.05, rotateY: 5 }}>
                        <h3>📚 Libraries</h3>
                        <div className="skill-tags">
                            {skillsData.libraries.map((skill, index) => (
                                <motion.span
                                    key={index}
                                    className="skill-tag"
                                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 212, 255, 0.3)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="skill-category" variants={item} whileHover={{ scale: 1.05, rotateY: 5 }}>
                        <h3>🛠️ Tools</h3>
                        <div className="skill-tags">
                            {skillsData.tools.map((skill, index) => (
                                <motion.span
                                    key={index}
                                    className="skill-tag"
                                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 212, 255, 0.3)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="skill-category" variants={item} whileHover={{ scale: 1.05, rotateY: 5 }}>
                        <h3>⭐ Interests</h3>
                        <div className="skill-tags">
                            {skillsData.interests.map((skill, index) => (
                                <motion.span
                                    key={index}
                                    className="skill-tag"
                                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 212, 255, 0.3)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Skills;
