import writtenNumber from 'written-number';

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export const formatAmountInWords = (amount) => {
  const dinars = Math.floor(amount);
  const millimes = Math.round((amount - dinars) * 1000);
  
  let result = writtenNumber(dinars, { lang: 'fr' }) + ' dinar' + (dinars !== 1 ? 's' : '');
  
  if (millimes > 0) {
    result += ` et ${writtenNumber(millimes)} millime${millimes !== 1 ? 's' : ''}`;
  }
  return result.charAt(0).toUpperCase() + result.slice(1);
};

