import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../theme/colors';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    Alert.alert(
      'Sair da conta',
      'Deseja realmente sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: () => dispatch(logout()) },
      ]
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header} />
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{(user?.name || 'U')[0].toUpperCase()}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{user?.name || 'Usuário'}</Text>
        <Text style={styles.email}>{user?.email || ''}</Text>

        <View style={styles.menu}>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Minha conta</Text>
            <Text style={styles.arrow}>›</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Configurações</Text>
            <Text style={styles.arrow}>›</Text>
          </View>
        </View>

        <PrimaryButton title="Sair da conta" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.white },
  header: { height: 120, backgroundColor: colors.primary },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.white,
    borderWidth: 4,
    borderColor: colors.white,
    alignSelf: 'center',
    marginTop: -44,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  avatarText: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.primary,
  },
  content: { padding: 20 },
  name: { textAlign: 'center', fontSize: 22, fontWeight: '800', color: colors.text },
  email: { textAlign: 'center', color: colors.textSecondary, marginTop: 4 },
  menu: { marginVertical: 28 },
  item: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemTitle: { color: colors.text, fontWeight: '600' },
  arrow: { fontSize: 24, color: colors.textSecondary },
});
