import styles from "@/app/ui/login/login.module.css";
import { authenticate } from "../lib/action";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <form action={authenticate} className={styles.form}>
        <h1>Login</h1>
        <div className={styles.inputItem}>
          <label className={styles.label}>Username</label>
          <input
            className={styles.input}
            type="text"
            placeholder=""
            name="username"
          />
        </div>
        <div className={styles.inputItem}>
          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            placeholder=""
            name="password"
          />
        </div>
        <button className={styles.submit} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
