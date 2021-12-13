## personal notes to self concerning TS

#### compile file manually
navigate to location and : tsc myFile.tsc  
----> if you run tsc command in console and specify a fileName, the tsconfig.json will be ignored  
--------> if you want the config to be used you just type tsc while being in the root dir of project


#### start file in watchmode
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
so you get this problem/warning (it works despite the problem warning)
it worked for me when neither rootDir and outDir of the js file was in root dir
so in root i created folder data with js file in it. i also created dist folder where all compiled code goes
im sure there are other fixes for this problem message. maybe some "excluding": [...]-magic inside the tsconfig or something

#### inability to import .mjs files..
unfortunately i couldn't figure out how to import .mjs files.. therefore we cannot import the puzzleInputs used in the JS projects..
----> we have to copy them into the TypeScript/day_??/data folder and rename them to .js for the time being :(