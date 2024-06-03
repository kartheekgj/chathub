import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const FriendContext = createContext();

export const useFriends = () => useContext(FriendContext);

export const FriendProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const fetchFriendList = useCallback(async () => {
    try{
      let data = await fetch("/api/friends");
      if (data.ok) {
        data = await data.json();
        if (data) {
          setFriends(data);
          if (data.length > 0 && !selectedFriend) {
            setSelectedFriend(data[0]);
          }
        }
      }else{
        setFriends([]);
        setSelectedFriend(null);
      }   
    }catch(err){
      console.log(err);
      return;
    }
  }, [selectedFriend]);
  useEffect(() => {
    fetchFriendList();
  }, [fetchFriendList]);

  return (
    <FriendContext.Provider
      value={{ friends, selectedFriend, setSelectedFriend }}
    >
      {children}
    </FriendContext.Provider>
  );
};
