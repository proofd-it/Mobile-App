# webapp
Java Springboot application serving a static HTML (+JS) webapp used to pull data using PuckJS interface [library](https://www.puck-js.com/puck.js). The interface library itself is slightly forked to only display specifically named devices

## Deployment
Currently, the app is served using tomcat that runs on the server instance. To build WAR file, run `mvn package` in the same dir as your `pom.xml` file. Then, either copy or symlink the created file to your tomcat dir. Right now, the file is symlinked, so if you want to rebuild the current instance (e.g., made some changes in the code), run `mvn pacakge` and the changes will be applied automatically.

## /receive
There is only one endpoint and that's `GET /receive`. This serves index.html, which then also loads any supporting libraries from CDN servers (such as bootstrap).
