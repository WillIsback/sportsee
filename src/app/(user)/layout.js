import Header from "@/components/Header/Header"
import { UserDataProvider } from "@context/UserContext";

export default function UserLayout({ children }) {
  return (
  <main>
    <UserDataProvider>
      <Header />
      {children}
    </UserDataProvider>
  </main>
)}
