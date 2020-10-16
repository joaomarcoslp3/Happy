import React, { useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import {Feather} from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';
import mapMarker from '../../assets/map-marker.png';
import api from '../../services/api';

interface Orphanage {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
}

export default function OrphanagesMap() {
	const [orphanages, setOrphanages] = useState<Orphanage[]>([])
	const navigator = useNavigation();

	useFocusEffect(() => {
		api.get('/orphanages').then(res => {
			setOrphanages(res.data)
		})
	});
	
  function navigateToOrphanageDetails(id: number) {
    navigator.navigate('OrphanageDetails', { id })
	}
	
	function navigateToSelectMapPosition() {
    navigator.navigate('SelectMapPosition')
  }

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: -20.456781242975893,
	        longitude: -45.41749136522412,
					latitudeDelta: 0.008,
					longitudeDelta: 0.008
				}}
				provider={PROVIDER_GOOGLE}
			>
				{orphanages.map(orphanage => (
					<Marker
          icon={mapMarker}
          calloutAnchor={{
            x: 2.7,
            y: 0.8
          }}
					coordinate={{
						latitude: orphanage.latitude,
	          longitude: orphanage.longitude
					}}
					key={orphanage.id}
				>
					<Callout tooltip onPress={() => navigateToOrphanageDetails(orphanage.id)}>
						<View style={styles.calloutContainer}>
							<Text style={styles.calloutText}>{orphanage.name}</Text>
						</View>
					</Callout>
				</Marker>
				))}
			</MapView>

      <View style={styles.footer}>
          <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
          <RectButton style={styles.createOrphanageButton} onPress={navigateToSelectMapPosition}>
            <Feather name="plus" size={20} color="#FFF"/>
          </RectButton>
      </View>
		</View>
	);
}
