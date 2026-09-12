import React from 'react';
import { Image, Pressable, Text, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';

const money = (value) =>
  Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'USD',
  });

export default function ProductCard({ product, onPress }) {
  const discount = Math.round(product.discountPercentage ?? 0);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="contain" />
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>{product.title}</Text>
        <Text numberOfLines={2} style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>{money(product.price)}</Text>
        <Text style={styles.discount}>{discount}% de desconto</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    minHeight: 255,
  },
  pressed: { opacity: 0.8 },
  image: {
    width: '100%',
    height: 125,
    backgroundColor: '#F3F4F6',
  },
  content: { padding: 10 },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    lineHeight: 15,
    color: colors.textSecondary,
    minHeight: 30,
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    marginTop: 8,
  },
  discount: {
    fontSize: 11,
    color: colors.danger,
    fontWeight: '600',
    marginTop: 2,
  },
});
