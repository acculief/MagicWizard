import React from 'react';
import { View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';

class Person extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			person1: {
				hp: 40,
				role: null
			},
			person2: {
				hp: 40,
				role: null
			},
			currentperson: null
		};
	}

	render() {
		return (
			<View person1={this.state.person1} person2={this.state.person2} currentperson={this.state.currentperson} />
		);
	}
}

export default Person;
