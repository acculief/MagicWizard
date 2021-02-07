import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../assets/styles';

class SpellButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={{ width: '20%', flexDirection: 'row', justifyContent: 'center' }}>
				<TouchableOpacity style={styles.button} onPress={() => this.props.onPress()}>
					<Text style={styles.buttonText}>詠唱</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default SpellButton;
