<div align="center">
  <div>
    <img width="500" src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1532274184/Dimer_Readme_Banner_lyy7wv.svg" alt="Dimer App">
  </div>
  <br>
  <p>
    <a href="https://dimerapp.com/what-is-dimer">
      Dimer is an open source project and CMS to help you publish your documentation online.
    </a>
  </p>
  <br>
  <p>
    <sub>We believe every project/product is incomplete without documentation. <br /> We want to help you publish user facing documentation, without worrying <code>about tools or code</code> to write.</sub>
  </p>
  <br>
</div>

# Dimer Tree React
> Converts dimer markdown AST node to HTML using React

[![travis-image]][travis-url]
[![npm-image]][npm-url]

If you are using React to create Dimer theme, then it will be best to use this low level function to convert all markdown AST nodes into HTML.

## Installation

```shell
npm i dimer-tree-react

# Yarn
yarn add dimer-tree-react
```

## Usage
After installation, import the module and use it as follows.

```js
import React from 'react'
import dimerTree from 'dimer-tree-rect'

class Doc extends React.Component {
  render () {
    return (
      <div>
        ${ tree(markdownAST) }
      </div>
    )
  }
}
```

### Returning custom components
You can also return custom elements or components for certain AST nodes.

```js
import React from 'react'
import dimerTree from 'dimer-tree-react'

class Doc extends React.Component {
  processNode (node) {
    if (node.tag === 'div' && node.props.className === 'tabs') {
      return <Tabs node={node} />
    }
  }

  render () {
    return (
      <div>
        ${ tree(markdownAST, this.processNode) }
      </div>
    )
  }
}
```

## Change log

The change log can be found in the [CHANGELOG.md](https://github.com/dimerapp/dimer-tree-react/CHANGELOG.md) file.

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](CONTRIBUTING.md).

## Authors & License
[thetutlage](https://github.com/thetutlage) and [contributors](https://github.com/dimerapp/dimer-tree-react/graphs/contributors).

MIT License, see the included [MIT](LICENSE.md) file.

[travis-image]: https://img.shields.io/travis/dimerapp/dimer-tree-react/master.svg?style=flat-square&logo=travis
[travis-url]: https://travis-ci.org/dimerapp/dimer-tree-react "travis"

[npm-image]: https://img.shields.io/npm/v/dimer-tree-react.svg?style=flat-square&logo=npm
[npm-url]: https://npmjs.org/package/dimer-tree-react "npm"
