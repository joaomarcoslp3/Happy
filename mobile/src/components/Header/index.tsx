import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'

import styles from './styles';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

export default function Header({title, showCancel = true}: HeaderProps) {
  const navigator = useNavigation();

  function goBack() {
    navigator.goBack();
  }

  function navigateToOrphanagesMap() {
    navigator.navigate('OrphanagesMap');
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={goBack}>
        <Feather name="arrow-left" size={24} color="#15B6D6"/>
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>

      {showCancel ? (
        <BorderlessButton onPress={navigateToOrphanagesMap}>
          <Feather name="x" size={24} color="#FF669D"/>
        </BorderlessButton>
      ) : <View/>
    }
    </View>
  )
}