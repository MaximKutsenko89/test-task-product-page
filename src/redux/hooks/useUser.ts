import { useAppDispatch, useAppSelector } from "./index";
import { setIsAuthorized, userState } from "../userSlice";

export default function useUser() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userState);
  return {
    setIsUserAuthorized: (userToken: string, userName: string) => {
      dispatch(setIsAuthorized({ token: userToken, userName: userName }));
    },
    user,
  };
}
