//@ts-check

import { Console } from "@woowacourse/mission-utils";
import Lotto from "./Lotto";
import LottoSummary from "./LottoSummary";
import Amount from "./Amount";
import MESSEGE from "./Messages";

class LottoPrinter{
  /** @param {Lotto} lotto*/
  static stringPrint(lotto) {
    Console.print(`[${lotto.getLottoNumbers.join(", ")}]`);
  }

  static #price = /** @type {const} */ ([5_000, 50_000, 1_500_000, 30_000_000, 2_000_000_000]);
  /**
   * @param {LottoSummary} resultCounts
   * @param {Amount} buyAmt
   */
  static continuouslyWinnerPrint(resultCounts, buyAmt) {
    const [fifthCount, fourthCount, thirdCount, secondCount, firstCount] = resultCounts.ranks;
    const [fifthPrize, fourthPrize, thirdPrize, secondPrize, firstPrize] = this.#price;
    this.#printByRank(3, fifthPrize, fifthCount);
    this.#printByRank(4, fourthPrize, fourthCount);
    this.#printByRank(5, thirdPrize, thirdCount);
    this.#printByRank(5, secondPrize, secondCount, true);
    this.#printByRank(6, firstPrize, firstCount);
    Console.print(`${MESSEGE.TOTAL_BENEFIT} ${this.#getProfit(buyAmt, resultCounts)}%${MESSEGE.IS}`);
  }
  /**
   *
   * @param {number} rank
   * @param {number} prize
   * @param {number} count
   * @param {boolean=} isBonus
   */
  static #printByRank(rank, prize, count, isBonus) {
    Console.print(`${rank}${MESSEGE.NUMBER_FIT}${isBonus ? `, ${MESSEGE.BONUS_FIT}` : ""} (${prize.toLocaleString()}${MESSEGE.WON}) - ${count}${MESSEGE.COUNT}`);
  }
  /**
   *
   * @param {Amount} buyAmt
   * @param {LottoSummary} resultCounts
   */
  static #getProfit(buyAmt, resultCounts) {
    let profit = 0;
    for (let i = 0; i < 5; i++){
      profit += resultCounts.ranks[i] * this.#price[i];
    }
    const result = Math.floor((profit / buyAmt.amount) * 1000) / 10;
    return result;
  }
}

export default LottoPrinter