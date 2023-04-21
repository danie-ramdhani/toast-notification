# Toast Message 🍞

<p align="left">
  <a href="https://www.npmjs.com/package/javascript-toast-notification"><img src="https://img.shields.io/npm/v/javascript-toast-notification.svg" alt="NPM Release"></a>
  <a href="https://github.com/danie-ramdhani/toast-notification/releases"><img src="https://img.shields.io/github/release/danie-ramdhani/toast-notification?color=green" alt="Latest Release"></a>
</p>

A simple notification with better customization.

## Demo / Example

You can <a href="https://danie-ramdhani.github.io/toast-notification/">click here</a> to see the demo

## Installation

You can install it via NPM

```sh
npm i javascript-toast-notification
```

or you can include it on you page via CDN

on head tag:

```html
<link rel="stylesheet" href="https://unpkg.com/javascript-toast-notification/dist/toast-notification.min.css" />
```

on body tag:

```html
<script src="https://unpkg.com/javascript-toast-notification/dist/toast-notification.min.js"></script>
```

## ⏩ Quick Start:

```javascript
var toastMessage = ToastMessage();

toastMessage.create();

// or

toastMessage.create({
  classList: "your-favorite-custom-color",
  icon: "🍞",
  duration: "10",
  position: {
    y: "top",
  },
  // and other options...
});
```

## ⚙ Options

| Name                  | Type              | Description                                                                                                                                                              | Default Value            |
| --------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| classList             | String            | Your background color classes for the toast element, or `red` background if none are specified.                                                                          | null                     |
| title                 | String            | The title to display on the toast element, or null if none is specified.                                                                                                 | null                     |
| message               | String            | The message to display on the toast element. If none is specified, the default value will be used.                                                                       | "This is Toast message!" |
| icon                  | String            | The icon to display on the toast element, or `null` if none is specified. You can input HTML String in this option.                                                      | null                     |
| duration              | Number            | The amount of time in seconds that the toast will be displayed. If duration is less than or equal to 0, the toast will permanently displayed.                            | 5                        |
| closeButton           | Boolean           | Whether to display a close button on the toast element.                                                                                                                  | true                     |
| position.x            | String            | The horizontal position of the toast element on the screen. Can be `"left"`, `"center"`, or `"right"`. If `position.x` is not specified, the default value will be used. | `"right"`                |
| position.y            | String            | The vertical position of the toast element on the screen. Can be "top", or "bottom". If `position.y` is not specified, the default value will be used.                   | "bottom"                 |
| position.z            | Number            | The z-index of the toast element. If `position.z` is not specified, the default value will be used.                                                                      | 50                       |
| redirect              | String or Object  | You can pass url string here or you can pass object with key `url` and `newWindow`. if the value is url string, the link will automatically open the url in new window.  | null                     |
| redirect.url          | String            | The URL to redirect to when the toast element is clicked.                                                                                                                | null                     |
| redirect.newWindow    | String            | Whether to open the redirect URL in a new window or in the current one.                                                                                                  | true                     |
| progressBar           | Boolean or Object | You can pass `false` or `0` value to disable progress bar. or you can pass object with key `show` and `classList`.                                                       | true                     |
| progressBar.show      | Boolean           | Whether to display a progress bar on the toast element.                                                                                                                  | true                     |
| progressBar.classList | String            | Your background color classes for the progress bar color, or `currentColor` if none is specified.                                                                        | null                     |
