import { useCallback, useState } from 'react';

const QUIT_MESSAGE =
  '⚠️ Bạn chưa thuộc hết từ vựng! Bạn có chắc chắn muốn bỏ dở trận đấu và thoát?';

// Vocab Battle sets this lock while the player has words left to memorise; every
// navigation away then needs confirmation.
export function useQuitGuard() {
  const [isQuitLocked, setIsQuitLocked] = useState(false);

  const confirmQuit = useCallback(() => {
    if (!isQuitLocked) return true;
    if (window.confirm(QUIT_MESSAGE)) {
      setIsQuitLocked(false);
      return true;
    }
    return false;
  }, [isQuitLocked]);

  return { isQuitLocked, setIsQuitLocked, confirmQuit };
}
