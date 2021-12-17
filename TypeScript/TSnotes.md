## **personal notes to self concerning TS**

#### **compile file manually**
navigate to location and : tsc myFile.tsc  
----> if you run tsc command in console and specify a fileName, the tsconfig.json will be ignored  
--------> if you want the config to be used you just type tsc while being in the root dir of project


#### **start file in watchmode**
navigate to location and : tsc --watch myFile.tsc  
----> .tsc ending can be omitted?

#### create configuration file
tsc --init

#### Specify ECMAScript target version
change "target" in config file to ES6 or whatever you like

#### change route / target directory
change "outDir" or "rootDir" to maybe "./dist" and "./src"
(because sourcecode often goes into src folder and comipledcode into dist) (dist = distributable)

#### run program "without manually compiling" ts-node
npm i -g ts-node 
installs ts-node globally. from now on you can Ctrl + Shift + N (run) in VSC

#### get rid of nasty error with overwriting file
if you import a js file you must make sure the outDir is set somewhere else. otherwise you will get a "problem"...
since the compiler will also compile the js file and save it in the same dir it will de facto overwrite the inital js file...
so you get this problem/warning (although it works despite the problem warning)
it worked for me when neither rootDir and outDir of the js file was in root dir
so in root i created folder data with js file in it. i also created dist folder where all compiled code goes
im sure there are other fixes for this problem message. maybe some "excluding": [...]-magic inside the tsconfig or something

#### inability to import .mjs files..
unfortunately i couldn't figure out how to import .mjs files.. therefore we cannot import the puzzleInputs used in the JS projects..
----> we have to copy them into the TypeScript/day_??/data folder and rename them to .js for the time being :(


#### debugging ts-file... dont get me startet on it

make sure you have a tsconfig.json file in your root folder (which here usually is right next to your soultion-part-1.ts file)
----> if you haven't cd to the correct position and tsc --init to create the tsconfig.json file  
check if:...  
"allowJs": true  ( because maybe you want to import a puzzleInput.js file)  
"sourceMap": true ( because this is needed for the debugger)  
"outDir": "./dist" (make sure a dist folder is present in root dir, you want this because of the error described in
paragraph "get rid of nasty error with overwriting file")  
IMPORTANT: when in root dir run tsc in terminal before starting to debug because the debugger will use the compiled JS file
and therefore you have to to tsc first!  
you dont have to have a launch.json file.. you can simply click the blue button Run and Debug  
----> if asked choose Node.js or Run Current File  

i once managed to make it work so that when starting to debug the ts code would automatically be compiled to js and then debugged..
however some packages had to be installed locally and other crazy stuff..  see link
https://medium.com/@dupski/debug-typescript-in-vs-code-without-compiling-using-ts-node-9d1f4f9a94a  
{  
    "name": "Current TS File",  
    "type": "node",  
    "request": "launch",  
    "args": ["${relativeFile}"],  
    "runtimeArgs": ["--nolazy", "-r", "ts-node/register"],  
    "sourceMaps": true,  
    "cwd": "${workspaceRoot}",  
    "protocol": "inspector",  
}  
This is from the link.. if i remember correctly by following the links instructions there still was an error:  
cannot find module 'ts-node/register'  
----> this error was solved by installing ts-node locally (with the downside that now you have the whole node-modules etc. and 
you dont want this in every day of the aoc folders :( )  
----> after installing ts-node locally with npm i ts-node ('--save-dev' adding this is  optional)
to get rid of the new error:  
cannot find module 'typescript'  
'npm link typescript' this solved this issue  
---------> maaaaayybe the previous error could also have been resolved by something like npm link ts-node... maybe gonna try it again some day

  
note: the debugging was very complicated so all info in this paragraph may or may not be correct^^

#### compiling (either tsc command or Run and Debug) doesnt work

check if you have cd'd to the dir where .ts and tsconfig.json are located! maybe there are other ways around but this might help!  
...and remember ALWAYS RUN tsc COMMAND FIRST!!




#### weird error: Cannot redeclare block-scoped variable 'testInput1'.

occured (not everytime...) when the same variable was declared a second time but in another file in the same 'project'  
----> often we use same variables in both solutions for part 1 and 2...  
https://stackoverflow.com/questions/35758584/cannot-redeclare-block-scoped-variable-typescript  
check Neville Omangi's answer  
----> fix: add the following at the beginning of one or both of the files:  export {};  
