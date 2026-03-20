import { test as setup, expect } from '@playwright/test';
import { time } from 'console';
import * as OTPAuth from 'otpauth';
import dotenv from "dotenv";
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('github auth setup with MFA', async ({ page }) => {
  dotenv.config({ path: path.resolve(__dirname, '.env') });
  // dotenv.config() ;?
  // // Guardrails: fail fast if env vars are missing
  // if (!process.env.GITHUB_USER ) {
  //   throw new Error('Required environment vGITHUB_USER ariables are missing');
  // }
  //   if (!process.env.GITHUB_PASS ) {
  //   throw new Error('Required environment vGITHUB_PASS ariables are missing');
  // }
  //   if (!process.env.GITHUB_MFA_SECRET ) {
  //   throw new Error('Required environment vSECRET ariables are missing');
  // }
  // if (!process.env.GITHUB_USER ||
  //     !process.env.GITHUB_PASS ||
  //     !process.env.GITHUB_MFA_SECRET) {
  //   throw new Error('Required environment variables are missing');
  // }
  //   let username: string = process.env.GITHUB_USER as string ;
  //     let password: string  = process.env.GITHUB_PASS as string  ;
  // let mfaSecret: string = process.env.GITHUB_MFA_SECRET as string  ;

  let username: string = "danielcdoran";
  // let password: string = "Theridgeway2073";
  // let mfaSecret: string = "SG5GANAMG7DT2G4X";
  let mfaSecret: string = process.env.GITHUB_MFA_SECRET as string; //"SG5GANAMG7DT2G4X";
  let password: string = 'Theridgeway2073'; // note using different parenthesis
  // let mfaSecret = "SG5GANAMG7DT2G4X" ;
  // otpauth://totp/GitHub:danielcdoran?secret=EDL46UJXLQZHOT4S&issuer=GitHub
  // Step 1: Go to GitHub login
  await page.goto('https://github.com/');
  await page.getByRole('link', { name: 'Sign in' }).click();

  // Step 2: Username + Password
  // await page.getByRole('textbox', { name: 'Username or email address' }).click();
  await page.getByLabel('Username or email address').fill(username);
  // await page.getByText('Password', { exact: true }).click();
  // await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByLabel('Password').fill(password);

  // Step 3: Generate OTP using shared secret
  const totp = new OTPAuth.TOTP({
    issuer: "GitHub",
    algorithm: "SHA1",
    secret: mfaSecret,
    digits: 6,
    period: 30,
  });

  const code = totp.generate();
  // console.info(code)

  // Step 4: Enter OTP and verify
  // await page.getByRole('textbox', { name: 'Enter the verification code' }).click();
  // await page.getByRole('textbox', { name: 'Enter the verification code' }).fill(code);
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.getByLabel('Enter the verification code').fill(code);
  // await page.getByRole('button', { name: 'Verify' }).click();

  // Step 5: Verify login succeeded
  // await expect(page).toHaveURL(/github\.com/);
  await expect(page.getByLabel('Page context').locator('span')).toContainText('Dashboard');

  // // Step 6: Save authenticated session
  await page.context().storageState({ path: authFile });
  // // sleep for 5 seconds
  // await new Promise(resolve => setTimeout(resolve, 5000));
});

