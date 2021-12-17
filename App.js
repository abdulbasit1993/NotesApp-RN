import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Intro from './src/Screens/Intro';
import NoteScreen from './src/Screens/NoteScreen';
import NoteDetail from './src/components/NoteDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if (result !== null) {
      setUser(JSON.parse(result));
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  const renderNoteScreen = props => <NoteScreen {...props} user={user} />;

  if (!user.name) return <Intro onFinish={findUser} />;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={renderNoteScreen} name="NoteScreen" />
        <Stack.Screen component={NoteDetail} name="NoteDetail" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Watched until 9:18 --> https://youtu.be/NTmPsRsrHQQ?list=PLaAoUJDWH9WonhD-ZLyYber1O7LnoI62w&t=558
