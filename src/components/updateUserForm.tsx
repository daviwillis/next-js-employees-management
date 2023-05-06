import { Data, getUser, getUsers, updateUser } from '@/lib/helper';
import { useReducer } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Bug from './bug';
import Success from './success';

export default function UpdateUserForm({ formId, formData, setFormData }: any) {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(['users', formId], () => getUser(formId));
  const updateMutation = useMutation((newData: Data) => updateUser(formId, newData), {
    onSuccess: async (data) => {
      queryClient.prefetchQuery('users', getUsers);
    },
  });
  if (isLoading) return <div>Loading..</div>;
  if (isError) return <Bug message='Erro ao atualizar colaborador' />;

  const { name, avatar, salary, date, email, status } = data;
  const [firstname, lastname] = name ? name.split(' ') : formData;
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let userName = `${formData.firstname ?? firstname} ${formData.lastname ?? lastname}`;
    let updated = Object.assign({}, data, formData, { name: userName });
    updateMutation.mutate(updated);
  };

  return (
    <form className='grid lg:grid-cols-2 w-4/6 gap-4' onSubmit={handleSubmit}>
      <div className='input-type'>
        <input type='text' onChange={setFormData} defaultValue={firstname} name='firstname' className='border w-full px-5 py-3 focus:outline-none rounded-md' placeholder='Nome' />
      </div>
      <div className='input-type'>
        <input type='text' onChange={setFormData} name='lastname' defaultValue={lastname} className='border w-full px-5 py-3 focus:outline-none rounded-md' placeholder='Sobrenome' />
      </div>
      <div className='input-type'>
        <input type='email' onChange={setFormData} name='email' defaultValue={email} className='border w-full px-5 py-3 focus:outline-none rounded-md' placeholder='Email' />
      </div>
      <div className='input-type'>
        <input type='text' onChange={setFormData} name='salary' defaultValue={salary} className='border w-full px-5 py-3 focus:outline-none rounded-md' placeholder='Salário' />
      </div>
      <div className='input-type'>
        <input type='date' onChange={setFormData} name='date' defaultValue={date} className='border px-5 py-3 focus:outline-none rounded-md ' placeholder='Data de admissão' />
      </div>

      <div className='flex gap-10 items-center'>
        <div className='form-check'>
          <input
            type='radio'
            name='status'
            value='Ativo'
            onChange={setFormData}
            id='radioDefault1'
            defaultChecked={status === 'Ativo'}
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
            defaultChecked={status !== 'Ativo'}
            onChange={setFormData}
            className='form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus-within:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
          />
          <label htmlFor='radioDefault2' className='inline-block text-gray-800'>
            Inativo
          </label>
        </div>
      </div>
      <button className='flex justify-center text-md w-2/6 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-yellow-500 hover:text-yellow-500'>Atualizar</button>
    </form>
  );
}
