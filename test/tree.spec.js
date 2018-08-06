/*
* tree-react
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const test = require('japa')
const tree = require('..')
const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const Markdown = require('@dimerapp/markdown')
const dedent = require('dedent')
const React = require('React')

Enzyme.configure({ adapter: new Adapter() })

test.group('Tree', (assert) => {
  test('process dimer content node to html', async (assert) => {
    const template = 'Hello world'
    const json = await (new Markdown(template)).toJSON()

    const output = tree(json.contents)
    assert.equal(Enzyme.render(output).text(), 'Hello world')
  })

  test('process dimer content node with ul', async (assert) => {
    const template = dedent`
    - This is li
    `

    const json = await (new Markdown(template)).toJSON()
    const output = tree(json.contents)
    assert.equal(Enzyme.render(output).find('ul li').length, 1)
    assert.equal(Enzyme.render(output).find('ul li').text(), 'This is li')
  })

  test('process dimer content node with custom output', async (assert) => {
    const template = dedent`
    - This is li
    `

    const json = await (new Markdown(template)).toJSON()
    const output = tree(json.contents, function (node, render) {
      if (node.tag === 'li') {
        return React.createElement('li', Object.assign(node.props, { className: 'foo' }), node.children.map(render))
      }
    })

    assert.equal(Enzyme.render(output).find('ul li.foo').length, 1)
    assert.equal(Enzyme.render(output).find('ul li.foo').text(), 'This is li')
  })
})
