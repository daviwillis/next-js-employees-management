import { Deletecomponent } from '@/components/deleteUser';
import Form from '@/components/form';
import Table from '@/components/table';
import { deleteUser, getUsers } from '@/lib/helper';
import { deleteAction, toggleChangeAction } from '@/redux/reducer';
import Head from 'next/head';
import { BiUserPlus } from 'react-icons/bi';
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const visible = useSelector((state: any) => state.app.client.toggleForm);
  const deleteId = useSelector((state: any) => state.app.client.deleteId);
  const queryClient = useQueryClient();

  const deleteHandler = async () => {
    if (deleteId) {
      await deleteUser(deleteId);
      await queryClient.prefetchQuery('users', getUsers);
      dispatch(deleteAction(null));
    }
  };

  const cancelHandler = async () => {
    dispatch(deleteAction(null));
  };

  const dispatch = useDispatch();
  const handler = () => {
    dispatch(toggleChangeAction(''));
  };
  return (
    <section>
      <Head>
        <title>Quadro de Colaboradores</title>
        <meta name='description' content='Created By Davi Willis' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='py-5'>
        <h1 className='text-xl md:text-5xl text-center font-bold py-10'>Quadro de Colaboradores</h1>

        <div className='container mx-auto flex justify-between py-5 border-b'>
          <div className='left flex gap-3'>
            <button onClick={handler} className='flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800'>
              Cadastrar Colaborador
              <span className='px-1'>
                <BiUserPlus size={23} />
              </span>
            </button>
          </div>
          {deleteId ? <Deletecomponent deleteHandler={deleteHandler} cancelHandler={cancelHandler} /> : <></>}
        </div>

        {/* Collapse Form */}
        {visible ? <Form /> : <></>}

        {/* Table */}
        <div className='container mx-auto'>
          <Table />
        </div>
      </main>
    </section>
  );
}
