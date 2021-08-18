#!/usr/bin/env node
import * as chalk from 'chalk';
import * as inquirer from 'inquirer';
import { CUSession } from '../session';

function toPlace(number: number, place: number = 2) {
  return Math.round(Math.pow(10, place) * number) / Math.pow(10, place);
}

async function getSession(): Promise<CUSession> {
  const { username, password } = await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Identikey Login?'
    },
    {
      type: 'password',
      name: 'password',
      message: 'Password?'
    }
  ]);
  const session = new CUSession();
  await session.init(username, password);
  return session;
}

const getGpa = async () => {
  const session = await getSession();
  const gpa = parseFloat((await session.GPA()).cumGpa);

  console.log(
    `${chalk.green('GPA')}: ${chalk.blue(gpa)} (${chalk.blue(
      toPlace((gpa / 4) * 100)
    )}%)`
  );
};

const getCourses = async () => {
  const session = await getSession();

  const terms = await session.termData();
  const currentTerm = terms.find(
    (term) => term.attributeName === 'NEXT_TERM'
    // (term) => term.attributeName === 'CURRENT_TERM'
  );
  if (!currentTerm) {
    throw new Error('Could not find current term data.');
  }
  const courses = Array.from(
    (await session.classTermData(currentTerm.term4)).values()
  );

  for (let course of courses) {
    console.log(
      `${chalk.green(course.courseTitleLong)} ${chalk.blue(
        `(${course.subject} ${course.catalogNbr}-${
          course.classSection
        }) ${chalk.red(`${course.untTaken} credits`)}`
      )}`
    );
    for (let instructor of course.classMtgPatterns[0]?.instructors ?? []) {
      console.log(
        `\t${instructor.instructorName} - ${instructor.instrEmailAddr}`
      );
    }
  }
};

// FOR TESTING:
// getGpa();
getCourses();
