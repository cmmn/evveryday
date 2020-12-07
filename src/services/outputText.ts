import chalk from 'chalk';
import { logo, slogan } from '../data';

export interface Dialog {
  subjectKey?: string;
  dataKey: 'logo' | 'intro' | 'subcategory';
}

export const outputText = ({ subjectKey, dataKey }: Dialog): void => {
  const dialogs = {
    logo: `${logo}\n${slogan}\n`,
    intro:
      subjectKey &&
      `You've chosen to learn ${chalk.blue(
        subjectKey.toUpperCase(),
      )}. Great choice! Let's get started`,
    subCategory: `Please choose a subcategory:`,
  };
  // \x1b[1m === reverse of background
  console.log('\x1b[1m', dialogs[dataKey]);
};
