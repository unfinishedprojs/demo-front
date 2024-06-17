## 0.3.3

- Added pagination
- Added sorting
- Added time till end of a poll

## 0.3.2

- Fixed bug where additional buttons are randomly added

## 0.3.1

- Fixed bug where buttons to vote on users disappeared (?)

## 0.3.0

- Fixed bug where users whose global username was the same as their slug were displayed as having the name null
- Voting page now locks once a vote is cast (Votes will be editable in the future, dont worry)

## 0.2.9

- Invites can now be added to the end of a register link (Example: `https://demo.samu.lol/#/register?invite=EXAMPLE`)

## 0.2.8

- Admins can now see the invite for each poll
- Poll buttons become disabled once it ends

## 0.2.7

- Attempt to fix broken routing using hash router.
- Fix user get

## 0.2.6

- Fixed some errors not appearing in login and register page

## 0.2.5

- Fixed an endpoint being renamed

## 0.2.4

- Sorry to anyone that might've noticed (probably not), but fixed boxes being offcentered
- Added a footer with version of the frontend and the backend

## 0.2.3

- Fix profile pictures not loading in polls page

## 0.2.2

- Add proper routing for register page

## 0.2.1

- Correct API library base URL

## 0.2.0

- Change authentication system to new passworded one
- Show which events are active and which are not

## 0.1.4

- Edit API library so that the API version is specified on the baseurl

## 0.1.3 (b)

- Move to new domain
- Move to new versioning system
- (b) Fix domain

## 0.1.2

- Fix error handling for voting page
- Added new API endpoint

## 0.1.1

- Added AppBar, so that icons are now organized
- Finished adding errors to all pages

## 0.1.0

- Stop using shoelace components, and use SUID components
- Add light/dark mode (defaults to dark mode)
- Add ClosableAlert component, so now the alerts wont be fullscreen popups, but closable boxes
- Home button on logged in pages (home button just brings you to current events, might make actual dashboard at some point)
- Log out button
