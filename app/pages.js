import config from "./config.js";

// templates
const templates = {
  head: ({ title }) => `
<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} | ${config.appName}</title>
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
`,

  tail: () => `
</body>

</html>
`,

  nav: ({ username }) => `
<nav>
  <div class="container">
    <div>
      <a href="/me">
        <strong>@${username}</strong>
      </a>
    </div>
    <div>
      <a href="/logout">&#9032; logout</a>
    </div>
  </div>
</nav>
  `,

  message: ({ query }) => {
    let html = ``;
    if (query.message) {
      html += `
      <div class="container warning" id="messages">
        <span>${query.message}</span>
        <button onclick="this.parentNode.remove();" class="close">&times</button>
      </div>
      `;
    }
    return html;
  },
};

export const pageHtml = {
  home: ({ query }) => {
    let html = `${templates.head({
      title: "Another URL shortening service",
    })}`;

    html += templates.message({ query });
    html += `
    <div class="container">
      <h1>Hi there!</h1>
      <p>
        This is an instance of <a href="https://github.com/aktsbot/lil">lil</a>,
        a simple URL shortening service. Please login.
      </p>

      <form action="/login" method="POST">
        <label for="username">username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="eg: nyanman"
          required
        />

        <div class="captcha">
          <img src="/captcha.svg" alt="captcha" /> 
        </div>

        <label for="captcha">captcha</label>
        <input
          type="text"
          class="monospace"
          name="captcha"
          id="captcha"
          placeholder="The content of the image seen above"
          required
        />

        <button type="submit">login</button>
      </form>
    </div>
    `;

    html += `${templates.tail()}`;
    return html;
  },
  newUrl: ({ query, user }) => {
    let html = `${templates.head({ title: "shorten new url" })}`;

    html += `${templates.nav({ username: user.username })}`;

    html += templates.message({ query });

    html += `
    <div class="container">
      <a href="/list">&lt;Back</a>
      <h1>new short url</h1>

      <form action="/" method="POST">
        <label for="full_url">full url</label>
        <input
          type="text"
          name="full_url"
          id="full_url"
          placeholder="eg: https://foo.com/a/long/url?with=query&params=1"
          required
        />

        <label for="short">short code(optional)</label>
        <input
          type="text"
          name="short"
          id="short"
          placeholder="foo1"
        />

        <button type="submit">shorten</button>
      </form>
    </div>    
    `;

    html += `${templates.tail()}`;
    return html;
  },
  listUrls: ({
    query,
    user,
    results,
    totalPages,
    offset,
    nextPageLink,
    prevPageLink,
    page,
  }) => {
    let html = `${templates.head({ title: "your urls" })}`;
    // TODO:
    html += `${templates.nav({ username: user.username })}`;

    html += templates.message({ query });

    html += `
    <div class="container">
      <h1>my urls</h1>
      <div style="margin-bottom: 8px; text-align: right">
        <a href="/new">&plus; new url</a>
      </div>
      <div style="overflow-x: scroll">
        <table>
          <tr>
            <th>#</th>
            <th>full url</th>
            <th>short url</th>
          </tr>
          ${
            results.length
              ? results
                  .map((r, index) => {
                    return `
            <tr>
              <td>${index + 1 + offset}</td>
              <td>
                <a href="${r.destination}">${r.destination}</a>
              </td>
              <td>
                <a href="/${r.short}">/${r.short}</a>
              </td>
            </tr>
            `;
                  })
                  .join("")
              : '<tr><td colspan="3" style="text-align: center;">No urls added yet</td></tr>'
          }
        </table>
      </div>

      ${
        totalPages
          ? `
      <div style="margin-top: 8px; text-align: center">
        ${prevPageLink ? `<a href="#">&lt; prev</a>` : ""}
        <span>page 1 of ${totalPages}</span>
        ${nextPageLink ? `<a href="#">next &gt;</a>` : ""}
      </div>`
          : ""
      }
    </div>
    `;

    html += `${templates.tail()}`;
    return html;
  },
  me: ({ query, user }) => {
    let html = `${templates.head({ title: "me" })}`;

    // TODO:
    html += `${templates.nav({ username: user.username })}`;

    html += `
    <div class="container">
      <a href="/list">&lt;Back</a>

      <h1>me</h1>

      <p>username: ${user.username}</p>
      <p>api token: <code class="token">${user.api_token}</code></p>
    </div>    
    `;

    html += `${templates.tail()}`;
    return html;
  },
};
