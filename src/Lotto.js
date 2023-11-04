import MESSEGE from "./Messages";
import Validation from "./Validation";

class Lotto {
  /** @type {number[]} */
  #numbers;

  /** @param {number[]} numbers*/
  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  /** @param {number[]} numbers  */
  #validate(numbers) {
    /** 배열 길이가 6개인 경우 에러를 반환 */
    if (numbers.length !== 6) {
      throw new Error(MESSEGE.ERROR_LOTTO_SIX);
    }
    /** 중복 숫자가 존재하는 경우 에러를 반환 */
    if (Validation.isNumbersDuplicate(numbers)) {
      throw new Error(MESSEGE.ERROR_LOTTO_DUPL);
    }
    /** 1 ~ 45가 아니거나 숫자가 아닌 원소가 있으면 에러를 반환 */
    if (numbers.some(Validation.notLottoRangeNumber)) {
      throw new Error(MESSEGE.ERROR_LOTTO_NOT_RANGE);
    }
  }

  // TODO: 추가 기능 구현
  /** @readonly */
  get getLottoNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
