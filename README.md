# OpenLRS HTTP tests

## Synopsis

Simple HTTP client for testing responses from OpenLRS service. Runs using [Node.js](https://nodejs.org/en/).

---

## Getting started

After cloning this repository, prepare your environment:

```shell
cp ./site-config/uri.json.EXAMPLE ./site-config/uri.json
vi ./site-config/uri.json
```

## Install dependencies

Install Node.js and add npm(1) / node(1) to your path. Next:

```shell
npm install
```

## Run tests

```shell
node run.js
```

