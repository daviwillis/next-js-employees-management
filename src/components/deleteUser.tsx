export function Deletecomponent({ deleteHandler, cancelHandler }: any) {
  return (
    <div className='flex gap-5'>
      <button>Tem certeza?</button>
      <button onClick={deleteHandler} className='flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50'>
        Sim
      </button>
      <button onClick={cancelHandler} className="'flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-green-500 hover:border-green-500 hover:text-gray-50'">
        Não
      </button>
    </div>
  );
}
