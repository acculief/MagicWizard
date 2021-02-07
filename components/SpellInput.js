import React from 'react';
import { Text, View, TextInput } from 'react-native';
import styles from '../assets/styles';

class SpellInput extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={[ styles.textInput ]}>
				<TextInput
					style={{ width: '100%' }}
					placeholder="呪文を入力"
					placeholderTextColor="#8E8E93"
					onChangeText={(value) => this.props.onChangeWord(value)}
					onSubmitEditing={() => this.props.onSubmitEditing()}
					autoFocus={true}
					value={this.props.word}
				/>
			</View>
		);
	}
}

export default SpellInput;
