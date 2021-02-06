import React from 'react';
import { View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';

class Rule extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	changeAsign = () => {
		console.log('start');
	};

	input = () => {
		console.log('stop');
	};

	batle = () => {
		console.log('end');
	};

	render() {
		return <View />;
	}
}

export default Rule;
