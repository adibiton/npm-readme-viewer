### npm-readme-viewer

#### How to install

``` bash
    npm i -g npm-readme-viewer
```

#### Open readme for current package
``` bash
    readme
```

#### Open readme for <package>
``` bash
    readme <package>
```


#### Search algorithm
The package search for the package in the following order:
* node_modules/
* (global) node_modules/
* github
* gitlub

The files we search for:
* README.md (ignore case)
