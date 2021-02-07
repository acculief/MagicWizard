class Magic {
    constructor(word, role) {
        this._MAX_PARCENT = 100;
        this._DEFAULT_DAMAGE = 5;
        this._magic = { 
            'attacker': ['attack', 'heal'],
            'blocker': ['counter', 'block']
        }
        this._damage = {
            low: {
                probability: 5,
                min: -5,
                max: -2
            },
            middleLow: {
                probability: 20,
                min: -1,
                max: 0
            },
            middle: {
                probability: 60,
                min: 1,
                max: 5
            },
            middleHigh: {
                probability: 10,
                min: 6,
                max: 8
            },
            high: {
                probability: 5,
                min: 9,
                max: 10
            }
        };
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
        let random = Math.random() * (this._MAX_PARCENT + 1);
        let damage = this._damage;
        let probability = 0;
        for (let key in damage) {
            probability += damage[key].probability;
            if (probability >= random) {
                var count = this._DEFAULT_DAMAGE + Math.floor(Math.random() * (damage[key].max + 1 - damage[key].min) + damage[key].min);
                let typeRandom = Math.floor(Math.random() * (2));
                let type = this._magic[role][typeRandom];
                return {word, count, type};
            }
        }
    }
}

export default Magic;

