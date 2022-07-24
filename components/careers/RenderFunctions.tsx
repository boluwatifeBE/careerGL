import { FaCheckCircle, FaDotCircle } from 'react-icons/fa';

export const opinionHas = (values, string: string): boolean => {
  return Object.values(values).includes(string);
};

export const OpinionTick = opinionValue => {
  return (
    <>
      {opinionHas(opinionValue, 'personal') && (
        <FaCheckCircle color={'darkgoldenrod'} size={15} />
      )}
      {opinionHas(opinionValue, 'alternative') && (
        <FaCheckCircle color={'rebeccapurple'} size={15} />
      )}
      {opinionHas(opinionValue, 'order') && (
        <FaDotCircle color={'lightslategray'} size={15} />
      )}
      {opinionHas(opinionValue, 'never') && (
        <div className='absolute right-0 top-0 left-0 h-full w-full rounded-sm border-2 border-dashed  border-gray-400 bg-gray-400/30  mix-blend-darken' />
      )}
    </>
  );
};

export const queryPathElementsById = (pathId: string) => {
  const elements = document.querySelectorAll(
    `[data-group-id$="-${pathId}"]`,
  ) as NodeListOf<Element>;
  const matchingElements: HTMLElement[] = [];

  elements.forEach((element: HTMLElement) => {
    const foundPathId = element?.dataset?.PathId || '';
    const validGroupRegex = new RegExp(`^\\d+-${pathId}$`);

    if (validGroupRegex.test(foundPathId)) {
      matchingElements.push(element);
    }
  });

  return matchingElements;
};

export const convertNameToUrl = (name: string) => {
  return (name || '').replaceAll(' ', '-').toLowerCase();
};

export const removeFirstIndexFromArray = (arrayValue: [] | string[]) => {
  return arrayValue.splice(1);
};

export const formatSlugTolink = (
  path: string,
  parentId?: string,
  grandParentId?: string,
) => {
  const splitPath = path.split('/');
  const lastIndex = splitPath.pop();
  const splitLastIndex = lastIndex.split('-');
  // const removeFirstIndexFromsplittedLastIndex = removeFirstIndexFromArray(splitLastIndex);
  const convertToString = splitLastIndex.join('-');
  const replaceExtention = convertToString.replace(/\.(mdx|md|json)/, '');

  let url = '';

  if (grandParentId !== undefined && parentId === undefined) {
    url = `${grandParentId}/${replaceExtention}`;
  } else if (grandParentId === undefined && parentId !== undefined) {
    url = `${parentId}/${replaceExtention}`;
  } else if (grandParentId !== undefined && parentId !== undefined) {
    const urlString = `${grandParentId}/${parentId}/${replaceExtention}`;
    const splitUrl = urlString.split('/');

    let removeFirstIndex;

    if (!splitUrl.includes('')) {
      url = splitUrl.join('/');
    } else if (splitUrl.includes('')) {
      removeFirstIndex = removeFirstIndexFromArray(splitUrl);
      url = removeFirstIndex.join('/');
    }
  } else {
    url = replaceExtention;
  }

  return url;
};

export const setOrUdateLocalStorage = (key?: string, value?: string) => {
  if (localStorage.getItem(key) !== null) {
    localStorage.removeItem(key);
  }
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key?: string) => {
  if (typeof window === 'object') {
    return localStorage.getItem(key);
  }
};

export const removeNull = (array): string[] => {
  return [array].filter(item => item !== null);
};

export const getUniqueStringValueOfArray = array => {
  const uniqueChars = [];
  array.forEach(element => {
    if (!uniqueChars.includes(element)) {
      uniqueChars.push(element.replaceAll(' ', '-').toLowerCase());
    }
  });

  return uniqueChars;
};

export const recursiveSearch = (obj, searchKey: string, results = []) => {
  const resultArray = results;
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (key === searchKey && typeof value !== 'object') {
      resultArray.push(value);
    } else if (typeof value === 'object') {
      recursiveSearch(value, searchKey, resultArray);
    }
  });

  return resultArray;
};

function createPortalRoot() {
  const drawerRoot = document.createElement('div');
  drawerRoot.setAttribute('id', 'drawer-root');

  return drawerRoot;
}

export function getBodyRef() {
  if (typeof window === 'object') {
    return document.querySelector('body');
  }
}

export function getPortalRootRef() {
  if (typeof window === 'object') {
    return document.getElementById('drawer-root') || createPortalRoot();
  }
}
