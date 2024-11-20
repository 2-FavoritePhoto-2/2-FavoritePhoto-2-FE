import { createContext, useContext, useState } from 'react';

// UserContext 생성
const UserContext = createContext();

// UserProvider 컴포넌트
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 초기 상태는 null

  const login = (userData) => {
    setUser(userData); // 로그인 시 유저 정보 설정
  };

  const logout = () => {
    setUser(null); // 로그아웃 시 유저 정보 초기화
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// UserContext를 사용하는 커스텀 훅
export const useUser = () => {
  return useContext(UserContext);
};
