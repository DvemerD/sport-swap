import { useState } from "react";
import { Avatar, List } from "antd";
import { useGetUserChatQuery, useGetUserQuery } from "../../redux/api/userApi";
import Chat from "../chat/Chat";

const ChatList = () => {
  const { data: chats = [], error, isLoading } = useGetUserChatQuery();
  const { data: userData, isFetching } = useGetUserQuery();
  const [openChat, setOpenChat] = useState(false);

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={chats}
        renderItem={(item) => (
          <div>
            {openChat && (
              <Chat
                openChat={openChat}
                setOpenChat={setOpenChat}
                seller={item.seller}
                product={item.product}
                client={item.client}
                uniqueID={item.unique_id}
              />
            )}
            <List.Item
              style={{ cursor: "pointer" }}
              onClick={() => setOpenChat(true)}
            >
                <List.Item.Meta
                  avatar={<Avatar src="#" />}
                  title={item.unique_id}
                  description={`Chat with user ID ${
                    userData.id === item.client ? item.seller : item.client
                  }`}
                  style={{ display: "flex", alignItems: "center" }}
                />
            </List.Item>
          </div>
        )}
      />
    </>
  );
};

export default ChatList;
