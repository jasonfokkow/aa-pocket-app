import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors } from '../constants/theme';
import { Divider } from '../components/Divider';
import { Badge } from '../components/Badge';
import { PRODUCTS } from '../data/products';
import { RootStackParamList } from '../navigation/types';

const { width } = Dimensions.get('window');

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;
  route: RouteProp<RootStackParamList, 'ProductDetail'>;
}

export const ProductDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { productId } = route.params;
  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <MaterialCommunityIcons name="chevron-left" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{product.name}</Text>
        <View style={{ width: 24 }} />
      </View>
      <Divider />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product image */}
        <View style={[styles.image, { backgroundColor: product.imageColor }]}>
          <MaterialCommunityIcons name="image-outline" size={48} color="rgba(0,0,0,0.15)" />
        </View>

        {/* Name, price, status */}
        <View style={styles.infoBlock}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{product.priceDisplay}</Text>
            <Badge variant={product.stockStatus === 'In Stock' ? 'in-stock' : 'preorder'} />
          </View>
          <View style={styles.typeBadgeRow}>
            <Badge variant={product.type === 'Vintage' ? 'vintage' : 'evergreen'} />
            {product.hasFlashcard && <Badge variant="flashcard" />}
          </View>
        </View>

        <Divider />

        {/* Detail rows */}
        {[
          { label: 'MATERIAL', value: product.material },
          { label: 'DIMENSIONS', value: product.dimensions },
          { label: 'SOURCE', value: product.source },
          ...(product.variants ? [{ label: 'VARIANTS', value: product.variants }] : []),
        ].map((row) => (
          <View key={row.label}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>{row.label}</Text>
              <Text style={styles.detailValue}>{row.value}</Text>
            </View>
            <Divider />
          </View>
        ))}

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bodyText}>{product.description}</Text>
        </View>

        <Divider />

        {/* Care instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Care Instructions</Text>
          <Text style={styles.bodyText}>{product.careInstructions}</Text>
        </View>

        <Divider />

        {/* Linked SOP */}
        {product.linkedSOPId && product.linkedSOPTitle && (
          <>
            <TouchableOpacity
              style={styles.linkedSOPRow}
              onPress={() => navigation.navigate('SOPDetail', { topicId: product.linkedSOPId! })}
              activeOpacity={0.7}
            >
              <Text style={styles.linkedSOPText}>
                Sale procedure: {product.linkedSOPTitle} →
              </Text>
              <MaterialCommunityIcons name="open-in-new" size={14} color={Colors.accent} />
            </TouchableOpacity>
            <Divider />
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 17,
    color: Colors.text,
  },

  image: {
    width: width,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoBlock: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 6,
  },
  productName: {
    fontFamily: 'EBGaramond_400Regular',
    fontSize: 22,
    color: Colors.text,
    lineHeight: 22 * 1.2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  price: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors.textSecondary,
  },
  typeBadgeRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 2,
  },

  detailRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  detailLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  detailValue: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.text,
  },

  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: Colors.text,
  },
  bodyText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.text,
    lineHeight: 14 * 1.7,
  },

  linkedSOPRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  linkedSOPText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    color: Colors.accent,
  },
});
