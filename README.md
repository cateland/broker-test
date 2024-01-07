# React + TypeScript + Vite

## to run the application

### make sure node 18 LTS is running on your machine

```
node --version
=> v18.18.0
```

Install the required dependencies by running

```
npm ci
```

Then you can run the app using

```
npm run dev
=>   VITE v5.0.10  ready in 346 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Tests

Make sure the server is running then

```
npx playwright test
```

## Notes

- I choosen to hit the backend with input change with a simple debounce i have no idea of the real volumetry of the broker dataset so i accept the latency.
  - Initial list could be a list of favorite or most used brokers, this is what i choosen to implement
- I think i spent most of the time reading and sifting trough the MUI documentation
- I think one should create its own design system implementation on top of the MUI to avoid loosing too much time when building subsequent UI
- I would have loved to have more time to make the whole pattern into a truly reusable components, this could be applied
  to the contact selection or creation
- With a real backend and a SPA with no server rendering i would add parsing of the payloads
- Not everything is per the specs visually
- The `Add Manually` button is not accessible this would require more work or move the creation button outside of the selection panel right on to the card
- I love ADT like remote data because we avoid the boolean and property soup that is often seen, the shortcoming is that it at some point it require to be confortable with FP, just put a very simplistic implementation
- Why the menu text is still black remain a mistery for now
- Did not have time to add unit test, would have been testing the hooks and the reducer
- Used playwright, love the API that match the one from the testing library

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
