import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';

import mapMarkerImg from '../../assets/map-marker.png';

import styles from './styles';

export default function SelectMapPosition() {
	const [ position, setPosition ] = useState({ latitude: 0, longitude: 0 });

	const navigation = useNavigation();

	function selectMapPosition(e: MapEvent) {
		setPosition(e.nativeEvent.coordinate);
	}

	function handleNextStep() {
		navigation.navigate('OrphanageData', {position});
	}

	return (
		<View style={styles.container}>
			<MapView
				initialRegion={{
					latitude: -20.456781242975893,
					longitude: -45.41749136522412,
					latitudeDelta: 0.008,
					longitudeDelta: 0.008
				}}
				onPress={selectMapPosition}
				style={styles.mapStyle}
			>
				{position.latitude !== 0 && (
					<Marker
						icon={mapMarkerImg}
						coordinate={{ latitude: position.latitude, longitude: position.longitude }}
					/>
				)}
			</MapView>

			{position.latitude !== 0 && (
				<RectButton style={styles.nextButton} onPress={handleNextStep}>
					<Text style={styles.nextButtonText}>Próximo</Text>
				</RectButton>
			)}
		</View>
	);
}
