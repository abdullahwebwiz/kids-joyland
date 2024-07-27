// @ts-ignore
import { Parser } from 'json2csv';

export const downloadCSV = (data: any, filename = 'data.csv') => {
  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(data);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  a.click();
};
