import { useGetUserChatQuery } from "../../redux/api/userApi";

const ChatList = () => {
  const {
    data: chats = [],
    error,
    isLoading,
    isFetching,
  } = useGetUserChatQuery();
  console.log(chats);
  return <div>chat</div>;
};

export default ChatList;
