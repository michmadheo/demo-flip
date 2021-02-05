import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TransactionList from '../pages/TransactionList';
import TransactionDetail from '../pages/TransactionDetail';

const Stack = createStackNavigator();

function Navigation(){
  return(
      <NavigationContainer>
        <Stack.Navigator headerMode={false} mode={'card'} >
            <Stack.Screen name="TransactionList" component={TransactionList} />
            <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default Navigation;
