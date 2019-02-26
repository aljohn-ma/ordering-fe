# Angular App Setup

Document to guide the Angular webapp setup.

## Requirements

- Node >= `10.6.0`
- NPM >= `6.2.0`

## Setup

### Step 1

If you do not have the `Angular CLI` installed in your machine yet, do so with this command:

`$ npm install -g @angular/cli`

### Step 2

Install the webapp's dependencies

_From the project's root, cd into `pulic/ng`_

When you are already in the Angular app's project directory, install the NPM packages by running:

`$ npm install`

### Step 3

After all dependencies are installed, you can now start watching for file changes in the webapp's source code

You can do this in the `public/ng` folder with the command:

`$ ng build --watch`

Built app is found in `public/app` folder


## Development

### Generating Components

`$ ng generate component [name]`

[https://github.com/angular/angular-cli/wiki/generate-component]
(https://github.com/angular/angular-cli/wiki/generate-component)


### Relative Root Imports

The app's root is the `public/ng/src/` directory.
