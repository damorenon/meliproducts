# Meli Products

A small app to look for products in MeLi Api (this is the frontend test for MeLi).

## Installation

Use `yarn`:

```bash
yarn
```

## Usage

Make sure the .env file is pointing to `production` environment:

```bash
ENV=production
```

then run

```bash
yarn build
node src/server
```

open the app in localhost:3000 (or configured port in .env file)

For development mode, make sure the ENV environment is now poiting to `development` in .env file

```bash
ENV=development
```

Then run:

```bash
yarn start:dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
