import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer";
import Loader from "@/components/Loader/Loader";
import { Suspense } from "react";
import WrapperUseQuery from "@/components/WrapperUseQuery/WrapperUseQuery";
import styles from './layout.module.css';

/**
 * Brief: Layout pour les pages utilisateur avec header, footer et gestion des requêtes
 * @param {Object} props - Propriétés du composant
 * @param {React.ReactNode} props.children - Pages enfants à afficher dans le layout utilisateur
 * @returns {JSX.Element} Structure complète avec header, contenu et footer pour les pages authentifiées
 */
export default function UserLayout({ children}) {
  return (
  <main className={styles.main}>
    <WrapperUseQuery>
      <Suspense fallback={<Loader />}>
        <Header />
          {children}
      </Suspense>
    </WrapperUseQuery>
    <Footer />
  </main>
)}
