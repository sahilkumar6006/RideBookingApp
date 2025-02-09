import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Wallet from '../screens/Payment/Wallet';
import TopUp from '../screens/Wallet/TopUp';
import SendMoney from '../screens/Wallet/SendMoney';
import PaymentMethods from '../screens/Wallet/PaymentMethods';
import AddPaymentMethod from '../screens/Wallet/AddPaymentMethod';
import TransactionHistory from '../screens/Wallet/TransactionHistory';
import TransactionDetail from '../screens/Wallet/TransactionDetail';

const Stack = createStackNavigator();

const WalletNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="WalletHome" component={Wallet} />
            <Stack.Screen name="TopUp" component={TopUp} />
            <Stack.Screen name="SendMoney" component={SendMoney} />
            <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
            <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethod} />
            <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
            <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
        </Stack.Navigator>
    );
};

export default WalletNavigator;