import { addProduct } from "@/app/lib/action";
import styles from "@/app/ui/dashboard/products/add/add.module.css";

const AddProduct = () => {
  return (
    <div className={styles.container}>
      <form action={addProduct} className={styles.form}>
        <input type="text" name="name" placeholder="Product Name" required />
        <select name="cat" id="cat" required>
          <option value="general">Choose Category</option>
          <option value="Phones">Phones</option>
          <option value="Covers">Covers</option>
          <option value="Chargers">Chargers</option>
          <option value="Holders">Holders</option>
        </select>
        <input type="number" placeholder="Price" name="price" required />
        <input type="number" placeholder="Quantity" name="quantity" required />
        <input type="file" placeholder="image" name="img" required />
        <textarea
          name="desc"
          id="desc"
          rows="16"
          placeholder="Description"
        ></textarea>

        <button type="submit" className={styles.submit}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
