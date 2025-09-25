'use client';
import { ChevronLeft, ChevronRight } from '@/lib/icon';
import { convertDateToString } from '@/lib/utils';
import styles from './ChartsHeader.module.css';

/**
 * Brief: En-tête de navigation temporelle pour les graphiques de statistiques
 * @param {string} startWeek - Date de début de période au format ISO
 * @param {string} endWeek - Date de fin de période au format ISO
 * @param {Function} handleClickOnSlideLeft - Fonction pour naviguer vers la période précédente
 * @param {Function} handleClickOnSlideRight - Fonction pour naviguer vers la période suivante
 * @returns {JSX.Element} En-tête avec titre, navigation temporelle et description de période
 */
export default function ChartsHeader({ startWeek, endWeek, handleClickOnSlideLeft, handleClickOnSlideRight, title, sousTitre }) {
    return (
        <section className={styles.header}>
            <div>
                <h3>{title}</h3>
                <nav>
                    <button type='button' onClick={handleClickOnSlideLeft}><ChevronLeft /></button>
                    <label>{convertDateToString(startWeek, true)} - {convertDateToString(endWeek, true)}</label>
                    <button type='button' onClick={handleClickOnSlideRight}><ChevronRight /></button>
                </nav>
            </div> 
            <p>{sousTitre}</p>
        </section>
    );
}