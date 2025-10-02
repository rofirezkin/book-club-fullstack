/**
 * Tailwind CSS configuration.  The `content` array tells Tailwind which files
 * to scan for class names so it can generate the corresponding utility classes.
 */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};