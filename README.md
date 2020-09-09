## Description

Package for snake-case naming of indexes and constraints in TypeORM.

## Installation

```bash
$ npm install samaramike/typeorm-naming-strategy
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
