/**
 * Return ellipsis of a given string
 * @param {string} text
 * @param {number} size
 */
const ellipsis = (text:string, size:number) => {
  return `${text.split(' ').slice(0, size).join(' ')}...`;
};

const idGenerator = (events: { id: string }[], length = 1) => {
  const arrayData: number[] = [];
  events.forEach((data) => {
    return arrayData.push(parseInt(data.id, 10));
  });

  const number = (Math.max(...arrayData) + 1).toString();
  return number.length < length ? `${'0'.repeat(length - number.length)}${number}` : number;
};

export { ellipsis, idGenerator };
