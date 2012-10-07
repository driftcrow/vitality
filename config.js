/**
 * config
 */

var path = require('path');

exports.config = {
    debug: true,
    sitename: 'Vitality',
    description: 'exhibition media',
    version: '0.0.1',

    // site settings
    site_headers: [
        '<meta name="author" content="liubin@0745.hunan-l.tax.cn" />'
    ],
    host: 'huaihua.tax.gov.cn',
    site_logo: '', // default is `name`
    site_navs: [
        // [ path, title, [target=''] ]
        [ '/about', '关于' ],
    ],
    site_static_host: '', // 静态文件存储域名

    upload_dir: path.join(__dirname, 'public', 'user_data', 'images'),

    db: 'mongodb://127.0.0.1/vitality',
    session_secret: 'vitality',
    auth_cookie_name: 'vitality',
    port: 3000,

    // 话题列表显示的话题数量
    list_topic_count: 20,

    // admin 可删除话题，编辑标签，设某人为达人
    admins: { admin: true }
};
