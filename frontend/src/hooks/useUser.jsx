import { createContext, useState, useContext, useEffect }  from "react";

const UserContext = createContext(null);
export const UserProvidor = ({children})=>{
    const [user,setUser] = useState(null);
    const LogOut = ()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("expireDate");
        setUser(null);
        window.location = "/login"
    }
    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        const expireDate = localStorage.getItem("expireDate");
        const currentDate =new Date().getTime();
        if(storedUser && expireDate){
            if(currentDate < parseInt(expireDate)){
                setUser(JSON.parse(storedUser));
            }
            else{
                LogOut();
            }
        }
      
    },[])
    const login = (userData,expireDate)=>{
        const expirationTime = new Date().getTime() + expireDate * 1000;
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("expireDate", expirationTime.toString());
        setUser(userData);
    }
    return (
        <>
        <UserContext.Provider value={{user, setUser,login,LogOut}}>{children}</UserContext.Provider>
        </>
    )
}
export const useUser = ()=>{
    return useContext(UserContext);
}
export default UserContext;