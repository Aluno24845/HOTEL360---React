import React from 'react';
import { toast } from 'react-toastify';

export default function ToastConfirmaDelete({ id, action, closeToast, item }) {
  const confirmDelete = (isConfirmed) => {
    if (isConfirmed) {
      // Lógica para deletar a reserva
      action(id);
      toast.success(`${item} removido/a!`);
    } else {
      toast.info('Ação cancelada');
    }
    closeToast();
  };

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      <p className="text-sm">Tem certeza que quer eliminar {item}?</p>
      <div className="mt-4 flex justify-center space-x-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => confirmDelete(true)}
        >
          Sim
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => confirmDelete(false)}
        >
          Não
        </button>
      </div>
    </div>
  );
}
