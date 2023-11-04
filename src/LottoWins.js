//@ts-check

import Lotto from "./Lotto";
import MESSEGE from "./Messages";

class LottoWins extends Lotto {
  #bonus;
  /**
   * 길이 6의 숫자배열과 보너스 숫자를 입력받아 인스턴스를 생성한다.
   * @param {number[]} numbers
   * @param {number} bonus
   */
  constructor(numbers, bonus) {
    super(numbers);
    this.#validateBonus(bonus);
    this.#bonus = bonus;
  }
  /** @param {number} bonus  */
  #validateBonus(bonus) {
    if (isNaN(bonus) || bonus < 1 || bonus > 45) {
      throw new Error(MESSEGE.ERROR_NUMBER);
    }
  }

  get bonus() {
    return this.#bonus;
  }
}

export default LottoWins;
