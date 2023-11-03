//@ts-check
import MESSEGE from "./Messages";

class Amount {
  #amount;
  /** @param {number} num  */
  constructor (num){
    this.#validate(num);
    this.#amount = num;
  }
  /** @param {number} num  */
  #validate(num){
    if (isNaN(num) || num % 1000 !== 0){
      throw new Error(MESSEGE.ERROR_NUMBER);
    }
  }
  get amount(){
    return this.#amount;
  }
  get lottoCount(){
    return this.#amount / 1000;
  }
}
export default Amount;
