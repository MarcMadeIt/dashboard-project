import { updateUser } from "@/app/lib/action";
import { fetchUser } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/users/view/view.module.css";
import Image from "next/image";
import { MdBadge, MdMail, MdPhone } from "react-icons/md";

const ViewUser = async ({ params }) => {
  const { id } = params;
  const user = await fetchUser(id);

  return (
    <div className={styles.container}>
      <form action={updateUser} className={styles.form}>
        <div className={styles.infoContainer}>
          <div className={styles.imageContainer}>
            {user.img && user.img.buffer && (
              <Image
                src={`data:image/png;base64,${Buffer.from(
                  user.img.buffer
                ).toString("base64")}`}
                alt=""
                width={0}
                height={0}
                className={styles.userImage}
              />
            )}
          </div>
          <div className={styles.upload}>
            <label>Upload Picture</label>
            <input type="file" name="img" />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>
              <h3>{user.username}</h3>
            </div>
            <div className={styles.item}>
              <MdBadge size={17} />
              <span>{user.role ? "Admin" : "Client"}</span>
            </div>
            <div className={styles.item}>
              <MdMail size={17} />
              <span>{user.email}</span>
            </div>
            <div className={styles.item}>
              <MdPhone size={17} />
              <span>{user.phone}</span>
            </div>
          </div>
        </div>
        <div className={styles.formContainer}>
          <input type="hidden" name="id" value={user.id} />
          <label>Status</label>
          <select
            name="status"
            id="status"
            defaultValue={user.role ? "active" : "inactive"}
          >
            <option value={true}>Choose Status</option>
            <option value={true}></option>
            <option value={false}>Inactive</option>
          </select>
          <label>Role</label>
          <select
            name="role"
            id="role"
            defaultValue={user.role ? "admin" : "employer"}
          >
            <option value={false}>Select Role</option>
            <option value={true}>Admin</option>
            <option value={false}>Employer</option>
          </select>
          <label>Username</label>
          <input type="text" name="username" placeholder={user.username} />
          <label>Email</label>
          <input type="email" placeholder={user.email} name="price" />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Phone Number</label>
          <input type="phone" placeholder={user.phone} name="phone" />
          <button type="submit" className={styles.submit}>
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewUser;
