import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [item, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleFetch = async (abortController = null) => {
    setIsLoading(true);
    setError(false);
    try {
      const data = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${page}0&limit=12`,
        {
          signal: abortController?.signal,
        }
      );
      const response = await data.json();
      console.log(response);
      setItems((prevItems) => [...prevItems, ...response]);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    handleFetch();
  };

  useEffect(() => {
    // const abortController = new AbortController();
    handleFetch();
    // return () => {
    //   abortController.abort();
    // };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  useEffect(() => {}, [isLoading]);
  return (
    <div className="App">
      <table>
        <tr>
          <th>Sr No</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
        </tr>
        {item.map((val, index) => {
          return (
            <tr key={val.title}>
              <td>{index + 1}</td>
              <td>{val.title}</td>
              <td>{val.description}</td>
              <td>{val.price}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
