import React from 'react';
import { View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import Rule from './Rule';
import Person from './Person';
import Magic from '../models/Magic';

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	start = () => {
		console.log('start');
	};

	stop = () => {
		console.log('stop');
	};

	end = () => {
		console.log('end');
	};

	render() {
		return (
			<View>
				<Rule>
					<Person player={1}>
						<Magic />
					</Person>
					<Person player={2}>
						<Magic />
					</Person>
				</Rule>
				{this.props.children}
			</View>
		);
	}
}

export default Game;
