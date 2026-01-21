import { motion } from 'framer-motion';

const Education = () => {
    const education = [
        {
            degree: 'Bachelor of Computer Applications (BCA)',
            institution: 'CHRIST (Deemed to be University), Yeshwantpur Campus',
            location: 'Bengaluru, India',
            duration: 'June 2023 - April 2026'
        },
        {
            degree: 'Commerce (with Information Practices)',
            institution: 'Saint Paul School',
            location: 'Beawar, Rajasthan',
            duration: 'Completed: 2023'
        }
    ];

    const certifications = [
        'Advanced Python Programming - Government of Rajasthan',
        'TensorFlow for Deep Learning - CHRIST (Deemed to be University)',
        'Power BI for Beginners - CHRIST (Deemed to be University)',
        'Backend Frameworks & APIs (First Class) - freeCodeCamp, CHRIST (Deemed to be University)'
    ];

    return (
        <section className="content">
            <motion.div
                className="glass-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Education
                </motion.h2>

                {education.map((edu, index) => (
                    <motion.div
                        key={index}
                        className="timeline-item"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        whileHover={{ x: 10, scale: 1.02 }}
                    >
                        <h3>{edu.degree}</h3>
                        <p className="timeline-date">{edu.duration}</p>
                        <p className="timeline-location">{edu.institution} • {edu.location}</p>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                className="glass-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Certifications
                </motion.h2>

                <div className="leadership-grid">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            className="leadership-item"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            whileHover={{
                                x: 8,
                                scale: 1.02,
                                boxShadow: '0 8px 30px rgba(255, 0, 255, 0.3)'
                            }}
                        >
                            <h4>📜 {cert}</h4>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Education;
