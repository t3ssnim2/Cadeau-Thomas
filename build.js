const fs = require("fs");
const hash = s => { let x = 5381; for (const c of s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()) x = ((x << 5) + x + c.charCodeAt(0)) >>> 0; return x; };
const msg = fs.readFileSync(__dirname + "/msg.txt", "utf8").trim();
const b64 = Buffer.from(msg, "utf8").toString("base64");
const s = fs.readFileSync(__dirname + "/src.html", "utf8").replace("__FINAL__", b64).replace("__HASH__", String(hash("fougère")));
fs.writeFileSync(__dirname + "/../index.html", s);
const js = s.split("<script>")[1].split("</script>")[0];
fs.writeFileSync(require("os").tmpdir() + "/check.js", js);
console.log("built", s.length);
