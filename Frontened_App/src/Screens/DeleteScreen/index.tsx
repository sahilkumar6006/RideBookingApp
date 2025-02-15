import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const DeleteAccount = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Delete Account</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.description}>
          Are you sure you want to delete your account? Please read how account deletion will affect.
        </Text>
        
        <Text style={styles.description}>
          Deleting your account removes personal information our database. Your email becomes permanently reserved and same email cannot be re-use to register a new account.
        </Text>

        {/* Delete Button */}
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    borderBottomWidth: scale(1),
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    paddingVertical: verticalScale(4),
    paddingRight: scale(16),
  },
  backText: {
    fontSize: moderateScale(16),
    color: '#000000',
  },
  title: {
    fontSize: moderateScale(16),
    color: '#000000',
    marginLeft: scale(8),
  },
  content: {
    padding: scale(16),
    flex: 1,
  },
  description: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    color: '#666666',
    marginBottom: verticalScale(16),
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    borderRadius: scale(8),
    paddingVertical: verticalScale(14),
    marginTop: verticalScale(24),
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
});

export default DeleteAccount;