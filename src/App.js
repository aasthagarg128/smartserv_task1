// App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

 const fetchData = async () => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json');
    const data = response.data;

    console.log('Fetched data:', data);

    if (!Array.isArray(data)) {
      throw new Error('Invalid data format. Expected an array.');
    }

    const sortedProducts = data.sort((a, b) => b.Popularity - a.Popularity);
    setProducts(sortedProducts);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    setError(`Failed to fetch data. Error: ${error.message}`);
  }
};



  return (
    <div>
      <h1>Product List</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        products.map((product, index) => (
          <div key={index}>
            <h3>{product.Title}</h3>
            <p>Price: {product.Price}</p>
            <p>Popularity: {product.Popularity}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default App;
