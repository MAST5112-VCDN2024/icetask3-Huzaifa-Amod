import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

type Workout = {
  id: string;
  name: string;
  duration: number;
  calories: number;
  type: string;
};

const predefinedWorkoutTypes = ['Cardio', 'Strength', 'Flexibility'];

const FitnessTrackerApp = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [workoutType, setWorkoutType] = useState(predefinedWorkoutTypes[0]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const addWorkout = () => {
    if (workoutName && duration && calories) {
      const newWorkout: Workout = {
        id: Date.now().toString(),
        name: workoutName,
        duration: parseInt(duration),
        calories: parseInt(calories),
        type: workoutType,
      };
      setWorkouts([...workouts, newWorkout]);
      // Clear input fields
      setWorkoutName('');
      setDuration('');
      setCalories('');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitness Tracker</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Workout Name"
        value={workoutName}
        onChangeText={setWorkoutName}
        placeholderTextColor="#b0b0b0"
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (minutes)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        placeholderTextColor="#b0b0b0"
      />
      <TextInput
        style={styles.input}
        placeholder="Calories Burned"
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
        placeholderTextColor="#b0b0b0"
      />
      
      <Text style={styles.label}>Workout Type:</Text>
      <View style={styles.buttonGroup}>
        {predefinedWorkoutTypes.map((type) => (
          <TouchableOpacity key={type} style={styles.typeButton} onPress={() => setWorkoutType(type)}>
            <Text style={workoutType === type ? styles.selectedTypeText : styles.typeText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={addWorkout}>
        <Text style={styles.addButtonText}>Add Workout</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Workout List</Text>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.workoutItem}>
            <Text style={styles.workoutText}>Name: {item.name}</Text>
            <Text style={styles.workoutText}>Duration: {item.duration} minutes</Text>
            <Text style={styles.workoutText}>Calories: {item.calories}</Text>
            <Text style={styles.workoutText}>Type: {item.type}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyMessage}>No workouts added yet.</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#4b0082',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600',
    color: '#4b0082',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  typeButton: {
    backgroundColor: '#4b0082',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  typeText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedTypeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#32CD32',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  workoutItem: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  workoutText: {
    fontSize: 16,
    color: '#333',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default FitnessTrackerApp;