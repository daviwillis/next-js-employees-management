import { useReducer } from 'react';
import Success from './success';
import { useQueryClient, useMutation } from 'react-query';
import { addUser, getUsers } from '@/lib/helper';
import Bug from './bug';

export default function AddUserForm({ formData, setFormData }: any) {
  const queryClient = useQueryClient();

  const addMutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.prefetchQuery('users', getUsers);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) return console.log('Não tem nda preenchido');
    let { _id, firstname, lastname, email, salary, date, status } = formData;

    const model = {
      _id,
      name: `${firstname} ${lastname}`,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg`,
      email,
      salary,
      date,
      status: status ?? 'Ativo',
    };

    addMutation.mutate(model);
  };

  if (addMutation.isLoading) return <div>Loading..</div>;
  if (addMutation.isError) return <Bug message='Erro ao cadastrar colaborador' />;
  if (addMutation.isSuccess) return <Success message='Colaborador cadastrado' />;

  return (
    <form className='grid lg:grid-cols-2 w-4/6 gap-4 ' onSubmit={handleSubmit}>
      <div className='input-type'>
        <input type='text' onChange={setFormData} name='firstname' className='border w-full px-5 py-3 focus:outline-none rounded-md' placeholder='Nome' />
      </div>
      <div className='input-type'>
        <input type='text' onChange={setFormData} name='lastname' className='border w-full px-5 py-3 focus:outline-none rounded-md' placeholder='Sobrenome' />
      </div>
      <div className='input-type'>
        <input type='email' onChange={setFormData} name='email' className='border w-full px-5 py-3 focus:outline-none rounded-md' placeholder='Email' />
      </div>
      <div className='input-type'>
        <input type='text' onChange={setFormData} name='salary' className='border w-full px-5 py-3 focus:outline-none rounded-md' placeholder='Salário' />
      </div>
      <div className='input-type'>
        <input type='date' onChange={setFormData} name='date' className='border px-5 py-3 focus:outline-none rounded-md ' placeholder='Data de admissão' />
      </div>

      <div className='flex gap-10 items-center'>
        <div className='form-check'>
          <input
            type='radio'
            name='status'
            value='Ativo'
            onChange={setFormData}
            id='radioDefault1'
            className='form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus-within:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
          />
          <label htmlFor='radioDefault1' className='inline-block text-gray-800'>
            Ativo
          </label>
        </div>
        <div className='form-check'>
          <input
            type='radio'
            name='status'
            value='Inativo'
            id='radioDefault2'
            onChange={setFormData}
            className='form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus-within:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
          />
          <label htmlFor='radioDefault2' className='inline-block text-gray-800'>
            Inativo
          </label>
        </div>
      </div>
      <button className='flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500'>Salvar</button>
    </form>
  );
}
