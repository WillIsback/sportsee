// Fonction pour wrapper les lignes longues selon RFC 5545
function wrapLine(line, maxLength = 75) {
  if (line.length <= maxLength) return line;
  
  const wrapped = [];
  let currentLine = line.substring(0, maxLength);
  let remaining = line.substring(maxLength);
  
  wrapped.push(currentLine);
  
  while (remaining.length > 0) {
    const nextChunk = remaining.substring(0, maxLength - 1); // -1 pour l'espace de continuation
    remaining = remaining.substring(maxLength - 1);
    wrapped.push(' ' + nextChunk); // Espace pour indiquer la continuation
  }
  
  return wrapped.join('\n');
}

// Génération du DTSTAMP (timestamp de création)
function generateDTSTAMP() {
  return new Date().toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z');
}

// Format de date simple pour les tâches quotidiennes
function toICSDateOnly(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

// Calcul de date pour les exercices
function calculateExerciseDate(startDate, dayName, weekIndex) {
  const dayMapping = {
    'Lundi': 1, 'Mardi': 2, 'Mercredi': 3, 'Jeudi': 4,
    'Vendredi': 5, 'Samedi': 6, 'Dimanche': 0
  };
  
  const start = new Date(startDate);
  const startDayOfWeek = start.getDay();
  const targetDay = dayMapping[dayName];
  
  let daysToAdd = (targetDay - startDayOfWeek + 7) % 7;
  if (daysToAdd === 0 && startDayOfWeek !== targetDay) {
    daysToAdd = 7;
  }
  
  daysToAdd += weekIndex * 7;
  
  const exerciseDate = new Date(start);
  exerciseDate.setDate(start.getDate() + daysToAdd);
  
  return exerciseDate;
}
function cleanUTF8(text) {
  return text
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[ñ]/g, 'n');
}
// Génération d'un UID unique
function generateUID(exercise, date, index) {
  const dateStr = toICSDateOnly(date);
  const cleanTitle = exercise.titre.toLowerCase().replace(/\s+/g, '-');
  return `${dateStr}-${cleanTitle}-${index}@sportsee.com`;
}

// Fonction pour ajouter une ligne avec wrapping automatique
function addICSLine(lines, property, value = '') {
  const line = value ? `${property}:${value}` : property;
  const wrapped = wrapLine(line);
  lines.push(wrapped);
}

// Fonction principale corrigée selon RFC 5545
export default function generateICSFromPlanning(planning, startDate) {
  const icsLines = [];
  const dtstamp = generateDTSTAMP();
  
  // Headers du calendrier
  addICSLine(icsLines, 'BEGIN', 'VCALENDAR');
  addICSLine(icsLines, 'VERSION', '2.0');
  addICSLine(icsLines, 'PRODID', '-//SportSee//Training Planner//EN');
  addICSLine(icsLines, 'CALSCALE', 'GREGORIAN');
  
  let exerciseIndex = 0;
  
  Object.entries(planning).forEach(([weekKey, weekData], weekIndex) => {
    weekData.content.forEach(exercise => {
      const exerciseDate = calculateExerciseDate(startDate, exercise.jour, weekIndex);
      const icsDate = toICSDateOnly(exerciseDate);
      
      // Gestion spéciale des jours de repos
      if (exercise.titre.toLowerCase().includes('repos')) {
        addICSLine(icsLines, 'BEGIN', 'VEVENT');
        addICSLine(icsLines, 'UID', generateUID(exercise, exerciseDate, exerciseIndex));
        addICSLine(icsLines, 'DTSTAMP', dtstamp);
        addICSLine(icsLines, 'SUMMARY', cleanUTF8(`${exercise.titre} - Récupération`));
        addICSLine(icsLines, 'DESCRIPTION', cleanUTF8(exercise.description));
        addICSLine(icsLines, 'DTSTART;VALUE=DATE', icsDate);
        addICSLine(icsLines, 'DTEND;VALUE=DATE', icsDate);
        addICSLine(icsLines, 'END', 'VEVENT');
      } else {
        addICSLine(icsLines, 'BEGIN', 'VEVENT');
        addICSLine(icsLines, 'UID', generateUID(exercise, exerciseDate, exerciseIndex));
        addICSLine(icsLines, 'DTSTAMP', dtstamp);
        addICSLine(icsLines, 'SUMMARY', cleanUTF8(`${exercise.titre} (${exercise.temps}min)`));
        addICSLine(icsLines, 'DESCRIPTION', cleanUTF8(exercise.description));
        addICSLine(icsLines, 'DTSTART;VALUE=DATE', icsDate);
        addICSLine(icsLines, 'DTEND;VALUE=DATE', icsDate);
        addICSLine(icsLines, 'END', 'VEVENT');
      }
      
      exerciseIndex++;
    });
  });
  
  addICSLine(icsLines, 'END', 'VCALENDAR');
  
  const icsContent = icsLines.join('\r\n');
//   console.log("ICS généré:", icsContent);
  
  return icsContent;
}