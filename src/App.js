//@ts-check
import { Console, Random } from "@woowacourse/mission-utils";
import MESSEGE from "./Messages";
import Amount from "./Amount";
import Utils from "./Utils";
import Lotto from "./Lotto";
import LottoWins from "./LottoWins";
import LottoSummary from "./LottoSummary";
import LottoPrinter from "./LottoPrinter";

class App {
  /** @type {Amount} 사용자에게 입력받은 금액과 로또 갯수를 저장하는 인스턴스 */
  #amt;
  /** @type {Lotto[]} 생성된 로또들을 보관하는 배열*/
  #lottoArray = [];
  /** @type {LottoWins} 당첨 번호를 저장하는 필드*/
  #lottoWins;
  /** @type {LottoSummary} 경기 결과를 기록하는 필드*/
  #lottoRanks;

  async play() {
    await this.repeatPayUntilValid();
    this.#createLottosByCount();
    await this.#getWinningNumber();
    this.#getRanks();
    this.#finish();
  }

  /** 사용자로부터 금액을 입력받아 내부 필드에 인스턴스를 저장하는 메서드 */
  async #pay() {
    const amt = await Console.readLineAsync(MESSEGE.INPUT_BUY_AMT);
    try {
      this.#amt = new Amount(Number(amt));
      Console.print(`${this.#amt.lottoCount}${MESSEGE.SHOW_BUY_COUNT}`);
      return true;
    } catch (e) {
      Console.print(e.message);
      return false;
    }
  }
  /** true가 나올때까지 pay를 반복하는 메서드 */
  async repeatPayUntilValid() {
    const isValid = await this.#pay();
    if (!isValid) {
      await this.repeatPayUntilValid();
    }
  }

  /** 초기 정보를 바탕으로 로또 배열을 필드에 생성하는 메서드 */
  #createLottosByCount() {
    /** @type {Lotto[]} */
    const numbers = [];
    const num = this.#amt.lottoCount;
    for (let i = 0; i < num; i++) {
      const lottoNumbers = Random.pickUniqueNumbersInRange(1, 45, 6);
      const lotto = new Lotto(lottoNumbers);
      numbers.push(lotto);
      LottoPrinter.stringPrint(lotto);
    }
    this.#lottoArray = numbers;
  }

  /** 로또 당첨 번호 6개를 입력받아 배열로 리턴하는 메서드*/
  async #selectWinningNumbers() {
    const lottoNumsStr = await Console.readLineAsync(MESSEGE.INPUT_WIN_NUM);
    if (!Utils.isLottoArrayString(lottoNumsStr)) {
      throw new Error(MESSEGE.ERROR_LOTTO_NUMBER);
    }
    return lottoNumsStr.split(",").map(Number);
  }

  /** 당첨번호와 보너스 번호로 생성한 인스턴스를 필드에 저장하는 메서드 */
  async #getWinningNumber() {
    /** 당첨 번호 6개 */
    const lottoNums = await this.#selectWinningNumbers();
    /** 보너스 번호 숫자 */
    const bonusNumStr = await Console.readLineAsync(MESSEGE.INPUT_BONUS_NUM);
    this.#lottoWins = new LottoWins(lottoNums, Number(bonusNumStr));
  }

  /** 5등부터 1등순으로 인원을 담는 배열을 생성하는 메서드 */
  #getRanks() {
    this.#lottoRanks = new LottoSummary(this.#lottoArray, this.#lottoWins);
  }

  #finish() {
    Console.print(MESSEGE.SUMMARY);
    Console.print("---");
    LottoPrinter.continuouslyWinnerPrint(this.#lottoRanks, this.#amt);
  }
}

export default App;
