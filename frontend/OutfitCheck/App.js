import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MainTabs from './src/navigation/MainTabs';
import { loadCloset, saveCloset } from './src/utils/storage';

export default function App() {
  const [closet, setCloset] = useState([]);

  useEffect(() => {
    (async () => {
      const saved = await loadCloset();
      setCloset(saved);
    })();
  }, []);

  const handleAddToCloset = async (itemData) => {
    const updated = [itemData, ...closet];
    setCloset(updated);
    await saveCloset(updated);
  };

  return (
    <View style={{ flex: 1 }}>
      <MainTabs
        closet={closet}
        onAddToCloset={handleAddToCloset}
        onClearCloset={async () => {
          setCloset([]);
          await saveCloset([]);
        }}
      />
    </View>
  );
}