import "./ServerNotFound.css";

const ServerNotFound = () => {
  return (
    <div className="server-not-found">
      <h2>Server Not Found</h2>
      <p>
        Please run the server by going to the{" "}
        <code>
          <strong>server directory</strong>
        </code>{" "}
        and apply these commands:
      </p>
      <div className="run-server-code">
        <div>
          <code>
            <span className="node-command">node</span> server.js
          </code>
        </div>
      </div>
      <p>
        Make sure that <strong>node js</strong> and <strong>mongodb</strong> are
        installed in your machine
      </p>
      <br />
      <p>
        after applying the above commands the server shoud be running at{" "}
        <code>http://localhost:5000/</code>
        <br />
        and a <code>MyNoteKeeper</code> database with collection{" "}
        <code>notes</code> should be created in your mongodb
      </p>
    </div>
  );
};

export default ServerNotFound;
