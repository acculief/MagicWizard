import React from 'react';
import { Dimensions, View, Text, ScrollView, TouchableOpacity } from 'react-native';

class Log extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<ScrollView
					style={{
						height: Dimensions.get('window').height / 4,
						margin: 15,
						paddingHorizontal: 15,
						backgroundColor: '#FFFFCC'
					}}
				>
					<Text style={{ fontSize: 12 }}>{this.props.log}</Text>
				</ScrollView>
			</View>
		);
	}
}

export default Log;
