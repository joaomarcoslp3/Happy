import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import {Link} from 'react-router-dom'

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Landing() {
	return (
		<div id="page-landing">
			<div className="content-wrapper">
				<img src={logoImg} alt="logo" />

				<main>
					<h1>Leve felicidade para o mundo</h1>
					<p>Visite orfanatos e mude o dia de muitas crianças.</p>
				</main>

				<div className="location">
					<strong>Formiga</strong>
					<span>Minas Gerais</span>
				</div>

				<Link to="/app" className="enter-app">
            <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)"/>
				</Link>
			</div>
		</div>
	);
}

