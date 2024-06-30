/**
 * @import { RecmaNextjsStaticPropsOptions } from 'recma-nextjs-static-props'
 */

/**
 * @type {RecmaNextjsStaticPropsOptions}
 */
export default {
  include: ['string', /^regex/, (val) => val === 'fn']
}
