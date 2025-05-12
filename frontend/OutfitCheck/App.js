import React, { useState } from 'react';
import MainTabs from './src/navigation/MainTabs';

export default function App() {
  const [closet, setCloset] = useState([]);

  const handleAddToCloset = (imageUri) => {
    console.log('🧤 Añadiendo imagen al armario:', imageUri);
    setCloset(prev => [...prev, imageUri]);
  };

  return <MainTabs closet={closet} onAddToCloset={handleAddToCloset} />;
}