self.addEventListener("message", function (e) {
  let bytes = generateRandomBigInt(2048);
  while (!millerCheck(bytes)) {
    bytes = generateRandomBigInt(2048);
  }
  self.postMessage(bytes);
});

var LOW_PRIMES = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
  157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
  239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,
  331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419,
  421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503,
  509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607,
  613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701,
  709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811,
  821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911,
  919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997,
];

function millerCheck(n) {
  for (let i = 0; i < LOW_PRIMES.length; i++) {
    if (n % BigInt(LOW_PRIMES[i]) === 0n) return false;
  }
  return millerRabin(n, 60);
}

function millerRabin(n, k) {
  n = BigInt(n);
  k = BigInt(k);
  // Nếu n là 2 hoặc 3, nó là số nguyên tố
  if (n === 2n || n === 3n) {
    return true;
  }
  // Nếu n là số chẵn hoặc nhỏ hơn 2, nó không phải là số nguyên tố
  if (n < 2n || n % 2n === 0n) {
    return false;
  }
  // Viết n - 1 dưới dạng 2^s * d với d là số lẻ
  let s = 0n;
  let d = n - 1n;
  while (d % 2n === 0n) {
    d /= 2n;
    s++;
  }
  // Kiểm tra k lần
  for (let i = 0n; i < k; i++) {
    // Chọn một số ngẫu nhiên a trong đoạn [2, n-2]
    const a = generateRandomBigInt(2 + Math.random() * 2043);
    // x = a^d % n
    let x = modExp(a, d, n);
    if (x === 1n || x === n - 1n) {
      continue;
    }
    let continueLoop = false;
    for (let r = 1n; r < s; r++) {
      x = modExp(x, 2n, n);
      if (x === 1n) {
        return false;
      }
      if (x === n - 1n) {
        continueLoop = true;
        break;
      }
    }
    if (!continueLoop) {
      return false;
    }
  }
  return true;
}

function modExp(base, exp, mod) {
  base = BigInt(base);
  exp = BigInt(exp);
  mod = BigInt(mod);

  let result = 1n;
  base = base % mod;

  while (exp > 0) {
    if (exp % 2n === 1n) {
      result = (result * base) % mod;
    }
    exp = exp >> 1n;
    base = (base * base) % mod;
  }

  return result;
}
function generateRandomBigInt(bits) {
  let randomNumber = 0n;

  // Tạo từng bit ngẫu nhiên cho số BigInt
  for (let i = 0; i < bits; i++) {
    // Random bit 0 hoặc 1
    const randomBit = Math.random() < 0.5 ? 0n : 1n;

    // Đẩy bit vào randomNumber
    randomNumber = (randomNumber << 1n) | randomBit;
  }

  return randomNumber;
}
