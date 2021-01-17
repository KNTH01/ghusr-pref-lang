# ghusr-pref-lang

Uses GraphQL GitHub API endpoint to fetch the language repartition of a user.

## Instructions

- Clone the repository
- Install dependencies: `npm install`
- Create `.env` and add your GitHub personal access token ([how to](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)): `TOKEN={yourPersonalToken}`
- Launch the script using `npm start {username}`. E.g: `npm start KevinNTH`

### Output example

```
❯ npm start kevinnth

> ghusr-pref-lang@1.0.0 start /home/kevin/web/ghusr-pref-lang
> node index.js "kevinnth"

Language repartition (in Bytes) for kevinnth
* 622744: JavaScript
* 139200: Vue
* 85367: TypeScript
* 60291: HTML
* 49639: CSS
* 9494: PHP
* 1908: Shell
```
