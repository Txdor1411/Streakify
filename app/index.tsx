import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../lib/firebaseConfig';

export default function HomePage() {
  const router = useRouter();
  getAuth().onAuthStateChanged((user) => {
    if(!user) router.replace('/(auth)/login');
  });
  return (
    <View>
      <TouchableOpacity onPress={()=>auth.signOut()}>
      <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}
