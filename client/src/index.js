import React from 'react';
import ReactDOM from 'react-dom';
import { setCookieWithFetch, setCookieWithAxios, removeCookie } from './cookie-utils'
import './index.css'

const ButtonBaseStyle = {
  border: "none",
  borderRadius: 5,
  padding: 16,
  color: "#fff",
  fontWeight: "bold",
  fontSize: 14,
  width: 250
};

const Button1Style = {
  ...ButtonBaseStyle,
  backgroundColor: "#6fb98f",
};

const Button2Style = {
  ...ButtonBaseStyle,
  backgroundColor: "#46b3e6"
};

const PStyle = { margin: "8px 0 0 8px" };

const App = () => {
    const [cookie, setCookie] = React.useState(document.cookie)

    React.useEffect(() => {
        renderCookie();
    }, [])

    const clearCookie = () => {
        removeCookie('token')
        setCookie(document.cookie)
    }

    const renderCookie = async (params) => {
        if (params && params.useAxios) {
            await setCookieWithAxios(params);
        } else {
            await setCookieWithFetch(params);
        }
        setCookie(document.cookie);
    };

    return (
      <div style={{ padding: 16 }}>
        <h1>Cookie Playground</h1>
        <code
          style={{
            display: "block",
            backgroundColor: "#e5dfdf",
            maxWidth: 766,
            padding: 16,
            borderRadius: 5,
            minHeight: 355,
          }}
        >
          {cookie}
          {cookie && (
            <>
              <span
                style={{ fontWeight: "bold", display: "block", marginTop: 16 }}
              >
                Description:
              </span>
              <p style={PStyle}>
                if no options are set, Domain is set to current
                domain(localhost) and path will be set to "/"
              </p>
              <p style={PStyle}>list of options</p>
              <ul>
                <li>
                  secure: cookie will be set only if it's sent over "https"
                </li>
                <li>
                  path: cookie will be set only if you're in subdirectory of
                  given path
                </li>
                <li>
                  domain: cookie will be set only if your domain matches except
                  subdomain
                </li>
                <li>
                  httpOnly: your cookie will not be able to be read using
                  javascript meaning `document.cookie` will return empty string
                </li>
                <li>
                  maxAge: determines when your cookie will be expired. setting
                  it to 0 clears it.
                </li>
                <li>
                  sameSite: 3 options are available. "Strict", "Lax" and "None"
                  <br />
                  In Strict mode, only first party cookie will be allowed to be sent.
                  <br />
                  In Lax mode, first party cookie or top-level navigation (not POST request!) will be allowed to be sent.
                  <br /> 
                  Find more on{" "}
                  <a href="https://web.dev/samesite-cookies-explained/">
                    samesite-cookies-explained
                  </a>
                </li>
              </ul>
            </>
          )}
        </code>
        <div
          style={{
            display: "grid",
            gridGap: 8,
            gridTemplateColumns: "repeat(3, 250px)",
            gridTemplateRows: "2fr",
            padding: "8px 0"
          }}
        >
          <button onClick={renderCookie} style={Button1Style}>
            SET (no options)
          </button>
          <button
            onClick={() => renderCookie({ secure: true })}
            style={Button1Style}
          >
            SET (secure = true)
          </button>
          <button
            onClick={() => renderCookie({ secure: false })}
            style={Button1Style}
          >
            SET (secure = false)
          </button>
          <button
            onClick={() => renderCookie({ path: "/app" })}
            style={Button1Style}
          >
            SET (path = "/app")
          </button>
          <button
            onClick={() => renderCookie({ path: "/" })}
            style={Button1Style}
          >
            SET (path = "/")
          </button>
          <button
            onClick={() => renderCookie({ domain: ".domain.com" })}
            style={Button1Style}
          >
            SET (domain = ".facebook.com")
          </button>
          <button
            onClick={() => renderCookie({ httpOnly: true })}
            style={Button1Style}
          >
            SET (httpOnly = true)
          </button>
          <button
            onClick={() => renderCookie({ maxAge: 0 })}
            style={Button1Style}
          >
            SET (maxAge = 0)
          </button>
          <button
            onClick={() => renderCookie({ sameSite: "Strict" })}
            style={Button1Style}
          >
            SET (sameSite = strict)
          </button>
          <button
            onClick={() => renderCookie({ sameSite: "Lax" })}
            style={Button1Style}
          >
            SET (sameSite = lax)
          </button>
          <button
            onClick={() => renderCookie({ useAxios: true })}
            style={Button1Style}
          >
            SET (using "axios", w/o options)
          </button>
          <button onClick={clearCookie} style={Button2Style}>
            REMOVE
          </button>
        </div>
      </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

