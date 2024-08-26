/* eslint-disable unused-imports/no-unused-vars */
import type { SignInPayload, SignInState, SignOutState } from '@type/auth.types';

export const useAuthStore = defineStore('auth', () => {
  /**
   *  Sign In
   */

  // State
  const signInState = reactive<SignInState>({
    error: false,
    loading: false,
    show: false,
    success: false,
    message: {
      error: '',
      success: ''
    }
  });

  // Method
  const signIn = async (payload: SignInPayload) => {
    signInState.error = false;
    signInState.loading = true;
    signInState.show = false;
    signInState.success = false;

    const signInUser = {
      email: 'putra_mahascape@gmail.com',
      password: 'putra_mahameru'
    };

    await new Promise((resolve) => setTimeout(resolve, 5000));

    try {
      if (payload.email !== signInUser.email || payload.password !== signInUser.password) {
        signInState.error = true;
        signInState.message.error = 'Email atau password yang anda masukkan salah!';
      } else {
        signInState.success = true;
        signInState.message.success =
          'Silakan tunggu beberapa saat untuk pindah ke halaman dashboard.';

        useLocalStorage(
          'user',
          JSON.stringify({
            name: 'Admin',
            role: 'Administrator'
          })
        );
        useLocalStorage('isLoggedIn', true);
      }
    } catch (error) {
      signInState.error = true;
      signInState.message.error = 'Ada Kesalahan pada sistem!';
    } finally {
      signInState.loading = false;
      signInState.show = true;
    }
  };

  /**
   *  Sign Out
   */

  // State
  const signOutState = reactive<SignOutState>({
    error: false,
    loading: false,
    show: false,
    success: false,
    message: {
      error: '',
      success: ''
    }
  });

  // Method
  const signOut = async () => {
    signOutState.error = false;
    signOutState.loading = true;
    signOutState.show = false;
    signOutState.success = false;

    await new Promise((resolve) => setTimeout(resolve, 5000));

    try {
      signOutState.success = true;
      signOutState.message.success = 'Terima kasih, anda telah keluar.';

      localStorage.clear();
    } catch (error) {
      signOutState.error = true;
      signOutState.message.error = 'Terjadi kesalahan saat keluar.';
    } finally {
      signOutState.loading = false;
      signOutState.show = true;
    }
  };

  return {
    signInState,
    signIn,
    signOutState,
    signOut
  };
});
