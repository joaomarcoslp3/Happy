import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import mapMarkerImg from '../../assets/map-marker.svg';
import api from '../../services/api';
import './styles.css';

const mapIcon = Leaflet.icon({
	iconUrl: mapMarkerImg,
	iconSize: [ 58, 68 ],
	iconAnchor: [ 29, 68 ],
	popupAnchor: [ 170, 2 ]
});

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
	const [ orphanages, setOrphanages ] = useState<Orphanage[]>([]);
	const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0])

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      setInitialPosition([latitude, longitude]);
    })
  }, [])


	useEffect(() => {
		api.get('/orphanages').then((res) => {
      setOrphanages(res.data);
		});
	}, []);

	return (
		<div id="page-map">
			<aside>
				<header>
					<img src={mapMarkerImg} alt="Happy" />

					<h2>Escolha um orfanato no mapa</h2>
					<p>Muitas crianças estão esperando a sua visita :)</p>
				</header>

				<footer>
					<strong>Formiga</strong>
					<span>Minas Gerais</span>
				</footer>
			</aside>

			<Map
				center={[ initialPosition[0], initialPosition[1] ]}
				zoom={15}
				style={{
					width: '100%',
					height: '100%'
				}}
			>
				{/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
				<TileLayer
					url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process
						.env.REACT_APP_MAPBOX_TOKEN}`}
				/>
				{orphanages.map(orphanage => {
          return(
            <Marker 
              icon={mapIcon} 
              position={[orphanage.latitude, orphanage.longitude]}
              key={orphanage.id} 
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          )
				})}
			</Map>

			<Link to="orphanages/create" className="create-orphanage">
				<FiPlus size={32} color="#FFF" />
			</Link>
		</div>
	);
}
