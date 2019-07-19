/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMysqlServer'
  // },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  // port: 80,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  // log: {
  //   level: "silent"
  // }
  blueprints: {
    actions: true, // 自动路由,应该同时做好url见识和存取策略
    rest: false, 
    shortcuts: false, // 必须是false 用于开发测试
  },
  
  cors: {
    allRoutes: false, // 关闭全路由的跨域存取
    origin: 'http://foobar.com,https://lohost.com', //允许的域名 
    credentials: true, //需要cookies 验证

  },

  csrf: true,
};
