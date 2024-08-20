export const ValidationInputs = {
    required: {
        message: 'Поле не может быть пустым',
    },
    onlyWords: {
        pattern: /^[a-zA-Zа-яА-Я]+$/g,
        message: 'Допустимо вводить только буквы',
    },
    wordsWithNumbers: {
        patter: /^[a-zA-Zа-яА-Я0-9]+$/g,
        message: 'Допустимо вводить только буквы и цифры',
    },
} as const
