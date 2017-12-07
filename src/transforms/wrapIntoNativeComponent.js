export default (opts = {}) => (code, state) => `import React from 'react'
import Svg, {
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

const ${state.componentName} = (${opts.expandProps ? 'props' : ''}) => ${code}

export default ${state.componentName}`
