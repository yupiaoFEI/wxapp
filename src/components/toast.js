/*
 * config = {
 *  shown,
 *  change,
 *  duration, // default 1500 ms
 *  message,
 * }
 *  
 *  STEP 1:
 *  
 *  edit .wxml, add <include src='YOUR_PATH_TO/toast.wxml'/>
 *
 *  STEP 2:
 *
 *  var ActionSheet = require('YOUR_PATH_TO/toast.js')
 *
 *  STEP 3:
 *
 *  // add into onLoad func
 *  this.toast = new Toast(this)
 *
 *  STEP 4:
 *
 *  that.toast.show({
 *      message: 'toast 消息',
 *      duration: 1500,
 *      change: function(){
 *          // invoke after toast hidden
 *      }
 *  })
 */
const TOAST = '__toast__'
const noop = function(isOk) {}

function Toast(context) {

    context.__toast__change = noop

    this.toggle = function() {
        let config = context.data.__toast__
        config.shown = !config.shown
        context.setData({ __toast__: config })
    }

    this.hide = this.toggle

    this.show = function(config) {
        let _config = {
            shown: true,
            duration: config.duration,
            message: config.message,
        }

        let that = this

        context.setData({ __toast__: _config }) 
        context.__toast__change = function() {
           that.hide() 
           config.change && config.change()
        }
    }
}

module.exports = Toast 
