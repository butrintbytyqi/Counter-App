import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Statistics = ({ stats, onClose, t }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold dark:text-white">{t.statistics}</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="text-blue-600 dark:text-blue-400 font-medium">{t.totalCounters}</h4>
          <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">{stats.total}</p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="text-green-600 dark:text-green-400 font-medium">{t.activeCounters}</h4>
          <p className="text-2xl font-bold text-green-800 dark:text-green-300">{stats.active}</p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h4 className="text-purple-600 dark:text-purple-400 font-medium">{t.completedGoals}</h4>
          <p className="text-2xl font-bold text-purple-800 dark:text-purple-300">{stats.completed}</p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-4 dark:text-white">{t.byCategory}</h4>
        <div className="space-y-3">
          {Object.entries(stats.byCategory).map(([category, count]) => (
            <div key={category} className="flex items-center">
              <div className="w-32 text-gray-600 dark:text-gray-400">{category}</div>
              <div className="flex-1">
                <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / stats.total) * 100}%` }}
                    className="h-full bg-indigo-500"
                  />
                </div>
              </div>
              <div className="w-12 text-right text-gray-600 dark:text-gray-400">{count}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Statistics;
