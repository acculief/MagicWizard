import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import MagicCard from './MagicCard';
import ResultCard from './ResultCard';

class Log extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			resultFlag: false,
			resultWord: null
		};
	}

	componentDidUpdate = async (prevProps, prevState) => {
		if (prevProps.damageInfo !== this.props.damageInfo) {
			if (this.props.damageInfo.damageTo === 'attacker') {
				// alert('回復か反撃');
				if (this.props.damageInfo.totalDamage < 0) {
					this.setState({
						resultFlag: true,
						resultWord: 'heal',
						resultValue: -this.props.damageInfo.totalDamage
					});
				} else {
					this.setState({
						resultFlag: true,
						resultWord: 'counter',
						resultValue: this.props.damageInfo.totalDamage
					});
				}
			} else if (this.props.damageInfo.damageTo === 'blocker') {
				// alert('ダメージ');
				this.setState({
					resultFlag: true,
					resultWord: 'damage',
					resultValue: this.props.damageInfo.totalDamage
				});
			} else if (this.props.damageInfo.totalDamage === 0) {
				// alert('無事');
				this.setState({ resultFlag: true, resultWord: 'none' });
			}
		}
	};
	attackerField = () => {
		const attacker = this.props.attacker;
		if (attacker) {
			return <MagicCard role={'attacker'} name={attacker.name} magic={attacker.magic} />;
		}
	};
	blockerField = () => {
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
				<View style={{ width: '45%', alignItems: 'center' }}>{this.attackerField()}</View>
				<View style={{ width: '10%', alignItems: 'center' }}>
					<Text>→</Text>
				</View>
				<View style={{ width: '45%', alignItems: 'center' }}>{this.blockerField()}</View>

				<ResultCard
					resultFlag={this.state.resultFlag}
					resultWord={this.state.resultWord}
					resultValue={this.state.resultValue}
				/>
			</View>
		);
	}
}

export default Log;
