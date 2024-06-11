import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {setInitialized, useLoginMutation} from '../redux';

export function useAuth() {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const init = async () => {
    dispatch(setInitialized(true));
  };

  const [loginMutation, {isLoading: isLoginLoading, error: loginError}] =
    useLoginMutation();

  const login = async (userName: string) => {
    try {
      const res = await loginMutation({userName}).unwrap();
      console.log(JSON.stringify(res, null, 2));
      if (res?.user) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('login error', error);
    }
  };

  return {
    init,
    isInitialized: authState.initialized,
    isLoggedIn: authState.isAuthenticated,
    userName: authState.userName,
    userId: authState.userId,
    isLoading: {
      isLoginLoading,
    },
    isError: {
      loginError,
    },
    login,
  };
}
