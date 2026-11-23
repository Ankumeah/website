class Modifier {
  #divFunc = (elem) => {
    const div = document.createElement("div");

    elem.parentElement.appendChild(div);
    div.appendChild(elem);
  }

  /** @type {Array<(elem: HTMLElement) => void>} */
  funcs = [];

  /** @param {Modifier} modifier */
  constructor(modifier) {
    this.funcs = modifier ? [...modifier.funcs] : [];
  }

  /**
   * @param {(elem: HTMLElement) => void} styleFunc
   * @returns {Modifier}
  */
  add(styleFunc) {
    this.funcs.push(styleFunc);

    return this
  }

  /** @param {string} queryStr */
  apply(queryStr) {
    document.querySelectorAll(queryStr).forEach((elem) => {
      this.#divFunc(elem);
      this.funcs.forEach((func) => func(elem.parentElement));
    });
  }

  /** @returns {Modifier} */
  div() {
    this.funcs.push(this.#divFunc);

    return this
  }
}
