import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {TodoView} from './src/screens/TodoView';
import {ViewModelContext} from './src/contexts';
import {TodoViewModel} from './src/models';
import {DevMenuTrigger} from './DevMenuTrigger';

const todoViewModel = new TodoViewModel({storage: AsyncStorage});

function App() {
  return (
    <DevMenuTrigger>
      <ViewModelContext.Provider value={{todoViewModel}}>
        <TodoView />
      </ViewModelContext.Provider>
    </DevMenuTrigger>
  );
}

export default App;
