const React = require('react')

/**
 * Process a given dimer node at a time
 *
 * @method processNode
 *
 * @param  {Object}    node
 * @param  {Number}    counter
 * @param  {Function}  processFn
 *
 * @return {Mixed}
 */
function processNode (node, counter, processFn) {
  /**
   * Ignore dimertitle and dimerTitle
   */
  if (['dimertitle', 'dimerTitle'].indexOf(node.tag) > -1) {
    return
  }

  /**
   * Return raw value
   */
  if (node.type === 'text') {
    return node.value
  }

  /**
   * Add key to props
   */
  node.props = node.props || {}
  node.props.key = counter++

  /**
   * Invoke processFn to see if they want to render custom elements
   * or components
   */
  const output = processFn(node, React.createElement, (child) => processNode(child, counter, processFn))

  /**
   * If they return explicit false, then skip the node
   */
  if (output === false) {
    return
  }

  /**
   * If they return nothing, then we will render the node ourselves
   */
  if (!output) {
    return React.createElement(node.tag, node.props, node.children.map((child) => {
      return processNode(child, counter, processFn)
    }))
  }

  /**
   * Return output
   */
  return output
}

module.exports = function reactTree (node, processFn) {
  /**
   * Ensure node is of type root to start with
   */
  if (!node || node.type !== 'root') {
    throw new Error('Make sure to pass root node to reactTree')
  }

  /**
   * Define fallback processFn if missing
   */
  processFn = typeof (processFn) === 'function' ? processFn : function () {}

  /**
   * Start a counter for defining keys
   */
  let counter = 0

  /**
   * Process the process by wrapping inside a root div
   */
  return processNode({ tag: 'div', props: { className: 'root' }, children: node.children }, counter, processFn)
}
