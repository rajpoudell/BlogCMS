import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  password:string;
  name: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;

}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: !!localStorage.getItem('token'),
  token : localStorage.getItem('token'),
 login: async (email: string, password: string) => {
    const res = await fetch('https://6826c619397e48c9131736e8.mockapi.io/api/v1/user');
    const users:User[]  = await res.json();
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if(foundUser){
        const fakeToken = `mock-token-${foundUser.id}`;
        localStorage.setItem('token', fakeToken);
        localStorage.setItem('name', foundUser.name);
        set({isLoggedIn:true,token:fakeToken,user:foundUser});
    }else{
        throw new Error("Invalid User or Password");
    }
  },
  logout: async()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    set({isLoggedIn:false,token:null,user:null});
  }, checkAuth: () => {
    const token = localStorage.getItem('token');
    set({
      isLoggedIn: !!token,
      token: token || null,
    });
  },

}));

export default useAuthStore;
