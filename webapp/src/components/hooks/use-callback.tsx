/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface Fn<Args extends any[], Val> {
  (...rest: Args): Val;
}

// useCallback without closure problems
// https://github.com/facebook/react/issues/16956
export default function useCallback<Args extends any[], Val>(fn: Fn<Args, Val>): Fn<Args, Val> {
  const ref = React.useRef<Fn<Args, Val>>(fn);
  ref.current = fn;
  return React.useMemo(() => (...args) => ref.current.apply(null, args), []);
}
