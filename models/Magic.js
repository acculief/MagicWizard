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
    let magicIndeList = [];
    let probability = 0;
    let maxProbability = 0;
    // word判定
    for (let index in magic) {
      if (this._searchArrayWord(word, magic[index].word) !== -1 && magic[index].role === role) {
        magicIndeList.push(index);
        maxProbability += magic[index].probability;
      }
    }
    // 同じワードが複数の場合の判定
    if(magicIndeList.length != 0) {
      let random = Math.random() * (maxProbability + 1);
      for (let index in magicIndeList) {
        probability += magic[magicIndeList[index]].probability;
        if (random <= probability) {
          return magic[magicIndeList[index]];
        }
      }
    }
    // ランダム判定
    for (let type in magic) {
      if (magic[type].role === role) {
        maxProbability += magic[type].probability;
      }
    }
    let random = Math.random() * (maxProbability + 1);
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
    let magicIndeList = [];
    let probability = 0;
    let maxProbability = 0;
    // word判定
    for (let index in type.attribute) {
      if (this._searchArrayWord(word, type.attribute[index].word) !== -1) {
        magicIndeList.push(index);
        maxProbability += type.attribute[index].probability;
      }
    }
    // 同じワードが複数の場合の判定
    if(magicIndeList.length != 0) {
      let random = Math.random() * (maxProbability + 1);
      for (let index in magicIndeList) {
        probability += type.attribute[magicIndeList[index]].probability;
        if (random <= probability) {
          return type.attribute[magicIndeList[index]];
        }
      }
    }
    // ランダム判定
    for (let index in type.attribute) {
      maxProbability += type.attribute[index].probability;
    }
    let random = Math.random() * (maxProbability + 1);
    for (let index in type.attribute) {
      probability += type.attribute[index].probability;
      if (random <= probability) {
        return type.attribute[index];
      }
    }
  }

  _generateCount(word='', attribute) {
    let magicIndeList = [];
    let probability = 0;
    let maxProbability = 0;
    // word
    for (let index in attribute.count) {
      if (this._searchArrayWord(word, attribute.count[index].word) !== -1) {
        magicIndeList.push[index];
        maxProbability += attribute.count[index].probability;
      }
    }
    // 同じワードが複数の場合の判定
    if(magicIndeList.length != 0) {
      let random = Math.random() * (maxProbability + 1);
      for (let index in magicIndeList) {
        probability += attribute.count[magicIndeList[index]].probability;
        if (random <= probability) {
          return attribute.count[magicIndeList[index]];
        }
      }
    }
    // ランダム判定
    for (let index in attribute.count) {
      maxProbability += attribute.count[index].probability;
    }
    let random = Math.random() * (maxProbability + 1);
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
