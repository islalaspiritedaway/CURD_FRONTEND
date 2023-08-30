import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../../exprotEnv";

export default function EditPage() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    image: "",
  });

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(VITE_BACKEND_URL + id);
      setProduct({
        name: response.data.name,
        quantity: response.data.quantity,
        price: response.data.price,
        image: response.data.image,
      });
    } catch (e) {
      setIsLoading(false);
      toast.error(e.message);
    }
    setIsLoading(false);
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(VITE_BACKEND_URL + id, product);
      toast.success("Updated a product successfully");
      navigate("/");
    } catch (e) {
      setIsLoading(false);
      toast.error(e.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 className="font-semibold text-2xl mb-4 block text-center">
        Update a product
      </h2>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <form onSubmit={updateProduct}>
            <div className="space-y-2">
              <div className="">
                <label>Name</label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Enter Name"
                />
              </div>
              <div className="">
                <label>Quantity</label>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    setProduct({ ...product, quantity: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Enter Quantity"
                />
              </div>
              <div className="">
                <label>Price</label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Enter Price"
                />
              </div>
              <div className="">
                <label>Image URL</label>
                <input
                  type="text"
                  value={product.image}
                  onChange={(e) =>
                    setProduct({ ...product, image: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Enter Image URL"
                />
              </div>
              <div className="">
                {!isLoading && (
                  <button className="block w-full mt-6 bg-blue-700 text-white px-4 py-2 hover:bg-blue-600 hover:cursor-pointer font-bold rounded-sm">
                    Update
                  </button>
                )}
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
