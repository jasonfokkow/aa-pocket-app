import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/theme';
import { Divider } from '../components/Divider';
import { SearchBar } from '../components/SearchBar';
import { FilterTabs } from '../components/FilterTabs';
import { Badge } from '../components/Badge';
import { PRODUCTS, Product, ProductType } from '../data/products';
import { RootStackParamList } from '../navigation/types';

type FilterTab = 'All' | ProductType;
const TABS: FilterTab[] = ['All', 'Evergreen', 'Vintage'];

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 16 * 2 - 16) / 2; // 2 columns, 16px margins, 16px gap

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;
}

const ProductCard: React.FC<{ product: Product; onPress: () => void }> = ({ product, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    {/* Image placeholder */}
    <View style={[styles.cardImage, { backgroundColor: product.imageColor }]}>
      <MaterialCommunityIcons name="image-outline" size={32} color="rgba(0,0,0,0.15)" />
    </View>
    {/* Info */}
    <View style={styles.cardInfo}>
      <Text style={styles.cardName} numberOfLines={2}>{product.name}</Text>
      <Text style={styles.cardPrice}>{product.priceDisplay}</Text>
      <View style={styles.cardBadges}>
        <Badge variant={product.stockStatus === 'In Stock' ? 'in-stock' : 'preorder'} />
        {product.hasFlashcard && (
          <Text style={styles.fcBadge}>FC</Text>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

export const CatalogueScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [selectedTab, setSelectedTab] = useState<FilterTab>('All');

  const filtered = useMemo(() => {
    let products = PRODUCTS;
    if (selectedTab !== 'All') {
      products = products.filter((p) => p.type === selectedTab);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return products;
  }, [search, selectedTab]);

  const renderItem = ({ item, index }: { item: Product; index: number }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Catalogue</Text>
        <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <MaterialCommunityIcons name="magnify" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>
      <Divider />

      {/* Search */}
      <View style={styles.searchWrapper}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search products..."
        />
      </View>
      <Divider />

      {/* Filter tabs */}
      <FilterTabs tabs={TABS} selected={selectedTab} onSelect={setSelectedTab} />

      {/* Grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No products found.</Text>
          </View>
        }
      />
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 17,
    color: Colors.text,
  },
  searchWrapper: {
    paddingVertical: 12,
  },
  grid: {
    padding: 16,
    paddingBottom: 32,
  },
  row: {
    gap: 16,
    marginBottom: 16,
  },
  card: {
    width: CARD_SIZE,
    borderWidth: 1,
    borderColor: Colors.divider,
    backgroundColor: Colors.surface,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    padding: 12,
    gap: 4,
  },
  cardName: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.text,
    lineHeight: 14 * 1.4,
  },
  cardPrice: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  cardBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  fcBadge: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: Colors.accent,
  },
  empty: {
    paddingTop: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: Colors.textSecondary,
  },
});
