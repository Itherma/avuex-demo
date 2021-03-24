import bem from '../utils/bem';
import { KEY_COMPONENT_NAME } from '../global/variable';
export default function(component) {
  component.name = KEY_COMPONENT_NAME + component.name;
  component.mixins = component.mixins || [];
  component.mixins.push(bem);
  return component;
}
