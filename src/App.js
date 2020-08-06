import React, { useEffect, useReducer, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { ApolloProvider } from 'react-apollo'
import { useMutation } from '@apollo/react-hooks'
import browserFingerprint from 'browser-fingerprint'

import { Scrollbars } from 'react-custom-scrollbars'

import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import {
  always,
  append,
  either,
  equals,
  flatten,
  head,
  ifElse,
  isNil,
  map,
  mapObjIndexed,
  mergeDeepLeft,
  multiply,
  pipe,
  pluck,
  prop,
  reduce,
  split,
  subtract,
  unless,
} from 'ramda'
import { alwaysZero, dotPath } from 'ramda-extension'

import jwtDecode from 'jwt-decode'

import Auth from 'modules/auth/containers/Auth'
import NotFound from 'containers/NotFound'
import Header from 'components/Header'
import Menu from 'components/Menu'
import NotificationProvider from 'components/NotificationProvider'

import UPDATE_TOKEN from 'graphql/update-token'

import { core, messenger, data, security } from 'modules'

import { AppContext, initialState, reducers } from 'context'
import { MEDIA_CHANGE } from 'context/constants'
import ls from 'utils/ls'

import 'moment/locale/ru'

import { isMobileDevice, theme as themeFn } from 'helpers'

import client from './client'
import colorTheme from './theme'

const modules = [core, messenger, data, security]

const GlobalStyles = createGlobalStyle`
  ${normalize()}

  * {
    box-sizing: border-box;
  }

  ::selection {
    background-color: rgba(100, 65, 165, 0.99);
    color: #fff;
  }

  body {
    font-family: 'Helvetica Neue', system-ui, -apple-system, BlinkMacSystemFont, Segoe UI,
      Roboto, Oxygen, Ubuntu, Cantarell, Droid Sans;
    background: ${themeFn('backgroundColor')};
    color: ${themeFn('textColor')};
  }

  .fade-enter {
    opacity: 0;
    z-index: 1;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 250ms ease-in;
  }

  .emoji-mart-emoji {
    cursor: pointer;
  }

  .emoji-mart-scroll {
    border-bottom: 0;
    margin-bottom: 6px;
  }

  .emoji-mart-scroll + .emoji-mart-bar {
    display: none;
  }
`

const getTranslations = pipe(
  pluck('locales'),
  reduce(
    (result, currentObject) =>
      mergeDeepLeft(
        result,
        mapObjIndexed(
          (num, key) => ({
            translation: {
              ...prop(key, currentObject),
            },
          }),
          currentObject,
        ),
      ),
    {},
  ),
)

const getLanguage = pipe(
  split('-'),
  head,
  unless(either(equals('ru'), equals('en')), () => 'en'),
)

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  lng: ls.get(
    'LANG',
    getLanguage(window.navigator.language || window.navigator.userLanguage),
  ),
  resources: getTranslations(modules),
})

const getMenu = pipe(
  pluck('menu'),
  flatten,
)

const StyledContent = styled.main`
  padding: 16px;
`

const StyledBody = styled.div`
  display: flex;
`

const AnimatedApp = () => {
  const location = useLocation()
  const renderPages = pipe(
    pluck('routes'),
    flatten,
    map(({ container: Element, id, path }) => (
      <Route exact key={id} path={path}>
        <Element />
      </Route>
    )),
    append(
      <Route key={'not-found'} path={'*'}>
        <NotFound />
      </Route>,
    ),
  )
  return (
    <CSSTransition classNames="fade" in key={location.key} timeout={300}>
      <Switch location={location}>{renderPages(modules)}</Switch>
    </CSSTransition>
  )
}

const SilentTokenRefresher = ({ setToken, token }) => {
  const { exp } = jwtDecode(token)
  const fingerprint = browserFingerprint()
  const [updateToken, { data: tokenData }] = useMutation(UPDATE_TOKEN)
  const interval = subtract(multiply(exp, 1000), Date.now())
  useEffect(() => {
    setTimeout(() => {
      updateToken({
        variables: {
          fingerprint,
        },
      })
      ls.remove('TOKEN')
    }, interval)
  }, [fingerprint, interval, token, updateToken])
  useEffect(() => {
    const setDataToken = unless(
      isNil,
      ({ updateToken: { token: userToken } }) => {
        ls.set('TOKEN', userToken)
        setToken(userToken)
      },
    )
    setDataToken(tokenData)
  }, [setToken, tokenData])
  return ''
}

const App = () => {
  const [state, dispatch] = useReducer(reducers, initialState)
  const { dateFormat, theme } = state

  const [token, setToken] = useState(ls.get('TOKEN'))
  const contentMargin = ifElse(
    always(isMobileDevice),
    always('42px'),
    alwaysZero,
  )(window.innerWidth)

  useEffect(() => {
    const preferDarkQuery = '(prefers-color-scheme: dark)'
    const mediaQuery = window.matchMedia(preferDarkQuery)
    const handleChange = () =>
      dispatch({
        mode: ifElse(prop('matches'), always('dark'), always('light'))(
          mediaQuery,
        ),
        type: MEDIA_CHANGE,
      })
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])

  useEffect(() => {
    ls.set('DATE_FORMAT', dateFormat)
  }, [dateFormat])

  useEffect(() => {
    ls.set('THEME', theme)
  }, [theme])

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={prop(theme, colorTheme)}>
        <AppContext.Provider value={{ dispatch, state }}>
          <Router>
            <GlobalStyles />
            {token ? (
              <NotificationProvider>
                <Header />
                <StyledBody>
                  <Menu menu={getMenu(modules)} />
                  <Scrollbars
                    style={{
                      height: `calc(100vh - ${dotPath(
                        `${theme}.headerHeight`,
                        colorTheme,
                      )})`,
                      marginLeft: contentMargin,
                    }}
                  >
                    <StyledContent>
                      <TransitionGroup>
                        <AnimatedApp enter={300} exit={300} />
                      </TransitionGroup>
                    </StyledContent>
                  </Scrollbars>
                </StyledBody>
                <SilentTokenRefresher setToken={setToken} token={token} />
              </NotificationProvider>
            ) : (
              <Auth setToken={setToken} />
            )}
          </Router>
        </AppContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
