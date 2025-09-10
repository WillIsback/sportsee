'use client';
import { ChevronLeft, ChevronRight } from '@/lib/icon';
import { useUserProfile } from '@hooks/useUserData';
import { getDeltaWeek, decrementWeek, incrementWeek, convertDateToISO, convertDateToString } from '@/lib/utils';

import Loader from '@/components/Loader/Loader';

import styles from './ChartsHeader.module.css';

export default function ChartsHeader({ startWeek, setStartWeek, endWeek, setEndWeek, error, loading}) {
    const userData = useUserProfile();
    if(userData?.loading) return <Loader />;
    if(userData?.error) return <div><p> Error : {userData?.error?.user || userData?.error?.dev} </p></div>;

    const { createdAt, ...restOfProfile } = userData?.userProfileData;

    const handleClickOnSlideLeft = async () => {
        (startWeek > createdAt 
            ? setStartWeek(decrementWeek(startWeek))
            : setStartWeek(decrementWeek(endWeek))
        );
    }

    const handleClickOnSlideRight = async () => {
        const upperLimit = Date.now();
        (endWeek < (convertDateToISO(upperLimit)) 
            ? setEndWeek(incrementWeek(endWeek))
            : setEndWeek(incrementWeek(endWeek))
        );
    }

    if(loading) return <Loader />;
    if(error) return <div><p> Error : {typeof error === 'string' ? error : error?.user || error?.dev} </p></div>;

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