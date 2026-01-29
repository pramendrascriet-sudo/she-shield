import { Shield, Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

const Header = () => {
    const { t, language, toggleLanguage } = useApp();
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        { key: 'safetyLocations', href: '#locations' },
        { key: 'tips', href: '#tips' },
        { key: 'emergency', href: '#emergency' },
        { key: 'profile', href: '#profile' }
    ];

    return (
        <header className="sticky top-0 z-50 glass shadow-soft">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full gradient-violet flex items-center justify-center shadow-glow-purple">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-purple-600">{t('appName')}</h1>
                            <p className="text-xs text-purple-400 hidden sm:block">{t('tagline')}</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map(item => (
                            <a
                                key={item.key}
                                href={item.href}
                                className="text-gray-600 hover:text-purple-500 transition-colors font-medium"
                            >
                                {t(item.key)}
                            </a>
                        ))}
                    </nav>

                    {/* Language Toggle & Mobile Menu */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-violet-100 hover:bg-violet-200 transition-colors text-violet-600 text-sm font-medium"
                        >
                            <Globe className="w-4 h-4" />
                            {language === 'en' ? 'हिं' : 'EN'}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-purple-100 transition-colors"
                        >
                            {menuOpen ? <X className="w-6 h-6 text-purple-500" /> : <Menu className="w-6 h-6 text-purple-500" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <nav className="md:hidden mt-4 pb-2 border-t border-purple-100 pt-4 animate-slide-up">
                        {navItems.map(item => (
                            <a
                                key={item.key}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className="block py-2 px-4 text-gray-600 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-colors font-medium"
                            >
                                {t(item.key)}
                            </a>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
