# Habyt Fullstack Interview Project

See implementation notes below.

## Implementation Checklist:
- [x] Display of Rooms
  -  SSR rendered on homepage `/` - reads from fs
  - API route at `/api/rooms/[id]` for lease signing
  - Displays most import attributes
- [x] Booking Feature
  - 4 stage stepper
  - state managed in URL
  - sensible data collection
  - mock interaction that calls api routes that would call DocuSign
    - `POST /api/lease/` - creates a new draft lease agreement
    - `GET /api/lease/[id]` - fetches new draft lease agreement
    - `PATCH /api/lease/sign/[id]` - signs draft lease agreement
  - Basic welcome view on completion
  - user able to go back steps
  - Extension form validation
  - Error handling

## Assumptions
- Ok to not add responsive styles below 760px vw
- Basic styles are ok

## Improvements / TODO
- Add test coverage
- Componentise more of the UI