# Lewis Cleaners Codebase Brief

## 1) System overview

This repository is a split frontend + backend application for a laundry business website:

- **Frontend**: React + TypeScript + Vite SPA with Redux auth state, route protection, multilingual content (English/Hindi/Marathi), and mostly static/dummy data providers for menu/products/charts.
- **Backend**: Express + Mongoose API with two endpoints: login and contact submission.

The app flow is:
1. User hits frontend routes.
2. Protected routes require Redux auth user.
3. Login submits credentials to backend `/api/login`.
4. Home page contact form submits to backend `/api/contacts`.

## 2) Backend architecture

### Entry point
- `backend/server.js` initializes Express, enables CORS + JSON body parsing, loads env via `dotenv`, and connects directly with Mongoose using `process.env.MONGO_URI`.
- It mounts:
  - `POST/GET /api/contacts` (contact routes)
  - `POST /api/login` (login route)
- Health/root route: `GET /` returns "Backend is running 🚀".

### Data models
- `User` model: `username`, `password` (plain strings).
- `Contact` model: name/email/phone/message with validations and timestamps.

### Routes
- `loginRoutes.js`:
  - Reads `{username,password}` from request body.
  - Queries MongoDB using `findOne({ username, password })`.
  - Returns `401` on invalid credentials, else returns `success: true` with user document.
- `contactRoutes.js`:
  - Receives name/email/phone/message.
  - Performs duplicate check with exact match on all four fields.
  - Returns `409` for duplicate submission.
  - Creates and returns contact record.
  - Also supports `GET /api/contacts` returning all contacts sorted newest first.

### Backend caveats / risks
- **Plaintext password matching**: no hashing/JWT/session.
- **Debug logging of sensitive data** in login route and server startup.
- **Bug in contact route**: logs `allUsers` which is undefined; this can throw and break POST flow.
- `backend/config/db.js` exists but is not used by `server.js` (legacy/unused pattern).

## 3) Frontend architecture

### Bootstrap and app shell
- `frontend/main.tsx` mounts `<App />` inside `BrowserRouter` and Redux `<Provider>`, and imports i18n/bootstrap.
- `frontend/App.tsx` wires route tree:
  - Public layout for `/login`.
  - Private layout for `/`, `/products`, `/about-us`, `/services`, `/contact-us` behind `<ProtectedRoute>`.

### Auth and state
- Redux store defined in `src/store/store.ts` with `auth` slice.
- `authSlice` persists user to `localStorage` on login and hydrates state on startup.
- `ProtectedRoute` checks Redux `state.auth.user`; redirects to `/login` if missing.
- There is also an `AuthContext` implementation, but active route protection uses Redux, not context.

### Layout and navigation
- Public and private layouts add different headers/footers.
- Private nav fetches menu asynchronously from `menuApi` (mock Promise + timeout), renders `NavLink`s, supports logout dispatch, and language switching.

### Pages and components
- `Home` is composition-heavy: hero + services + carousel + testimonials + timeline + customer growth chart + map.
- `Login` posts credentials to backend and dispatches Redux login on success.
- `Products` shows paginated mocked products from `productApi`.
- `Services` uses i18n strings for service list.
- `AboutUs` and `ContactUs` pages are currently placeholders.

### Contact flow
- `contactForm.tsx` collects user inputs and posts JSON payload to backend `/api/contacts`.
- Shows alert on success/failure and blocks double submit while pending.

## 4) Internationalization

- i18n configured in `src/i18n/index.ts` using i18next + react-i18next.
- Supported languages: `en`, `hi`, `mr`.
- Selected language persisted in `localStorage` key `lang`.
- Locale files hold hero, services, testimonials, journey, and map strings.

## 5) Build, tooling, and deployment hints

- Frontend scripts: `dev`, `build`, `lint`, `preview`.
- Vite uses React plugin + `babel-plugin-react-compiler`.
- ESLint config is modern flat config + TypeScript + React Hooks.
- `public/_redirects` suggests SPA redirect support (common on Netlify).
- Backend scripts: `start`, `dev` (nodemon).
