import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { Link } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { mapAuthError } from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";

WebBrowser.maybeCompleteAuthSession();

function getGoogleConfig() {
  const redirectUri =
    process.env.EXPO_PUBLIC_GOOGLE_REDIRECT_URI ||
    makeRedirectUri({
      // Works for native dev/prod builds; on web this resolves to localhost in dev.
      scheme: "streakify",
      path: "oauthredirect",
    });

  return {
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    redirectUri,
  };
}

export default function LoginScreen() {
  const { signInUser, signInWithGoogleToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const googleConfig = useMemo(getGoogleConfig, []);
  const [request, response, promptAsync] = Google.useAuthRequest(googleConfig);

  useEffect(() => {
    const runGoogleSignIn = async () => {
      if (response?.type !== "success") {
        if (response?.type === "error") {
          setErrorText("Google sign-in failed. Check OAuth redirect URI settings.");
        }

        return;
      }

      const idToken =
        response.authentication?.idToken ??
        ((response as { params?: { id_token?: string } }).params?.id_token ?? null);
      const accessToken =
        response.authentication?.accessToken ??
        ((response as { params?: { access_token?: string } }).params?.access_token ?? null);

      if (!idToken && !accessToken) {
        setErrorText("Google did not return a usable token.");
        return;
      }

      setErrorText(null);
      setIsGoogleSubmitting(true);

      try {
        await signInWithGoogleToken(idToken, accessToken);
      } catch (error) {
        setErrorText(mapAuthError(error));
      } finally {
        setIsGoogleSubmitting(false);
      }
    };

    runGoogleSignIn();
  }, [response, signInWithGoogleToken]);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setErrorText("Email and password are required.");
      return;
    }

    setErrorText(null);
    setIsSubmitting(true);

    try {
      await signInUser(email, password);
    } catch (error) {
      setErrorText(mapAuthError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setErrorText(null);

    try {
      await promptAsync();
    } catch {
      setErrorText("Unable to launch Google sign-in.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome back</Text>
      <Text style={styles.subheading}>Log in to continue your streak.</Text>

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#9e8b7f"
        style={styles.input}
        value={email}
      />
      <TextInput
        autoCapitalize="none"
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#9e8b7f"
        secureTextEntry
        style={styles.input}
        value={password}
      />

      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}

      <Pressable
        disabled={isSubmitting}
        onPress={handleLogin}
        style={[styles.primaryButton, isSubmitting && styles.disabledButton]}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.primaryButtonText}>Log in</Text>
        )}
      </Pressable>

      <Pressable
        disabled={!request || isGoogleSubmitting}
        onPress={handleGoogle}
        style={[styles.secondaryButton, (!request || isGoogleSubmitting) && styles.disabledButton]}
      >
        {isGoogleSubmitting ? (
          <ActivityIndicator color="#5c4738" />
        ) : (
          <Text style={styles.secondaryButtonText}>Continue with Google</Text>
        )}
      </Pressable>

      <Link href="/(auth)/signup" style={styles.link}>
        No account yet? Create one
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    backgroundColor: "#fff7ef",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  heading: {
    color: "#23160f",
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 8,
  },
  subheading: {
    color: "#705c4d",
    fontSize: 16,
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#ffffff",
    borderColor: "#f0ddd2",
    borderRadius: 10,
    borderWidth: 1,
    color: "#23160f",
    fontSize: 16,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  error: {
    color: "#b42318",
    marginBottom: 12,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#ff6f61",
    borderRadius: 10,
    marginBottom: 12,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    alignItems: "center",
    backgroundColor: "#ffe4c7",
    borderRadius: 10,
    marginBottom: 18,
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: "#5c4738",
    fontSize: 15,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.65,
  },
  link: {
    color: "#a54d35",
    fontSize: 15,
    textAlign: "center",
  },
});
