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
 await expect(page.getByLabel('Page context').locator('span')).toContainText('Dashboard');
});

    