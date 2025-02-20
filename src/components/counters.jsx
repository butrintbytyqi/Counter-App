import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Counter from './counter';
import { PlusIcon } from '@heroicons/react/24/outline';

const Counters = ({ counters, onReset, onIncrement, onDecrement, onDelete, onAdd, onUpdate, categories, t }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCounterLabel, setNewCounterLabel] = useState('');
  const [newCounterGoal, setNewCounterGoal] = useState('5');
  const [newCounterCategory, setNewCounterCategory] = useState(categories[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newCounterLabel, newCounterGoal, newCounterCategory);
    setNewCounterLabel('');
    setNewCounterGoal('5');
    setNewCounterCategory(categories[0]);
    setShowAddForm(false);
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
    setNewCounterLabel('');
    setNewCounterGoal('5');
    setNewCounterCategory(categories[0]);
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {counters.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-4">{t.noCounters}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShowAddForm}
              className="bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-600 flex items-center space-x-2 mx-auto"
            >
              <PlusIcon className="h-5 w-5" />
              <span>{t.addFirstCounter}</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="counter-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShowAddForm}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 flex items-center space-x-2"
              >
                <PlusIcon className="h-5 w-5" />
                <span>{t.addCounter}</span>
              </motion.button>
              {counters.length > 0 && (
                <button
                  onClick={onReset}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600"
                >
                  {t.resetAll}
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {counters.map(counter => (
                <Counter
                  key={counter.id}
                  counter={counter}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                  categories={categories}
                  t={t}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
            >
              <h2 className="text-2xl font-bold mb-4 dark:text-white">{t.addNewCounter}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.label}
                  </label>
                  <input
                    type="text"
                    value={newCounterLabel}
                    onChange={(e) => setNewCounterLabel(e.target.value)}
                    placeholder={t.enterCounterLabel}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.goal}
                  </label>
                  <input
                    type="number"
                    value={newCounterGoal}
                    onChange={(e) => setNewCounterGoal(e.target.value)}
                    min="1"
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.category}
                  </label>
                  <select
                    value={newCounterCategory}
                    onChange={(e) => setNewCounterCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                  >
                    {t.add}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Counters;
