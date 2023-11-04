import Lotto from "./Lotto";
import LottoWins from "./LottoWins";

/**
 * @typedef {Object} LottoResultType
 * @property {number} score
 * @property {boolean} bonus
 */

class LottoSummary {
  #ranks;
  /**
   * @param {Lotto[]} lottos
   * @param {LottoWins} lottoWins
   */
  constructor(lottos, lottoWins) {
    const lottoResults = this.#getLottoResults(lottos, lottoWins);
    this.#ranks = this.#calculateRanks(lottoResults);
  }

  /**
   * 로또 배열과 당첨 번호를 비교하여 맞춘 횟수의 배열들의 배열을 반환하는 메서드
   * @param {Lotto[]} lottos
   * @param {LottoWins} lottoWins
   */
  #getLottoResults(lottos, lottoWins) {
    return lottos.map((lottos) =>
      lottos.getLottoNumbers.reduce(
        (result, num) =>
          lottoWins.getLottoNumbers.includes(num)
            ? { ...result, score: result.score + 1 }
            : num === lottoWins.bonus
            ? { ...result, bonus: true }
            : result,
        { score: 0, bonus: false }
      )
    );
  }
  /**
   * 5등부터 1등순으로 인원을 담는 배열을 생성하는 메서드
   * @param {LottoResultType[]} lottoResults
   */
  #calculateRanks(lottoResults) {
    const initValue = [0, 0, 0, 0, 0];
    return lottoResults.reduce((counts, { score, bonus }) => {
      switch (score) {
        case 3:
          return counts[0]++, counts;
        case 4:
          return counts[1]++, counts;
        case 5:
          return !bonus ? (counts[2]++, counts) : (counts[3]++, counts);
        case 6:
          return counts[4]++, counts;
        default:
          return counts;
      }
    }, initValue);
  }

  /** @readonly */
  get ranks() {
    return this.#ranks;
  }
}

export default LottoSummary;
