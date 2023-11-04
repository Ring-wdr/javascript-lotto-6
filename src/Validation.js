//@ts-check

class Validation {
  static #lottoArrayRegex = /^\d+(,\d+)*$/;
  /**
   * 입력받은 문자열이 콤마로 구분된 로또 숫자인지 판별하는 메서드
   * @param {string} str
   */
  static isLottoArrayString(str) {
    return this.#lottoArrayRegex.test(str);
  }
  /**
   * 1 ~ 45가 아니거나 숫자가 아닌 원소가 있으면 true를 반환하는 메서드
   * @param {number} num
   */
  static notLottoRangeNumber(num) {
    return isNaN(num) || num < 1 || num > 45;
  }

  /**
   * 배열 내 숫자 중 중복이 있을 때 true를 반환하는 메서드
   * @param {number[]} numbers
   */
  static isNumbersDuplicate(numbers) {
    return numbers.some(
      (num) => numbers.filter((num2) => num === num2).length > 1
    );
  }
}

export default Validation;
