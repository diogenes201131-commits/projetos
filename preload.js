const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  salvarOS: (os) => ipcRenderer.invoke('salvar-os', os),
  listarOS: () => ipcRenderer.invoke('listar-os'),
  buscarOS: (id) => ipcRenderer.invoke('buscar-os', id)
});
