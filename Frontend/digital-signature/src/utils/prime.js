const forge = require("node-forge");
const BigInteger = forge.jsbn.BigInteger;

// Hàm để tạo số ngẫu nhiên trong khoảng từ 1 đến n-1
function getRandomBigInt(n) {
  let a;
  do {
    const randomBytes = forge.random.getBytesSync(n.bitLength() / 8);
    a = new BigInteger(randomBytes, 256)
      .mod(n.subtract(BigInteger.ONE))
      .add(BigInteger.ONE);
  } while (
    a.compareTo(BigInteger.ONE) <= 0 ||
    a.compareTo(n.subtract(BigInteger.ONE)) >= 0
  );
  return a;
}

// Hàm để kiểm tra tính nguyên tố bằng thuật toán Miller-Rabin
export function millerRabinTest(n, k) {
  if (n.compareTo(BigInteger.ONE) <= 0) {
    return false; // 0 hoặc 1 không phải số nguyên tố
  }
  if (n.compareTo(new BigInteger("2")) === 0) {
    return true; // 2 là số nguyên tố
  }
  if (n.mod(new BigInteger("2")).compareTo(BigInteger.ZERO) === 0) {
    return false; // Số chẵn lớn hơn 2 không phải số nguyên tố
  }

  // Viết n - 1 dưới dạng 2^s * d với d lẻ
  let s = 0;
  let d = n.subtract(BigInteger.ONE);
  while (d.mod(new BigInteger("2")).compareTo(BigInteger.ZERO) === 0) {
    d = d.divide(new BigInteger("2"));
    s++;
  }

  // Hàm phụ trợ để thực hiện lũy thừa mô-đun
  function powerMod(base, exponent, modulus) {
    let result = BigInteger.ONE;
    base = base.mod(modulus);
    while (exponent.compareTo(BigInteger.ZERO) > 0) {
      if (exponent.mod(new BigInteger("2")).compareTo(BigInteger.ONE) === 0) {
        result = result.multiply(base).mod(modulus);
      }
      exponent = exponent.shiftRight(1);
      base = base.multiply(base).mod(modulus);
    }
    return result;
  }

  // Lặp k lần kiểm tra Miller-Rabin
  for (let i = 0; i < k; i++) {
    // Tạo số ngẫu nhiên a trong khoảng từ 1 đến n-1
    const a = getRandomBigInt(n);
    let x = powerMod(a, d, n);

    if (
      x.compareTo(BigInteger.ONE) !== 0 &&
      x.compareTo(n.subtract(BigInteger.ONE)) !== 0
    ) {
      let j = 0;
      while (j < s - 1 && x.compareTo(n.subtract(BigInteger.ONE)) !== 0) {
        x = x.multiply(x).mod(n);
        if (x.compareTo(BigInteger.ONE) === 0) {
          return false;
        }
        j++;
      }
      if (x.compareTo(n.subtract(BigInteger.ONE)) !== 0) {
        return false;
      }
    }
  }
  return true;
}
