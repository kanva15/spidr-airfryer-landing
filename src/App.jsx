import InterestForm from './components/InterestForm';
import './App.css';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const handleScroll = () => {
      if (window.innerWidth > 768 && window.scrollY > 50) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`container ${showSidebar ? 'show-sidebar' : 'hide-sidebar'}`}>
      {/* Desktop Sidebar */}
      <div className={`sidebar ${showSidebar ? 'visible' : 'hidden'}`}>
        <h1 className="logo mobile-logo">Spidr Air</h1>
        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#reserve">Reserve</a>
        </nav>
      </div>

      {/* Mobile Sticky Header */}
     {window.innerWidth <= 768 && (
        <div className="mobile-header">
          <div className="logo">Spidr Air</div>
          <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#features">Features</a>
            <a href="#reserve">Reserve</a>
          </nav>
        </div>
      )}

      <div className="main-content">
        <div className="page-logo" id="home">
          <h1>Spidr Air</h1>
        </div>

        <section className="banner" data-aos="fade-up">
          <h2>Meet Spidr Air</h2>
          <p>Redefining cooking with AI precision and elegant design. Cook smart, live smart.</p> 
        </section>

        <section id="about" className="section about" data-aos="fade-up">
          <h3 className="section-title">Crafted for Visionaries</h3>
          <p>
            Spidr Air Fryer is not just a kitchen appliance. It's a reimagining of what cooking can feel like in the modern home. Designed by the creators behind Spidr Design, it blends form and function in a way that elevates your space and your meals. From the moment you unbox it, you’ll notice the attention to detail, smooth edges, a minimal interface, and a sense of quiet power.
          </p>
          <p>
            What sets Spidr Air apart is its intelligence. It doesn’t just cook, it adapts. The built-in cooking engine uses real-time data to adjust heat, airflow, and timing with surgical precision. Whether you're reheating leftovers or crisping up handmade fries, the results are consistently satisfying. 
          </p>
          <p>
            We believe appliances should be intuitive, not intimidating. That’s why Spidr Air features a touch-sensitive dial that lets you control everything with a gentle spin. No cluttered screens. No complicated menus. Just clean, deliberate interaction.
          </p>
          <p>
            Behind the beauty is substance. The chamber detaches effortlessly for easy cleaning, and the companion mobile app lets you start, pause, or monitor your cooking from anywhere. It’s a product that respects your time, your kitchen, and your taste. With Spidr Air, you’re not just cooking, you’re creating an experience.
          </p>
        </section>

        <section id="features" className="section features" data-aos="fade-up">
          <h3 className="section-title">Why Spidr Air?</h3>
      <ul className="feature-list">
        <li><strong>SmartHeat™ Precision:</strong> Adaptive heating technology intelligently adjusts temperature and airflow for consistently crisp results.</li>
        <li><strong>Intuitive Control Dial:</strong> Seamless interaction with a sleek rotary interface designed for clarity and comfort.</li>
        <li><strong>Effortless Cleaning:</strong> Fully detachable components and non-stick surfaces make cleanup quick and hygienic.</li>
        <li><strong>Designed for Modern Homes:</strong> Energy-efficient performance housed in a minimalist, family-safe build.</li>
      </ul>
        </section>

        <section id="reserve" className="section form-section" data-aos="fade-up">
          <h3 className="section-title">Reserve Yours Today</h3>
          <p>Be among the first to own the future of home cooking. Pre-orders open now.</p><br/>
          <InterestForm />
        </section>

        <footer className="footer">
          <p>© 2025 Spidr Design. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
