import styles from "@/app/ui/dashboard/users/users.module.css";
import SearchBar from "@/app/ui/dashboard/search/search.jsx";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination.jsx";
import { fetchUsers } from "@/app/lib/data.js";
import { deleteUser } from "@/app/lib/action";

const UsersPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, users } = await fetchUsers(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <SearchBar placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.add}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td className={styles.email}>Email</td>
            <td>Created at</td>
            <td>Role</td>
            <td>State</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <div className={styles.user}>
                  {user.img && user.img.buffer && (
                    <Image
                      src={`data:image/png;base64,${Buffer.from(
                        user.img.buffer
                      ).toString("base64")}`}
                      alt=""
                      width="30"
                      height="30"
                      className={styles.userImage}
                    />
                  )}
                  <span>{user.username}</span>
                </div>
              </td>
              <td className={styles.email}>
                <span>{user.email}</span>
              </td>
              <td>
                {" "}
                <span> {user.createdAt?.toString().slice(4, 16)}</span>
              </td>
              <td>
                <span>{user.role ? "Admin" : "Client"}</span>
              </td>
              <td>
                {" "}
                <span>{user.status ? "Active" : "Inactive"}</span>
              </td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user._id}`}>
                    <button className={`${styles.edit} ${styles.button}`}>
                      Edit
                    </button>
                  </Link>
                  <form action={deleteUser}>
                    <input
                      type="hidden"
                      name="id"
                      value={user._id.toString()}
                    />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default UsersPage;
