import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';

class Status extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<Text>
					Person1 hp:{this.props.hp} role:{this.props.role}
				</Text>
			</View>
		);
	}
}

export default Status;
