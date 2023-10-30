import { Provider } from 'react-redux';
import TodoListScreen from './src/screens/TodoListScreen';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <TodoListScreen />
      </PersistGate>
    </Provider>
  )
}

export default App;