import { motion } from 'framer-motion';

const Leadership = () => {
    const leadership = [
        {
            title: 'Millennium Fellow (2025)',
            description: 'Selected globally to drive initiatives aligned with UN Sustainable Development Goals.',
            icon: '🌍'
        },
        {
            title: 'Student Council Representative',
            description: 'Advocated student interests and organized departmental events.',
            icon: '🎓'
        },
        {
            title: 'Coordinator, Centre for AI',
            description: 'Led AI workshops, hackathons, and industry-academia engagements.',
            icon: '🤖'
        },
        {
            title: 'Department Representative, SDG Cell',
            description: 'Spearheaded sustainability campaigns and awareness programs.',
            icon: '♻️'
        }
    ];

    return (
        <section className="content">
            <motion.div
                className="glass-card"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Leadership & Impact
                </motion.h2>

                <div className="leadership-grid">
                    {leadership.map((item, index) => (
                        <motion.div
                            key={index}
                            className="leadership-item"
                            initial={{ opacity: 0, x: -50, rotateY: -15 }}
                            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.15,
                                duration: 0.5,
                                type: 'spring',
                                stiffness: 100
                            }}
                            whileHover={{
                                x: 12,
                                scale: 1.03,
                                boxShadow: '0 12px 40px rgba(255, 0, 255, 0.3)',
                                borderLeftWidth: '6px'
                            }}
                        >
                            <motion.h4
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 + 0.2 }}
                            >
                                <span style={{ marginRight: '0.5rem', fontSize: '1.4rem' }}>{item.icon}</span>
                                {item.title}
                            </motion.h4>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 + 0.3 }}
                            >
                                {item.description}
                            </motion.p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Leadership;
