function gcd(a, b) {
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a;
}

function modInverse(e, phi) {
  let [t, newT] = [0n, 1n];
  let [r, newR] = [phi, e];

  while (newR !== 0n) {
    let quotient = r / newR;
    [t, newT] = [newT, t - quotient * newT];
    [r, newR] = [newR, r - quotient * newR];
  }

  if (r > 1n) throw new Error("e is not invertible");
  if (t < 0n) t = t + phi;

  return t;
}

function getRandomInt(min, max) {
  return BigInt(
    Math.floor(Math.random() * Number(max - min + 1n)) + Number(min)
  );
}

function generateRSAKeys(p, q) {
  const n = p * q;
  const phi = (p - 1n) * (q - 1n);

  let e;
  do {
    e = getRandomInt(2n, phi - 1n); // Chọn một giá trị ngẫu nhiên cho e trong khoảng từ 2 đến phi(n) - 1
  } while (gcd(e, phi) !== 1n);

  const d = modInverse(e, phi);

  return {
    publicKey: { e, n },
    privateKey: { d, n },
  };
}
export default generateRSAKeys;
