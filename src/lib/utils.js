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



export const decrementWeek = (date, weeks=1) => {
    const dateA = new Date(date);
    const dateB = new Date(dateA);
    return convertDateToISO(dateB.setDate(dateA.getDate() - (7*weeks)));
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


export const convertISODateToSlash = (date) => {
    return date.replace(regexDateISO,"$5/$3/$1")

}


export const getDeltaDays = (startDate, endDate) => {
    const start = new Date(startDate).getTime();
    const stop = new Date(endDate).getTime();
    return Math.round((stop - start) / 86_400_000);
}


export const convertMMTimeToHHMM = (time) => {
    const hourQ = Math.floor(time / 60);
    const minuteR = time % 60;
    return {hourQ, minuteR};
}

export const convertCMHeightToMcM = (height) => {
    const qMeter = Math.floor(height / 100);
    const rCm = height % 100;
    return `${qMeter}m${rCm}`
}


export const translateGender = (gender) => {
    switch(gender){
        case 'female': {
            return 'Femme';
        }
        case 'male': {
            return 'Homme';
        }
        default : {
            return gender;
        }
    };
}


export const getUpdateTimestamp = () => {
    return Date.now();
}


export function formatWeeklyData(session) {
    // Vérifications de sécurité
    if (!session) {
        console.warn("formatWeeklyData: session is null/undefined");
        return null;
    }
    
    if (session.isPending) {
        console.log("formatWeeklyData: session is still pending");
        return null;
    }
    
    if (!session.data || !Array.isArray(session.data) || session.data.length === 0) {
        console.error("formatWeeklyData: no data available");
        return "Aucune donnée de course disponible.";
    }

    const result = session.data.map((item, index) => {
        // Vérification que les données essentielles existent
        const date = item.date || 'Date inconnue';
        const calories = item.caloriesBurned || 'N/A';
        const distance = item.distance || 'N/A';
        const duration = item.duration || 'N/A';
        const heartRateMin = item.heartRate?.min || 'N/A';
        const heartRateAvg = item.heartRate?.average || 'N/A';
        const heartRateMax = item.heartRate?.max || 'N/A';

        return `Course ${index + 1} :
- Date : ${date}
- Calories brûlées : ${calories}
- Distance : ${distance}
- Durée : ${duration}
- FC min/moy/max : ${heartRateMin}/${heartRateAvg}/${heartRateMax} bpm

`;
    }).join("");

    // console.log("formatWeeklyData :", result);
    return result;
}

export function formatUserDataProfile (dataProfile) {
    // Vérification que les données essentielles existent
    const age = dataProfile.age|| 'N/A';
    const gender = dataProfile.gender|| 'N/A';
    const height = dataProfile.height || 'N/A';
    const weight = dataProfile.weight || 'N/A';
    const lastName = dataProfile.lastName || 'N/A';
    const firstName = dataProfile.firstName|| 'N/A';
    return `Profil de l'utilisateur ${firstName} ${lastName} :
    - Âge : ${age}
    - Genre : ${gender}
    - Taille : ${height}
    - Poids : ${weight}
    `;
}
