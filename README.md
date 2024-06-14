# solidjs frontend for democracy server
Democracy Server Voting Infra: frontend
WIP, contribute or else!  
  
solidjs is very easy btw  
https://docs.solidjs.com/quick-start  
i'm using typescript because workin with untyped apis is pain.  

## devinstall
- `npm i -g pnpm`
- `git clone https://github.com/unfinishedprojs/demo-front`
- `cd demo-front`
- `pnpm i`
- `pnpm dev` or `pnpm build` -> `pnpm serve`

## todo
- [X] registering users
  - [ ] printing out their toke
  - [X] saving token to localstorage upon registration
- [x] login with token
  - [x] saves token to localstorage
- [x] login with localStorage
- [x] clearing localStorage
- [X] only allow registering if you know the password for registeration
  - better yet, have to get a invite token or something from another user
  - so randoms can't sway the v
- [X] logout
- [X] vote ui
- [X] Create actual error alerts (Half done, missing voting page and suggestion page!)

## v0.1.3 (b)

- Move to new domain
- Move to new versioning system
- (b) Fix domain

## v0.1.2

- Fix error handling for voting page
- Added new API endpoint

## v0.1.1

- Added AppBar, so that icons are now organized
- Finished adding errors to all pages

## v0.1.0

- Stop using shoelace components, and use SUID components
- Add light/dark mode (defaults to dark mode)
- Add ClosableAlert component, so now the alerts wont be fullscreen popups, but closable boxes
- Home button on logged in pages (home button just brings you to current events, might make actual dashboard at some point)
- Log out button