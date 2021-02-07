import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableHighlightBase } from 'react-native';
import Magic from '../models/Magic';
import Status from '../components/Status';

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
				this.startBattle();
				// this.setState({ fase: 'changeAsign' });
				console.log(this.state.fase);
			}
		}
	}

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
			const magic = new Magic(word, this.state.person1.role);
			this.setState((prevState) => ({
				person1: {
					...prevState.person1,
					magic: {
						word: magic.word,
						count: magic.count,
						type: magic.type
					}
				},
				word: null
			}));
		} else if (this.state.person2.magic.type === null) {
			// wordを唱える
			const magic = new Magic(word, this.state.person1.role);
			this.setState((prevState) => ({
				person2: {
					...prevState.person2,
					magic: {
						word: magic.word,
						count: magic.count,
						type: magic.type
					}
				},
				word: null
			}));
		}
	};

	spellButtoon = () => {
		if (this.state.person1.magic.type !== null && this.state.person2.magic.type !== null) {
			return (
				<TouchableOpacity
					onPress={() =>
						this.setState({
							fase: 'battle'
						})}
				>
					<Text>バトル！</Text>
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity onPress={() => this.spellMagic(this.state.word)}>
					<Text>呪文を唱える</Text>
				</TouchableOpacity>
			);
		}
	};

	startBattle = async () => {
		const person1Magic = this.state.person1.magic;
		const person2Magic = this.state.person2.magic;
		await new Promise((resolve) => setTimeout(resolve, 3000));
		this.setState({ log: `person1さんの魔法:「${person1Magic.word}!（威力${person1Magic.count}、種類:${person1Magic.type}）` });
		await new Promise((resolve) => setTimeout(resolve, 3000));
		this.setState({ log: `person2さんの魔法「${person2Magic.word}!(威力${person2Magic.count}、種類:${person2Magic.type})` });

		// blockerにatackerのダメージ！（counterの場合は例外）
		// それぞれの残りHP表示
		// ターン交代
	};

	proceedGame = async () => {
		console.log('処理を始めるよ！');
		await this.changeAsign();
	};

	faseUI = () => {
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
						magic-word: {this.state.person1.magic.word}
						{'\n'}
						magic-type: {this.state.person1.magic.type} magic-count: {this.state.person1.magic.count}
					</Text>

					<Text style={{ marginVertical: 15 }}>
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
					{this.spellButtoon()}
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

					<Text>{this.state.log}</Text>
				</View>
			);
		}
	};
	render() {
		return (
			<View>
				{this.faseUI()}
				<Status hp={this.state.person1.hp} role={this.state.person1.role} />
				<Status hp={this.state.person1.hp} role={this.state.person1.role} />
			</View>
		);
	}
}

export default Home;
