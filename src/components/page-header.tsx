const PageHeader = ({ backgroundImage, children }: { backgroundImage: string; children?: React.ReactNode }) => {
  return (
    <div className='page-header text-center' style={{ backgroundImage }}>
      <div className='container'>
        <h1 className='page-title'>{children}</h1>
      </div>
    </div>
  );
};

export { PageHeader };
