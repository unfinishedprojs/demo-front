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
- [ ] registering users
  - [ ] printing out their toke
  - [ ] saving token to localstorage upon registration
- [x] login with token
  - [x] saves token to localstorage
- [x] login with localStorage
- [x] clearing localStorage
- [ ] only allow registering if you know the password for registeration
  - better yet, have to get a invite token or something from another user
  - so randoms can't sway the v
- [ ] logout
- [ ] vote ui