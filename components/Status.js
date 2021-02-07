import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import styles from '../assets/styles';

class Status extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let role = this.props.role == 'attacker' ? '攻撃' : '防御';
		return (
			<View style={[ styles.outlineStatus, styles.bgOfStatus ]}>
				<View style={styles.leftBlockOfStatus}>
					<Text style={{ fontSize: 18 }}>★</Text>
					<Text style={[ styles.nameText, { color: this.props.role == 'attacker' ? 'red' : 'blue' } ]}>
						{this.props.name}
					</Text>
				</View>
				<View style={styles.rightBlockOfStatus}>
					<Text style={styles.statusText}>HP:{this.props.hp}</Text>
					<Text style={[ styles.roleText, { color: this.props.role == 'attacker' ? 'red' : 'blue' } ]}>
						{role}
					</Text>
				</View>
			</View>
		);
	}
}

export default Status;
