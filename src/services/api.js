import axios from 'axios';

const apiUrl = 'https://672ca2271600dda5a9f93dc9.mockapi.io/Todo';

export const getTodos = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const getTodoById = async (id) => {
  try { 
    const response = await axios.get(`${apiUrl}/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching todo by id:', error);
    throw error;
  }
};

export const addTodo = async (newTodo) => {
  try {
    const response = await axios.post(apiUrl, newTodo);
    return response;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, updatedTodo);
    return response;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
