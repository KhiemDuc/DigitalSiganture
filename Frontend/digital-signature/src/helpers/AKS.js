function isPerfectPower(n) {
  for (let b = BigInt(2); b ** BigInt(2) <= n; b++) {
    for (let a = BigInt(2); b ** a <= n; a++) {
      if (b ** a === n) {
        return true;
      }
    }
  }
  return false;
}

function gcd(a, b) {
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a;
}

function modExp(base, exp, mod) {
  if (mod === 1n) return 0n;
  let result = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) result = (result * base) % mod;
    exp = exp >> 1n;
    base = (base * base) % mod;
  }
  return result;
}

function aks(n) {
  n = BigInt(n);
  if (n === 1n) return false;
  if (n === 2n) return true;

  // kiểm tra xem n có bằng a^b không
  if (isPerfectPower(n)) return false;

  // tìm r nhỏ nhất sao cho ord_r(n) > log^2(n)
  let r = 2n;
  let maxK = BigInt(Math.ceil(Math.log2(Number(n)) ** 2));
  let log2n = BigInt(Math.ceil(Math.log2(Number(n))));

  while (true) {
    let nextR = false;
    for (let k = 1n; k <= maxK; k++) {
      if (modExp(n, k, r) === 0n || gcd(n, r) > 1n) {
        nextR = true;
        break;
      }
    }
    if (!nextR) break;
    r++;
  }

  // check a có nguyên tố cùng nhau với n không (a chạy từ 1-> r)
  for (let a = 2n; a <= r; a++) {
    let g = gcd(a, n);
    if (g > 1n && g < n) return false;
  }

  // nếu n < r trả về true
  if (n <= r) return true;

  // Kiểm tra đa thức
  let limit = BigInt(Math.floor(Math.sqrt(Number(totient(r))) * Number(log2n)));
  for (let a = 1n; a <= limit; a++) {
    if (modExp(a, n, n) !== modExp(a, n % (n - 1n), n)) {
      return false;
    }
  }

  // tất cả đều OK
  return true;
}

function totient(n) {
  n = BigInt(n);
  let result = n;
  for (let p = 2n; p * p <= n; p++) {
    if (n % p === 0n) {
      while (n % p === 0n) n /= p;
      result -= result / p;
    }
  }
  if (n > 1n) result -= result / n;
  return result;
}
export default aks;
