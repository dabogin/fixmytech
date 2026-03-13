import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const CATEGORIES = ['Phones', 'Laptops', 'Computers', 'Tablets'];

const REPAIR_ITEMS = [
  { id: 1, name: 'Phones', icon: '📱' },
  { id: 2, name: 'Laptops', icon: '💻' },
  { id: 3, name: 'Computers', icon: '🖥️' },
  { id: 4, name: 'Tablets', icon: '📱' },
  { id: 5, name: 'Smart Home\nDevices', icon: '🏠' },
  { id: 6, name: 'Other Devices', icon: '🔌' },
];

export default function HomeScreen({ onLogout, user }) {
  const [selectedCategory, setSelectedCategory] = useState('Phones');
  const [activeTab, setActiveTab] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');

  const renderTabBar = () => (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => setActiveTab('Home')}
      >
        <Text style={[styles.tabIcon, activeTab === 'Home' && styles.tabIconActive]}>
          🏠
        </Text>
        <Text style={[styles.tabLabel, activeTab === 'Home' && styles.tabLabelActive]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => setActiveTab('MyRepairs')}
      >
        <Text style={[styles.tabIcon, activeTab === 'MyRepairs' && styles.tabIconActive]}>
          🔧
        </Text>
        <Text style={[styles.tabLabel, activeTab === 'MyRepairs' && styles.tabLabelActive]}>
          My Repairs
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => setActiveTab('Messages')}
      >
        <Text style={[styles.tabIcon, activeTab === 'Messages' && styles.tabIconActive]}>
          💬
        </Text>
        <Text style={[styles.tabLabel, activeTab === 'Messages' && styles.tabLabelActive]}>
          Messages
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => setActiveTab('Profile')}
      >
        <Text style={[styles.tabIcon, activeTab === 'Profile' && styles.tabIconActive]}>
          👤
        </Text>
        <Text style={[styles.tabLabel, activeTab === 'Profile' && styles.tabLabelActive]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon} />
          <Text style={styles.logoText}>FixMyTech</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a repair..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <Text style={styles.micIcon}>🎤</Text>
          </TouchableOpacity>
        </View>

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContainer}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryPill,
                selectedCategory === category && styles.categoryPillActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Need tech repair?</Text>
          <Text style={styles.heroSubtitle}>Choose your device{'\n'}to get started.</Text>

          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book a Repair</Text>
          </TouchableOpacity>

          {/* Device Illustration */}
          <View style={styles.deviceIllustration}>
            <View style={styles.deviceCardLarge}>
              <Text style={styles.deviceIconLarge}>🖥️</Text>
            </View>
            <View style={styles.deviceCardSmall}>
              <Text style={styles.deviceIconSmall}>💻</Text>
            </View>
          </View>
        </View>

        {/* All Repair Items */}
        <View style={styles.repairItemsSection}>
          <Text style={styles.sectionTitle}>All repair items</Text>
          <View style={styles.repairGrid}>
            {REPAIR_ITEMS.map((item) => (
              <TouchableOpacity key={item.id} style={styles.repairItem}>
                <Text style={styles.repairItemIcon}>{item.icon}</Text>
                <Text style={styles.repairItemText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom Padding for Tab Bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Tab Bar */}
      {renderTabBar()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  backArrow: {
    fontSize: 24,
    color: '#1a1a1a',
    width: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#10B981',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 8,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
    padding: 0,
  },
  micIcon: {
    fontSize: 18,
    color: '#6B7280',
  },
  categoryScroll: {
    marginTop: 16,
    marginBottom: 8,
  },
  categoryContainer: {
    gap: 10,
    paddingRight: 16,
  },
  categoryPill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  categoryPillActive: {
    backgroundColor: '#10B981',
  },
  categoryText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  heroSection: {
    marginTop: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
    lineHeight: 22,
  },
  bookButton: {
    backgroundColor: '#059669',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  deviceIllustration: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 30,
  },
  deviceCardLarge: {
    width: 120,
    height: 140,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceIconLarge: {
    fontSize: 40,
  },
  deviceCardSmall: {
    width: 90,
    height: 110,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  deviceIconSmall: {
    fontSize: 32,
  },
  repairItemsSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  repairGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  repairItem: {
    width: (width - 56) / 3,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  repairItemIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  repairItemText: {
    fontSize: 13,
    color: '#374151',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 18,
  },
  bottomPadding: {
    height: 100,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingBottom: 20,
  },
  tabItem: {
    alignItems: 'center',
    gap: 4,
  },
  tabIcon: {
    fontSize: 22,
  },
  tabIconActive: {
    color: '#10B981',
  },
  tabLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#10B981',
    fontWeight: '600',
  },
});
