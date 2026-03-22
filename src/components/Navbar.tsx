import React, { useState, useEffect } from 'react';
import { List, X, Moon, Sun } from '@phosphor-icons/react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LanguageContext';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLang();
  const location = useLocation();
  const isStore = location.pathname === '/store';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 300) {
          current = section.getAttribute('id') || '';
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Language toggle button — flag and label
  const LangButton = () => (
    <button
      onClick={toggleLang}
      title="Switch Language / மொழி மாற்று"
      style={{
        background: 'none', border: `1.5px solid ${scrolled ? '#3E2723' : 'rgba(255,255,255,0.6)'}`,
        borderRadius: '999px', cursor: 'pointer',
        color: scrolled ? '#3E2723' : '#ffffff',
        fontSize: '0.75rem', fontWeight: 700,
        letterSpacing: '1px', padding: '4px 10px',
        display: 'flex', alignItems: 'center', gap: '4px',
        transition: 'all 0.3s ease', whiteSpace: 'nowrap',
      }}
    >
      {lang === 'en' ? '🇮🇳 தமிழ்' : '🇬🇧 English'}
    </button>
  );

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <a href="/#" className={styles.brandLogo}>
          Sri Balaji <span>Wood Works</span>
        </a>

        {/* Desktop Menu */}
        <ul className={styles.navMenu}>
          <li><a href="/#about" className={`${styles.navLinks} ${activeSection === 'about' && !isStore ? styles.activeLink : ''}`}>{t('nav.story')}</a></li>
          <li><a href="/#products" className={`${styles.navLinks} ${activeSection === 'products' && !isStore ? styles.activeLink : ''}`}>{t('nav.bespoke')}</a></li>
          <li><a href="/#materials" className={`${styles.navLinks} ${activeSection === 'materials' && !isStore ? styles.activeLink : ''}`}>{t('nav.materials')}</a></li>
          <li><a href="/#gallery" className={`${styles.navLinks} ${activeSection === 'gallery' && !isStore ? styles.activeLink : ''}`}>{t('nav.gallery')}</a></li>
          <li><Link to="/store" className={`${styles.navLinks} ${isStore ? styles.activeLink : ''}`}>{t('nav.shop')}</Link></li>
          <li><a href="/#locations" className={`${styles.navLinks} ${activeSection === 'locations' && !isStore ? styles.activeLink : ''}`}>{t('nav.visit')}</a></li>
          <li><a href="/#contact" className={`${styles.navLinks} ${styles.navCta} ${activeSection === 'contact' && !isStore ? styles.activeLink : ''}`}>{t('nav.consultation')}</a></li>
          <li><LangButton /></li>
          <li>
            <button className={styles.desktopThemeBtn} onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: scrolled ? '#3E2723' : '#ffffff', marginLeft: '0.5rem' }}>
              {theme === 'light' ? <Moon size={24} weight="fill" /> : <Sun size={24} weight="fill" />}
            </button>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <LangButton />
          <button className={styles.mobileThemeBtn} onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: scrolled ? '#3E2723' : '#ffffff' }}>
            {theme === 'light' ? <Moon size={24} weight="fill" /> : <Sun size={24} weight="fill" />}
          </button>
          <div className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} color={scrolled ? 'var(--primary)' : '#ffffff'} /> : <List size={28} color={scrolled ? 'var(--primary)' : '#ffffff'} />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.active : ''}`}>
        <a href="/#about" className={activeSection === 'about' && !isStore ? styles.activeMobile : ''} onClick={() => setMenuOpen(false)}>{t('nav.story')}</a>
        <a href="/#products" className={activeSection === 'products' && !isStore ? styles.activeMobile : ''} onClick={() => setMenuOpen(false)}>{t('nav.bespoke')}</a>
        <a href="/#materials" className={activeSection === 'materials' && !isStore ? styles.activeMobile : ''} onClick={() => setMenuOpen(false)}>{t('nav.materials')}</a>
        <a href="/#gallery" className={activeSection === 'gallery' && !isStore ? styles.activeMobile : ''} onClick={() => setMenuOpen(false)}>{t('nav.gallery')}</a>
        <Link to="/store" className={isStore ? styles.activeMobile : ''} onClick={() => setMenuOpen(false)}>{t('nav.shop')}</Link>
        <a href="/#locations" className={activeSection === 'locations' && !isStore ? styles.activeMobile : ''} onClick={() => setMenuOpen(false)}>{t('nav.visit')}</a>
        <a href="/#contact" className={styles.mobileCta} onClick={() => setMenuOpen(false)}>{t('nav.consultation')}</a>
      </div>
    </nav>
  );
};

export default Navbar;
