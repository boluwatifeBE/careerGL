import Link from '@/components/Link';
import { ChangeEventHandler } from 'react';
import { BsFilterLeft as FilterIcon } from 'react-icons/bs';

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  filterIcon: boolean;
}

function SearchInput({ onChange, placeholder, filterIcon = false }: Props) {
  return (
    <div className='relative max-w-lg'>
      <input
        aria-label='Search articles'
        type='text'
        onChange={onChange}
        placeholder={placeholder}
        className='block w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-useGL-acent focus:ring-useGL-acent dark:border-slate-900 dark:bg-slate-800 dark:text-slate-100'
      />
      <svg
        className='absolute right-3 top-3 h-5 w-5 text-slate-400 dark:text-slate-300'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        />
      </svg>
      {filterIcon ? (
        <Link
          href='/tags'
          className='absolute right-10 top-2 text-slate-400 dark:text-slate-300'
        >
          <FilterIcon size={30} />
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SearchInput;
