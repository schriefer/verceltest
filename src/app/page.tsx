interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
  };
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getUsers() {
  // Simulate network delay
  await sleep(5000);
  
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  return res.json();
}

export default async function Home() {
  const users = await getUsers();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {users.map((user: User) => (
          <div key={user.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{user.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-1">@{user.username}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-1">{user.email}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-1">{user.phone}</p>
            <p className="text-gray-600 dark:text-gray-300">
              {user.address.street}, {user.address.city}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
