//@ts-check
import { Console } from "@woowacourse/mission-utils";
import MESSEGE from "./Messages";

class Utils {
  /** @param {number[]} array*/
  lottoStringPrint(array) {
    Console.print(`[${array.join(", ")}]`);
  }
  /**
   * @param {number[]} resultCounts
   * @param {number} buyAmt
   */
  continuouslyWinnerPrint(resultCounts, buyAmt) {
    const [fifthCount, fourthCount, thirdCount, secondCount, firstCount] = resultCounts;
    const [fifthPrize, fourthPrize, thirdPrize, secondPrize, firstPrize] = this.#price;
    Console.print(MESSEGE.SUMMARY);
    Console.print("---");
    this.#printByRank(3, fifthPrize, fifthCount);
    this.#printByRank(4, fourthPrize, fourthCount);
    this.#printByRank(5, thirdPrize, thirdCount);
    this.#printByRank(5, secondPrize, secondCount, true);
    this.#printByRank(6, firstPrize, firstCount);
    Console.print(`${MESSEGE.TOTAL_BENEFIT} ${this.#getProfit(buyAmt, resultCounts)}%${MESSEGE.IS}`);
  }

  #price = /** @type {const} */ ([5_000, 50_000, 1_500_000, 30_000_000, 2_000_000_000]);
  /**
   *
   * @param {number} rank
   * @param {number} prize
   * @param {number} count
   * @param {boolean=} isBonus
   */
  #printByRank(rank, prize, count, isBonus) {
    Console.print(`${rank}${MESSEGE.NUMBER_FIT}${isBonus ? `, ${MESSEGE.BONUS_FIT}` : ""} (${prize.toLocaleString()}${MESSEGE.WON}) - ${count}${MESSEGE.COUNT}`);
  }
  /**
   *
   * @param {number} buyAmt
   * @param {number[]} resultCounts
   */
  #getProfit(buyAmt, resultCounts) {
    let profit = 0;
    for (let i = 0; i < 5; i++){
      profit += resultCounts[i] * this.#price[i];
    }
    const result = Math.floor((profit / buyAmt) * 1000) / 10;
    return result;
  }
}

export default Utils;
