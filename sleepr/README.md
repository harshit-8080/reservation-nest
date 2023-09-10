## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

```bash
# common library

$ nest generate library common
$ pnpm i @nestjs/mongoose mongoose
$ pnpm i @nestjs/config
$ nest generate module database -p common
$ nest generate module config -p common

# first MS

$ nest g app reservations

- Create Resources - nest generate resource reservations

# second MS

$ nest g app auth
$ nest g module users
$ Create controller - nest g controller users

```
