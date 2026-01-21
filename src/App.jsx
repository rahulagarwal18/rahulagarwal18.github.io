import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import ThreeBackground from './components/ThreeBackground';
import FallingStars from './components/FallingStars';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [typedCode, setTypedCode] = useState('');
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(30);

  const roles = 'Python Developer • Full Stack Developer • AI/ML Enthusiast • IoT Developer';
  
  const codeSnippets = [
    { lang: 'Python', code: 'def create_amazing():\n    skills = ["AI/ML", "Web Dev", "IoT"]\n    return "Rahul builds " + skills[0]\n\ndef innovate():\n    return "Building amazing things" 🚀\n\nresult = innovate()' },
    { lang: 'Java', code: 'public class Developer {\n    private String name = "Rahul";\n    private String[] skills = {"AI", "ML", "Web"};\n    \n    public String create() {\n        return "Building amazing things";\n    }\n    \n    public void innovate() {\n        System.out.println("Creating future");\n    }\n}' },
    { lang: 'C++', code: 'class Developer {\nprivate:\n    string name = "Rahul";\n    vector<string> skills = {"IoT", "AI"};\npublic:\n    string create() {\n        return "Amazing Things";\n    }\n    void innovate() {\n        cout << "Building future" << endl;\n    }\n};' },
    { lang: 'C#', code: 'public class Developer {\n    private string name = "Rahul";\n    private string[] skills = {"AI", "ML", "Web"};\n    \n    public string Create() {\n        return "Building amazing things";\n    }\n    \n    public void Innovate() {\n        Console.WriteLine("Creating future");\n    }\n}' },
    { lang: 'JavaScript', code: 'class Developer {\n    constructor() {\n        this.name = "Rahul";\n        this.skills = ["React", "Node", "AI"];\n    }\n    \n    create() {\n        return "Building amazing things" 🚀;\n    }\n    \n    innovate() {\n        console.log("Creating future");\n    }\n}' }
  ];
  const skills = {
    languages: ['Python', 'Java', 'C#', 'JavaScript', 'SQL', 'HTML/CSS'],
    frameworks: ['Flask', 'React', 'Node.js', 'FastAPI', '.NET', 'Tkinter', 'DialogFlow'],
    libraries: ['OpenCV', 'TensorFlow', 'Keras', 'NumPy', 'Pandas', 'Matplotlib'],
    tools: ['Git', 'Visual Studio', 'VS Code', 'PyCharm', 'Android Studio', 'Power BI', 'Figma'],
  };
  const projects = [
    { title: 'Attendance Management using Face Recognition', year: '2024', tech: 'Python, OpenCV, Flask, SQLite', desc: 'Built a face-recognition attendance solution that automates identification and time logging with high accuracy.', achievement: '🥈 2nd Place at National Science Day 2024' },
    { title: 'Live OMR Scanner', year: '2025', tech: 'Python, OpenCV, SQLite', desc: 'Engineered a real-time OMR scanning pipeline with live camera integration and automated result processing.' },
    { title: 'AI Chatbot Development', year: '2025', tech: 'Python, NLP, Flask, DialogFlow', desc: 'Developed an NLP-driven chatbot for real-time Q&A, integrating external APIs and custom intents/entities.' },
  ];


  // Code Typing Animation
  useEffect(() => {
    const currentSnippet = codeSnippets[currentCodeIndex].code;
    const currentTypingSpeed = isDeleting ? typingSpeed / 2 : typingSpeed;
    const pauseEnd = 2000;
    const pauseStart = 1000;

    if (!isDeleting && typedCode === currentSnippet) {
      setTimeout(() => setIsDeleting(true), pauseEnd);
      return;
    }

    if (isDeleting && typedCode === '') {
      setIsDeleting(false);
      setCurrentCodeIndex((prev) => (prev + 1) % codeSnippets.length);
      setTimeout(() => {}, pauseStart);
      return;
    }

    const timeout = setTimeout(() => {
      setTypedCode(
        isDeleting
          ? currentSnippet.substring(0, typedCode.length - 1)
          : currentSnippet.substring(0, typedCode.length + 1)
      );
    }, currentTypingSpeed);

    return () => clearTimeout(timeout);
  }, [typedCode, isDeleting, currentCodeIndex, typingSpeed]);

  // Smooth Scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });
    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Add 3D Tilt Effect
  const addTiltEffect = (targets) => {
    // Skip tilt on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    targets.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;
        gsap.to(el, { rotateX, rotateY, scale: 1.05, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" });
      });
      el.addEventListener('mouseenter', () => {
        gsap.to(cursorRef.current, { scale: 1.5, borderColor: '#ff00ff', duration: 0.3 });
        gsap.to(cursorDotRef.current, { scale: 0, duration: 0.3 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursorRef.current, { scale: 1, borderColor: 'rgba(0, 212, 255, 0.6)', duration: 0.3 });
        gsap.to(cursorDotRef.current, { scale: 1, duration: 0.3 });
      });
    });
  }

  // GSAP Animation Context
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Mouse Follower
      const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
      const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });
      const xToDot = gsap.quickTo(cursorDotRef.current, "x", { duration: 0.05, ease: "power3" });
      const yToDot = gsap.quickTo(cursorDotRef.current, "y", { duration: 0.05, ease: "power3" });

      window.addEventListener("mousemove", (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
        xToDot(e.clientX);
        yToDot(e.clientY);
      });

      // 2. Hero Animations
      const tlHero = gsap.timeline();
      tlHero.from(".hero-title", { y: 100, opacity: 0, duration: 1.5, ease: "power4.out" })
        .from(".role-container", { scale: 0, opacity: 0, duration: 1, ease: "back.out(2)" }, "-=0.8")
        .from(".hero-bio", { y: 30, opacity: 0, duration: 1 }, "-=0.6")
        .fromTo(".contact-link", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 }, "-=0.6");

      // Scroll-Reactive Lines Animation
      gsap.to(".scroll-line-1", {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom center",
          scrub: 1,
          markers: false
        },
        height: 600,
        opacity: 0,
        y: 100,
        duration: 1
      });

      gsap.to(".scroll-line-2", {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom center",
          scrub: 1
        },
        height: 500,
        opacity: 0,
        y: 80,
        duration: 1
      });

      // Scroll-Reactive Boxes Animation
      gsap.to(".scroll-box-1", {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom center",
          scrub: 1
        },
        x: -100,
        y: 200,
        rotation: 360,
        opacity: 0,
        duration: 1
      });

      gsap.to(".scroll-box-2", {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom center",
          scrub: 1
        },
        x: 100,
        y: -200,
        rotation: -360,
        opacity: 0,
        duration: 1
      });

      // Footer Scroll-Reactive Elements
      gsap.to(".footer-element-1", {
        scrollTrigger: {
          trigger: "footer",
          start: "top 80%",
          end: "bottom top",
          scrub: 1
        },
        x: -150,
        y: -300,
        rotation: 180,
        opacity: 0.5,
        duration: 1
      });

      gsap.to(".footer-element-2", {
        scrollTrigger: {
          trigger: "footer",
          start: "top 80%",
          end: "bottom top",
          scrub: 1
        },
        x: 150,
        y: -300,
        rotation: -180,
        opacity: 0.5,
        duration: 1
      });

      gsap.to(".footer-line-1", {
        scrollTrigger: {
          trigger: "footer",
          start: "top 80%",
          end: "bottom top",
          scrub: 1
        },
        height: 600,
        opacity: 1,
        duration: 1
      });

      gsap.to(".footer-line-2", {
        scrollTrigger: {
          trigger: "footer",
          start: "top 80%",
          end: "bottom top",
          scrub: 1
        },
        height: 500,
        opacity: 1,
        duration: 1
      });

      // 3. Section Reveals with stagger
      gsap.utils.toArray('.scroll-section').forEach(section => {
        gsap.fromTo(section,
          { opacity: 0, y: 100 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: {
              trigger: section, start: "top 80%", toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Animate skill cards with stagger
      gsap.utils.toArray('.skill-card').forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, scale: 0.8, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Animate project cards with rotation
      gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, rotateY: -90, y: 100 },
          {
            opacity: 1,
            rotateY: 0,
            y: 0,
            duration: 1,
            delay: index * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Add hover tilt effect on projects
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -8;
          const rotateY = ((x - centerX) / centerX) * 8;
          gsap.to(card, { rotateX, rotateY, scale: 1.02, duration: 0.3, ease: "power2.out" });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5, ease: "power2.out" });
        });
      });

      // Animate featured project with bounce
      const featuredProject = document.querySelector('.featured-project');
      if (featuredProject) {
        gsap.fromTo(featuredProject,
          { opacity: 0, scale: 0.7, y: 80 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: featuredProject,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Floating animation for featured project
        gsap.to(featuredProject, {
          y: -20,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // Animate leadership cards with flip
      gsap.utils.toArray('.leadership-grid > div').forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, rotateX: -90, y: 60 },
          {
            opacity: 1,
            rotateX: 0,
            y: 0,
            duration: 0.9,
            delay: index * 0.12,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Section title animations
      gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title,
          { opacity: 0, letterSpacing: '-50px' },
          {
            opacity: 1,
            letterSpacing: '2px',
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Parallax effect on hero bio
      gsap.fromTo(".hero-bio",
        { y: 0 },
        {
          y: 100,
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom center",
            scrub: 1,
            markers: false
          }
        }
      );

      // Award badge pulse animation
      const awardBadge = document.querySelector('.award-badge');
      if (awardBadge) {
        gsap.to(awardBadge, {
          boxShadow: '0 0 30px rgba(255, 215, 0, 0.8)',
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // Code elements scroll animations
      gsap.to(".code-element-1", {
        scrollTrigger: {
          trigger: ".code-element-1",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1
        },
        x: -100,
        y: 100,
        opacity: 0.8,
        rotation: -10,
        duration: 1
      });

      gsap.to(".code-element-2", {
        scrollTrigger: {
          trigger: ".code-element-2",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1
        },
        x: 100,
        y: -100,
        opacity: 0.8,
        rotation: 10,
        duration: 1
      });

      // Code bracket animations
      gsap.to(".code-bracket-left", {
        scrollTrigger: {
          trigger: ".code-bracket-left",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1
        },
        x: -50,
        opacity: 0.8,
        rotation: -15,
        fontSize: '5rem',
        duration: 1
      });

      gsap.to(".code-bracket-right", {
        scrollTrigger: {
          trigger: ".code-bracket-right",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1
        },
        x: 50,
        opacity: 0.8,
        rotation: 15,
        fontSize: '5rem',
        duration: 1
      });

      // 4. Initialize Tilt on Cards
      const cards = gsap.utils.toArray('.interactive-card');
      addTiltEffect(cards);

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="app" ref={containerRef} style={{ position: 'relative', zIndex: 1 }}>
      {/* REAL 3D Background */}
      <ThreeBackground />
      
      {/* Falling Stars Animation */}
      <FallingStars />

      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor" style={{ zIndex: 9999, mixBlendMode: 'difference' }}></div>
      <div ref={cursorDotRef} className="custom-cursor-dot" style={{ zIndex: 10000, mixBlendMode: 'difference' }}></div>

      {/* Hero Section */}
      <section className="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-content" style={{ zIndex: 2 }}>
          {/* Scroll-Reactive Background Lines */}
          <div className="scroll-line scroll-line-1" style={{
            position: 'absolute',
            width: '2px',
            height: '300px',
            background: 'linear-gradient(to bottom, #00d4ff, transparent)',
            left: '10%',
            top: '20%',
            opacity: 0.6
          }}></div>
          <div className="scroll-line scroll-line-2" style={{
            position: 'absolute',
            width: '2px',
            height: '250px',
            background: 'linear-gradient(to bottom, #ff00ff, transparent)',
            right: '15%',
            top: '40%',
            opacity: 0.5
          }}></div>
          
          {/* Scroll-Reactive Floating Boxes */}
          <div className="scroll-box scroll-box-1" style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            border: '2px solid #00d4ff',
            borderRadius: '15px',
            left: '5%',
            top: '30%',
            opacity: 0.3
          }}></div>
          <div className="scroll-box scroll-box-2" style={{
            position: 'absolute',
            width: '80px',
            height: '80px',
            border: '2px solid #ff00ff',
            borderRadius: '50%',
            right: '8%',
            bottom: '20%',
            opacity: 0.3
          }}></div>
          
          <h1 className="hero-title" style={{ fontSize: '5rem', fontWeight: 800, letterSpacing: '-2px', marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Rahul Agarwal
          </h1>
          <div className="role-container" style={{ minHeight: '3rem', marginBottom: '2rem' }}>
            <p className="role" style={{ fontSize: '1.5rem', color: '#00d4ff', fontWeight: 600, letterSpacing: '2px' }}>
              {roles}
            </p>
          </div>
          <p className="hero-bio" style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)' }}>
            Building intelligent solutions that bridge technology and innovation.
            Specialized in AI/ML, IoT systems, and scalable web applications.
          </p>
          <div className="contact-links" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
            {[
              { icon: '📞', text: 'Call Me', href: 'tel:+919401203345' },
              { icon: '✉️', text: 'Email', href: 'mailto:rahulagarwal1@gmail.com' },
              { icon: '💼', text: 'LinkedIn', href: 'https://linkedin.com/in/rahul-agarwal-1b888823a' },
              { icon: '💻', text: 'GitHub', href: 'https://github.com/rahulagarwal18' }
            ].map((link, i) => (
              <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="contact-link interactive-card" style={{
                textDecoration: 'none', color: '#fff', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.8rem',
                padding: '1rem 2rem', background: 'rgba(0, 5, 15, 0.95)', borderRadius: '50px',
                border: '2px solid rgba(0, 212, 255, 0.5)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
              }}>
                <span>{link.icon}</span> {link.text}
              </a>
            ))}
          </div>

          {/* Code Typing Animation */}
          <div style={{ marginTop: '4rem', maxWidth: '900px', margin: '4rem auto 0 2rem', padding: '0 2rem' }}>
            <div style={{ 
              background: 'rgba(0, 5, 15, 0.95)', 
              border: '2px solid rgba(0, 212, 255, 0.4)',
              borderRadius: '15px',
              padding: '1.5rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(20px)',
              position: 'relative'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '1rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid rgba(0, 212, 255, 0.2)'
              }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                </div>
                <span style={{ 
                  fontSize: '0.9rem', 
                  color: '#00d4ff', 
                  fontFamily: 'monospace',
                  fontWeight: 600
                }}>
                  {codeSnippets[currentCodeIndex].lang}
                </span>
              </div>
              <pre style={{ 
                margin: 0, 
                fontFamily: 'monospace', 
                fontSize: '1rem',
                color: '#fff',
                lineHeight: '1.6',
                minHeight: '60px',
                textAlign: 'left'
              }}>
                <code>{typedCode}</code>
                <span style={{ 
                  display: 'inline-block',
                  width: '2px',
                  height: '1.2em',
                  background: '#00d4ff',
                  marginLeft: '2px',
                  animation: 'blink 1s infinite'
                }}>|</span>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section scroll-section">
        <h2 className="section-title">Skills & Expertise</h2>
        <div className="skills-grid">
          {[
            { title: '💻 Languages', skills: skills.languages, color: '#00d4ff' },
            { title: '🚀 Frameworks', skills: skills.frameworks, color: '#ff00ff' },
            { title: '📚 Libraries', skills: skills.libraries, color: '#ffaa00' },
            { title: '🛠️ Tools', skills: skills.tools, color: '#00ff88' }
          ].map((category, i) => (
            <div key={i} className="skill-card interactive-card glass-card" style={{ background: 'rgba(0, 5, 15, 0.95)', border: '2px solid rgba(0, 212, 255, 0.4)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden' }}>
              {/* Animated background */}
              <div className="skill-card-bg" style={{
                position: 'absolute',
                width: '200%',
                height: '200%',
                background: `linear-gradient(45deg, ${category.color}20, transparent)`,
                animation: `moveGradient 8s ease-in-out infinite`,
                top: '-50%',
                left: '-50%',
              }}></div>
              <h3 style={{ color: category.color, position: 'relative', zIndex: 1 }}>{category.title}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, j) => (
                  <span key={j} className="skill-tag" style={{ 
                    display: 'inline-block',
                    animation: `tagPulse 2s ease-in-out infinite`,
                    animationDelay: `${j * 0.1}s`
                  }}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes moveGradient {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(10%, 10%); }
          }
          @keyframes tagPulse {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
        `}</style>
      </section>

      {/* Featured Project */}
      <section className="section scroll-section" style={{ position: 'relative' }}>
        {/* Scroll-Reactive Code Elements */}
        <div className="code-element code-element-1" style={{
          position: 'absolute',
          left: '5%',
          top: '10%',
          padding: '1rem',
          background: 'rgba(0, 212, 255, 0.1)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          color: '#00d4ff',
          opacity: 0.4,
          maxWidth: '200px',
          lineHeight: '1.6'
        }}>
          {'<Project />'}<br/>
          {'// Building\n// Amazing\n// Things'}
        </div>

        <div className="code-element code-element-2" style={{
          position: 'absolute',
          right: '5%',
          bottom: '15%',
          padding: '1rem',
          background: 'rgba(255, 0, 255, 0.1)',
          border: '1px solid rgba(255, 0, 255, 0.3)',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          color: '#ff00ff',
          opacity: 0.4,
          maxWidth: '200px',
          lineHeight: '1.6'
        }}>
          {'const result ='}<br/>
          {'innovate();'}<br/>
          {'// 🚀 Success'}
        </div>

        <h2 className="section-title">Featured Projects</h2>
        <div className="featured-project interactive-card glass-card" style={{ position: 'relative', overflow: 'hidden', padding: '3rem', background: 'rgba(0, 5, 15, 0.95)', border: '2px solid rgba(255, 215, 0, 0.5)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(20px)' }}>
          <span className="award-badge" style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1rem', background: 'rgba(255, 215, 0, 0.2)', border: '1px solid gold', borderRadius: '30px', color: '#ffd700', fontSize: '0.9rem', fontWeight: 'bold' }}>
            ⭐ AWARD WINNING PROJECT
          </span>
          <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Smart Navigation System using IoT & AI</h3>
          <p className="project-year" style={{ color: '#00d4ff', fontFamily: 'monospace' }}>2025</p>
          <p className="project-tech" style={{ margin: '1rem 0', opacity: 0.8 }}>IoT • Computer Vision • LED Display • 360° Camera</p>
          <p className="project-desc" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
            Revolutionary campus navigation system utilizing autonomous vehicles and real-time data processing.
          </p>
          <div className="achievement" style={{ marginTop: '2rem', fontWeight: 'bold', color: '#00d4ff', fontSize: '1.1rem' }}>
            🏆 1st Place at National Science Day 2025
          </div>
        </div>

        {/* Other Projects */}
        <h3 style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', margin: '5rem 0 3rem', fontSize: '2rem' }}>Other Notable Projects</h3>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <div key={i} className="project-card interactive-card glass-card" style={{ background: 'rgba(0, 5, 15, 0.95)', border: '2px solid rgba(0, 212, 255, 0.4)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(20px)' }}>
              <h4>{project.title}</h4>
              <p className="project-year">{project.year}</p>
              <p className="project-tech">{project.tech}</p>
              <p className="project-desc">{project.desc}</p>
              {project.achievement && <div className="achievement">{project.achievement}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="section scroll-section" style={{ position: 'relative' }}>
        {/* Code bracket animation */}
        <div className="code-bracket code-bracket-left" style={{
          position: 'absolute',
          left: '2%',
          top: '20%',
          fontSize: '4rem',
          color: 'rgba(0, 212, 255, 0.2)',
          fontWeight: 'bold',
          fontFamily: 'monospace'
        }}>{'{'}</div>

        <div className="code-bracket code-bracket-right" style={{
          position: 'absolute',
          right: '2%',
          bottom: '20%',
          fontSize: '4rem',
          color: 'rgba(255, 0, 255, 0.2)',
          fontWeight: 'bold',
          fontFamily: 'monospace'
        }}>{'}'}</div>

        <h2 className="section-title">Education</h2>
        <div className="glass-card interactive-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', background: 'rgba(0, 5, 15, 0.95)', border: '2px solid rgba(0, 212, 255, 0.4)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(20px)' }}>
          <h3 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '1rem' }}>
            Bachelor of Computer Applications (BCA)
          </h3>
          <p style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '1.2rem' }}>June 2023 - April 2026</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginTop: '0.5rem' }}>CHRIST (Deemed to be University), Bengaluru</p>
        </div>
      </section>

      {/* Leadership & Impact */}
      <section className="section scroll-section">
        <h2 className="section-title">Leadership & Impact</h2>
        <div className="leadership-grid">
          {[
            { icon: '🌍', title: 'Millennium Fellow (2025)', desc: 'Selected globally to drive initiatives aligned with UN Sustainable Development Goals.' },
            { icon: '🎓', title: 'Student Council Representative', desc: 'Advocated student interests and organized departmental events.' },
            { icon: '🤖', title: 'Coordinator, Centre for AI', desc: 'Led AI workshops, hackathons, and industry-academia engagements.' },
            { icon: '♻️', title: 'Department Representative, SDG Cell', desc: 'Spearheaded sustainability campaigns and awareness programs.' }
          ].map((item, i) => (
            <div key={i} className="glass-card interactive-card" style={{ padding: '2.5rem', background: 'rgba(0, 5, 15, 0.95)', border: '2px solid rgba(255, 0, 255, 0.4)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(20px)' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#ff00ff' }}>{item.icon} {item.title}</h3>
              <p style={{ lineHeight: '1.6', opacity: 0.9 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '4rem 2rem', color: 'rgba(255,255,255,0.4)', marginTop: '4rem', position: 'relative', overflow: 'hidden' }}>
        {/* Scroll-Reactive Footer Elements */}
        <div className="footer-element footer-element-1" style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          border: '2px solid #00d4ff',
          borderRadius: '50%',
          left: '5%',
          bottom: '30%',
          opacity: 0.2
        }}></div>
        
        <div className="footer-element footer-element-2" style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          border: '2px solid #ff00ff',
          borderRadius: '0%',
          right: '10%',
          bottom: '20%',
          opacity: 0.2
        }}></div>

        <div className="footer-line footer-line-1" style={{
          position: 'absolute',
          width: '3px',
          height: '400px',
          background: 'linear-gradient(to top, #00d4ff, transparent)',
          left: '20%',
          bottom: '0',
          opacity: 0.4
        }}></div>

        <div className="footer-line footer-line-2" style={{
          position: 'absolute',
          width: '3px',
          height: '350px',
          background: 'linear-gradient(to top, #ff00ff, transparent)',
          right: '20%',
          bottom: '0',
          opacity: 0.3
        }}></div>

        <p style={{ position: 'relative', zIndex: 1 }}>© 2026 Rahul Agarwal • Built with React, GSAP & Three.js 🚀</p>
      </footer>
    </div>
  );
}

export default App;
