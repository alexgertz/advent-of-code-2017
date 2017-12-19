let ps = i => i.match(/[^\r\n]+/g).map(n => n.split(' '));
let pg = id => ({ id, _: 0, q: [], l: '', lc: 0, a: 0, b: 0, c: 0, d: 0, i: 0, f: 0, p: id, s: 0 });
let td = (p, i) => (p._ < 0 || p._ >= i.length || (p.l == 'rcv' && p.q.length === 0 && p.lc > 100000));
let ex = (p, i) => { let x = i[p._]; ins[x[0]](ins, p, ...x.slice(1)); p.l = x[0]; p.lc++; }
let ins = {
  get: (r, x) => isNaN(x) ? r[x] : Number(x),
  snd: (i, r, x) => { r.x.q.push(i.get(r, x)); r._++; r.s++ },
  set: (i, r, x, y) => { r[x] = i.get(r, y); r._++ },
  add: (i, r, x, y) => { r[x] += i.get(r, y); r._++ },
  mul: (i, r, x, y) => { r[x] *= i.get(r, y); r._++ },
  mod: (i, r, x, y) => { r[x] %= i.get(r, y); r._++ },
  rcv: (i, r, x) => { let y = r.q.shift(); if (typeof y !== 'undefined') { i.set(i, r, x, y); } },
  jgz: (i, r, x, y) => { if (i.get(r, x) > 0) { r._ += i.get(r, y) } else { r._++ } }
}
module.exports = function (input) {
  let i = ps(input), p0 = pg(0), p1 = pg(1); p0.x = p1; p1.x = p0;
  while (!td(p0, i) && !td(p1, i)) { ex(p0, i); ex(p1, i); }
  return p1.s;
}
