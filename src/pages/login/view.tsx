import React from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import useLoginViewModel from "./view.model";

const LoginView: React.FC = () => {
  const { email, password, setEmail, setPassword, isLoading, onSubmit } = useLoginViewModel();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>E-email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder={"Your e-mail address"} />
        <Text>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={"Your password"}
          secureTextEntry={true} />
      </View>
      <Button title={'Login'} onPress={onSubmit} disabled={isLoading} />
    </SafeAreaView>
  );
};

export default LoginView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});