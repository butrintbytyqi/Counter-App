import React, { useState } from 'react';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Settings = ({ categories, onAddCategory, onRemoveCategory, onClose, t }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold dark:text-white">{t.settings}</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <div>
        <h4 className="text-md font-medium mb-2 dark:text-white">{t.categories}</h4>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder={t.addNewCategory}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            disabled={!newCategory.trim()}
          >
            {t.add}
          </button>
        </form>

        <div className="space-y-2">
          {categories.map(category => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <span className="text-gray-800 dark:text-white">{category}</span>
              {category !== t.personal && (
                <button
                  onClick={() => onRemoveCategory(category)}
                  className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {t.categoryNote}
        </p>
      </div>
    </motion.div>
  );
};

export default Settings;
