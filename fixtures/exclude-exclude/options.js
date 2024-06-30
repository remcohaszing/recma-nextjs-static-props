/**
 * @import { RecmaNextjsStaticPropsOptions } from 'recma-nextjs-static-props'
 */

/**
 * @type {RecmaNextjsStaticPropsOptions}
 */
export default {
  exclude: ['string', /^regex/, (val) => val === 'fn']
}
