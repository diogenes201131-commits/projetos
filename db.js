let db;

function abrirBanco() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ordemServicoDB', 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;

      if (!db.objectStoreNames.contains('ordens')) {
        const store = db.createObjectStore('ordens', {
          keyPath: 'id',
          autoIncrement: true
        });
        store.createIndex('data', 'data', { unique: false });
      }
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      resolve();
    };

    request.onerror = () => reject('Erro ao abrir banco');
  });
}
