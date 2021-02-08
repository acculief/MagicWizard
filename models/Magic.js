import magicJson from "../json/magic.json";
class Magic {
	constructor(word, role) {
		return this._create(word, role);
	}

	/**
     * 魔法生成
     * 
     * @param {String} word 魔法の呪文 
     * @param {String} role 攻撃: 'attacker' 防御: 'blocker' 
     * @returns {String, Integer, String} magic
     */
	_create(word, role) {
		// 後々wordによって魔法を分けるためランダム魔法をsampleとする
		const randomMagic = magicJson.random;
		let count = this._createCount(randomMagic);
		let type = this._createType(randomMagic, role);
		return {word, count, type};

	}

	/**
	 * 魔法の威力を算出
	 * 
	 * @param {*} magic 魔法の基礎値 
	 */
	_createCount(magic) {
		const DEFAULT_DAMAGE = magic.default_count;
		let count = magic.count
		let probability = 0;
		let maxPercent = 0;
		// 確率の合計値を算出
		for (let key in count) {
			maxPercent += count[key].probability;
		}
		let random = Math.random() * (maxPercent + 1);
		for (let key in count) {
			probability += count[key].probability;
			if (random <= probability) {
				return DEFAULT_DAMAGE +
					Math.floor(Math.random() * (count[key].max + 1 - count[key].min) + count[key].min);
			}
		}
	}
	/**
	 * 魔法の種類を算出
	 * 
	 * @param {*} magic 魔法の基礎値
	 * @param {*} role 攻撃: 'attacker' 防御: 'blocker' 
	 */
	_createType(magic, role) {
		let type = magic.role[role].type;
		let probability = 0;
		let maxPercent = 0;
		// 確率の合計値を算出
		for (let key in type) {
			maxPercent += type[key].probability;
		}
		let random = Math.random() * (maxPercent + 1);
		for (let key in type) {
			probability += type[key].probability;
			if (random <= probability) {
				return type[key].name;
			}
		}
	}
}

export default Magic;
