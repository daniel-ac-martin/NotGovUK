Components
==========

This directory contains our project's React components.


Files in a typical component
----------------------------

1. `src/Component.ts[x]`
   The implementation of the component. It may reference other `.tsx` files in
   order to separate business logic from presentation logic. Otherwise, it will
   typically be very simple and contain mostly HTML code.
2. `assets/Component.scss`
   The SCSS (CSS) code that pertains to the component.
3. `spec/Component.spec.ts`
   The tests for this component.
4. `spec/Component.mdx`
   The main documentation of the component. This is what people will use to
   understand how to consume the component.
5. `spec/Component.stories.tsx`
   The 'stories' / scenarios which a referenced by the documentation and can be
   used in visual regression testing.
6. `README.md`
   Very simple documentation to aid people browsing the code via GitHub or NPM.
