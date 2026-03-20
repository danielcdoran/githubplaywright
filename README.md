




npx playwright test --headed --project=chromium --trace on 

How to see if secret is correct
Created test that just returns a code
Started login t o github to where it reuires the code
Got code from application and typed it in
If login completes then I have a valid code and the 2FA setup is correct.

Github 2FA
I had setup 2FA and then looked in settings | Password and authorization | Edit and saw QR code
This is a NEW code and not the existing one. So I had to set up a new 2FA and use the code that is available in this page


# playwright-auth-mfa
Playwright MFA Automation
Automate Multi-Factor Authentication (MFA) in Playwright by generating OTP/TOTP codes in code and reusing authenticated sessions with storageState.

## 🎥 Full tutorial video: [here](https://youtu.be/Nb_krfLmv0o) 

## 🧪 What This Repo Contains

- `tests/auth.setup.ts`
  Runs once to:

    - Log in

    - Generate and enter OTP

    - Save authenticated session (auth.json)


- `tests/example.spec.ts`
  Uses the saved session to:
    - Start tests already logged in
    - Skip login and MFA completely


- `playwright.config.ts`
  Configured with a setup project that runs before other tests


## 🔒 Save the Secret Securely

Copy the secret once and store it securely.
Don’t commit it, don’t log it, and use environment variables instead.

```
export GITHUB_MFA_SECRET=YOUR_SECRET_KEY

export GITHUB_USER=your_username

export GITHUB_PASSWORD=your_password
```

## Install Node dependencies

You must install project dependencies first.

`npm install`

## Install Playwright browsers

Playwright requires browser binaries.

`npx playwright install`

## ▶ Running the Tests

Run the setup test in headed mode so you can see the browser flow:

`npx playwright test --headed`
