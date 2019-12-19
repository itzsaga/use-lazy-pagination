import { useState } from "react";

interface QueryLazyOptions<T> {
  variables?: T;
  context?: Record<string, any>;
}

function useLazyPagination(
  query: (options?: QueryLazyOptions<Record<string, any>>) => void
) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cursorStack, setCursorStack] = useState<string[]>([]);

  const goBack = () => {
    if (currentPage > 1) {
      let existingStack = cursorStack;
      existingStack.pop();
      setCursorStack(existingStack);
      let lastEndCursor =
        existingStack.length > 0
          ? existingStack[existingStack.length - 1]
          : undefined;
      query({ variables: { after: lastEndCursor } });
      setCurrentPage(currentPage - 1);
    }
  };

  const goForward = (endCursor?: string | null) => {
    query({ variables: { after: endCursor } });
    let existingStack = cursorStack;
    endCursor && existingStack.push(endCursor);
    setCursorStack(existingStack);
    setCurrentPage(currentPage + 1);
  };

  const resetPagination = () => {
    setCursorStack([]);
    setCurrentPage(1);
  };

  return { currentPage, goBack, goForward, resetPagination };
}

export default useLazyPagination;
