const components = {}

declare global {
  type MDXProvidedComponents = typeof components
}

/**
 * Provide MDX component overrides.
 *
 * @returns
 *   The MDX components.
 * @see https://nextjs.org/docs/app/building-your-application/configuring/mdx#add-an-mdx-componentstsx-file
 */
export function useMDXComponents(): MDXProvidedComponents {
  return components
}
