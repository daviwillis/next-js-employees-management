import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import { CurrencyFormat, getUsers, DateFormat, Data } from '@/lib/helper';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAction, toggleChangeAction, updateAction } from '@/redux/reducer';
interface Query {
  isLoading: boolean;
  isError: boolean;
  data: any;
  error: any;
}

export default function Table() {
  const { isLoading, isError, data, error }: Query = useQuery('users', getUsers);

  if (isLoading) return <div>Carregando colaborador..</div>;

  if (isError) return <div>{error}</div>;

  return (
    <table className='min-w-full table-auto '>
      <thead>
        <tr className='bg-gray-800'>
          <th className='px-16 py-2'>
            <span className='text-gray-200'>Nome</span>
          </th>
          <th className='px-16 py-2'>
            <span className='text-gray-200'>Email</span>
          </th>
          <th className='px-16 py-2'>
            <span className='text-gray-200'>Salário</span>
          </th>
          <th className='px-16 py-2'>
            <span className='text-gray-200'>Data de Admissão</span>
          </th>
          <th className='px-16 py-2'>
            <span className='text-gray-200'>Situação</span>
          </th>
          <th className='px-16 py-2'>
            <span className='text-gray-200'>Ações</span>
          </th>
        </tr>
      </thead>
      <tbody className='bg-gray-200'>
        {data.map((obj: Data, i: number) => (
          <Tr {...obj} key={i} />
        ))}
      </tbody>
    </table>
  );
}

function Tr({ _id, name, avatar, email, salary, date, status }: Data) {
  const visible = useSelector((state: any) => state.app.client.toggleForm);

  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(toggleChangeAction(_id));
    if (visible) {
      dispatch(updateAction(_id));
    }
  };

  const handleDelete = () => {
    if (!visible) {
      dispatch(deleteAction(_id));
    }
  };
  return (
    <tr className='bg-gray-50 text-center'>
      <td className='px-16 py-2 flex flex-row items-center'>
        <img src={avatar || '#'} alt='' className='h-8 w-8 rounded-full object-cover' />
        <span className='text-center whitespace-nowrap ml-2 font-semibold '>{name || 'Não informado'}</span>
      </td>
      <td className='px-16 py-2'>
        <span>{email || 'Não informado'}</span>
      </td>
      <td className='px-16 py-2'>
        <span>{CurrencyFormat(salary) || 'Não informado'}</span>
      </td>
      <td className='px-16 py-2'>
        <span>{DateFormat(date) || 'Não informado'}</span>
      </td>
      <td className='px-16 py-2'>
        <button className='cursor '>
          <span className={`${status === 'Ativo' ? 'bg-green-500' : 'bg-rose-500'} text-white px-5 py-1 rounded-full`}>{status || 'Não informado'}</span>
        </button>
      </td>
      <td className='px-12 py-2 flex justify-around gap-5'>
        <button className='cursor' onClick={handleUpdate}>
          <BiEdit size={25} color={'rgb(34,197,94)'} />
        </button>
        <button className='cursor' onClick={handleDelete}>
          <BiTrashAlt size={25} color={'rgb(244,63,94)'} />
        </button>
      </td>
    </tr>
  );
}
