import MESSEGE from "./Messages";

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
    if (numbers.length !== 6) {
      throw new Error(MESSEGE.ERROR_LOTTO_SIX);
    }
    if (
      numbers.some((num) => numbers.filter((num2) => num === num2).length > 1)
    ) {
      throw new Error(MESSEGE.ERROR_LOTTO_DUPL);
    }
  }

  // TODO: 추가 기능 구현
  /** @readonly */
  get getLottoNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
