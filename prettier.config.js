const config = {
    printWidth: 200, // or your preferred line length
    tabWidth: 4, // or your preferred number of spaces per tab
    useTabs: true, // or true for using tabs over spaces
    semi: true, // or false to remove semicolons
    singleQuote: false, // or true for single quotes
    quoteProps: 'as-needed', // options: 'as-needed', 'consistent', 'preserve'
    jsxSingleQuote: false, // or true for single quotes in JSX
    trailingComma: 'none', // options: 'none', 'es5', 'all'
    bracketSpacing: true, // or false for no space between brackets
    jsxBracketSameLine: false, // or true to put the '>' of a multi-line JSX element at the end of the last line
    arrowParens: 'always', // options: 'avoid', 'always'
    requirePragma: false, // or true to format only files with a special comment
    insertPragma: false, // or true to insert a special comment in formatted files
    proseWrap: 'preserve', // options: 'always', 'never', 'preserve'
    htmlWhitespaceSensitivity: 'ignore', // options: 'css', 'strict', 'ignore'
    endOfLine: 'lf', // options: 'lf', 'crlf', 'cr', 'auto'
    embeddedLanguageFormatting: 'auto', // options: 'auto', 'off'
    bracketLine: false, // or true for brackets in HTML, JSX, and Vue on their own lines
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // or your preferred file extensions
};
  
export default config;