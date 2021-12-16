import React, {useState, useEffect} from 'react';
import Intro from './src/Screens/Intro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteScreen from './src/Screens/NoteScreen';

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

  if (!user.name) return <Intro onFinish={findUser} />;
  return <NoteScreen user={user} />;
}
