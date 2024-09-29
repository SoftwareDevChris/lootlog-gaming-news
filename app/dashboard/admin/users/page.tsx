import { getAllUsers } from "@/lib/user";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <>
      <div>List all users</div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Role</th>
            <th>Articles</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.articles?.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
