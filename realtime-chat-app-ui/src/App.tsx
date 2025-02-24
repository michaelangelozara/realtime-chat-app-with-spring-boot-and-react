import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import NavigationBar from "./components/NavigationBar";
import Registration from "./pages/Registration";
import ChatRoom, { chatRoomLoader } from "./pages/ChatRoom";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Registration />} />
        <Route path="public-chat-room/:username" element={<ChatRoom />} loader={chatRoomLoader}/>
      </Route>
    )
  );

  return (<RouterProvider router={router} />);
}

export default App