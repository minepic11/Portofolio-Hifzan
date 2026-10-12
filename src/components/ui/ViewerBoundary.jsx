import { Component } from 'react'

export default class ViewerBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch() {
    this.props.onError?.()
  }

  render() {
    if (!this.state.error) return this.props.children
    return typeof this.props.fallback === 'function'
      ? this.props.fallback(this.state.error)
      : this.props.fallback
  }
}
