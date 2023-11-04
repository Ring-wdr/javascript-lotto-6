//@ts-check

class Utils {
  static #lottoArrayRegex = /^\d+(,\d+)*$/;
  /**
   * 입력받은 문자열이 콤마로 구분된 로또 숫자인지 판별
   * @param {string} str 
   */
  static isLottoArrayString(str){
    return this.#lottoArrayRegex.test(str)
  }
}

export default Utils;
