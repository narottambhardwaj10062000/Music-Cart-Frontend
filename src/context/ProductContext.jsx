import { createContext, useState, useContext, useEffect } from "react";
import { getTotalQuantity } from "../apis/cart";

const productContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filterQuery, setFilterQuery] = useState({});
  const [searchVal, setSearchVal] = useState("");

  const handleGetTotalQuantity = async () => {
    const response = await getTotalQuantity();
    setCartCount(response?.data?.totalQuantity);
  };

  useEffect(() => {
    handleGetTotalQuantity();
  }, []);

  return (
    <productContext.Provider
      value={{
        cartCount,
        setCartCount,
        name,
        setName,
        isLoggedIn,
        setIsLoggedIn,
        filterQuery,
        setFilterQuery,
        searchVal,
        setSearchVal,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export const useProductContextProvider = () => {
  return useContext(productContext);
};
