import type { App } from 'vue'
import registerElement from './register-element'
import registerProperties from './register-properties'

export default function registerApp(app: App): void {
  registerElement(app)
  registerProperties(app)
}
