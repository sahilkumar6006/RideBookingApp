import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Wallet = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Add Money Button */}
      <View style={styles.addMoneyContainer}>
        <TouchableOpacity style={styles.addMoneyButton}>
          <Text style={styles.addMoneyText}>Add Money</Text>
        </TouchableOpacity>
      </View>

      {/* Balance Cards */}
      <View style={styles.balanceContainer}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceAmount}>$500</Text>
          <Text style={styles.balanceLabel}>Available Balance</Text>
        </View>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceAmount}>$200</Text>
          <Text style={styles.balanceLabel}>Total Expend</Text>
        </View>
      </View>

      {/* Transactions */}
      <View style={styles.transactionsHeader}>
        <Text style={styles.transactionsTitle}>Transactions</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.transactionsList}>
        {[
          { name: 'Welton', time: 'Today at 09:20 am', amount: -570, type: 'debit' },
          { name: 'Nathsam', time: 'Today at 09:20 am', amount: 570, type: 'credit' },
          { name: 'Welton', time: 'Today at 09:20 am', amount: -570, type: 'debit' },
          { name: 'Nathsam', time: 'Today at 09:20 am', amount: 570, type: 'credit' },
          { name: 'Nathsam', time: 'Today at 09:20 am', amount: 570, type: 'credit' },
        ].map((transaction, index) => (
          <View key={index} style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
              <View style={[
                styles.transactionIcon,
                { backgroundColor: transaction.type === 'credit' ? '#E8F5E9' : '#FFEBEE' }
              ]}>
                <Ionicons
                  name={transaction.type === 'credit' ? 'arrow-down' : 'arrow-up'}
                  size={20}
                  color={transaction.type === 'credit' ? '#4CAF50' : '#F44336'}
                />
              </View>
              <View>
                <Text style={styles.transactionName}>{transaction.name}</Text>
                <Text style={styles.transactionTime}>{transaction.time}</Text>
              </View>
            </View>
            <Text style={[
              styles.transactionAmount,
              { color: transaction.type === 'credit' ? '#4CAF50' : '#F44336' }
            ]}>
              {transaction.type === 'credit' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 60,
  },
  addMoneyContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
  },
  addMoneyButton: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addMoneyText: {
    color: '#4CAF50',
    fontSize: 16,
  },
  balanceContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  balanceCard: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 8,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  balanceLabel: {
    color: '#666',
    marginTop: 4,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  seeAllText: {
    color: '#4CAF50',
  },
  transactionsList: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  transactionTime: {
    color: '#666',
    fontSize: 14,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Wallet;