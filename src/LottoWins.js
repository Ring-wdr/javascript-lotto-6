import Lotto from "./Lotto";
import MESSEGE from "./Messages";
import Validation from "./Validation";

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
    if (Validation.notLottoRangeNumber(bonus)) {
      throw new Error(MESSEGE.ERROR_LOTTO_NOT_RANGE);
    }
  }

  get bonus() {
    return this.#bonus;
  }
}

export default LottoWins;
