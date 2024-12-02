# CraneApp

CraneApp is a mobile-first application designed for crane operators and construction site managers. It provides functionalities such as user authentication, viewing construction sites and operators, editing user profiles, rating and reviewing operators, reporting operator availability, handling emergency situations, and displaying fixed rates for services.

## User Journeys

1. [User Registration and Login](docs/journeys/user-registration-login.md) - Sign up and log in to access CraneApp features.
2. [View Construction Sites and Operators](docs/journeys/view-sites-operators.md) - Browse and search for construction sites and crane operators.
3. [Edit User Profile](docs/journeys/edit-user-profile.md) - Update personal information in the user profile.
4. [Rate and Review Operators](docs/journeys/rate-review-operators.md) - Provide ratings and reviews for crane operators.
5. [Report Operator Availability](docs/journeys/report-availability.md) - Indicate availability status as an operator.
6. [Handle Emergency Situations](docs/journeys/emergency-situations.md) - Report emergencies and access quick contact options.

## External APIs and Services

- **Supabase Auth**: Used for user authentication (registration and login).
- **ZAPT**: Platform integrating various functionalities within the app.
- **Sentry**: Error monitoring and logging for both frontend and backend.

## Getting Started

1. Install dependencies using `npm install`.
2. Set up environment variables as listed in the `.env` file.
3. Run the app locally using `npm run dev`.

For detailed steps, refer to each user journey documentation.

---

**Note**: This app includes a "Made on ZAPT" badge linking to [ZAPT's website](https://www.zapt.ai).