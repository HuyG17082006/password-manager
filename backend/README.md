
```
backend
├─ config
│  ├─ cookieParser.js
│  ├─ cors.js
│  ├─ db.js
│  ├─ dotenv.js
│  └─ redis.js
├─ constants
│  ├─ auth.constants.js
│  ├─ limit.constants.js
│  ├─ server.constants.js
│  ├─ token.constants.js
│  └─ user.constants.js
├─ errors
│  └─ appError.js
├─ features
│  ├─ account
│  ├─ auth
│  │  ├─ controller.js
│  │  ├─ service
│  │  │  ├─ index.js
│  │  │  ├─ login.js
│  │  │  ├─ register.js
│  │  │  └─ resetPassword.js
│  │  └─ validate
│  │     └─ user.validate.js
│  ├─ folder
│  └─ user
├─ middleware
│  ├─ errorHandler.js
│  ├─ getIpAndDevice.js
│  ├─ loginLimit.js
│  └─ registerLimit.js
├─ package-lock.json
├─ package.json
├─ repository
│  ├─ loginVerifications.js
│  ├─ refreshTokens.js
│  └─ users.js
├─ routes
│  └─ authRoute.js
├─ server.js
├─ templates
│  ├─ confirmEmailTemplate.js
│  ├─ successTemplate.js
│  ├─ verifyEmailOwnershipTemplate.js
│  └─ verifyLoginTemplate.js
└─ utils
   ├─ asyncHandler.js
   ├─ bcrypt.js
   ├─ cache.js
   ├─ getDeviceName.js
   ├─ getLocation.js
   ├─ jwt.js
   ├─ limit.js
   ├─ maskEmail.js
   ├─ nodemailer.js
   ├─ transaction.js
   └─ uuid.js

```