import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Magic from '../models/Magic';
import Battle from '../models/Battle';
import Status from '../components/Status';
import SpellInput from '../components/SpellInput';
import SpellButton from '../components/SpellButton';
import CurrentFaseBadge from '../components/CurrentFaseBadge';
import BattleButton from '../components/BattleButton';
import Log from '../components/Log';
import BattleUI from '../components/BattleUI';

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
				},
				currentPerson: null,
				damageInfo: { damageTo: null, totalDamage: null }
			}
		};
	}

	componentDidMount = async () => {
		await this.changeAsign();
	};

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
				fase: 'input',
				currentPerson: prevState.person1.role === 'blocker' ? 'person1' : 'person2'
			}));
			resolve('succes!!');
		});
	};

	spellMagic = (word) => {
		if (this.state.currentPerson === 'person1') {
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
				word: null,
				currentPerson: 'person2'
			}));
		} else if (this.state.currentPerson === 'person2') {
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
				word: null,
				currentPerson: 'person1'
			}));
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

		await new Promise((resolve) => setTimeout(resolve, 2000));
		this.setState({
			log: [
				this.state.log,
				`\n${attacker.name}さんの魔法:「${attacker.magic.word}!（威力${attacker.magic.count}、種類:${attacker.magic.type}）`
			],
			attacker: attacker
		});
		await new Promise((resolve) => setTimeout(resolve, 2000));
		this.setState({
			log: [
				this.state.log,
				`\n${blocker.name}さんの魔法:「${blocker.magic.word}!（威力${blocker.magic.count}、種類:${blocker.magic.type}）`
			],
			blocker: blocker
		});

		await new Promise((resolve) => setTimeout(resolve, 2000));
		let damageInfo = new Battle().calculate(attacker.magic, blocker.magic);
		this.setState({
			damageInfo: damageInfo
		});
		console.log(this.state.damageInfo.totalDamage);
		console.log(this.state.damageInfo.damageTo);

		// await new Promise((resolve) => setTimeout(resolve, 3000));
		if (this.state.damageInfo.damageTo === 'attacker') {
			this.setState((prevState) => ({
				[attacker.who]: {
					...prevState[attacker.who],
					hp: this.state[attacker.who].hp - this.state.damageInfo.totalDamage
				},
				log: [ this.state.log, `\n${this.state[attacker.who].name}さんに${damageInfo.totalDamage}のダメージ！` ]
			}));
		} else if (this.state.damageInfo.damageTo === 'blocker') {
			this.setState((prevState) => ({
				[blocker.who]: {
					...prevState[blocker.who],
					hp: this.state[blocker.who].hp - this.state.damageInfo.totalDamage
				},
				log: [ this.state.log, `\n${this.state[blocker.who].name}さんに${damageInfo.totalDamage}のダメージ！` ]
			}));
		}
		await new Promise((resolve) => setTimeout(resolve, 2000));
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
			},
			attacker: null,
			blocker: null
		}));
		this.setState({
			fase: 'changeAsign'
		});
		// blockerにatackerのダメージ！（counterの場合は例外）
		// それぞれの残りHP表示
		// ターン交代
	};

	faseUI = () => {
		if (this.state.fase === 'changeAsign') {
			return (
				<View>
					<Text>ターン変更</Text>
				</View>
			);
		} else if (this.state.fase === 'input') {
			return (
				<View>
					<View style={{ height: Dimensions.get('window').height / 4 }}>
						{/* <BattleUI /> */}
						<BattleButton
							person1={this.state.person1}
							person2={this.state.person2}
							onPress={() =>
								this.setState({
									fase: 'battle'
								})}
						/>
					</View>

					<View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }}>
						<SpellInput
							word={this.state.word}
							onChangeWord={(value) => this.setState({ word: value })}
							onSubmitEditing={() => this.spellMagic(this.state.word)}
						/>
						<SpellButton onPress={() => this.spellMagic(this.state.word)} />
					</View>
				</View>
			);
		} else if (this.state.fase === 'battle') {
			return (
				<View>
					<View style={{ height: Dimensions.get('window').height / 4 }}>
						<BattleUI
							attacker={this.state.attacker}
							blocker={this.state.blocker}
							damageInfo={this.state.damageInfo}
						/>
					</View>
				</View>
			);
		}
	};
	render() {
		return (
			<View style={{ backgroundColor: '#BBFFFF', height: Dimensions.get('window').height }}>
				<CurrentFaseBadge
					fase={this.state.fase}
					person={this.state[this.state.currentPerson]}
					person1={this.state.person1}
					person2={this.state.person2}
				/>
				{this.faseUI()}
				<View style={{ marginTop: 15 }}>
					<Status name={this.state.person1.name} hp={this.state.person1.hp} role={this.state.person1.role} />
					<Status name={this.state.person2.name} hp={this.state.person2.hp} role={this.state.person2.role} />
				</View>
				<Log log={this.state.log} />
			</View>
		);
	}
}

export default Home;
