import { test, expect } from '@playwright/test';

import { time } from 'console';
import * as OTPAuth from 'otpauth';
import 'dotenv/config' ; 
import path from 'path';

const authFile = path.join(__dirname,'../playwright/.auth/user.json');

test('user is already logged in', async ({ page }) => {
  // Go directly to GitHub homepage
  await page.goto('https://github.com');

  // GitHub shows avatar button only when logged in
//  await expect(page.getByLabel('Page context').locator('span')).toContainText('Dashboard');
   await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();

});

test('Create commit from README.md', async ({ page }) => {
  // Go directly to GitHub homepage
  const date = new Date();
const formattedDate = date.toLocaleString()
  await page.goto('https://github.com');

  // GitHub shows avatar button only when logged in
//  await expect(page.getByLabel('Page context').locator('span')).toContainText('Dashboard');
   await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  await page.getByRole('link', { name: 'danielcdoran/zoots' }).click();
  await page.getByRole('link', { name: 'README', exact: true }).click();
  await page.getByRole('link', { name: 'README', exact: true }).click();
  await page.getByRole('link', { name: 'README.md, (File)' }).click();
  await page.getByTestId('edit-button').click();
  await page.getByRole('textbox', { name: 'Editing README.md file' }).fill('Add current time ' + formattedDate + ' in file');
  await page.getByRole('button', { name: 'Commit changes...' }).click();
  await page.getByRole('textbox', { name: 'Add an optional extended' }).click();
  await page.getByRole('textbox', { name: 'Add an optional extended' }).fill('Commit message - current time ' + formattedDate + ' committed');
  await page.getByRole('button', { name: 'Commit changes', exact: true }).click();
});

    