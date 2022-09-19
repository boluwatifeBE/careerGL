import clsx from "clsx";
import config from "config";

interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

interface HeaderProps extends BaseProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

export function Header(props: HeaderProps): React.ReactElement {
  const { title, subtitle, children } = props;

  return (
    <div className="space-y-2 px-4 pt-6 pb-8 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-800 dark:text-gray-100 sm:text-3xl  sm:leading-10 md:text-4xl md:leading-14">
        {title}
      </h1>
      {subtitle && (
        <p className="text-base leading-7 text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}

export function H1(props: BaseProps): React.ReactElement {
  const { className, children } = props;

  return (
    <h1
      className={clsx(
        "lg:text-5x mb-4 text-3xl font-bold dark:text-white",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function H2(props: BaseProps): React.ReactElement {
  const { className, children } = props;

  return (
    <h2
      className={clsx("mb-4 text-2xl font-semibold dark:text-white", className)}
    >
      {children}
    </h2>
  );
}

export function H3(props: BaseProps): React.ReactElement {
  const { className, children } = props;

  return (
    <h3
      className={clsx("mb-1 text-lg font-semibold dark:text-white", className)}
    >
      {children}
    </h3>
  );
}

interface GlobalHeaderProps {
  slug: string;
}

export const GlobalHeader = ({ slug }: GlobalHeaderProps) => {
  const heading = config.seocontent.find((heading) => heading.slug === slug);

  return <Header title={heading.title} subtitle={heading.description} />;
};
