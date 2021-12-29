export function transformToArray(word: string): string[] {
  const wordLowerCase = word.toLowerCase();
  const array = [];
  for (let i = 1; i < wordLowerCase.length + 1; i++) {
    array.push(wordLowerCase.substring(0, i));
  }

  return array;
}