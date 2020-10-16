import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';
import OrphanageData from './pages/OrphanageData';
import SelectMapPosition from './pages/SelectMapPosition';
import Header from './components/Header';

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#F2F3F5'}}}>
        <AppStack.Screen name="OrphanagesMap" component={OrphanagesMap}/>
        <AppStack.Screen name="OrphanageDetails" component={OrphanageDetails} options ={{headerShown: true, header: () => <Header title="Orfanato" showCancel={false}/>}}/>
        <AppStack.Screen name="OrphanageData" component={OrphanageData} options ={{headerShown: true, header: () => <Header title="Selecione no mapa"/>}}/>
        <AppStack.Screen name="SelectMapPosition" component={SelectMapPosition} options ={{headerShown: true, header: () => <Header title="Informe os dados"/>}}/>
      </AppStack.Navigator>
    </NavigationContainer>
  )
}
