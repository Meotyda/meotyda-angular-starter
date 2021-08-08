![logo](src/assets/images/logo.png)

# Meotyda Angular Starter

## Features

- [Angular 12](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Commit Linting](https://github.com/conventional-changelog/commitlint)
- [Documentation generating](https://compodoc.app/)
- [Changelog generating](https://github.com/lob/generate-changelog)

## Install / Development

```bash
# Clone the project
$ git clone git@github.com:Meotyda/meotyda-angular-starter.git
$ cd meotyda-angular-starter

# Install dependencies
$ npm install

# Setup Husky
$ npm run prepare

# Start server
$ npm run start

# Open in browser: http://localhost:3000
```

## Commands

- `npm run start` - start the app
- `npm run lint` - lint the project
- `npm run test` - run unit tests
- `npm run build` - build the project
- `npm run build:prod` - build the project in production mode
- `npm run build:prod:stats` - build the project in product mode with stats
- `npm run analyse` - analyse bundle with [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- `npm run compodoc` - generate [compodoc](https://github.com/compodoc/compodoc) documentation
- `npm run changelog` - generate changelog
- `npm run prettier` - format the whole project

## See also

- [Semantic Commit Messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
