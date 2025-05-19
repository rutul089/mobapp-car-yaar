/* eslint-disable react-hooks/rules-of-hooks */
import {useRef} from 'react';

export const useInputRefs = (fieldKeys = []) => {
  const scrollRef = useRef(null);
  const refs = fieldKeys.reduce((acc, key) => {
    acc[key] = useRef(null);
    return acc;
  }, {});
  refs.scrollRef = scrollRef;

  const focusNext = key => {
    refs[key]?.current?.focus?.();
  };

  const scrollToInput = key => {
    if (scrollRef.current && refs[key]?.current) {
      scrollRef.current.scrollToFocusedInput(refs[key].current, 300);
    }
  };

  return {refs, focusNext, scrollToInput};
};
