/**
 * Default options for the html-webpack-plugin HTML renderer
 *
 * See https://github.com/ampedandwired/html-webpack-plugin#configuration
 * for possible options. Any other options will be available to the template
 * under `htmlWebpackPlugin.options`
 */

module.exports = {
    // html-webpack-plugin options
    template: './src/template.ejs',
    inject: false,

    // Search and metadata
    title: 'xkid',
    description:
        'XKID少儿编程的前身，是北京著名的青少年STEAM连锁教育机构：【益智益乐】。',
    // override if mobile-friendly
    viewportWidth: 'device-width',

    // Open graph
    // og_image: 'https://scratch.mit.edu/images/scratch-og.png',
    // og_image_type: 'image/png',
    // og_image_width: 986,
    // og_image_height: 860,

    // Analytics & Monitoring
    // ga_tracker: process.env.GA_TRACKER || ''
};
