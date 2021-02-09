import magic from '../json/magic.json';
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
  _create(word='', role) {
    // typeを算出
    let type = this._generateType(word, role);
    // attributeを算出
    let attribute = this._generateAttribute(word, type);
    // countを算出
    let count = this._generateCount(word, attribute);
    let status = {
      word: word,
      count:
      attribute.default_count +
        Math.floor(Math.random() * (count.max + 1 - count.min) + count.min),
      type: type.name,
    };
    return status;
  }

  _generateType(word='', role) {
    // word判定
    for (let type in magic) {
      if (this._searchArrayWord(word, magic[type].word) !== -1 && magic[type].role === role) {
        return magic[type];
      }
    }
    // ランダム判定
    let probability = 0;
    let maxPercent = 0;
    for (let type in magic) {
      if (magic[type].role === role) {
        maxPercent += magic[type].probability;
      }
    }
    let random = Math.random() * (maxPercent + 1);
    for (let type in magic) {
      if (magic[type].role === role) {
        probability += magic[type].probability;
        if (random <= probability) {
          return magic[type];
        }
      }
    }
  }

  _generateAttribute(word='', type) {
    // word判定
    for (let attribute in type.attribute) {
      if (this._searchArrayWord(word, type.attribute[attribute].word) !== -1) {
        return type.attribute[attribute];
      }
    }
    // ランダム判定
    let probability = 0;
    let maxPercent = 0;
    for (let attribute in type.attribute) {
      maxPercent += type.attribute[attribute].probability;
    }
    let random = Math.random() * (maxPercent + 1);
    for (let attribute in type.attribute) {
      probability += type.attribute[attribute].probability;
      if (random <= probability) {
        return type.attribute[attribute];
      }
    }
  }

  _generateCount(word='', attribute) {
    // word
    for (let index in attribute.count) {
      if (this._searchArrayWord(word, attribute.count[index].word) !== -1) {
        return attribute.count[index];
      }
    }
    // ランダム判定
    let probability = 0;
    let maxPercent = 0;
    for (let index in attribute.count) {
      maxPercent += attribute.count[index].probability;
    }
    let random = Math.random() * (maxPercent + 1);
    for (let index in attribute.count) {
      probability += attribute.count[index].probability;
      if (random <= probability) {
        return attribute.count[index];
      }
    }
  }
  _searchArrayWord(word='', arrayWord) {
    for (let target in arrayWord) {
      let result = word.indexOf(arrayWord[target]);
      if (result !== -1) {
        return result;
      }
    }
    return -1;
  }
}

export default Magic;
