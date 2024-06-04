import { Tabs } from "antd";
import FormAnnouncement from "../../components/formAnnouncement/FormAnnouncement";
import HistoryAnnouncement from "../../components/historyAnnouncement/HistoryAnnouncement";
import ChatList from "../../components/chatList/ChatList";
const { TabPane } = Tabs;

const ProfilePage = () => {
  return (
    <>
      <div style={{ padding: "30px" }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Create announcement" key="1">
            {<FormAnnouncement />}
          </TabPane>
          <TabPane tab="History announcement" key="2">
            {<HistoryAnnouncement />}
          </TabPane>
          <TabPane tab="Chats" key="3">
            {<ChatList />}
          </TabPane>
          <TabPane tab="Tab 4" key="4">
            Content of Tab 4
          </TabPane>
          <TabPane tab="Tab 5" key="5">
            Content of Tab 5
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default ProfilePage;
