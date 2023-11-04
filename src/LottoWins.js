//@ts-check

import Lotto from "./Lotto";

class LottoWins extends Lotto{
    #bonus;
    /**
     * 길이 6의 숫자배열과 보너스 숫자를 입력받아 인스턴스를 생성한다.
     * @param {number[]} numbers 
     * @param {number} bonus 
     */
    constructor(numbers, bonus){
        super(numbers);
        this.#bonus = bonus;
    }
    get bonus(){
        return this.#bonus;
    }
}

export default LottoWins