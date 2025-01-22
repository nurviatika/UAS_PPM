import React, { useState } from 'react';
import { View,TextInput,TouchableOpacity,Text,Image,StyleSheet, } from 'react-native';
import { addTodo } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { launchImageLibrary } from 'react-native-image-picker';

export default function AddTodoScreen({ route }) {
  const { type } = route.params || {}; 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const navigation = useNavigation();

  const handleAddTodo = async () => {
    await addTodo({
      title,
      description,
      status: 'in-progress',
      date,
      image, 
    });
    navigation.goBack();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setDate(selectedDate.toLocaleDateString());
    hideDatePicker();
  };


  const selectImage = () => {
    launchImageLibrary( 
      {
        mediaType: 'photo',
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User canceled image picker');
        } else if (response.errorMessage) {
          console.error('ImagePicker Error: ', response.errorMessage);
        } else {
          const selectedImage = response.assets[0];
          setImage(selectedImage.uri); 
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backContainer}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {type === 'image' ? 'Add Todo with Image' : 'Add New Todo'}
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#FFFFFF"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        placeholderTextColor="#FFFFFF"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.input} onPress={showDatePicker}>
        <Text style={styles.inputText}>
          {date ? date : 'Select Deadline'}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {type === 'image' && (
        <>
          <TouchableOpacity 
          style={styles.uploadButton} onPress={selectImage}>
            <Text style={styles.uploadButtonText}>Select Image</Text>
          </TouchableOpacity>
          
          {image && (
            <Image
              source={{ uri: image }}
              style={styles.imagePreview}
              resizeMode="cover"
            />
          )}
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        testID="add-todo-button"
        onPress={handleAddTodo}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F79E89',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 26,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  descriptionInput: {
    height: 200,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#F79E89',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputText: {
    color: '#FFFFFF',
  },
  uploadButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  uploadButtonText: {
    color: '#F79E89',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    marginTop: 10,
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});
