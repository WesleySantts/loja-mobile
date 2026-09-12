import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../theme/colors';

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = () => {
    const nextErrors = {};

    if (!email.trim()) nextErrors.email = 'Informe o e-mail.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Informe um e-mail válido.';
    }

    if (!senha) nextErrors.senha = 'Informe a senha.';
    else if (senha.length < 6) {
      nextErrors.senha = 'A senha deve ter pelo menos 6 caracteres.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      dispatch(login({
        name: email.split('@')[0],
        email: email.trim(),
      }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <Text style={styles.title}>Bem-vindo de volta!</Text>
          <Text style={styles.subtitle}>Entre para continuar sua experiência.</Text>
        </View>

        <View style={styles.formCard}>
          <FormInput
            label="E-mail"
            placeholder="seuemail@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            error={errors.email}
          />
          <FormInput
            label="Senha"
            placeholder="Digite sua senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            error={errors.senha}
          />
          <PrimaryButton title="Entrar" onPress={handleLogin} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  hero: {
    marginBottom: 18,
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 25,
    fontWeight: '800',
  },
  subtitle: {
    color: '#DBEAFE',
    fontSize: 13,
    marginTop: 6,
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 18,
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
});
