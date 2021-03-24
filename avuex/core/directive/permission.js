export default (Vue) => {
  Vue.directive('permission', (el, binding) => {
    const value = binding.value;
    if (value !== true) {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el)
      }
    }
  })
}
