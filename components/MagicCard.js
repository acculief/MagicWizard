import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
const styles = StyleSheet.create({
	tinyLogo: {
		width: '60%',
		height: '60%',
		marginVertical: 5
	}
});
class MagicCard extends React.Component {
	constructor(props) {
		super(props);
	}

	magicType = () => {
		const magicType = this.props.magic.type;
		let word = undefined;
		let color = undefined;
		if (magicType === 'attack') {
			word = '攻';
			color = 'red';
		} else if (magicType === 'heal') {
			word = '癒';
			color = '#FF66FF';
		} else if (magicType === 'block') {
			word = '防';
			color = 'blue';
		} else if (magicType === 'counter') {
			word = '反';
			color = '#FF6600';
		}

		return { word: word, color: color };
	};

	render() {
		return (
			<View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
				<Text
					style={{
						fontWeight: 'bold',
						color: this.props.role === 'attacker' ? 'red' : 'blue'
					}}
				>
					{this.props.name}
				</Text>

				<Image
					resizeMode={'contain'}
					style={styles.tinyLogo}
					source={{
						uri: 'https://reactnative.dev/img/tiny_logo.png'
					}}
				/>
				<Text style={{ fontWeight: 'bold' }}>{this.props.magic.word}</Text>
				<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
					<Text
						style={{
							color: 'black'
						}}
					>
						威:{this.props.magic.count}{' '}
					</Text>
					<Text
						style={{
							color: this.magicType().color
						}}
					>
						種:{this.magicType().word}
					</Text>
				</View>
			</View>
		);
	}
}

export default MagicCard;
