import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../assets/styles';

class CurrentFaseBadge extends React.Component {
	constructor(props) {
		super(props);
	}

	currentFase = () => {
		let fase = undefined;
		let isReady = false;
		if (this.props.person1.magic.type && this.props.person2.magic.type) {
			isReady = true;
		}

		if (this.props.fase === 'changeAsign') {
			fase = '攻守交代';
		} else if (this.props.fase === 'input' && !isReady) {
			fase = `${this.props.person.name}:呪文を入力`;
		} else if (this.props.fase === 'input' && isReady) {
			fase = '準備完了？';
		} else if (this.props.fase === 'battle') {
			fase = 'バトル';
		}
		return fase;
	};
	render() {
		return (
			<View
				style={{
					backgroundColor: 'white',
					borderColor: 'green',
					borderWidth: 1,
					borderRadius: 15,
					marginHorizontal: 15,
					height: 30,
					justifyContent: 'center',
					marginTop: 5,
					paddingHorizontal: 15
				}}
			>
				<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{this.currentFase()} </Text>
			</View>
		);
	}
}

export default CurrentFaseBadge;
