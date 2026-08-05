
```
src
├─ App.jsx
├─ assets
│  ├─ hero.png
│  ├─ react.svg
│  └─ vite.svg
├─ constants
│  └─ user.constants.js
├─ features
│  ├─ auth
│  │  ├─ components
│  │  │  ├─ AuthContainer.jsx
│  │  │  ├─ Login.jsx
│  │  │  ├─ Register.jsx
│  │  │  └─ Silder.jsx
│  │  ├─ constants
│  │  │  └─ user.constants.js
│  │  ├─ hooks
│  │  │  ├─ useLogin.jsx
│  │  │  └─ useRegister.jsx
│  │  ├─ pages
│  │  │  ├─ AuthPage.jsx
│  │  │  ├─ LoginApprovedPage.jsx
│  │  │  ├─ LoginRejectedPage.jsx
│  │  │  └─ VerifyLoginPage.jsx
│  │  ├─ service
│  │  │  ├─ authFetch.js
│  │  │  ├─ index.js
│  │  │  ├─ login.js
│  │  │  ├─ register.js
│  │  │  └─ test.js
│  │  └─ styles
│  │     ├─ AuthContainer.scss
│  │     ├─ Form.scss
│  │     ├─ LoginResult.scss
│  │     └─ Slider.scss
│  └─ shared
│     ├─ hooks
│     │  └─ useLoading.jsx
│     ├─ pages
│     │  └─ NotFoundPage.jsx
│     └─ styles
│        └─ NotFound.scss
├─ index.css
├─ layouts
│  └─ AuthLayout
│     ├─ AuthLayout.jsx
│     └─ AuthLayout.scss
├─ main.jsx
├─ services
│  └─ Fetch.js
├─ store
│  ├─ authStore.js
│  └─ userStore.js
└─ validate
   └─ user.validate.js

```