import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableHighlightBase } from 'react-native';
import Magic from '../models/Magic';
import Battle from '../models/Battle';
import Status from '../components/Status';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fase: 'changeAsign',
			person1: {
				name: 'ビショップ',
				hp: 40,
				role: 'attacker',
				magic: {
					word: null,
					count: null,
					type: null
				}
			},
			person2: {
				name: 'メイジ',
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

	componentDidUpdate = async (prevProps, prevState) => {
		if (prevState.fase !== this.state.fase) {
			if (this.state.fase === 'changeAsign') {
				this.changeAsign();
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
			const magic = new Magic(word, this.state.person2.role);
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
		let attacker = undefined;
		let blocker = undefined;

		if (this.state.person1.role === 'attacker') {
			attacker = this.state.person1;
			attacker = Object.assign(attacker, { who: 'person1' });
		} else if (this.state.person1.role === 'blocker') {
			blocker = this.state.person1;
			blocker = Object.assign(blocker, { who: 'person1' });
		}
		if (this.state.person2.role === 'attacker') {
			attacker = this.state.person2;
			attacker = Object.assign(attacker, { who: 'person2' });
		} else if (this.state.person2.role === 'blocker') {
			blocker = this.state.person2;
			blocker = Object.assign(blocker, { who: 'person2' });
		}

		await new Promise((resolve) => setTimeout(resolve, 3000));
		this.setState({
			log: [
				this.state.log,
				`\n${attacker.name}さんの魔法:「${attacker.magic.word}!（威力${attacker.magic.count}、種類:${attacker.magic.type}）`
			]
		});
		await new Promise((resolve) => setTimeout(resolve, 3000));
		this.setState({
			log: [
				this.state.log,
				`\n${blocker.name}さんの魔法:「${blocker.magic.word}!（威力${blocker.magic.count}、種類:${blocker.magic.type}）`
			]
		});

		let damageInfo = new Battle().calculate(attacker.magic, blocker.magic);
		this.setState({
			damageInfo: damageInfo
		});
		console.log(this.state.damageInfo.totalDamage);
		console.log(this.state.damageInfo.damageTo);

		if (this.state.damageInfo.damageTo === 'attacker') {
			this.setState((prevState) => ({
				[attacker.who]: {
					...prevState[attacker.who],
					hp: this.state[attacker.who].hp - this.state.damageInfo.totalDamage
				}
			}));
		} else if (this.state.damageInfo.damageTo === 'blocker') {
			this.setState((prevState) => ({
				[blocker.who]: {
					...prevState[blocker.who],
					hp: this.state[blocker.who].hp - this.state.damageInfo.totalDamage
				}
			}));
		}
		await new Promise((resolve) => setTimeout(resolve, 3000));
		this.setState((prevState) => ({
			person1: {
				...prevState.person1,
				magic: {
					word: null,
					count: null,
					type: null
				}
			},
			person2: {
				...prevState.person2,
				magic: {
					word: null,
					count: null,
					type: null
				}
			}
		}));
		this.setState({
			fase: 'changeAsign'
		});
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
				<View style={{ marginTop: 40 }}>
					<Status name={this.state.person1.name} hp={this.state.person1.hp} role={this.state.person1.role} />
					<Status name={this.state.person2.name} hp={this.state.person2.hp} role={this.state.person2.role} />
				</View>
			</View>
		);
	}
}

export default Home;
