class Battle {
    /**
     * バトル結果算出処理
     * @param {*} magicOfAttacker アタッカーの魔法
     * @param {*} magicOfBlocker ブロッカーの魔法
     */
    calculate(magicOfAttacker, magicOfBlocker) {
        const TYPE_ATTACK = 'attack';
        const TYPE_HEAL = 'heal';
        const TYPE_BLOCK = 'block';
        const TYPE_COUNTER = 'counter';
        const ROLE_ATTACKER = 'attacker';
        const ROLE_BLOCKER= 'blocker';
        const attackerType = magicOfAttacker.type;
        const blockerType = magicOfBlocker.type;

        let result = magicOfAttacker.count - magicOfBlocker.count;
        let totalDamage = 0;
        let damageTo = null;

        if (attackerType == TYPE_ATTACK) {
            if (blockerType == TYPE_BLOCK) {
                if (0 < result) {
                    damageTo = ROLE_BLOCKER;
                    totalDamage = result;
                }
            } else if (blockerType == TYPE_COUNTER) {
                if (result < 0) {
                    // カウンターの魔法分ダメージ
                    damageTo = ROLE_ATTACKER;
                    totalDamage = magicOfBlocker.count;
                } else if (0 < result) {
                    // アタッカーの魔法分ダメージ
                    damageTo = ROLE_BLOCKER;
                    totalDamage = magicOfAttacker.count;
                }
            }
        } else if (attackerType == TYPE_HEAL) {
            // 相手のタイプ関係なく回復
            totalDamage = magicOfAttacker.count * (-1);
            damageTo = ROLE_ATTACKER;
        }
        return { totalDamage: totalDamage, damageTo: damageTo }
    }
}
export default Battle;