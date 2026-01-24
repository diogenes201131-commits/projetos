const Database = require('better-sqlite3');
const db = new Database('ordens.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS ordens_servico (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT,
    viatura TEXT,
    oficina TEXT,
    militar TEXT,
    total REAL
  );

  CREATE TABLE IF NOT EXISTS pecas_os (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    os_id INTEGER,
    peca TEXT,
    quantidade INTEGER,
    valor REAL,
    subtotal REAL
  );
`);

function salvarOS(os) {
  const insertOS = db.prepare(`
    INSERT INTO ordens_servico (data, viatura, oficina, militar, total)
    VALUES (?, ?, ?, ?, ?)
  `);

  const result = insertOS.run(
    os.data,
    os.viatura,
    os.oficina,
    os.militar,
    os.total
  );

  const insertPeca = db.prepare(`
    INSERT INTO pecas_os (os_id, peca, quantidade, valor, subtotal)
    VALUES (?, ?, ?, ?, ?)
  `);

  os.pecas.forEach(p => {
    insertPeca.run(
      result.lastInsertRowid,
      p.peca,
      p.quantidade,
      p.valor,
      p.subtotal
    );
  });

  return { success: true };
}

function listarOS() {
  return db.prepare(`
    SELECT id, data, viatura, militar, total
    FROM ordens_servico
    ORDER BY data DESC
  `).all();
}

function buscarOS(id) {
  const os = db.prepare(`
    SELECT * FROM ordens_servico WHERE id = ?
  `).get(id);

  const pecas = db.prepare(`
    SELECT * FROM pecas_os WHERE os_id = ?
  `).all(id);

  return { ...os, pecas };
}

module.exports = { salvarOS, listarOS, buscarOS };
