How To deploy ReactApp on Tomcat
---------------------------------

Reference: https://frugalisminds.com/deploy-react-js-in-tomcat/


1. npm init

2. mvn clean install

3. the above steps generates Paperless.war file under the directory ./target

4. Move all the files from ./target  to Tomcat directory "webapps"

5. also copy all the files from ./target/Paperless to the Tomcat directory ROOT, so that the default TOMCAT webpage is going to be PAPERLESS App.