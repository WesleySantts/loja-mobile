import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import { colors } from '../theme/colors';

const GROUPS = {
  Masculino: ['mens-shirts', 'mens-shoes', 'mens-watches'],
  Feminino: ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches'],
};

const LABELS = {
  'mens-shirts': 'Camisas',
  'mens-shoes': 'Calçados',
  'mens-watches': 'Relógios',
  'womens-bags': 'Bolsas',
  'womens-dresses': 'Vestidos',
  'womens-jewellery': 'Joias',
  'womens-shoes': 'Calçados',
  'womens-watches': 'Relógios',
};

export default function ProductListScreen() {
  const navigation = useNavigation();
  const [group, setGroup] = useState('Masculino');
  const [category, setCategory] = useState(GROUPS.Masculino[0]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = async (selectedCategory = category, isRefresh = false) => {
    try {
      setError('');
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const data = await getProductsByCategory(selectedCategory);
      setProducts(data);
    } catch (err) {
      setError('Não foi possível carregar os produtos. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [category])
  );

  const changeGroup = (nextGroup) => {
    setGroup(nextGroup);
    const firstCategory = GROUPS[nextGroup][0];
    setCategory(firstCategory);
  };

  const renderHeader = () => (
    <View>
      <Text style={styles.heading}>Produtos</Text>
      <Text style={styles.subtitle}>Escolha uma categoria para visualizar os produtos.</Text>

      <View style={styles.groupTabs}>
        {Object.keys(GROUPS).map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => changeGroup(item)}
            style={[styles.groupTab, group === item && styles.groupTabActive]}
          >
            <Text style={[styles.groupText, group === item && styles.groupTextActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={GROUPS[group]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setCategory(item)}
            style={[styles.categoryChip, category === item && styles.categoryChipActive]}
          >
            <Text style={[styles.categoryText, category === item && styles.categoryTextActive]}>
              {LABELS[item]}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.categoryTitle}>{LABELS[category]}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando produtos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Ops!</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => loadProducts()}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.container}
      data={products}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      columnWrapperStyle={styles.row}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => loadProducts(category, true)}
          colors={[colors.primary]}
        />
      }
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
        />
      )}
      ListEmptyComponent={
        <Text style={styles.empty}>Nenhum produto encontrado nesta categoria.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  container: { padding: 16, paddingBottom: 30 },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 16,
  },
  groupTabs: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 9,
    padding: 3,
    marginBottom: 12,
  },
  groupTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 7,
  },
  groupTabActive: {
    backgroundColor: colors.primary,
  },
  groupText: { fontWeight: '700', color: colors.textSecondary },
  groupTextActive: { color: colors.white },
  categoryList: { gap: 8, paddingBottom: 14 },
  categoryChip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  categoryText: { color: colors.textSecondary, fontSize: 12, fontWeight: '600' },
  categoryTextActive: { color: colors.primary },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 10,
  },
  row: { gap: 10 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  loadingText: { marginTop: 10, color: colors.textSecondary },
  errorTitle: { fontSize: 24, fontWeight: '800', color: colors.text },
  errorText: { textAlign: 'center', color: colors.textSecondary, marginTop: 8, lineHeight: 20 },
  retryButton: {
    marginTop: 18,
    backgroundColor: colors.primary,
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 8,
  },
  retryText: { color: colors.white, fontWeight: '700' },
  empty: { color: colors.textSecondary, textAlign: 'center', paddingVertical: 30 },
});
