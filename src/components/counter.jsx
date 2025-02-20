import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusIcon, 
  MinusIcon, 
  TrashIcon, 
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

const Counter = ({ counter, onIncrement, onDecrement, onDelete, onUpdate, categories, t }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(counter.label);
  const [editedGoal, setEditedGoal] = useState(counter.goal);
  const [editedCategory, setEditedCategory] = useState(counter.category);

  const handleSave = () => {
    onUpdate(counter.id, {
      label: editedLabel,
      goal: parseInt(editedGoal),
      category: editedCategory
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedLabel(counter.label);
    setEditedGoal(counter.goal);
    setEditedCategory(counter.category);
    setIsEditing(false);
  };

  const progress = Math.min((counter.value / counter.goal) * 100, 100);
  const isCompleted = counter.value >= counter.goal;

  return (
    <motion.div
      layout
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 ${
        isCompleted ? 'ring-2 ring-green-500 dark:ring-green-400' : ''
      }`}
    >
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.label}
            </label>
            <input
              type="text"
              value={editedLabel}
              onChange={(e) => setEditedLabel(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.goal}
            </label>
            <input
              type="number"
              min="1"
              value={editedGoal}
              onChange={(e) => setEditedGoal(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t.category}
            </label>
            <select
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="p-2 text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/20 rounded-lg transition-colors"
            >
              <CheckIcon className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                {counter.label}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {counter.category}
              </span>
            </div>
            <div className="flex space-x-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <PencilSquareIcon className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(counter.id)}
                className="p-2 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <TrashIcon className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>{t.progress}</span>
              <span>{counter.value} / {counter.goal}</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className={`h-full transition-colors ${
                  isCompleted ? 'bg-green-500' : 'bg-blue-500'
                }`}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDecrement(counter)}
              className="flex-1 mr-2 py-2 bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors flex items-center justify-center"
              disabled={counter.value === 0}
            >
              <MinusIcon className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onIncrement(counter)}
              className={`flex-1 ml-2 py-2 rounded-lg transition-colors flex items-center justify-center ${
                isCompleted
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30'
                  : 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/30'
              }`}
            >
              <PlusIcon className="h-5 w-5" />
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Counter;
