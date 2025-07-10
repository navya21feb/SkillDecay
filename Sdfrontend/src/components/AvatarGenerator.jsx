// AvatarGenerator.jsx
import React, { useState } from 'react';

const styles = [
  'adventurer', 'adventurer-neutral', 'avataaars', 
  'big-ears', 'big-ears-neutral', 'big-smile', 
  'bottts', 'croodles', 'micah', 'miniavs', 
  'open-peeps', 'personas', 'pixel-art'
];

const AvatarGenerator = ({ value, onChange }) => {
  const [seed, setSeed] = useState('custom-seed');
  const [style, setStyle] = useState('bottts');

  const generateUrl = () => {
    return `https://api.dicebear.com/8.x/${style}/svg?seed=${seed}`;
  };

  const handleSave = () => {
    onChange(generateUrl());
  };

  return (
    <div className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex justify-center">
        <img 
          src={generateUrl()} 
          alt="Preview" 
          className="w-32 h-32 rounded-full border-2 border-gray-300 dark:border-gray-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-gray-300">
          Style
        </label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        >
          {styles.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-gray-300">
          Seed (customize)
        </label>
        <input
          type="text"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
      >
        Use This Avatar
      </button>
    </div>
  );
};

export default AvatarGenerator;