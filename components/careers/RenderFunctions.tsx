export const opinionHas = (values, string: string): boolean => {
  return Object.values(values).includes(string);
};

export const OpinionTick = opinionValue => {
  return (
    <>
      {opinionHas(opinionValue, 'personal') && (
        <div className='z-10 h-4 w-4 rounded-full  bg-green-600  '></div>
      )}
      {opinionHas(opinionValue, 'alternative') && (
        <div className='z-10 h-4 w-4 rounded-full bg-yellow-600'></div>
      )}
      {opinionHas(opinionValue, 'order') && (
        <div className='z-10 h-4 w-4 rounded-full bg-red-600'></div>
      )}
      {opinionHas(opinionValue, 'never') && (
        <div className='z-10 h-4 w-4 rounded-full bg-gray-600'></div>
      )}
    </>
  );
};

export const queryPathElementsById = (pathId: string) => {
  const elements = document.querySelectorAll(
    `[data-group-id$="-${pathId}"]`,
  ) as any;
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

export const setOrUdateLocalStorage = (key?: string, value?: any) => {
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

export const removeNull = (array): any[] => {
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
