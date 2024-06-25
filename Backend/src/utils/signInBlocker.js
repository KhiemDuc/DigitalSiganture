class SignInBlocker {
  constructor() {
    this.users = {};
  }

  check(id) {
    if (this.users[id.toString()] && this.users[id.toString()] >= 5)
      return true;
    else return false;
  }

  increase(id) {
    if (!this.users[id.toString()]) this.users[id.toString()] = 1;
    this.users[id.toString()]++;
    if (this.users[id.toString()] === 5) {
      setTimeout(() => {
        this.clear(id);
      }, 300000);
    }
  }

  clear(id) {
    if (this.users[id.toString()]) delete this.users[id.toString()];
  }
}

module.exports = new SignInBlocker();
