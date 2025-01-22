import React, { useState } from 'react';
import { View,Text,FlatList,TouchableOpacity,StyleSheet,Animated, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getTodos } from '../services/api';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
  const [todos, setTodos] = useState([]);
  const [showActions, setShowActions] = useState(false); 
  const [animation] = useState(new Animated.Value(0)); 
  const navigation = useNavigation();

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const toggleActions = () => {
    setShowActions(!showActions); 
    Animated.timing(animation, {
      toValue: showActions ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const actionStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0], 
        }),
      },
    ],
    opacity: animation, 
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTodos();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>TO DO LIST</Text>
      </View>

      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeader}>LIST OF TODO</Text>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.todoItem}
            onPress={() => navigation.navigate('DetailTodo', { id: item.id })}
          >
            <Text style={styles.todoTitle}>{item.title}</Text>
            <Text style={styles.todoDescription}>{item.description}</Text>
            {item.date && <Text style={styles.todoDeadline}>{item.date}</Text>}
          </TouchableOpacity>
        )}
      />

      {showActions && (
        <Animated.View style={[styles.actionContainer, actionStyle]}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              setShowActions(false);
              navigation.navigate('AddTodo', { type: 'image' });
            }}
          >
            <Ionicons name="image-outline" size={20} color="#FFF" />
            <Text style={styles.actionText}>Image</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              setShowActions(false);
              navigation.navigate('AddTodo', { type: 'text' });
            }}
          >
            <Ionicons name="text-outline" size={20} color="#FFF" />
            <Text style={styles.actionText}>Text</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <TouchableOpacity style={styles.addButton} onPress={toggleActions}>
        <Ionicons name={showActions ? 'close' : 'add-circle'} size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F79E89',
  },
  subHeaderContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#DB7D67',
    textAlign: 'center',
  },
  todoItem: {
    backgroundColor: '#F79E89',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 8,
  },
  todoTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  todoDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
  },
  todoDeadline: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 46,
    right: 20,
    backgroundColor: '#F79E89',
    borderRadius: 60,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 110,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#F79E89',
    borderRadius: 30,
    padding: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    marginTop: 5,
    fontSize: 12,
    color: '#FFF',
  },
});
