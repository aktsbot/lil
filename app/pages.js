import config from "./config.js";

// templates
const templates = {
  head: ({ title, query }) => `
<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} | ${config.appName}</title>

  <style>
  * {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
}

.container {
  margin: 15px auto;
  padding: 0 10px;
  max-width: 650px;
}

label,
input[type="text"] {
  width: 100%;
  display: block;
  margin: 4px 0;
}

input[type="text"] {
  padding: 6px;
  border: 1px solid #ccc;
}

button {
  cursor: pointer;
  display: inline-block;
  margin: 2px 0;
  padding: 6px 18px;
  font-size: 17px;
  background: #059862;
  border-radius: 5px;
  border: 0;
  color: #fff;
}

.captcha {
  margin-top: 10px;
}

.captcha img {
  border: 1px solid #ccc;
}

nav div {
  display: flex;
  justify-content: space-between;
}

table {
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  padding-top: 6px;
  padding-bottom: 6px;
  text-align: left;
  background-color: #444;
  color: white;
}

.token {
  font-size: 18px;
  background-color: #ccc;
  padding: 5px;
  border-radius: 5px;
}

.warning {
  border: 2px dotted maroon;
  border-radius: 3px;
  padding: 6px;
}

  </style>

  <script>
  ${query?.message ? `alert('${query.message}')` : ""}
  </script>
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
      <a href="/logout">logout</a>
    </div>
  </div>
</nav>
  `,
};

export const pageHtml = {
  home: ({ query }) => {
    let html = `${templates.head({
      title: "Another URL shortening service",
      query,
    })}`;

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
  newUrl: ({ query }) => {
    let html = `${templates.head({ title: "shorten new url" })}`;

    // TODO:
    html += `${templates.nav({ username: "hardy" })}`;

    html += `
    <div class="container">
      <a href="/list">&lt;Back</a>
      <h1>new short url</h1>

      <form action="">
        <label for="full_url">full url</label>
        <input
          type="text"
          name="full_url"
          id="full_url"
          placeholder="eg: https://foo.com/a/long/url?with=query&params=1"
          required
        />

        <label for="short_code">short code(optional)</label>
        <input
          type="text"
          name="short_code"
          id="short_code"
          placeholder="foo1"
          required
        />

        <button type="submit">shorten</button>
      </form>
    </div>    
    `;

    html += `${templates.tail()}`;
    return html;
  },
  listUrls: ({ query }) => {
    let html = `${templates.head({ title: "your urls" })}`;
    // TODO:
    html += `${templates.nav({ username: "hardy" })}`;

    html += `
    <div class="container">
      <h1>my urls</h1>
      <div style="margin-bottom: 8px; text-align: right">
        <a href="/new">new url</a>
      </div>
      <div style="overflow-x: scroll">
        <table>
          <tr>
            <th>#</th>
            <th>full url</th>
            <th>short url</th>
          </tr>
          <tr>
            <td>1</td>
            <td>
              <a href="#">https://foo.com/a/long/url?with=query&amp;params=1</a>
            </td>
            <td>
              <a href="#">https://one0.xyz/abc1</a>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <a href="#">https://foo.com/a/long/url?with=query&amp;params=1</a>
            </td>
            <td>
              <a href="#">https://one0.xyz/abc1</a>
            </td>
          </tr>
        </table>
      </div>

      <div style="margin-top: 8px; text-align: center">
        <a href="#">&lt; prev</a>
        <span>page 1 of 3</span>
        <a href="#">next &gt;</a>
      </div>
    </div>
    `;

    html += `${templates.tail()}`;
    return html;
  },
  me: ({ query }) => {
    let html = `${templates.head({ title: "me" })}`;

    // TODO:
    html += `${templates.nav({ username: "hardy" })}`;

    html += `
    <div class="container">
      <a href="/list">&lt;Back</a>

      <h1>me</h1>

      <p>username: hardy</p>
      <p>api token: <code class="token">abc1234</code></p>
    </div>    
    `;

    html += `${templates.tail()}`;
    return html;
  },
};
