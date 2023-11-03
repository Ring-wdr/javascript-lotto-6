import { Console, Random } from "@woowacourse/mission-utils";
import MESSEGE from "./Messages";

class App {
  #amt = 0;
  async pay() {
    const amt = await Console.readLineAsync(MESSEGE.INPUT_BUY_AMT);
    const buyAmt = Number(amt);
    if (isNaN(buyAmt) || buyAmt % 1000 !== 0) {
      Console.print(MESSEGE.ERROR_NUMBER);
      return false;
    }
    this.#amt = buyAmt;
    return true;
  }

  async play() {
    let isCorrect = false;
    while (!isCorrect) {
      isCorrect = await this.pay();
    }
    const buyCount = parseInt(this.#amt / 1000);
    Console.print(`${buyCount}${MESSEGE.SHOW_BUY_COUNT}`);
    const lottoArray = Array.from({ length: buyCount }, () =>
      Random.pickUniqueNumbersInRange(1, 45, 6)
    );
    lottoArray.forEach((l) => Console.print(`[${l.join(", ")}]`));

    const lottoNumsStr = await Console.readLineAsync(MESSEGE.INPUT_WIN_NUM);
    const lottoRegex = /^\d+(,\d+)*$/;
    if (!lottoRegex.test(lottoNumsStr))
      throw new Error(MESSEGE.ERROR_LOTTO_NUMBER);
    const lottoNums = lottoNumsStr.split(",").map(Number);

    const bonusNumStr = await Console.readLineAsync(MESSEGE.INPUT_BONUS_NUM);
    const bonusNum = Number(bonusNumStr);
    if (isNaN(bonusNum)) throw new Error(MESSEGE.ERROR_NUMBER);

    const lottoResults = lottoArray.map((lottos) =>
      lottos.reduce(
        (result, num) =>
          lottoNums.includes(num)
            ? { ...result, score: result.score + 1 }
            : num === bonusNum
            ? { ...result, bonus: true }
            : result,
        { score: 0, bonus: false }
      )
    );
    const resultCounts = lottoResults.reduce(
      (counts, { score, bonus }) => {
        const temp = counts.slice();
        if (score === 3) return (temp[0] = temp[0] + 1), temp;
        if (score === 4) return (temp[1] = temp[1] + 1), temp;
        if (score === 5) return (temp[2] = temp[2] + 1), temp;
        if (score === 5 && bonus) return (temp[3] = temp[3] + 1), temp;
        if (score === 6) return (temp[4] = temp[4] + 1), temp;
        return counts;
      },
      [0, 0, 0, 0, 0]
    );

    const price = Object.freeze([
      5_000, 50_000, 1_500_000, 30_000_000, 2_000_000_000,
    ]);

    Console.print(MESSEGE.SUMMARY);
    Console.print("---");
    Console.print(
      `3${MESSEGE.NUMBER_FIT} (${price[0].toLocaleString()}${MESSEGE.WON}) - ${
        resultCounts[0]
      }${MESSEGE.COUNT}`
    );
    Console.print(
      `4${MESSEGE.NUMBER_FIT} (${price[1].toLocaleString()}${MESSEGE.WON}) - ${
        resultCounts[1]
      }${MESSEGE.COUNT}`
    );
    Console.print(
      `5${MESSEGE.NUMBER_FIT} (${price[2].toLocaleString()}${MESSEGE.WON}) - ${
        resultCounts[2]
      }${MESSEGE.COUNT}`
    );
    Console.print(
      `5${MESSEGE.NUMBER_FIT}, ${
        MESSEGE.BONUS_FIT
      } (${price[3].toLocaleString()}${MESSEGE.WON}) - ${resultCounts[3]}${
        MESSEGE.COUNT
      }`
    );
    Console.print(
      `6${MESSEGE.NUMBER_FIT} (${price[4].toLocaleString()}${MESSEGE.WON}) - ${
        resultCounts[4]
      }${MESSEGE.COUNT}`
    );
    Console.print(`${MESSEGE.TOTAL_BENEFIT} 62.5%${MESSEGE.IS}`);
  }
}

export default App;
