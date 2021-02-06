import React from 'react';
import { View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';

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
		return <View />;
	}
}

export default Game;
