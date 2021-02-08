import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import MagicCard from './MagicCard';

class Log extends React.Component {
	constructor(props) {
		super(props);
	}
	attackerMagic = () => {
		const attacker = this.props.attacker;
		if (attacker) {
			return <MagicCard role={'attacker'} name={attacker.name} magic={attacker.magic} />;
		}
	};
	blockerMagic = () => {
		const blocker = this.props.blocker;
		if (this.props.blocker) {
			return <MagicCard role={'blocker'} name={blocker.name} magic={blocker.magic} />;
		}
	};
	render() {
		return (
			<View
				style={{
					height: '100%',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					position: 'relative'
				}}
			>
				<View style={{ width: '45%', alignItems: 'center' }}>{this.attackerMagic()}</View>
				<View style={{ width: '10%', alignItems: 'center' }}>
					<Text>→</Text>
				</View>
				<View style={{ width: '45%', alignItems: 'center' }}>{this.blockerMagic()}</View>
			</View>
		);
	}
}

export default Log;
