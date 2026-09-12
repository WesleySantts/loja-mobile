import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getProductById } from '../services/api';
import { colors } from '../theme/colors';

const money = (value) =>
  Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'USD',
  });

export default function ProductDetailsScreen({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await getProductById(productId);
        if (active) setProduct(data);
      } catch (err) {
        if (active) setError('Não foi possível carregar os detalhes do produto.');
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.muted}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error || 'Produto não encontrado.'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="contain" />

      <View style={styles.content}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{money(product.price)}</Text>
          <Text style={styles.discount}>{Math.round(product.discountPercentage)}% OFF</Text>
        </View>

        <Text style={styles.original}>
          Avaliação: {product.rating?.toFixed(1) ?? '—'} / 5
        </Text>

        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.info}><Text style={styles.bold}>Marca:</Text> {product.brand || 'Não informada'}</Text>
          <Text style={styles.info}><Text style={styles.bold}>Estoque:</Text> {product.stock ?? '—'} unidades</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  container: { paddingBottom: 30 },
  image: {
    width: '100%',
    height: 310,
    backgroundColor: colors.white,
  },
  content: { padding: 18 },
  category: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '800',
    marginTop: 5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
  },
  price: { fontSize: 22, fontWeight: '800', color: colors.text },
  discount: {
    color: colors.white,
    backgroundColor: colors.danger,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: 11,
    fontWeight: '800',
  },
  original: { color: colors.textSecondary, marginTop: 5, fontSize: 12 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginTop: 24,
    marginBottom: 8,
  },
  description: { color: colors.textSecondary, fontSize: 14, lineHeight: 21 },
  infoBox: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 9,
    padding: 14,
    marginTop: 20,
  },
  info: { color: colors.textSecondary, marginBottom: 7 },
  bold: { color: colors.text, fontWeight: '700' },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  muted: { color: colors.textSecondary, marginTop: 10 },
  error: { color: colors.danger, textAlign: 'center' },
});
