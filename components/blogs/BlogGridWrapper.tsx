interface PanelProps {
  title?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function BlogGridWrapper(props: PanelProps): React.ReactElement {
  const { title, children } = props;

  return (
    <>
      {title && <h3 className="ml-3 py-16 text-5xl font-bold">{title}</h3>}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {children}
      </div>
    </>
  );
}
