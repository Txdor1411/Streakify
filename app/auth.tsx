import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function AuthScreen(){

  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const router = useRouter();
  const theme = useTheme();

  const {signIn, signUp} = useAuth();

  const handleAuth = async () => {

    if(!email || !password){
      setError("Please fill in all fields");
      return;
    }
    if(password.length < 6){
      setError("Password must be at least 6 characters long");
      return;
    }

    setError(null);

    if(isSignUp){
      const error = await signUp(email, password);
      if(error)
        {
          setError(error);
          return;
        }
    }else{
      const error = await signIn(email, password);
      if(error)
        {
          setError(error);
          return;
        }

      router.replace("/");
    }
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
        onChangeText={setEmail}
        {...({ autoCapitalize: 'none', keyboardType: 'email-address' } as any)}
        style={styles.input}
        />

      
      <TextInput
      label="Pasword"
      mode="outlined"
      secureTextEntry
      onChangeText={setPassword}
      {...({ autoCapitalize: 'none', keyboardType: 'email-address'} as any)}
      style={styles.input}
      />

    

      {error && <Text style={{color: theme.colors.error}} > {error} </Text>}

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