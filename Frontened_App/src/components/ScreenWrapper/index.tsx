import React from 'react';
import { View, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

const ScreenWrapper = ({
  children,
  showHeader = true,
  headerTitle = '',
  showBackButton = true,
  onBackPress,
  showBottomNav = false,
  containerStyle,
  headerRight,
}) => {
  const renderHeader = () => {
    if (!showHeader) return null;

    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {showBackButton && (
            <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
              <Icon name="arrow-left" size={18} color="#000" />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <Text style={styles.headerTitle}>{headerTitle}</Text>
        
        <View style={styles.headerRight}>
          {headerRight}
        </View>
      </View>
    );
  };

  const renderBottomNav = () => {
    if (!showBottomNav) return null;

    return (
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>Favourite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>Offer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {renderHeader()}
      <View style={[styles.content, containerStyle]}>
        {children}
      </View>
      {renderBottomNav()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  headerLeft: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  headerTitle: {
    flex: 2,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#fff',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScreenWrapper;