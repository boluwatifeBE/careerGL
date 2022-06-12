import { useMemo } from 'react';
import { Tuple } from 'types';

export function useRandomColorPair(): Tuple<string> {
  const colors: Tuple<string>[] = [
    ['#e5db01', '#e5db01'],
    ['#cbc201', '#cbc201'],
    ['#b2aa01', '#b2aa01'],
    ['#989201', '#989201'],
  ];

  const random = Math.round(Math.random() * (colors.length - 1));

  return useMemo(() => colors[random], []);
}
