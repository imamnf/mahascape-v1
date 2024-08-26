/**
 * A hook that provides two functions to format numbers.
 *
 * @return {object} An object containing two functions: formatNumber and shortNumber.
 *                  formatNumber formats a number with commas as thousand separators.
 *                  shortNumber formats a number with an appropriate suffix (M, JT, RB) based on its magnitude.
 */
export function useNumber(): {
  formatNumber: (number: number) => string;
  shortNumber: (number: number) => string;
} {
  function formatNumber(number: number): string {
    if (typeof number === 'string') {
      number = Number.parseInt(number, 10);
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  /**
   * Formats a number with an appropriate suffix (M, JT, RB) based on its magnitude.
   *
   * @param {number} number - The number to be formatted.
   * @return {string} The formatted number with a suffix.
   */
  function shortNumber(number: number): string {
    const suffixes = ['M', 'JT', 'RB', ''];
    const divisors = [1000000000, 1000000, 1000, 1];

    for (let i = 0; i < suffixes.length; i++) {
      const suffix = suffixes[i];
      const divisor = divisors[i];
      if (Math.abs(number) >= divisor) {
        return `${(number / divisor).toFixed(1).replace(/\.0$/, '')}${suffix}${
          number < 0 ? '-' : ''
        }`;
      }
    }

    return '0';
  }

  return { formatNumber, shortNumber };
}
