const baseURL = 'http://localhost:3000';

//todos os usuários
export const getUsers = async () => {
  const response = await fetch(`${baseURL}/api/users`);
  const json = await response.json();

  return json;
};

//um usuário

export const getUser = async (userId: string) => {
  const response = await fetch(`${baseURL}/api/users/${userId}`);
  const json = await response.json();
  if (json) return json;
  return {};
};

export interface Data {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  date: string;
  salary: number;
  status: string;
}
//posting a new user
export async function addUser(formData: Data) {
  try {
    const Options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    const response = await fetch(`${baseURL}/api/users/`, Options);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}

//update a user
export async function updateUser(userId: string, formData: Data) {
  try {
    const Options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${baseURL}/api/users/${userId}`, Options);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}

//delete a user
export async function deleteUser(userId: string) {
  try {
    const Options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(`${baseURL}/api/users/${userId}`, Options);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}

export const CurrencyFormat = (currency: number | undefined): string => {
  const result: string = currency ? currency.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 'Não informado';
  return result;
};

export const DateFormat = (date: string) => {
  return date ? new Date(date).toLocaleDateString('pt-br') : 'Não informado';
};
