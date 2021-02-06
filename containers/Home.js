import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Game from '../models/Game';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			person1: {
				hp: 40,
				role: null,
				magic: {
					count: null,
					type: null
				}
			},
			person2: {
				hp: 40,
				role: null,
				magic: {
					count: null,
					type: null
				}
			}
		};
	}

	componentDidMount() {
		this.setState((prevState) => ({
			person1: {
				...prevState.person1,
				role: 'attacker'
			},
			person2: {
				...prevState.person1,
				role: 'blocker'
			}
		}));

		this.intervalRepeater(this.dummyQuery(), 1000);
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

	sleep = (msec) =>
		new Promise((resolve) => {
			if (1 == 1) {
				resolve('succes!!');
			}
		});
	dummyQuery = () => this.sleep(Math.random() * 20000);

	intervalRepeater = async (callback, interval) => {
		// 両者のどちらかのHPが0になるまで
		while (this.state.person1.hp != 0 || this.state.person2.hp != 0) {
			const startTime = Date.now(); // 時間計測用
			console.log('処理を始めるよ！');

			// 本処理と sleep を同時実行して最低間隔を確保する
			await Promise.all([ callback, this.sleep(interval) ]);

			console.log('処理が終わったよ！ 経過時間[ms]:', Date.now() - startTime);
		}
	};

	changeAsign = () => {
		console.log('start');
	};

	input = () => {
		console.log('stop');
	};

	batle = () => {
		console.log('end');
	};

	render() {
		return (
			<View>
				<Text>
					Person1 hp:{this.state.person1.hp} role:{this.state.person1.role}
				</Text>
				<Text>
					Person2 hp:{this.state.person2.hp} role:{this.state.person2.role}
				</Text>
			</View>
		);
	}
}

export default Home;
