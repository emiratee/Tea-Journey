import { Funfact } from '../../interfaces/Funfact';
import { Tea } from '../../interfaces/Tea';
// import { User, BadgeInterface, BrewedTea, Review } from '../../interfaces/User';
import { UserResponse } from '../../interfaces/User';

const url = process.env.BASE_URL || 'http://127.0.0.1:3001';

async function getAllTeas(): Promise<Tea[]> {
  try {
    const response = await fetch(`${url}/tea`);
    return await response.json();
  } catch (error) {
    throw new Error(error as string);
  }
}

async function getAllFunfacts(): Promise<Funfact[]> {
  try {
    const response = await fetch(`${url}/funfact`);
    return await response.json();
  } catch (error) {
    throw new Error(error as string);
  }
}

async function validatePassword(username: string, password: string) {
  try {
    const response = await fetch(`${url}/user/account/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    return await response.json();
  } catch (error) {
    throw new Error(error as string);
  }
}

async function registerUser(name: string, username: string, password: string) {
  try {
    const response = await fetch(`${url}/user/account/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, password }),
    });
    return await response.json();
  } catch (error) {
    throw new Error(error as string);
  }
}

async function getUser(token: string): Promise<UserResponse> {
  try {
    const response = await fetch(`${url}/user/account`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });
    const data: UserResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error(error as string);
  }
}

async function counter(direction: 'up' | 'down') {
  const token = localStorage.getItem('accessToken');
  try {
    const response = await fetch(`${url}/user/tea/counter/${direction}`, {
      method: 'POST',
      headers: {
        Authorization: token || '',
      },
    });
    if (response.ok) return await response.json();
    throw new Error('Request failed');
  } catch (error) {
    throw new Error(error as string);
  }
}

async function addBrewedTea(tea: Tea, token: string) {
  try {
    const response = await fetch(`${url}/user/tea/brew`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ name: tea.name }),
    });
    if (response.ok) return await response.json();
    throw new Error('Request failed');
  } catch (error) {
    throw new Error(error as string);
  }
}

async function addTeaTime(time: number, token: string) {
  try {
    const response = await fetch(`${url}/user/tea/time`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ time }),
    });
    if (response.ok) return await response.json();
    throw new Error('Request failed');
  } catch (error) {
    throw new Error(error as string);
  }
}

async function markAsFavourite(name: string, token: string) {
  try {
    const response = await fetch(`${url}/user/tea/favourite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ name }),
    });
    if (response.ok) return await response.json();
    throw new Error('Request failed');
  } catch (error) {
    throw new Error(error as string);
  }
}

async function rateTea(name: string, rating: number, token: string) {
  try {
    const response = await fetch(`${url}/user/tea/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ name, rating }),
    });
    if (response.ok) return await response.json();
    throw new Error('Request failed');
  } catch (error) {
    throw new Error(error as string);
  }
}

async function resetJourney(token: string) {
  try {
    const response = await fetch(`${url}/user/journey/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    if (response.ok) return await response.json();
    throw new Error('Request failed');
  } catch (error) {
    throw new Error(error as string);
  }
}

async function updateUser(
  name: string,
  username: string,
  password: string,
  token: string
) {
  try {
    const response = await fetch(`${url}/user/account/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ name, username, password }),
    });
    return await response.json();
  } catch (error) {
    throw new Error(error as string);
  }
}

export {
  getAllTeas,
  getAllFunfacts,
  validatePassword,
  registerUser,
  getUser,
  counter,
  addBrewedTea,
  addTeaTime,
  markAsFavourite,
  rateTea,
  resetJourney,
  updateUser,
};
