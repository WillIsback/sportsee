/*
    auteur: William Derue
    Projet P6 - SportSee
    file : src/lib/utils.js
    objectives: Boite à outils de fonction help
    lastUpdate: 09/09/2025
*/

export const convertDateToString = (date, short = false) => {
    const fdate = new Date(date);
    if(short)return fdate.toLocaleDateString('fr-FR', {day: '2-digit',month: 'short',});
    return fdate.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
};



export const convertDateToISO = (date) => {
    const fdate = new Date(date);
    return fdate.toISOString().split('T').shift();
};

export const getDeltaWeek = (dateStart, dateSend) => {
    const d1 = new Date(dateStart);
    const d2 = new Date(dateSend);
    const diffInMs = Math.abs(d2 - d1);
    const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
    return diffInWeeks;
};



export const decrementWeek = (date) => {
    const dateA = new Date(date);
    const dateB = new Date(dateA);
    return convertDateToISO(dateB.setDate(dateA.getDate() - 7));
};

export const incrementWeek = (date) => {
    const dateA = new Date(date);
    const dateB = new Date(dateA);
    return convertDateToISO(dateB.setDate(dateA.getDate() + 7));
};

