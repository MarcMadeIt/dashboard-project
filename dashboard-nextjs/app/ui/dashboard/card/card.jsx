import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

const Card = () => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle fontSize={30} />
      <div className={styles.texts}>
        <span className={styles.title}>Total Users</span>
        <span className={styles.number}>10.200</span>
        <span className={styles.details}>
          <span className={styles.positive}>18%</span>More than previosus
        </span>
      </div>
    </div>
  );
};

export default Card;
