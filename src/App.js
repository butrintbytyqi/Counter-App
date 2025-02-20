import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChartBarIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import Counters from './components/counters';
import Navbar from './components/navbar';
import Statistics from './components/statistics';
import Settings from './components/settings';
import { translations } from './translations';

function App() {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'sq';
  });

  const t = translations[language];

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : [t.work, t.personal, t.health, t.learning];
  });

  const [counters, setCounters] = useState(() => {
    const saved = localStorage.getItem('counters');
    return saved ? JSON.parse(saved) : [];
  });

  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(t.allCategories);
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Update categories when language changes
  useEffect(() => {
    const defaultCategories = [t.work, t.personal, t.health, t.learning];
    setCategories(prev => {
      const saved = localStorage.getItem('categories');
      if (!saved) return defaultCategories;
      
      const parsedCategories = JSON.parse(saved);
      // Translate existing categories
      return parsedCategories.map(category => {
        const key = Object.keys(translations.sq).find(
          key => translations.sq[key] === category || translations.en[key] === category
        );
        return key ? t[key] : category;
      });
    });
  }, [language, t]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('counters', JSON.stringify(counters));
  }, [counters]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const handleLanguageChange = () => {
    setLanguage(prev => prev === 'sq' ? 'en' : 'sq');
  };

  const handleIncrement = (counter) => {
    saveToHistory();
    const updated = counters.map(c =>
      c.id === counter.id ? { ...c, value: c.value + 1 } : c
    );
    setCounters(updated);
  };

  const handleDecrement = (counter) => {
    saveToHistory();
    const updated = counters.map(c =>
      c.id === counter.id && c.value > 0 ? { ...c, value: c.value - 1 } : c
    );
    setCounters(updated);
  };

  const handleReset = () => {
    saveToHistory();
    const updated = counters.map(c => ({ ...c, value: 0 }));
    setCounters(updated);
  };

  const handleDelete = (counterId) => {
    saveToHistory();
    setCounters(counters.filter(c => c.id !== counterId));
  };

  const handleAdd = (label, goal, category) => {
    saveToHistory();
    const newId = counters.length > 0 ? Math.max(...counters.map(c => c.id)) + 1 : 1;
    const newCounter = {
      id: newId,
      value: 0,
      label: label || `${t.label} ${newId}`,
      goal: parseInt(goal) || 5,
      category: category || t.personal
    };
    setCounters([...counters, newCounter]);
  };

  const handleUpdateCounter = (counterId, updates) => {
    saveToHistory();
    setCounters(counters.map(counter =>
      counter.id === counterId ? { ...counter, ...updates } : counter
    ));
  };

  const saveToHistory = () => {
    setHistory([...history.slice(0, currentStep + 1), [...counters]]);
    setCurrentStep(currentStep + 1);
  };

  const handleUndo = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCounters(history[currentStep - 1]);
    }
  };

  const handleRedo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
      setCounters(history[currentStep + 1]);
    }
  };

  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const removeCategory = (category) => {
    if (category !== t.personal) {
      setCategories(categories.filter(c => c !== category));
      setCounters(counters.map(counter => 
        counter.category === category 
          ? { ...counter, category: t.personal } 
          : counter
      ));
    }
  };

  const filteredCounters = counters.filter(counter =>
    counter.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === t.allCategories || counter.category === selectedCategory)
  );

  const stats = {
    total: counters.length,
    active: counters.filter(c => c.value > 0).length,
    completed: counters.filter(c => c.value >= c.goal).length,
    byCategory: categories.reduce((acc, cat) => {
      acc[cat] = counters.filter(c => c.category === cat).length;
      return acc;
    }, {})
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark:bg-gray-900 dark:text-white' : 'bg-gray-50'}`}>
      <Navbar
        totalCounters={counters.filter(c => c.value > 0).length}
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        categories={[t.allCategories, ...categories]}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        language={language}
        onLanguageChange={handleLanguageChange}
        t={t}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowStats(!showStats)}
              className="flex items-center space-x-2 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600"
            >
              <ChartBarIcon className="h-5 w-5" />
              <span>{t.statistics}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
              <span>{t.settings}</span>
            </motion.button>
          </div>

          <div className="space-x-2">
            <button
              className="px-4 py-2 rounded-lg shadow-md bg-amber-500 text-white disabled:opacity-50"
              onClick={handleUndo}
              disabled={currentStep <= 0}
            >
              {t.undo}
            </button>
            <button
              className="px-4 py-2 rounded-lg shadow-md bg-amber-500 text-white disabled:opacity-50"
              onClick={handleRedo}
              disabled={currentStep >= history.length - 1}
            >
              {t.redo}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showStats && (
            <Statistics 
              stats={stats} 
              onClose={() => setShowStats(false)}
              t={t}
            />
          )}
          
          {showSettings && (
            <Settings
              categories={categories}
              onAddCategory={addCategory}
              onRemoveCategory={removeCategory}
              onClose={() => setShowSettings(false)}
              t={t}
            />
          )}
        </AnimatePresence>

        <Counters
          counters={filteredCounters}
          onReset={handleReset}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onDelete={handleDelete}
          onAdd={handleAdd}
          onUpdate={handleUpdateCounter}
          categories={categories}
          t={t}
        />
      </div>
    </div>
  );
}

export default App;
