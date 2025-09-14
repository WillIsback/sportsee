'use client';
import { ChevronLeft, ChevronRight } from '@/lib/icon';
import { getDeltaWeek, convertDateToString } from '@/lib/utils';
import styles from './ChartsHeader.module.css';

export default function ChartsHeader({ startWeek, endWeek, handleClickOnSlideLeft, handleClickOnSlideRight }) {
    return (
        <section className={styles.header}>
            <div>
                <h3>18km en moyenne</h3>
                <nav>
                    <button type='button' onClick={handleClickOnSlideLeft}><ChevronLeft /></button>
                    <label>{convertDateToString(startWeek, true)} - {convertDateToString(endWeek, true)}</label>
                    <button type='button' onClick={handleClickOnSlideRight}><ChevronRight /></button>
                </nav>
            </div> 
            <p>Total kilomètres {getDeltaWeek(startWeek,endWeek)+1} dernières semaines.</p>
        </section>
    );
}