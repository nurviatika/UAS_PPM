import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddTodoScreen from '../screens/AddTodoScreen';
import { addTodo } from '../services/api';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('../services/api', () => ({
  addTodo: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    goBack: jest.fn(),
  }),
}));

describe('AddTodoScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <AddTodoScreen />
      </NavigationContainer>
    );

    expect(getByPlaceholderText('Title')).toBeTruthy();
    expect(getByPlaceholderText('Description')).toBeTruthy();
    expect(getByPlaceholderText('Deadline (Optional)')).toBeTruthy();
    expect(getByText('Add Todo')).toBeTruthy();
  });

  it('allows user to input values and submit', async () => {
    const mockAddTodo = addTodo;
    const { getByPlaceholderText, getByTestId } = render(
      <NavigationContainer>
        <AddTodoScreen />
      </NavigationContainer>
    );

    fireEvent.changeText(getByPlaceholderText('Title'), 'New Task');
    fireEvent.changeText(getByPlaceholderText('Description'), 'Task Description');
    fireEvent.changeText(getByPlaceholderText('Deadline (Optional)'), '2024-12-31');

    fireEvent.press(getByTestId('add-todo-button'));

    await waitFor(() => {
      expect(mockAddTodo).toHaveBeenCalledWith({
        title: 'New Task',
        description: 'Task Description',
        status: 'in-progress',
        date: '2024-12-31',
      });
    });
  });

  it('navigates back after adding a todo', async () => {
    const goBackMock = jest.fn();
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({
      goBack: goBackMock,
    });

    const { getByTestId } = render(
      <NavigationContainer>
        <AddTodoScreen />
      </NavigationContainer>
    );

    fireEvent.press(getByTestId('add-todo-button'));

    await waitFor(() => {
      expect(goBackMock).toHaveBeenCalled();
    });
  });
});
