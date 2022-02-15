const { format_date } = require('../utils/helpers');

test('format_date() returns a date string', () => {
    const date = new Date('2022-02-12 13:25:30');

    expect(format_date(date)).toBe('February 12th 2022');
})