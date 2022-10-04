const Breadcrumb = () => {
  return (
    <nav aria-label='breadcrumb' className='breadcrumb-nav'>
      <div className='container'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <a href='index.html'>Home</a>
          </li>
          <li className='breadcrumb-item'>
            <a href='#'>Shop</a>
          </li>
          <li className='breadcrumb-item'>
            <a href='#'>No Sidebar</a>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Boxed
          </li>
        </ol>
      </div>
    </nav>
  );
};

export { Breadcrumb };
