"use client";

import styles from "@/app/ui/dashboard/users/add/add.module.css";
import { useCallback, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { addUser } from "@/app/lib/action.js";

const AddUserPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordMatchPositive, setPasswordMatchPositive] = useState(false);

  const onSubmit = useCallback(async (formData) => {
    try {
      await addUser(formData);
      console.log("User added successfully");
      // Redirect to /dashboard/users after successfully adding a user
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    const formData = new FormData(e.target);

    onSubmit(formData);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
    setPasswordMatchPositive(e.target.value === password);
  };

  const handleConfirmPasswordBlur = () => {
    setPasswordsMatch(confirmPassword === password);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.addItem}>
          <input type="text" name="username" placeholder="Username" required />
        </div>
        <div className={styles.addItem}>
          <input type="email" placeholder="Email" name="email" required />
        </div>
        <div className={styles.addItem}>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.addItem}>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={handleConfirmPasswordBlur}
            required
          />
          {!passwordsMatch && (
            <p className={styles.error}>
              <IoMdCloseCircle size={16} /> Passwords do not match
            </p>
          )}
          {passwordMatchPositive && (
            <p className={styles.positive}>
              <MdCheckCircle size={16} /> Passwords match
            </p>
          )}
        </div>
        <div className={styles.addItem}>
          <input type="file" placeholder="image" name="img" />
        </div>
        <div className={styles.addItem}>
          <input
            type="phone"
            placeholder="Phone Number"
            name="phone"
            required
          />
        </div>
        <div className={styles.addItem}>
          <select name="role" id="role" defaultValue={false}>
            <option value={false}>Select Role</option>
            <option value={true}>Admin</option>
            <option value={false}>Employer</option>
          </select>
        </div>
        <div className={styles.addItem}>
          <select name="status" id="status" defaultValue={true}>
            <option value={true}>Choose Status</option>
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>

        <button type="submit" className={styles.submit}>
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
