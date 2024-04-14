import { updateProduct } from "@/app/lib/action.js";
import { fetchProduct } from "@/app/lib/data.js";
import styles from "@/app/ui/dashboard/products/view/view.module.css";
import Image from "next/image";

const ViewProduct = async ({ params }) => {
  const { id } = params;
  const product = await fetchProduct(id);

  return (
    <div className={styles.container}>
      <form action={updateProduct} className={styles.form}>
        <div className={styles.infoContainer}>
          <div className={styles.imageContainer}>
            {product.img && product.img.buffer && (
              <Image
                src={`data:image/png;base64,${Buffer.from(
                  product.img.buffer
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
            <input type="file" name="image" />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>
              <h3>{product.name}</h3>
            </div>
            <div className={styles.item}>
              <span>Desc:</span>
              <span>{product.desc}</span>
            </div>
            <div className={styles.item}>
              <span>Quantity:</span>
              <span>{product.quantity}</span>
            </div>
            <div className={styles.item}>
              <span>Price:</span>
              <span>{product.price}</span>
            </div>
          </div>
        </div>
        <div className={styles.formContainer}>
          <label>Product Name</label>
          <input type="text" name="name" placeholder={product.name} />
          <label>Choose Category</label>
          <select name="cat" id="cat" defaultValue={product.cat}>
            <option value="phone">Phones</option>
            <option value="cover">Covers</option>
            <option value="chager">Chargers</option>
            <option value="holder">Holders</option>
          </select>
          <label>Quantity</label>
          <input type="number" placeholder={product.quantity} name="quantity" />
          <label>Price</label>
          <input type="number" placeholder={product.price} name="price" />
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            rows="16"
            placeholder={product.desc}
          ></textarea>
          <button type="submit" className={styles.submit}>
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewProduct;
