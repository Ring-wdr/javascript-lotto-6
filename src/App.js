//@ts-check
import { Console, Random } from "@woowacourse/mission-utils";
import MESSEGE from "./Messages";
import Amount from "./Amount";
import Utils from "./Utils";
import Lotto from "./Lotto";

class App {
  /** @type {Amount} */
  #amt;
  /** @type {Lotto[]} */
  #lottoArray = [];
  #utils;

  constructor() {
    this.#utils = new Utils();
  }

  async pay() {
    const amt = await Console.readLineAsync(MESSEGE.INPUT_BUY_AMT);
    try {
      this.#amt = new Amount(Number(amt));
      Console.print(`${this.#amt.lottoCount}${MESSEGE.SHOW_BUY_COUNT}`);
      return true;
    } catch (e){
      Console.print(e.message);
      return false;
    }
  }
  /** true가 나올때까지 pay를 반복하는 메서드 */
  async repeatPay() {
    const isValid = await this.pay();
    if (!isValid) {
      await this.repeatPay();
    }
  }
  /**
   * 숫자를 입력받아 입력받은 숫자만큼 로또배열을 생성한다.
   * @param {number} num
   */
  createLottosByCount(num) {
    /** @type {Lotto[]} */
    const numbers = [];
    for (let i = 0; i < num; i++) {
      const lottoNumbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      const lotto = new Lotto(lottoNumbers);
      numbers.push(lotto);
      this.#utils.lottoStringPrint(lotto.getLottoNumbers);
    }
    return numbers;
  }

  async selectWinningNumbers() {
    const lottoNumsStr = await Console.readLineAsync(MESSEGE.INPUT_WIN_NUM);
    const lottoRegex = /^\d+(,\d+)*$/;
    if (!lottoRegex.test(lottoNumsStr))
      throw new Error(MESSEGE.ERROR_LOTTO_NUMBER);
    return lottoNumsStr.split(",").map(Number);
  }

  async selectBonusNumber() {
    const bonusNumStr = await Console.readLineAsync(MESSEGE.INPUT_BONUS_NUM);
    const bonusNum = Number(bonusNumStr);
    if (isNaN(bonusNum)) throw new Error(MESSEGE.ERROR_NUMBER);
    return bonusNum;
  }
  /**
   * @param {Lotto[]} lottoResults
   * @param {Lotto} winningNums
   * @param {number} bonusNum
   */
  #getLottoResults(lottoResults, winningNums, bonusNum) {
    return lottoResults.map((lottos) =>
      lottos.getLottoNumbers.reduce(
        (result, num) =>
          winningNums.getLottoNumbers.includes(num)
            ? { ...result, score: result.score + 1 }
            : num === bonusNum
            ? { ...result, bonus: true }
            : result,
        { score: 0, bonus: false }
      )
    );
  }

  /** @param {{score: number, bonus: boolean}[]} lottoResults*/
  #getRanks(lottoResults) {
    return lottoResults.reduce(
      (counts, { score, bonus }) => {
        switch (score) {
          case 3:
            return (counts[0] = counts[0] + 1), counts;
          case 4:
            return (counts[1] = counts[1] + 1), counts;
          case 5:
            return !bonus
              ? ((counts[2] = counts[2] + 1), counts)
              : ((counts[3] = counts[3] + 1), counts);
          case 6:
            return (counts[4] = counts[4] + 1), counts;
          default:
            return counts;
        }
      },
      [0, 0, 0, 0, 0]
    );
  }
  async play() {
    await this.repeatPay();
    this.#lottoArray = this.createLottosByCount(this.#amt.lottoCount);
    const lottoNums = new Lotto(await this.selectWinningNumbers());
    const bonusNum = await this.selectBonusNumber();

    const lottoResults = this.#getLottoResults(
      this.#lottoArray,
      lottoNums,
      bonusNum
    );
    const resultCounts = this.#getRanks(lottoResults);
    this.#utils.continuouslyWinnerPrint(resultCounts, this.#amt.amount);
  }
}

export default App;
