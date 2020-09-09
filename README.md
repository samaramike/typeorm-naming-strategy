## Description

Package for snake-case naming of indexes and constraints in TypeORM.

## Installation

Add to dependecies in package.json this line:
```
"typeorm-naming-strategy": "https://github.com/samaramike/typeorm-naming-strategy.git"
```
and run
```bash
npm install
```

## Usage

Add **namingStrategy** option to TypeORM config.

Example:
```js
// ormconfig.js
const SnakeCaseStrategy = require('typeorm-naming-strategy').SnakeCaseStrategy;

module.exports = {
  type: "postgres",
  host: "localhost",
...
  namingStrategy: new SnakeCaseStrategy(),
...  
}
```
