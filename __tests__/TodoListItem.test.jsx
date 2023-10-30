import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import TodoListItem from '../src/components/TodoListItem';
import TodoListScreen from '../src/screens/TodoListScreen';


test('renders correctly', () => {
  const {getByText} = renderer(<TodoListScreen />);
  const addbtn = getByText('Add')
  expect(addbtn).toBe('Add');
});