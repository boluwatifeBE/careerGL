interface PanelProps {
  title?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function BlogGridWrapper(props: PanelProps): React.ReactElement {
  const { title, children } = props;

  return (
    <>
      {title && (
        <h3 className='ml-3 py-16 text-3xl font-bold  md:text-4xl  lg:text-5xl'>
          {title}
        </h3>
      )}
      <div className='grid grid-cols-1  justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:gap-10'>
        {children}
      </div>
    </>
  );
}
