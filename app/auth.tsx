import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function AuthScreen(){

  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const handleAuth = async () => {
      
  };

  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev);
  }

    return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} 
    style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title} variant="headlineMedium">{isSignUp ? "Create Account" : "Welcome back"}</Text>

        <TextInput
        label="Email"
        mode="outlined"
        placeholder="example@gmail.com"
        {...({ autoCapitalize: 'none', keyboardType: 'email-address' } as any)}
        style={styles.input}
        />

      
      <TextInput
      label="Pasword"
      mode="outlined"
      {...({ autoCapitalize: 'none', keyboardType: 'email-address'} as any)}
      style={styles.input}
      />

      <Button mode="contained"  style={styles.button} onPress={handleAuth}>{isSignUp ? "Sign Up" : "Sign In"}</Button>
      <Button mode="text" onPress={handleSwitchMode} style={styles.switchModeButton}>
        {isSignUp ? "Already have an account? Sign In" 
        : "Don't have an account? Sign Up"}
        </Button>

       </View> 
    </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#e0e1dd",
  },
  content:{
    flex:1,
    padding: 16,
    justifyContent:"center",
    backgroundColor:"#e0e1dd",
  },

  title:{
    textAlign:"center",
    marginBottom: 24,
  },

  input:{
    
    marginBottom: 16,
  },

  button:{
    marginTop: 8,
  },

  switchModeButton:{
    marginTop: 16,

  },

});