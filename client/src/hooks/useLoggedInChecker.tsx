import { useAtomValue, useSetAtom } from "jotai";
import { showUserOnlyModalAtom, userInfoAtom } from "../globals/states";

export function useLoggedInChecker(): boolean {
  const userInfo = useAtomValue(userInfoAtom);
  const setShowUserOnlyModal = useSetAtom(showUserOnlyModalAtom);

  if (userInfo.loading) {
    return false;
  } else if (userInfo.error) {
    return false;
  } else if (!userInfo.username) {
    return false;
  } else {
    return true;
  }
}