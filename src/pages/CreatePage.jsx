import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../../exprotEnv";

export default function CreatePage() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || quantity === "" || price === "" || imageUrl === "") {
      alert("Please fill out all input completely");
    }
    try {
      setIsLoading(true);
      const response = await axios.post(VITE_BACKEND_URL, {
        name: name,
        quantity: quantity,
        price: price,
        image: imageUrl,
      });
      toast.success("seved successfully");
      setIsLoading(false);
      navigate("/");
    } catch (e) {
      toast.error(e.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
        <h2 className="font-semibold text-2xl mb-4 block text-center">
          Create a product
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <div className="">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                placeholder="Enter Name"
              />
            </div>
            <div className="">
              <label>Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                placeholder="Enter Quantity"
              />
            </div>
            <div className="">
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                placeholder="Enter Price"
              />
            </div>
            <div className="">
              <label>Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                placeholder="Enter Image URL"
              />
            </div>
            <div className="">
              {!isLoading && (
                <button className="block w-full mt-6 bg-blue-700 text-white px-4 py-2 hover:bg-blue-600 hover:cursor-pointer font-bold rounded-sm">
                  Save
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
