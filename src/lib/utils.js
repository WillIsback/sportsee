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


export const RoundedBar = (props) => {
    const { fill, x, y, width, height } = props;
    const radius = Math.min(width / 2, 7); // Limite le rayon à 7px max
    
    return (
        <rect 
            x={x} 
            y={y} 
            width={width} 
            height={height} 
            rx={radius} 
            ry={radius} 
            fill={fill} 
        />
    );
};

export const getSvgLegend = (index) => {
    switch(index){
        case 0: {
            return <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="4" fill="#FCC1B6"/>
                </svg>
                </>
            }
        case 1: {
            return <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="4" fill="#F4320B"/>
                </svg>
                </>
            }
        case 2: {
            return <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="3" y="7" width="11" height="1" fill="#B6BDFC"/>
                        <circle cx="8.5" cy="7.5" r="3" fill="#0B23F4" stroke="white"/>
                    </svg>
                </> 
            }
        default: {
            return <></>
        }
    }
};

export const regexDateISO = /(\w+)(\W)(\w+)(\W)(\w+)/;
export const convertDateToDDMM = (date) => {
    const fdate = new Date(date);
    return fdate.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
    });
};