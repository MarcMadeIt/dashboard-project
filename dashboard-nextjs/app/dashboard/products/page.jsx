import Image from "next/image";
import Link from "next/link";
import styles from "@/app/ui/dashboard/products/products.module.css";
import Search from "@/app/ui/dashboard/search/search.jsx";
import Pagination from "@/app/ui/dashboard/pagination/pagination.jsx";
import { fetchProducts } from "@/app/lib/data";
import { deleteProduct } from "@/app/lib/action";

const ProductsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, products } = await fetchProducts(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product..." />
        <Link href="/dashboard/products/add">
          <button className={styles.add}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Product name</td>
            <td>Category</td>
            <td className={styles.desc}>Desc</td>
            <td>Price</td>
            <td className={styles.date}>Created At</td>
            <td>Quantity</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={`data:image/png;base64,${Buffer.from(
                      product.img.buffer
                    ).toString("base64")}`}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  <span> {product.name}</span>
                </div>
              </td>
              <td>
                <span>{product.cat}</span>
              </td>
              <td className={styles.desc}>
                <span>{product.desc}</span>
              </td>
              <td>
                <span>${product.price}</span>
              </td>
              <td className={styles.date}>
                <span>{product.createdAt?.toString().slice(4, 16)}</span>
              </td>
              <td>
                <span>{product.quantity}</span>
              </td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/products/${product._id.toString()}`}>
                    <button className={`${styles.button} ${styles.edit}`}>
                      Edit
                    </button>
                  </Link>
                  <form action={deleteProduct}>
                    <input
                      type="hidden"
                      name="id"
                      value={product._id.toString()}
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

export default ProductsPage;
