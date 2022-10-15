import { useState } from "react"
import { Alert } from "react-native";
import { login } from "../../repositories/auth.repository";

const useLoginViewModel = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    console.log({ email, password });
    try {
      setIsLoading(true);
      const response = await login({ email, password });
      console.log(response);
    } catch (err) {
      console.log(err);
      Alert.alert('Oops!', 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  }

  return {
    email,
    password,
    setEmail,
    setPassword,
    isLoading,
    onSubmit,
  }
}

export default useLoginViewModel;