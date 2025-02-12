// Frontened_App/src/App.tsx
import React from 'react'; // Add this line
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthNavigation from "./navigation/AuthNavigation";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthNavigation />
    </GestureHandlerRootView>
  );
}

export default App;