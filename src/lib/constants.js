export const PROTECTED_ROUTES = ['/dashboard', '/profile', '/api/chat'];
export const PUBLIC_ROUTES = ['/login'];
export const MAX_CONTEXT_WINDOW = 40960;
export const MISTRAL_RATE_LIMIT = [
    {
        tier: 'free', limit: 1, timeframe: 10000, // le temps est en ms soit 1000 = 1s
    },
]


export const workoutProgramMockData = {
    "semaine 1": {
        "content": [
            {
                "jour": "Lundi",
                "titre": "Squats",
                "description": "Pieds écartés à la largeur des épaules, dos droit, descendre en pliant les genoux jusqu'à ce que les cuisses soient parallèles au sol, puis remonter.",
                "temps": 30
            },
            {
                "jour": "Mardi",
                "titre": "Fentes marchées",
                "description": "Faire un grand pas en avant avec une jambe, plier les deux genoux à 90 degrés, puis pousser avec la jambe avant pour revenir à la position initiale et répéter avec l'autre jambe.",
                "temps": 25
            },
            {
                "jour": "Mercredi",
                "titre": "Développé couché",
                "description": "Allongé sur un banc, tenir une barre ou des haltères à la largeur des épaules, descendre la barre jusqu'à la poitrine, puis pousser vers le haut.",
                "temps": 35
            },
            {
                "jour": "Jeudi",
                "titre": "Tractions",
                "description": "Suspendu à une barre, tirer le corps vers le haut jusqu'à ce que le menton soit au-dessus de la barre, puis redescendre lentement.",
                "temps": 20
            },
            {
                "jour": "Vendredi",
                "titre": "Hip Thrust",
                "description": "Allongé sur le dos, les genoux pliés et les pieds à plat sur le sol, pousser les hanches vers le haut jusqu'à ce que le corps forme une ligne droite des épaules aux genoux, puis redescendre.",
                "temps": 30
            },
            {
                "jour": "Samedi",
                "titre": "Rowing barre",
                "description": "Pieds écartés à la largeur des hanches, penché en avant avec un dos droit, tirer la barre vers la poitrine en serrant les omoplates, puis redescendre lentement.",
                "temps": 30
            },
            {
                "jour": "Dimanche",
                "titre": "Repos",
                "description": "Journée de repos pour permettre la récupération musculaire.",
                "temps": 0
            }
        ]
    },
    "semaine 2": {
        "content": [
            {
                "jour": "Lundi",
                "titre": "Squats sautés",
                "description": "Pieds écartés à la largeur des épaules, descendre en squat, puis sauter explosivement vers le haut, atterrir en position de squat et répéter.",
                "temps": 30
            },
            {
                "jour": "Mardi",
                "titre": "Fentes bulgares",
                "description": "Un pied sur un banc ou une chaise derrière vous, plier le genou avant à 90 degrés tout en gardant le dos droit, puis pousser avec le talon avant pour revenir à la position initiale.",
                "temps": 25
            },
            {
                "jour": "Mercredi",
                "titre": "Développé militaire",
                "description": "Debout, tenir une barre ou des haltères à la largeur des épaules, pousser la barre vers le haut jusqu'à ce que les bras soient tendus, puis redescendre lentement.",
                "temps": 35
            },
            {
                "jour": "Jeudi",
                "titre": "Tractions lestées",
                "description": "Suspendu à une barre avec un poids supplémentaire attaché à la ceinture, tirer le corps vers le haut jusqu'à ce que le menton soit au-dessus de la barre, puis redescendre lentement.",
                "temps": 20
            },
            {
                "jour": "Vendredi",
                "titre": "Hip Thrust lesté",
                "description": "Allongé sur le dos avec un poids sur les hanches, pousser les hanches vers le haut jusqu'à ce que le corps forme une ligne droite des épaules aux genoux, puis redescendre lentement.",
                "temps": 30
            },
            {
                "jour": "Samedi",
                "titre": "Rowing haltères",
                "description": "Pieds écartés à la largeur des hanches, penché en avant avec un dos droit, tirer les haltères vers la poitrine en serrant les omoplates, puis redescendre lentement.",
                "temps": 30
            },
            {
                "jour": "Dimanche",
                "titre": "Repos",
                "description": "Journée de repos pour permettre la récupération musculaire.",
                "temps": 0
            }
        ]
    },
    "semaine 3": {
        "content": [
            {
                "jour": "Lundi",
                "titre": "Squats sumo",
                "description": "Pieds écartés plus largement que la largeur des épaules, pointe des pieds vers l'extérieur, descendre en pliant les genoux jusqu'à ce que les cuisses soient parallèles au sol, puis remonter.",
                "temps": 30
            },
            {
                "jour": "Mardi",
                "titre": "Fentes latérales",
                "description": "Faire un grand pas sur le côté avec une jambe, plier le genou de la jambe qui avance à 90 degrés, puis pousser avec la jambe avant pour revenir à la position initiale et répéter avec l'autre jambe.",
                "temps": 25
            },
            {
                "jour": "Mercredi",
                "titre": "Développé incliné",
                "description": "Allongé sur un banc incliné, tenir une barre ou des haltères à la largeur des épaules, descendre la barre jusqu'à la poitrine, puis pousser vers le haut.",
                "temps": 35
            },
            {
                "jour": "Jeudi",
                "titre": "Tractions larges",
                "description": "Suspendu à une barre avec les mains plus larges que la largeur des épaules, tirer le corps vers le haut jusqu'à ce que le menton soit au-dessus de la barre, puis redescendre lentement.",
                "temps": 20
            },
            {
                "jour": "Vendredi",
                "titre": "Hip Thrust à une jambe",
                "description": "Allongé sur le dos, une jambe pliée et l'autre tendue, pousser les hanches vers le haut jusqu'à ce que le corps forme une ligne droite des épaules aux genoux, puis redescendre lentement.",
                "temps": 30
            },
            {
                "jour": "Samedi",
                "titre": "Rowing haltères à une main",
                "description": "Pieds écartés à la largeur des hanches, penché en avant avec un dos droit, tirer un haltère vers la poitrine en serrant les omoplates, puis redescendre lentement.",
                "temps": 30
            },
            {
                "jour": "Dimanche",
                "titre": "Repos",
                "description": "Journée de repos pour permettre la récupération musculaire.",
                "temps": 0
            }
        ]
    },
    "semaine 4": {
        "content": [
            {
                "jour": "Lundi",
                "titre": "Squats jump",
                "description": "Pieds écartés à la largeur des épaules, descendre en squat, puis sauter explosivement vers le haut, atterrir en position de squat et répéter.",
                "temps": 30
            },
            {
                "jour": "Mardi",
                "titre": "Fentes sautées",
                "description": "Faire un grand pas en avant avec une jambe, plier les deux genoux à 90 degrés, puis sauter explosivement vers le haut en changeant de jambe et atterrir en position de fente.",
                "temps": 25
            },
            {
                "jour": "Mercredi",
                "titre": "Développé décliné",
                "description": "Allongé sur un banc décliné, tenir une barre ou des haltères à la largeur des épaules, descendre la barre jusqu'à la poitrine, puis pousser vers le haut.",
                "temps": 35
            },
            {
                "jour": "Jeudi",
                "titre": "Tractions pronation",
                "description": "Suspendu à une barre avec les paumes vers l'avant, tirer le corps vers le haut jusqu'à ce que le menton soit au-dessus de la barre, puis redescendre lentement.",
                "temps": 20
            },
            {
                "jour": "Vendredi",
                "titre": "Hip Thrust avec élastique",
                "description": "Allongé sur le dos avec un élastique autour des hanches, pousser les hanches vers le haut jusqu'à ce que le corps forme une ligne droite des épaules aux genoux, puis redescendre lentement.",
                "temps": 30
            },
            {
                "jour": "Samedi",
                "titre": "Rowing haltères avec élastique",
                "description": "Pieds écartés à la largeur des hanches, penché en avant avec un dos droit, tirer les haltères vers la poitrine en serrant les omoplates, puis redescendre lentement.",
                "temps": 30
            },
            {
                "jour": "Dimanche",
                "titre": "Repos",
                "description": "Journée de repos pour permettre la récupération musculaire.",
                "temps": 0
            }
        ]
    }
};

