import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer";
import Loader from "@/components/Loader/Loader";
import { Suspense } from "react";
import WrapperUseQuery from "@/components/WrapperUseQuery/WrapperUseQuery";
import styles from './layout.module.css';

export default function UserLayout({ children }) {
  return (
  <main className={styles.main}>
    <Header />
    <WrapperUseQuery>
      <Suspense fallback={<Loader />}>
        {children}
      </Suspense>
    </WrapperUseQuery>
    <Footer />
  </main>
)}
