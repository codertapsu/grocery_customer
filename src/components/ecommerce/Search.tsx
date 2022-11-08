import { useState } from 'react';

import { useRouter } from 'next/router';

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    router.push({
      pathname: '/products',
      query: {
        search: searchTerm,
      },
    });
    setSearchTerm('');
  };

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };
  return (
    <>
      <form>
        {/* <select className='select-active'>
          <option>All Categories</option>
          <option>Women&lsquo;s</option>
          <option>Men&lsquo;s</option>
          <option>Cellphones</option>
          <option>Computer</option>
          <option>Electronics</option>
          <option> Accessories</option>
          <option>Home & Garden</option>
          <option>Luggage</option>
          <option>Shoes</option>
          <option>Mother & Kids</option>
        </select> */}
        <input
          value={searchTerm}
          onKeyDown={handleInput}
          onChange={(e) => setSearchTerm(e.target.value)}
          type='text'
          placeholder='Search for items...'
        />
      </form>
    </>
  );
};
