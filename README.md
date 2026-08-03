# Glass Login

Glass Login is a right-to-left login form template with a Persian (Jalali/Shamsi) date picker, built in plain HTML, CSS, and JavaScript for front-end developers who need a ready-made RTL sign-in screen.

## Overview

The page is a dark, glassmorphism-style card on an animated particle background. It contains a centre/branch selector, a numeric code field, a password field, a date field backed by a Persian calendar, and a remember-me option, with ARIA attributes throughout.

There is no framework and no build step. The selected centre is persisted in `localStorage`, and a built-in Gregorian-to-Jalali conversion acts as a fallback so the date picker always resolves today's Persian date.

## Features

- RTL layout (`dir="rtl"`) using the Vazirmatn and Yekan fonts.
- Jalali (Shamsi) date input via `@majidh1/jalalidatepicker`.
- Gregorian to Jalali conversion fallback so today's date always resolves.
- Animated particle background via particles.js.
- Centre selector whose choice is remembered across visits through `localStorage`.
- Numeric code, password, and remember-me fields with appropriate `autocomplete` values.
- ARIA labels and semantic landmarks for screen readers.
- Dark theme with accent gradients and Font Awesome icons.
- No build step; open `index.html` directly.

## Requirements

- A modern web browser. There is nothing to install or compile.
- An internet connection, since particles.js, the Jalali date picker, and the fonts are loaded from CDNs.

## Installation

```bash
git clone https://github.com/morpheusadam/GlassLogin.git
cd GlassLogin
```

## Usage

Open `index.html` in a browser, or serve the folder with any static server:

```bash
npx serve .
# or
python -m http.server
```

## Tech stack

| Layer | Technology |
| --- | --- |
| Markup | HTML5 (RTL) |
| Styling | CSS3 with custom properties |
| Logic | Vanilla JavaScript |
| Fonts | Vazirmatn, Yekan |
| Date picker | `@majidh1/jalalidatepicker` |
| Background | particles.js |
| Icons | Font Awesome 6 |

## Project structure

```text
GlassLogin/
├── index.html
└── assets/
    ├── css/
    │   ├── styles.css
    │   ├── jalalidatepicker.css
    │   └── jalalidatepicker.min.css
    ├── js/
    │   ├── app.js
    │   ├── jalalidatepicker.js
    │   └── jalalidatepicker.min.js
    └── img/
        └── tabiat-logo.svg
```

## Contributing

Open an [issue](https://github.com/morpheusadam/GlassLogin/issues) or submit a pull request with fixes, new themes, or accessibility improvements.

## Licence

Free to use and modify. See [`LICENSE`](LICENSE) if present; otherwise treat it as MIT.

## Author

Morpheus Adam — web developer, PHP / Laravel / Go.

- GitHub: [morpheusadam](https://github.com/morpheusadam)
- Website: [sam.zeonic.me](https://sam.zeonic.me)
- Email: morpheusadam95@gmail.com
