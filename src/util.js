const basicLetters = {
  'ą': 'a',
  'ć': 'c',
  'ę': 'e',
  'ł': 'l',
  'ń': 'n',
  'ó': 'o',
  'ś': 's',
  'ż': 'z',
  'ź': 'z'
}

const removeDiacritics = string =>
  string
    .split('')
    .map(letter => basicLetters[letter] || letter)
    .join('')

module.exports = {
  removeDiacritics
}
