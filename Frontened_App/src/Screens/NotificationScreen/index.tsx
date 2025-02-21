// NotificationScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

const NotificationScreen = () => {
  const notifications = [
    { id: 1, date: 'Today', message: 'Payment confirm', time: '15 min ago' },
    { id: 2, date: 'Today', message: 'Payment confirm', time: '25 min ago' },
    { id: 3, date: 'Yesterday', message: 'Payment confirm', time: '15 min ago' },
    { id: 4, date: 'Yesterday', message: 'Payment confirm', time: '25 min ago' },
    { id: 5, date: 'Yesterday', message: 'Payment confirm', time: '25 min ago' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>Notification</Text>
      <ScrollView>
        {['Today', 'Yesterday'].map((date) => (
          <View key={date}>
            <Text style={styles.dateHeader}>{date}</Text>
            {notifications
              .filter(notification => notification.date === date)
              .map(notification => (
                <View key={notification.id} style={styles.notificationCard}>
                  <Text style={styles.notificationText}>{notification.message}</Text>
                  <Text style={styles.notificationTime}>{notification.time}</Text>
                </View>
              ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: scale(20),
  },
  backButton: {
    marginBottom: verticalScale(20),
  },
  backText: {
    fontSize: scale(16),
    color: '#007BFF',
  },
  headerText: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
  },
  dateHeader: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginVertical: verticalScale(10),
  },
  notificationCard: {
    backgroundColor: '#E6F7E6',
    padding: scale(15),
    borderRadius: scale(8),
    marginBottom: verticalScale(10),
  },
  notificationText: {
    fontSize: scale(16),
  },
  notificationTime: {
    fontSize: scale(12),
    color: '#7A7A7A',
  },
});

export default NotificationScreen;