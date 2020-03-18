# Symphony BDK CLI

![Alt text](src/assets/logo-symphony.png?raw=true "Mock client architecture")

[![CircleCI](https://circleci.com/gh/SymphonyPlatformSolutions/symphony-bdk-cli.svg?style=shield&circle-token=f85a6240aca3c3dca3599620bf3688a458b389c8)](https://circleci.com/gh/SymphonyPlatformSolutions/symphony-bdk-cli/tree/develop)
[![Generic badge](https://img.shields.io/badge/Node-v12.14.1-blue.svg)](https://www.oracle.com/technetwork/java/javase/documentation/index.html)
[![Generic badge](https://img.shields.io/badge/Npm-6.13.4-blue.svg)](https://www.oracle.com/technetwork/java/javase/documentation/index.html)

## Description

This tool was meant to bootstrap bots and extension applications for Symphony's ecosystem. It provides a set of tools 
and facilitate the creation of the above.

![Alt text](src/assets/cli-sample.png?raw=true "Mock client architecture")


## What you'll need
* NodeJS
* Yarn
* Openssl
* Node v12.14.1
* Java 8
* Maven
* Git

## Preparing Environment

- First you need to install the **stable** version of [NodeJs](https://nodejs.org/en/) 
- Then you need to install yarn ```npm install -g yarn```
- Then you'll need to link this tool, by running ```yarn link``` inside the symphony-bdk-cli folder
> this step is momentarily, as soon as this project gets release under a registry repository
>it will be available to use out of the box


Only that will get you the bare minimum to run the application. if you run the cli e.g: ```symphony-bdk-cli```
you`ll be presented with the help page.

First thing you need to try is the dependency check, the cli runs a diagnose
everytime it runs, that checks if you have the required dependencies installed on your machine/environment.

simply run:

```symphony-bdk-cli --check-deps```

if there's a missing dependency on your machine the cli will prompt you with
directions to the depedencies download page.

### Git
Be sure to have generated proper ssh keys on your machine and added them to your 
symphony`s github account. you can found how to do that
[here](https://help.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account)
The CLI will look for these files:
```
~/.ssh/id_rsa
~/.ssh/id_rsa.pub
```

If they're not present you'll be prompted with error messages.

## Commands

At this time the CLI has a few commands, the only mandatory field on these commands
if required is the project name. these commands being:
* ```symphony-bdk-cli --app``` which creates an extension app (React)
* ```symphony-bdk-cli --app message-template``` Creates a notification in a existing extension app.
* ```symphony-bdk-cli --bot``` which creates an bot app (Java)
* ```symphony-bdk-cli --bot command-handler``` Creates a new Command handler for an existing bot
* ```symphony-bdk-cli --bot message-template``` Creates Templates on a bot, and also creates a command handler to it if required.
* ```symphony-bdk-cli --toolkit``` which launches the Symphony Component Library in your browser
* ```--run``` this is a command to be appended with the above e.g: ```symphony-bdk-cli --app --run```,
if present it will not only have it bootstraped but also start it for you.
* ```symphony-bdk-cli --check-deps``` An utility command, that checks all the required dependencies for you.
* ```--gen-certs``` this is a utility command meant for rapidly generating the necessary
rsa key pairs that are required in any project, it also creates a valid jwt token in the same process
so you can start testing your certs on symphony right away
> please note that these are development keys and should not be used in production, for production keys, you'll be likely
>given the proper keys.


## Troubleshooting

1. Im trying to create an extension app or bot but the cli fails, and it says that i dont have permission?
> In that case, be sure that you have access to the symphony-bdk-ui-toolkit, symphony-bdk-mock-client, and symphony-bot-bdk projects
>on github, also be sure that you have properly added your symphony account ssh keys to github.
