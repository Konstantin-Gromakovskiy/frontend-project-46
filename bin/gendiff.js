#!/usr/bin/env node

import { Command } from 'commander';
import compare from '../src/compare.js';
import getData from '../src/parsing.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const DataFile1 = getData(filepath1);
    const DataFile2 = getData(filepath2);

    console.log(compare(DataFile1, DataFile2));
  });

program.parse();
