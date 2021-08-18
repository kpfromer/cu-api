import * as moment from 'moment';

export function calendar() {
  const startOfMonth = moment().month(1).startOf('month');

  const day = startOfMonth.clone();
  console.log(day.day('Monday'));
  //   day.weekday(-day.day());

  const days = [];
  const month = startOfMonth.format('MMM');

  const times = [];
  // account for day in prev month
  for (let i = 0; i < startOfMonth.daysInMonth(); i++) {
    if (i < 7) {
      days.push(day.format('dd'));
    }
    if (day.format('MMM') !== month) {
      times.push('  ');
    } else {
      times.push(`${i % 7 == 0 ? '\n    ' : ''}${day.format('DD')}`);
    }

    day.add(1, 'day');
  }

  console.log(`    ${days.join(' ')}`);
  console.log(`${month} ${times.join(' ')}`);
}

function dayBox(
  title: string,
  body: string,
  { padding = 2 }: { padding?: number } = {}
) {
  const lines = body.split('\n');
  const maxLength = [title, ...lines].reduce((prevMax, line) => {
    const length = line.length;
    return length > prevMax ? length : prevMax;
  }, 0);

  const total = 2 + 2 * padding + maxLength;
  const separator = ''.padStart(total, '-');

  console.log(separator);
  lines.forEach((line) => {
    console.log(
      `|${''.padStart(padding, ' ')}${line}${''.padEnd(
        maxLength - line.length + padding,
        ' '
      )}|`
    );
  });
  console.log(separator);
}

dayBox('Tuesday', 'Calculus 2 (MATH 2300-015)');

// calendar();
