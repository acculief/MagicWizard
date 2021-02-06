import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Game from '../models/Game';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fase: 'changeAsign',
			person1: {
				hp: 40,
				role: 'attacker',
				magic: {
					word: null,
					count: null,
					type: null
				}
			},
			person2: {
				hp: 40,
				role: 'blocker',
				magic: {
					word: null,
					count: null,
					type: null
				}
			}
		};
	}

	componentDidMount() {
		this.proceedGame();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.fase !== this.state.fase) {
			if (this.state.fase === 'changeAsign') {
				this.setState({ fase: 'input' });
				console.log(this.state.fase);
			} else if (this.state.fase === 'input') {
				console.log(this.state.fase);
			} else if (this.state.fase === 'battle') {
				// this.setState({ fase: 'changeAsign' });
				console.log(this.state.fase);
			}
		}
	}

	start = () => {
		console.log('start');
	};

	stop = () => {
		console.log('stop');
	};

	end = () => {
		console.log('end');
	};

	changeAsign = () => {
		new Promise((resolve) => {
			this.setState((prevState) => ({
				person1: {
					...prevState.person1,
					role: prevState.person1.role === 'attacker' ? 'blocker' : 'attacker'
				},
				person2: {
					...prevState.person2,
					role: prevState.person2.role === 'attacker' ? 'blocker' : 'attacker'
				},
				fase: 'input'
			}));
			resolve('succes!!');
		});
	};

	input = () => {
		console.log('stop');
	};

	batle = () => {
		console.log('end');
	};

	spellMagic = (word) => {
		if (this.state.person1.magic.type === null) {
			const count = 10;
			const type = 'counter';
			// wordを唱える
			this.setState((prevState) => ({
				person1: {
					...prevState.person1,
					magic: {
						word: word,
						count: count,
						type: type
					}
				},
				word: null
			}));
		} else if (this.state.person2.magic.type === null) {
			// wordを唱える
			const count = 15;
			const type = 'atack';
			this.setState((prevState) => ({
				person2: {
					...prevState.person2,
					magic: {
						word: word,
						count: count,
						type: type
					}
				},
				word: null
			}));
		}

		if (this.state.person1.magic.type !== null && this.state.person2.magic.type !== null) {
			this.setState({
				fase: 'battle'
			});
		}
	};

	proceedGame = async () => {
		// 両者のどちらかのHPが0になるまで
		// while (this.state.person1.hp != 0 || this.state.person2.hp != 0) {
		console.log('処理を始めるよ！');
		await this.changeAsign();
		// console.log()
		// }
	};

	render() {
		if (this.state.fase === 'changeAsign') {
			return (
				<View>
					<Text>ターン変更</Text>
					<Text>
						Person1 hp:{this.state.person1.hp} role:{this.state.person1.role}
					</Text>
					<Text>
						Person2 hp:{this.state.person2.hp} role:{this.state.person2.role}
					</Text>
				</View>
			);
		} else if (this.state.fase === 'input') {
			return (
				<View>
					<Text>呪文詠唱</Text>
					<Text style={{ marginVertical: 15 }}>
						Person1 hp:{this.state.person1.hp} role:{this.state.person1.role}
						{'\n'}
						magic-word: {this.state.person1.magic.word}
						{'\n'}
						magic-type: {this.state.person1.magic.type} magic-count: {this.state.person1.magic.count}
					</Text>

					<Text style={{ marginVertical: 15 }}>
						Person2 hp:{this.state.person2.hp} role:{this.state.person2.role}
						{'\n'}
						magic-word: {this.state.person2.magic.word}
						{'\n'}
						magic-type: {this.state.person2.magic.type} magic-count: {this.state.person2.magic.count}
					</Text>
					<TextInput
						// style={{ flex: 1, marginLeft: 6, color: 'black' }}
						placeholder="呪文を入力"
						placeholderTextColor="#8E8E93"
						onChangeText={(value) => this.setState({ word: value })}
						autoFocus={true}
						value={this.state.word}
					/>
					<TouchableOpacity onPress={() => this.spellMagic(this.state.word)}>
						<Text>呪文を唱える</Text>
					</TouchableOpacity>
				</View>
			);
		} else if (this.state.fase === 'battle') {
			return (
				<View>
					<Text>バトル</Text>
					<Text style={{ marginVertical: 15 }}>
						Person1 hp:{this.state.person1.hp} role:{this.state.person1.role}
						{'\n'}
						magic-word: {this.state.person1.magic.word}
						{'\n'}
						magic-type: {this.state.person1.magic.type} magic-count: {this.state.person1.magic.count}
					</Text>

					<Text style={{ marginVertical: 15 }}>
						Person2 hp:{this.state.person2.hp} role:{this.state.person2.role}
						{'\n'}
						magic-word: {this.state.person2.magic.word}
						{'\n'}
						magic-type: {this.state.person2.magic.type} magic-count: {this.state.person2.magic.count}
					</Text>
				</View>
			);
		}
	}
}

export default Home;
