#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { subjects, Subject, Query } from './data';
import { outputText, dialog } from './services';
import prompts from 'prompts';

const subjectList = Object.keys(subjects);
const argv = yargs(hideBin(process.argv)).argv;

export const index = async (): Promise<void> => {
  // init variables
  let subjectKey = '';
  let subject: Subject;
  let queries: Query[];
  let correct = 0;
  let incorrect = 0;
  // print title "beveryday - get a little better everyday"
  outputText({ dataKey: 'logo' });

  // get argument argv._[0] to determine subject
  if (argv._[0] && subjectList.includes(argv._[0])) {
    // intro
    outputText({ subjectKey: argv._[0], dataKey: 'intro' });
    // fetch queries data
    if (subjects[argv._[0]].queries) {
      subject = subjects[argv._[0]] as Subject;
      queries = subject.queries;
    }

    // if argv._[0] doesnt'exist, display list of subjects to choose from
  } else {
    // present subjects to user for choice
    await (async () => {
      const response = await prompts({
        type: 'select',
        name: 'value',
        message: 'What would you like to learn today?',
        choices: subjectList,
        initial: 1,
      });
      subjectKey = subjectList[response.value];
      subject = subjects[subjectKey] as Subject;
      // console.log({ subject });
      queries = subject.queries;
      // fetch queries data
      if (subject.queries) queries = subject.queries;
      // console.log({ queries });
    })();
  }

  // if queries does not exist, then user needs to choose a subcategory
  if (!queries) {
    const subCategoryList = Object.keys(subjects[subjectKey]);
    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'What subcategory would you like to learn?',
      choices: subCategoryList,
      initial: 1,
    });

    console.log({ response });
    const subCategoryKey = subCategoryList[response.value];
    console.log({ subCategoryKey });
    subject = subject[subCategoryKey];
    console.log({ subject });
    queries = subject.queries;
    console.log({ queries });
  }

  await (async () => {
    // console.log(queries);
    const onSubmit = (prompt, answer, answers) => {
      console.log(`Correct answer: ${prompt.answer}`);
      if (prompt.answer === answers[prompt.name]) {
        console.log('You are correct!');
        correct++;
      } else {
        console.log(`Well, there's always next time.`);
        incorrect++;
      }
    };
    const response = await prompts(queries, { onSubmit });
  })();

  console.log(`You were right ${correct} times and wrong ${incorrect} times.`);

  // if letter for letter display reward
  // display answer
  // ask if they want to reinforce learning by retyping answer or display the next question
  // complete questions
  // display time spent and score
  // display call to action - contribute by adding subjects on git or via donation
  // try to get faster and more accurate with your answers
};

index();
