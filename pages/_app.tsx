  
import * as React from 'react'
import App from 'next/app'

import { AppProvider } from '../context/application'

export default class MyApp extends App {
  public render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </>
    )
  }
}
