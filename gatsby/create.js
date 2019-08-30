const path = require("path");
const rootComponent = path.resolve("./src/components/app/index.js");
const redirects = require("./redirects")

module.exports = {
  mdxPages: function(pages, navigation, titles, createPage) {
    let promises = [];
	  for (let slug in pages) {
	  	promises.push(new Promise((resolve, reject) => {
        createPage({
          path: slug,
          component: rootComponent,
          context: {
            node: pages[slug],
            slug,
            navigation,
            titles,
            newBuild: true
          }
        });
      	resolve(true);
 	    }));
    }

    return
  },
  otherPages: function(pages, navigation, titles, createPage) {
    let promises = [];
	  for (let slug in pages) {
      let data = {
        path: slug,
        component: rootComponent,
        context: {
          node: { frontmatter: pages[slug].frontmatter },
          slug,
          navigation,
          titles,
          newBuild: true
        }
      }
      if (pages[slug].matchPath) data.matchPath = pages[slug].matchPath
	  	promises.push(new Promise((resolve, reject) => {
        createPage(data)
      	resolve(true);
 	    }));
    }

    return
  },
  redirects: function(redirects, createRedirect) {
    let promises = [];
	  for (let from in redirects) {
	  	promises.push(new Promise((resolve, reject) => {
        createRedirect({
          fromPath: from,
          toPath: redirects[from],
          isPermanent: true,
          redirectInBrowser: true,
        });
      	resolve(true);
 	    }));
    }

    return Promise.all(promises);
  }
}