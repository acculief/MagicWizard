import React from 'react';
import { View, Text, Dimensions } from 'react-native';

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
			cardStyles = {
				padding: 5,
				backgroundColor: 'red',
				transform: [ { translateY: '-50%' }, { translateX: '100%' } ]
			};
		} else if (resultWord === 'heal') {
			word = `${resultValue}回復`;
			cardStyles = {
				padding: 5,
				backgroundColor: '#FF66FF',
				transform: [ { translateY: '-50%' }, { translateX: '-100%' } ]
			};
		} else if (resultWord === 'counter') {
			word = `${resultValue}反射ダメージ`;
			cardStyles = {
				padding: 5,
				backgroundColor: '#FF6600',
				transform: [ { translateY: '-50%' }, { translateX: '-100%' } ]
			};
		} else if (resultWord === 'none') {
			word = `無事`;
			cardStyles = {
				padding: 5,
				backgroundColor: 'green',
				transform: [ { translateY: '-50%' }, { translateX: '100%' } ]
			};
		}

		return (
			<View
				style={[
					cardStyles,
					{
						position: 'absolute',
						// right: 0,
						alignSelf: 'center',
						justifyContent: 'center',
						alignItems: 'center',
						width: Dimensions.get('window').width / 3,
						height: Dimensions.get('window').width / 3,
						borderRadius: Dimensions.get('window').width / 12
					}
				]}
			>
				<Text
					style={{
						color: 'white',
						fontSize: 18
					}}
				>
					{word}
				</Text>
			</View>
		);
	};
	render() {
		return <View style={{ position: 'absolute' }}>{this.resultCard()}</View>;
	}
}

export default ResultCard;
