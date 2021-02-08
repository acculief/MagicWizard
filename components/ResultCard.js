import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

class ResultCard extends React.Component {
	constructor(props) {
		super(props);
	}

	resultCard = () => {
		let word = null;
		let cardStyles = null;
		const resultWord = this.props.resultWord;
		const resultValue = this.props.resultValue;

		if (resultWord === 'damage') {
			word = `${resultValue}ダメージ`;
		} else if (resultWord === 'heal') {
			word = `${resultValue}回復`;
		} else if (resultWord === 'counter') {
			word = `${resultValue}ダメージ`;
		} else if (resultWord === 'none') {
			word = `無事`;
		}

		return (
			<View style={[ cardStyles ]}>
				<Text>{word}</Text>
			</View>
		);
	};
	render() {
		return <View style={{ position: 'absolute' }}>{this.resultCard()}</View>;
	}
}

export default ResultCard;
