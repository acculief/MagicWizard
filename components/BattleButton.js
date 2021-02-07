import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../assets/styles';

class BattleButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.person1.magic.type !== null && this.props.person2.magic.type !== null) {
			return (
				<View
					style={{
						height: '100%',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<TouchableOpacity
						style={{
							height: '80%',
							maxHeight: 150,
							width: '60%',
							maxWidth: 200,
							borderColor: 'black',
							borderWidth: 1,
							backgroundColor: 'red',
							justifyContent: 'center',
							alignItems: 'center'
						}}
						onPress={() => this.props.onPress()}
					>
						<Text
							style={{
								fontSize: 42,
								fontWeight: 'bold',
								color: 'white'
							}}
						>
							Fight!
						</Text>
					</TouchableOpacity>
				</View>
			);
		} else {
			return null;
		}
	}
}

export default BattleButton;
