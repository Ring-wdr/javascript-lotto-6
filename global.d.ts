declare module "@woowacourse/mission-utils" {
  class Random {
    static pickUniqueNumbersInRange(
      startInclusive: number,
      endInclusive: number,
      count: number
    ): number[];
  }
  class Console {
    static readLineAsync(query: string): Promise<string>;
    static print(message): void;
  }
}
