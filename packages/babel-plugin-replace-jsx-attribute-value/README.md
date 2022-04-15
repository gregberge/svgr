# @svgr/babel-plugin-replace-jsx-attribute-value

## Install

```
npm install --save-dev @svgr/babel-plugin-replace-jsx-attribute-value
```

## Usage

**.babelrc**

```json
{
  "plugins": [
    [
      "@svgr/babel-plugin-replace-jsx-attribute-value",
      {
        "values": [
          { "value": "#000", "newValue": "#fff" },
          { "value": "blue", "newValue": "props.color", "literal": true },
          {
            "value": "/#([0-9A-F]{3}){1,2}/g",
            "regExp": /#([0-9A-F]{3}){1,2}/g,
            "newValue": "props.color",
            "literal": true
          }
        ]
      }
    ]
  ]
}
```

## License

MIT
