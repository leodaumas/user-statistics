## A simple aplication of user statistics that uses json server as backend!

## Goals

⚡️ Get data from a json server
⚡️ Render user.json as an array
⚡️ Allow filter
⚡️ Show statistics of filtered

## Getting Started 🚀

These instructions will get you a copy of the project up and running on your local machine for studying development purposes. 

### Prerequisites 📋

You'll need [Node.js](https://nodejs.org/en/download/) (which comes with [NPM](http://npmjs.com)) installed on your computer. You also will need [json-server](https://www.npmjs.com/package/json-server)

```
node@v12.18.2 or higher
npm@6.14.5 or higher
git@6.14.5 or higher
json-server@0.16.1 or higher

```

---

## How To Use 🔧

From your command line, first clone:

```bash
# Clone this repository
$ git clone https://github.com/user-statistics

# Go into the repository
$ cd user-statistics

# Remove current origin repository
$ git remote remove origin
```

Then you can install the dependencies using NPM:

Using NPM:
```bash
# Install dependencies
$ npm install

#Install packages
$ npm i json-server

#Add script below test in package.json
"server1": "json-server --watch users.json --port 3001"

# Start development server
$ npm run server1
```
