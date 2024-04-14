import Image from "next/image";
import styles from "./rightbar.module.css";

const RightBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.content}>
          <Image
            src="/astronaut.png"
            alt=""
            width="100"
            height="100"
            className={styles.image}
          />
          <div className={styles.text}>
            <span className={styles.title}> 🔥 New Version Available!</span>
            <h3 className={styles.subtitle}>
              Do you want to learn about the latest version?
            </h3>
            <span className={styles.teaser}>Only 3 minutes tutorial</span>
            <span className={styles.info}>
              This video will learn your new features and improvements.
            </span>
            <button className={styles.button}>Get Started</button>
          </div>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.content}>
          <div className={styles.text}>
            <span className={styles.title}> 🛠️ Server Update</span>
            <h3 className={styles.subtitle}>
              It's soon time for larger update to the server.
            </h3>
            <span className={styles.teaser}>
              Between 2-4am the 23. March 2024
            </span>
            <span className={styles.info}>
              This update will help you to improve our server and give a better
              speed of data.
            </span>
            <button className={styles.button}>Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
